# 📐 Sistema de Formas y Elementos Gráficos — Milkbook

> **Building blocks geométricos de Milkbook:** border radius (esquinas), strokes (líneas), sombras/elevación, efectos blur, y formas decorativas. Define el "aspecto" de TODOS los componentes de la marca.

**Fecha de aprobación:** 2026-09-05
**Aplica a:** App móvil (lechero + cliente), web admin, dark mode, marketing.
**Archivo de referencia visual:** [`comparativa-formas.html`](./comparativa-formas.html)

---

## 🎯 Principio fundamental

**Las formas y elementos son el "esqueleto" de la marca.** Definen cómo se ven los componentes antes de aplicarles color o contenido. Las decisiones de Milkbook son:

| Decisión | Valor Milkbook | Por qué |
|---|---|---|
| **Border radius** | **Medio redondeado (8-12px)** | Balance entre profesional y cálido. Encaja con la paleta cremosa. |
| **Strokes** | **2px default, 2.5px en focus/hero** | Consistente con la iconografía Lucide. Color `cream-300`/`cream-400`, nunca negro. |
| **Sombras** | **Elevation 1 con tinte verde** (default) + **Elevation 2** (modales web) | Coherencia con la paleta. Sutiles, no genéricas. |
| **Blur translúcido** | **Frosted glass** sobre overlays | Efecto moderno sin perder calidez. |
| **Formas decorativas** | 6 unidades (gota, hoja, círculo, línea, marco, curva) | Acentos individuales, no patrones repetidos. |

---

## 📐 1. Border radius

**Decisión Milkbook:** **medio redondeado**. Es el balance entre la calidez que da esquinas suaves y la profesionalidad que necesita Milkbook (es una app técnica de gestión, no un juego infantil).

### Sistema de tokens

| Token | Valor | Uso | Ejemplo |
|---|---|---|---|
| `--radius-sm` | `6px` | Chips, tags, badges pequeños | Etiqueta de "Confirmado" |
| `--radius-md` | `8px` | Botones, inputs, icon buttons | Botón "Confirmar", input de texto |
| `--radius-lg` | `12px` | Cards, modales, list items | Card de cliente, modal de éxito |
| `--radius-full` | `9999px` | Avatars, pills, toggles | Avatar del lechero |

### Implementación

```css
:root {
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;
}

/* Aplicación */
.button { border-radius: var(--radius-md); }
.card   { border-radius: var(--radius-lg); }
.avatar { border-radius: var(--radius-full); }
```

### Reglas

- ✅ **Usar siempre tokens**, nunca valores ad-hoc
- ✅ **Mantener consistencia por componente** (todos los inputs usan `--radius-md`, todas las cards usan `--radius-lg`)
- ❌ **NO mezclar 3+ estilos de radius en el mismo componente** (ej: card 12px + input adentro 8px + botón adentro 4px = caos visual)
- ❌ **NO usar `0px` (sharp)** en la app móvil — pierde calidez

### Por qué NO las otras opciones

- **Sharp (0-2px):** Apple, Linear, Notion. Se siente "tech", frío. Milkbook es cálido.
- **Pill/full (999px):** iOS, Material 3. Demasiado infantil. Pierde seriedad técnica.
- **8-12px (medio):** ✅ Stripe, Tailwind, Headspace. Balance entre profesional y cálido. **Encaja con la paleta cremosa de Milkbook.**

---

## ✏️ 2. Strokes (líneas)

**Decisión Milkbook:** **2px default**, **2.5px en focus y hero**. Color siempre `cream-300` o `cream-400`, nunca negro puro.

### Sistema de tokens

| Token | Valor | Uso |
|---|---|---|
| `--stroke-thin` | `1px` | Divisores muy sutiles, separadores de tabla |
| `--stroke-base` | `2px` | **Default**: bordes de inputs, iconos outline, separadores |
| `--stroke-bold` | `2.5px` | **Inputs focused**, hero text underline, acentos |
| `--stroke-accent` | `3px` | Acentos decorativos, ilustraciones |

### Color del stroke

```css
:root {
  --color-border-subtle:  var(--cream-300);  /* #EBE3CC · divisores */
  --color-border-default: var(--cream-400);  /* #D9CCA8 · bordes normales */
  --color-border-strong:  var(--text);        /* #1A1F1A · acentos */
}
```

### Implementación

```css
.input {
  border: var(--stroke-base) solid var(--color-border-default);
  border-radius: var(--radius-md);
}
.input:focus {
  border: var(--stroke-bold) solid var(--green-500);
  /* Sin cambio de color de fondo: al sol queda más legible */
}
```

### Reglas

- ✅ **Stroke 2px es el default universal**
- ✅ **1px solo para divisores muy sutiles** (líneas entre filas de tabla, separadores de párrafo)
- ✅ **2.5px para estados interactivos** (focus, hover en algunos casos) y elementos hero
- ✅ **Color siempre de la paleta cálida** (`cream-300`/`cream-400`) — no `#1A1F1A` como borde estándar
- ❌ **NO usar `border: 0.5px`** — se ve borroso al sol
- ❌ **NO usar `border: 4px+`** — parece botón de alerta, no borde

---

## 🌑 3. Sombras, elevación y blur translúcido

**Decisión Milkbook:** sombras **con tinte verde** (no negras genéricas) + efecto **frosted glass** (blur translúcido) como valor añadido para el web admin.

### Por qué sombras con tinte verde

Las sombras estándar son `rgba(0, 0, 0, 0.1)` — negro con opacidad. Esto **no encaja con la paleta cálida** de Milkbook. Usar tinte verde `rgba(42, 120, 42, ...)` mantiene la coherencia cromática: las sombras parecen "ecológicas" en vez de "duras".

### Sistema de tokens

| Token | Valor | Uso | Plataforma |
|---|---|---|---|
| `--shadow-none` | `none` | Plano total (default app móvil) | App + web |
| `--shadow-sm` | `0 1px 2px rgba(42, 120, 42, 0.05)` | Muy sutil, separador visual | App |
| **`--shadow-md`** | `0 2px 4px rgba(42, 120, 42, 0.06), 0 4px 12px rgba(42, 120, 42, 0.04)` | **Default web** (cards, list items elevados) | Web |
| **`--shadow-lg`** | `0 4px 12px rgba(42, 120, 42, 0.10), 0 8px 24px rgba(42, 120, 42, 0.06)` | **Modales, dropdowns** | Web |
| `--border-sun` | `1px solid var(--cream-300)` | **Alternativa al sol**: sin sombra, solo borde | App |

### Blur translúcido (Frosted glass)

Para overlays del web admin que se ponen **sobre patrones o fotos** (donde una sombra normal no funciona bien), Milkbook usa el efecto **frosted glass** con `backdrop-filter: blur(...)`. Da una sensación de "vidrio esmerilado" moderno sin perder calidez.

```css
.glass {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-md);
}
```

### Cuándo usar cada uno

| Contexto | Token |
|---|---|
| Card normal en app móvil | `border: var(--border-sun)` (1px) — **sin sombra** |
| Card elevada en app móvil | `box-shadow: var(--shadow-sm)` — muy sutil |
| Card en web admin | `box-shadow: var(--shadow-md)` |
| Modal / dropdown en web admin | `box-shadow: var(--shadow-lg)` |
| Overlay sobre patrón/foto | `.glass` (frosted glass) |
| Input focused en app móvil | `border: 2.5px solid var(--green-500)` — sin sombra, más contraste |

### Reglas

- ✅ **Sombras con tinte verde siempre** (`rgba(42, 120, 42, ...)`) — coherencia con la paleta
- ✅ **En app móvil: borde sutil 1px en vez de sombra** (mejor al sol)
- ✅ **Modales y dropdowns del web admin: elevation 2** (más prominentes)
- ✅ **Overlays sobre patrones: blur translúcido** (`backdrop-filter`)
- ❌ **NO sombras fuertes en app móvil** (se ven feas al sol)
- ❌ **NO sombras negras genéricas** (`rgba(0,0,0,...)`) — usan tinte verde
- ❌ **NO combinar sombra + borde en el mismo componente** (elige uno)

---

## 🎨 4. Formas decorativas (unidades individuales)

**Decisión Milkbook:** usar **6 formas decorativas** como acentos en composiciones, no como patrones repetidos. Cada una tiene un uso específico.

### Catálogo de formas

| # | Forma | Color | Uso |
|---|---|---|---|
| 1 | **Gota azul** | `#78C0F8` (blue-300) | Acento decorativo relacionado con el producto (leche) |
| 2 | **Hoja verde** | `#88D088` (green-300) con outline `#2A782A` | Acento rural/agro, identidad andina |
| 3 | **Círculo (puntos)** | `#2A782A` (green-500) | Bullets de lista, separador decorativo |
| 4 | **Línea ondulada** | `#2A782A` (green-500) | Separador de sección en hero o empty states |
| 5 | **Marco dashed** | `#B89766` (cream-500) | Área destacada, input especial, "arrastra aquí" |
| 6 | **Curva + base** | `#2A782A` (green-500) | Representación de caserío u horizonte andino |

### Especificación SVG de cada una

#### 1. Gota azul

```xml
<svg viewBox="0 0 50 50">
  <path d="M25 8 Q17 22 17 32 Q17 42 25 42 Q33 42 33 32 Q33 22 25 8 Z"
        fill="#78C0F8" opacity="0.8"/>
</svg>
```

#### 2. Hoja verde

```xml
<svg viewBox="0 0 50 50">
  <g transform="translate(25 40)">
    <path d="M0 0 Q-7 -18 -2 -32 Q7 -34 8 -18 Q4 -2 0 0 Z"
          fill="#88D088" stroke="#2A782A" stroke-width="0.8"/>
    <line x1="0" y1="0" x2="1" y2="-28" stroke="#2A782A" stroke-width="0.6" opacity="0.6"/>
  </g>
</svg>
```

#### 3. Círculo

```xml
<svg viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="6" fill="#2A782A"/>
</svg>
```

#### 4. Línea ondulada

```xml
<svg viewBox="0 0 100 20">
  <path d="M0 10 Q25 0 50 10 T100 10"
        stroke="#2A782A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>
```

#### 5. Marco dashed

```xml
<svg viewBox="0 0 100 60">
  <rect x="4" y="4" width="92" height="52" rx="8"
        fill="none" stroke="#B89766" stroke-width="2" stroke-dasharray="6 4"/>
</svg>
```

#### 6. Curva + base (caserío/horizonte)

```xml
<svg viewBox="0 0 100 60">
  <path d="M0 50 Q30 15 50 35 Q70 15 100 50" stroke="#2A782A" stroke-width="2" fill="none"/>
  <path d="M0 55 L100 55" stroke="#2A782A" stroke-width="2"/>
</svg>
```

### Reglas

- ✅ **Usar como acento**, no como decoración masiva
- ✅ **Opacidad 60-80%** sobre fondos de color
- ✅ **Coherencia con la paleta** — solo verde, azul, cream
- ❌ **NO más de 2-3 formas decorativas** en la misma composición
- ❌ **NO usar formas decorativas en pantallas de datos densos** (interfiere con la lectura)

---

## 📋 Resumen: sistema completo de tokens

```css
:root {
  /* === Border radius === */
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-full: 9999px;

  /* === Strokes === */
  --stroke-thin:   1px;
  --stroke-base:   2px;  /* default */
  --stroke-bold:   2.5px;
  --stroke-accent: 3px;

  --color-border-subtle:  var(--cream-300);
  --color-border-default: var(--cream-400);
  --color-border-strong:  var(--text);

  /* === Sombras (tinte verde) === */
  --shadow-none: none;
  --shadow-sm:   0 1px 2px rgba(42, 120, 42, 0.05);
  --shadow-md:   0 2px 4px rgba(42, 120, 42, 0.06), 0 4px 12px rgba(42, 120, 42, 0.04);
  --shadow-lg:   0 4px 12px rgba(42, 120, 42, 0.10), 0 8px 24px rgba(42, 120, 42, 0.06);
  --border-sun:  1px solid var(--cream-300);

  /* === Blur translúcido (frosted glass) === */
  --glass-bg:      rgba(255, 255, 255, 0.45);
  --glass-blur:    12px;
  --glass-border:  1px solid rgba(255, 255, 255, 0.6);
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: var(--glass-border);
  border-radius: var(--radius-md);
}
```

---

## 🚦 Reglas duras (todas las formas y elementos)

### Lo que SIEMPRE

1. **Usar tokens**, nunca valores ad-hoc (`border-radius: 7px` está prohibido)
2. **Stroke 2px default**, 1px solo para divisores muy sutiles, 2.5-3px para acentos
3. **Color de borde siempre cálido** (`cream-300` o `cream-400`) — nunca negro puro
4. **Sombras con tinte verde** (`rgba(42, 120, 42, ...)`) — no negras genéricas
5. **En la app móvil: borde sutil 1px en vez de sombra** (mejor visibilidad al sol)
6. **Modales y dropdowns del web admin: elevation 2** (más prominentes)
7. **Overlays sobre patrones: blur translúcido** (`backdrop-filter: blur(...)`)
8. **Formas decorativas a 60-80% opacidad** sobre fondos de color

### Lo que NUNCA

1. **NO mezclar 3+ estilos de border radius** en el mismo componente
2. **NO sombras fuertes en la app móvil** (se ven feas al sol)
3. **NO sombras negras genéricas** (`rgba(0,0,0,...)`) — usan tinte verde
4. **NO combinar sombra + borde en el mismo componente** (elige uno)
5. **NO usar border `0.5px`** (se ve borroso al sol)
6. **NO más de 2-3 formas decorativas** en la misma composición
7. **NO usar formas decorativas en pantallas de datos densos**
8. **NO usar `border-radius: 0`** en la app móvil (pierde calidez)

---

## 📦 Implementación por plataforma

### Web (React / Next.js con CSS modules)

```tsx
import styles from './Card.module.css';

export const Card = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

/* Card.module.css */
.card {
  background: var(--surface);
  border: var(--stroke-base) solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-md);
}
```

### Web (Tailwind CSS)

```html
<div class="bg-surface border border-cream-300 rounded-xl p-5 shadow-md">
  Contenido de la card
</div>
```

### Flutter

```dart
Container(
  decoration: BoxDecoration(
    color: Color(0xFFFFFFFF),
    border: Border.all(
      color: Color(0xFFEBE3CC),  // cream-300
      width: 2.0,  // stroke-base
    ),
    borderRadius: BorderRadius.circular(12),  // radius-lg
    boxShadow: [
      BoxShadow(
        color: Color(0x142A782A),  // verde con 8% opacity
        blurRadius: 12,
        offset: Offset(0, 4),
      ),
    ],
  ),
  padding: EdgeInsets.all(20),
  child: Text('Card content'),
)
```

### iOS SwiftUI

```swift
RoundedRectangle(cornerRadius: 12)  // --radius-lg
  .fill(Color.white)
  .overlay(
    RoundedRectangle(cornerRadius: 12)
      .stroke(Color(red: 0.92, green: 0.89, blue: 0.80), lineWidth: 2)  // cream-300, stroke-base
  )
  .shadow(color: Color(red: 0.16, green: 0.47, blue: 0.16).opacity(0.10),
          radius: 12, x: 0, y: 4)  // shadow-lg con tinte verde
  .frame(width: 280, height: 100)
```

---

## 📁 Estructura de archivos

```
7-formas-y-elementos/
├── README.md                    # Este archivo
└── comparativa-formas.html      # Vista previa interactiva
```

(Futuro: si se necesitan archivos SVG individuales, irían en `assets/`)

---

## ✅ Checklist de implementación

- [ ] Definir los tokens CSS en el sistema de diseño global (`globals.css` o equivalente)
- [ ] Definir los tokens en Flutter (`ThemeData` y `ColorScheme`)
- [ ] Definir los tokens en iOS SwiftUI (extensión de `Color` y `View`)
- [ ] Auditar todos los componentes existentes y reemplazar valores hardcodeados
- [ ] Validar las sombras en distintos fondos (sobre `cream-50`, `cream-100`, sobre patrones)
- [ ] Validar bajo sol directo que los bordes de 1px son visibles
- [ ] Validar el blur translúcido en Safari (puede tener quirks con `backdrop-filter`)
- [ ] Documentar en Storybook o equivalente

---

## 🔗 Referencias

### Sistemas de diseño consultados

- **Fluent 2 — Shapes:** https://fluent2.microsoft.design/shapes
- **Atlassian Design System — Radius:** https://atlassian.design/foundations/radius
- **Material Design 3 — Shape:** https://m3.material.io/styles/shape
- **Tchibo Design System — Radius:** https://design-system.tchibo.com/content/components/Radius/guidelines
- **Mateo Design System — Border radius:** https://github.com/Ventairy/mateo/blob/main/design-system/foundation/border-radius.md
- **Designsystemproblems — Border Radius Tokens:** https://designsystemproblems.com/token-management/border-radius-tokens/

### Marcos teóricos

- **Border radius como diferenciador de marca:** tokens que expresan la "personalidad geométrica"
- **Principio de "nested radii":** radio interno = radio externo - gap entre elementos
- **Sombras con tinte:** usar el color de marca (no negro) en las sombras para coherencia cromática
- **Frosted glass:** efecto de `backdrop-filter: blur(...)` para overlays modernos

### Proyecto

- Paleta: [`../2-paleta-de-colores/`](../2-paleta-de-colores/)
- Tipografía: [`../3-tipografia/`](../3-tipografia/)
- Iconografía: [`../4-iconografia/`](../4-iconografia/)
- Estilo fotográfico: [`../5-estilo-fotografico/`](../5-estilo-fotografico/)
- Patrones y texturas: [`../6-patrones-y-texturas/`](../6-patrones-y-texturas/)
- Vista previa interactiva: [`./comparativa-formas.html`](./comparativa-formas.html)
