# Idea B — Modelo de precio por litro y trazabilidad

## La pregunta del usuario

> "El comprador establece: Precio = S/ X por litro. El productor/vendedor: NO puede modificar ese precio."
>
> "El sistema debería mantener trazabilidad de: Precio anterior, Precio nuevo, Fecha de cambio, Quién realizó el cambio, Motivo."

## Validación con la realidad del mercado

### Confirmaciones (hechos)

1. **El comprador fija el precio.** En la cadena informal, esto es cierto. El productor atomizado tiene poder de negociación nulo. (Tesis Puruay Alto, Tesis Hualgayoc, Tesis diagnóstico Cajamarca.)

2. **El precio cambia con frecuencia.** Sin notificación formal al productor.

3. **El productor no tiene registro de los cambios.** Confirma en verbal; sospecha en recibo; no tiene cómo reclamar formalmente.

4. **Existen sistemas de pago con bonificaciones por calidad** en plantas industriales (Gloria paga por proteína, grasa, sólidos totales, UFC). Verificado para Colombia (Resolución 017 de 2012 + Resolución 2025).

### Preguntas a validar

1. ¿El precio cambia **arbitrariamente** o **por condiciones de mercado**? (probablemente ambos, pero el productor no siempre lo sabe).
2. ¿Cuántos cambios de precio hay al año? (probablemente 2-12, dependiendo de la región).
3. ¿Existen **esquemas de precio por volumen** (más volumen = mejor precio)? (en plantas grandes sí; en pequeños no formalizado).
4. ¿Existen **esquemas de precio por calidad** (grasa, proteína, UFC)? (en plantas grandes sí; en pequeños no formalizado).
5. ¿Existen **esquemas de precio por zona** (precio distinto en Cajamarca vs Lima)? (probablemente sí, por costos de transporte).
6. ¿Existe **precio negociado** individual? (en el sector informal, rara vez).

## Modelos de pricing en la industria láctea mundial

### Modelo 1: Precio fijo único (compra a todo el mundo al mismo precio)
- **Ventaja:** Simple, transparente.
- **Desventaja:** No incentiva calidad ni volumen.

### Modelo 2: Precio base + bonificaciones por calidad (modelo colombiano y chileno)
- **Estructura:** Precio base S/X por litro, + bonificación por gramo de grasa, + bonificación por gramo de proteína, + bonificación por sólidos totales, + bonificación por calidad higiénica (UFC), + bonificación por hato libre de brucelosis.
- **Ejemplo Colombia 2025:**
  - Proteína: $43,22/gramo en región 1
  - Grasa: $14,40/gramo
  - Sólidos: $15,28/gramo
  - UFC <25,000: $174/litro bonificación
- **Ventaja:** Incentiva calidad.
- **Desventaja:** Requiere pruebas de laboratorio.

### Modelo 3: Precio por volumen
- Volumen mensual > X → mejor precio.
- **Ventaja:** Incentiva asociatividad.
- **Desventaja:** Desincentiva productores pequeños individuales.

### Modelo 4: Precio por zona
- Transporte lejano → descuento.
- **Ventaja:** Refleja costos reales.
- **Desventaja:** Discrimina productores remotos.

### Modelo 5: Precio por calidad higiénica
- Leche refrigerada → bonificación.
- Leche ácida → penalización o rechazo.
- **Ventaja:** Mejora calidad de la cadena.

### Modelo 6: Precio por período (estacional)
- Época seca (estiaje) → leche escasa → precio sube.
- Época de lluvia → leche abundante → precio baja.
- **Real en Perú:** Sí ocurre, especialmente con pequeños.

### Modelo 7: Precio negociado bilateral
- Cada productor tiene un precio.
- **Raro en Perú** en pequeños productores, pero existe en medianos.

## Recomendación para nuestro MVP

**Soportar múltiples modelos** en la arquitectura, con **un modelo predeterminado simple** para MVP:

### MVP: Precio único fijado por el comprador
- El comprador tiene un precio activo.
- El productor no puede modificarlo.
- Cada cambio de precio genera un evento en el sistema:
  - precio_anterior
  - precio_nuevo
  - fecha_cambio
  - quien_cambia (usuario del sistema)
  - motivo (texto libre)
- **El productor recibe notificación** del cambio (WhatsApp/SMS).
- **El histórico de precios es auditable** por el productor.

### V2: Precio base + bonificación por calidad
- El comprador define reglas (X% por bonificación de calidad).
- Cada entrega calcula automáticamente el precio final.
- Requiere integración con pruebas de calidad.

### V3: Múltiples esquemas (zona, volumen, etc.)
- Configurador flexible.

## Trazabilidad de cambios de precio

### Modelo de datos conceptual (alto nivel)

```
PRICE_CONFIG
├── id
├── tenant_id (comprador)
├── producto (leche cruda)
├── precio_por_litro
├── fecha_inicio
├── fecha_fin (NULL = vigente)
├── motivo
├── created_by (usuario)
└── created_at

PRICE_CHANGE_LOG
├── id
├── price_config_id (anterior)
├── nuevo_price_config_id
├── diff_precio
├── fecha_cambio
├── usuario_id
└── notas
```

### Visualización para el productor

```
Vendedor: Juan Pérez
Comprador: Lecheros del Norte S.A.C.

PRECIOS HISTÓRICOS (leche cruda)
├── S/ 1.50/litro  → vigente desde 01-Ago-2025 (motivo: "actualización mercado")
├── S/ 1.45/litro  → del 15-Jun al 31-Jul-2025 (motivo: "ajuste por estiaje")
├── S/ 1.60/litro  → del 01-Ene al 14-Jun-2025 (motivo: "precio base 2025")
└── ...
```

## Modelo de negocio derivado

Si el comprador es quien fija el precio y el productor es atomizado, **el incentivo para digitalizar es del comprador**. ¿Por qué?

1. **El comprador quiere trazabilidad** para defenderse ante SUNAT/INDECOPI si hay auditoría.
2. **El comprador quiere evitar errores** humanos en liquidaciones (le pagan demás o de menos).
3. **El comprador quiere dar imagen de formalidad** (especialmente queseros artesanales que quieren vender a supermercados).
4. **El comprador puede ahorrar tiempo** administrativo (liquidaciones automáticas).

> **Conclusión:** El modelo de negocio más viable es **B2B**: cobramos al comprador por la herramienta, el productor es usuario gratuito.

## Reflexión crítica

> **[INFERENCIA]** Construir el sistema asumiendo que "el precio lo fija el comprador" es correcto para la realidad peruana. Sin embargo, **la pregunta más profunda** es: ¿podemos construir un sistema que **reduzca el poder asimétrico** del comprador sobre el productor?

> Esa pregunta es éticamente ambiciosa pero técnicamente abordable: si varios compradores en la zona usan la plataforma, **el productor podría comparar precios** y tener poder de negociación. **Pero ese es V2/V3**, no MVP.

> Para MVP, **aceptamos el modelo actual** (comprador fija) y nos enfocamos en dar **trazabilidad y transparencia** al productor.

## Fuentes

| # | Fuente | URL | Tipo |
| --- | --- | --- | --- |
| B25 | Fedegán – Sistema de pago leche cruda Colombia 2024 | https://www.contextoganadero.com/economia/conozca-como-quedaron-los-valores-para-el-pago-de-leche-cruda-hasta-febrero-de-2025 | Prensa sectorial |
| B26 | eDairyNews – Reglas pago leche productor 2025 | https://es.edairynews.com/nuevas-reglas-pago-litro-leche/ | Prensa sectorial |