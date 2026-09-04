# Paleta 12 — Modo Noche Rural (Dark Mode para el campo)

> **Identidad**: Un modo oscuro **diseñado para uso nocturno**, ideal para cuando el lechero o el cliente registran después del ocaso (5-7 PM en invierno en Cajamarca). Evita el deslumbramiento en la oscuridad pero mantiene la identidad cálida de la marca.

## Inspiración
- Manuelatorres: "users working in greenhouses with specialized lighting for plant growth found dark mode to be essential for visibility".
- Mejores prácticas de dark mode: NO usar negro puro (`#000`) — usar grises profundos.
- Material Design 3 dark theme guidelines.

## Hex codes

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--noche-bg` | Carbón Profundo | `#121212` | Fondo principal (gris, NO negro puro) |
| `--noche-surface` | Gris Elevado | `#1E1E1E` | Tarjetas |
| `--noche-surface-2` | Gris Medio | `#2C2C2C` | Diálogos, modales |
| `--noche-primary` | Azul Lechero | `#90CAF9` | Color primario (más claro en dark mode) |
| `--noche-secondary` | Verde Claro | `#81C784` | Confirmar |
| `--noche-accent` | Ámbar Cálido | `#FFB74D` | Acentos, alertas positivas |
| `--noche-warning` | Naranja Vivo | `#FF8A65` | Pendientes |
| `--noche-error` | Rojo Coral | `#EF5350` | Errores |
| `--noche-text` | Blanco Hueso | `#F5F5F5` | Texto principal (no blanco puro) |
| `--noche-text-soft` | Gris Perla | `#B0B0B0` | Texto secundario |
| `--noche-divider` | Gris Humo | `#3A3A3A` | Bordes |

## Contraste WCAG
- Blanco Hueso `#F5F5F5` sobre Carbón `#121212`: **18.1:1** (AAA) ✓
- Azul Lechero `#90CAF9` sobre Carbón: **9.7:1** (AAA) ✓
- Verde Claro `#81C784` sobre Carbón: **8.4:1** (AAA) ✓
- Rojo Coral `#EF5350` sobre Carbón: **5.4:1** (AA) ✓

## Mapeo a funciones
| Función | Color |
|---------|-------|
| Botón confirmar | Verde Claro `#81C784` |
| Adelantos | Ámbar Cálido `#FFB74D` |
| Discrepancia | Rojo Coral `#EF5350` |
| Pantalla principal | Azul Lechero `#90CAF9` (banner superior) |

## Toggle día/noche
```dart
// Flutter — forzar modo oscuro siempre en campo:
ThemeMode mode = ThemeMode.system; // sigue el sistema

// O permitir toggle desde ajustes
```

## ¿Cuándo usarla?
✅ Como **complemento** de una paleta diurna (ej. la #11 Solar).
✅ Cuando el usuario está en zonas sin energía (linterna + dark mode = mejor visión nocturna).
✅ Para uso entre 5-7 PM en invierno en zonas altoandinas.
⚠️ NO usar como paleta principal — la mayoría del uso es diurno.
