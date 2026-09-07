# 🧱 Sistema de Composición — MilkBook

> **Cómo se organizan los elementos visuales en las pantallas de MilkBook**: grid base (8pt), spacing scale, anatomía de pantalla, jerarquía visual, patrones por tipo de pantalla y reglas adaptativas. Cierra el bloque de **identidad visual** integrando todo lo definido en [1-logo](../1-logo/), [2-paleta](../2-paleta-de-colores/), [3-tipografia](../3-tipografia/), [4-iconografia](../4-iconografia/), [5-estilo-fotografico](../5-estilo-fotografico/), [6-patrones-y-texturas](../6-patrones-y-texturas/) y [7-formas-y-elementos](../7-formas-y-elementos/) en interfaces concretas.

**Fecha de aprobación:** 2026-09-06
**Aplica a:** App móvil (lechero + cliente), web admin, dark mode, dark/light, online/offline, marketing.
**Archivo de referencia visual:** [`comparativa-composicion.html`](./comparativa-composicion.html)

---

## 🎯 Principio fundamental

**La composición de MilkBook está diseñada alrededor del usuario rural con baja alfabetización digital.** Cada decisión de grid, spacing y jerarquía responde a tres restricciones validadas:

| Restricción del usuario | Decisión de composición |
|---|---|
| Baja alfabetización digital (a veces baja alfabetización general) | **Una acción principal por pantalla** · iconos grandes antes que texto · sin scroll cuando sea posible |
| Trabaja bajo sol directo, con prisa, manos ocupadas (moto, balde) | **Tap targets de 56-60dp** (más grandes que el estándar 48dp) · alto contraste WCAG AAA · spacing generoso |
| Pantalla de smartphone, modelos viejos, Android 9-12 | **Grid 8pt nativo de Material/iOS** · máximo 6-8 items por pantalla · carga rápida |

**Tres reglas inviolables:**
1. **Lista > jerarquía** (Medhi et al., INTERACT 2013: 100% vs 80% tareas correctas en usuarios no-alfabetizados).
2. **Acción principal = protagonista absoluta** (color verde `green-500`, 56-60dp de alto, siempre visible).
3. **Banners de discrepancia van arriba del contenido** (no en toasts efímeros, no escondidos).

---

## 📐 1. Grid base y breakpoints

**Decisión MilkBook:** **8pt grid** con **4pt sub-grid** para detalles finos. Universal en Material Design 3, iOS HIG, Atlassian, IBM Carbon, Tailwind, Bootstrap. Múltiplos de 8 dividen limpiamente las densidades de pantalla (1×, 2×, 3×, 4×) y son la convención adoptada por TODA la industria desde 2014.

### Grid de columnas por plataforma

| Plataforma | Ancho viewport | Columnas | Gutter | Margen lateral | Container max |
|---|---|---|---|---|---|
| **App móvil (phone)** | 360-430dp | 4 | 16dp | **16dp** | — |
| **App móvil (phone pequeño)** | 320-359dp | 4 | 12dp | **16dp** | — |
| **Tablet** | 600-839dp | 8 | 16dp | **24dp** | — |
| **Tablet grande** | 840-1023dp | 8 | 24dp | **32dp** | — |
| **Web admin (desktop)** | 1024-1439dp | 12 | 24dp | **32dp** | 1280px |
| **Web admin (wide)** | ≥1440dp | 12 | 24dp | **auto** | 1440px |

```css
/* Breakpoints MilkBook (mobile-first) */
--bp-xs:  320px;   /* phone pequeño */
--bp-sm:  360px;   /* phone estándar */
--bp-md:  600px;   /* tablet vertical */
--bp-lg:  840px;   /* tablet horizontal / desktop chico */
--bp-xl:  1024px;  /* desktop */
--bp-2xl: 1440px;  /* desktop grande */

/* Container max widths */
--container-app: 100%;      /* móvil: full width */
--container-tablet: 100%;
--container-web: 1280px;
```

### Por qué NO las otras opciones

- **6pt grid:** Material 2 lo permitía pero Material 3 lo descartó — 8pt es más escalable y estandarizado.
- **12pt grid:** Muchos sitios web lo usan, pero no encaja con density buckets de Android/iOS.
- **Sin grid (freeform):** Rompe consistencia cross-screen, especialmente en 20+ pantallas como MilkBook.

---

## 📏 2. Spacing scale (8pt)

**Decisión MilkBook:** **6 valores canónicos** (4, 8, 16, 24, 32, 48) + **2 valores extendidos** (64, 80) para layouts grandes. Suficiente variedad sin abrumar. Usar SIEMPRE tokens, nunca valores ad-hoc.

### Tokens de spacing

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | **4dp** | Icon-to-text gap dentro de chip · gap entre badges · inset fino |
| `--space-2` | **8dp** | Gap entre label y value · padding interno de chips · separación dentro de cards |
| `--space-3` | **12dp** | Padding de inputs (vertical) · espacio en banner corto |
| `--space-4` | **16dp** | **Default**: padding de cards · margen de pantalla (mobile) · gap entre cards en lista |
| `--space-5` | **24dp** | Padding de cards destacadas · entre secciones en pantalla · margen web admin |
| `--space-6` | **32dp** | Entre grupos grandes · padding hero · espacio vertical en empty states |
| `--space-7` | **48dp** | Entre secciones principales · separación entre header y contenido scrolleable |
| `--space-8` | **64dp** | Hero padding · empty state illustrations grandes |
| `--space-10` | **80dp** | Solo marketing / onboarding hero |

### Reglas de uso

| Contexto | Token |
|---|---|
| Margen lateral pantalla móvil | `--space-4` (16dp) |
| Margen lateral pantalla tablet/web | `--space-6` (32dp) |
| Padding interno de card | `--space-4` (16dp) o `--space-5` (24dp) si es destacada |
| Gap entre cards en lista | `--space-3` (12dp) o `--space-4` (16dp) |
| Gap entre items de lista (rows) | `--space-2` (8dp) si están en la misma card, `--space-3` (12dp) si son cards separadas |
| Gap entre icono y texto dentro de botón | `--space-2` (8dp) |
| Padding de botón (vertical) | `--space-3` (12dp) o `--space-4` (16dp) |
| Padding de botón (horizontal) | `--space-5` (24dp) |
| Separación entre header y contenido | `--space-5` (24dp) |
| Separación entre secciones en pantalla | `--space-6` (32dp) |
| Banner de discrepancia padding | `--space-4` (16dp) |

### Por qué NO las otras opciones

- **Escala Tailwind por defecto (4-96 cada 4):** Demasiados valores — 23 valores únicos cuando solo necesitamos 9. Crea inconsistencias accidentales.
- **Escala más simple (4, 8, 16):** Muy restrictiva — no diferencia "entre items relacionados" (8) de "entre secciones" (32).
- **Spacing arbitrario por pantalla:** Genera inconsistencias que el usuario percibe como "app desordenada".

---

## 📱 3. Touch targets (tap targets)

**Decisión MilkBook:** **56dp mínimo** en app móvil (más generoso que el estándar Material de 48dp) · **60dp para acciones primarias**. La baja alfabetización digital + uso con una sola mano (moto, balde) + sol directo justifican ir más allá del estándar.

### Sistema de tokens

| Token | Valor | Uso |
|---|---|---|
| `--touch-min` | **48dp** | Mínimo absoluto WCAG (elementos secundarios como icon buttons pequeños, checkbox) |
| `--touch-default` | **56dp** | Botones, list items, inputs (todos los elementos interactivos regulares) |
| `--touch-primary` | **60dp** | CTA primario ("Confirmar 18.5 L", "Sacar cuentas"), botones destructivos grandes |
| `--touch-huge` | **72dp** | Onboarding (botón "Empezar"), empty state CTA |

### Reglas

- ✅ **Todo lo interactivo es ≥56dp** (no 48dp — extra por contexto rural)
- ✅ **Botones primarios siempre 60dp** (más prominencia + menos errores en campo)
- ✅ **Icon buttons ≥56×56dp** (zona táctil incluye el padding invisible alrededor del icono de 24dp)
- ✅ **Padding interior mínimo 8dp** entre el icono/texto y el borde del botón (legible al sol)
- ❌ **NO tap targets <48dp** ni siquiera en web admin — patrón inconsistente
- ❌ **NO usar sólo color** para indicar el área táctil — debe ser obvio por tamaño + feedback visual (ripple, scale)

### Por qué más grande que el estándar

| Estándar | Razón |
|---|---|
| WCAG 2.1 / iOS HIG | 44×44pt (mínimo legal) |
| Material Design 3 | 48×48dp (estándar de plataforma) |
| MilkBook | **56×56dp** (contexto rural: guantes, prisa, sol, baja alfabetización) |

> **Justificación validada:** Carlos (lechero) opera con una mano mientras carga la moto, en sol directo. Estudios del GSMA AgriTech UX Design Guidebook (2025) muestran que agricultores en LMICs cometen menos errores con touch targets más grandes.

---

## 🏗️ 4. Anatomía de pantalla (mobile)

**Decisión MilkBook:** **5 zonas fijas** con alturas basadas en múltiplos de 8. La composición debe respetar este esqueleto en TODA pantalla.

```
┌─────────────────────────────────────────┐
│  ① STATUS BAR          24dp / 32dp      │  ← system bar (no controlada)
├─────────────────────────────────────────┤
│  ② APP BAR / HEADER       56dp          │  ← título + acciones (back, menú)
│  Mis clientes                            │
├─────────────────────────────────────────┤
│                                          │
│  ③ BANNER DE DISCREPANCIA  (opcional)    │  ← warning amarillo, full-width
│     Carlos registró 18 L, tú 18.5 L     │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│  ④ CONTENIDO SCROLLEABLE                 │  ← flexible, ocupa el resto
│                                          │
│     ┌───────────────────────────┐       │
│     │ Pedro Mamani               │       │  ← cards / listas / forms
│     │ 18.5 L · S/ 12.03          │       │
│     └───────────────────────────┘       │
│                                          │
├─────────────────────────────────────────┤
│  ⑤ ACCIÓN FIJA (opcional)    60-72dp     │  ← sticky CTA cuando aplica
│  [ CONFIRMAR 18.5 L       ]              │
├─────────────────────────────────────────┤
│  ⑥ BOTTOM NAV (opcional)    56dp +safe  │  ← máx 4 tabs
│  🏠  👥  📋  ⚙️                          │
└─────────────────────────────────────────┘
    ↑ safe area bottom (gesture bar / home indicator)
```

### Especificación por zona

| # | Zona | Altura | Token | Notas |
|---|---|---|---|---|
| ① | Status bar | 24-32dp | system | Transparente o `bg` |
| ② | App bar | **56dp** | `--appbar-h` | Sticky en web admin, sticky en app móvil. Back arrow + título + acciones |
| ③ | Banner | Variable | `--space-4` padding | Solo si hay discrepancia, alerta o info importante |
| ④ | Contenido | flex | — | Scrollable, padding `--space-4` horizontal |
| ⑤ | Acción fija | **60dp** (+safe) | `--touch-primary` | Solo en pantallas con 1 CTA crítico (Confirmar, Sacar cuentas) |
| ⑥ | Bottom nav | **56dp** + safe | `--touch-default` | Solo en navegación principal (home, clientes, cuenta, settings) |

### Reglas por zona

- ✅ **App bar sticky siempre** — el usuario nunca pierde el contexto
- ✅ **Banner de discrepancia pegado al top del contenido**, NO debajo de cards
- ✅ **Bottom nav máximo 4 tabs** (más tabs = más confusión en baja alfabetización)
- ✅ **Sticky CTA solo cuando hay UNA acción crítica** (no para acciones secundarias)
- ❌ **NO bottom nav + sticky CTA al mismo tiempo** (compiten por la zona inferior)
- ❌ **NO tabs horizontales (top tabs) + bottom nav** (doble navegación confunde)
- ❌ **NO app bar transparente sobre patrones** sin un overlay scrim — el texto se pierde

---

## 🖥️ 5. Anatomía de pantalla (web admin)

**Decisión MilkBook:** sidebar persistente (siempre visible) + header sticky + área de contenido con container máximo de 1280px. Patrón "navigation spine" de 5-8 items (RIVER Group: cognitive load = 5-8 items en memoria de trabajo).

```
┌──────────┬──────────────────────────────────────────────┐
│          │  ② HEADER sticky         64px                │
│  ①       │  Dashboard · [user] · [logout]               │
│ SIDEBAR  ├──────────────────────────────────────────────┤
│  240px   │                                              │
│          │  ③ CONTENIDO                                │
│  Logo    │                                              │
│  ─────   │  ┌──────────────────────────────────┐       │
│  Dashboard│  │ KPIs (4 cards)                    │       │
│  Clientes │  └──────────────────────────────────┘       │
│  Lecheros │                                              │
│  ─────   │  ┌─────────────────┬─────────────────┐      │
│  Liquidac│  │ Tabla (compact) │ Detalle          │      │
│  Boletas │  └─────────────────┴─────────────────┘      │
│  ─────   │                                              │
│  Soporte │  container max 1280px · padding 32px        │
└──────────┴──────────────────────────────────────────────┘
```

### Especificación

| Zona | Ancho/alto | Notas |
|---|---|---|
| Sidebar | **240px** fijo | Sticky. Lista vertical con 5-8 items + secciones agrupadas |
| Header | **64px** sticky | Breadcrumb + título + acciones (notif, user menu) |
| Contenido | flex | Padding 32px lateral, container max 1280px |
| Densidad | **Compact** en tablas | Rows de 40dp, padding interno 12dp (vs. 56dp en app móvil) |

### Reglas

- ✅ **Sidebar colapsable** (a 72px icon-only) en pantallas <1024px
- ✅ **5-8 items en sidebar** — más = "list anti-pattern" (RIVER Group)
- ✅ **Container max 1280px** para legibilidad (líneas de texto <75 caracteres)
- ✅ **Densidad compact** solo en tablas y listados densos (web admin), no en UI general
- ❌ **NO sidebar >8 items** sin agrupar (sobrecarga memoria)
- ❌ **NO usar density compact en app móvil** (compromete tap targets rurales)

---

## 🎨 6. Jerarquía visual

**Decisión MilkBook:** **3 niveles de peso visual** + **regla del F-pattern adaptada** (no usamos el F completo por ser texto-pesado, priorizamos "una acción dominante + soporte visible").

### Los 3 niveles

| Nivel | Tamaño / peso | Color | Uso |
|---|---|---|---|
| **Primario** | **Grande, bold, alto contraste** | `green-500` (CTA) o `text` | Acción principal, dato clave (litros del día), título de pantalla |
| **Secundario** | Mediano, semibold, contraste medio | `text-soft` o `blue-500` | Labels, subtítulos, acciones alternativas |
| **Terciario** | Pequeño, regular, contraste bajo | `text-disabled` | Metadata, timestamps, "hace 2 horas", "v2.1" |

### Regla del F-pattern (adaptada a MilkBook)

Para **pantallas de datos** (listas, detalle de liquidación), ubicamos el contenido crítico siguiendo una versión simplificada del F-pattern:

```
┌──────────────────────────────────────┐
│ ① Nombre / título (PRIMARIO)         │ ← esquina superior izquierda
├──────────────────────────────────────┤
│ ② Dato clave: litros, monto (BIG)   │ ← segundo nivel
├──────────────────────────────────────┤
│ ③ Acciones: Confirmar, Discutir     │ ← zona primaria de interacción
├──────────────────────────────────────┤
│ ④ Detalle: fechas, método de pago   │ ← secundario (info complementaria)
└──────────────────────────────────────┘
```

Para **pantallas de acción única** (Confirmar litros, Onboarding), usamos **layout centrado vertical** con la acción dominante al medio-bajo (cerca del pulgar):

```
┌──────────────────────────────────────┐
│  Header: "Confirmar litros de hoy"   │
├──────────────────────────────────────┤
│                                      │
│          18.5 L                       │  ← dato GRANDE
│          Carlos registró              │  ← contexto
│                                      │
├──────────────────────────────────────┤
│  [ Discutir ]   [ CONFIRMAR ]        │  ← acciones
└──────────────────────────────────────┘
```

### Por qué NO jerarquías más complejas

- **5+ niveles:** Indistinguibles visualmente — el usuario no sabe qué es importante.
- **Solo color para jerarquía:** Falla para daltonismo (8% de hombres) y bajo sol (colores se desaturan).
- **Solo tamaño:** Pierde el contexto semántico — todo se siente "del mismo tipo".

---

## 📋 7. Patrones de pantalla

Cada tipo de pantalla de MilkBook tiene un **layout canónico**. Los equipos de diseño y desarrollo deben respetarlos — no inventar layouts nuevos por pantalla.

### 7.1 Lista (mis clientes, contratos, liquidaciones)

**Patrón: cards verticales con scroll vertical.** Demostrado como superior para usuarios no-alfabetizados por Medhi et al. (INTERACT 2013).

```
┌──────────────────────────┐
│ Mis clientes        [+]   │  ← app bar con acción
├──────────────────────────┤
│ 🔍 Buscar cliente        │  ← search input opcional
├──────────────────────────┤
│                          │
│ ┌──────────────────────┐ │
│ │ Pedro Mamani         │ │  ← card: nombre + dato + monto
│ │ 18.5 L · S/ 12.03    │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │ Juana Díaz           │ │
│ │ 12.0 L · S/ 7.80     │ │
│ └──────────────────────┘ │
│ ... hasta 6-8 visibles   │
└──────────────────────────┘
```

**Reglas:**
- ✅ **Máximo 6-8 cards visibles sin scroll** (tap target 56dp + separación 12dp = 68dp por row × 8 = 544dp, justo en un viewport de ~640dp útil)
- ✅ **Cada card muestra: nombre + dato principal + monto** (lo que se necesita confirmar)
- ✅ **Tap en card = abre detalle** (no botones "Ver más" inline)
- ✅ **Search arriba** si la lista tiene >10 items (Carlos tiene 20-50 clientes)
- ❌ **NO listas planas con sub-headers** (jerarquía confunde a usuarios con baja alfabetización)
- ❌ **NO listas >20 items sin search** (inaccesible)
- ❌ **NO rows de <56dp** (compromete tap target)

### 7.2 Detalle (cliente X, liquidación Y)

**Patrón: progressive disclosure** (resumen visible, secciones colapsables debajo).

```
┌──────────────────────────┐
│ ← Pedro Mamani            │  ← app bar con back
├──────────────────────────┤
│ 18.5 L                    │  ← DATO CLAVE (dato del día)
│ Carlos registró hoy       │
│ ──────────────────────    │
│ Saldo: S/ 245.30          │  ← RESUMEN FINANCIERO
│ Adelantos: S/ 50.00       │
│ ──────────────────────    │
│ [ CONFIRMAR ]             │  ← CTA primaria
│ [ Reportar problema ]     │  ← CTA secundaria
├──────────────────────────┤
│ ▼ Historial (15 días)     │  ← secciones colapsables
│ ▼ Encargos pendientes     │
│ ▼ Datos del contrato      │
└──────────────────────────┘
```

**Reglas:**
- ✅ **Resumen siempre visible arriba del scroll** (lo más importante no se esconde)
- ✅ **CTA primaria DEBAJO del resumen** (no al final, donde requiere scroll)
- ✅ **Secciones colapsables** para detalle (expand on demand)
- ✅ **Botón "back" en app bar** siempre visible
- ❌ **NO tabs en detalle** (tabs funcionan para vista dual, no para detalle de 1 objeto)
- ❌ **NO acción primaria al final** (usuarios rurales no hacen scroll para confirmar)

### 7.3 Acción crítica (Confirmar litros, Sacar cuentas)

**Patrón: foco total** — 1 acción, todo lo demás en segundo plano.

```
┌──────────────────────────┐
│ ← Confirmar litros        │
├──────────────────────────┤
│                          │
│     18.5 L                │  ← DATO GIGANTE (40sp)
│     Carlos registró       │  ← contexto (text-soft)
│                          │
│  ┌────────────────────┐  │
│  │ ¿Cuántos L vendiste?│  │  ← pregunta clara
│  └────────────────────┘  │
│                          │
│  [    CONFIRMAR 18.5 L  ] │  ← CTA 60dp verde
│                          │
│  [Discutir]              │  ← link secundario
└──────────────────────────┘
```

**Reglas:**
- ✅ **Solo 1 CTA primaria visible** (verde, 60dp, ancho completo o 80% width)
- ✅ **Dato centralizado verticalmente** (cerca del pulgar)
- ✅ **Input numérico gigante** (28sp bold, Atkinson) si requiere entrada
- ❌ **NO 2+ acciones primarias del mismo peso** (parálisis de decisión)
- ❌ **NO loading spinners durante >500ms sin contexto** (mostrar "Guardando...")
- ❌ **NO cancelar botón** (back arrow es suficiente)

### 7.4 Onboarding / wizard

**Patrón: linear stepper**, 1 step por pantalla.

```
┌──────────────────────────┐
│ ●─○─○─○ Paso 1 de 4      │  ← progress dots (no números)
├──────────────────────────┤
│                          │
│   ¡Bienvenido, Carlos!   │  ← saludo (Fraunces, branding)
│   Tu primer registro     │
│                          │
│   ┌────────────────┐    │
│   │  [ilustración] │    │  ← forma decorativa de sección 7
│   └────────────────┘    │
│                          │
│   Para empezar:          │
│   • Confirma litros     │  ← bullets simples (no más de 3)
│   • Registra clientes   │
│   • Cobra cada 15 días   │
│                          │
│  [ EMPEZAR ]             │  ← 72dp verde
│                          │
│         Saltar           │  ← link opcional
└──────────────────────────┘
```

**Reglas:**
- ✅ **Progress dots** (no "Step 2 of 4" — los dots son más visuales)
- ✅ **1 concepto por pantalla** (principio G6 de SARAL framework: chunked information)
- ✅ **Máximo 3 bullets** por pantalla (más = no se lee)
- ✅ **Botón primario 72dp** (más grande que en app normal — primera impresión importa)
- ✅ **Skip siempre opcional** (al final, no al principio)
- ❌ **NO más de 4-5 pasos** (después de eso, el usuario abandona)
- ❌ **NO pedir login/perfil durante onboarding** (separar — primero el valor, después el login)

### 7.5 Empty state

**Patrón: ilustración + acción clara.** Empty states son momentos críticos para retención.

```
┌──────────────────────────┐
│ Mis clientes        [+]   │
├──────────────────────────┤
│                          │
│      [ilustración]       │  ← forma decorativa SVG (sección 7)
│       hoja verde         │
│                          │
│  Aún no tienes clientes  │  ← título claro, sin jerga
│  registrados             │
│                          │
│  Cuando Carlos visite    │  ← explicación humana
│  a un productor,         │
│  aparecerá aquí.         │
│                          │
│  [ + Añadir cliente ]    │  ← CTA clara (no "Crear")
│                          │
└──────────────────────────┘
```

**Reglas:**
- ✅ **Título en 2-3 palabras máximo** ("Aún no tienes clientes")
- ✅ **Explicación humana** (no "No hay datos para mostrar")
- ✅ **CTA explícita** ("Añadir cliente" no "Crear")
- ✅ **Ilustración de las formas decorativas** (sección 7) — coherencia visual
- ❌ **NO usar la misma ilustración para todos los empty states** (sugiere falta de cuidado)
- ❌ **NO solicitar feedback** ("¿Por qué no tienes datos?") — molesta y recolecta data inútil

### 7.6 Error / discrepancia

**Patrón: banner persistente + acción correctiva inline.**

```
┌──────────────────────────┐
│ ← Detalle de hoy          │
├──────────────────────────┤
│ ⚠ Carlos registró 18 L,  │  ← banner top (no toast)
│   tú confirmaste 18.5 L  │
│   [Discutir] [Aceptar]   │
├──────────────────────────┤
│  18.5 L                  │  ← resto del contenido
│  ...                     │
└──────────────────────────┘
```

**Reglas:**
- ✅ **Banner en TOP del contenido**, pegado al app bar (no toast, no bottom)
- ✅ **Color warning** (ámbar) con borde izquierdo de 4dp
- ✅ **2 acciones inline** (la principal + la alternativa)
- ✅ **Persistente hasta resolver** (no desaparece solo)
- ❌ **NO usar rojo (error)** para discrepancias (es un desacuerdo, no un fallo)
- ❌ **NO esconder detrás de un link** ("Ver detalles" → nunca lo abren)

### 7.7 Formularios

**Patrón: 1 input por línea con label visible + CTA al final del form (no del scroll).**

```
┌──────────────────────────┐
│ Adelanto                  │
├──────────────────────────┤
│  Nombre del cliente      │  ← label arriba del input (no placeholder)
│  ┌────────────────────┐  │
│  │ Pedro Mamani       │  │  ← input 56dp
│  └────────────────────┘  │
│                          │
│  Monto (S/)              │
│  ┌────────────────────┐  │
│  │ 300                │  │  ← input numérico grande
│  └────────────────────┘  │
│                          │
│  Método                  │
│  ┌─────┐ ┌─────┐ ┌─────┐│  ← segmented control
│  │Efect│ │Yape │ │Trnsf││
│  └─────┘ └─────┘ └─────┘│
│                          │
│  [ REGISTRAR ADELANTO ]  │  ← CTA final, no requiere scroll
└──────────────────────────┘
```

**Reglas:**
- ✅ **Label arriba del input** (no solo placeholder — desaparece al escribir)
- ✅ **Input 56dp de alto** (touch target + legibilidad)
- ✅ **Helper text debajo del input** si hay formato ("Solo números")
- ✅ **CTA al final del form** — no hacer scroll para encontrarla
- ✅ **Validación inline** (no mostrar todos los errores después de submit)
- ❌ **NO usar placeholder como label** (desaparece al escribir → olvida qué pidió)
- ❌ **NO agrupar inputs en grid 2x2** (en mobile, 1 columna siempre)

---

## 🔄 8. Patrones de organización del contenido

### Cards vs listas planas

| Contexto | Usar |
|---|---|
| Lista de clientes / contratos | **Cards verticales** con borde 1px + radius 12px |
| Lista de items dentro de un card | **Rows con divider 1px** (sin card dentro de card) |
| Settings / opciones | **Rows con label + value + chevron** (sin card) |
| KPIs en web admin | **KPI cards** en grid 2×2 o 4×1 |

### Reglas de cards

- ✅ **Card = agrupar info relacionada** (cliente: nombre + saldo + última visita)
- ✅ **Border 1px `cream-300`** (consistente con sección 7, no sombras en móvil)
- ✅ **Padding interno 16dp**
- ✅ **Gap entre cards 12-16dp**
- ❌ **NO card dentro de card** (anidar)
- ❌ **NO card con sombra + border** (sección 7: elige uno)
- ❌ **NO cards de 1 solo elemento** (usar row)

### Banners (notificaciones inline)

| Tipo | Color | Borde izquierdo | Uso |
|---|---|---|---|
| **Info** | `blue-100` fondo, `blue-700` texto | 4dp `blue-500` | Avisos neutros (sincronización, cambios de precio) |
| **Warning / discrepancia** | `warning-bg` fondo, `warning` texto | 4dp `warning` | Discrepancias, precios variables |
| **Success** | `green-100` fondo, `green-700` texto | 4dp `green-500` | Confirmaciones, registros exitosos |
| **Error** | `error-bg` fondo, `error` texto | 4dp `error` | Errores graves, conexión perdida, validación fallida |

**Reglas:**
- ✅ **Banner SIEMPRE full-width**, pegado al top del contenido
- ✅ **Cierra con X** solo si es info (las discrepancias se cierran resolviendo)
- ✅ **Acciones inline** (no "Ver más" → enlace)
- ❌ **NO usar modal/toast** para cosas que requieren acción (se pierden)

### Modales vs full screens vs sheets

| Tipo | Cuándo | Cómo |
|---|---|---|
| **Full screen** (con back) | Flujo crítico con >2 pasos | Ocupa toda la pantalla, tiene app bar con back |
| **Modal sheet (bottom)** | Acción rápida (filtros, selección de fecha, opciones) | Slide desde abajo, dismiss al tap fuera |
| **Modal centrado** | Confirmación destructiva, alertas críticas | Centrado con scrim oscuro, dismiss al back |
| **Toast/snackbar** | Feedback efímero ("Guardado") | Bottom, 4 segundos, sin acción |

**Reglas:**
- ✅ **Full screen para flujos críticos** (sacar cuentas, registrar visita)
- ✅ **Bottom sheet para filtros** (no full screen — es secundario)
- ✅ **Modal centrado SOLO para confirmación destructiva** ("¿Eliminar este contrato?")
- ✅ **Toast solo para feedback de éxito** ("Guardado ✓")
- ❌ **NO modal para flujos multi-paso** (el back se rompe)
- ❌ **NO más de 1 modal anidado** (modal en modal = error de UX)

---

## 🌓 9. Adaptación: light, dark, online, offline

### Dark mode

| Zona | Light | Dark |
|---|---|---|
| Fondo de pantalla | `cream-50` (#FFFDF7) | `#1A1814` (negro cálido) |
| Cards / surface | `#FFFFFF` | `#25211B` |
| Borders | `cream-300` (#EBE3CC) | `#3A332A` |
| App bar | `bg` con border-bottom 1dp | `surface` con border-bottom 1dp |
| Banner warning | `warning-bg` claro | `#3A2810` (fondo oscuro) |
| Banners | mismos colores, mismo padding | mismos colores, mismo padding |
| Spacing / grid / sizes | **idénticos** | **idénticos** |

**Regla:** el spacing, los tamaños y la jerarquía **no cambian** en dark. Solo cambian los colores. Los tokens estructurales (`--space-*`, `--touch-*`) son theme-agnostic.

### Offline mode

**Decisión:** **el layout NO cambia** cuando el dispositivo está offline. Solo cambia el **estado de elementos específicos**:

| Elemento | Online | Offline |
|---|---|---|
| Banner de sincronización | (ausente) | Banner persistente amarillo "Modo offline — cambios guardados localmente" |
| CTA "Sincronizar ahora" | (oculto) | Aparece en app bar (icon refresh) |
| Datos pendientes de sync | (sin indicador) | Dot azul al lado del item, badge numérico en tab |
| Imágenes de fondo | cargadas | (ocultas o placeholder) |
| Errores de sync | toast efímero | Banner persistente hasta resolver |

**Reglas:**
- ✅ **El layout base no se reorganiza** — los datos están local-first
- ✅ **Banner de modo offline** pegado al app bar (no encima del contenido)
- ✅ **Indicador visual claro de "pendiente de sync"** sin alarmar al usuario
- ❌ **NO bloquear acciones** "porque no hay internet" (la app es offline-first)
- ❌ **NO mostrar error screens completos** — solo badges/banners

---

## 📐 10. Implementación por plataforma

### CSS custom properties (web)

```css
:root {
  /* === Grid base === */
  --bp-sm: 360px;
  --bp-md: 600px;
  --bp-lg: 840px;
  --bp-xl: 1024px;
  --bp-2xl: 1440px;

  --container-app: 100%;
  --container-web: 1280px;

  /* === Spacing scale (8pt base) === */
  --space-1:  4px;    /* icon-text gap */
  --space-2:  8px;    /* chip padding */
  --space-3:  12px;   /* input vertical padding */
  --space-4:  16px;   /* default card padding, screen margin mobile */
  --space-5:  24px;   /* card destacada, section gap */
  --space-6:  32px;   /* section divider, web margin */
  --space-7:  48px;   /* major section break */
  --space-8:  64px;
  --space-10: 80px;

  /* === Touch targets === */
  --touch-min:      48px;
  --touch-default:  56px;
  --touch-primary:  60px;
  --touch-huge:     72px;

  /* === App structure (mobile) === */
  --statusbar-h:    24px;
  --appbar-h:       56px;
  --bottomnav-h:    56px;
  --sticky-cta-h:   60px;

  /* === Web structure === */
  --sidebar-w:      240px;
  --sidebar-w-collapsed: 72px;
  --web-header-h:   64px;
  --web-density-row: 40px;  /* tablas compact */
}
```

### Tailwind config (si se usa Tailwind)

```js
// tailwind.config.js
module.exports = {
  theme: {
    spacing: {
      1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '24px',
      6: '32px', 7: '48px', 8: '64px', 10: '80px',
    },
    minHeight: {
      'touch-min':     '48px',
      'touch-default': '56px',
      'touch-primary': '60px',
      'touch-huge':    '72px',
    },
    screens: {
      xs: '360px', sm: '600px', md: '840px', lg: '1024px', xl: '1440px',
    },
    maxWidth: {
      'web-container': '1280px',
    },
  },
};
```

### Flutter

```dart
class MilkbookSpacing {
  static const space1 = 4.0;
  static const space2 = 8.0;
  static const space3 = 12.0;
  static const space4 = 16.0;  // default
  static const space5 = 24.0;
  static const space6 = 32.0;
  static const space7 = 48.0;
  static const space8 = 64.0;
}

class MilkbookTouch {
  static const touchMin     = 48.0;
  static const touchDefault = 56.0;  // list items, inputs, buttons
  static const touchPrimary = 60.0;  // CTAs principales
  static const touchHuge    = 72.0;  // onboarding
}

class MilkbookStructure {
  static const statusbarH = 24.0;
  static const appbarH = 56.0;
  static const bottomNavH = 56.0;
  static const stickyCtaH = 60.0;
  static const sidebarW = 240.0;
  static const webHeaderH = 64.0;
}

// Padding helpers
EdgeInsets screenPaddingMobile = const EdgeInsets.symmetric(horizontal: MilkbookSpacing.space4);
EdgeInsets screenPaddingWeb = const EdgeInsets.symmetric(horizontal: MilkbookSpacing.space6);
EdgeInsets cardPadding = const EdgeInsets.all(MilkbookSpacing.space4);
EdgeInsets cardPaddingLarge = const EdgeInsets.all(MilkbookSpacing.space5);

// SizedBox gaps
const gap4 = SizedBox(width: 4, height: 4);
const gap8 = SizedBox(width: 8, height: 8);
const gap16 = SizedBox(width: 16, height: 16);
const gap24 = SizedBox(width: 24, height: 24);
const gap32 = SizedBox(width: 32, height: 32);
```

### iOS SwiftUI

```swift
enum MilkbookSpace {
  static let s1: CGFloat = 4
  static let s2: CGFloat = 8
  static let s3: CGFloat = 12
  static let s4: CGFloat = 16   // default
  static let s5: CGFloat = 24
  static let s6: CGFloat = 32
  static let s7: CGFloat = 48
}

enum MilkbookTouch {
  static let min: CGFloat = 48
  static let `default`: CGFloat = 56
  static let primary: CGFloat = 60
  static let huge: CGFloat = 72
}

enum MilkbookStructure {
  static let statusbarH: CGFloat = 24
  static let appbarH: CGFloat = 56
  static let bottomNavH: CGFloat = 56
  static let stickyCtaH: CGFloat = 60
}

// Uso:
VStack(spacing: MilkbookSpace.s4) {
  Text("Pedro Mamani").font(.milkbookData(18))
  Text("18.5 L").font(.milkbookData(24, weight: .bold))
}
.padding(MilkbookSpace.s4)  // padding de card
```

---

## 🚦 Reglas duras

### Lo que SIEMPRE

1. **Usar tokens de spacing** (`--space-*`), nunca valores ad-hoc (`padding: 13px` está prohibido)
2. **Todo touch target ≥56dp** (no 48dp — contexto rural)
3. **Botones primarios 60dp de alto** (más prominencia + menos errores)
4. **App bar 56dp, bottom nav 56dp, sidebar 240px** — siempre
5. **Banner de discrepancia en TOP del contenido**, no toast, no modal
6. **Una acción primaria por pantalla** (color verde, ancho completo o 80%)
7. **Lista > jerarquía** — para usuarios no-alfabetizados, mostrar todos los items
8. **Resumen arriba del scroll** en pantallas de detalle
9. **Label visible en inputs** (no solo placeholder)
10. **Mismo grid 8pt, mismo padding, mismo height de app bar** en light y dark
11. **Spacing/tamaños idénticos** entre light y dark mode (solo cambian colores)
12. **Layout NO se reorganiza** entre online y offline (solo cambia estado de elementos)

### Lo que NUNCA

1. **NO valores ad-hoc de spacing** (`margin: 13px`, `padding: 7px`) — usar tokens
2. **NO tap targets <56dp** en app móvil — ni siquiera icon buttons pequeños
3. **NO 2 acciones primarias del mismo peso** en la misma pantalla
4. **NO tabs horizontales + bottom nav** en la misma pantalla (doble navegación)
5. **NO sidebar >8 items sin agrupar** (sobrecarga memoria de trabajo)
6. **NO card dentro de card** (anidar)
7. **NO usar density compact en app móvil** (rompe tap targets rurales)
8. **NO usar rojo para discrepancias** (es desacuerdo, no error)
9. **NO hacer scroll para encontrar CTA primaria** — siempre visible
10. **NO mostrar modal para flujo multi-paso** (rompe el back button)
11. **NO cambiar el layout entre light y dark** — solo cambian los colores
12. **NO bloquear acciones por falta de internet** — la app es offline-first
13. **NO usar placeholder como label de input** (desaparece al escribir)

---

## 📋 Resumen: decisiones clave

| Decisión | Valor MilkBook | Por qué |
|---|---|---|
| **Grid base** | **8pt con 4pt sub-grid** | Estándar universal Material/iOS/Atlassian. Limpio en todas las densidades. |
| **Spacing scale** | **6 valores (4-48) + 2 extendidos** | Suficiente variedad sin abrumar. Múltiplos de 8 consistentes. |
| **Touch targets** | **56dp default, 60dp primaria** | Más generoso que estándar 48dp — usuarios rurales, manos ocupadas, sol. |
| **App bar** | **56dp sticky** | Siempre presente, no scroll-out (orientación constante). |
| **Bottom nav** | **56dp + safe area, máx 4 tabs** | Cognitive load: 4 máx. Safe area para gestos iOS/Android. |
| **Sidebar web** | **240px, 5-8 items** | Working memory limit (RIVER Group). |
| **Container web max** | **1280px** | Legibilidad líneas <75 caracteres. |
| **Lista vs jerarquía** | **Lista con scroll > jerarquía anidada** | Medhi et al. (INTERACT 2013): 100% vs 80% tareas correctas. |
| **Density** | **Comfortable en app, compact en web admin** | Baja alfabetización → más espacio. Tablas densas → compact. |
| **Cantidad info/pantalla** | **1 acción principal + 1 resumen visible** | SARAL G3: minimalist, G6: chunked. |

---

## ✅ Checklist de implementación

### General
- [ ] Aplicar 8pt grid en Figma (Figma > Layout Grid > 8, snap to grid)
- [ ] Crear variables/tokens de spacing en el sistema de diseño global
- [ ] Crear variables/tokens de touch targets
- [ ] Documentar la anatomía de pantalla en Storybook

### App móvil
- [ ] Implementar `MilkbookSpacing` y `MilkbookTouch` en Flutter / iOS / Android
- [ ] Auditar todos los componentes existentes y reemplazar valores hardcodeados
- [ ] Validar que TODOS los elementos interactivos ≥56dp
- [ ] Validar que los botones primarios sean 60dp
- [ ] Implementar app bar 56dp sticky
- [ ] Implementar bottom nav 56dp + safe area, máximo 4 tabs
- [ ] Implementar sticky CTA 60dp en pantallas de acción crítica (Confirmar, Sacar cuentas)

### Web admin
- [ ] Implementar sidebar 240px colapsable
- [ ] Container max 1280px
- [ ] Densidad compact (40dp row) SOLO en tablas y listados densos
- [ ] Densidad comfortable (56dp) en UI general
- [ ] Validar 5-8 items en sidebar

### Testing
- [ ] Validar bajo sol directo con Carlos y Juan (Cajamarca) que los targets son fáciles de tap
- [ ] Validar que NO requiere scroll en pantallas críticas (Confirmar litros)
- [ ] Validar dark mode: spacing idéntico, solo cambian colores
- [ ] Validar offline mode: layout no se reorganiza, solo cambia el banner
- [ ] Validar con simulador de daltonismo (Coblis o Stark) que la jerarquía no depende solo del color
- [ ] Test A/B: lista vs jerarquía con usuarios reales (validar hallazgo de Medhi et al. en contexto Cajamarca)

---

## 🔗 Referencias

### Sistemas de diseño consultados
- **Material Design 3 — Layout:** https://m3.material.io/foundations/layout
- **Material Design 3 — Spacing:** https://m3.material.io/styles/spacing/applying-spacing
- **Atlassian Design System — Spacing:** https://atlassian.design/foundations/spacing
- **IBM Carbon — Layout:** https://carbondesignsystem.com/elements/layout/
- **Apple HIG — Layout:** https://developer.apple.com/design/human-interface-guidelines/layout
- **Tailwind CSS — Spacing:** https://tailwindcss.com/docs/customizing-spacing
- **8pt grid system:** https://gridmakerpro.com/grids/typography-grids/8pt-spacing-grid/
- **Grid maker pro mobile:** https://gridmakerpro.com/for/designers/mobile-app-design/

### Marcos teóricos
- **Grid systems and composition (Ramotion):** https://www.ramotion.com/blog/design-system-guide-chapter-4-composition-and-structure/
- **Medhi, Toyama et al. (2013) — List vs hierarchy on mobile for non-literate users:** https://cutrell.org/papers/Medhi-INTERACT2013-ListVsHierachyOnMobiles.pdf
- **Srivastava, Kapania et al. (CSCW 2021) — SARAL framework for low-literate users:** https://www.shivanikapania.com/assets/cscw2021paper.pdf
- **GSMA AgriTech UX Design Guidebook (2025):** https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/agritech-ux-design-guidebook/
- **Nielsen Norman — F-pattern reading:** https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- **Information architecture for complex apps (RIVER Group):** https://rivergroup.ai/insights/information-architecture-complex-enterprise-apps

### Principio clave
- **Diseño para el campo, no para la sala de conferencias** (Sneh Sagar, 2026): cada decisión debe pasar el test "¿funciona al mediodía en campo abierto?" — toca el caso de MilkBook perfectamente.

### Proyecto
- Paleta: [`../2-paleta-de-colores/`](../2-paleta-de-colores/)
- Tipografía: [`../3-tipografia/`](../3-tipografia/)
- Iconografía: [`../4-iconografia/`](../4-iconografia/)
- Patrones y texturas: [`../6-patrones-y-texturas/`](../6-patrones-y-texturas/)
- Formas y elementos: [`../7-formas-y-elementos/`](../7-formas-y-elementos/)
- Personas: [`../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/`](../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/)
- Principios de diseño low-literacy: [`../../../indagacion_y_planteamiento_de_proyecto/diseno-ux/low-literacy/`](../../../indagacion_y_planteamiento_de_proyecto/diseno-ux/low-literacy/)
- Vista previa interactiva: [`./comparativa-composicion.html`](./comparativa-composicion.html)
