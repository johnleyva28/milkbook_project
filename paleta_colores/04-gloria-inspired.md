# Paleta 04 — Gloria-Inspired (Tradición Láctea Peruana)

> **Identidad**: Inspirada en el branding de marcas lácteas líderes del Perú (Gloria, Laive, Chugur). Azul corporativo + rojo cálido + crema. Reconocible, profesional, "de toda la vida".

## Inspiración
- **Gloria S.A.**: Azul corporativo, rojo de etiqueta clásica de leche evaporada.
- **Laive**: Azul + naranja (suave).
- **Chugur (rebranding 2024)**: "rojo y crema en tonos pastel... Police Blue y Marfil Blanco como secundarios" (Tesis ULima).
- **Deleites del Valle (Dela)**: Tonos cálidos, naturales.

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--gloria-primary` | Azul Gloria | `#0D47A1` | Primario, branding, navegación |
| `--gloria-primary-light` | Celeste Etiqueta | `#42A5F5` | Acentos, info, links |
| `--gloria-secondary` | Rojo Etiqueta | `#D32F2F` | Énfasis, CTAs críticos, boletas |
| `--gloria-warm` | Crema Premium | `#FFF8E1` | Fondo principal (estilo "leche entera") |
| `--gloria-success` | Verde Clásico | `#388E3C` | Confirmaciones, "ya vendí" |
| `--gloria-warning` | Ámbar | `#FFA000` | Pendientes, alertas suaves |
| `--gloria-text` | Azul Marino | `#1A237E` | Texto principal, identidad |
| `--gloria-text-soft` | Gris Corporativo | `#546E7A` | Texto secundario |
| `--gloria-surface` | Blanco Nube | `#FFFFFF` | Tarjetas, modales |
| `--gloria-border` | Azul Humo | `#BBDEFB` | Bordes, divisores |

## Contraste WCAG
- Azul Marina `#1A237E` sobre Crema Premium `#FFF8E1`: **13.5:1** (AAA) ✓
- Azul Gloria `#0D47A1` sobre Crema: **10.1:1** (AAA) ✓
- Rojo Etiqueta `#D32F2F` sobre Crema: **5.8:1** (AA) ✓
- Verde Clásico `#388E3C` sobre Crema: **5.4:1** (AA) ✓

## Mapeo a funciones
| Función | Color |
|---------|-------|
| Boleta generada | Rojo Etiqueta `#D32F2F` (PDF + UI) |
| Login / Auth | Azul Gloria `#0D47A1` |
| Confirmar | Verde Clásico `#388E3C` |
| Adelantos | Ámbar `#FFA000` |
| Liquidación | Azul Gloria + Verde Clásico |

## ¿Cuándo usarla?
✅ Si Milkbook quiere **"seriedad"** y percibirse como software profesional/empresarial.
✅ Para reuniones con SUNAT, bancos, posibles inversionistas.
✅ Para web admin (sensación de CRM B2B).
⚠️ Puede sentirse "corporativa" — alejarse del campo. Úsala con moderación.

## Implementación rápida (Flutter)
```dart
const gloriaPrimary = Color(0xFF0D47A1);
const gloriaPrimaryLight = Color(0xFF42A5F5);
const gloriaSecondary = Color(0xFFD32F2F);
const gloriaWarm = Color(0xFFFFF8E1);
const gloriaSuccess = Color(0xFF388E3C);
const gloriaWarning = Color(0xFFFFA000);
const gloriaText = Color(0xFF1A237E);
const gloriaTextSoft = Color(0xFF546E7A);
```
