# Lógica de Liquidación

## Contexto validado

**Datos del usuario:**
- La sacada de cuentas dura **2-3 días** por quincena (típicamente jueves a domingo).
- **20-40 minutos por cliente** en su casa.
- La pantalla debe mostrar **TODO en una sola vista**: litros por día, adelantos, encargos, precio aplicado, cálculo total.
- Se pueden **editar varios días el litraje** al momento de sacar cuentas.
- **Método de pago**: 50% efectivo, 50% Yape/transferencia.
- Al cierre se genera **boleta en PDF**.

## Componentes de la liquidación

### 1. Período
- `fecha_inicio`: día 1 del contrato (default 15 días atrás).
- `fecha_fin`: día 15 del contrato (default hoy o mañana).

### 2. Registros del período
- Lista de los 15 días (o los que tenga el contrato).
- Para cada día:
  - `fecha`
  - `litros_carlos`
  - `litros_cliente`
  - `estado` (con código de color)
  - `valor_final` (después de la resolución)
  - Indicador de discrepancia si aplica

### 3. Adelantos del período
- Lista de adelantos dados durante el período.
- Para cada adelanto:
  - `fecha`
  - `monto`
  - `motivo`
  - `confirmado_por_cliente` (boolean)

### 4. Encargos del período
- Lista de encargos.
- Para cada encargo:
  - `fecha_solicitud`
  - `descripcion`
  - `precio_estimado`
  - `entregado` (boolean)
  - `confirmado_por_cliente` (boolean)

### 5. Precio aplicado
- `precio_litro_inicio` (snapshot del contrato).

### 6. Cálculo total
- `total_litros` = Σ valor_final de cada día
- `monto_bruto` = total_litros × precio_litro
- `total_adelantos` = Σ monto de adelantos del período
- `total_encargos` = Σ precio_estimado de encargos del período
- `monto_neto` = monto_bruto - total_adelantos - total_encargos

### 7. Método de pago
- Enum: `EFECTIVO`, `YAPE`, `TRANSFERENCIA`, `MIXTO`.
- Registrado al momento de marcar como pagada.

## Flujo del cierre

### 1. Inicio del cierre
- Carlos abre la app y selecciona el contrato activo con Juan.
- Toca "Iniciar cierre".
- Sistema crea una `Liquidacion` en estado `BORRADOR`.

### 2. Revisión de discrepancias
- Sistema muestra las discrepancias no resueltas.
- Carlos las revisa con Juan (en persona).
- Editan los valores necesarios.
- Cada edición queda registrada con `resuelto_por_id`, `resuelto_at`, `valor_final`.

### 3. Confirmación de adelantos
- Sistema muestra adelantos del período.
- Carlos confirma cuáles están OK con Juan.
- Si Juan no había confirmado antes, se confirma en este momento (con firma digital).

### 4. Confirmación de encargos
- Sistema muestra encargos del período.
- Carlos confirma cuáles entregó y cuáles están pendientes.
- Los pendientes se facturan igual (Carlos los cobró como deuda).

### 5. Cálculo automático
- Sistema calcula `monto_bruto`, `total_adelantos`, `total_encargos`, `monto_neto`.
- Muestra en pantalla grande.

### 6. Selección de método de pago
- Carlos selecciona el método de pago: `EFECTIVO`, `YAPE`, `TRANSFERENCIA`, `MIXTO`.
- Si es MIXTO, indica cuánto en cada método.

### 7. Cierre de la liquidación
- Carlos confirma el cierre.
- Sistema marca la liquidación como `CONFIRMADA` (o `PAGADA` si marca como pagada en el mismo paso).
- Genera automáticamente la boleta.

### 8. Generación de boleta
- Sistema envía la liquidación al OSE (Nubefact o Efact).
- Espera confirmación (típicamente segundos).
- Recibe PDF y XML.
- Guarda en S3.
- Envía email al cliente (si tiene).
- Marca boleta como `EMITIDA`.

### 9. Notificación al cliente
- Push notification a Juan: "Tu liquidación está lista. S/ 350.50".
- Link directo a la app para revisar.

## UI de la pantalla de cierre (la más importante de la app)

```
┌──────────────────────────────────────────────────┐
│ ←  Cerrar contrato con Juan Pérez                │
│    Quincena: 15-29 septiembre                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─ Resumen ───────────────────────────────────┐│
│  │  Período: 15 días                          ││
│  │  Días con leche: 12                        ││
│  │  Días discrepancia: 3 ⚠                   ││
│  │  Días "no vendí": 1 ⚠                     ││
│  │  Adelantos del período: 3                  ││
│  │  Encargos del período: 2                  ││
│  └────────────────────────────────────────────┘│
│                                                  │
│  [Ver detalles de discrepancias]                 │
│  [Ver resumen de adelantos]                      │
│  [Ver resumen de encargos]                       │
│                                                  │
│  ┌─ Cálculo ─────────────────────────────────────┐
│  │  Total litros: 287.5 L                      ││
│  │  Precio por litro: S/ 1.50                  ││
│  │  Subtotal: S/ 431.25                       ││
│  │  - Adelantos: S/ 80.00                     ││
│  │  - Encargos: S/ 30.00                      ││
│  │  ───────────────────────                    ││
│  │  TOTAL A PAGAR: S/ 321.25                  ││
│  │                                              ││
│  │  [Cómo se paga este monto]                  ││
│  │   ○ Todo efectivo (S/ 321.25)               ││
│  │   ○ Todo Yape (S/ 321.25)                  ││
│  │   ○ Mixto                                   ││
│  │     Efectivo: S/ [____]                     ││
│  │     Yape: S/ [____]                         ││
│  │     Transferencia: S/ [____]                ││
│  └────────────────────────────────────────────┘│
│                                                  │
│  [Cancelar]  [Generar boleta y cerrar]          │
│                                                  │
└──────────────────────────────────────────────────┘
```

## UI de la pantalla "Ver detalles de discrepancias"

```
┌──────────────────────────────────────────────────┐
│  Discrepancias del contrato                       │
├──────────────────────────────────────────────────┤
│                                                  │
│  18 sept (vie) — Carlos: 18.5 / Juan: 19.0     │
│  [Editar]                                         │
│                                                  │
│  22 sept (mar) — Carlos: 0 / Juan: 8 (no vendió) │
│  [Editar]                                         │
│                                                  │
│  25 sept (vie) — Carlos: 20 / Juan: 19.5         │
│  [Editar]                                         │
│                                                  │
│  [Volver]                                        │
└──────────────────────────────────────────────────┘
```

## UI de adelantos

```
┌──────────────────────────────────────────────────┐
│  Adelantos del período                            │
├──────────────────────────────────────────────────┤
│                                                  │
│  18 sept — S/ 100 — "Para medicinas"             │
│  Juan: ✓ Confirmado                              │
│                                                  │
│  20 sept — S/ 50 — "Para mercado"                │
│  Juan: ✓ Confirmado                              │
│                                                  │
│  24 sept — S/ 80 — "Para colegio"                 │
│  Juan: ⏳ Pendiente de confirmar                 │
│  [Confirmar con PIN]                              │
│                                                  │
│  Total adelantos: S/ 230                         │
│  Confirmados: S/ 150                            │
│  Pendientes: S/ 80                              │
│                                                  │
│  [Volver]                                        │
└──────────────────────────────────────────────────┘
```

## Implementación en backend

```typescript
@Injectable()
export class LiquidacionesService {
  async iniciarCierre(contratoId: string, lecheroId: string): Promise<Liquidacion> {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id: contratoId },
      include: { registros: true, adelantos: true, encargos: true },
    });

    if (contrato.lecheroId !== lecheroId) throw new ForbiddenException();
    if (contrato.estado !== 'ACTIVO') throw new BusinessException('CONTRACT_NOT_ACTIVE');

    // Crear liquidación en BORRADOR
    return this.prisma.liquidacion.create({
      data: {
        contratoId,
        fechaInicio: contrato.fechaInicio,
        fechaFin: contrato.fechaFin,
        estado: 'BORRADOR',
        totalLitros: this.calcularTotalLitros(contrato.registros),
        precioPromedioEfectivo: contrato.precioLitroInicio,
        montoBruto: this.calcularMontoBruto(contrato.registros, contrato.precioLitroInicio),
        totalAdelantos: this.calcularTotalAdelantos(contrato.adelantos),
        totalEncargos: this.calcularTotalEncargos(contrato.encargos),
        montoNeto: this.calcularMontoNeto(...),
      },
    });
  }

  async cerrar(liquidacionId: string, metodoPago: string, lecheroId: string): Promise<Liquidacion> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Marcar liquidación como CONFIRMADA
      const liq = await tx.liquidacion.update({
        where: { id: liquidacionId },
        data: {
          estado: 'CONFIRMADA',
          metodoPago,
          confirmadaAt: new Date(),
        },
      });

      // 2. Marcar contrato como CERRADO
      await tx.contrato.update({
        where: { id: liq.contratoId },
        data: { estado: 'CERRADO', cerradoAt: new Date() },
      });

      // 3. Marcar adelantos como liquidados
      await tx.adelanto.updateMany({
        where: { contratoId: liq.contratoId, liquidado: false },
        data: { liquidado: true, liquidacionId: liq.id },
      });

      // 4. Marcar encargos como liquidados
      await tx.encargo.updateMany({
        where: { contratoId: liq.contratoId, liquidado: false },
        data: { liquidado: true, liquidacionId: liq.id },
      });

      // 5. Disparar job de generación de boleta
      await this.boletasQueue.add('generar-boleta', { liquidacionId: liq.id });

      return liq;
    });
  }
}
```

## Generación de boleta (background job)

```typescript
@Processor('boletas')
export class BoletasProcessor {
  @Process('generar-boleta')
  async generarBoleta(job: Job<{ liquidacionId: string }>) {
    const liq = await this.prisma.liquidacion.findUnique({
      where: { id: job.data.liquidacionId },
      include: { contrato: { include: { cliente: { include: { user: true } } } } },
    });

    // 1. Enviar a Nubefact/Efact
    const response = await this.oseClient.emitirBoleta({
      ruc: liq.contrato.cliente.user.ruc || '99999999999', // DNI o RUC
      serie: 'B001',
      numero: await this.getNextCorrelativo('B001'),
      tipoDocumento: '03', // Boleta
      fechaEmision: new Date().toISOString().split('T')[0],
      cliente: {
        tipoDocumento: liq.contrato.cliente.user.ruc ? '6' : '1', // 6=RUC, 1=DNI
        numeroDocumento: liq.contrato.cliente.user.dni || liq.contrato.cliente.user.ruc,
        razonSocial: liq.contrato.cliente.user.nombre,
      },
      items: [{
        descripcion: `Leche cruda - Quincena ${liq.fechaInicio} a ${liq.fechaFin}`,
        cantidad: liq.totalLitros,
        unidadMedida: 'LITROS',
        valorUnitario: liq.precioPromedioEfectivo,
        precioVenta: liq.montoBruto,
      }],
      total: liq.montoNeto,
    });

    // 2. Guardar boleta
    await this.prisma.boleta.create({
      data: {
        liquidacionId: liq.id,
        tipo: 'boleta',
        serie: 'B001',
        numero: response.numero,
        montoTotal: liq.montoNeto,
        igv: 0, // Leche exonerada
        estado: 'EMITIDA',
        oseTicket: response.ticket,
        pdfUrl: response.pdfUrl,
        xmlUrl: response.xmlUrl,
        emitidaAt: new Date(),
      },
    });

    // 3. Enviar email al cliente (si tiene)
    if (liq.contrato.cliente.user.email) {
      await this.emailService.send({
        to: liq.contrato.cliente.user.email,
        subject: `Tu boleta de leche está disponible`,
        template: 'boleta',
        data: { ... },
        attachments: [{ url: response.pdfUrl, filename: 'boleta.pdf' }],
      });
    }

    // 4. Notificar al cliente
    await this.notificationsService.push(liq.contrato.cliente.userId, 'CLIENTE', {
      type: 'BOLETA_DISPONIBLE',
      liquidacionId: liq.id,
    });
  }
}
```

## Edge cases

### Carlos cierra el contrato sin pasar por casa de Juan
- La liquidación se genera igual.
- Juan puede revisar y reclamar después si no está de acuerdo.
- Estado: `DISPUTADA` si Juan abre una disputa.

### Juan abre una disputa después del cierre
- Sistema abre una `Disputa`.
- Admin interviene.
- La liquidación se mantiene mientras se resuelve.

### Carlos marca como pagado pero no le paga a Juan
- Caso raro pero posible.
- Admin debe intervenir.
- El sistema no puede detectar esto automáticamente (pago es externo).

### Boleta rechazada por SUNAT
- OSE devuelve error.
- Sistema notifica a Carlos.
- Carlos puede corregir y reenviar.
- La liquidación se mantiene pero la boleta queda PENDIENTE.

### Cambio de precio durante el contrato
- El precio se snapshot al inicio.
- No afecta la liquidación actual.
- Próximos contratos usarán el nuevo precio.

## Métricas

- **Tiempo medio de sacado de cuentas con app**: target < 5 min/cliente (vs 20-40 sin app).
- **% de contratos cerrados a tiempo**: target > 90%.
- **% de liquidaciones con discrepancia no resuelta**: target < 5%.
- **% de boletas aceptadas por SUNAT**: target > 99%.
- **% de liquidaciones pagadas con Yape vs efectivo**: medir para confirmar el 50/50.