# Componente: `ClienteDelDiaCard`

> **Vista agnóstica de framework.** Este documento describe el **contrato visual y de datos** de la tarjeta que Carlos ve para cada cliente en su lista "Hoy". La implementación concreta se hará en **Flutter Widget** o **SwiftUI View** según la decisión arquitectónica final (ver `arquitectura-swift-flutter.md`).
>
> Esta vista aparece **en la pantalla "Hoy"** del Home del lechero (la que abre apenas se sube a la moto). Es el elemento más usado del día: Carlos toca una tarjeta para abrir la pantalla de `ConfirmarRecoleccion` del cliente.

---

## Propósito

Mostrar de un vistazo, en una sola línea visual:

1. **Quién es** el cliente (nombre, opcional foto).
2. **Qué pasó** el el registro de hoy (estado actual + cantidad si la hay).
4. **Qué debe hacer** Carlos (acción implícita según estado).

Sin scroll, con un solo tap se navega al detalle/acción.

---

## Contrato de la vista

### Datos de entrada (props)

```typescript
interface ClienteDelDiaCardProps {
  // Identidad del cliente
  clienteId: string;
  clienteNombre: string;             // "Juan Pérez López"
  clienteDni: string;                 // "11223344"
  clienteFotoUrl?: string;            // null si no tiene foto
  
  // Orden sugerido (en la ruta del día)
  ordenRuta: number;                  // 1, 2, 3...
  
  // Estado del registro de hoy
  registro: {
    id: string;
    fecha: string;                    // ISO date "2026-09-18"
    estado: EstadoRegistro;          // ver enum abajo
    litrosCarlos?: number;            // si Carlos ya registró
    litrosCliente?: number;           // si vendedor ya registró
    registradoPorVendedorAt?: string; // ISO datetime
    recogidoPorCarlosAt?: string;    // ISO datetime
    disputa: boolean;                 // si hay discrepancia grande
  };
  
  // Última visita previa (para contexto)
  ultimaVisita: {
    fecha: string;
    litros: number;
    diasAtras: number;                // 0 = hoy, 1 = ayer, etc.
  };
  
  // Configuración visual
  showOrdenRuta: boolean;             // mostrar el número 1, 2, 3...
  showFoto: boolean;                  // default true si hay URL
  
  // Acciones
  onTap: () => void;                  // tap en la card → abre ConfirmarRecoleccion
  onLlamar?: () => void;              // long-press o botón llamar
  onWhatsApp?: () => void;            // long-press o botón WhatsApp
}
```

### Estados visuales (enum `EstadoRegistro` del componente)

Estos son los estados que la card muestra con un **chip/badge** de color:

| Estado | Color del chip | Ícono | Significado para Carlos |
|---|---|---|---|
| `PENDIENTE` | Gris | ⏸ | Nadie ha registrado. Carlos debe llegar y abrir la pantalla. |
| `ESPERANDO_LECHERO` | Azul claro | 🔵 | Vendedor ya registró. Carlos debe llegar, verificar y marcar "✓ recogido". |
| `ESPERANDO_VENDEDOR` | Amarillo | 🟡 | Carlos ya marcó "✓ recogido". Solo falta que el vendedor confirme. (No requiere acción de Carlos.)). |
| `RECOGIDO_COINCIDE` | Verde | ✓ | Todo listo, falta firma del vendedor. No requiere acción. |
| `RECOGIDO_DISCREPANCIA` | Naranja | ⚠ | Hubo discrepancia, falta resolver al cierre. |
| `RECOGIDO_SIN_CONFIRMAR` | Amarillo oscuro | ⏳ | Carlos registró solo. Vendedor tiene 24 h para confirmar. |
| `NO_VENDIO` | Gris oscuro | ✕ | No se vendió leche ese día. Sin acción. |

### Colores por estado

| Estado | Background | Border | Ícono principal |
|---|---|---|---|
| `PENDIENTE` | `#F5F5F5` (gris claro) | `1px solid #BDBDBD` | `#616161` |
| `ESPERANDO_LECHERO` | `#E3F2FD` (azul muy claro) | `2px solid #1976D2` | `#1976D2` |
| `ESPERANDO_VENDEDOR` | `#FFF8E1` (amarillo muy claro) | `2px solid #F9A825` | `#F9A825` |
| `RECOGIDO_COINCIDE` | `#E8F5E9` (verde muy claro) | `2px solid #2E7D32` | `#2E7D32` |
| `RECOGIDO_DISCREPANCIA` | `#FFF3E0` (naranja muy claro) | `2px solid #E65100` | `#E65100` |
| `RECOGIDO_SIN_CONFIRMAR` | `#FFF8E1` (amarillo) | `2px solid #F57F17` | `#F57F17` |
| `NO_VENDIO` | `#EEEEEE` (gris más oscuro) | `1px solid #9E9E9E` | `#616161` |

> Ver `../../diseno-ux/paleta-estados/paleta-estados-registro.md` para el detalle completo de la paleta y la justificación de uso.

---

## Layout visual (estructura)

```
┌──────────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════════╗   │
│  ║ [1]  [📷]  Juan Pérez López              [▸]   ║   │  ← fila 1: orden + foto + nombre + flecha
│  ║           ⏳ ESPERANDO_LECHERO · 17 L         ║   │  ← fila 2: estado + cantidad
│  ║           hace 35 min · última: ayer 18 L     ║   │  ← fila 3: timestamp + contexto
│  ╚══════════════════════════════════════════════════╝   │
│                                                          │
│  ╔══════════════════════════════════════════════════╗   │
│  ║ [2]  [📷]  Pedro Huamán                    [▸]   ║   │
│  ║           ⚪ PENDIENTE                          ║   │
│  ║           hoy sin registro · última: hoy 16 L ║   │
│  ╚══════════════════════════════════════════════════╝   │
└──────────────────────────────────────────────────────────┘
```

### Estructura interna (3 filas)

**Fila 1 — Identidad + navegación:**
- `[ordenRuta]` número grande (24sp bold, color primario).
- `[foto]` circular 48×48 dp (si hay). Si no, inicial del nombre en círculo gris.
- `[nombre]` (18sp bold).
- `[▸]` flecha indicando que es tappeable.

**Fila 2 — Estado + cantidad:**
- `[chip de estado]` con ícono + texto + color de fondo.
- `[cantidad]` solo si hay litros registrados por el vendedor: "17 L" en grande.
- Si hay discrepancia: muestra ambos valores "16.5 / 17 L ⚠".

**Fila 3 — Timestamp + contexto:**
- Tiempo relativo: "hace 35 min", "ayer", "hoy 06:30".
- Última visita previa: "última: ayer 18 L" o "última: hoy 16 L".

---

## Layout compacto (variante "lista")

```
┌──────────────────────────────────────────────────────┐
│ [1] Juan Pérez L.                       [▸]         │
│      ⏳ 17 L · ESPERANDO_LECHERO · hace 35 min     │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│ [2] Pedro Huamán                         [▸]         │
│      ⚪ PENDIENTE · hoy · última 16 L                │
└──────────────────────────────────────────────────────┘
```

> Esta variante la define la vista "Detalle" del módulo "Mis clientes" (ver `../mis-clientes-busqueda.md`).

---

## Comportamiento

### Tap en la card

- Navega a `ConfirmarRecoleccionScreen` con el `clienteId` y `registroId` del día actual.
- Si el registro es de **otro día** (no el actual), navega al detalle histórico del registro.

### Long-press

- Muestra menú contextual: `[Llamar]`, `[WhatsApp]`, `[Ver historial]`.

### Animaciones

- **Tap → ConfirmarRecop:** transición slide-from-right (200ms).
- **Cambio de estado:** si Carlos abre la app y el estado del cliente cambió desde la última vez (de `PENDIENTE` a `ESPERANDO_LECHERO` por ejemplo), la card hace un pulse animation 1 vez (300ms) para llamar la atención.
- **Orden de aparición:** si Carlos sincroniza offline y aparecen nuevos registros, aparecen en su posición de ruta con un fade-in.

### Estados de carga

- **Sync pendiente:** la card muestra un dot pequeño azul animado junto al chip de estado, indicando "pendiente de sincronizar".
- **Sin conexión:** el chip de estado tiene un borde punteado en lugar de sólido.

### Accesibilidad

- Toda la card es un único botón accesible con `label` = `"Confirmar litros de Juan Pérez López, hoy 17 L"`.
- El chip de estado tiene `label` adicional: `"Estado: esperando al lechero"`.
- Compatible con VoiceOver / TalkBack.
- Contraste mínimo 4.5:1 entre texto y fondo (verificado en paleta).
- Tamaño mínimo de tap: 80 dp de alto (la card completa es tappeable, no elementos internos).

---

## Implementación de referencia

### Flutter Widget (si se elige Flutter para esta vista)

```dart
class ClienteDelDiaCard extends StatelessWidget {
  final ClienteDelDiaCardProps props;
  
  const ClienteDelDiaCard({Key? key, required this.props}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    final estadoVisual = EstadoVisual.fromEstado(props.registro.estado);
    
    return InkWell(
      onTap: props.onTap,
      onLongPress: () => _mostrarMenuContextual(),
      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: estadoVisual.background,
          border: Border.all(
            color: estadoVisual.borderColor,
            width: estadoVisual.borderWidth,
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Fila 1: orden + foto + nombre + flecha
            Row(children: [
              if (props.showOrdenRuta) _buildOrden(),
              if (props.showFoto) _buildFoto(context),
              Expanded(child: _buildNombre()),
              Icon(Icons.chevron_right, color: estadoVisual.iconColor),
            ]),
            SizedBox(height: 8),
            // Fila 2: estado + cantidad
            Row(children: [
              _buildChipEstado(estadoVisual),
              Spacer(),
              if (props.registro.litrosCliente != null)
                _buildCantidad(),
            ]),
            SizedBox(height: 4),
            // Fila 3: timestamp + contexto
            _buildTimestamp(),
          ],
        ),
      ),
    );
  }
  
  // ... helpers privados para cada sub-widget
}
```

### SwiftUI View (si se elige Swift para esta vista)

```swift
struct ClienteDelDiaCard: View {
    let props: ClienteDelDiaCardProps
    
    var body: some View {
        let estadoVisual = EstadoVisual.from(props.registro.estado)
        
        Button(action: props.onTap) {
            VStack(alignment: .leading, spacing: 8) {
                // Fila 1
                HStack {
                    if props.showOrdenRuta {
                        Text("\(props.ordenRuta)")
                            .font(.system(size: 24, weight: .bold))
                    }
                    if props.showFoto, let url = props.clienteFotoUrl {
                        AsyncImage(url: url) { image in
                            image.resizable().clipShape(Circle)
                        } placeholder: {
                            Circle().fill(Color.gray.opacity(0.3))
                        }
                        .frame(width: 48, height: 48)
                    }
                    Text(props.clienteNombre)
                        .font(.system(size: 18, weight: .semibold))
                    Spacer()
                    Image(systemName: "chevron.right")
                        .foregroundStyle(estadoVisual.iconColor)
                }
                
                // Fila 2
                HStack {
                    chipEstado(estadoVisual)
                    Spacer()
                    if let litros = props.registro.litrosCliente {
                        Text("\(litros, specifier: "%.1f") L")
                            .font(.system(size: 18, weight: .bold))
                    }
                }
                
                // Fila 3
                Text("\(timestampRelativo()) · última: \(ultimaVisita)")
                    .font(.system(size: 12))
                    .foregroundStyle(.secondary)
            }
            .padding(16)
            .background(estadoVisual.background)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(estadoVisual.borderColor, lineWidth: estadoVisual.borderWidth)
            )
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
        .frame(minHeight: 80)
        .accessibilityLabel("Confirmar litros de \(props.clienteNombre)")
    }
}
```

---

## Datos auxiliares

### `EstadoVisual` helper

```typescript
class EstadoVisual {
  final String background;     // hex
  final String borderColor;    // hex
  final double borderWidth;    // 1 o 2
  final String iconColor;      // hex
  final String icon;           // nombre del ícono
  final String label;          // "ESPERANDO_LECHERO"
  
  static EstadoVisual fromEstado(EstadoRegistro estado) {
    switch (estado) {
      case PENDIENTE:
        return EstadoVisual('#F5F5F5', '#BDBDBD', 1, '#616161', 'pause.circle', 'PENDIENTE');
      case ESPERANDO_LECHERO:
        return EstadoVisual('#E3F2FD', '#1976D2', 2, '#1976D2', 'clock.arrow.circlepath', 'ESPERANDO LE');
      // ... etc
    }
  }
}
```

### Timestamp relativo

```typescript
String timestampRelativo(String iso) {
  final dt = DateTime.parse(iso);
  final diff = DateTime.now().difference(dt);
  if (diff.inMinutes < 60) return 'hace ${diff.inMinutes} min';
  if (diff.inHours < 24) return 'hace ${diff.inHours} h';
  if (diff.inDays == 1) return 'ayer';
  if (diff.inDays < 7) return 'hace ${diff.inDays} días';
  return DateFormat('d MMM').format(dt); // "15 sept"
}
```

---

## Métricas UX

- **Tiempo medio para identificar al cliente siguiente:** target < 3 segundos.
- **% de cards que Carlos toca en su lista diaria:** target > 95% (no debe saltarse ninguna).
- **% de clientes que requieren scroll** (no entran en pantalla): target < 10% (la mayoría debe verse sin scroll).
- **Errores de tap** (toqué la card equivocada): target < 2%.

---

## Casos edge

### El cliente cambió de foto
- La card muestra placeholder mientras carga.
- Si falla la carga, muestra la inicial del nombre.

### El cliente tiene 2 contratos activos (caso raro)
- La card prioriza el contrato más reciente.
- Muestra un badge "2 contratos" en la esquina.

### Carlos no tiene ruta configurada
- `showOrdenRuta = false`.
- Se ordenan los clientes por orden alfabético (default).

### El registro de hoy ya está cerrado (caso edge)
- La card sigue apareciendo hasta que Carlos salga del día (medianoche).
- Se ve con el chip `RECOGIDO_COINCIDE` en verde.

### Cliente nuevo (sin visita previa)
- `ultimaVisita.diasAtras = null`.
- Se muestra "primera visita" en la fila 3.

---

## Próximo documento

- `../../diseno-ux/paleta-estados/paleta-estados-registro.md` — detalle de la paleta de colores por estado.