# App Lechero — Pantalla Crítica: "Sacar Cuentas"

## Contexto validado

**Datos del usuario:**
- La sacada de cuentas dura **2-3 días por quincena** (típicamente jueves a domingo).
- **20-40 minutos por cliente** en su casa.
- Carlos y Juan están **juntos, de pie, viendo la app**.
- **El cliente puede ver y discutir todo.**
- Las discrepancias se **resuelven en el momento** (editan al instante).
- Se permiten **editar varios días el litraje** durante la sacado de cuentas.
- El método de pago es **50% efectivo, 50% Yape/transferencia**.
- Al cerrar se genera **boleta en PDF**.

## Importancia de esta pantalla

**Esta es la pantalla MÁS IMPORTANTE de toda la app.** Es donde el sistema demuestra su valor real:
- Antes: 20-40 min, lápiz, papel, calculadora mental, discusiones.
- Después: 5-10 min, todo en pantalla, edición inmediata, boleta automática.

**Si esta pantalla falla, el producto falla.**

## Diseño: Principios

1. **Una sola pantalla, todo visible** (no scroll crítico, scroll secundario OK).
2. **Botones grandes** (uso en casa, con luz variable).
3. **Contraste alto** (lectura con sol).
4. **Cálculo en tiempo real** (cada cambio actualiza totales).
5. **Confirmación explícita** (firma digital al cerrar).
6. **Audio feedback** opcional (haptic al confirmar).
7. **Indicadores visuales** de discrepancia resuelta/pendiente.

## Pantalla principal: "Cerrar contrato con Juan"

```
┌──────────────────────────────────────────────────────┐
│ ← Cerrar contrato con Juan Pérez                    │
│   Quincena: 15 - 29 septiembre                      │
│   Producto: Leche cruda · Precio: S/ 1.50/L       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─ Registros (15 días) ──────────────────────────┐│
│  │ 15 sep  L  18.5  ✓ (Carlos y Juan coinciden)  ││
│  │ 16 sep  M  20.0  ✓                             ││
│  │ 17 sep  M  19.0  ✓                             ││
│  │ 18 sep  J  18.5 / 19.0  ⚠ discrep. [Editar]  ││
│  │ 19 sep  V  20.0  ✓                             ││
│  │ 20 sep  S  --    ℹ Carlos no vino              ││
│  │ 21 sep  D  --    (no se registra)             ││
│  │ 22 sep  L  0/8  ⚠ Juan: no vendí [Editar]    ││
│  │ 23 sep  M  20.0  ✓                             ││
│  │ 24 sep  M  19.0  ✓                             ││
│  │ 25 sep  J  20/19.5  ⚠ discrep. [Editar]      ││
│  │ 26 sep  V  20.0  ✓                             ││
│  │ 27 sep  S  20.0  ✓                             ││
│  │ 28 sep  D  --    (no se registra)             ││
│  │ 29 sep  L  18.0  ✓ (Carlos y Juan coinciden)  ││
│  └──────────────────────────────────────────────┘│
│                                                      │
│  12 días con leche · 3 discrepancias ⚠              │
│  [Resolver discrepancias primero]                   │
│                                                      │
│  ┌─ Adelantos (3) ─────────────────────────────────┐│
│  │ 18 sep  S/ 100  "Para medicinas"    ✓ Juan     ││
│  │ 20 sep  S/ 50   "Para mercado"      ✓ Juan     ││
│  │ 24 sep  S/ 80   "Para colegio"      ⏳ Pendiente││
│  │  [Confirmar pendiente con Juan]                ││
│  │  Total: S/ 230                                ││
│  └──────────────────────────────────────────────┘│
│                                                      │
│  ┌─ Encargos (2) ──────────────────────────────────┐│
│  │ 17 sep  2kg azúcar    S/ 12   ✓ entregado    ││
│  │ 20 sep  Aceite         S/ 18   ✓ entregado    ││
│  │  Total: S/ 30                                  ││
│  └──────────────────────────────────────────────┘│
│                                                      │
│  ┌─ Cálculo ────────────────────────────────────────┐│
│  │  Total litros (post-discrepancia): 287.5 L    ││
│  │  Precio por litro:            S/ 1.50         ││
│  │                                                ││
│  │  SUBTOTAL:                     S/ 431.25       ││
│  │  - Adelantos:                  S/ 230.00       ││
│  │  - Encargos:                    S/ 30.00       ││
│  │  ════════════════════════════════                ││
│  │  TOTAL A PAGAR:                S/ 171.25       ││
│  │                                                ││
│  │  [Cómo se paga este monto]                     ││
│  │  ○ Todo efectivo (S/ 171.25)                  ││
│  │  ○ Todo Yape (S/ 171.25)                      ││
│  │  ○ Todo transferencia (S/ 171.25)              ││
│  │  ◉ Mixto                                       ││
│  │     Efectivo:     S/ [100]                     ││
│  │     Yape:         S/ [71.25]                   ││
│  │     Transfer.:    S/ [0]                       ││
│  │                                                ││
│  │     Total métodos: S/ 171.25 ✓                ││
│  └──────────────────────────────────────────────┘│
│                                                      │
│  [Cancelar]  [Generar boleta y cerrar]              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Pantalla: "Resolver discrepancia del 18 sep"

```
┌──────────────────────────────────────────────────────┐
│ ← Discrepancia: 18 sept (jueves)                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Carlos registró:    18.5 L                         │
│  Juan confirmó:      19.0 L                         │
│                                                      │
│  Diferencia:         +0.5 L (Juan > Carlos)         │
│                                                      │
│  ¿Cuántos litros se vendieron realmente?            │
│  ┌──────────────────────────────────────────────┐  │
│  │  [18] [18.5] [19] [19.5] [20]                │  │
│  │                                              │  │
│  │  Manual: [_______] L                        │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  💡 Tip: si no se acuerdan, anoten el balde,       │
│  pesen al día siguiente, etc.                       │
│                                                      │
│  [Cancelar]  [Guardar 19.5 L]                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Pantalla: "Confirmar adelanto pendiente"

```
┌──────────────────────────────────────────────────────┐
│ ← Confirmar adelanto                                │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Adelanto del 24 de septiembre                     │
│                                                      │
│  Monto:    S/ 80                                    │
│  Motivo:   "Para colegio"                            │
│  Dado por: Carlos                                   │
│                                                      │
│  ¿Juan, confirmas que recibiste este adelanto?     │
│                                                      │
│  Juan: ☐ Confirmo                                   │
│                                                      │
│  Método de confirmación:                            │
│  ◉ PIN     ○ Huella    ○ Cara                      │
│                                                      │
│  Ingresa tu PIN:  [___][___][___][___]              │
│                                                      │
│  [Cancelar]  [Confirmar con PIN]                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Pantalla: "Cierre confirmado"

```
┌──────────────────────────────────────────────────────┐
│ ✓ Contrato cerrado con éxito                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Resumen:                                            │
│  • Total litros: 287.5 L                            │
│  • Subtotal: S/ 431.25                             │
│  • Adelantos: S/ 230.00                            │
│  • Encargos: S/ 30.00                              │
│  • Total a pagar: S/ 171.25                        │
│                                                      │
│  Métodos de pago:                                    │
│  • Efectivo: S/ 100                                │
│  • Yape: S/ 71.25                                  │
│                                                      │
│  [✓] Boleta generada y enviada a Juan               │
│      (juan.perez@gmail.com)                        │
│                                                      │
│  Próximos pasos:                                     │
│  • Liquidación cerrada                              │
│  • Contrato finalizado                              │
│  • Boleta en PDF (descarga)                        │
│                                                      │
│  [Ver boleta PDF]  [Volver al inicio]              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Lógica de cálculo (backend)

```typescript
function calcularLiquidacion(contratoId: string): Liquidacion {
  const contrato = getContrato(contratoId);
  const registros = getRegistros(contratoId);
  const adelantos = getAdelantos(contratoId);
  const encargos = getEncargos(contratoId);

  // 1. Resolver discrepancias (usar valor final)
  const totalLitros = registros.reduce((sum, reg) => {
    return sum + (reg.valorFinal ?? reg.litrosCliente ?? reg.litrosCarlos ?? 0);
  }, 0);

  // 2. Calcular subtotal
  const subtotal = totalLitros * contrato.precioLitroInicio;

  // 3. Restar adelantos confirmados
  const totalAdelantos = adelantos
    .filter(a => a.confirmadoPorCliente)
    .reduce((sum, a) => sum + a.monto, 0);

  // 4. Restar encargos confirmados
  const totalEncargos = encargos
    .filter(e => e.entregado && e.confirmadoPorCliente)
    .reduce((sum, e) => sum + e.precioEstimado, 0);

  // 5. Total
  const total = subtotal - totalAdelantos - totalEncargos;

  return {
    totalLitros,
    subtotal,
    totalAdelantos,
    totalEncargos,
    total,
  };
}
```

## Lógica de cierre

```typescript
async function cerrarLiquidacion(liquidacionId, metodoPago, pagosDetalle) {
  return prisma.$transaction(async (tx) => {
    // 1. Marcar liquidación como CONFIRMADA
    const liq = await tx.liquidacion.update({
      where: { id: liquidacionId },
      data: {
        estado: 'CONFIRMADA',
        metodoPago,
        pagoEfectivo: pagosDetalle.efectivo,
        pagoYape: pagosDetalle.yape,
        pagoTransferencia: pagosDetalle.transferencia,
        confirmadaAt: new Date(),
      },
    });

    // 2. Marcar contrato como CERRADO
    await tx.contrato.update({
      where: { id: liq.contratoId },
      data: { estado: 'CERRADO', cerradoAt: new Date() },
    });

    // 3. Marcar adelantos y encargos como liquidados
    await tx.adelanto.updateMany({
      where: { contratoId: liq.contratoId, liquidado: false },
      data: { liquidado: true, liquidacionId: liq.id },
    });
    await tx.encargo.updateMany({
      where: { contratoId: liq.contratoId, liquidado: false },
      data: { liquidado: true, liquidacionId: liq.id },
    });

    return liq;
  });
}
```

## Edge cases

### El cliente no quiere confirmar digitalmente
- El sistema permite "saltar" la firma digital y continuar.
- Pero el sistema **marca la liquidación como "no firmada por cliente"**.
- Esto es importante para auditoría.
- En el futuro, se puede requerir firma para activar la garantía del servicio.

### Hay adelantos pendientes
- El sistema avisa: "Tienes 1 adelanto sin confirmar de Juan. ¿Deseas continuar sin confirmarlo?"
- Si Carlos decide continuar, el adelanto queda marcado pero sin confirmación del cliente.
- Riesgo: Juan puede reclamar después.

### El cálculo da negativo
- Caso raro pero posible: muchos adelantos/encargos + pocos litros.
- Sistema avisa: "El total a pagar es S/ -X. ¿Estás seguro?"
- Puede ser legítimo (Juan recibió muchos adelantos).
- Carlos puede confirmar o ajustar.

### Carlos cierra sin editar discrepancias
- Sistema usa valor de Carlos como "valor final".
- Liquidación se cierra con observación: "3 días con discrepancia no resuelta. Se usó el valor del lechero."
- Juan puede reclamar después abriendo una disputa.

## Performance

- Cálculo en tiempo real: < 100ms (con 15 registros).
- Edición de discrepancia: < 50ms.
- Cierre de liquidación: < 500ms.
- Generación de boleta: 1-3 segundos (depende de Nubefact).

## Métricas

- **Tiempo medio de sacado de cuentas con app**: target < 10 min/cliente (vs 20-40 min sin app).
- **% de discrepancias resueltas en el momento**: target > 80%.
- **% de adelantos confirmados digitalmente**: target > 70%.
- **% de boletas aceptadas por SUNAT**: target > 99%.
- **% de contratos cerrados a tiempo**: target > 90%.