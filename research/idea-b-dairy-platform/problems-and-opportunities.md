# Idea B — Problemas y oportunidades

## Problemas confirmados (con prioridad)

### PROB-1: Litros no verificados — dolor central [PRIORIDAD: ALTA]

**Causa:** No hay instrumento compartido entre productor y comprador para medir/registrar litros en el momento de la entrega.

**Manifestación:** Disputas recurrentes sobre cuánto se entregó. Cada quien tiene su libreta. Cuando no coinciden, se "negocia" verbalmente.

**Costo:** Pérdida de S/ 1-5 por entrega para el productor (dependiendo del volumen y la frecuencia). Multiplicado por cientos de productores × cientos de días = pérdidas significativas.

**Oportunidad de software:**
- Foto del porongo con regla de medición adjunta.
- Peso automático (balanza Bluetooth).
- Doble confirmación en el celular del productor y del comprador al momento de entrega.

### PROB-2: Cambios de precio sin trazabilidad [PRIORIDAD: ALTA]

**Causa:** El comprador (o la planta) cambia el precio sin notificación formal.

**Manifestación:** El productor recibe menos en su liquidación y no entiende por qué. Sospecha, pero no tiene evidencia.

**Costo:** Pérdida de S/ 0.05-0.20 por litro cuando hay cambio adverso. Para un productor de 30 L/día × 30 días = S/ 45-180/mes en escenarios adversos.

**Oportunidad de software:**
- El comprador registra cada cambio de precio (precio anterior, nuevo, fecha, motivo, quién).
- El productor es notificado por SMS/WhatsApp.
- El histórico es auditable por ambos lados.

### PROB-3: Liquidaciones sin papel firmado [PRIORIDAD: ALTA]

**Causa:** El cálculo se hace "a mano" y se paga en efectivo. No hay comprobante.

**Manifestación:** Disputas sobre cuánto se pagó; productor olvida; comprador anota distinto.

**Costo:** Disputas familiares, costos legales si escalan, desconfianza.

**Oportunidad:**
- Generar liquidación digital con detalle (litros × precio = total).
- Firma digital del productor (puede ser un PIN o un OK por SMS).
- Comprobante descargable en PDF.

### PROB-4: Adelantos no registrados [PRIORIDAD: MEDIA-ALTA]

**Causa:** El productor pide dinero por adelantado; el comprador descuenta en la siguiente liquidación. No hay papel.

**Oportunidad:** El comprador registra cada adelanto con fecha, monto, firma (o confirmación) del productor. El saldo se descuenta automáticamente.

### PROB-5: Calidad no medida [PRIORIDAD: MEDIA]

**Causa:** No hay prueba de densidad, grasa, proteína.

**Oportunidad (V2):** Integración con refractómetros Bluetooth o pruebas en campo. Bonificación por calidad automáticamente.

### PROB-6: Falta de trazabilidad animal [PRIORIDAD: MEDIA]

**Causa:** No se sabe de qué vaca viene cada leche.

**Oportunidad (V2):** Integración con SENASA / aretes DIO para trazabilidad hasta la vaca.

### PROB-7: Sin facturación [PRIORIDAD: MEDIA]

**Causa:** Productor informal no factura. Comprador informal no factura.

**Oportunidad:**
- Integración con SUNAT/SEE-SOL (gratis) para emitir boletas de venta electrónicas cuando aplique.
- Especialmente útil para el comprador cuando quiere vender queso formalmente.
- Simplifica el cumplimiento tributario.

### PROB-8: Productor sin historial crediticio [PRIORIDAD: BAJA-MEDIA]

**Causa:** Sin registros formales, no puede acceder a crédito formal.

**Oportunidad (V2):** El historial de entregas del productor se convierte en su "historial crediticio" informal para acceder a microcréditos.

### PROB-9: Falta de asesoría técnica [PRIORIDAD: BAJA]

**Causa:** El productor toma decisiones empíricamente.

**Oportunidad:** Integración con extensionistas (INIA, SENASA) vía notificaciones; alertas sanitarias; calendario de vacunación.

### PROB-10: Falta de acceso a información de mercado [PRIORIDAD: BAJA-MEDIA]

**Causa:** El productor no sabe cuánto están pagando otros compradores en otra zona.

**Oportunidad:** Mostrar precios de referencia por región (data abierta de MIDAGRI).

## Oportunidades derivadas

### OP-1: Integración con WhatsApp
- Muchos productores ya usan WhatsApp. Una interfaz WhatsApp-first reduce fricción.
- Solución análoga: Surco (Argentina), Harvis (LatAm), GanaderoAI (Centroamérica), FieldData Agro.
- **Idea diferenciadora:** No instalar app, conversar por WhatsApp con el sistema.

### OP-2: Modo offline robusto
- En zonas rurales, no siempre hay señal.
- El sistema debe permitir registrar entregas offline y sincronizar cuando haya conexión.

### OP-3: Integración con Yape / Plin
- Los productores peruanos usan masivamente Yape y Plin.
- Integrar pagos por estas billeteras simplifica todo.

### OP-4: Multi-idioma (quechua)
- En muchas zonas de Cajamarca, los productores hablan principalmente quechua o solo español rural.
- Una interfaz en quechua (texto y voz) sería enormemente diferenciadora.

### OP-5: Red de productores compradores
- Si el productor está registrado, los compradores pueden encontrarlo para ampliar oferta.
- Marketplace inverso: compradores publican demanda, productores responden.

### OP-6: Educación financiera y de gestión
- Micro-cursos integrados: cómo leer la liquidación, cómo mejorar calidad, cuándo conviene cambiar de comprador.

## Síntesis de problemas y oportunidades

| Problema | Magnitud | Software puede ayudar | MVP o V2 |
| --- | --- | --- | --- |
| Litros no verificados | Alta | Sí (foto, balanza, doble check) | MVP |
| Cambios de precio sin trazabilidad | Alta | Sí (registro + notificación) | MVP |
| Liquidaciones sin papel | Alta | Sí (PDF + firma) | MVP |
| Adelantos no registrados | Media-Al | Sí | MVP |
| Calidad no medida | Media | Sí (sensores) | V2 |
| Sin facturación | Media | Sí (integración SUNAT) | V2 |
| Trazabilidad animal | Media | Sí (integración SENASA) | V3 |
| Sin historial crediticio | Baja | Sí (datos) | V3 |
| Asesoría técnica | Baja | Sí (alertas) | V2/V3 |
| Información de mercado | Baja-Media | Sí (precios referenciales) | V2 |

## Mercado potencial

### Calculando TAM

**Pequeños productores lácteos en Perú:** 388,454.

Asumiendo una red de acopio promedio atiende a ~30 productores:
- **Mercado de "compradores/acopiadores":** 388,454 / 30 ≈ **12,950 potenciales clientes B2B.**

**Mercado de intermediarios "porongueros":** Estimado en 5,000-10,000 (no hay estadística oficial).

**Mercado de centros de acopio formales:** ~1,200 plantas queseras en Cajamarca × múltiples regiones = estimado 3,000-5,000 en todo el país.

**TAM realista:** ~20,000 potenciales clientes B2B.

**SAM (Serviceable Available Market):** Si nos enfocamos en sierra norte (Cajamarca, La Libertad, Amazonas): ~5,000 compradores/acopiadores.

**SOM (Serviceable Obtainable Market, año 3):** 5% del SAM = 250 clientes pagando S/ 50/mes = S/ 12,500/mes = S/ 150,000/año.

**Modelo de monetización viable:**
- Plan gratuito: productor ilimitado por comprador (cada comprador registra sus productores gratis).
- Plan pago para comprador: S/ 50-100/mes por herramientas avanzadas (liquidaciones, facturación, reportes).
- Plan premium para acopio formal: S/ 200-500/mes.

## Reflexión crítica final

> **[INFERENCIA FUERTE]** El **productor pequeño NO es el cliente**. El **cliente es el comprador/acopio**. Esta es la conclusión más importante para diseñar el producto y el modelo de negocio.

> **[INFERENCIA]** Si cobramos al productor, **fracasamos**. Si cobramos al comprador, tenemos una chance real.

> **[INFERENCIA]** El **MVP debe ser ultra-simple**. No facturación, no trazabilidad animal, no marketplace. Solo:
> 1. Registrar entregas (litros, fecha, productor).
> 2. Cambios de precio trazables.
> 3. Liquidación digital.
> 4. Notificación al productor (WhatsApp/SMS).

> Si el MVP resuelve estos 4 problemas, **hay un mercado dispuesto a pagar**.

## Fuentes

Ver `dairy-value-chain.md` y `current-processes.md`.