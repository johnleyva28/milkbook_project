# Precio Variable por Cliente y por Temporada

## Contexto validado

**Dato del usuario:** El precio por litro es decisión del lechero, en acuerdo con el cliente. Puede variar por cliente (un centavo más o menos). Cambia aproximadamente **10 veces al año** (temporadas).

## Modelo de datos

### Precio por contrato (snapshot)

**Decisión:** El precio se snapshot al inicio del contrato. NO se aplica retroactivamente.

```prisma
model Contrato {
  // ... otros campos ...
  precioLitroInicio  Decimal  @map("precio_litro_inicio") @db.Decimal(10, 4)
  // ... fecha_inicio, fecha_fin, etc.
}
```

**Lógica:**
- Al crear el contrato, se snapshot el precio actual del lechero.
- Si el lechero cambia el precio, los contratos existentes mantienen el precio viejo.
- Solo nuevos contratos usan el precio nuevo.

### Tabla de precios (histórico)

Para auditoría y para gestionar cambios:

```prisma
model Precio {
  id              String    @id @default(uuid())
  lecheroId       String    @map("lechero_id")
  producto        String    @default("leche_cruda")
  valorPorLitro   Decimal   @map("valor_por_litro") @db.Decimal(10, 4)
  fechaInicio     DateTime  @map("fecha_inicio") @db.Date
  fechaFin        DateTime? @map("fecha_fin") @db.Date
  motivo          String?   // "Temporada alta", "Cliente X", etc.
  createdAt       DateTime  @default(now()) @map("created_at")
  
  lechero Lechero @relation(fields: [lecheroId], references: [id], onDelete: Cascade)
  
  @@index([lecheroId, fechaInicio(sort: Desc)])
  @@map("precios")
}
```

**Uso:**
- Cuando un lechero cambia su precio, se crea un nuevo `Precio` con `fecha_inicio = hoy`, `fecha_fin = null`.
- El precio anterior se cierra (`fecha_fin = hoy`).
- Solo UN precio vigente por lechero a la vez.

### Precio por cliente (caso edge)

**Validado:** A veces un lechero cobra un centavo más o un centavo menos a un cliente específico.

**Decisión:** En MVP, **el precio se snapshot al inicio del contrato** (no es por cliente individual, es del lechero). Si Carlos quiere cobrar diferente a Juan, debe:

1. Esperar a que termine el contrato actual de Juan.
2. Cerrar la liquidación al precio viejo.
3. Iniciar nuevo contrato con el nuevo precio.

**Razón:** El precio por cliente es raro y añade complejidad al MVP. Se puede agregar en V2 con un campo `precio_litro_personalizado` en Contrato.

## Flujo del usuario

### Escenario 1: Cambio de precio general

```
1. Carlos decide subir el precio de S/ 1.50 a S/ 1.55.
2. Carlos abre la app → Configuración → Cambiar precio.
3. Ingresa nuevo precio: 1.55.
4. Ingresa motivo: "Temporada alta" (opcional).
5. Confirma.
6. Sistema: precio anterior se cierra, nuevo precio se crea como vigente.
7. Notificación push a TODOS los clientes activos: "Nuevo precio desde [fecha]: S/ 1.55".
8. Los contratos en curso mantienen precio viejo hasta que se cierren.
9. Nuevos contratos usan precio nuevo.
```

### Escenario 2: Precio por cliente (V2)

```
1. Carlos decide que a Juan le cobra S/ 1.55 y a Pedro le cobra S/ 1.50.
2. (V2) Carlos abre app → Configuración → Precios por cliente.
3. Marca "Personalizar precio para Juan" → 1.55.
4. El sistema aplica el precio personalizado al iniciar nuevo contrato con Juan.
```

## Cálculo de liquidación con precio ponderado

Si el precio cambia **durante un contrato**, hay dos opciones:

### Opción A (recomendada en MVP): Precio fijo durante el contrato
- El contrato se creó con precio X.
- Todas las entregas del contrato usan precio X.
- Simple, claro, sin ambigüedad.

### Opción B (V2): Precio ponderado por período
- Si el precio cambió el día 10 de un contrato del 1 al 15:
  - Días 1-9 (9 días) a precio X
  - Días 10-15 (6 días) a precio Y
- Cálculo: `(9 días × litros_promedio × X) + (6 días × litros_promedio × Y) = monto_total`
- Más justo, pero más complejo.

**Decisión MVP:** Opción A. Más simple, suficiente para el caso de uso.

## Edge cases

### El precio se cambia el mismo día que se inicia un contrato
- El precio vigente al momento de crear el contrato es el que se usa.
- Si Carlos cambia el precio después, el nuevo contrato usa el nuevo.

### El lechero quiere cobrar a un cliente antiguo un precio nuevo
- En MVP: tiene que esperar al cierre del contrato actual.
- En V2: editar el precio del próximo contrato directamente.

### El precio cambia más de una vez al día
- Caso raro.
- El sistema guarda el último cambio como vigente.
- Se podría mejorar con un log, pero no es prioritario.

## Implementación en backend

```typescript
@Injectable()
export class PreciosService {
  async cambiarPrecio(lecheroId: string, nuevoValor: number, motivo?: string): Promise<Precio> {
    return this.prisma.$transaction(async (tx) => {
      // Cerrar precio vigente anterior
      await tx.precio.updateMany({
        where: { lecheroId, fechaFin: null },
        data: { fechaFin: new Date() },
      });

      // Crear nuevo precio vigente
      return tx.precio.create({
        data: {
          lecheroId,
          valorPorLitro: nuevoValor,
          fechaInicio: new Date(),
          motivo,
        },
      });
    });
  }

  async obtenerPrecioVigente(lecheroId: string): Promise<Precio | null> {
    return this.prisma.precio.findFirst({
      where: { lecheroId, fechaFin: null },
      orderBy: { fechaInicio: 'desc' },
    });
  }
}
```

## UI en la app del lechero

### Pantalla "Configuración de precio"

```
┌──────────────────────────────────────┐
│  Configuración de precio              │
│                                      │
│  Precio vigente: S/ 1.50/L          │
│  Desde: 15 de septiembre 2026        │
│                                      │
│  Nuevo precio: [___] S/ por litro   │
│  Motivo: [___] (opcional)            │
│                                      │
│  ℹ️ Este precio se aplicará a        │
│  nuevos contratos. Los actuales       │
│  mantienen su precio hasta el cierre.│
│                                      │
│  [Cancelar]  [Cambiar precio]       │
└──────────────────────────────────────┘
```

### Notificación a clientes

```
┌──────────────────────────────────────┐
│ 🔔 Nuevo precio desde 1 de octubre  │
│                                      │
│ El precio por litro será S/ 1.55.   │
│ Este cambio aplica a nuevos          │
│ contratos. Tu contrato actual        │
│ mantiene el precio anterior.         │
│                                      │
│ [Entendido]                          │
└──────────────────────────────────────┘
```

## Métricas

- **% de contratos con cambio de precio** durante su vida: target bajo (raro).
- **% de notificaciones de cambio de precio abiertas** por clientes: target > 50%.
- **Variabilidad del precio** entre clientes del mismo lechero: target 0 (precio uniforme en MVP).