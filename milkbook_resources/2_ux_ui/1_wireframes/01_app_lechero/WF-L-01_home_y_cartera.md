# WF-L-01: Home + Cartera — App Lechero (Carlos)

## Propósito
Mostrar la vista principal que Carlos ve al abrir la app. Debe darle (1) la ruta del día con progreso, (2) alertas accionables, y (3) acceso rápido a su cartera completa de clientes.

## Datos que muestra
- Fecha actual
- Saludo personalizado ("Buenos días, Carlos")
- Alertas: discrepancias pendientes, adelantos sin confirmar, cambios de precio, clientes nuevos
- Progreso de la ruta: X de Y clientes visitados hoy
- Lista de clientes pendientes del día (con hora estimada y litros si ya registró)
- Botón rápido: agregar nuevo cliente
- Bottom nav: Inicio · Clientes · Quincena · Reportes

## Acciones disponibles
- Tocar un cliente: ir a WF-L-02 (registrar visita)
- Tocar "Agregar cliente": ir a flujo de alta de cliente
- Tocar una alerta: ir al detalle correspondiente
- Ver todos los clientes: scroll vertical

## Estados
- **Vacío:** Carlos aún no tiene clientes en su cartera.
- **Cargado:** vista normal con ruta.
- **Ruta completa:** todos los clientes visitados (mensaje "Listo por hoy").
- **Offline:** banner amarillo "Sin internet — cambios guardados localmente".

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ Buenos días, Carlos     🔔  ⚙️      │
│ 📅 Martes 17 sept 2026                │
├──────────────────────────────────────┤
│                                       │
│ 🔔 ALERTAS (3)                       │
│ ┌──────────────────────────────────┐ │
│ │ ⚠ Juan Pérez "no vendí" ayer.   │ │
│ │   Verifica si es correcto.       │ │
│ ├──────────────────────────────────┤ │
│ │ ⚠ 2 discrepancias sin resolver.  │ │
│ │   Cierre en 3 días.              │ │
│ ├──────────────────────────────────┤ │
│ │ ⚠ Precio cambió a S/ 1.55/L     │ │
│ │   para nuevos contratos.          │ │
│ └──────────────────────────────────┘ │
│                                       │
│ TU RUTA DE HOY                        │
│ ┌──────────────────────────────────┐ │
│ │ 7 / 15 clientes         47%      │ │
│ │ ▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱                  │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌─ + Agregar cliente ────────────┐  │
│ │ 🆕 Por DNI, sin papeles          │  │
│ └─────────────────────────────────┘  │
│                                       │
│ CLIENTES PENDIENTES (8)               │
│ ┌──────────────────────────────────┐ │
│ │ [JP] Juan Pérez              — L │ │
│ │      📍 Caserío El Tambo         │ │
│ │      ⏱ 8:30 AM                   │ │
│ ├──────────────────────────────────┤ │
│ │ [MG] María Gómez            ✓ L │ │
│ │      📍 Caserío La Pampa         │ │
│ │      ⏱ 9:15 AM                   │ │
│ ├──────────────────────────────────┤ │
│ │ [PD] Pedro Díaz ⚠           — L │ │
│ │      📍 Caserío Alto Perú        │ │
│ │      ⚠ 1 discrepancia ayer       │ │
│ ├──────────────────────────────────┤ │
│ │ [RL] Rosa López              — L │ │
│ │      📍 Caserío Santa Rosa       │ │
│ │      ⏱ 10:00 AM                  │ │
│ └──────────────────────────────────┘ │
│ [Ver 2 clientes más ↓]                │
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  👥Clientes  📋Quincena  📊│
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones de diseño

1. **Banner de alertas arriba:** Las 3 alertas más relevantes. Si hay más, se accede vía "Ver todas".
2. **Progreso de ruta con porcentaje:** Carlos tiene una motivación clara de completar su ruta.
3. **Lista plana de pendientes:** Sin scroll horizontal, sin tabs. Carlos necesita ver rápido "a quién le toca".
4. **Indicador "✓" en María Gómez:** Le dice que ya registró. Carlos sabe que no tiene que volver a ese cliente hoy.
5. **Indicador "⚠" en Pedro Díaz:** Llama atención sobre discrepancia. Carlos puede tocar para resolver.

### Decisiones de copy

- **"Buenos días" vs "Buenas tardes":** saluda según hora del día.
- **"Tu ruta de hoy":** propiedad. Es SU ruta.
- **"Pendientes (8)":** número claro. Carlos sabe exactamente cuánto le falta.
- **NO usar:** "Estimado Carlos", "Sr. Mendoza", formalismos.

### Decisiones de estado

- **Si Carlos no tiene clientes:** mostrar mensaje "Aún no tienes clientes. Agrega tu primero por DNI." + botón prominente.
- **Si está offline:** banner amarillo arriba "Sin internet — tus cambios se guardan localmente".
- **Si la ruta está completa (15/15):** mostrar "¡Listo por hoy! 287.5 L registrados" con celebración sutil (no animación pesada).

## Edge cases

| Caso | UX |
|---|---|
| Carlos tiene 50 clientes | Paginación virtual, scroll infinito |
| Hay 5+ discrepancias | Banner top "5 discrepancias sin resolver" + CTA "Resolver" |
| Carlos olvidó cerrar la app ayer | Mostrar datos de ayer como "Pendientes del lunes" |
| Cliente nuevo sin ordeñar | Mostrar al final de la lista "Sin litros hoy" |
| Carlos tiene 3 empleados | Mostrar toggle "¿De quién?" con colores por empleado |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Fondo | `--cream-50` | #FFFDF7 |
| Card alertas | `--cream-100` | #FAF8F3 |
| Badge discrepancia | `--warning` | #B26A00 |
| Texto principal | `--text` | #1A1F1A |
| Bottom nav activo | `--green-700` | #184318 |
| Bottom nav inactivo | `--text-soft` | #5C5C5C |
| Progreso (verde) | `--green-500` | #2A782A |
| Botón "+ Agregar" | gradiente `--green-500` | 135deg |

## Métricas

- **% de apertura diaria de la app:** target >80%
- **Tiempo hasta primer registro:** target < 60 segundos desde apertura
- **% de alertas accionadas en el día:** target > 70%

## Conexiones

- **→** WF-L-02 (registrar visita): tap en cliente
- **→** WF-L-04 (adelantos): tap en alerta de adelanto
- **→** WF-L-06 (sacar cuentas): tap en quincena desde bottom nav
- **→** WF-L-08 (estadísticas): tap en reportes desde bottom nav

## Versión
1.0 — 2026-09-07 — Documento inicial basado en indagación validada.
