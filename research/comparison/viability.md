# Análisis de viabilidad por dimensión

## Viabilidad técnica

| Dimensión | Idea A | Idea B | Idea C (híbrido) |
| --- | --- | --- | --- |
| Stack disponible | ✅ | ✅ | ✅ |
| Complejidad del MVP | Alta (ChMS pide muchas features) | Media | Alta |
| Riesgo de scope creep | Alto (ChMS pide más y más) | Medio (mercado informal no exige tantas features) | Alto |
| Multi-tenancy | Sí (modelo B si se elige) | Sí (cada comprador = tenant) | Sí |
| Integraciones externas | Stripe/PayPal, email/SMS | Yape/Plin, OSE/SUNAT, WhatsApp Business API | Combinación |
| Modo offline | Difícil en iOS | Crítico, factible en Flutter | Crítico |

**Veredicto:** Idea B es ligeramente más sencilla técnicamente porque su MVP es más acotado.

## Viabilidad comercial

| Dimensión | Idea A | Idea B |
| --- | --- | --- |
| Cliente claro | Cliente institucional conservador | Cliente B2B identificado (comprador) |
| Willingness to pay | Bajo a medio (presupuestos limitados) | Medio (ahorro de tiempo y errores) |
| Ciclo de decisión | Largo (asambleas anuales) | Medio (decisión de comprador individual) |
| Modelo SaaS viable | Sí, pero B2B2C complejo | Sí, B2B claro |
| Mercados múltiples | Cualquier denominación religiosa | Cualquier cadena láctea informal en Latam |
| Canal de adquisición | Difícil (alianzas institucionales) | Más fácil (asociaciones, extensionistas) |

**Veredicto:** Idea B tiene mejor modelo comercial.

## Viabilidad de adopción

| Dimensión | Idea A | Idea B |
| --- | --- | --- |
| Disposición del usuario | Media (pastores con poca formación digital) | Media-Alta (compradores con smartphone, WhatsApp fluido) |
| Cambio cultural necesario | Alto (escritura formal de procesos) | Bajo (cambio mínimo en rutina) |
| Alfabetización digital | Media (pastores saben algo) | Baja-Alta (compradores saben; productores no necesitan saber) |
| Costo de adquisición de usuario | Alto | Bajo-Medio |
| Riesgo de abandono | Alto (churn pastoral) | Medio (depende de valor percibido) |

**Veredicto:** Idea B tiene mejor adopción esperada.

## Viabilidad regulatoria

| Dimensión | Idea A | Idea B |
| --- | --- | --- |
| Cumplimiento necesario | Ley 29733 (datos personales) | Ley 29733 + SUNAT + posible SENASA |
| Complejidad legal | Media (entidad religiosa) | Media-Alta (cadena informal + producción) |
| Riesgo de incumplimiento | Medio (filtración de datos de feligreses) | Medio (facturación, datos de productores) |
| Barreras regulatorias | Medio (denominación conservadora) | Medio (informalidad no es barrera si no exigimos formalización) |

**Veredicto:** Idea B tiene más complejidad regulatoria pero también más claridad (SUNAT publica normativa constantemente).

## Viabilidad financiera

| Dimensión | Idea A | Idea B |
| --- | --- | --- |
| Costo inicial de desarrollo | Medio-Alto | Medio |
| Costo de operación | Bajo | Medio (integración con OSE, Yape) |
| Costo de adquisición | Alto | Bajo-Medio |
| Costo de soporte | Medio | Medio |
| Ingreso potencial año 3 | Bajo-Medio | Medio-Alto |

**Veredicto:** Idea B tiene mejor retorno financiero esperado.

## Viabilidad operativa

| Dimensión | Idea A | Idea B |
| --- | --- | --- |
| Equipo necesario | Comercial + técnico | Comercial + técnico + dominio |
| Conocimiento del dominio | Bajo (no somos expertos en iglesia) | Bajo (no somos expertos en lácteos) |
| Soporte al cliente | Complejo (diversidad de denominaciones) | Complejo (diversidad de regiones, informalidad) |
| Tiempo al primer cliente | 6-12 meses | 3-6 meses |

**Veredicto:** Idea B tiene un time-to-market más rápido.

## Síntesis

Idea B gana en **todas las dimensiones críticas**:
- Viabilidad técnica: ✅
- Viabilidad comercial: ✅
- Viabilidad de adopción: ✅
- Viabilidad regulatoria: Similar
- Viabilidad financiera: ✅
- Viabilidad operativa: ✅

Idea A solo es competitiva en viabilidad regulatoria (similar) y complejidad técnica (similar).

## Implicación

**Construir Idea B es un proyecto más sano desde cualquier ángulo.** Idea A solo tendría sentido si hubiera un sponsor institucional con financiamiento o acceso directo a LADP. Sin ese sponsor, Idea A es alto riesgo y bajo retorno.

## Decisión recomendada

> Construir el proyecto integrador sobre **Idea B (plataforma láctea)**, con la arquitectura multi-tenant desde el día 1, MVP acotado a 3 features (registro de entregas, cambios de precio, liquidación), modelo B2B, y validación previa con 5-10 compradores reales.