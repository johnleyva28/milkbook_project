# WF-L-05: Encargos — App Lechero (Carlos)

## Propósito
Gestionar los encargos que los productores le piden a Carlos (queso, azúcar, abarrotes, medicinas, útiles). Carlos anota en ciudad, compra, entrega en próxima visita, descuenta al cierre.

## Contexto validado

- **Frecuencia:** hasta 10 encargos por semana.
- **Monto:** S/ 20 - S/ 300 por encargo.
- **Tipo común:** quesos (andino, salado), abarrotes, medicinas, útiles.
- **Dinámica actual:** Carlos anota en libreta, compra en ciudad, entrega en próxima visita, descuenta al cierre. A veces se olvida o confunde.

## Datos que muestra
- Lista de encargos pendientes (que aún no entregó)
- Lista de encargos entregados (en último período)
- Total de encargos pendientes por cliente
- Costo estimado vs. costo real (Carlos puede ajustar)

## Acciones disponibles
- Crear nuevo encargo (cuando Juan pide)
- Marcar como "comprado" (cuando Carlos va a la ciudad)
- Marcar como "entregado" (cuando Carlos le da a Juan)
- Confirmar recepción por Juan
- Ver historial

## Wireframe (Lista de encargos)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ←  Encargos                   + Nuevo│
├──────────────────────────────────────┤
│                                       │
│ 🚚 PENDIENTES (3)                    │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │ 👨 Juan Pérez                    │ │
│ │ 1 kg queso andino    S/ 25.00   │ │
│ │ 📅 Pedido 22 sept               │ │
│ │ 📍 Para llevar mañana           │ │
│ │ [Comprado] [Entregado]          │ │
│ ├──────────────────────────────────┤ │
│ │ 👨 Juan Pérez                    │ │
│ │ Paracetamol 500mg caja          │ │
│ │ S/ 18.00                        │ │
│ │ 📅 Pedido 24 sept               │ │
│ │ [Cancelar]                       │ │
│ ├──────────────────────────────────┤ │
│ │ 👩 María Gómez                   │ │
│ │ 2 kg azúcar       S/ 12.00     │ │
│ │ 📅 Pedido 25 sept               │ │
│ │ [Comprado] [Entregado]          │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ENTREGADOS ESTA QUINCENA (5)          │
│ ┌──────────────────────────────────┐ │
│ │ 👨 Juan Pérez                    │ │
│ │ 1 aceite           S/ 18.00     │ │
│ │ 📅 Entregado 20 sept            │ │
│ │ ✓ Confirmado por Juan           │ │
│ ├──────────────────────────────────┤ │
│ │ 👨 Pedro Díaz                    │ │
│ │ 2 kg arroz         S/ 8.00      │ │
│ │ 📅 Entregado 18 sept            │ │
│ │ ✓ Confirmado por Pedro          │ │
│ ├──────────────────────────────────┤ │
│ │ ... 3 más                        │ │
│ └──────────────────────────────────┘ │
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  👥Clientes  📋Quincena  📊│
└──────────────────────────────────────┘
```

## Wireframe (Crear encargo)

```
┌──────────────────────────────────────┐
│ ←  Nuevo encargo                     │
├──────────────────────────────────────┤
│                                       │
│ ¿QUIÉN LO PIDIÓ?                     │
│ ● Juan Pérez                         │
│ ○ Otro cliente (buscar...)           │
│                                       │
│ ¿QUÉ NECESITA?                        │
│ ┌──────────────────────────────────┐ │
│ │ Ej: 1 kg queso andino           │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ¿CUÁNTO CUESTA APROX?                │
│ ┌──────────────────────────────────┐ │
│ │ S/ [25]                          │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ¿PARA CUÁNDO?                         │
│ ○ Mañana                              │
│ ○ Esta semana                         │
│ ● Fecha específica: [26/sept]         │
│                                       │
│ NOTA (opcional)                       │
│ ┌──────────────────────────────────┐ │
│ │ "Para el cumpleaños de Rosa"    │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │      CREAR ENCARGO               │ │
│ │  (notificar a Juan)             │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Wireframe (Marcar como entregado)

```
┌──────────────────────────────────────┐
│ ←  Entregar a Juan Pérez              │
├──────────────────────────────────────┤
│                                       │
│ ENCARGO A ENTREGAR                     │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │ 1 kg queso andino    S/ 25.00   │ │
│ │ 📅 Pedido 22 sept               │ │
│ │ ✓ Comprado el 24 sept           │ │
│ │ 💰 Costo real: S/ [27]          │ │
│ └──────────────────────────────────┘ │
│                                       │
│ CONFIRMACIÓN DE JUAN                  │
│ ┌──────────────────────────────────┐ │
│ │ ¿Juan recibió el encargo?       │ │
│ │                                  │ │
│ │ ● Sí, tal cual lo pidió          │ │
│ │ ○ Recibió pero cantidad distinta │ │
│ │ ○ Recibió pero producto distinto  │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │   ✓ CONFIRMAR ENTREGA           │ │
│ │   (notificar a Juan)            │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Estados de un encargo

```
┌────────────────────────────┐
│                            │
│  CREADO                    │  ← Carlos anota el pedido
│  ↓                          │
│  COMPRADO                  │  ← Carlos fue a la ciudad
│  ↓                          │
│  ENTREGADO                 │  ← Carlos le dio a Juan
│  ↓                          │
│  CONFIRMADO                │  ← Juan confirma recepción
│  ↓ (al cierre)             │
│  LIQUIDADO                 │  ← Se descuenta del total
│                            │
│  (alternativas)            │
│  ↓                          │
│  CANCELADO                 │  ← Carlos no pudo comprar
│  o                          │
│  DISPUTA                   │  ← Juan dice "no era eso"│
│                            │
└────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Estados progresivos:** el encargo pasa por CREADO → COMPRADO → ENTREGADO → CONFIRMADO → LIQUIDADO. Carlos ve siempre en qué estado está.
2. **Botones grandes para cambiar estado:** [Comprado] y [Entregado] son quick actions directas, sin modal.
3. **Costo real vs. estimado:** Carlos puede ajustar el costo real al volver de la ciudad (a veces el precio varía).
4. **Confirmación de Juan obligatoria:** sin firma, el encargo queda pendiente y se descuenta solo cuando se confirma.
5. **Categoría del producto:** queso, medicina, abarrotes, útiles — facilita filtrado y reportes.

### Decisiones de copy

- **"¿Quién lo pidió?":** vs "¿Para quién es?" — usar verbo de acción.
- **"¿Para cuándo?":** vs "Fecha de entrega" — más coloquial.
- **"Recibido pero cantidad distinta":** caso legítimo (Juan pidió 2kg, Carlos trajo 1.5kg). Se registra.

### Decisiones de eficiencia

- **Carlos puede crear un encargo desde WF-L-02** (registrar visita) si Juan le pide en persona.
- **Quick products:** "Queso andino", "Azúcar 1kg", "Arroz 1kg", "Paracetamol", "Aceite 1L" — los 5 más comunes en Cajamarca.

## Edge cases

| Caso | UX |
|---|---|
| Juan pide encargo pero Carlos no tiene tiempo | Carlos marca "Lo busco la próxima semana" → reprograma |
| Carlos olvidó comprar el encargo | Se marca como "VENCIDO" después de la fecha, Juan notificado |
| Juan recibió producto distinto | Disputa: Carlos explica motivo (ej: "no había de esa marca, traje similar") |
| Encargo mayor a S/ 300 | Advertencia: monto alto, requiere confirmación de Juan |
| Carlos tiene 10+ encargos pendientes | Paginación + filtro por cliente |
| Encargo se cancela | Carlos anula, Juan recibe notificación |

## Métricas

- **% de encargos confirmados en < 24h:** target > 70%
- **Tiempo medio de registro de encargo:** target < 30 seg
- **% de disputas por encargo:** target < 3%
- **% de encargos liquidados correctamente:** target > 95%

## Conexiones

- **←** WF-L-01 (home): tap en "Encargos" del bottom nav
- **→** desde WF-L-02 (registrar visita): botón rápido "🛒 Encargo"
- **→** hacia WF-L-06 (sacar cuentas): los encargos se suman al cálculo

## Versión
1.0 — 2026-09-07 — Documento inicial.
