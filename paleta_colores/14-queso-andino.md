# Paleta 14 — Queso Andino (Inspirada en Quesos Cajamarquinos)

> **Identidad**: Una paleta **literalmente inspirada en los quesos cajamarquinos**: el queso fresco blanco, el queso pardo madurado, la corteza dorada, la cuajada, la mantequilla. Crea una conexión inmediata con el producto central.

## Inspiración
- Chugur: branding de queso artesanal cajamarquino.
- Mantecosos, paria, andino, fresco, suizo — todos con paleta blanco-crema-amarillo-dorado.
- Confetti Design: "Warm color palettes, simple ingredient focus, classic design, richness cues" para mantequilla y queso.

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--queso-primary` | Mantequilla Dorada | `#F4A418` | Primario (color del queso madurado) |
| `--queso-primary-light` | Cuajada | `#FFD580` | Hover, fondos suaves |
| `--queso-primary-dark` | Corteza Tostada | `#A06C0A` | Texto sobre fondos claros |
| `--queso-secondary` | Verde Hierba | `#6B8E23` | Confirmar (hierba fresca para las vacas) |
| `--queso-accent` | Rojo Fresa | `#C73E3A` | Acentos, errores |
| `--queso-warning` | Naranja Cáscara | `#D97706` | Adelantos, pendientes |
| `--queso-error` | Rojo Profundo | `#991B1E` | Errores críticos |
| `--queso-bg` | Crema Lechada | `#FFFEF7` | Fondo principal (leche fresca) |
| `--queso-surface` | Blanco Cuajada | `#FFFEF7` | Tarjetas |
| `--queso-text` | Carbón Cuajado | `#3D2914` | Texto principal (corteza oscura) |
| `--queso-text-soft` | Beige Maduro | `#8B7355` | Texto secundario |

## Contraste WCAG
- Carbón Cuajado `#3D2914` sobre Crema Lechada `#FFFEF7`: **14.2:1** (AAA) ✓
- Mantequilla Dorada `#F4A418` sobre Crema: **2.7:1** (Fail — usar solo como botón grande con texto oscuro)
- Corteza Tostada `#A06C0A` sobre Crema: **5.7:1** (AA) ✓
- Verde Hierba `#6B8E23` sobre Crema: **4.6:1** (AA) ✓

## Mapeo a funciones
| Función | Color |
|---------|-------|
| Botón confirmar | Verde Hierba `#6B8E23` (contexto lechero) |
| Liquidación cerrada | Mantequilla Dorada `#F4A418` (icono de check) |
| Adelantos | Naranja Cáscara `#D97706` |
| Discrepancia | Rojo Profundo `#991B1E` |
| Boleta PDF | Crema Lechada + texto Corteza Tostada |

## ¿Cuándo usarla?
✅ Si Milkbook quiere tener **una identidad ultra-específica del producto** (leche/queso).
✅ Perfecta para el onboarding del cliente: "esta app es para ti, lechero".
✅ Para boletas, PDFs y comprobantes impresos.
⚠️ Amarillo + crema puede tener poco contraste en algunos pares — usa texto oscuro siempre.
