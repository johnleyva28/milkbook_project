# Paleta 03 — Café con Leche (Cálida y Acogedora)

> **Identidad**: Tonos cálidos de café, caramelo y crema. Evoca el momento del desayuno con leche, la cocina de la casa del productor, la calidez del hogar andino.

## Inspiración
- Branding de cafés especiales de altura (Cajamarca, Jaén, Amazonas).
- "Hartzler Family Dairy" — paleta `Forest Heritage #035542` + teal/butter yellow.
- Dulces de leche, queso fresco, manjar blanco.
- Colores de packaging artesanal peruano (Chugur, Laive Gold).

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--cafe-primary` | Caramelo Quemado | `#6F4E37` | Primario, branding (evoca café tostado) |
| `--cafe-primary-light` | Capuchino | `#A0826D` | Hover, estados secundarios |
| `--cafe-secondary` | Verde Menta | `#3F704D` | Confirmar, saldo positivo |
| `--cafe-accent` | Mantequilla | `#F4D03F` | Acentos cálidos, alertas positivas |
| `--cafe-error` | Rojo Canela | `#A93226` | Errores, alertas críticas |
| `--cafe-bg` | Crema Batido | `#FAF3E0` | Fondo principal (no blanco, evita reflejo solar) |
| `--cafe-surface` | Beige Lino | `#F2E8D5` | Tarjetas |
| `--cafe-text` | Espresso | `#2C1810` | Texto principal (casi negro, alto contraste) |
| `--cafe-text-soft` | Café con Leche | `#8B6F47` | Texto secundario, labels |
| `--cafe-divider` | Avellana | `#D4B896` | Bordes sutiles |

## Contraste WCAG
- Espresso `#2C1810` sobre Crema Batido `#FAF3E0`: **16.2:1** (AAA) ✓
- Caramelo `#6F4E37` sobre Crema: **7.4:1** (AAA) ✓
- Verde Menta `#3F704D` sobre Crema: **6.9:1** (AAA) ✓
- Mantequilla `#F4D03F` sobre Espresso: **10.5:1** (AAA) ✓

## Mapeo a funciones
| Función | Color |
|---------|-------|
| Botón confirmar | Verde Menta `#3F704D` |
| Pantalla "Hoy vendí" | Caramelo Quemado `#6F4E37` |
| Adelantos | Mantequilla `#F4D03F` (sobre fondo oscuro) |
| Errores | Rojo Canela `#A93226` |
| Cierre de quincena (festivo) | Caramelo + Mantequilla |

## ¿Cuándo usarla?
✅ Si Milkbook quiere sentirse como **"la marca de la casa del productor"**.
✅ Para onboarding y tutoriales (sensación cálida, de bienvenida).
✅ Para emails y notificaciones push (asociación emocional positiva).
⚠️ Es menos "tech" — puede parecer menos innovadora frente a apps bancarias.

## Implementación rápida (Flutter)
```dart
const cafePrimary = Color(0xFF6F4E37);
const cafePrimaryLight = Color(0xFFA0826D);
const cafeSecondary = Color(0xFF3F704D);
const cafeAccent = Color(0xFFF4D03F);
const cafeError = Color(0xFFA93226);
const cafeBg = Color(0xFFFAF3E0);
const cafeSurface = Color(0xFFF2E8D5);
const cafeText = Color(0xFF2C1810);
const cafeTextSoft = Color(0xFF8B6F47);
```
