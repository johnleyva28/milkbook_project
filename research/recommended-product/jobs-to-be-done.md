# Producto recomendado — Jobs to be Done

## Marco conceptual

> "Cuando [situación], quiero [motivación], para [resultado esperado]."

## Para el Comprador (Carlos)

### JTBD-1
> **Cuando** Carlos recibe leche de sus productores cada mañana,
> **quiero** registrar de forma rápida y verificable cuántos litros me entregó cada uno,
> **para** no tener disputas y tener respaldo ante SUNAT.

### JTBD-2
> **Cuando** Carlos necesita cambiar el precio por litro,
> **quiero** que el cambio quede registrado con fecha, motivo y notificar a los productores,
> **para** evitar reclamos y tener trazabilidad.

### JTBD-3
> **Cuando** llega el día de pago (cada 15-30 días),
> **quiero** generar automáticamente la liquidación de cada productor con el detalle correcto,
> **para** pagar lo justo y ahorrar tiempo administrativo.

### JTBD-4
> **Cuando** un productor pide un adelanto,
> **quiero** registrarlo claramente con confirmación,
> **para** descontarlo correctamente en la próxima liquidación.

### JTBD-5
> **Cuando** Carlos quiere ver el rendimiento de su negocio,
> **quiero** reportes claros de litros comprados, precio promedio, gastos,
> **para** tomar mejores decisiones.

### JTBD-6
> **Cuando** SUNAT le pide respaldos,
> **quiero** generar comprobantes o liquidaciones digitales consistentes,
> **para** demostrar formalidad.

## Para la Productora (María)

### JTBD-1
> **Cuando** María entrega leche al comprador cada mañana,
> **quiero** recibir una confirmación simple de los litros entregados,
> **para** tener seguridad de que le pagan por lo correcto.

### JTBD-2
> **Cuando** el comprador cambia el precio,
> **quiero** enterarme por WhatsApp,
> **para** entender por qué recibo menos (o más).

### JTBD-3
> **Cuando** llega la fecha de pago,
> **quiero** ver el detalle de mi liquidación antes de aceptar el pago,
> **para** verificar que esté correcta.

### JTBD-4
> **Cuando** María pide un adelanto al comprador,
> **quiero** que quede constancia del monto y fecha,
> **para** que me lo descuenten solo una vez.

## Para el Centro de Acopio / Quesero (Don Pedro)

### JTBD-1
> **Cuando** llegan entregas de múltiples productores,
> **quiero** consolidar litros, aplicar reglas de calidad, y registrar pagos pendientes,
> **para** calcular correctamente lo que debo a cada uno.

### JTBD-2
> **Cuando** Don Pedro vende queso a un supermercado,
> **quiero** emitir boletas de venta electrónicas sin aprender SEE-SOL,
> **para** cumplir con SUNAT sin complicarme.

### JTBD-3
> **Cuando** Don Pedro necesita evaluar el rendimiento de su negocio,
> **quiero** reportes que comparen precio de compra, costos, margen,
> **para** decidir a qué precio vender.

## Out of Scope (no son jobs to be done de MVP)

- ❌ Marketplace de leche cruda.
- ❌ Trazabilidad hasta la vaca individual con SENASA.
- ❌ Análisis de calidad con sensores.
- ❌ Predicción de precios con IA.
- ❌ Compra/venta entre usuarios (la供需关系 es local y personal).

## Priorización para MVP

| Prioridad | Job | Justificación |
| --- | --- | --- |
| **Crítica** | JTBD-C1 (registro de entregas) | Es el core del producto. Sin esto, no hay plataforma. |
| **Crítica** | JTBD-C2 (cambios de precio) | Resuelve la mayor queja del productor. |
| **Crítica** | JTBD-C3 (liquidaciones) | Resuelve la mayor fricción administrativa del comprador. |
| **Alta** | JTBD-C4 (adelantos) | Complementa la liquidación. |
| **Alta** | JTBD-M1 (confirmación productor) | Simétrico a JTBD-C1. |
| **Alta** | JTBD-M2 (notificación precio) | Simétrico a JTBD-C2. |
| **Media** | JTBD-M3 (ver liquidación) | Simétrico a JTBD-C3. |
| **Media** | JTBD-C5 (reportes básicos) | Valor agregado. |
| **Baja (V2)** | JTBD-C6 + JTBD-D2 (facturación electrónica) | Útil pero no core. |
| **Baja (V2)** | JTBD-D1 + JTBD-D3 (multi-productor, reportes avanzados) | Para Don Pedro. |

## Hipótesis de validación

> **Hipótesis #1 (crítica):** Si Carlos puede registrar una entrega en menos de 30 segundos desde su celular, lo hará todos los días.
>
> **Hipótesis #2:** Si María recibe una notificación por WhatsApp confirmando sus litros, se sentirá más segura y exigirá ese estándar.
>
> **Hipótesis #3:** Si el comprador puede generar la liquidación en 5 minutos (vs 30 hoy), pagaría S/ 30/mes.
>
> **Hipótesis #4:** Si María ve un cambio de precio sin explicación previa, dejará de confiar y venderá a otro comprador (riesgo de churn).

Estas hipótesis se validan en las entrevistas previas al MVP (Fase 1 de validación).