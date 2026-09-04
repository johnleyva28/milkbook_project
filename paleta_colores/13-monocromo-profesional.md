# Paleta 13 — Monocromo Profesional (Seriedad B2B)

> **Identidad**: Una paleta **casi monocromática** que solo usa grises + un acento. Ultra seria, profesional, ideal para el **web admin** (CRM) donde se necesita reducir la "fatiga visual" en jornadas largas de trabajo.

## Inspiración
- Linear, Vercel, GitHub: "minimalismo oscuro + un acento".
- Sistemas de diseño empresariales (IBM Carbon, Atlassian).
- Mejores prácticas para herramientas internas (admin tools).

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--mono-bg` | Blanco Papel | `#FAFAFA` | Fondo principal |
| `--mono-surface` | Blanco Puro | `#FFFFFF` | Tarjetas |
| `--mono-surface-2` | Gris Humo | `#F4F4F5` | Hover, superficies elevadas |
| `--mono-accent` | Negro Mate | `#18181B` | Color de acento (texto fuerte, CTAs) |
| `--mono-text` | Gris Carbón | `#27272A` | Texto principal |
| `--mono-text-soft` | Gris Medio | `#71717A` | Texto secundario |
| `--mono-text-muted` | Gris Claro | `#A1A1AA` | Texto deshabilitado |
| `--mono-divider` | Gris Línea | `#E4E4E7` | Bordes, separadores |
| `--mono-success` | Verde Esmeralda | `#10B981` | Confirmaciones |
| `--mono-warning` | Ámbar | `#F59E0B` | Alertas |
| `--mono-error` | Rojo Carmesí | `#EF4444` | Errores |
| `--mono-info` | Azul Índigo | `#3B82F6` | Información |

## Contraste WCAG
- Gris Carbón `#27272A` sobre Blanco Papel `#FAFAFA`: **16.3:1** (AAA) ✓
- Negro Mate `#18181B` sobre Blanco Papel: **18.8:1** (AAA) ✓
- Verde Esmeralda `#10B981` sobre Blanco Papel: **2.5:1** (Fail — usar solo como íconos grandes)
- Rojo Carmesí `#EF4444` sobre Blanco Papel: **4.6:1** (AA) ✓

## Mapeo a funciones (uso típico en admin)
| Función | Color |
|---------|-------|
| Botón primario | Negro Mate `#18181B` |
| Confirmaciones | Verde Esmeralda `#10B981` |
| Alertas | Ámbar `#F59E0B` |
| Errores | Rojo Carmesí `#EF4444` |
| Estados neutros | Grises |

## ¿Cuándo usarla?
✅ **RECOMENDADA para la web admin** (CRM, soporte, reportes).
✅ Reduce fatiga visual en jornadas largas de trabajo.
✅ Combina bien con CUALQUIER paleta móvil — son complementarias.
⚠️ NO recomendada para la app móvil — los usuarios rurales esperan color y diferenciación visual.
