# WF-C-05: Encargos Recibidos — App Cliente (Juan)

## Propósito
Permitir a Juan ver y confirmar los encargos que ha pedido a Carlos (azúcar, medicinas, queso, etc.) y su estado (pendiente / comprado / entregado / confirmado).

## Datos que muestra
- Lista de encargos pendientes (que pidió pero Carlos aún no entregó)
- Lista de encargos ya entregados (recibió y confirmó)
- Total estimado de encargos pendientes (para auditoría)
- Histórico del mes

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ← Encargos pedidos            + Pedir│
├──────────────────────────────────────┤
│                                       │
│ 🚚 PENDIENTES DE ENTREGA (2)         │
│ ┌──────────────────────────────────┐│
│ │ Carlos está buscando:            ││
│ │                                  ││
│ │ 📦 1 kg queso andino             ││
│ │ 💰 S/ 25.00                     ││
│ │ 📅 Pedido 22 sept                ││
│ │ 📍 Para llevar mañana            ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │ Carlos está buscando:            ││
│ │                                  ││
│ │ 📦 Paracetamol 500mg caja        ││
│ │ 💰 S/ 18.00                     ││
│ │ 📅 Pedido 24 sept                ││
│ └──────────────────────────────────┘│
│                                       │
│ ENTREGADOS ESTA QUINCENA (3)         │
│ ┌──────────────────────────────────┐│
│ │ ✓ Recibiste el encargo          ││
│ │                                  ││
│ │ 📦 2 kg azúcar                   ││
│ │ 💰 S/ 12.00                     ││
│ │ 📅 Entregado 17 sept             ││
│ │ ✓ Confirmado por ti              ││
│ ├──────────────────────────────────┤│
│ │ ✓ Recibiste el encargo          ││
│ │                                  ││
│ │ 📦 1 aceite 1L                  ││
│ │ 💰 S/ 18.00                     ││
│ │ 📅 Entregado 20 sept             ││
│ │ ✓ Confirmado por ti              ││
│ ├──────────────────────────────────┤│
│ │ ✓ Recibiste el encargo          ││
│ │                                  ││
│ │ 📦 2 kg arroz                    ││
│ │ 💰 S/ 8.00                      ││
│ │ 📅 Entregado 18 sept             ││
│ │ ✓ Confirmado por ti              ││
│ └──────────────────────────────────┘│
│                                       │
│ TOTAL ESTIMADO (pendientes)          │
│ ┌──────────────────────────────────┐│
│ │ 💰 S/ 43.00 (2 encargos)        ││
│ │ Se descontará al cierre          ││
│ └──────────────────────────────────┘│
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  📅Quincena  📜Boletas  👤Yo│
└──────────────────────────────────────┘
```

## Wireframe (Pedir nuevo encargo)

```
┌──────────────────────────────────────┐
│ ← Pedir nuevo encargo                 │
├──────────────────────────────────────┤
│                                       │
│ ¿QUÉ NECESITAS?                      │
│ ┌──────────────────────────────────┐│
│ │ Ej: 1 kg queso andino           ││
│ └──────────────────────────────────┘│
│                                       │
│ PRODUCTOS FRECUENTES (5 más pedidos) │
│ ┌─────────┬─────────┬─────────┐     │
│ │ Q. andino│ Azúcar  │ Arroz   │     │
│ │ 1kg S/25 │ 1kg S/8 │ 1kg S/5 │     │
│ ├─────────┼─────────┼─────────┤     │
│ │ Aceite  │ Paracet.│ Fideos  │     │
│ │ 1L S/18 │ caja S/9│ 1kg S/6 │     │
│ └─────────┴─────────┴─────────┘     │
│                                       │
│ ¿PARA CUÁNDO?                         │
│ ○ Mañana                              │
│ ○ Esta semana                         │
│ ● Fecha específica: [26/sept]         │
│                                       │
│ NOTA (opcional)                       │
│ ┌──────────────────────────────────┐│
│ │ "Para el cumpleaños de mi hija" ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │      PEDIR A CARLOS              ││
│ │      (notificar a Carlos)       ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Confirmar recepción)

```
┌──────────────────────────────────────┐
│ ← Recibir encargo · 1 kg queso      │
├──────────────────────────────────────┤
│                                       │
│ ENCARGO                               │
│ ┌──────────────────────────────────┐│
│ │ 📦 1 kg queso andino             ││
│ │ 💰 S/ 25.00                     ││
│ │ 📅 Pedido 22 sept                ││
│ │                                  ││
│ │ Carlos dice que ya te lo dio.    ││
│ │ ¿Es correcto?                    ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │  ✓ SÍ, RECIBÍ CORRECTO          ││
│ │  (firma con PIN)                 ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │  ⚠ RECIBÍ PERO ES DISTINTO       ││
│ │  (Carlos debe explicar motivo)   ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │  ✕ NO RECIBÍ NADA               ││
│ │  (abre disputa)                  ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Estados posibles

```
┌──────────────────────────────────┐
│                                  │
│  PEDIDO (por Juan)               │  ← Juan pide
│  ↓                              │
│  COMPRADO (por Carlos)          │  ← Carlos fue a la ciudad
│  ↓                              │
│  ENTREGADO (por Carlos)         │  ← Carlos le dio a Juan
│  ↓                              │
│  CONFIRMADO (por Juan)          │  ← Juan confirma recepción
│  ↓ (al cierre)                  │
│  LIQUIDADO                     │  ← Descontado del pago
│                                  │
│  (alternativas)                  │
│  ↓                              │
│  CANCELADO_POR_JUAN            │  ← Juan cambia de opinión
│  o                              │
│  CANCELADO_POR_CARLOS          │  ← Carlos no encontró
│  o                              │
│  DISPUTA                       │  ← Juan no recibió lo que pidió│
│                                  │
└──────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Sección "Pendientes de entrega":** la acción principal. Juan ve qué está esperando.
2. **Productos frecuentes en grid:** los 5-6 más pedidos en la zona de Carlos. Juan toca y se pre-llena.
3. **"Para cuándo":** opciones predefinidas + fecha específica. Cubre todos los casos.
4. **Confirmación de recepción:** 3 opciones claras (correcto / distinto / no recibí).
5. **Total estimado:** Juan sabe cuánto se le va a descontar.

### Decisiones de copy

- **"Carlos está buscando":** vs "Pendiente". Más humano.
- **"Pedir a Carlos (notificar a Carlos)":** acción + consecuencia.
- **"Es correcto?":** pregunta directa, no "Confirma".

## Edge cases

| Caso | UX |
|---|---|
| Carlos no encuentra el producto | Lo marca como CANCELADO_POR_CARLOS con motivo |
| Juan recibe producto distinto | DISPUTA: Carlos explica motivo (ej: "no había de esa marca") |
| Juan se equivoca al pedir | Puede cancelar antes de que Carlos compre |
| Carlos ya compró y Juan quiere cancelar | Sistema permite, descuenta el costo real de Carlos |
| Encargo mayor a S/ 300 | Advertencia: monto alto, requiere confirmación |
| Carlos no ha comprado en 7 días | Sistema marca como VENCIDO, Juan notificado |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Card pendiente | `--cream-100` | fondo neutro |
| Card confirmado | `--green-100` | verde claro |
| Card disputa | `--warning-bg` | amarillo |
| Producto frecuente | white + `--cream-300` border | tappable |
| Botón pedir | `--blue-500` | azul |
| Total estimado | `--cream-200` | fondo destacado |

## Métricas

- **% de encargos confirmados en < 24h:** target > 70%
- **Tiempo medio de pedido:** target < 30 seg
- **% de disputas:** target < 3%
- **% de productos frecuentes vs custom:** target > 60% frecuentes (mejor UX)

## Conexiones

- **←** WF-C-01 (home): tap en tile "Encargos"
- **←** WF-C-02 (confirmar litros): tap en notificación de encargo
- **→** WF-C-06 (ver liquidación): los encargos se suman al cálculo

## Versión
1.0 — 2026-09-07 — Documento inicial.
