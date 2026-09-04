# Paleta de Colores por Estado del Registro (v3)

> **Documento vivo.** Define los colores, íconos y patrones visuales asociados a cada estado de un `RegistroDiario`. Se usa en todas las vistas donde aparece un chip, badge, banner o fondo de un registro: `ClienteDelDiaCard`, `ConfirmarRecoleccionScreen`, listas de quincena, home del cliente, etc.

---

## Principios de diseño de color

###1. Cada estado tiene UN color principal + un fondo suave

- **Fondo suave** (`background`): tono pastel que cubre la card/banner sin cansar la vista.
- **Color principal** (`border` + `icon`): tono fuerte para el borde y los íconos del chip.
- **Texto** siempre gris oscuro (`#212121`) sobre el fondo suave para mantener legibilidad.

### 2. Estados progresivos van de gris → azul → amarillo → verde

La paleta sigue una **escala de progreso natural**:

```
[Sin acción]  →  [Pendiente de alguien]  →  [Acción intermedia]  →  [Completo]

   PENDIENTE          ESPERANDO_LECHERO        ESPERANDO_VENDEDOR       RECOGIDO_COINCIDE
   (gris)               (azul claro)              (amarillo)                  (verde)
```

Esto permite que el ojo del usuario identifique **"dónde estoy en el flujo"** sin leer texto.

### 3. Colores basados en convenciones universales

- **Verde = OK** (terminó bien).
- **Amarillo = advertencia** (pendiente de algo).
- **Naranja = discrepancia** (algo no cuadra).
- **Rojo = problema / cancelación** (no se vendió / error).
- **Azul = acción esperada** (el otro debe hacer algo).
- **Gris = neutro** (sin información aún).

### 4. Accesibilidad WCAG 2.1 AA

Todos los fondos suaves tienen **contraste mínimo 4.5:1** contra el texto `#212121`. Los bordes y los íconos tienen contraste mínimo 3:1 contra el fondo.

---

## Tabla maestra de estados

| Estado | Background | Border | Icon color | Ícono | Significado |
|---|---|---|---|---|---|
| `PENDIENTE` | `#F5F5F5` | `#BDBDBD` (1px) | `#616161` | ⏸ `pause.circle` | Nadie ha registrado nada este día |
| `ESPERANDO_LECHERO` | `#E3F2FD` | `#1976D2` (2px) | `#1976D2` | 🔵 `clock.arrow.circlepath` | El vendedor registró; falta que Carlos marque "✓ recogido" |
| `ESPERANDO_VENDEDOR` | `#FFF8E1` | `#F9A825` (2px) | `#F9A825` | 🟡 `clock` | Carlos ya marcó "✓ recogido"; falta que el vendedor confirme con firma |
| `RECOGIDO_COINCIDE` | `#E8F5E9` | `#2E7D32` (2px) | `#2E7D32` | ✅ `checkmark.circle.fill` | Ambos lados coinciden; falta firma del vendedor |
| `RECOGIDO_DISCREPANCIA` | `#FFF3E0` | `#E65100` (2px) | `#E65100` | ⚠ `exclamationmark.triangle.fill` | Hubo recogida con valores distintos; falta resolver |
| `RECOGIDO_SIN_CONFIRMAR` | `#FFF8E1` | `#F57F17` (2px) | `#F57F17` | ⏳ `hourglass` | Carlos registró solo; vendedor tiene 24 h para confirmar |
| `NO_VENDIO` | `#EEEEEE` | `#9E9E9E` (1px) | `#616161` | ✕ `xmark.circle` | El cliente confirmó que no vendió ese día |
| `CARLOS_NO_VINO` | `#FAFAFA` | `#BDBDBD` (1px, dashed) | `#757575` | 🚫 `person.fill.xmark` | Carlos no pasó ese día (legacy) |

> Los íconos siguen la nomenclatura de SF Symbols (iOS) / Material Icons (Flutter) según el framework que se use.

---

## Tokens semánticos

Para que el código sea mantenible, se definen **tokens semánticos** que apuntan a los hex de arriba:

```typescript
// diseno-ux/paleta-estados/colors.ts (TypeScript) o colors.dart (Flutter)
export const EstadoColores = {
  PENDIENTE: {
    background: '#F5F5F5',
    border: '#BDBDBD',
    borderWidth: 1,
    icon: '#616161',
    text: '#212121',
    iconName: 'pause.circle',
    label: 'Pendiente',
  },
  ESPERANDO_LECHERO: {
    background: '#E3F2FD',
    border: '#1976D2',
    borderWidth: 2,
    icon: '#1976D2',
    text: '#212121',
    iconName: 'clock.arrow.circlepath',
    label: 'Esperando al lechero',
  },
  // ... etc
} as const;
```

```swift
// Swift
extension UIColor {
    static let pendienteBg = UIColor(hex: "#F5F5F5")
    static let pendienteBorder = UIColor(hex: "#BDBDBD")
    static let esperandoLecheroBg = UIColor(hex: "#E3F2FD")
    static let esperandoLecheroBorder = UIColor(hex: "#1976D2")
    // ... etc
}
```

---

## Aplicación por componente

### `ClienteDelDiaCard` (lechero — vista "Hoy")

| Estado | Render |
|---|---|
| `PENDIENTE` | Fondo gris claro, ícono pausa, sin valor numérico |
| `ESPERANDO_LECHERO` | Fondo azul claro, ícono reloj, valor grande "17 L" (lo que registró el vendedor) |
| `ESPERANDO_VENDEDOR` | Fondo amarillo claro, ícono reloj, valor del lechero, sin acción para Carlos |
| `RECOGIDO_COINCIDE` | Fondo verde muy claro, check, sin acción |
| `RECOGIDO_DISCREPANCIA` | Fondo naranja muy claro, triángulo, badge "⚠ discrepancia" |
| `RECOGIDO_SIN_CONFIRMAR` | Fondo amarillo oscuro, hourglass, badge "⏳ vendedor no confirmó" |
| `NO_VENDIO` | Fondo gris más oscuro, X, badge "no se vendió" |

> Ver [`../../app-movil/lechero/componentes/cliente-del-dia-card.md`](../../app-movil/lechero/componentes/cliente-del-dia-card.md) para el layout completo.

### `ConfirmarRecoleccionScreen` (lechero — pantalla crítica del día)

El banner superior muestra el estado con el mismo color. Abajo del banner, los **3 botones grandes** usan colores fijos:

| Botón | Color | Significado |
|---|---|---|
| **"✓ Recogido: X L (coincide)"** | Verde (`#2E7D32`) fondo, blanco texto | Caso A normal |
| **"⚠ Recogido con diferencia"** | Amarillo (`#F9A825`) | Caso A.b discrepancia |
| **"✕ No recogí"** | Rojo (`#C62828`) | Carlos confirma que no recogió |
| **"✓ Registrar y marcar recogido"** | Verde (`#2E7D32`) | Caso B |

> Los botones grandes siempre mantienen estos 3 colores fijos, independientemente del estado del registro. Esto crea un patrón visual consistente.

### `ConfirmarLitros` del cliente (vendedor)

| Estado al que llega Juan | Banner |
|---|---|
| `ESPERANDO_LECHERO` (esperando) | "Esperando que Carlos recoja tu leche" — fondo azul claro |
| `RECOGIDO_COINCIDE` (Carlos ya marcó) | Banner verde: "Carlos recogió 17 L. Confirma con tu huella." |
| `RECOGIDO_DISCREPANCIA` | Banner naranja: "Carlos recogió 16.5 L. Tú habías puesto 17 L. Diferencia: 0.5 L" |
| `RECOGIDO_SIN_CONFIRMAR` | Banner amarillo: "Carlos registró 16.5 L porque no lo hiciste tú. ¿Confirmas?" |
| `NO_VENDIO` | Banner gris: "No vendiste hoy" |

### `Mi Contrato` del cliente (resumen quincenal)

- Días `PENDIENTE`: chip sin color, ícono calendario.
- Días `RECOGIDO_COINCIDE`: chip verde con check.
- Días con discrepancia: chip naranja.
- Días `NO_VENDIO`: chip gris con X.

### `Sacar Cuentas` (lechero — pantalla crítica quincenal)

Cada fila de la tabla de días usa el color del estado del registro. Adicionalmente:

- Días `RECOGIDO_DISCREPANCIA`: la fila tiene un **icono de "tirar"** (papelera) al lado para resolver.
- Días `NO_VENDIO`: la fila tiene tachado y texto "no vendido".

---

## Modo oscuro (dark mode)

Los fondos suaves se invierten, los border/iconos se mantienen o se ajustan ligeramente:

| Estado | Background (dark) | Border (dark) | Icon (dark) |
|---|---|---|---|
| `PENDIENTE` | `#2A2A2A` | `#616161` | `#BDBDBD` |
| `ESPERANDO_LECHERO` | `#0D47A1` (20% opacity sobre fondo) | `#90CAF9` | `#90CAF9` |
| `ESPERANDO_VENDEDOR` | `#F57F17` (15% opacity) | `#FFD54F` | `#FFD54F` |
| `RECOGIDO_COINCIDE` | `#1B5E20` (20% opacity) | `#A5D6A7` | `#A5D6A7` |
| `RECOGIDO_DISCREPANCIA` | `#BF360C` (15% opacity) | `#FFAB91` | `#FFAB91` |
| `RECOGIDO_SIN_CONFIRMAR` | `#E65100` (15% opacity) | `#FFCC80` | `#FFCC80` |
| `NO_VENDIO` | `#212121` | `#757575` | `#9E9E9E` |

> Implementación: usar `Color.alpha` sobre fondo dark `#121212` o `#1E1E1E`.

---

## Animaciones de transición entre estados

Cuando un registro cambia de estado, la card puede hacer un pulse animation 1 vez:

| Transición | Animación |
|---|---|
| `PENDIENTE` → `ESPERANDO_LECHERO` | Pulse azul 300ms (entrada del vendedor) |
| `ESPERANDO_LECHERO` → `RECOGIDO_COINCIDE` | Pulse verde 300ms (Carlos recogió) |
| `RECOGIDO_COINCIDE` → `RECOGIDO_DISCREPANCIA` | Shake naranja 500ms (algo no cuadra) |
| Cualquier estado → `NO_VENDIO` | Fade-out gris 200ms |

```typescript
// Ejemplo Flutter
class EstadoTransitionAnimator {
  static Widget pulse(BuildContext context, Widget child, EstadoRegistro nuevoEstado) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 1.0, end: 1.0),
      duration: Duration(milliseconds: 300),
      builder: (context, value, child) {
        return Transform.scale(scale: value, child: child);
      },
      child: child,
    );
  }
}
```

---

## Casos especiales de color

### Disputa activa

- Cuando un registro tiene una `Disputa` abierta, **toda la card se tiñe de naranja fuerte** (`#E65100` borde 3px) con un ícono de escudo.
- El header del banner cambia: "⚠ Disputa abierta — ver con admin".

### Confirmación pendiente de más de 24 h

- `RECOGIDO_SIN_CONFIRMAR` vencido se vuelve **rojo claro** (`#FFEBEE` fondo, `#C62828` borde).
- Banner: "Vendedor no confirmó en 24 h. Se usó valor del lechero."

### Cliente dado de baja

- Card con **opacidad 50%**, ícono de "persona tachada".
- No es interactivo; redirige a "Ver historial" si se toca.

---

## Pruebas visuales recomendadas

Para cada estado, hacer capturas en:

- iPhone SE (pantalla pequeña 4.7").
- iPhone 14 Pro Max (pantalla grande).
- Modo claro y oscuro.
- Con y sin foto del cliente.
- Con texto dinámico grande (accesibilidad).

Comparar con `../../diseno-ux/low-literacy/principios-diseno.md` para verificar:

- Contraste mínimo 4.5:1 (texto sobre fondo).
- Tamaño de texto ≥ 16sp (chip y nombre).
- Tap target ≥ 48dp (toda la card es tappeable).

---

## Relación con paleta general del producto

Esta paleta de estados **se complementa con** la paleta general del producto (ver `../../diseno-ux/low-literacy/principios-diseno.md`):

| Color general | Uso | Hex |
|---|---|---|
| Verde confianza | Confirmar acción positiva | `#2E7D32` |
| Azul leche | Primario, branding | `#1976D2` |
| Amarillo alerta | Advertencia, pendiente | `#F9A825` |
| Rojo discrepancia | Error, cancelar | `#C62828` |
| Gris texto | Texto principal | `#212121` |

Los tokens de estado (`ESPERANDO_LECHERO.bg = #E3F2FD`) son **versiones pastel** de los colores generales:

- `#E3F2FD` es el `#1976D2` (azul) mezclado con blanco.
- `#E8F5E9` es el `#2E7D32` (verde) mezclado con blanco.
- `#FFF8E1` es el `#F9A825` (amarillo) mezclado con blanco.

---

## Próximos pasos

1. Crear los archivos de tokens (`colors.ts` o `colors.dart`) en el proyecto real.
2. Implementar el helper `EstadoVisual.fromEstado()`` en cada framework.
3. Aplicar en los componentes existentes (`ClienteDelDiaCard`, `ConfirmarRecoleccionScreen`).
4. Validar visualmente con usuarios reales (test de usabilidad, ver `../../diseno-ux/low-literacy/principios-diseno.md`).
5. Iterar según feedback (especialmente sobre la distinción entre amarillo-naranja-amarillo oscuro).