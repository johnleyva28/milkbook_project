# Idea B — Riesgos

## Riesgos identificados

### R1 — Riesgo de adopción del productor [PRIORIDAD: ALTA]
- **Descripción:** El productor rural no ve beneficio directo en instalar/usar una app.
- **Probabilidad:** Alta.
- **Impacto:** Si el productor no usa, la trazabilidad es incompleta.
- **Mitigación:**
  - **No exigir app al productor.** Interfaz WhatsApp/SMS.
  - Que el **comprador** incentive el uso (solo registra si el productor confirma).
  - Mostrar valor inmediato: recibir notificaciones de precio.

### R2 — Riesgo del modelo de negocio [PRIORIDAD: MEDIA-ALTA]
- **Descripción:** Si cobramos al productor, no nos compran. Si cobramos al comprador, ¿estará dispuesto?
- **Probabilidad:** Alta de incertidumbre.
- **Impacto:** Sin ingresos, el producto muere.
- **Mitigación:**
  - Validar con 5-10 compradores informales ANTES de programar.
  - Free tier generoso para adopción inicial.
  - Cobrar por valor agregado (facturación, reportes, liquidaciones automáticas).

### R3 — Riesgo de cambio de precio real [PRIORIDAD: MEDIA]
- **Descripción:** El usuario describe que "el precio por litro puede cambiar". En la realidad, el cambio es informal y discrecional.
- **Probabilidad:** Alta.
- **Impacto:** Si el comprador no registra cambios de precio en el sistema, perdemos el valor principal.
- **Mitigación:**
  - Hacer **obligatorio** que cada cambio de precio quede registrado para que el sistema siga funcionando.
  - Diseño UX que haga el registro de cambio trivial.

### R4 — Riesgo regulatorio SUNAT [PRIORIDAD: MEDIA]
- **Descripción:** Cambios en normativa tributaria (IGV de la leche, regímenes, facturación).
- **Probabilidad:** Alta (la exoneración del IGV vence 31/12/2026).
- **Impacto:** Si cambia la normativa, hay que actualizar reglas.
- **Mitigación:**
  - Arquitectura flexible: las reglas tributarias son configurables.
  - **No integrar directamente con SUNAT en MVP** (usar OSE) — reduces riesgo regulatorio.

### R5 — Riesgo de informalidad estructural [PRIORIDAD: ALTA]
- **Descripción:** El mercado objetivo es mayoritariamente informal. Los usuarios no tienen RUC ni educación tributaria.
- **Probabilidad:** Hecho.
- **Impacto:** Si exigimos formalización, perdemos mercado.
- **Mitigación:**
  - MVP funciona **sin formalización**.
  - Comprobantes opcionales (si no quiere factura, no factura).
  - Valor principal = trazabilidad, no cumplimiento tributario.

### R6 — Riesgo de conectividad [PRIORIDAD: MEDIA]
- **Descripción:** Zonas rurales con señal intermitente.
- **Probabilidad:** Alta.
- **Impacto:** App no usable sin internet.
- **Mitigación:**
  - **Modo offline robusto** (SQLite local + sync).
  - SMS como fallback para confirmaciones críticas.

### R7 — Riesgo de confianza / fraude [PRIORIDAD: MEDIA]
- **Descripción:** Si el sistema es solo del comprador, podría manipularlo. Si es solo del productor, podría exigir pagos no debidos.
- **Probabilidad:** Media.
- **Impacto:** Pérdida de confianza y abandono del producto.
- **Mitigación:**
  - **Sistema neutral** donde ambos lados ven el mismo dato.
  - **Auditoría inmutable** (logs firmados o blockchain ligero en el futuro).
  - **Doble confirmación** en eventos críticos (entrega, liquidación).

### R8 — Riesgo de costo de infraestructura [PRIORIDAD: BAJA-MEDIA]
- **Descripción:** Si alojamos en cloud global, costos en USD. Si alojamos en Perú, menos opciones.
- **Probabilidad:** Media.
- **Impacto:** A menor escala, los costos fijos son significativos.
- **Mitigación:**
  - Cloud estándar (AWS, GCP, Azure) en región us-east o sa-east.
  - PostgreSQL gestionado (RDS, Cloud SQL).
  - Docker + Kubernetes para escalar.

### R9 — Riesgo de competencia de incumbentes [PRIORIDAD: MEDIA]
- **Descripción:** Tribu Hacienda (Ecuador), Surco (Argentina), Harvis (LatAm), GanaderoAI (Centroamérica) podrían expandirse a Perú.
- **Probabilidad:** Media en 1-3 años.
- **Impacto:** Si llegan antes con más recursos, perdemos mercado.
- **Mitigación:**
  - **Empezar YA** con enfoque local (Perú).
  - Construir **comunidad local** (asociaciones, federaciones).
  - **Integración profunda** con SUNAT/OSE peruano es difícil de replicar.

### R10 — Riesgo de cambio climático / crisis [PRIORIDAD: BAJA]
- **Descripción:** Sequía, fenómeno El Niño,突发事件 social.
- **Probabilidad:** Recurrente.
- **Impacto:** Caída temporal de producción; pérdida de clientes.
- **Mitigación:**
  - Diversificar geográficamente.
  - El sistema es resiliente porque digitaliza lo que ya existe.

### R11 — Riesgo de mercado único / pivote necesario [PRIORIDAD: MEDIA]
- **Descripción:** ¿Es realmente viable cobrar a compradores informales S/ 50-100/mes?
- **Probabilidad:** Media.
- **Impacto:** Necesidad de pivote a modelo distinto.
- **Mitigación:**
  - **Validar willingness-to-pay** antes de invertir significativamente.
  - Considerar modelo freemium muy generoso.

## Matriz de riesgos

| Riesgo | Probabilidad | Impacto | Estrategia |
| --- | --- | --- | --- |
| R1 Adopción productor | Alta | Alto | Mitigar (WhatsApp-first) |
| R2 Modelo negocio | Alta | Alto | Mitigar (validación previa) |
| R3 Cambio precio | Alta | Medio | Mitigar (UX + obligación) |
| R4 SUNAT | Media | Medio | Mitigar (OSE en MVP) |
| R5 Informalidad | Alta (hecho) | Alto | Mitigar (MVP sin RUC) |
| R6 Conectividad | Alta | Medio | Mitigar (offline) |
| R7 Fraude | Media | Alto | Mitigar (sistema neutral) |
| R8 Costos | Media | Bajo | Aceptar |
| R9 Competencia | Media | Alto | Mitigar (velocidad, integración local) |
| R10 Crisis | Baja | Medio | Aceptar |
| R11 Pivote | Media | Alto | Mitigar (validación previa) |

## Conclusión

Idea B tiene **riesgos menores y más manejables** que Idea A:

1. **El mercado es real y verificable** (450,000+ familias, 5,000+ intermediarios potenciales).
2. **La informalidad no es un bloqueador** (es la norma y debemos aceptarla).
3. **El cliente principal (comprador/acopio) sí puede pagar** (B2B con valor claro).
4. **No hay un incumbent fuerte en Perú** para nuestro nicho específico (WhatsApp-first + SUNAT + offline).

Riesgo principal: **R1 (adopción) + R11 (pivote)**. Ambos se mitigan con **validación previa**.

## Siguiente paso crítico (NO programación)

**Antes de programar, validar:**
- 5 entrevistas con compradores de leche informales en Cajamarca o Lima.
- 5 entrevistas con productores.
- ¿Pagarían S/ 30-100/mes por la herramienta? ¿Qué features valen más?
- ¿Estarían dispuestos a migrar de cuaderno/WhatsApp a nuestro sistema?
- ¿Qué dolor real tienen?

Si la respuesta es positiva, **procedemos con Idea B**. Si no, replantear.