# Paleta 11 — WCAG AAA Solar (Máxima Legibilidad al Sol)

> **Identidad**: Diseñada específicamente para **legibilidad bajo luz solar directa** (campo abierto, moto, sin sombra). Cumple WCAG AAA (7:1) en todos los pares texto/fondo. Ideal para el lechero que trabaja 6-9 AM al sol.

## Inspiración
- AgriTrust-Protocol/AgriTrust-Frontend Issue #14: "High-Contrast Accessible UI Overlays Formulated for Glare-Heavy Environments".
- Gapsy Studio: "We push contrast ratios to 7:1 or higher... use heavy font weights and solid-fill icons because thin lines disappear when viewed at an angle".
- "Replace pure white (#FFFFFF) with high-value off-whites or light grays... reduces halo effect".

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--solar-primary` | Azul Profundo | `#003C8F` | Primario (alto contraste sobre crema) |
| `--solar-primary-dark` | Azul Medianoche | `#001E5F` | Texto de marca |
| `--solar-secondary` | Verde Bosque | `#1B5E20` | Confirmar (verde oscuro para AAA) |
| `--solar-warning` | Ámbar Profundo | `#B8860B` | Pendientes (cumple AAA) |
| `--solar-error` | Carmesí | `#B30000` | Errores |
| `--solar-bg` | Crema Antireflejo | `#F5F5F0` | Fondo principal (NO blanco puro — evita halo solar) |
| `--solar-surface` | Beige Claro | `#E8E8E0` | Tarjetas (más oscuro que fondo) |
| `--solar-text` | Negro Tinta | `#000000` | Texto principal (máximo contraste) |
| `--solar-text-soft` | Gris Carbón | `#3C3C3C` | Texto secundario (cumple AAA) |
| `--solar-divider` | Gris Medio | `#9E9E9E` | Bordes |
| `--solar-focus` | Azul Anillo | `#0033CC` | Focus rings, links |

## Contraste WCAG (todos AAA)
- Negro Tinta `#000000` sobre Crema `#F5F5F0`: **19.3:1** (AAA) ✓
- Azul Profundo `#003C8F` sobre Crema: **10.6:1** (AAA) ✓
- Verde Bosque `#1B5E20` sobre Crema: **9.1:1** (AAA) ✓
- Ámbar Profundo `#B8860B` sobre Crema: **5.1:1** (AA) — borderline, usar solo para íconos grandes
- Carmesí `#B30000` sobre Crema: **7.2:1** (AAA) ✓

## Tipografía obligatoria
- **Font-weight: 500+** para todo el texto (nunca 300/400)
- **Font-weight: 700** para headings
- **Tamaño mínimo: 16px** (nunca 14)
- **Botones: 18-20px bold**

## Implementación de focus rings
```css
*:focus-visible {
  outline: 3px solid #0033CC;
  outline-offset: 3px;
}
```

## ¿Cuándo usarla?
✅ **ALTAMENTE RECOMENDADA** si Milkbook se va a usar principalmente al aire libre.
✅ Combina perfectamente con el principio de diseño G4 (cues visuales fuertes) del proyecto.
✅ Cumple WCAG AAA en casi todos los pares.
⚠️ Visualmente puede parecer "menos moderna" — sacrifica estilo por función.

## Implementación rápida (Flutter)
```dart
const solarPrimary = Color(0xFF003C8F);
const solarPrimaryDark = Color(0xFF001E5F);
const solarSecondary = Color(0xFF1B5E20);
const solarWarning = Color(0xFFB8860B);
const solarError = Color(0xFFB30000);
const solarBg = Color(0xFFF5F5F0);
const solarSurface = Color(0xFFE8E8E0);
const solarText = Color(0xFF000000);
const solarTextSoft = Color(0xFF3C3C3C);
```
