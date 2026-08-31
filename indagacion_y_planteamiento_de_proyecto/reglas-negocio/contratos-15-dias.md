# Contratos de 15 días — Reglas de Negocio

## Concepto

El **contrato** es el acuerdo entre el lechero (Carlos) y el cliente (Juan) para un período de recolección de leche. Por defecto, dura **15 días**, pero **el lechero puede modificar la duración** del contrato actual.

## Modelo

### Creación del contrato
- Se crea cuando el lechero agrega un nuevo cliente.
- **Fecha de inicio:** fecha actual (o fecha especificada).
- **Duración:** 15 días (default), configurable por el lechero (7, 10, 15, 20, 30, custom).
- **Fecha de fin:** calculada como fecha_inicio + duracion_dias - 1.
- **Estado:** ACTIVO.

### Extensión del contrato
- **Solo el lechero** puede modificar la duración.
- Puede **acortar o extender** el contrato actual antes de su cierre.
- El sistema **recalcula la fecha_fin**.
- Se registra en `AuditLog` quién y cuándo modificó.

### Cierre del contrato
- **Al llegar a fecha_fin**: el sistema sugiere el cierre.
- **Antes de fecha_fin**: el lechero puede cerrar manualmente.
- **Después de fecha_fin**: el sistema marca automáticamente "vencido" y sugiere cierre.
- Al cerrar, se genera una liquidación.

### Renovación
- **Automática:** al cerrar un contrato, se puede crear automáticamente un nuevo contrato.
- **Por defecto:** sí, con la misma duración.
- El lechero puede desactivar la auto-renovación.
- Si el productor no quiere renovar (cambia de lechero), se cierra sin renovación.

## Validaciones

### Antes de crear un contrato
- El cliente debe existir y estar activo.
- El cliente no debe tener otro contrato ACTIVO con el mismo lechero.
- El lechero debe estar activo.

### Antes de modificar la duración
- El contrato debe estar en estado ACTIVO.
- La nueva fecha_fin no debe solapar con otro contrato ACTIVO del mismo par.
- La nueva duración debe ser >= 1 día y <= 90 días (límite razonable).

### Antes de cerrar
- El contrato debe estar en estado ACTIVO.
- Todos los registros del período deben tener estado != PENDIENTE_VENCIDO (o el sistema fuerza la resolución).

## Edge cases

### El cliente tiene contrato con otro lechero simultáneamente
- **Sí, se permite.** Un cliente puede vender a varios lecheros.
- Cada contrato es independiente.

### El lechero intenta cerrar contrato con discrepancias sin resolver
- El sistema **permite** cerrar con discrepancias, pero las marca en la liquidación.
- Las discrepancias quedan registradas para auditoría.

### El cliente quiere terminar el contrato antes de tiempo
- **Solo el lechero puede cerrar** (decisión de diseño).
- El cliente puede **abandonar** simplemente no vendiendo más.
- El sistema cierra el contrato automáticamente si no hay registros por 30+ días.

### El lechero cambia la duración a 30 días
- El sistema recalcula fecha_fin.
- Los registros existentes se mantienen.
- Adelantos y encargos nuevos se asignan al contrato actual.

### El precio cambia durante el contrato
- El precio se snapshot al inicio del contrato (`precio_litro_inicio`).
- Si el lechero quiere aplicar el nuevo precio, debe **cerrar el contrato actual y abrir uno nuevo**.
- Alternativa V2: precio ponderado por período (más complejo).

## Implementación en backend

```typescript
@Injectable()
export class ContratosService {
  async crear(dto: CreateContratoDto, lecheroId: string): Promise<Contrato> {
    // Validar que no haya contrato activo del mismo par
    const existente = await this.prisma.contrato.findFirst({
      where: {
        clienteId: dto.clienteId,
        lecheroId,
        estado: 'ACTIVO',
      },
    });
    if (existente) {
      throw new BusinessException('CONTRACT_ALREADY_ACTIVE');
    }

    // Calcular fechas
    const fechaInicio = dto.fechaInicio || new Date();
    const fechaFin = addDays(fechaInicio, dto.duracionDias - 1);

    return this.prisma.contrato.create({
      data: {
        clienteId: dto.clienteId,
        lecheroId,
        fechaInicio,
        fechaFin,
        duracionDias: dto.duracionDias,
        precioLitroInicio: dto.precioLitroInicio,
        estado: 'ACTIVO',
      },
    });
  }

  async modificarDuracion(id: string, nuevaDuracion: number, lecheroId: string): Promise<Contrato> {
    const contrato = await this.prisma.contrato.findUnique({ where: { id } });
    if (!contrato) throw new NotFoundException();
    if (contrato.lecheroId !== lecheroId) throw new ForbiddenException();
    if (contrato.estado !== 'ACTIVO') throw new BusinessException('CONTRACT_NOT_ACTIVE');

    if (nuevaDuracion < 1 || nuevaDuracion > 90) {
      throw new BusinessException('INVALID_DURATION');
    }

    const nuevaFechaFin = addDays(contrato.fechaInicio, nuevaDuracion - 1);

    return this.prisma.contrato.update({
      where: { id },
      data: {
        duracionDias: nuevaDuracion,
        fechaFin: nuevaFechaFin,
      },
    });
  }
}
```

## UI en app del lechero

### Crear contrato
```
┌────────────────────────────────────────┐
│  Nuevo contrato con [Cliente]         │
│                                        │
│  Fecha de inicio:                      │
│  [Hoy]  [Mañana]  [Fecha específica]  │
│                                        │
│  Duración:                             │
│  [7 días]  [15 días ✓]  [30 días]     │
│  Otro: [___] días                      │
│                                        │
│  Fecha de fin: 29 de septiembre       │
│  (calculada automáticamente)            │
│                                        │
│  Precio por litro: [1.50] S/         │
│  (de tu precio actual)                  │
│                                        │
│  [Cancelar]  [Crear contrato]         │
└────────────────────────────────────────┘
```

### Modificar duración (durante contrato activo)
```
┌────────────────────────────────────────┐
│  Modificar duración del contrato      │
│  con [Cliente]                         │
│                                        │
│  Duración actual: 15 días              │
│  Fecha de fin actual: 29 sept.        │
│                                        │
│  Nueva duración:                       │
│  [___] días                            │
│  Nueva fecha de fin: 14 oct.          │
│                                        │
│  [Cancelar]  [Confirmar cambio]       │
└────────────────────────────────────────┘
```

### Cerrar contrato
```
┌────────────────────────────────────────┐
│  Cerrar contrato con [Cliente]         │
│  Período: 15 - 29 septiembre          │
│                                        │
│  Resumen:                              │
│  • 15 días                             │
│  • 12 días con leche                   │
│  • 3 días "no vendí"                   │
│  • 287 L total                         │
│  • 3 adelantos dados: S/ 500          │
│  • 2 encargos: S/ 80                  │
│  • Precio promedio: S/ 1.50/L         │
│                                        │
│  Monto a pagar: S/ 350.50            │
│  (287 × 1.50 - 500 - 80)            │
│                                        │
│  [Cancelar]  [Generar liquidación]    │
└────────────────────────────────────────┘
```

## Estados del contrato

```
         ┌──────────┐
         │ (nuevo) │
         └────┬─────┘
              │ crear
              ▼
         ┌──────────┐
         │ ACTIVO  │◄──── modificar duración
         └────┬─────┘
              │
              │ cerrar
              ▼
         ┌──────────┐
         │ CERRADO │────► nuevo contrato (auto-renovación)
         └────┬─────┘
              │ liquidar + boleta + pago
              ▼
         (liquidación generada, contrato histórico)
```

## Métricas

- **Duración promedio de contrato** (debería ser ~15 días).
- **% de contratos con auto-renovación** (target >80% para reducir fricción).
- **% de contratos cerrados a tiempo** (target >90%).
- **% de contratos con discrepancias al cierre** (target <5%).