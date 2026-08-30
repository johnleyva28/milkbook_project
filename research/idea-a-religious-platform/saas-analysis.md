# Idea A — Análisis de modelos SaaS / Multi-tenant / Producto

## Modelos a evaluar

| Modelo | Descripción | Pros | Contras |
| --- | --- | --- | --- |
| **A. Plataforma exclusiva para LADP** | Solo sirve a LADP. Gobierno: LADP interno. | Alineación total con visión LADP; menor resistencia cultural | TAM pequeño; SATD ya existe; decisión política compleja |
| **B. SaaS multi-tenant para varias regiones de LADP** | LADP usa una plataforma multi-tenant pero como único tenant | Técnicamente multi-tenant, comercialmente single-tenant | Sin beneficio real del multi-tenant; mismo TAM que A |
| **C. SaaS para organizaciones religiosas en general** | Cualquier denominación puede usarlo | TAM grande | Competencia feroz; necesita diferenciación clara |
| **D. Producto para iglesias independientes** | Iglesias pequeñas no denominacionales | TAM grande en Latam | Competencia ya activa (Iglesia Fiel, Atrio, etc.) |
| **E. Otro modelo superior** | (a explorar) | – | – |

## Análisis detallado

### Modelo A: Exclusivo para LADP

**Viabilidad técnica:** Alta. LADP ya tiene experiencia con SATD.

**Viabilidad comercial:** Media-baja.
- LADP es una organización religiosa **sin fines de lucro**.
- Cobrarles por software es posible (muchas denominaciones contratan CRMs), pero las decisiones se toman en Asambleas anuales.
- El ciclo de decisión es lento (Asamblea Nacional anual + Junta Directiva electa por períodos fijos).
- Riesgo político: si cambia la Junta Directiva, ¿se mantiene el proyecto?

**Complejidad operativa:** Media.
- Necesitas un equipo técnico alineado con LADP.
- El despliegue debe respetar su calendario eclesial.

**Escalabilidad:** Baja. LADP tiene ~5,000-6,000 congregaciones. Es el techo.

**Riesgo:** ALTO. Si LADP no se embarca, perdemos el mercado entero. Y si se embarca pero cambia de opinión en 3 años, perdemos la inversión.

### Modelo B: SaaS multi-region para LADP (pero multi-tenant técnicamente)

**Diferencia real con A:** Casi nula. Si solo sirve a LADP, no importa si el modelo de datos es multi-tenant; sigue siendo un proyecto cautivo.

**Veredicto:** **No recomendado.** Si vas a hacer A, no uses multi-tenant.

### Modelo C: SaaS para organizaciones religiosas en general

**Viabilidad técnica:** Alta. Es el modelo estándar de SaaS moderno.

**Viabilidad comercial:** Media.
- TAM mucho mayor: ~millones de iglesias evangélicas en Latam.
- Competencia: Iglesia Fiel, Ekklesia, Adminfiel, Atrio, Gestión Iglesia, IgleSoft, Admin Church.
- **El producto necesita diferenciación clara** o no se puede competir.

**Complejidad operativa:** Alta.
- Necesitas marketing, ventas, soporte multi-idioma.
- Onboarding de cada denominación es distinto.

**Escalabilidad:** Muy alta.

**Riesgo:** Competitivo. Para entrar en un mercado con 5+ competidores activos, necesitas una propuesta única. Esto se logra con:
- Modo offline robusto para zonas rurales.
- Integración WhatsApp-first.
- Integración Yape/Plin (Perú) / PIX (Brasil) / Nequi (Colombia).
- IA con vocabulario pastoral local.

### Modelo D: Producto para iglesias independientes

**Similar a C pero más limitado.** Las iglesias independientes tienen menor poder adquisitivo, mayor variabilidad doctrinal, y menor cohesión organizacional.

**TAM:** Pequeño-medio en Latam.

**Veredicto:** Sub-caso de C; no lo recomendamos como modelo primario.

### Modelo E: Otro modelo superior

Hipótesis: **¿Y si no construimos un ChMS genérico sino una herramienta vertical para un ministerio específico?**

Ministerios verticales no atendidos por los ChMS existentes:
1. **Plataforma para Escuela Bíblica Dominical** – Inscripciones, asistencia, materiales, calificaciones, comunicación con padres.
2. **Plataforma para Ministerio de Niños** – Check-in de seguridad, comunicación con padres, eventos.
3. **Plataforma para Ministerio de Jóvenes** – Eventos, retiros, formación de líderes.
4. **Plataforma para Ministerio de Damas** – Encuentros, grupos de oración, formación.
5. **Plataforma para Discipulado** – Rutas de crecimiento, seguimiento individual, mentorías.
6. **Plataforma para Plantación de Iglesias** – Workflow de establecer nuevas iglesias (capacitación, financiamiento, seguimiento).

**Cada uno tiene menos competencia directa** que un ChMS general, y responde a dolores específicos.

**TAM individual:** Menor, pero **sumando todos los verticales ministeriales**, comparable al TAM de un ChMS.

**Riesgo:** Hay que convencer a un ministerio (no a toda una denominación).

## Modelo F: Híbrido con anclaje en LADP (mi recomendación tentativa)

**Plataforma inicialmente comisionada por un ministerio de LADP** (por ejemplo, Ministerio Nacional de Damas, Ministerio de Jóvenes, o Ministerio de Plantación de Iglesias), pero **arquitectónicamente multi-tenant** desde el día 1 para poder expandir a:
- Otros ministerios de LADP.
- Otras denominaciones.
- Iglesias independientes.

**Razón:** Empezar por un ministerio reduce la fricción política (no necesitamos convencer a toda la LADP; solo a un ministerio), permite validar el producto con un grupo reducido, y deja la puerta abierta a escalar.

## Comparación cuantitativa

| Criterio | A | C | D | F (híbrido) |
| --- | --- | --- | --- | --- |
| TAM realista (año 3) | Bajo | Alto | Medio | Medio-Alto |
| Tiempo al primer cliente | 12-18 meses | 6-9 meses | 6-9 meses | 3-6 meses |
| Costo de adquisición | Alto (venta institucional) | Alto (marketing) | Medio | Bajo (alianza con ministerio) |
| Barrera de entrada | Baja (muchos competidores) | Alta | Alta | Media |
| Riesgo de cancelación | Alto | Medio | Alto | Bajo |
| Potencial SaaS anual año 3 | S/ 200-500k | S/ 500k - 3M | S/ 200-800k | S/ 300k - 1.5M |

## Reflexión crítica

### Lo que NO，我们应该 hacer

1. **NO construir un ChMS genérico compitiendo con Iglesia Fiel / Ekklesia / Adminfiel.** Es una batalla perdida.
2. **NO apuntar a LADP como único cliente sin validar primero.** Es una venta institucional muy compleja.
3. **NO asumir que LADP adoptará la plataforma solo porque existe.** Las Asambleas anuales definen prioridades; no basta con un buen producto.

### Lo que，我们应该 hacer

1. **Empezar con un ministerio específico** (Damas, Jóvenes, Niños) – uno que tenga dolor real y presupuesto.
2. **Arquitectura multi-tenant desde el día 1** – no para capturar LADP completa, sino para no tener que reescribir cuando llegue el segundo cliente.
3. **Buscar aliados denominacionales** que NO tengan SATD propio. Hay decenas de denominaciones evangélicas en Perú.
4. **Si LADP se interesa, integrarse con SATD vía API**, no reemplazar.

## Recomendación final sobre el modelo (Idea A)

> **Modelo F (híbrido con anclaje en ministerio específico) es la ruta menos riesgosa y más escalable.** Empezar con LADP-completo es lento y políticamente complejo. Empezar con un ChMS genérico compite con 5+ jugadores establecidos. Empezar con un vertical ministerial específico es **estrecho pero profundo**, y deja abiertas múltiples vías de expansión.

## Fuentes

| # | Fuente | URL | Tipo |
| --- | --- | --- | --- |
| | Ver `competitors.md` | – | – |
| | Ver `organization-analysis.md` | – | – |