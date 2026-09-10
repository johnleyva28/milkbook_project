# DS-01: Tokens específicos para móvil — MilkBook

> **Tokens visuales específicos para las apps móviles.** Esta es una extensión de los tokens globales del manual de marca, ajustada para las particularidades de las apps nativas (Flutter / Android / iOS).

**Hereda de:** [`../../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/`](../../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/), [`../../1_identidad_de_marca/1_identidad_visual/8-sistema-de-composicion/`](../../1_identidad_de_marca/1_identidad_visual/8-sistema-de-composicion/)

---

## 🎯 Tokens de layout móvil

### Estructura de pantalla

```css
:root {
  /* Status bar (Android: 24dp / iOS: 44dp con notch) */
  --statusbar-h-android: 24px;
  --statusbar-h-ios: 44px;

  /* App bar (header con título + acciones) */
  --appbar-h: 56px;

  /* Bottom navigation */
  --bottomnav-h: 56px;
  --bottomnav-h-with-safearea: 68px; /* +12dp para iOS safe area */

  /* Sticky CTA / acción fija */
  --sticky-cta-h: 60px;
  --sticky-cta-h-with-safearea: 80px;

  /* Safe areas iOS */
  --safe-area-top: env(safe-area-inset-top);
  --safe-area-bottom: env(safe-area-inset-bottom);
}
```

### Touch targets (zoom rural)

```css
:root {
  --touch-min: 48px;          /* WCAG / Material mínimo */
  --touch-default: 56px;      /* Elementos interactivos regulares */
  --touch-primary: 60px;      /* Botón primario en MilkBook */
  --touch-huge: 72px;         /* Onboarding */
}
```

### Espaciado (heredado + ajustes)

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;          /* default en app */
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}
```

### Radios (heredado)

```css
:root {
  --radius-sm: 6px;        /* chips, badges */
  --radius-md: 8px;        /* inputs, buttons */
  --radius-lg: 12px;       /* cards */
  --radius-full: 9999px;   /* avatars */
}
```

---

## 🎨 Tokens de color específicos

### Estado offline

```css
:root {
  --offline-banner-bg: #FFF4E0;        /* warning-bg */
  --offline-banner-fg: #B26A00;        /* warning */
  --offline-banner-icon: #B26A00;
}
```

### Estado online + sync

```css
:root {
  --sync-pending-bg: var(--blue-100);
  --sync-pending-fg: var(--blue-700);
}
```

### Estado de conflicto

```css
:root {
  --conflict-banner-bg: var(--error-bg);
  --conflict-banner-fg: var(--error);
}
```

### Estados de discrepancia

```css
:root {
  --discrepancia-bg: var(--warning-bg);
  --discrepancia-fg: var(--warning);
  --discrepancia-border: var(--warning);
}
```

### Estados de registro

```css
:root {
  --estado-confirmado: var(--green-500);
  --estado-pendiente: var(--warning);
  --estado-discrepancia: var(--warning);
  --estado-vencido: var(--error);
  --estado-liquidado: var(--text-soft);
}
```

---

## 📐 Tokens de tipografía móvil

```css
:root {
  /* Tamaños base app (Atkinson para datos, Inter para UI) */
  --text-xs: 11px;       /* badges, etiquetas pequeñas */
  --text-sm: 13px;       /* metadata, labels */
  --text-base: 15px;     /* UI general (un poco menos que web) */
  --text-md: 16px;       /* Mínimo absoluto */
  --text-lg: 18px;       /* Subtítulos, nombres */
  --text-xl: 22px;       /* Headers de card */
  --text-2xl: 28px;      /* Dato destacado (litros) */
  --text-3xl: 40px;      /* Display (confirmar litros) */
  --text-4xl: 56px;      /* Hero display */

  /* Pesos */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Line heights */
  --lh-tight: 1.0;       /* Para displays */
  --lh-snug: 1.2;
  --lh-normal: 1.4;
  --lh-relaxed: 1.6;
}
```

---

## 🎬 Tokens de motion (animaciones)

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;

  /* Easing */
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Haptic feedback (a configurar en Flutter) */
  --haptic-light: light;
  --haptic-medium: medium;
  --haptic-heavy: heavy;
}
```

**Reglas:**
- Todas las transiciones < 500ms.
- Sin animaciones decorativas (consume batería y distrae).
- Solo animaciones funcionales: confirmar, expandir, dismiss.

---

## 🌑 Tokens de dark mode

```css
[data-theme="dark"] {
  --bg-primary: #1A1814;          /* fondo negro cálido */
  --bg-card: #25211B;
  --bg-card-alt: #2F2A22;
  --text-primary: #FAF8F3;
  --text-soft: #C7BFAE;
  --text-disabled: #6E6655;
  --border: #3A332A;
  --border-strong: #524838;
}
```

**Reglas:**
- En dark mode, los colores de marca se aclaran.
- El fondo NO es negro puro, es negro cálido (heredado del manual de marca).
- Los CTAs siguen siendo verdes/azules pero más claros para mantener contraste.

---

## 📱 Tokens específicos de plataforma

### Android

```css
:root {
  /* Material Design 3 base, adaptado */
  --android-touch-ripple: rgba(42, 120, 42, 0.12);
  --android-elevation-1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --android-elevation-2: 0 2px 6px rgba(0, 0, 0, 0.08);
  --android-statusbar-bg: transparent;  /* transparente para M3 */
}
```

### iOS

```css
:root {
  /* iOS HIG base, adaptado */
  --ios-touch-highlight: rgba(0, 0, 0, 0.1);
  --ios-nav-bar-bg: rgba(255, 255, 255, 0.94);  /* translucido */
  --ios-toolbar-bg: rgba(255, 253, 247, 0.94);
}
```

**Decisión:** la app prioriza Android (target rural Cajamarca), pero debe funcionar en iOS por consistencia. Los tokens específicos se adaptan al sistema operativo.

---

## 🧩 Tokens semánticos (cómo se usan)

### Botones

```css
.btn-primary {
  background: var(--green-500);
  color: white;
  height: var(--touch-primary);  /* 60dp */
  border-radius: var(--radius-md);
  font-weight: var(--weight-bold);
  font-size: var(--text-md);
}
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--cream-300);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
```

### Inputs

```css
.input {
  height: var(--touch-default);  /* 56dp */
  border: 2px solid var(--cream-400);
  border-radius: var(--radius-md);
  padding: 0 var(--space-3);
  font-family: var(--font-data);  /* Atkinson para datos */
  font-size: var(--text-lg);
}
```

---

## 📋 Implementación en código

### Flutter (Dart)

```dart
// lib/theme/tokens.dart
class MilkbookTokens {
  // Layout
  static const double touchPrimary = 60;
  static const double touchDefault = 56;
  static const double touchMin = 48;
  static const double touchHuge = 72;
  static const double appbarH = 56;
  static const double bottomnavH = 56;
  static const double stickyCtaH = 60;

  // Spacing
  static const double space1 = 4;
  static const double space2 = 8;
  static const double space3 = 12;
  static const double space4 = 16;
  static const double space5 = 24;
  static const double space6 = 32;

  // Radius
  static const double radiusSm = 6;
  static const double radiusMd = 8;
  static const double radiusLg = 12;

  // Colors (heredados del manual)
  static const Color cream50 = Color(0xFFFFFDF7);
  static const Color green500 = Color(0xFF2A782A);
  static const Color blue500 = Color(0xFF0064B1);
  // ... etc
}
```

### Acceso desde widgets

```dart
Container(
  padding: EdgeInsets.all(MilkbookTokens.space4),
  decoration: BoxDecoration(
    color: MilkbookTokens.cream50,
    borderRadius: BorderRadius.circular(MilkbookTokens.radiusLg),
  ),
  child: Text(
    'Confirmar',
    style: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w700,
      color: MilkbookTokens.green500,
    ),
  ),
);
```

---

## 🔄 Versionado

- **v1.0** — 2026-09-07 — Tokens iniciales basados en manual de marca + componentes mockup.

Cada cambio significativo debe:
1. Documentarse en este archivo.
2. Actualizar el `theme/tokens.dart` correspondiente.
3. Validar que NO rompe los mockups HTML.

---

## 🧪 Cómo validar

1. **Abrir los mockups** (`../2_mockups/`) y verificar que usan los tokens.
2. **Comparar con el manual de marca** (`../../1_identidad_de_marca/1_identidad_visual/`).
3. **Test de contraste** con WebAIM (https://webaim.org/resources/contrastchecker/).
4. **Test de accesibilidad** con simuladores (TalkBack, VoiceOver).
5. **Test de rendimiento** (FPS, tiempo de carga) con Flutter DevTools.

---

## 🔗 Referencias

- Manual de marca: [`../../1_identidad_de_marca/1_identidad_visual/`](../../1_identidad_de_marca/1_identidad_visual/)
- Material Design 3: https://m3.material.io/
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- [Próximo: DS-02 Componentes móvil](./DS-02_componentes_movil.md)
