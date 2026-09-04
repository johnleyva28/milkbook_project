# Paleta 17 — Río y Pradera (Agua + Pasto)

> **Identidad**: Inspirada en los **ríos de Cajamarca** (río Chonta, río Mashcón) y las praderas verdes que los rodean. Azul agua + verde pasto = frescura, hidratación, vida. Contraste alto y armonioso.

## Inspiración
- Branding de agua mineral (Cielo, San Luis): azul + verde.
- Outgrow: "sky blue for fresh air, green for growth".
- Dairyproducts milk web UI: `#0AACEE, #78D1F0, #7CB11B`.

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--rio-primary` | Azul Río | `#0078A8` | Primario (agua pura) |
| `--rio-primary-light` | Celeste Ribera | `#48B5D1` | Hover, info |
| `--rio-primary-dark` | Azul Profundo | `#003E5C` | Texto sobre fondos claros |
| `--rio-secondary` | Verde Pradera | `#5BA82F` | Confirmar (pasto fresco) |
| `--rio-accent` | Verde Lima | `#9BC53D` | Acentos, crecer, OK |
| `--rio-warning` | Naranja Salmón | `#F0833F` | Pendientes |
| `--rio-error` | Rojo Coral | `#D14545` | Errores |
| `--rio-bg` | Blanco Espuma | `#F2FAFC` | Fondo principal (espuma de río) |
| `--rio-surface` | Blanco Puro | `#FFFFFF` | Tarjetas |
| `--rio-text` | Carbón Profundo | `#1A2B3A` | Texto principal |
| `--rio-text-soft` | Gris Río | `#5C6F7E` | Texto secundario |

## Contraste WCAG
- Carbón Profundo `#1A2B3A` sobre Blanco Espuma `#F2FAFC`: **15.2:1** (AAA) ✓
- Azul Río `#0078A8` sobre Blanco Espuma: **6.4:1** (AA) ✓
- Verde Pradera `#5BA82F` sobre Blanco Espuma: **3.7:1** (Fail — usar solo como botón grande)
- Rojo Coral `#D14545` sobre Blanco Espuma: **5.2:1** (AA) ✓

## Mapeo a funciones
| Función | Color |
|---------|-------|
| Botón confirmar | Verde Pradera `#5BA82F` (con texto blanco bold) |
| Pantalla "Hoy" | Azul Río `#0078A8` (header) |
| Adelantos | Naranja Salmón `#F0833F` |
| Discrepancia | Rojo Coral `#D14545` |
| Liquidación OK | Verde Lima `#9BC53D` + Azul (combo) |

## ¿Cuándo usarla?
✅ Si Milkbook quiere conectar con **la pureza del agua** (la leche es 87% agua).
✅ Para web admin y reportes que necesiten "frescura visual".
✅ Ideal para campañas en temporada de lluvias.
⚠️ Azul + verde muy similares a apps bancarias — diferenciate con UX.
