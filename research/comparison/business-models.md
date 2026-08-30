# Modelo de negocio y monetización

## Decisión estratégica

> **Modelo B2B:** el comprador formal es el cliente. El productor es usuario final gratuito.

### Por qué B2B y no B2C

- El productor tiene baja capacidad de pago.
- El productor tiene baja alfabetización digital.
- El productor no tiene incentivo individual para digitalizar.
- El comprador es quien tiene incentivo (ahorro administrativo, trazabilidad para SUNAT, defensa ante auditorías).
- El comprador puede ser un acopio formal que factura y paga impuestos.

## Tieres de monetización

### Tier 0 — Gratis (Productor)
- Ver su propio historial de entregas.
- Recibir notificaciones de cambios de precio.
- Ver liquidaciones digitales que el comprador envía.
- Confirmar entregas desde WhatsApp (sin instalar app).
- **Limitaciones:** Sin exportación, sin anticipos.

### Tier 1 — Comprador Básico — S/ 30/mes
- Registro ilimitado de productores.
- Registro de entregas (web + app Flutter).
- Cambios de precio trazables.
- Liquidaciones digitales con detalle.
- Notificaciones a productores por WhatsApp/SMS.
- Reportes básicos.
- **Límite:** Hasta 30 productores. Sin facturación electrónica.

### Tier 2 — Comprador Pro — S/ 80/mes
- Todo lo del Tier 1.
- Hasta 100 productores.
- Emisión de boletas de venta electrónicas vía OSE (costo del OSE incluido en tier).
- Reportes avanzados.
- Soporte prioritario.

### Tier 3 — Centro de Acopio Formal — S/ 200/mes
- Todo lo del Tier 2.
- Productores ilimitados.
- Multi-sede (ej. varios puntos de acopio).
- Integración con ERP opcional.
- Factura electrónica completa.
- Guías de Remisión Electrónicas.
- API para integraciones.

### Tier 4 — Asociación de Productores — S/ 150/mes + onboarding
- Todo lo del Tier 2.
- Consolidación de datos de N socios.
- Reportes para junta directiva.
- Onboarding asistido (costo adicional).

## Canales de adquisición

### Canal 1: Agroideas / MIDAGRI
- **Estrategia:** Alianza con Agroideas para que los planes de negocio de asociaciones lácteas incluyan nuestra herramienta.
- **Ventaja:** Acceso directo a 321+ planes de negocio en Cajamarca.
- **Costo:** Bajo (alianza estratégica).

### Canal 2: SENASA / Direcciones Regionales de Agricultura
- **Estrategia:** Presentar como herramienta complementaria a la trazabilidad animal.
- **Ventaja:** Respaldo institucional.

### Canal 3: Asociaciones de productores
- **Estrategia:** Venta directa a asociaciones (Hualgayoc, Conchán, Puruay Alto, etc.).
- **Ventaja:** Cada asociación puede ser un tenant.

### Canal 4: Queseros artesanales
- **Estrategia:** Demo gratuita + onboarding.
- **Ventaja:** El quesero tiene mayor poder adquisitivo que el productor.

### Canal 5: Marketing directo
- **Estrategia:** Landing page + content marketing (videos cortos en TikTok, YouTube).
- **Costo:** Medio.

### Canal 6: Aliados comerciales
- **Estrategia:** Aliados del sector lácteo (proveedores de porongos, equipos de ordeño, plantas).
- **Costo:** Comisiones.

## Proyección financiera (escenario conservador)

### Año 1 (post-MVP)
- 30 clientes pagando Tier 1 (S/ 30/mes) = S/ 900/mes = S/ 10,800/año.
- 5 clientes pagando Tier 2 (S/ 80/mes) = S/ 400/mes = S/ 4,800/año.
- Total año 1: S/ 15,600.
- Costos: hosting, mantenimiento, soporte.
- **Margen: probablemente negativo** (inversión en MVP).

### Año 2
- 100 clientes Tier 1 + 30 Tier 2 + 5 Tier 3 = S/ (3,000 + 2,400 + 1,000) = S/ 6,400/mes = S/ 76,800/año.
- Costos operativos ~40% = S/ 30,720.
- **Margen: ~S/ 46,000/año.**

### Año 3
- 300 + 80 + 15 + 5 = 400 clientes promedio.
- Ticket promedio ponderado: ~S/ 65/mes.
- Ingreso anual: ~S/ 312,000.
- Costos: ~S/ 124,000.
- **Margen: ~S/ 188,000/año.**

> **Estos son números conservadores.** Si el producto tiene tracción real, podrían ser 5x mayores.

## Riesgos financieros

- **Riesgo de baja conversión:** ¿Cuántos compradores pagan realmente? Necesitamos validar.
- **Riesgo de churn:** Comprador informal puede abandonar después de 3 meses.
- **Riesgo de CAC alto:** Si no conseguimos canales eficientes.
- **Riesgo de morosidad:** Compradores informales pueden no pagar.

## Mitigación

- **CAC bajo** = alianzas con Agroideas, SENASA, asociaciones (no marketing de pago).
- **Churn bajo** = valor inmediato desde día 1 (liquidación automática).
- **Morosidad** = prepago mensual, sin permanencia pero con cargo retroactivo si deja de pagar.

## Reflexión crítica final

> **Este modelo de negocio es viable solo si:**
> 1. Validamos willingness-to-pay antes de invertir significativamente.
> 2. Tenemos al menos 1 cliente piloto pagando en los primeros 3 meses post-MVP.
> 3. Construimos canales de adquisición baratos (instituciones públicas, asociaciones).

> Si **ninguna** de estas se cumple, **Idea B también fracasa**. La diferencia es que **Idea B tiene más chances de éxito** que Idea A.