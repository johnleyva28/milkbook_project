# WF-C-01: Home + Quincena — App Cliente (Juan)

## Propósito
Vista principal que Juan ve al abrir la app. Muestra su quincena actual con el lechero Carlos, alertas de confirmación pendiente, y un CTA grande para confirmar los litros del día.

## Datos que muestra
- Saludo ("Buenos días, Juan")
- Fecha actual
- Lechero activo (Carlos Mendoza)
- CTA prominente: confirmar litros de hoy
- Notificaciones pendientes (Carlos recogió, etc.)
- Resumen de la quincena actual (días restantes, litros, precio, estimado a recibir)
- Acceso a: contrato, boletas, adelantos, encargos, historial, perfil

## Acciones disponibles
- Tocar CTA: ir a WF-C-02 (confirmar litros)
- Tocar una notificación: ir al detalle
- Tocar "Ver detalle de mi quincena": drill-down
- Acceder a menú inferior: contrato / boletas / yo

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 6:32    📶 3G  68%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ Hola, Juan 👋              🔔        │
├──────────────────────────────────────┤
│                                       │
│ Buenos días, Juan                     │
│ 📅 Martes 17 sept 2026                │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ │  📋 Confirma los litros de hoy  │ │
│ │                                  │ │
│ │  Toca aquí cuando ordeñes        │ │
│ │                          — L     │ │
│ └──────────────────────────────────┘ │
│                                       │
│ 🔔 NOTIFICACIONES (2)                │
│ ┌──────────────────────────────────┐ │
│ │ ● Carlos recogió 18.5 L ayer    │ │
│ │   coincide con lo que registraste│ │
│ │                            → OK │ │
│ ├──────────────────────────────────┤ │
│ │ ● Adelanto de S/ 100 para        │ │
│ │   medicinas, confirmado por      │ │
│ │   Carlos                        → │ │
│ └──────────────────────────────────┘ │
│                                       │
│ 📅 QUINCENA ACTUAL (15-29 sept)      │
│ ┌──────────────────────────────────┐ │
│ │ Días restantes: 12               │ │
│ │ Litros vendidos: 87.5 L          │ │
│ │ Precio / L: S/ 1.50            │ │
│ │ A recibir (estimado): ~ S/ 90    │ │
│ │                                 │ │
│ │ [Ver detalle de mi quincena →]   │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ¿QUÉ QUIERES VER?                     │
│ ┌───────┬───────┬───────┬───────┐   │
│ │📑Con- │📜Bole-│💰Adel-│🛒Encar│   │
│ │trato  │tas    │antos  │gos    │   │
│ ├───────┼───────┼───────┼───────┤   │
│ │📊His- │⚙️Mi   │       │       │   │
│ │torial │perfil │       │       │   │
│ └───────┴───────┴───────┴───────┘   │
│                                       │
│ ┌─ ¿NECESITAS AYUDA? ─────────────┐ │
│ │ 📞 Llama a Carlos                │ │
│ │ [📱 Llamar]                       │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ 🏠Inicio  📅Quincena  📜Boletas  👤Yo│
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **CTA prominente "Confirmar litros":** la acción más frecuente del día. Grande, arriba, color azul (no verde, porque Juan NO es quien confirma con firma — eso viene después).
2. **Notificaciones como lista:** si hay algo por confirmar (Carlos recogió, etc.), Juan lo ve de inmediato.
3. **Resumen de quincena siempre visible:** Juan no necesita navegar para saber "cuánto me van a pagar". Está en el home.
4. **Menú de 6 accesos directos:** contrato, boletas, adelantos, encargos, historial, perfil. Sin scroll horizontal.
5. **Llamar a Carlos como salida de emergencia:** Juan a veces tiene dudas. Un click para llamar al lechero.

### Decisiones de copy

- **"Hola, Juan 👋":** cálido, no formal.
- **"Buenos días, Juan":** saludo con hora del día.
- **"A recibir (estimado)":** vs "vas a cobrar". Más neutro. Lo confirmamos en el cierre.
- **"Toca aquí cuando ordeñes":** instruccional, Juan sabe cuándo usarlo.

### Decisiones de estado

- **Si Juan no tiene lechero activo:** mostrar mensaje "Pídele a Carlos que te agregue a su app. Mientras tanto, puedes ver la demo."
- **Si es fin de quincena y ya cerró:** mostrar "Tu quincena cerró. Pagaste X. Ver boleta."
- **Si hay discrepancia pendiente:** alerta grande arriba "Tienes 1 discrepancia por resolver".

## Estados

| Estado | Qué muestra |
|---|---|
| **Normal (mañana, sin confirmar hoy)** | CTA grande "Confirmar litros de hoy" + notificaciones |
| **Ya confirmó hoy** | Banner verde "✓ Confirmaste 17.5 L hoy a las 6:40 AM" + sin CTA |
| **Quincena cerrada** | Banner "Quincena cerrada. A recibir S/ 90. Ver boleta" |
| **Sin lechero activo** | Mensaje de bienvenida + demo |
| **Offline** | Banner amarillo "Sin internet. Cambios guardados localmente" |

## Edge cases

| Caso | UX |
|---|---|
| Juan no tiene smartphone | SMS OTP + Carlos registra por él |
| Juan es familiar de Carlos (caso especial) | Mostrar advertencia "Familia del lechero" en el perfil |
| Juan es mujer productora (jefa de hogar) | UX idéntica, sin distinción de género |
| Juan tiene 60+ años y necesita ayuda | Botón "Llamar a Carlos" más prominente |
| Juan no ha confirmado hace 5+ días | Push recordatorio cada mañana a las 7 AM |
| Juan es `CLIENT_FAMILY` | Mostrar "Estás ayudando a [Juan Pérez]" en header |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Fondo | `--cream-50` | #FFFDF7 |
| CTA principal | `--blue-500` | #0064B1 (azul MilkBook, NO verde) |
| Notificación dot | `--warning` | #B26A00 |
| Bottom nav activo | `--green-700` | #184318 |
| Bottom nav inactivo | `--text-soft` | #5C5C5C |
| Card quincena | white + border | padding 16px |
| Menú tile | white + border | border-radius 12px |

## Métricas

- **% de Juan que abre la app diariamente:** target > 60%
- **% que confirma el mismo día:** target > 80%
- **% de Juan que llama a Carlos desde la app:** target > 5%
- **Tiempo hasta confirmar:** target < 30 seg desde apertura

## Conexiones

- **→** WF-C-02 (confirmar litros): CTA principal
- **→** WF-C-04 (adelantos): tap en tile
- **→** WF-C-05 (encargos): tap en tile
- **→** WF-C-06 (ver liquidación): tap en "Ver detalle de mi quincena"
- **→** WF-C-07 (boletas y perfil): tap en tile o bottom nav

## Versión
1.0 — 2026-09-07 — Documento inicial.
