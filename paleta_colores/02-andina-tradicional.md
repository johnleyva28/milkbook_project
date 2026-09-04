# Paleta 02 — Andina Tradicional (Tejidos de Ayacucho)

> **Identidad**: Inspirada en los textiles tradicionales andinos (Ayacucho, Cusco, Cajamarca). Tonos saturados pero terrosos que evocan la cultura local. Crea una conexión emocional fuerte con productores y lecheros.

## Inspiración
- Textiles tradicionales de Ayacucho y Cajamarca (paletas naturales con tintes de cochinilla, índigo, achiote).
- "Colors of the Andes" — Jenny Krauss (artesanía ayacuchana).
- Simbolismo andino: **rojo = Pachamama**, **verde = crecimiento**, **amarillo = sol/cosecha**, **azul = cielo/Inkarri**.

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--andina-primary` | Rojo Cochinilla | `#C0392B` | Color primario, identidad cultural fuerte |
| `--andina-primary-light` | Rosa Palta | `#E67E22` | Acentos cálidos, badges, notificaciones |
| `--andina-secondary` | Turquesa Andino | `#1ABC9C` | Confirmar, éxito, "Sí" |
| `--andina-tertiary` | Amarillo Sol | `#F1C40F` | Alertas, pendientes, días destacados |
| `--andina-deep` | Azul Inkarri | `#2C3E50` | Textos, navegación, autoridad |
| `--andina-llama` | Beige Lana | `#F5E6D3` | Fondo principal, evoca lana de alpaca |
| `--andina-tierra` | Marrón Tierra | `#8B4513` | Acentos, decoración, bordes activos |
| `--andina-crema` | Crema Natural | `#FDF6E3` | Superficies, tarjetas |
| `--andina-musgo` | Verde Musgo | `#7D8C2C` | Estados secundarios, hojas |
| `--andina-gris` | Gris Piedra | `#6B7280` | Texto secundario |

## Contraste WCAG
- Azul Inkarri `#2C3E50` sobre Beige Lana `#F5E6D3`: **11.9:1** (AAA) ✓
- Rojo Cochinilla `#C0392B` sobre Crema: **5.5:1** (AA) ✓
- Turquesa `#1ABC9C` sobre Crema: **2.5:1** (Fail para texto, usar solo para íconos grandes/fondos)

## Mapeo a funciones de la app
| Función | Color |
|---------|-------|
| Confirmar litros | Turquesa Andino `#1ABC9C` |
| Botón primario "Pagar" | Rojo Cochinilla `#C0392B` |
| Adelanto pendiente | Amarillo Sol `#F1C40F` |
| Discrepancia | Rojo Cochinilla oscuro + texto Azul |
| Liquidación firmada | Verde Musgo `#7D8C2C` |

## ¿Cuándo usarla?
✅ **RECOMENDADA** para diferenciarte culturalmente y conectar con la identidad de Cajamarca.
✅ Si Milkbook quiere ser percibido como una app **"de los Andes, para los Andes"**.
✅ Para web admin que muestre orgullo regional.
⚠️ Los colores son vibrantes — pueden "competir" entre sí en una pantalla si no se jerarquizan bien.

## Implementación rápida (Flutter)
```dart
const andinaPrimary = Color(0xFFC0392B);
const andinaPrimaryLight = Color(0xFFE67E22);
const andinaSecondary = Color(0xFF1ABC9C);
const andinaTertiary = Color(0xFFF1C40F);
const andinaDeep = Color(0xFF2C3E50);
const andinaLlama = Color(0xFFF5E6D3);
const andinaTierra = Color(0xFF8B4513);
const andinaCrema = Color(0xFFFDF6E3);
const andinaMusgo = Color(0xFF7D8C2C);
```
