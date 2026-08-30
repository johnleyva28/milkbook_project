# Producto recomendado: Problema y propuesta de valor

## Problema

> **En la cadena láctea peruana informal, los productores pequeños pierden plata real cada semana porque no hay forma de verificar cuánta leche entregaron, a qué precio, ni cuánto les corresponde cobrar.**

### Detalle del problema

1. **Litros no verificados:** El productor y el comprador registran por separado; cuando hay diferencia, el productor pierde.
2. **Precios cambiantes sin trazabilidad:** El comprador cambia el precio sin avisar; el productor se entera al recibir menos.
3. **Liquidaciones verbales:** Cada 15-30 días, "cuentan a mano"; errores humanos generan pérdidas.
4. **Adelantos no registrados:** Préstamos sin papel; disputas sobre cuánto se descontó.
5. **Falta de facturas:** Comprador informal no puede justificar gastos ni acceder a crédito.

### Quién tiene el problema

- **388,454 pequeños productores lácteos** en Perú (MIDAGRI 2024).
- **~5,000-10,000 intermediarios** (porongueros, acopiadores).
- **~3,000-5,000 centros de acopio formales** (plantas queseras, asociaciones).

### Magnitud del problema

- Pérdida estimada: S/ 1-5 por entrega para el productor.
- Frecuencia: diaria.
- Para un productor de 30 L/día × 30 días = 900 L/mes. Si pierde S/ 0.10/L por litro no verificado o precio mal aplicado = S/ 90/mes × 12 = S/ 1,080/año.
- Multiplicado por 388,454 productores = **S/ 419 millones/año** en pérdidas teóricas para los productores (cifra máxima, asume informalidad total).

### Causa raíz

- **Atomización del productor** + **concentración del comprador** = mercado de oligopsonio.
- **Falta de tecnología accesible** en la base de la cadena.
- **Falta de trazabilidad** desde el productor hasta el comprador.

## Solución propuesta

> **Una plataforma SaaS multi-tenant, WhatsApp-first para el productor y app completa (Flutter iOS/Android/Web) para el comprador, que registra entregas, traza cambios de precio, genera liquidaciones digitales, y opcionalmente emite boletas de venta electrónicas vía OSE.**

### Características esenciales (MVP)

1. **Registro de entregas** con verificación (foto + GPS + timestamp + cantidad).
2. **Trazabilidad de cambios de precio** (auditable por ambas partes).
3. **Liquidaciones digitales** automáticas con detalle y firma simple.
4. **Notificaciones** al productor por WhatsApp/SMS.
5. **Modo offline** robusto (SQLite local + sync).
6. **Multi-tenant** (cada comprador = un tenant; sus productores son usuarios).

### Características opcionales (V2)

7. Emisión de boletas de venta electrónicas vía OSE.
8. Reportes avanzados (rendimiento por productor, por período).
9. Anticipos y deudas automatizados.
10. Integración con WhatsApp Business API (mensajería bidireccional).

### Fuera de alcance (NO se construye)

- ❌ App nativa para productores rurales (WhatsApp es suficiente).
- ❌ Sistema de pagos integrado (solo registramos pagos externos en MVP; integración con Yape/Plin en V2).
- ❌ Marketplace de leche cruda (la供需关系 es local).
- ❌ Trazabilidad hasta la vaca individual (V3 con SENASA).
- ❌ Calidad de leche con sensores (V3).
- ❌ Predicción de precios con IA (V3).

## Propuesta de valor

### Para el Comprador (cliente B2B)

> "Registra tus entregas, traza tus cambios de precio y emite liquidaciones digitales en 5 minutos al día. Sin Excel. Sin cuadernos. Con respaldo ante SUNAT."

**Beneficios concretos:**
- Ahorra 1-2 horas al día en administración.
- Reduce errores humanos en liquidaciones (S/ 50-200/mes recuperados).
- Tiene registro auditable de cambios de precio.
- Puede emitir boletas de venta sin aprender SEE-SOL.
- Historial completo de cada productor (anticipos, deudas, calidad).

### Para el Productor (usuario gratuito)

> "Recibe un comprobante digital cada vez que entregas leche. Conoce el precio vigente. Verifica tu liquidación antes de pagarte."

**Beneficios concretos:**
- Confirmación de litros entregados en su celular.
- Notificación de cambios de precio.
- Liquidación clara antes del pago.
- Historial para discutir con el comprador.
- Acceso a microcréditos informales en V3 (basado en historial).

### Para la Asociación / Centro de Acopio

> "Consolida las entregas de tus socios en un solo panel. Genera reportes para tu junta directiva. Emite comprobantes a quienes te compran."

## Usuario primario

**Comprador informal / formal** (intermediario, acopio, quesero) en Cajamarca y zonas similares de la sierra peruana.

- Edad: 30-55 años.
- Smartphone Android o iPhone.
- WhatsApp fluido.
- Tiene RUC o está formalizado (o camino a estarlo).

## Hipótesis de adopción

> El comprador informal que registra 30+ productores diarios y maneja S/ 5,000+/mes en compras, **pagará S/ 30-80/mes** por una herramienta que:
> 1. Le ahorra 1-2 horas al día.
> 2. Reduce errores humanos.
> 3. Le da trazabilidad ante SUNAT.
> 4. Le profesionaliza ante sus proveedores.

**Esto se valida con 5-10 entrevistas ANTES de construir.**