# ✍️ Sistema Tipográfico — Milkbook

> **Identidad tipográfica oficial** de Milkbook: 4 familias gratuitas (OFL), 4 roles especializados, validadas con WCAG y adaptadas a usuarios rurales con baja alfabetización en Cajamarca.

**Fecha de aprobación:** 2026-09-05
**Aplica a:** App móvil (lechero + cliente), web admin, dark mode, reportes, boletas PDF, marketing.
**Archivo de referencia visual:** [`comparativa-tipografia.html`](./comparativa-tipografia.html)

---

## ✅ Las 4 fuentes son 100% gratuitas

Todas las fuentes de Milkbook están bajo la licencia **SIL Open Font License (OFL)**, que permite:

- ✅ Uso comercial (sin pagar)
- ✅ Redistribución (incluir en la app, en el sitio web, en PDFs)
- ✅ Modificación (crear variantes si lo necesitas)
- ✅ Sin atribución obligatoria
- ❌ Lo único que **no** se permite: vender la fuente por sí sola como producto

Cada archivo descargado incluye un `LICENSE.txt` o `OFL.txt` adjunto que confirma la licencia.

### Tabla de disponibilidad multiplataforma

| Fuente | Licencia | Costo | Google Fonts | TTF/OTF | Variable font | React (`next/font`) | Flutter (`pubspec.yaml`) | Swift (`Info.plist`) |
|---|---|---|---|---|---|---|---|---|
| **Atkinson Hyperlegible Next** | OFL | ✅ Gratis | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Inter** | OFL | ✅ Gratis | ✅* | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Lexend** | OFL | ✅ Gratis | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Fraunces** | OFL | ✅ Gratis | ✅ | ✅ | ✅ (4 ejes) | ✅ | ✅ | ✅ |

\* **Nota sobre Inter en Google Fonts:** el autor Rasmus Andersson recomienda bajar Inter directamente de [rsms.me/inter](https://rsms.me/inter/) porque la versión de Google Fonts está un poco desactualizada (sin itálicas, sin variable font). En Milkbook no usamos itálicas, así que la de Google Fonts funciona perfectamente, pero si quieres la última versión, baja de rsms.me.

---

## 🎯 Principio fundamental

**Una sola fuente no puede ser la mejor en todo.** Milkbook usa **4 familias** con **4 roles especializados** que se complementan sin solaparse:

| Familia | Rol | Por qué |
|---|---|---|
| **Atkinson Hyperlegible Next** | Datos (litros, montos, DNI) | Distingue I/l/1/\| y 0/O sin confundirlos. Crítico cuando lees plata. |
| **Inter** | UI general (títulos, botones, labels) | x-height alta, máximo control en UI densa, variable font. |
| **Lexend** | Lectura larga (reportes, liquidaciones, web admin) | Diseñada para aumentar velocidad de lectura con hiper-espaciado. |
| **Fraunces** | Display (wordmark, splash, marketing) | Serif humanista con personalidad. Solo branding, nunca UI diaria. |

**Regla inviolable:** datos numéricos SIEMPRE en Atkinson Hyperlegible. Texto largo en web admin SIEMPRE en Lexend. Wordmark SIEMPRE en Fraunces.

---

## 📊 DATA — Atkinson Hyperlegible Next

**Diseñadora:** Braille Institute + Applied Design Works
**Año:** 2019 (original) / 2025 (Next)
**Licencia:** SIL Open Font License (OFL) — uso comercial libre
**Pesos a cargar:** Regular 400, Medium 500, SemiBold 600, Bold 700
**Disponible en:**
- Google Fonts: https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next
- GitHub: https://github.com/googlefonts/atkinson-hyperlegible-next
- Descarga directa (TTF/OTF): https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next (botón "Download family")
- Braille Institute: https://www.brailleinstitute.org/freefont/
- Fontsource (NPM self-host): https://fontsource.org/fonts/atkinson-hyperlegible-next

### Por qué es la #1 para Milkbook

- Diseñada específicamente para **baja visión y baja alfabetización**. Cada glifo es único — la "I", la "l", el "1" y la "|" son visualmente distintos. La "0" y la "O" se diferencian por forma, no solo por contexto.
- La versión **Next (2025)** soporta **150+ idiomas** y viene como **variable font** (7 pesos en un solo archivo).
- Casos de uso reales: señalización del Munich U-Bahn, marca Tilt Beauty, miles de sitios de salud pública.
- En Milkbook: leer mal `S/ 0.65` vs `S/ 6.05` significa plata que se pierde. Solo Atkinson Hyperlegible resuelve esto visualmente.

### Dónde usarla

| Contexto | Peso | Tamaño app (sp) | Tamaño web (px) | Line height |
|---|---|---|---|---|
| Litros del día (destacado) | Bold 700 | 24-32 | 28-40 | 1.2 |
| Monto total / balance | Bold 700 | 28-36 | 32-44 | 1.1 |
| Nombre de cliente | Regular 400 | 18 | 18-20 | 1.3 |
| DNI, código, identificador | Medium 500 | 18 | 18-20 | 1.3 |
| Contador, unidad ("18.5 L") | Regular 400 | 16-18 | 16-18 | 1.3 |

**Regla dura:** todo lo que sea un número que el usuario va a leer y confirmar para que tenga consecuencias económicas → Atkinson.

---

## 🖥️ UI — Inter

**Diseñador:** Rasmus Andersson
**Año:** 2017 (v1) / 2023 (v4 con variable font)
**Licencia:** SIL OFL
**Pesos a cargar:** Regular 400, Medium 500, SemiBold 600, Bold 700
**Disponible en:**
- Google Fonts: https://fonts.google.com/specimen/Inter ⚠️ (versión desactualizada)
- Sitio oficial (recomendado): https://rsms.me/inter/
- GitHub: https://github.com/rsms/inter
- Fontsource (NPM self-host): https://fontsource.org/fonts/inter

### ⚠️ Importante sobre dónde bajar Inter

Google Fonts tiene una versión de Inter sin itálicas y sin la variable font. El autor recomienda **bajar de rsms.me/inter**:
1. El ZIP incluye `Inter.ttc` (estática) y `InterVariable.ttf` (variable)
2. Incluye WOFF2 listos para web
3. Está más actualizada que la de Google Fonts

**Para Milkbook:** como no usamos itálicas, **la versión de Google Fonts es suficiente** para usar con `next/font/google`. Si quieres la última versión con variable font, usa `next/font/local` con los archivos de rsms.me.

### Por qué es el estándar de UI

- **x-height alta:** el texto se ve más grande al mismo tamaño en píxeles. Aprovecha mejor el espacio en pantallas chicas.
- **Diseñada específicamente para screens:** caracteres distintos entre sí (la "1" y la "l" son similares pero distinguibles).
- **Variable font nativa:** un archivo, 9 pesos, dos ejes (`wght` y `slnt` para italic).
- **Adoptada por GitHub, Figma, Linear, Notion, Vercel** — es el estándar de facto de la UI moderna.

### Dónde usarla

| Contexto | Peso | Tamaño app (sp) | Tamaño web (px) | Line height |
|---|---|---|---|---|
| Título de pantalla | Bold 700 | 24 | 24-32 | 1.2 |
| Subtítulo / card title | SemiBold 600 | 20 | 20-24 | 1.3 |
| Texto de cuerpo (UI app) | Regular 400 | 16 | 16-18 | 1.5 |
| Label / caption | Medium 500 | 14 | 14-15 | 1.4 |
| Texto de botón | SemiBold 600 | 16 | 16 | 1.0 |
| Texto de input | Regular 400 | 16 | 16 | 1.4 |
| Nav / tab label | Medium 500 | 12-14 | 13-14 | 1.2 |

**Regla:** Inter es la fuente por defecto en TODO widget que no sea dato numérico, lectura larga o wordmark. Si dudas, usa Inter.

---

## 📖 READING — Lexend

**Diseñadora:** Dr. Bonnie Shaver-Troup, EdD (Google Fonts + Thomas Jockin)
**Año:** 2019
**Licencia:** SIL OFL
**Pesos a cargar:** Light 300, Regular 400, Medium 500
**Disponible en:**
- Google Fonts: https://fonts.google.com/specimen/Lexend
- Sitio oficial: https://www.lexend.com/
- GitHub: https://github.com/googlefonts/lexend
- Fontsource (NPM self-host): https://fontsource.org/fonts/lexend

### Por qué se añade al sistema

- **Diseñada para aumentar la velocidad de lectura** (estudios del Dr. Shaver-Troup): hiper-espaciado entre letras que reduce "crowding" (letras demasiado juntas) y "masking" (letras que desaparecen visualmente).
- No es solo para disléxicos — **ayuda a todos** cuando leen mucho tiempo en pantalla (web admin, reportes, liquidaciones).
- **9 pesos** (Thin a Black), variable font. Casos de uso: CosmosDirekt (seguros), Helperbird, accesibilidad en educación.
- En Milkbook: el administrador (lechero con módulo admin, o el gestor B2B) pasa **minutos** leyendo tablas de liquidaciones. Lexend reduce la fatiga visual y mejora la retención.

### Dónde usarla

| Contexto | Peso | Tamaño web (px) | Line height |
|---|---|---|---|
| Texto largo (párrafos, descripciones) | Regular 400 | 16-18 | 1.7 |
| Reporte / liquidación (cuerpo) | Medium 500 | 15-17 | 1.6 |
| Email transaccional | Regular 400 | 16 | 1.6 |
| Documentación / ayuda | Regular 400 | 16 | 1.7 |
| Tabla densa (texto de celdas) | Regular 400 | 14-15 | 1.5 |

**Regla:** Lexend SOLO en el **web admin**, **reportes**, **emails** y **documentación**. **NUNCA en la app móvil** (Inter es suficiente para la UI de la app y reduce el tamaño del binario). Si el web admin se hace en Flutter Web, sí se incluye.

---

## 📜 DISPLAY — Fraunces

**Diseñadores:** Phaedra Charles, Flavia Zimbardi (Undercase Type)
**Año:** 2022
**Licencia:** SIL OFL
**Pesos a cargar:** Medium 500, Bold 700
**Disponible en:**
- Google Fonts: https://fonts.google.com/specimen/Fraunces
- Sitio oficial: https://undercase.xyz/fonts/fraunces
- GitHub: https://github.com/undercasetype/Fraunces
- Fontsource (NPM self-host): https://fontsource.org/fonts/fraunces

### Por qué se usa solo para el wordmark

- **Serif humanista** con personalidad — formas suaves, "wobbly" en tamaños grandes, que humanizan la marca.
- A diferencia de las serifas clásicas (Garamond, Times), está **optimizada para screens** y se ve moderna sin sacrificar legibilidad.
- **Variable font con 4 ejes:** `wght` (peso), `opsz` (tamaño óptico), `SOFT` (suavidad), `WONK` (carácter). En Milkbook usamos solo `wght` y `opsz`.
- En Milkbook: la palabra **Milkbook** se ve más cálida y diferencial en Fraunces que en cualquier sans. Es la firma de marca.

### Dónde usarla

| Contexto | Peso | Tamaño |
|---|---|---|
| Wordmark "Milkbook" (logo) | Medium 500 | proporcional al logo |
| Splash screen | Medium 500 | según viewport |
| Onboarding (hero) | Medium 500 | 32-48px web |
| Marketing / landing | Bold 700 | 48-72px web |
| Boletas PDF (header) | Medium 500 | 24-32pt |

**Regla:** **nunca usar para UI diaria, datos ni lectura.** Reservar para branding. Si dudas, no la uses.

---

## 📐 Reglas de tamaño y peso

### App móvil (Flutter / Swift)

| Elemento | Familia | Peso | Tamaño (sp) | Line height |
|---|---|---|---|---|
| Dato destacado (litros, monto) | Atkinson | Bold 700 | 28-32 | 1.2 |
| Dato secundario | Atkinson | Regular 400 | 18-20 | 1.3 |
| Nombre de cliente | Atkinson | Regular 400 | 18 | 1.3 |
| Título de pantalla | Inter | Bold 700 | 24 | 1.2 |
| Subtítulo / sección | Inter | SemiBold 600 | 20 | 1.3 |
| Texto de cuerpo | Inter | Regular 400 | 16 | 1.5 |
| Label / caption | Inter | Medium 500 | 14 | 1.4 |
| Texto de botón | Inter | SemiBold 600 | 16-18 | 1.0 (sin leading extra) |
| Input field | Inter | Regular 400 | 16 | 1.4 |
| Tab label | Inter | Medium 500 | 12-14 | 1.2 |
| Wordmark "Milkbook" | Fraunces | Medium 500 | según logo | 1.0 |

**Regla dura:** nunca menos de 16sp en texto de cuerpo (restricción de baja alfabetización del proyecto).

### Web (React / Next.js / Flutter Web)

| Elemento | Familia | Peso | Tamaño (px) | Line height |
|---|---|---|---|---|
| Dato destacado | Atkinson | Bold 700 | 32-44 | 1.1 |
| Dato secundario | Atkinson | Regular 400 | 18-20 | 1.3 |
| Título de página (h1) | Inter | Bold 700 | 32-40 | 1.2 |
| Título de sección (h2) | Inter | Bold 700 | 24-28 | 1.25 |
| Subtítulo (h3) | Inter | SemiBold 600 | 20-22 | 1.3 |
| Texto de cuerpo (UI) | Inter | Regular 400 | 16-18 | 1.5 |
| Texto largo (reportes) | Lexend | Regular 400 | 16-18 | 1.7 |
| Label / caption | Inter | Medium 500 | 14-15 | 1.4 |
| Texto de botón | Inter | SemiBold 600 | 16 | 1.0 |
| Input field | Inter | Regular 400 | 16 | 1.4 |
| Tabla densa (celdas) | Inter | Regular 400 | 14 | 1.5 |
| Wordmark "Milkbook" | Fraunces | Medium 500 | según logo | 1.0 |

---

## 📦 Instalación

### Web (React / Next.js con `next/font/google` — la más simple)

```tsx
// app/layout.tsx
import {
  Atkinson_Hyperlegible_Next,
  Inter,
  Lexend,
  Fraunces,
} from 'next/font/google';

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-data',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-reading',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${atkinson.variable} ${inter.variable} ${lexend.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

```css
/* styles/tokens.css */
:root {
  --font-data:    'Atkinson Hyperlegible Next', 'Atkinson Hyperlegible', system-ui, sans-serif;
  --font-ui:      'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-reading: 'Lexend', system-ui, sans-serif;
  --font-display: 'Fraunces', Georgia, serif;
}

[data-role="numeric"] { font-family: var(--font-data); font-variant-numeric: tabular-nums; }
[data-role="reading"] { font-family: var(--font-reading); }
[data-role="brand"]   { font-family: var(--font-display); }
```

### Web (alternativa: `next/font/local` con archivos TTF)

Si prefieres self-host total (recomendado para producción seria):

1. Bajar los TTF/OTF de cada fuente
2. Guardar en `public/fonts/`
3. Configurar así:

```tsx
// app/layout.tsx
import localFont from 'next/font/local';

const atkinson = localFont({
  src: [
    { path: '../public/fonts/AtkinsonHyperlegibleNext-Regular.ttf', weight: '400' },
    { path: '../public/fonts/AtkinsonHyperlegibleNext-Medium.ttf',  weight: '500' },
    { path: '../public/fonts/AtkinsonHyperlegibleNext-SemiBold.ttf', weight: '600' },
    { path: '../public/fonts/AtkinsonHyperlegibleNext-Bold.ttf',    weight: '700' },
  ],
  variable: '--font-data',
  display: 'swap',
});

// (repetir para inter, lexend, fraunces)
```

### App móvil (Flutter — pubspec.yaml)

```yaml
# pubspec.yaml — embebidas en el binario (offline-first)
flutter:
  uses-material-design: true
  fonts:
    # Atkinson Hyperlegible Next — datos
    - family: Atkinson
      fonts:
        - { asset: assets/fonts/AtkinsonHyperlegibleNext-Regular.ttf,  weight: 400 }
        - { asset: assets/fonts/AtkinsonHyperlegibleNext-Medium.ttf,   weight: 500 }
        - { asset: assets/fonts/AtkinsonHyperlegibleNext-SemiBold.ttf, weight: 600 }
        - { asset: assets/fonts/AtkinsonHyperlegibleNext-Bold.ttf,     weight: 700 }
    # Inter — UI
    - family: Inter
      fonts:
        - { asset: assets/fonts/Inter-Regular.ttf,  weight: 400 }
        - { asset: assets/fonts/Inter-Medium.ttf,   weight: 500 }
        - { asset: assets/fonts/Inter-SemiBold.ttf, weight: 600 }
        - { asset: assets/fonts/Inter-Bold.ttf,     weight: 700 }
    # Lexend — solo si el web admin también es Flutter Web
    - family: Lexend
      fonts:
        - { asset: assets/fonts/Lexend-Light.ttf,   weight: 300 }
        - { asset: assets/fonts/Lexend-Regular.ttf, weight: 400 }
        - { asset: assets/fonts/Lexend-Medium.ttf,  weight: 500 }
    # Fraunces — wordmark
    - family: Fraunces
      fonts:
        - { asset: assets/fonts/Fraunces-Medium.ttf, weight: 500 }
        - { asset: assets/fonts/Fraunces-Bold.ttf,   weight: 700 }
```

**Cómo obtener los TTF para Flutter:**

```bash
# Opción 1: descargar de Google Fonts manualmente
# 1. Ve a https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next
# 2. Click en "Download family" (esquina superior derecha)
# 3. Descomprime el ZIP
# 4. Mueve los .ttf a tu proyecto Flutter: assets/fonts/

# Opción 2: usar el package google_fonts (descarga on-demand)
# ⚠️ No recomendado para offline-first — la app debe funcionar sin internet
```

```dart
// lib/theme.dart
import 'package:flutter/material.dart';

class MilkbookTheme {
  static const String fontData    = 'Atkinson';
  static const String fontUI      = 'Inter';
  static const String fontReading = 'Lexend';
  static const String fontDisplay = 'Fraunces';

  static ThemeData light() => ThemeData(
    useMaterial3: true,
    fontFamily: fontUI,
    textTheme: TextTheme(
      displayLarge:   TextStyle(fontFamily: fontUI, fontSize: 32, fontWeight: FontWeight.w700, height: 1.2),
      headlineMedium: TextStyle(fontFamily: fontUI, fontSize: 24, fontWeight: FontWeight.w700, height: 1.2),
      titleLarge:     TextStyle(fontFamily: fontUI, fontSize: 20, fontWeight: FontWeight.w600, height: 1.3),
      titleMedium:    TextStyle(fontFamily: fontUI, fontSize: 18, fontWeight: FontWeight.w500, height: 1.3),
      bodyLarge:      TextStyle(fontFamily: fontUI, fontSize: 16, fontWeight: FontWeight.w400, height: 1.5),
      bodyMedium:     TextStyle(fontFamily: fontUI, fontSize: 14, fontWeight: FontWeight.w500, height: 1.4),
      labelLarge:     TextStyle(fontFamily: fontUI, fontSize: 16, fontWeight: FontWeight.w600, height: 1.0),
    ),
  );
}

// Extensión: usar Atkinson en datos
extension DataText on TextStyle {
  TextStyle data({double? size, FontWeight? weight, Color? color}) => copyWith(
    fontFamily: MilkbookTheme.fontData,
    fontSize: size ?? fontSize,
    fontWeight: weight ?? fontWeight,
    color: color,
    height: 1.2,
    leadingDistribution: TextLeadingDistribution.even,
  );
}

// Extensión: usar Lexend en lectura larga
extension ReadingText on TextStyle {
  TextStyle reading({double? size, FontWeight? weight}) => copyWith(
    fontFamily: MilkbookTheme.fontReading,
    fontSize: size ?? fontSize,
    fontWeight: weight ?? FontWeight.w400,
    height: 1.7,
  );
}
```

### iOS (SwiftUI)

```xml
<!-- Info.plist -->
<key>UIAppFonts</key>
<array>
    <string>AtkinsonHyperlegibleNext-Regular.ttf</string>
    <string>AtkinsonHyperlegibleNext-Medium.ttf</string>
    <string>AtkinsonHyperlegibleNext-SemiBold.ttf</string>
    <string>AtkinsonHyperlegibleNext-Bold.ttf</string>
    <string>Inter-Regular.ttf</string>
    <string>Inter-Medium.ttf</string>
    <string>Inter-SemiBold.ttf</string>
    <string>Inter-Bold.ttf</string>
    <string>Lexend-Light.ttf</string>
    <string>Lexend-Regular.ttf</string>
    <string>Lexend-Medium.ttf</string>
    <string>Fraunces-Medium.ttf</string>
    <string>Fraunces-Bold.ttf</string>
</array>
```

**Cómo obtener los TTF para iOS:**

```bash
# 1. Descarga de Google Fonts:
#    https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next
#    https://fonts.google.com/specimen/Inter
#    https://fonts.google.com/specimen/Lexend
#    https://fonts.google.com/specimen/Fraunces
# 2. Click "Download family" en cada una
# 3. Descomprime y mueve los .ttf a tu proyecto Xcode:
#    Drag & drop a la carpeta del proyecto
#    Marca "Add to target" en el target de la app
# 4. Xcode agrega los .ttf al bundle automáticamente
# 5. Agrega UIAppFonts a Info.plist (arriba)
```

```swift
// FontManager.swift
import SwiftUI

enum MilkbookFont: String {
    case dataRegular    = "AtkinsonHyperlegibleNext-Regular"
    case dataBold       = "AtkinsonHyperlegibleNext-Bold"
    case uiRegular      = "Inter-Regular"
    case uiMedium       = "Inter-Medium"
    case uiSemibold     = "Inter-SemiBold"
    case uiBold         = "Inter-Bold"
    case readingLight   = "Lexend-Light"
    case readingRegular = "Lexend-Regular"
    case readingMedium  = "Lexend-Medium"
    case displayMedium  = "Fraunces-Medium"
}

extension Font {
    /// Dato numérico (litros, montos)
    static func milkbookData(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name = (weight == .bold) ? MilkbookFont.dataBold.rawValue : MilkbookFont.dataRegular.rawValue
        return Font.custom(name, size: size, relativeTo: .title)
    }

    /// UI general
    static func milkbookUI(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name: String
        switch weight {
        case .bold:     name = MilkbookFont.uiBold.rawValue
        case .semibold: name = MilkbookFont.uiSemibold.rawValue
        case .medium:   name = MilkbookFont.uiMedium.rawValue
        default:        name = MilkbookFont.uiRegular.rawValue
        }
        return Font.custom(name, size: size, relativeTo: .body)
    }

    /// Lectura larga (reportes, liquidaciones)
    static func milkbookReading(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name: String
        switch weight {
        case .light:   name = MilkbookFont.readingLight.rawValue
        case .medium:  name = MilkbookFont.readingMedium.rawValue
        default:       name = MilkbookFont.readingRegular.rawValue
        }
        return Font.custom(name, size: size, relativeTo: .body)
    }

    /// Wordmark
    static var milkbookWordmark: Font {
        Font.custom(MilkbookFont.displayMedium.rawValue, size: 32, relativeTo: .largeTitle)
    }
}
```

---

## ⚠️ Reglas duras y pitfalls

1. **Nunca menos de 16sp en texto de cuerpo de la app** — restricción de baja alfabetización.
2. **Siempre `sp` (Android) o `pt` (iOS) para texto, nunca `dp`/`px`** — respetar el ajuste de tamaño del sistema.
3. **Datos numéricos SIEMPRE en Atkinson** — sin excepciones, ni en web admin.
4. **Wordmark SIEMPRE en Fraunces** — nunca en Inter ni en system font.
5. **Lexend SOLO en web admin / reportes** — no incluirla en la app móvil nativa para reducir el binario.
6. **Botones en MAYÚSCULAS + Inter Semibold + `letter-spacing: 1.2`** — legibilidad rápida al sol.
7. **Flutter: declarar TODOS los pesos en `pubspec.yaml`.** Si falta un peso, Flutter hace fallback al system font silenciosamente y rompe la jerarquía visual.
8. **SwiftUI: el nombre que se pasa a `Font.custom()` es el PostScript Name del TTF, no el filename.** Verificarlo en macOS abriendo el archivo en Font Book.
9. **React: usar `next/font/google` o `next/font/local`** — nunca `<link>` a Google Fonts CDN, porque rompe el offline-first y añade FOUT.
10. **Las 4 fuentes son OFL** — uso comercial libre, redistribución libre, modificación libre. Atribución opcional pero recomendada.

---

## 📊 Tamaño del binario (referencia)

| Familia | Variable font | Estáticos individuales |
|---|---|---|
| Atkinson Hyperlegible Next | ~85 KB | ~280 KB (4 pesos) |
| Inter | ~110 KB | ~340 KB (4 pesos) |
| Lexend | ~95 KB | ~180 KB (3 pesos) |
| Fraunces | ~80 KB | ~95 KB (2 pesos) |
| **Total** | **~370 KB** | **~895 KB** |

**Recomendación para la app móvil:** usar archivos individuales solo para los pesos que se usan (no la variable font completa). Ahorra ~200 KB. Para el web admin, usar variable font.

---

## ✅ Checklist de implementación

- [ ] Descargar las 4 fuentes en TTF/OTF desde Google Fonts o los sitios oficiales
  - [ ] Atkinson Hyperlegible Next (4 pesos: 400, 500, 600, 700)
  - [ ] Inter (4 pesos: 400, 500, 600, 700) — o bajar de rsms.me para la versión actualizada
  - [ ] Lexend (3 pesos: 300, 400, 500) — solo si web admin es Flutter Web
  - [ ] Fraunces (2 pesos: 500, 700)
- [ ] Web: configurar `next/font/google` o `next/font/local` con las 4 familias y variables CSS
- [ ] Flutter app: declarar las 4 familias en `pubspec.yaml` con sus pesos
- [ ] Flutter: crear `MilkbookTheme` con TextTheme M3 + extensiones `DataText` y `ReadingText`
- [ ] iOS: agregar las 12-13 fuentes a `UIAppFonts` y crear `FontManager.swift` con extensiones semánticas
- [ ] Validar que los 4 assets estén en el bundle del build (no fallback silencioso)
- [ ] Reemplazar TODA referencia a Roboto / system font en código existente
- [ ] Usar `Atkinson Hyperlegible Next` en TODO dato numérico (litros, montos, DNI, balances)
- [ ] Usar `Inter` en TODA UI general (títulos, botones, inputs, labels, nav)
- [ ] Usar `Lexend` SOLO en reportes, liquidaciones y emails transaccionales del web admin
- [ ] Usar `Fraunces` SOLO en el wordmark del logo, splash screen y materiales de marketing
- [ ] Validar con usuarios reales (Carlos, Juan) en el Xiaomi y el Huawei de campo
- [ ] Validar con simulador de daltonismo que los datos siguen siendo legibles
- [ ] Validar que la app sigue funcionando offline (TTF embebidos, no descarga de CDN)
- [ ] Documentar en Storybook o equivalente para que el equipo mantenga la consistencia

---

## 🔗 Referencias

### Tipografía (oficiales)
- Atkinson Hyperlegible Next: https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next · https://www.brailleinstitute.org/freefont/ · https://github.com/googlefonts/atkinson-hyperlegible-next
- Inter: https://rsms.me/inter/ · https://github.com/rsms/inter · https://fonts.google.com/specimen/Inter
- Lexend: https://www.lexend.com/ · https://fonts.google.com/specimen/Lexend · https://github.com/googlefonts/lexend
- Fraunces: https://undercase.xyz/fonts/fraunces · https://fonts.google.com/specimen/Fraunces · https://github.com/undercasetype/Fraunces

### Fontsource (NPM self-host)
- Atkinson Hyperlegible Next: https://fontsource.org/fonts/atkinson-hyperlegible-next
- Inter: https://fontsource.org/fonts/inter
- Lexend: https://fontsource.org/fonts/lexend
- Fraunces: https://fontsource.org/fonts/fraunces

### Accesibilidad y contexto
- WCAG 2.1 contraste: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- Actionable UI Design Guidelines for Low-Literate Users (Srivastava et al., CSCW 2021): https://www.shivanikapania.com/assets/cscw2021paper.pdf
- Google Design — Lexend readability: https://design.google/library/lexend-readability
- Modern Font Stacks: https://github.com/system-fonts/modern-font-stacks

### Implementación por plataforma
- React / Next.js fonts: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Flutter custom fonts: https://docs.flutter.dev/cookbook/design/fonts
- Flutter text themes: https://docs.flutter.dev/ui/design/text/typography
- SwiftUI custom fonts: https://developer.apple.com/documentation/swiftui/applying-custom-fonts-to-text

### Proyecto
- Paleta de colores: [`../2-paleta-de-colores/`](../2-paleta-de-colores/)
- Logo: [`../1-logo/milkbook_logo_v1.png`](../1-logo/milkbook_logo_v1.png)
- Vista previa interactiva: [`./comparativa-tipografia.html`](./comparativa-tipografia.html)
