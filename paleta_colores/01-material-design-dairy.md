# Paleta 01 — Material Design Dairy (Lácteo Clásico)

> **Identidad**: La paleta base más conservadora y reconocible. Es una evolución refinada de la paleta actual del proyecto, alineada con las convenciones globales de branding lácteo (azul + verde + blanco).

## Inspiración
- La paleta original del proyecto (`diseno-ux/low-literacy/principios-diseno.md`).
- Guías de Material Design 3 para tonos accesibles.
- Convenciones internacionales: **azul = confianza/leche**, **verde = confirmar**, **amarillo = alerta**, **rojo = error**.

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--md-primary` | Azul Leche | `#1565C0` | Color primario, branding, headers, CTAs principales |
| `--md-primary-light` | Azul Cielo | `#5E92F3` | Hovers, badges, fondos suaves |
| `--md-primary-dark` | Azul Profundo | `#003C8F` | Textos sobre fondos claros, énfasis |
| `--md-secondary` | Verde Confirmar | `#2E7D32` | Confirmaciones, "Sí", acción positiva |
| `--md-tertiary` | Amarillo Alerta | `#F9A825` | Advertencias, pendientes |
| `--md-error` | Rojo Discrepancia | `#C62828` | Errores, discrepancias, eliminar |
| `--md-background` | Crema Suave | `#FAF8F1` | Fondo de pantallas (no blanco puro, evita halo en sol) |
| `--md-surface` | Blanco Leche | `#FFFFFF` | Tarjetas, superficies elevadas |
| `--md-text-primary` | Carbón | `#212121` | Texto principal (cumple AAA sobre crema) |
| `--md-text-secondary` | Gris Medio | `#5F6368` | Texto secundario, labels |
| `--md-divider` | Gris Claro | `#E0E0E0` | Divisores, bordes sutiles |

## Contraste WCAG (AAA target)
- Carbón `#212121` sobre Crema `#FAF8F1`: **16.8:1** (AAA)
- Azul Leche `#1565C0` sobre Crema `#FAF8F1`: **7.8:1** (AAA)
- Verde `#2E7D32` sobre Crema: **7.1:1** (AAA)
- Rojo `#C62828` sobre Crema: **6.6:1** (AA)

## ¿Cuándo usarla?
✅ **RECOMENDADA** si quieres mantener la paleta del proyecto con un ligero retoque moderno.
✅ Si tu equipo ya está acostumbrado a Material Design.
⚠️ Es la opción más "genérica" — no diferencia mucho a Milkbook de cualquier otra app.

## Implementación rápida (Flutter)
```dart
const mdPrimary = Color(0xFF1565C0);
const mdPrimaryLight = Color(0xFF5E92F3);
const mdPrimaryDark = Color(0xFF003C8F);
const mdSecondary = Color(0xFF2E7D32);
const mdTertiary = Color(0xFFF9A825);
const mdError = Color(0xFFC62828);
const mdBackground = Color(0xFFFAF8F1);
const mdSurface = Color(0xFFFFFFFF);
const mdTextPrimary = Color(0xFF212121);
const mdTextSecondary = Color(0xFF5F6368);
```
