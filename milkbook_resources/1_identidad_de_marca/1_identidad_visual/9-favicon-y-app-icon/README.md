# 📱 Favicon y App Icon — MilkBook

> **Versión compacta y escalable del isotipo oficial de MilkBook.** Define cómo se ve la marca cuando solo hay 16×16 px disponibles (favicon) hasta 1024×1024 px (App Store). Cubre favicon web, app icon iOS/Android, PWA, notificaciones push, Microsoft tiles y adaptive icons. Los assets PNG están generados **directamente desde** [`../1-logo/logo_milkbook.png`](../1-logo/logo_milkbook.png) usando Pillow.

**Fecha de aprobación:** 2026-09-07
**Fuente del icono:** logo oficial (`logo_milkbook.png` · 637×637 px)
**Aplica a:** Favicon web, app icon iOS, app icon Android (legacy + adaptive), PWA, splash screen, push notifications, Microsoft tile.
**Archivo de referencia visual:** [`comparativa-favicon-app-icon.html`](./comparativa-favicon-app-icon.html)
**Assets PNG generados:** [`assets/`](./assets/) — 16 archivos listos para producción.

---

## 🎯 Principio fundamental

**El favicon/app icon NO es el logo completo.** Es el **isotipo** del logo oficial (la cabeza de vaca azul con cuernos y manchas verdes + botella de leche azul con leche cremosa adentro) **sin el wordmark "MilkBook"**. El wordmark es ilegible a 16 px y compite con el isotipo en tamaños grandes.

**Decisión MilkBook:**
- **Favicon (16-32 px):** solo el isotipo sobre fondo crema `#FFFDF7`
- **App icon (48-1024 px):** isotipo centrado, padding interno del 10%, fondo crema
- **Wordmark "MilkBook":** solo aparece en PWA splash, onboarding y marketing
- **Adaptive icon (Android):** isotipo en safe zone del 55% del lado (maskable)

**Tres reglas inviolables:**
1. **Isotipo del logo oficial, sin wordmark.** Mismo isotipo que se ve en el logo principal, pero sin "MilkBook" debajo.
2. **Fondo siempre crema `#FFFDF7`.** Coherencia con la paleta MilkBook. No se invierte a negro en dark mode.
3. **Padding interno del 10%.** El isotipo NUNCA toca el borde del contenedor.

---

## 🐄 1. Fuente: el isotipo del logo oficial

El isotipo se extrae del logo oficial. Se compone de **3 elementos**:

| Elemento | Color (hex) | Token MilkBook |
|---|---|---|
| **Botella de leche** (silueta y contorno) | `#78C0F8` | `blue-300` |
| **Leche dentro de la botella** | `#F5F0E1` (cremoso) | `cream-200` |
| **Cabeza de vaca** (silueta y contorno) | `#78C0F8` | `blue-300` |
| **Cuernos, manchas verdes y detalles** | `#88D088` | `green-300` |

**Fondo del logo oficial:** blanco/crema neutro. El isotipo hereda este fondo crema que coincide con `--cream-50` de la paleta MilkBook.

**Detalles que se pierden a tamaños pequeños:**
- A <32 px: los cuernos verdes se confunden con la cabeza azul.
- A <24 px: las manchas verdes de la vaca desaparecen visualmente.
- A <16 px: solo se distingue la silueta azul (botella + cabeza de vaca) con leche cremosa adentro.

**Decisión:** el isotipo del logo oficial ya está **adecuadamente simplificado** para tamaños pequeños. No necesita una "versión simplificada" extra — el logo oficial ya fue diseñado con esa restricción.

---

## 📦 2. Assets generados (16 archivos PNG)

Todos los assets se generaron ejecutando `generate_assets.py` (Pillow) sobre el isotipo recortado de `logo_milkbook.png`. Tamaños optimizados para cada plataforma.

| Archivo | Tamaño | Plataforma | Uso |
|---|---|---|---|
| `milkbook-logo-source.png` | 1254×1254 | — | Fuente · logo oficial original completo |
| `isotype-source.png` | 725×569 | — | Fuente · solo isotipo (sin wordmark) |
| `favicon-16.png` | 16×16 | Web legacy | Pestaña del navegador |
| `favicon-32.png` | 32×32 | Web moderno | Pestaña del navegador + bookmark |
| `favicon-48.png` | 48×48 | Windows legacy | Tile pequeño |
| `apple-touch-icon.png` | 180×180 | iOS | Home screen + PWA iOS |
| `icon-192.png` | 192×192 | Android Chrome | Home screen Android, PWA |
| `icon-512.png` | 512×512 | PWA + Android | Splash, store listing |
| `icon-512-maskable.png` | 512×512 | Android 8+ | Adaptive icon (safe zone 55%) |
| `AppIcon-1024.png` | 1024×1024 | iOS App Store | Marketing asset |
| `pwa-splash-512.png` | 512×512 | PWA | Splash con wordmark Fraunces |
| `mstile-70x70.png` | 70×70 | Windows | Tile pequeño |
| `mstile-150x150.png` | 150×150 | Windows | Tile medio |
| `mstile-310x310.png` | 310×310 | Windows | Tile grande |
| `mstile-310x150.png` | 310×150 | Windows | Tile ancho |
| `ic_notification_24.png` | 24×24 | Android push | Silueta blanca transparente |

**Total:** 16 archivos PNG listos para producción.

---

## 🌐 3. Favicon web

### Tamaños requeridos

| Tamaño | Formato | Uso |
|---|---|---|
| 16×16 | PNG | Pestaña del navegador legacy |
| 32×32 | PNG | Pestaña del navegador moderno |
| 48×48 | PNG | Windows tile pequeño |
| 180×180 | PNG | Apple touch icon (iOS home) |
| 192×192 | PNG | Android Chrome, PWA |
| 512×512 | PNG | PWA splash, Android store |
| SVG | SVG | Render dinámico (vectorial) |
| ICO multi | ICO | Legacy Windows + fallback |

### Implementación en HTML

```html
<!-- En el <head> de cada página -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Tema del navegador (Android Chrome) -->
<meta name="theme-color" content="#FFFDF7">

<!-- Windows tile -->
<meta name="msapplication-TileColor" content="#FFFDF7">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
```

### Web App Manifest (PWA)

```json
{
  "name": "MilkBook",
  "short_name": "MilkBook",
  "description": "Gestión lechera rural para Cajamarca",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFDF7",
  "theme_color": "#FFFDF7",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Por qué SVG NO es la fuente principal

Aunque el logo oficial tiene una versión vectorial (la original generada con Google Flow), para favicon y app icon **usamos PNG rasterizados** porque:

1. **Compatibilidad universal:** todos los navegadores y launchers aceptan PNG sin problemas. SVG tiene soporte irregular en iOS home screen y Windows tile.
2. **Mejor rendimiento:** un PNG de 1KB carga más rápido que un SVG complejo en conexiones 3G rurales.
3. **Sin ambigüedad de renderizado:** cada launcher puede rasterizar el SVG de forma distinta. El PNG asegura consistencia visual cross-platform.

El SVG del logo oficial se mantiene como asset maestro para futuras regeneraciones.

---

## 🍎 4. App icon iOS

### Assets iOS específicos

| Archivo | Tamaño | Uso |
|---|---|---|
| `apple-touch-icon.png` | 180×180 | iPhone home (3x) |
| `AppIcon-1024.png` | 1024×1024 | App Store marketing |

### Reglas iOS

- **NO** incluir transparencias en el PNG (Apple las rechaza).
- **NO** esquinas redondeadas en el asset — iOS aplica la máscara squircle automáticamente.
- **SÍ** entregar PNG con el isotipo centrado (iOS recorta al squircle).
- **Fondo:** crema sólido `#FFFDF7`. Mismo en light y dark.
- **Padding interno:** 12% del lado. El isotipo NUNCA toca el borde.

### Implementación en Xcode

```
ios/Runner/Assets.xcassets/AppIcon.appiconset/
├── Contents.json          ← metadata
├── AppIcon-20@1x.png      ← (regenerar desde apple-touch-icon)
├── AppIcon-20@2x.png
├── AppIcon-20@3x.png
├── AppIcon-29@1x.png
├── AppIcon-29@2x.png
├── AppIcon-29@3x.png
├── AppIcon-40@1x.png
├── AppIcon-40@2x.png
├── AppIcon-40@3x.png
├── AppIcon-60@2x.png
├── AppIcon-60@3x.png
└── AppIcon-1024.png       ← ya está en assets/
```

> Los tamaños 20/29/40/60 se generan desde `apple-touch-icon.png` con Pillow (script aparte).

---

## 🤖 5. App icon Android (adaptive + legacy)

### Tamaños legacy (Android 7-)

| Tamaño | Densidad |
|---|---|
| 48×48 | mdpi |
| 72×72 | hdpi |
| 96×96 | xhdpi |
| 144×144 | xxhdpi |
| 192×192 | xxxhdpi ← `icon-192.png` |

### Adaptive icon (Android 8+) — 3 capas

Android 8+ separa el icon en:

1. **Background layer** — fondo sólido `cream-50` `#FFFDF7`
2. **Foreground layer** — el isotipo del logo oficial, ocupando el **60%** del área segura
3. **Legacy layer** — el icon completo (foreground + background) para fallback

**Safe zone:** el área donde el foreground está garantizado visible en TODOS los launchers. Es un círculo de **60%** del lado centrado. El isotipo `icon-512-maskable.png` ya respeta esa zona.

```
┌────────────────────────────────────┐
│                                    │
│           ╭───────────╮            │
│         ╱               ╲          │
│       ╱    ┌─────────┐   ╲        │
│      │     │         │    │        │
│      │     │ 🐄 + 🍼  │    │  ← safe zone 55%
│      │     │         │    │        │
│       ╲    └─────────┘   ╱        │
│         ╲               ╱          │
│           ╰───────────╯            │
│                                    │
└────────────────────────────────────┘
       Fondo: cream-50 #FFFDF7
       Foreground: isotipo centrado
```

### Implementación en Android Studio

```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png         ← desde favicon-48
├── mipmap-hdpi/ic_launcher.png         ← desde icon-192
├── mipmap-xhdpi/ic_launcher.png        ← desde icon-192
├── mipmap-xxhdpi/ic_launcher.png       ← desde icon-192
├── mipmap-xxxhdpi/ic_launcher.png      ← desde icon-192
├── mipmap-anydpi-v26/ic_launcher.xml   ← adaptive
├── mipmap-anydpi-v26/ic_launcher_round.xml
├── drawable/ic_launcher_foreground.xml ← desde icon-512-maskable
└── values/colors.xml                   ← cream_50: #FFFDF7
```

```xml
<!-- res/mipmap-anydpi-v26/ic_launcher.xml -->
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/cream_50"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>
```

---

## 🔔 6. Notificaciones push (icon pequeño)

Las notificaciones push en Android requieren un icono de **24×24 dp** en blanco sobre fondo transparente. Generado como `ic_notification_24.png` (silueta blanca del isotipo).

**Regla Android:** el icono de notificación **debe ser blanco puro** sobre fondo transparente. El sistema operativo le aplica el color de acento.

**Regla iOS:** iOS no usa un icon custom en el banner de push (usa el app icon). No requiere trabajo adicional.

---

## 🪟 7. Microsoft tile (Windows)

Tiles proporcionados: `mstile-70x70.png`, `mstile-150x150.png`, `mstile-310x310.png`, `mstile-310x150.png`.

Configuración XML (`browserconfig.xml`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <wide310x150logo src="/mstile-310x150.png"/>
      <TileColor>#FFFDF7</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

---

## 🎨 8. PWA splash screen

Cuando un usuario "instala" la PWA en iOS/Android, ve un splash mientras la app carga. **Aquí sí se incluye el wordmark "MilkBook"** en Fraunces (es un momento branding de alto impacto).

**Asset:** `pwa-splash-512.png` (logo oficial completo: isotipo + wordmark).

```
        ╭───────────────╮
        │               │
        │   🐄 + 🍼      │  ← isotipo
        │               │
        │   MilkBook    │  ← wordmark Fraunces
        │               │
        │  Cargando...  │
        │               │
        ╰───────────────╯
```

---

## 🎭 9. Variantes de marca

### Decisión: NO hay variante dark

El app icon **NO cambia** entre light y dark mode. Siempre fondo crema `#FFFDF7`.

**Por qué:**
- Si el icon fuera negro en dark, parecería una app genérica más.
- El crema evoca la leche, identidad láctea — más fuerte que el contraste visual.
- Cuando Carlos ve MilkBook en su cajón de apps, reconoce "la app de mi leche", no "otra app oscura más".

**Excepción:** si en el futuro MilkBook se usa en watchOS o smart displays con modos auto-dark, evaluar variante.

---

## 🔄 10. Proceso de regeneración de assets

Si en el futuro el logo oficial cambia (nueva versión del isotipo), regenerar todos los assets con este script:

```python
# generate_assets.py
from PIL import Image
import os

src = '../1-logo/logo_milkbook.png'  # ruta al logo fuente
dst = './assets'
os.makedirs(dst, exist_ok=True)

cream_50 = (255, 253, 247, 255)

# Paso 1: cargar y recortar isotipo (ajustar coords según logo)
img = Image.open(src).convert('RGBA')
isotype = img.crop((230, 175, 1050, 770))  # ajustar según versión

# Paso 2: recortar bbox real del isotipo
import numpy as np
arr = np.array(isotype)
mask = (arr[:,:,0] < 250) | (arr[:,:,1] < 250) | (arr[:,:,2] < 250)
ys, xs = np.where(mask)
y1, y2, x1, x2 = ys.min(), ys.max(), xs.min(), xs.max()
isotype_clean = isotype.crop((max(0, x1-15), max(0, y1-15), x2+15, y2+15))
isotype_clean.save(f'{dst}/isotype-source.png', optimize=True)

# Paso 3: generar todos los tamaños
def make(name, size, padding=0.12):
    out = Image.new('RGBA', (size, size), cream_50)
    iso = isotype_clean.copy()
    target = int(size * (1 - 2 * padding))
    iso.thumbnail((target, target), Image.LANCZOS)
    out.paste(iso, ((size - iso.size[0]) // 2, (size - iso.size[1]) // 2), iso)
    out.convert('RGB').save(f'{dst}/{name}', optimize=True)

def make_maskable(name, size):
    out = Image.new('RGBA', (size, size), cream_50)
    iso = isotype_clean.copy()
    target = int(size * 0.60)
    iso.thumbnail((target, target), Image.LANCZOS)
    out.paste(iso, ((size - iso.size[0]) // 2, (size - iso.size[1]) // 2), iso)
    out.convert('RGB').save(f'{dst}/{name}', optimize=True)

# Tamaños estándar
make('favicon-16.png', 16)
make('favicon-32.png', 32)
make('favicon-48.png', 48)
make('apple-touch-icon.png', 180)
make('icon-192.png', 192)
make('icon-512.png', 512)
make('AppIcon-1024.png', 1024)
make_maskable('icon-512-maskable.png', 512)
make('mstile-70x70.png', 70)
make('mstile-150x150.png', 150)
make('mstile-310x310.png', 310)

# Wide tile (310x150)
wide = Image.new('RGBA', (310, 150), cream_50)
iso = isotype_clean.copy()
iso.thumbnail((130, 130), Image.LANCZOS)
wide.paste(iso, ((310 - iso.size[0]) // 2, (150 - iso.size[1]) // 2), iso)
wide.convert('RGB').save(f'{dst}/mstile-310x150.png', optimize=True)

# Splash con wordmark
logo_512 = img.copy()
logo_512.thumbnail((512, 512), Image.LANCZOS)
bg = Image.new('RGBA', (512, 512), cream_50)
bg.paste(logo_512, ((512 - logo_512.size[0]) // 2, (512 - logo_512.size[1]) // 2), logo_512)
bg.convert('RGB').save(f'{dst}/pwa-splash-512.png', optimize=True)

# Notificación Android (silueta blanca 24dp)
notif = isotype_clean.copy()
notif.thumbnail((24, 24), Image.LANCZOS)
arr = np.array(notif)
mask = (arr[:,:,0] < 250) | (arr[:,:,1] < 250) | (arr[:,:,2] < 250)
new_arr = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
new_arr[mask] = [255, 255, 255, 255]
Image.fromarray(new_arr, 'RGBA').save(f'{dst}/ic_notification_24.png', optimize=True)

print("✓ 16 assets generados en assets/")
```

---

## 🚦 Reglas duras

### Lo que SIEMPRE

1. **Usar el isotipo del logo oficial** como fuente — `../1-logo/logo_milkbook.png`
2. **Fondo siempre `#FFFDF7`** (cream-50) en todos los iconos
3. **Padding interno del 12%** — el isotipo nunca toca el borde
4. **Wordmark SOLO en PWA splash**, NUNCA en el app icon
5. **Maskable con safe zone del 60%** del lado (Android 8+)
6. **PNG sin transparencias** para iOS (Apple las rechaza)
7. **Notificación Android 24dp** en blanco sobre transparente

### Lo que NUNCA

1. **NUNCA usar el logo V2** (`logo_milkbook.png`) — está descartado
2. **NUNCA el logo completo** (con wordmark) en el app icon — no se lee a 16 px
3. **NUNCA fondo negro** en el app icon — rompe la identidad láctea
4. **NUNCA el isotipo tocando el borde** del icono (sin padding)
5. **NUNCA cambiar el icon entre light y dark** — siempre crema
6. **NUNCA ícono cuadrado perfecto en iOS** — Apple aplica máscara
7. **NUNCA usar SVG inline** como asset final (mejor PNG rasterizado por compatibilidad)

---

## 📐 Implementación por plataforma

### Web (Next.js)

```
public/
├── favicon.ico              ← regenerar desde favicon-32.png + favicon-16.png
├── favicon-16.png
├── favicon-32.png
├── favicon-48.png
├── apple-touch-icon.png
├── icon-192.png
├── icon-512.png
├── icon-512-maskable.png
├── mstile-150x150.png
├── mstile-310x310.png
└── site.webmanifest
```

### Flutter (pubspec.yaml)

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/icons/ic_launcher.png        # legacy
    - assets/icons/ic_launcher_foreground.png  # adaptive
```

```dart
// Generar adaptive icon: usar flutter_launcher_icons package
// flutter pub run flutter_launcher_icons:main
```

### iOS (Xcode)

Copiar `apple-touch-icon.png` y `AppIcon-1024.png` a `ios/Runner/Assets.xcassets/AppIcon.appiconset/`.

### Android (Android Studio)

Copiar `icon-192.png` a `mipmap-*` para todas las densidades. Usar `icon-512-maskable.png` para el adaptive icon.

---

## ✅ Checklist de implementación

### Assets
- [x] Generar los 16 archivos PNG desde el logo oficial (hecho)
- [x] Verificar visualmente cada tamaño (revisado con vision)
- [x] Confirmar safe zone del 60% en icon-512-maskable.png

### Web
- [ ] Subir PNGs a `/public/`
- [ ] Agregar `<link rel="icon">` y `<link rel="apple-touch-icon">` en el `<head>`
- [ ] Crear `site.webmanifest` con sizes correctos
- [ ] Validar que el favicon se ve bien en pestaña (16 px es lo más difícil)

### iOS
- [ ] Generar tamaños 20/29/40/60 desde `apple-touch-icon.png` con Pillow
- [ ] Agregar PNGs a `Assets.xcassets/AppIcon.appiconset/`
- [ ] Actualizar `Contents.json` con todos los tamaños
- [ ] Validar en simulador (iPhone SE chico, iPhone Pro Max grande)

### Android
- [ ] Agregar PNGs a `mipmap-*` para todas las densidades
- [ ] Crear `ic_launcher.xml` adaptive con background + foreground
- [ ] Definir `cream_50: #FFFDF7` en `colors.xml`
- [ ] Validar en emulador (Pixel, Samsung, Xiaomi MIUI)
- [ ] Validar en dispositivo real de Carlos (Xiaomi Redmi)

### Push notifications
- [ ] Validar que `ic_notification_24.png` se ve en push real
- [ ] Probar en Android 8, 10, 12, 13

### PWA
- [ ] Validar que la PWA instala correctamente en iOS (Add to Home Screen)
- [ ] Validar que la PWA instala correctamente en Android Chrome
- [ ] Validar splash screen con wordmark Fraunces

### Validación con usuarios
- [ ] Test con Carlos: ¿reconoce el icon sin ayuda?
- [ ] Test con Juan: ¿distingue MilkBook vs Yape vs WhatsApp en home screen?
- [ ] Test bajo sol directo: ¿se ve el icono al mediodía?

---

## 🔗 Referencias

### Especificaciones oficiales
- **Apple HIG — App Icon:** https://developer.apple.com/design/human-interface-guidelines/app-icons
- **Android Adaptive Icons:** https://developer.android.com/develop/ui/views/launch/icon_design_adaptive
- **PWA Manifest spec:** https://web.dev/add-manifest/
- **Microsoft tile icons:** https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)

### Generadores
- **RealFaviconGenerator:** https://realfavicongenerator.net (alternativa web)
- **Pillow (Python):** https://pillow.readthedocs.io — usado para generar los 16 assets
- **flutter_launcher_icons:** https://pub.dev/packages/flutter_launcher_icons

### Proyecto
- Logo oficial (fuente): [`../1-logo/logo_milkbook.png`](../1-logo/logo_milkbook.png)
- Paleta: [`../2-paleta-de-colores/`](../2-paleta-de-colores/)
- Vista previa interactiva: [`./comparativa-favicon-app-icon.html`](./comparativa-favicon-app-icon.html)
- Assets generados: [`./assets/`](./assets/)
