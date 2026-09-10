# WF-L-06: Sacar Cuentas (Cierre de Quincena) — App Lechero (Carlos)

> ⭐ **LA PANTALLA MÁS IMPORTANTE DE TODA LA APP.** Aquí el sistema demuestra su valor real: 20-40 min → 5-10 min, sin discusiones, con boleta automática. Si esta pantalla falla, el producto falla.

## Contexto validado

- La sacado de cuentas dura **2-3 días por quincena** (típicamente jueves a domingo).
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

## Datos que muestra

### Header
- Nombre del cliente (Juan Pérez)
- Período (15 - 29 sept)
- Producto (Leche cruda)
- Precio por litro (S/ 1.50)

### Sección 1: Registros (15 días)
Tabla con cada día de la quincena, mostrando:
- Día (L M M J V S D)
- Litros (con color: verde=coincide, amarillo=discrepancia, gris=no venta)
- Estado (✓ o ⚠ o —)
- Botón [Editar] si hay discrepancia

### Sección 2: Adelantos
- Lista de adelantos del período
- Estado: confirmado por Juan / pendiente
- Total sumado al cálculo

### Sección 3: Encargos
- Lista de encargos del período
- Estado: entregado y confirmado
- Total sumado al cálculo

### Sección 4: Cálculo
- Total litros (post-discrepancias)
- Precio por litro
- Subtotal
- - Adelantos
- - Encargos
- **= Total a pagar**

### Sección 5: Forma de pago
- 3 inputs: Efectivo, Yape, Transferencia
- Total calculado en vivo

## Acciones disponibles
- Editar cada registro (especialmente discrepancias)
- Confirmar pendiente de Juan
- Cambiar la forma de pago
- Generar boleta y cerrar

## Wireframe (la pantalla completa)

```
┌──────────────────────────────────────┐
│ 11:42   📶 3G  45%  ▮▮▮▮▮           │
├──────────────────────────────────────┤
│ ← Cerrar contrato           ❓       │
├──────────────────────────────────────┤
│                                       │
│ Quincena 15-29 sept · Juan Pérez     │
│                                       │
│ ⚠ 2 discrepancias por resolver       │
│                                       │
│ ┌─ 📋 REGISTROS (15 días) ─────────┐│
│ │ 12 con leche · 3 discrepancias   ││
│ │ ──────────────────────────────── ││
│ │ 15 L  18.5/18.5  ✓ Carlos + Juan ││
│ │ 16 M  20.0/20.0  ✓              ││
│ │ 17 M  19.0/19.0  ✓              ││
│ │ 18 J  18.5/19.0  ⚠ [Editar]     ││
│ │ 19 V  20.0/20.0  ✓              ││
│ │ 20 S  —/—       ℹ Carlos no vino ││
│ │ 21 D  —/—       (no se registra)││
│ │ 22 L  0/0       ℹ Juan: no vendí ││
│ │ 23 M  20.0/20.0  ✓              ││
│ │ 24 M  19.0/19.0  ✓              ││
│ │ 25 J  20.0/19.5  ⚠ [Editar]     ││
│ │ 26 V  20.0/20.0  ✓              ││
│ │ 27 S  20.0/20.0  ✓              ││
│ │ 28 D  —/—       (no se registra)││
│ │ 29 L  18.0/18.0  ✓ Carlos + Juan ││
│ └───────────────────────────────────┘│
│                                       │
│ ┌─ 💰 ADELANTOS (3) ────────────────┐│
│ │ 18 sep  S/ 100  "medicinas"  ✓  ││
│ │ 20 sep  S/  50  "mercado"    ✓  ││
│ │ 24 sep  S/  80  "colegio"  ⏳  ││
│ │ Total: S/ 230                  ││
│ └───────────────────────────────────┘│
│                                       │
│ ┌─ 🛒 ENCARGOS (2) ─────────────────┐│
│ │ 17 sep  2kg azúcar  S/ 12  ✓   ││
│ │ 20 sep  Aceite       S/ 18  ✓   ││
│ │ Total: S/ 30                   ││
│ └───────────────────────────────────┘│
│                                       │
│ ┌─ CÁLCULO ─────────────────────────┐│
│ │ Total litros: 287.5 L           ││
│ │ Precio × L:    S/ 1.50         ││
│ │                                ││
│ │ Subtotal:      S/ 431.25       ││
│ │ − Adelantos:   − S/ 230.00     ││
│ │ − Encargos:    − S/  30.00     ││
│ │ ═══════════════════════         ││
│ │ A PAGAR:       S/ 171.25       ││
│ └───────────────────────────────────┘│
│                                       │
│ ┌─ 💵 FORMA DE PAGO ───────────────┐│
│ │ ◉ Todo efectivo                ││
│ │ ○ Todo Yape                    ││
│ │ ○ Todo transferencia            ││
│ │ ● Mixto                        ││
│ │   💵 Efectivo:   S/ [100]      ││
│ │   📱 Yape:       S/ [71.25]    ││
│ │   🏦 Transfer.:  S/ [0]        ││
│ │                                ││
│ │   Total métodos: S/ 171.25 ✓   ││
│ └───────────────────────────────────┘│
│                                       │
│ [Cancelar]  [📄 Generar boleta]      │
└──────────────────────────────────────┘
```

## Wireframe (Resolver discrepancia — modal)

```
┌──────────────────────────────────────┐
│ ← Discrepancia: 18 sept (jueves)    │
├──────────────────────────────────────┤
│                                       │
│ Carlos registró:    18.5 L           │
│ Juan confirmó:      19.0 L           │
│                                       │
│ Diferencia:         +0.5 L           │
│                       (Juan > Carlos) │
│                                       │
│ ¿Cuántos litros se vendieron         │
│ realmente?                           │
│                                       │
│ ┌────┬────┬────┬────┬────┐          │
│ │ 18 │18.5│ 19 │19.5│ 20 │          │
│ └────┴────┴────┴────┴────┘          │
│                                       │
│ Manual: [_______] L                  │
│                                       │
│ 💡 Tip: si no se acuerdan,           │
│ anoten el balde, pesen al día         │
│ siguiente, etc.                      │
│                                       │
│ [Cancelar]  [Guardar 18.5 L]         │
└──────────────────────────────────────┘
```

## Wireframe (Confirmar adelanto pendiente)

```
┌──────────────────────────────────────┐
│ ← Confirmar adelanto                │
├──────────────────────────────────────┤
│                                       │
│ Adelanto del 24 de septiembre         │
│                                       │
│ Monto:    S/ 80                      │
│ Motivo:   "Para colegio"              │
│ Dado por: Carlos                      │
│                                       │
│ ¿Juan, confirmas que recibiste este   │
│ adelanto?                             │
│                                       │
│ Juan: ☐ Confirmo                     │
│                                       │
│ Método de confirmación:               │
│ ◉ PIN   ○ Huella   ○ Cara           │
│                                       │
│ Ingresa tu PIN: [___][___][___][___]  │
│                                       │
│ [Cancelar]  [Confirmar con PIN]      │
└──────────────────────────────────────┘
```

## Wireframe (Cierre confirmado)

```
┌──────────────────────────────────────┐
│ ✓ Contrato cerrado con éxito         │
├──────────────────────────────────────┤
│                                       │
│ Resumen:                              │
│ • Total litros: 287.5 L              │
│ • Subtotal: S/ 431.25                │
│ • Adelantos: S/ 230.00               │
│ • Encargos: S/ 30.00                 │
│ • Total a pagar: S/ 171.25           │
│                                       │
│ Métodos de pago:                      │
│ • Efectivo: S/ 100                   │
│ • Yape: S/ 71.25                     │
│                                       │
│ [✓] Boleta generada y enviada        │
│     a Juan (juan.perez@gmail.com)     │
│                                       │
│ Próximos pasos:                       │
│ • Liquidación cerrada                │
│ • Contrato finalizado                │
│ • Boleta en PDF (descarga)           │
│                                       │
│ [Ver boleta PDF]  [Volver al inicio]  │
└──────────────────────────────────────┘
```

## Lógica de cálculo

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

  return { totalLitros, subtotal, totalAdelantos, totalEncargos, total };
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

### Carlos tiene empleado activo
- El sistema muestra al lado de cada acción: "Registrado por: empleado_1 (12 sept 14:30)"
- Si el empleado hizo algo que Carlos no vio, queda en audit log.

## Performance

- Cálculo en tiempo real: < 100ms (con 15 registros).
- Edición de discrepancia: < 50ms.
- Cierre de liquidación: < 500ms.
- Generación de boleta: 1-3 segundos (depende de Nubefact).

## Métricas

- **Tiempo medio de sacado de cuentas con app:** target < 10 min/cliente (vs 20-40 min sin app).
- **% de discrepancias resueltas en el momento:** target > 80%.
- **% de adelantos confirmados digitalmente:** target > 70%.
- **% de boletas aceptadas por SUNAT:** target > 99%.
- **% de contratos cerrados a tiempo:** target > 90%.

## Conexiones

- **←** WF-L-01 (home): tap en "Quincena" del bottom nav
- **←** WF-L-08 (estadísticas): desde reporte quincenal
- **→** WF-L-07 (cerrar y boleta): botón "Generar boleta"
- **→** Juan recibe push notification (ver WF-C-06)

## Versión
1.0 — 2026-09-07 — Documento inicial basado en `sacar-cuentas.md` validado.
