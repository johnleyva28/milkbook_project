# Resumen ejecutivo y respuestas a las 18 preguntas clave

## Resumen ejecutivo (TL;DR)

Después de una investigación profunda de ambas ideas, nuestra **recomendación es construir el proyecto integrador sobre la Idea B: una plataforma de gestión de compra/venta de leche para pequeños productores y compradores informales en Perú, empezando por el caso de la sierra norte (Cajamarca, Celendín)**.

**Idea B gana a Idea A** por un margen estructural (69 vs 46 puntos sobre 80) en una evaluación multidimensional:

- **Mercado más grande:** 450,000+ familias productoras vs 5,000-6,000 iglesias.
- **Menos competencia** en nuestro nicho específico (WhatsApp-first + SUNAT + offline + lácteo en Perú).
- **Problema más agudo:** las familias pierden plata real hoy.
- **Cliente más claro:** comprador formal con RUC, capacidad de pago, e incentivo de digitalizar.
- **iOS/Android encaja perfecto:** app completa para comprador, WhatsApp-first para productor rural.
- **MVP acotado** vs la expansión infinita de un ChMS.
- **Mayor potencial de producto real** post-académico.

**Idea A (ChMS para LADP) tiene bloqueadores estructurales:**
- LADP ya tiene un sistema llamado SATD implementado en 2015.
- El mercado hispano de ChMS está saturado con 5+ competidores activos.
- El cliente es una institución conservadora con ciclos de decisión lentos.
- La Región Eclesiástica de Celendín no aparece prominentemente como entidad LADP.

## Respuestas a las 18 preguntas clave

### 1. ¿Cuál problema debemos resolver?

**El problema es la asimetría de información y poder en la cadena láctea informal peruana:**
- Los productores pequeños no pueden verificar cuánta leche entregaron.
- Los compradores cambian el precio sin avisar.
- Las liquidaciones son verbales, cada 15-30 días, con errores humanos.
- Los adelantos no quedan registrados.
- El mercado es de **oligopsonio** (muchos vendedores, pocos compradores).

### 2. ¿Quién tiene ese problema?

- **Primario (cliente B2B):** compradores informales/formales de leche en Perú — acopiadores, queseros artesanales, intermediarios. Estimado: **5,000-10,000** en todo el país, **3,000-5,000** en sierra norte (Cajamarca, La Libertad, Amazonas).
- **Secundario (usuario final gratuito):** productores pequeños de 5-10 vacas. Estimado: **388,454** pequeños productores lácteos en Perú.

### 3. ¿Qué tan frecuente/importante es?

- **Frecuencia:** diaria, todos los días del año.
- **Magnitud:** S/ 1-5 por entrega se pierden por errores y disputas. Para un productor de 30 L/día × 30 días, hasta **S/ 90/mes en pérdidas evitables** (cifra conservadora).
- **Importancia:** es estructural al sustento de 450,000+ familias rurales. Afecta su acceso a crédito, su bienestar, su desarrollo.

### 4. ¿Cómo lo resuelven actualmente?

- **Productor:** Libreta de mano + memoria + WhatsApp + confianza personal.
- **Comprador:** Cuaderno + memoria + WhatsApp + Excel básico (a veces).
- **Sin trazabilidad formal.**
- **Sin registro de cambios de precio.**
- **Sin liquidaciones firmadas.**

### 5. ¿Qué soluciones ya existen?

| Tipo | Solución | Cobertura |
| --- | --- | --- |
| ChMS religioso (Idea A) | Iglesia Fiel, Ekklesia, Adminfiel, Atrio, Gestión Iglesia, IgleSoft, Admin Church | Latam hispanohablante |
| Dairy tech (Idea B) | Tribu Hacienda (Ecuador), Surco (Argentina), Harvis, GanaderoAI, Progan, GanaderiAPP, MeriDairy (India) | Mundial |
| **Dairy tech específico Perú** | **Ninguno identificado** | – |

> **Gap específico:** ninguna solución combina WhatsApp-first + SUNAT + offline + lácteos para Perú.

### 6. ¿Por qué nuestra solución sería diferente?

1. **WhatsApp-first** (cero fricción de adopción).
2. **Multi-tenant SaaS** desde día 1.
3. **Integración con SUNAT/OSE** vía OSE.
4. **Integración con Yape/Plin** (ecosistema de pagos peruanos).
5. **Modo offline** robusto (zonas rurales sin señal).
6. **Modelo B2B** (cobrar al comprador formal, no al productor).
7. **Vocabulario local** (leche, litros, comprador, no "milking herd").

### 7. ¿Existe mercado?

Sí, **verificable**:
- 388,454 pequeños productores lácteos (MIDAGRI 2024).
- 5,000-10,000 intermediarios informales.
- 1,200 plantas queseras solo en Cajamarca.
- 98,018 productores en Cajamarca.
- 60,000 L/día en Celendín.
- Mercado se formaliza gradualmente pero la informalidad dominará por años.

### 8. ¿Quién pagaría?

**Comprador formal / asociación / acopio:**
- Modelo B2B con tiers de S/ 30-200/mes.
- Tier 0 gratis para productor.
- Ahorro de tiempo y errores justifica el pago.

**Proyecciones conservadoras:**
- 30 clientes año 1: S/ 15,600/año.
- 400 clientes año 3: S/ 312,000/año.

### 9. ¿Qué modelo de negocio tendría sentido?

**SaaS B2B multi-tenant con tiered pricing:**
- **Tier 0 — Gratis (Productor):** ver historial, recibir notificaciones.
- **Tier 1 — S/ 30/mes (Comprador Básico):** registro de entregas, cambios de precio, liquidaciones.
- **Tier 2 — S/ 80/mes (Comprador Pro):** boletas electrónicas vía OSE.
- **Tier 3 — S/ 200/mes (Centro de Acopio Formal):** multi-sede, factura electrónica completa.

**Canales:** alianzas con Agroideas, SENASA, MIDAGRI, asociaciones.

### 10. ¿Cuál debería ser el MVP?

**3 features críticas + 2 complementarias:**

1. **Registro de entregas** con verificación (litros, fecha, GPS, foto opcional).
2. **Trazabilidad de cambios de precio** (auditable, notificado al productor).
3. **Liquidaciones digitales automáticas** (PDF descargable, firma simple).
4. **Adelantos** (registrados, descontados automáticamente).
5. **Multi-tenancy + autenticación** (cada comprador es un tenant).

**NO en MVP:** facturación electrónica, integración Yape/Plin, reportes avanzados, marketplace.

### 11. ¿Qué procesos debemos digitalizar?

| Proceso | Prioridad |
| --- | --- |
| Registro de entregas | Crítica |
| Cambios de precio | Crítica |
| Liquidaciones | Crítica |
| Adelantos | Alta |
| Confirmación por productor | Alta |
| Notificaciones WhatsApp | Alta |
| Emisión de boletas (V2) | Media |
| Trazabilidad SENASA (V3) | Baja |

Ver [`/research/recommended-product/processes.md`](../recommended-product/processes.md) para detalle completo.

### 12. ¿Qué roles existirían?

```
Platform Admin (interno)
└── Tenant (Comprador / Organización)
    ├── Buyer Admin
    ├── Buyer Operator
    ├── Buyer Counter
    ├── Buyer Auditor (Tier 3+)
    └── Producer (sin app, vía WhatsApp)
```

Ver [`/research/recommended-product/roles-and-permissions.md`](../recommended-product/roles-and-permissions.md).

### 13. ¿Qué arquitectura necesitamos?

```
Comprador ──> App Flutter (iOS/Android/Web) ──> API Node+Express ──> PostgreSQL
Productor ──> WhatsApp Business API ────────/
Admin ─────> React + Vite + TS ──────────────/
```

- **Backend:** Node.js + Express + TypeScript + Prisma + PostgreSQL.
- **Frontend admin:** React + Vite + TypeScript.
- **App móvil:** Flutter (iOS, Android, Web).
- **Multi-tenant:** schema por tenant + row-level security.
- **Workers:** BullMQ + Redis.
- **Integraciones:** WhatsApp Business API (MVP), OSE + Yape/Plin (V2).

Ver [`/research/recommended-product/architecture.md`](../recommended-product/architecture.md).

### 14. ¿Qué tan complejo sería desarrollarlo?

**Complejidad técnica: Media.**

- Backend Node+Express: bien documentado, muchos devs saben.
- PostgreSQL multi-tenant: requiere cuidado en row-level security.
- Flutter para iOS/Android: una sola base, dos plataformas.
- WhatsApp Business API: requiere aprobación de Meta + plantillas.
- Modo offline: requiere atención pero es estándar (SQLite + sync).

**Complejidad operativa inicial:**
- 1-2 devs backend.
- 1 dev Flutter.
- 1 dev frontend admin.
- Total: 2-3 personas.

### 15. ¿Qué riesgos tenemos?

| Riesgo | Probabilidad | Mitigación |
| --- | --- | --- |
| Baja adopción | Media | Validar antes; WhatsApp-first; free tier |
| Competencia | Media-Baja | Velocidad; integración local |
| Cambios regulatorios SUNAT | Media | Arquitectura flexible |
| Informalidad estructural | Alta | MVP funciona sin RUC |
| Conectividad rural | Alta | Modo offline robusto |
| Fraude | Media | Sistema neutral + auditoría |
| Competidor (Tribu Hacienda Ecuador) llega a Perú | Baja-Media | Diferenciación clara |

### 16. ¿Qué debemos validar antes de programar?

**Crítico (antes de programar):**
1. **5-10 entrevistas con compradores** en Cajamarca o Lima periurbana.
2. **5-10 entrevistas con productores**.
3. **Willingness-to-pay:** ¿S/ 30-100/mes?
4. **¿Qué dolor pesa más: litros, precio, liquidación, o calidad?**
5. **¿Cómo prefieren recibir notificaciones: WhatsApp, SMS, llamada?**

**Recomendado (en paralelo con arquitectura):**
- Definir exactamente el set de features.
- Decidir paleta visual y branding.
- Investigar proceso de aprobación de Meta para WhatsApp Business.

**Antes de salir a producción:**
- Piloto con 3-5 compradores reales.
- Iteración con feedback.
- Auditoría de seguridad.

### 17. ¿Qué funcionalidades debemos evitar?

**No construir:**
- ❌ App móvil nativa para productores (WhatsApp es suficiente).
- ❌ Marketplace de leche cruda.
- ❌ Trazabilidad individual por vaca (V3 con SENASA).
- ❌ Sistema de pagos integrado completo (solo registramos).
- ❌ Inteligencia artificial avanzada.
- ❌ Multi-país desde día 1.
- ❌ Integración con plantas grandes (Gloria/Nestlé) en MVP.
- ❌ Soporte multi-idioma desde día 1.

**Riesgo de scope creep a evitar:**
- Reportes "bonitos" sin valor real.
- Funcionalidades que el cliente pide pero no usa.
- Onboarding complejo.
- Pantallas de configuración excesivas.

### 18. ¿Es realmente una buena idea para nuestro proyecto integrador?

**Sí, por las siguientes razones:**

| Criterio | Veredicto |
| --- | --- |
| ¿Cumple el stack del proyecto? | ✅ Sí (Node, Express, React, Vite, TS, Flutter, Docker, PostgreSQL) |
| ¿Es viable técnicamente? | ✅ Sí |
| ¿Tiene mercado real? | ✅ Sí, verificable |
| ¿Es realizable en el tiempo académico? | ✅ Sí, MVP acotado |
| ¿Puede convertirse en producto real? | ✅ Sí, alta probabilidad |
| ¿Tiene impacto social? | ✅ Sí (formalización rural, trazabilidad) |
| ¿Tiene riesgo manejable? | ✅ Sí, menor que Idea A |
| ¿Es diferenciado? | ✅ Sí (gap específico en el mercado) |

## Reflexión final sobre las dos ideas

### Idea A: "Cautivo, competitivo y conservador"

- Ventaja: dominio bien comprendido.
- Desventaja: mercado saturado, cliente conservador, ya hay SATD.
- Recomendación: solo viable con sponsor institucional directo (ej. alianza formal con LADP). Sin eso, alto riesgo.

### Idea B: "Verificable, diferenciable y de alto impacto"

- Ventaja: mercado enorme, dolor real, gap específico, modelo B2B claro.
- Desventaja: informalidad estructural, requiere validación previa con actores reales.
- Recomendación: **es nuestra elección**.

## Si Idea B se ejecuta correctamente

**Año 1:** MVP desplegado, 5-10 compradores piloto.
**Año 2:** 50-100 clientes en Cajamarca + 1 departamento adicional.
**Año 3:** 300+ clientes en 3-5 regiones, posiblemente expandiendo a Bolivia/Ecuador.
**Año 5:** Posible adquisición o ronda de inversión si el producto tiene tracción real.

## Siguiente paso concreto

1. **Esta semana:** Validar con el usuario si está de acuerdo con la recomendación Idea B.
2. **Próximas 2-3 semanas:** Validación en campo (entrevistas a compradores y productores).
3. **Si validación es positiva:** Empezar arquitectura y diseño técnico.
4. **Si validación es negativa:** Replantear con datos específicos.

> **El proyecto académico debe demostrar el stack completo.** Con Idea B, esto es totalmente factible y el producto resultante tiene potencial real.

## Fuentes principales

Ver [`/research/sources/`](../sources/) para la bitácora completa de fuentes consultadas.