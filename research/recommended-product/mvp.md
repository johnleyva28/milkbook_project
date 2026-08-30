# Producto recomendado — MVP, V2 y Fuera de alcance

## MVP (Producto Mínimo Viable)

### Features esenciales

#### F-MVP-1: Registro de entregas con verificación
- **Descripción:** Carlos (comprador) registra una entrega por productor con: litros, fecha, hora, opcionalmente foto del porongo o balanza.
- **Datos:** product_id, litros, fecha, timestamp, foto_url (opcional), GPS (opcional).
- **Confirmación:** María recibe un WhatsApp con el resumen; ella responde "OK" o corrige.
- **Modo offline:** Si Carlos no tiene señal, registra local y sincroniza después.
- **Acción:** Confirmar el registro dispara cálculo automático del monto a la fecha (litros × precio vigente).

#### F-MVP-2: Trazabilidad de cambios de precio
- **Descripción:** Carlos registra un cambio de precio (precio anterior, nuevo, fecha, motivo).
- **Datos:** producto, precio_anterior, precio_nuevo, fecha_cambio, motivo (texto libre), usuario_id.
- **Notificación:** María recibe WhatsApp: "A partir del 15-Mar, el precio de tu leche cambió a S/ 1.50. Motivo: ajuste de mercado."
- **Visualización:** Cada entrega muestra el precio que aplicó (auditable).

#### F-MVP-3: Liquidación digital automática
- **Descripción:** Período (ej. 1 al 15 de marzo). Sistema calcula para cada productor: Σlitros × precio_de_cada_día - adelantos = monto.
- **Generación:** Botón "Generar liquidación". Produce un PDF descargable.
- **Detalle:** Por cada entrega: fecha, litros, precio aplicado.
- **Firma simple:** Botón "Confirmo" del productor en WhatsApp.
- **Envío:** Botón "Enviar liquidación" → WhatsApp al productor con PDF.

#### F-MVP-4: Adelantos
- **Descripción:** Carlos registra un adelanto para un productor (monto, fecha, motivo).
- **Visualización:** En la próxima liquidación, se descuenta automáticamente.
- **Confirmación:** Productor recibe WhatsApp con detalle del adelanto.

#### F-MVP-5: Multi-tenant y autenticación
- **Descripción:** Cada comprador es un tenant. Sus productores son usuarios con permisos limitados.
- **Auth:** Email + password + 2FA opcional.
- **Roles:** BuyerAdmin, BuyerOperator, BuyerCounter, Producer.

### Features NO en MVP (V2)

- ❌ Emisión de boletas de venta electrónicas vía OSE.
- ❌ Integración con Yape/Plin.
- ❌ Reportes avanzados con gráficos.
- ❌ Multi-sede para un comprador.
- ❌ Módulo de asociación (consolidación de N compradores).
- ❌ Trazabilidad SENASA hasta la vaca.

### Features NO en V2 (V3+)

- ❌ Marketplace.
- ❌ Calidad con sensores.
- ❌ Predicción de precios con IA.
- ❌ Microcréditos basados en historial.

## V2 (después de validar MVP)

### F-V2-1: Emisión de boletas de venta electrónicas
- Integración con OSE (Nubefact, Efact, Izipay, etc.).
- Generación de boletas desde la liquidación o desde una venta directa.
- Costo: incluido en Tier 2 / Tier 3.

### F-V2-2: Integración con Yape/Plin
- API de Yape para registrar pagos automáticamente.
- Webhook de Plin para confirmar pagos recibidos.

### F-V2-3: Reportes avanzados
- Gráficos de producción por período, por productor.
- Análisis de precios históricos vs mercado.
- Exportación Excel/PDF.

### F-V2-4: Multi-sede
- Un comprador con varios puntos de acopio.
- Cada punto = un "site".

### F-V2-5: Módulo de Asociación
- Asociación de productores consolida datos de N compradores.
- Reportes para junta directiva.

### F-V2-6: Calidad con entrada manual
- Campo "densidad", "temperatura", "grasa" en cada entrega.
- Bonificación/penalización automática según reglas del comprador.

## Fuera de alcance (no se construye en ningún horizonte)

### ❌ NO construir
- App móvil nativa para productores (WhatsApp es suficiente).
- Marketplace de leche cruda (la供需关系 es local).
- Trazabilidad individual por vaca (V3 con SENASA).
- Sistema de pagos integrado completo (solo registramos pagos externos).
- Inteligencia artificial avanzada (V3).
- Conexión con plantas grandes como Gloria (sus proveedores directos no son nuestro target primario).
- Soporte multi-país desde el día 1 (Perú primero; expansión en V3+).

## Criterios de éxito del MVP

### Criterio 1 — Adopción inicial
- 3-5 compradores pagando después de 3 meses del lanzamiento.
- 50+ productores registrados y usando WhatsApp.

### Criterio 2 — Engagement
- Promedio de 20+ entregas registradas por comprador por mes.
- Tasa de apertura de notificaciones WhatsApp > 70%.

### Criterio 3 — Retención
- Churn mensual < 10%.
- NPS > 30.

### Criterio 4 — Monetización
- Ingresos mensuales > S/ 200 en mes 3.
- LTV > CAC.

## Riesgos del MVP

| Riesgo | Mitigación |
| --- | --- |
| Carlos no usa la app porque prefiere la libreta | Onboarding presencial en Cajamarca; ofrecer gratis los primeros 3 meses. |
| María no recibe WhatsApp (no tiene datos) | SMS como fallback. |
| Cambio de SUNAT (exoneración IGV vence 31/12/2026) | Arquitectura flexible; reglas tributarias configurables. |
| Competencia (Tribu Hacienda llega a Perú) | Diferenciación por WhatsApp-first + SUNAT + offline; velocidad de ejecución. |

## Reflexión crítica final

> **El MVP debe ser DEMOSTRABLE end-to-end**, no una demo estática. Necesitamos mostrar:
> 1. Carlos registra una entrega.
> 2. María confirma por WhatsApp.
> 3. Carlos cambia el precio; María recibe notificación.
> 4. Carlos genera liquidación; María confirma; PDF descargable.

> Si estos 4 flujos funcionan, **el producto tiene valor demostrable**. El resto se construye encima.