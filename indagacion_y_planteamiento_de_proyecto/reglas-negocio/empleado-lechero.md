# Caso Especial: Empleado del Lechero

## Contexto

**Validado con el usuario:** A veces el lechero (Carlos) no puede ir él personalmente y **manda a un empleado** (típicamente 1 día a la semana). Este empleado puede generar confusiones porque no sabe la rutina, no conoce bien a los clientes, y registra litros diferentes a los que el cliente recuerda.

## Frecuencia y gravedad

- **Frecuencia:** baja (1 día a la semana en casos raros).
- **Gravedad:** media (genera confusiones, pero no es crítico).
- **Impacto:** es una fuente real de discrepancias.

## Solución propuesta

### En MVP (V1)

- **No es un usuario separado** del sistema.
- Es solo un **campo en el registro** que indica quién hizo el registro.
- Carlos es el dueño de la cuenta; el empleado es solo quien "apoyó".

```prisma
model Registro {
  // ... otros campos ...
  registradoPor          UserType  // CARLOS (lechero) o EMPLEADO
  registradoPorNombre    String?   // "Empleado 1", por si tiene nombre
  registradoPorId        String?   // FK a user si es Carlos; null si es empleado
}
```

**No es un usuario** en MVP:
- El empleado no tiene cuenta.
- No tiene app propia.
- Carlos usa la app; el empleado solo "le ayuda" ese día.

### En V2 (futuro)

- **Login para empleado** con permisos limitados.
- Empleado solo ve: lista de clientes del día, registro de litros.
- Empleado NO ve: adelantos, encargos, liquidaciones, precios.
- Auditoría clara: "registrado por Empleado X el día Y".

```prisma
model Empleado {
  id              String   @id @default(uuid())
  lecheroId       String   @map("lechero_id")
  dni             String   @db.VarChar(8)
  nombre          String   @db.VarChar(200)
  celular         String?  @db.VarChar(20)
  activo          Boolean  @default(true)
  createdAt       DateTime @default(now()) @map("created_at")
  
  lechero         Lechero  @relation(fields: [lecheroId], references: [id])
  registros       Registro[]
}

model Registro {
  // ... otros campos ...
  registradoPorTipo    String  // "LECHERO" | "EMPLEADO"
  registradoPorId      String  // FK a Lechero.userId o Empleado.id
  registradoPorNombre  String  // snapshot del nombre al momento
}
```

## UI en la app del lechero (MVP)

### Pantalla de selección de "quien registra"

```
┌──────────────────────────────────────┐
│  Registrar visita                   │
│  Cliente: Juan Pérez                 │
│                                      │
│  ¿Quién está registrando?            │
│  [ Carlos ]  [ Mi empleado ]        │
│                                      │
│  [Carlos] por default si solo hay 1  │
└──────────────────────────────────────┘
```

**Si Carlos es siempre el que registra:** no mostrar la pregunta, asumir Carlos.

**Si hay empleados:** mostrar la lista, con foto y nombre.

## Auditoría

- **Toda acción registra `registrado_por`** con timestamp.
- **Admin puede ver** en el log quién hizo qué.
- Si hay patrón sospechoso (empleado con muchas discrepancias), admin puede intervenir.

## Caso de uso documentado

> "El lechero Carlos tiene un empleado que va los lunes. El empleado registra los litros sin problema, pero a veces anota diferente a lo que Juan recuerda. Cuando Carlos va a sacar cuentas el viernes, ve que el lunes hubo discrepancia. Con el sistema, Carlos puede ver claramente que el lunes fue registrado por el empleado, y hablar con Juan al respecto."

## Edge cases

### El empleado registra mal a propósito
- Caso raro pero posible.
- El sistema audita: "empleado_1 registró X litros en fecha Y".
- Carlos es responsable de la calidad de los datos de su empleado.
- En casos extremos, admin puede ver patrones.

### El empleado no tiene celular
- No usa la app. Carlos registra después.
- Para esto, Carlos necesita una opción de "registrar después" (con fecha de la entrega).

### Carlos deja de tener empleado
- Marca el empleado como `activo = false` en su perfil.
- Sus registros históricos siguen auditados.

## Métricas

- **% de registros hechos por empleado vs Carlos**: target < 10% (es raro).
- **% de discrepancias en días con empleado vs días con Carlos**: medir para entender el impacto.
- **Acción recomendada** si el % de discrepancias es > 20% en días con empleado: considerar capacitar al empleado o reducir su uso.