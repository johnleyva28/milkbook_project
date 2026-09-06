# 🥛 Sistema de Diseño — Milkbook

> **Identidad visual oficial** de Milkbook: paleta de colores (light + dark mode) + tipografía. Todo derivado del logo (botella de leche + cabeza de vaca + wordmark "MilkBook") y validado con WCAG para usuarios rurales con baja alfabetización digital en Cajamarca.

**Fecha de aprobación:** 2026-09-05
**Aplica a:** App móvil (lechero + cliente), web admin, dark mode, boletas PDF, onboarding, marketing.
**Archivo de referencia visual:** [`paleta-de-colores.html`](./paleta-de-colores.html)

---

## 🎯 Reglas de oro

1. **El logo manda.** Verde pastel `#88D088` y azul pastel `#78C0F8` son colores de **marca**. Se usan para decorar, ilustrar y dar personalidad.
2. **Para texto y UI, oscurecer o aclarar.** Los mismos matices en versiones con luminosidad ajustada son los que cumplen WCAG.
3. **Nunca usar negro puro `#000000`** como texto. Usar `#1A1F1A` (negro suave) en light, `#FAF8F3` (crema) en dark.
4. **Nunca usar blanco puro `#FFFFFF`** como fondo de pantalla. Usar `cream-50` (`#FFFDF7`).
5. **Los cremas evocan la leche.** Son la base neutra cálida de toda la UI.
6. **Tres familias tipográficas, no una.** Cada una con un rol claro.

---

## 🥛 Escala CREMA — La base (evoca la leche)

Escala neutra cálida con tinte amarillo muy suave. **Capa fundamental de Milkbook.**

| Token | Light (hex) | Dark (hex) | Uso | WCAG vs texto |
|---|---|---|---|---|
| `cream-50` | `#FFFDF7` | `#1A1814` | **Fondo de pantalla** (leche descremada / noche cálida) | 16.4:1 / 16.7:1 AAA |
| `cream-100` | `#FAF8F3` | `#25211B` | Surface de cards, hover states | 15.7:1 / 15.0:1 AAA |
| `cream-200` | `#F5F0E1` | `#2F2A22` | Cards destacadas, secciones alternas | 14.6:1 / 13.5:1 AAA |
| `cream-300` | `#EBE3CC` | `#3A332A` | **Bordes por defecto** (cálido, no gris) | 13.0:1 / 11.5:1 AAA |
| `cream-400` | `#D9CCA8` | `#524838` | Bordes fuertes, inputs focused | 10.4:1 / 8.6:1 AAA |
| `cream-500` | `#B89766` | `#C1A57A` | Acento caramelo, onboarding, marketing | 6.1:1 / 7.5:1 AA/AAA |

> **Nota dark mode:** en oscuro no usamos "negro puro" para el fondo. Usamos `#1A1814` (negro con sesgo cálido R>B) para mantener coherencia con la identidad láctea. Si el fondo fuera negro puro se sentiría como cualquier app genérica.

---

## 🟢 Escala VERDE — Color primario (basado en la leche del logo)

| Token | Light | Dark | Uso | WCAG vs fondo |
|---|---|---|---|---|
| `green-700` | `#184318` | `#2A782A` | Texto sobre fondo verde, énfasis | 11.3:1 / 5.1:1 |
| `green-500` | `#2A782A` | `#52C652` | **PRIMARY**: "Confirmar", CTAs, éxito | 5.4:1 AA+ / 8.0:1 AAA |
| `green-300` | `#88D088` | `#88D088` | **Color del logo**, decorativo | 1.8:1 deco / 9.6:1 AAA |
| `green-100` | `#DCF1DC` | `#1F3A1F` | Fondos suaves "éxito", cards confirmadas | OK |

**Cuándo usar:**
- `green-500` es el color de **"Confirmar"** (la acción más importante del lechero).
- `green-100` es el fondo de cualquier card que represente algo **positivo o confirmado**.
- `green-300` decorativo en light, pero **en dark se vuelve texto perfectamente legible** (9.6:1).

---

## 🔵 Escala AZUL — Color secundario (basado en la vaca del logo)

| Token | Light | Dark | Uso | WCAG vs fondo |
|---|---|---|---|---|
| `blue-700` | `#003965` | `#0064B1` | Texto sobre fondo azul, énfasis | 11.8:1 / 6.0:1 |
| `blue-500` | `#0064B1` | `#199BFF` | **SECONDARY**: links, nav, "Sacar cuentas" | 5.9:1 AAA / 6.0:1 AA |
| `blue-300` | `#78C0F8` | `#78C0F8` | **Color del logo**, decorativo | 1.9:1 deco / 9.0:1 AAA |
| `blue-100` | `#D9ECFA` | `#1A2E40` | Fondos suaves "info", cards informativas | OK |

**Cuándo usar:**
- `blue-500` para acciones de **información** y navegación.
- `blue-100` para cards de información neutral.
- Mismo truco que el verde: en dark, los `-300` del logo pasan de decorativos a **texto perfectamente legible**.

---

## 🚦 Semánticos

| Token | Light | Dark | Uso | WCAG vs fondo |
|---|---|---|---|---|
| `warning` | `#B26A00` | `#FEB64C` | Discrepancias, alertas de precio | 4.2:1 AA / 10.1:1 AAA |
| `warning-bg` | `#FFF4E0` | `#3A2810` | Fondo de cards de alerta | OK |
| `error` | `#B3261E` | `#E15850` | Errores, eliminar, deuda | 6.4:1 AAA / 4.8:1 AA |
| `error-bg` | `#FCE8E6` | `#3A1815` | Fondo de cards de error | OK |
| `success` | `= green-500` | `= green-500 dark` | Alias: operación exitosa | mismo que green-500 |
| `info` | `= blue-500` | `= blue-500 dark` | Alias: información | mismo que blue-500 |

**Cuándo usar:**
- `warning` para discrepancias (precio variable, litros que difieren).
- `error` solo para errores reales o acciones destructivas.
- Alias semánticos en código, visual brand en componentes.

---

## ⬛ Neutros

| Token | Light | Dark | Uso | Contraste vs fondo |
|---|---|---|---|---|
| `text` | `#1A1F1A` | `#FAF8F3` | Texto principal | 15.1:1 / 16.7:1 AAA |
| `text-soft` | `#5C5C5C` | `#C7BFAE` | Texto secundario, labels | 6.3:1 AA / 9.7:1 AAA |
| `text-disabled` | `#9CA39C` | `#6E6655` | Texto deshabilitado | 3.1:1 AA-large |
| `border` | `#EBE3CC` (cream-300) | `#3A332A` | Bordes por defecto | — |
| `border-strong` | `#D9CCA8` (cream-400) | `#524838` | Bordes destacados | — |
| `surface` | `#FFFFFF` | `#25211B` | Cards elevadas sobre el fondo | — |
| `bg` | `#FFFDF7` (cream-50) | `#1A1814` | Alias: fondo de pantalla | — |

---

## 🌑 Dark Mode — Reglas

El dark mode de Milkbook **no es un espejo del light**. Se deriva manteniendo:

1. **Mismo matiz (H) en HSL**, se ajusta solo la luminosidad.
2. **Tinte cálido en los fondos** (`#1A1814` con R>B) en lugar de negro puro.
3. **Los brand colors se ACLARAN** para mantener contraste (en light se oscurecen).
4. **Los pasteles del logo (300) pasan de decorativos a usables como texto** (9.6:1 y 9.0:1).
5. **Los `-100` (fondos suaves) se oscurecen** para crear cards de "éxito" o "info" en dark.
6. **Los semánticos `warning` y `error` se aclaran** para destacar sobre fondo oscuro.

| Cuándo | Light usa | Dark usa |
|---|---|---|
| Botón "Confirmar" | `green-500` `#2A782A` | `green-500` `#52C652` |
| Card de éxito | fondo `green-100` claro, texto `green-700` oscuro | fondo `green-100` oscuro, texto `green-300` claro |
| Card de info | fondo `blue-100` claro, texto `blue-700` oscuro | fondo `blue-100` oscuro, texto `blue-300` claro |
| Alerta (discrepancia) | fondo `warning-bg` claro, texto `warning` oscuro | fondo `warning-bg` oscuro, texto `warning` claro |
| Texto principal | `#1A1F1A` | `#FAF8F3` |

**Implementación:** el switch entre temas se hace con `data-theme="light|dark"` en el `<html>`. Los tokens se redefinen en el bloque `[data-theme="dark"]`. Persistir con `localStorage`.

---

## ✍️ Sistema Tipográfico — Tres familias, tres roles

**Principio:** una sola fuente no puede ser buena en todo. Milkbook usa tres familias, cada una especializada en un rol. Todas son **gratuitas, open source (OFL)** y disponibles en Google Fonts.

### 📊 DATA — Atkinson Hyperlegible

- **Para qué:** números, montos, litros, nombres de clientes, datos.
- **Por qué:** diseñada por el Braille Institute en 2019 específicamente para **baja visión y baja alfabetización**. Cada glifo es único — la "I", la "l", el "1" y la "|" son visualmente distintos. Más de 150 idiomas en la versión Next (2025).
- **Peso recomendado:** Regular 400 para datos en línea, Bold 700 para cifras destacadas (monto total, litros del día).
- **Tamaño mínimo:** 18sp en datos críticos (litros, monto). Por restricción del proyecto: nunca menos de 16sp.
- **Licencia:** SIL OFL (uso comercial libre, redistribución libre).
- **Disponible en:** Google Fonts (`Atkinson Hyperlegible`, `Atkinson Hyperlegible Next`).
- **Usada por:** Munich U-Bahn (señalización), Tilt Beauty, miles de sitios de salud pública.

### 🖥️ UI — Inter

- **Para qué:** títulos, botones, labels, navegación, textos secundarios, inputs.
- **Por qué:** estándar moderno de UI. x-height alta (texto se ve más grande al mismo tamaño en px), máxima legibilidad, distingue bien caracteres similares, variable font (un archivo = muchos pesos). Mantiene espaciado consistente cross-OS.
- **Pesos recomendados:** Regular 400 (texto UI), Medium 500 (botones, énfasis), Semibold 600 (títulos de cards), Bold 700 (títulos de pantalla).
- **Tamaños típicos:** 14sp labels · 16sp cuerpo · 20sp títulos · 28sp+ hero.
- **Licencia:** SIL OFL.
- **Disponible en:** Google Fonts (`Inter`).
- **Usada por:** GitHub, Figma, Linear, Notion, Vercel.

### 📜 DISPLAY — Fraunces

- **Para qué:** solo el wordmark del logo, splash screen, onboarding, marketing, papelería.
- **Por qué:** serif humanista con personalidad. Aporta calidez y diferenciación sin sacrificar legibilidad (a diferencia de las serifas clásicas). Suave, "wobbly" en tamaños grandes, perfecto para branding.
- **Pesos recomendados:** Medium 500 para wordmark, Bold 700 solo para hero marketing.
- **Regla:** **nunca usar para UI diaria, datos, ni botones**. Solo branding.
- **Licencia:** SIL OFL.
- **Disponible en:** Google Fonts (`Fraunces`).

---

## 📐 Reglas de uso tipográfico

| Contexto | Familia | Peso | Tamaño (app) | Tamaño (web) | Line height |
|---|---|---|---|---|---|
| Litros del día, monto total | Atkinson Hyperlegible | Bold 700 | 24-32sp | 28-40px | 1.2 |
| Nombre de cliente, datos | Atkinson Hyperlegible | Regular 400 | 18sp | 18-20px | 1.3 |
| Título de pantalla | Inter | Bold 700 | 24sp | 24-32px | 1.2 |
| Subtítulo / card title | Inter | Semibold 600 | 20sp | 20-24px | 1.3 |
| Texto de cuerpo | Inter | Regular 400 | 16sp | 16-18px | 1.5 |
| Texto secundario / label | Inter | Medium 500 | 14sp | 14-15px | 1.4 |
| Texto de botón | Inter | Semibold 600 | 16sp | 16px | 1.0 |
| Wordmark "Milkbook" | Fraunces | Medium 500 | proporcional al logo | proporcional al logo | 1.0 |

**Reglas duras:**
- **Nunca menos de 16sp en la app** (restricción del proyecto, baja alfabetización).
- **Siempre `sp` (Android) o `pt` (iOS), nunca `dp`/`px`** para texto — respetar el ajuste de tamaño del usuario.
- **Botones en mayúsculas + Inter Semibold** = legibilidad rápida al sol.
- **Datos numéricos SIEMPRE en Atkinson** — la diferencia entre `0` y `O` puede significar S/ 0.65 vs S/ 0.65 (en este caso es igual, pero en otros es crítico).

---

## 📋 Resumen: cuándo usar cada color

| Situación | Color | Token |
|---|---|---|
| Botón "Confirmar litros" | Verde | `--green-500` |
| Botón "Reportar discrepancia" | Ámbar | `--warning` |
| Botón "Eliminar" / error grave | Rojo | `--error` |
| Link "Sacar cuentas" | Azul | `--blue-500` |
| Fondo de toda la pantalla | Crema / negro cálido | `--bg` (= cream-50 / #1A1814) |
| Card elevada (sobre el fondo) | Blanco / surface oscuro | `--surface` |
| Card cálida (éxito) | Verde muy suave | `--green-100` |
| Card informativa | Azul muy suave | `--blue-100` |
| Card de alerta | Ámbar muy suave | `--warning-bg` |
| Texto principal | Negro suave / crema | `--text` |
| Texto secundario | Gris medio | `--text-soft` |
| Borde de inputs, cards | Crema medio | `--border` (= cream-300) |
| Avatar con inicial del cliente | Azul pastel (= logo) | `--blue-300` |
| Logo, ilustraciones, splash | Verde pastel + azul pastel | `--green-300` + `--blue-300` |
| Acento decorativo cálido (onboarding) | Caramelo | `--cream-500` |

---

## 🎨 Design Tokens — Bloque listo para copiar

```css
:root, [data-theme="light"] {
  /* === CREMAS === */
  --cream-50:  #FFFDF7;
  --cream-100: #FAF8F3;
  --cream-200: #F5F0E1;
  --cream-300: #EBE3CC;
  --cream-400: #D9CCA8;
  --cream-500: #B89766;

  /* === VERDE === */
  --green-700: #184318;
  --green-500: #2A782A;
  --green-300: #88D088;  /* color del logo */
  --green-100: #DCF1DC;

  /* === AZUL === */
  --blue-700:  #003965;
  --blue-500:  #0064B1;
  --blue-300:  #78C0F8;  /* color del logo */
  --blue-100:  #D9ECFA;

  /* === SEMÁNTICOS === */
  --warning:     #B26A00;
  --warning-bg:  #FFF4E0;
  --error:       #B3261E;
  --error-bg:    #FCE8E6;
  --success:     var(--green-500);
  --info:        var(--blue-500);

  /* === NEUTROS === */
  --text:           #1A1F1A;
  --text-soft:      #5C5C5C;
  --text-disabled:  #9CA39C;
  --border:         var(--cream-300);
  --border-strong:  var(--cream-400);
  --surface:        #FFFFFF;
  --bg:             var(--cream-50);

  /* === TIPOGRAFÍA === */
  --font-data:    "Atkinson Hyperlegible", "Atkinson Hyperlegible Next", system-ui, sans-serif;
  --font-ui:      "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-display: "Fraunces", Georgia, serif;
}

[data-theme="dark"] {
  --bg:             #1A1814;
  --surface:        #25211B;
  --surface-2:      #2F2A22;
  --border:         #3A332A;
  --border-strong:  #524838;
  --text:           #FAF8F3;
  --text-soft:      #C7BFAE;
  --text-disabled:  #6E6655;

  --green-700: #2A782A;
  --green-500: #52C652;
  --green-300: #88D088;
  --green-100: #1F3A1F;

  --blue-700:  #0064B1;
  --blue-500:  #199BFF;
  --blue-300:  #78C0F8;
  --blue-100:  #1A2E40;

  --warning:     #FEB64C;
  --warning-bg:  #3A2810;
  --error:       #E15850;
  --error-bg:    #3A1815;
  --cream-500:   #C1A57A;

  --success:     var(--green-500);
  --info:        var(--blue-500);
}
```

---

## 📦 Instalación de fuentes

**Web (CSS con Google Fonts):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Inter:wght@400;500;600;700&family=Fraunces:wght@500;700&display=swap" rel="stylesheet">
```

**Flutter (pubspec.yaml):**
```yaml
dependencies:
  google_fonts: ^6.1.0
```
```dart
import 'package:google_fonts/google_fonts.dart';

Text(
  '18.5 L',
  style: GoogleFonts.atkinsonHyperlegible(
    fontSize: 24, fontWeight: FontWeight.w700,
  ),
)
```

**iOS (Swift):** descargar `.otf` de Google Fonts y agregar a Info.plist `UIAppFonts`, o usar `SwiftUI` con `Font.custom`.

**Android:** descargar `.ttf`, copiar a `app/src/main/res/font/`, definir en XML font family.

**Offline-first:** como la app debe funcionar sin internet en caseríos, **embeber las fuentes en el binario** (TTF/OTF en assets) en vez de cargarlas de Google Fonts en runtime. Para web admin sí se pueden servir de Google Fonts con `font-display: swap`.

---

## ✅ Checklist de implementación

- [ ] Reemplazar TODO `#FFFFFF` de fondo de pantalla por `--cream-50` (light) / `#1A1814` (dark)
- [ ] Reemplazar TODO `#000000` de texto por `--text` (`#1A1F1A` / `#FAF8F3`)
- [ ] Reemplazar bordes grises por `--border` (crema, no gris)
- [ ] Verificar que ningún texto use los pasteles del logo (`#88D088`, `#78C0F8`) en light — en dark sí son usables
- [ ] Implementar dark mode con `data-theme` + `localStorage` para persistir preferencia
- [ ] Embebir Atkinson Hyperlegible, Inter y Fraunces en la app (offline-first)
- [ ] Usar `Atkinson Hyperlegible` para TODO dato numérico (litros, montos, dni, etc.)
- [ ] Usar `Inter` para TODO texto de UI (títulos, labels, botones, inputs)
- [ ] Usar `Fraunces` SOLO en el wordmark del logo, splash y onboarding
- [ ] Validar bajo sol directo con usuarios reales (Carlos, Juan) en Cajamarca
- [ ] Validar con simulador de daltonismo (Coblis o Stark) — verificar verde vs rojo, verde vs marrón
- [ ] Documentar en Storybook o similar para mantener consistencia

---

## 🔗 Referencias

### Paleta
- Logo original: [`../1-logo/milkbook_logo_v1.png`](../1-logo/milkbook_logo_v1.png)
- Vista previa interactiva: [`./paleta-de-colores.html`](./paleta-de-colores.html)
- WCAG 2.1 contraste: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

### Tipografía
- Atkinson Hyperlegible: https://www.brailleinstitute.org/freefont/ · https://fonts.google.com/specimen/Atkinson+Hyperlegible
- Inter: https://rsms.me/inter/ · https://fonts.google.com/specimen/Inter
- Fraunces: https://fonts.google.com/specimen/Fraunces
- Modern Font Stacks (alternativa system): https://github.com/system-fonts/modern-font-stacks
- Material Design 3 tipografía: https://m1.material.io/style/typography.html
- Actionable UI Design Guidelines for Low-Literate Users (Srivastava et al., CSCW 2021): https://www.shivanikapania.com/assets/cscw2021paper.pdf
