# Paleta 19 — Color-Blind Safe (Paleta de Wong)

> **Identidad**: Diseñada específicamente para ser **100% distinguible** por personas con daltonismo (protanopia, deuteranopia, tritanopia, achromatopsia). Basada en la **Paleta de Wong** (Nature Methods, 2011) — el estándar científico de la industria.

## Inspiración
- **Wong, B. (2011). "Points of view: Color blindness." Nature Methods, 8(6), 441.**
- Toolsana Color Blind Safe Palette.
- Aprox. **8% de hombres y 0.5% de mujeres** tienen algún tipo de daltonismo.
- En zonas rurales de Perú, el porcentaje puede ser mayor por falta de diagnóstico.

## Hex codes (Paleta de Wong original)

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--wong-black` | Negro | `#000000` | Texto, líneas |
| `--wong-orange` | Naranja | `#E69F00` | Punto de datos 1 (P1) |
| `--wong-skyblue` | Azul Cielo | `#56B4E9` | Punto de datos 2 (P2) |
| `--wong-green` | Verde Azulado | `#009E73` | Punto de datos 3 (P3) — Confirmar |
| `--wong-yellow` | Amarillo | `#F0E442` | Punto de datos 4 (P4) — Alerta |
| `--wong-blue` | Azul | `#0072B2` | Punto de datos 5 (P5) — Primario |
| `--wong-vermillion` | Bermellón | `#D55E00` | Punto de datos 6 (P6) — Error |
| `--wong-purple` | Púrpura | `#CC79A7` | Punto de datos 7 (P7) — Acento |

## Paleta adaptada para Milkbook

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--cb-primary` | Azul Wong | `#0072B2` | Color primario |
| `--cb-secondary` | Verde Wong | `#009E73` | Confirmar (✓ distingue de cualquier color) |
| `--cb-warning` | Amarillo Wong | `#F0E442` | Alertas (siempre con texto/icono, nunca solo color) |
| `--cb-error` | Bermellón Wong | `#D55E00` | Errores (distinguible del verde) |
| `--cb-accent` | Naranja Wong | `#E69F00` | Adelantos, pendientes |
| `--cb-info` | Azul Cielo Wong | `#56B4E9` | Info, links |
| `--cb-special` | Púrpura Wong | `#CC79A7` | Categoría especial, destacado |
| `--cb-bg` | Blanco | `#FFFFFF` | Fondo |
| `--cb-text` | Negro | `#000000` | Texto principal |
| `--cb-text-soft` | Gris Oscuro | `#4A4A4A` | Texto secundario |

## Contraste WCAG
- Negro `#000000` sobre Blanco: **21:1** (AAA) ✓
- Azul Wong `#0072B2` sobre Blanco: **6.4:1** (AA) ✓
- Verde Wong `#009E73` sobre Blanco: **3.4:1** (Fail texto — usar como botón grande)
- Bermellón `#D55E00` sobre Blanco: **4.6:1** (AA) ✓
- Azul Cielo `#56B4E9` sobre Blanco: **2.5:1** (Fail — solo íconos grandes)

## Distinción bajo daltonismo

| Tipo | Ve |
|------|----|
| **Normal** | 8 colores claramente distintos |
| **Protanopia** (sin rojo) | 7 colores distintos (rojo se ve amarillo-verdoso) |
| **Deuteranopia** (sin verde) | 7 colores distintos (verde se ve amarillo-anaranjado) |
| **Tritanopia** (sin azul) | 7 colores distintos (azul se ve verdoso) |
| **Achromatopsia** (sin color) | 4 tonos de gris distinguibles por luminancia |

## SIEMPRE combinar color + forma/texto

> ⚠️ **REGLA DE ORO**: En esta paleta, NUNCA uses solo color para comunicar un estado. Combina con:
> - **Forma**: ✓ para éxito, ⚠️ para alerta, ✗ para error
> - **Texto**: "OK", "Cuidado", "Error"
> - **Posición**: Banner superior vs inferior

## ¿Cuándo usarla?
✅ **RECOMENDADA** si Milkbook quiere ser **inclusivo universalmente**.
✅ Combina perfectamente con cualquier paleta primaria (úsala como "modo accesible").
✅ Para dashboards, reportes y gráficos.
⚠️ Visualmente es "menos vibrante" — compensa con buen uso de íconos.
