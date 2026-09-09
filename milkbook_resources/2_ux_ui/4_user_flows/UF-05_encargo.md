# UF-05: Encargo (Pedido → Compra → Entrega → Confirmación)

## Resumen

Flujo completo del ciclo de un encargo: Juan pide algo (azúcar, medicinas, queso), Carlos lo compra en la ciudad, lo entrega en la próxima visita, y Juan confirma recepción. Se descuenta al cierre de quincena.

## Actores

- **Juan** (CLIENT_OWNER) — quien pide
- **Carlos** (LECHERO_OWNER) — quien compra y entrega
- **Sistema** — guarda, notifica, descuenta al cierre

## Precondiciones

- ✅ Contrato activo.
- ✅ Juan tiene app instalada.
- ✅ Carlos tiene app con sesión activa.

## Happy Path

```
FASE 1: PEDIDO (Juan pide)
┌────────────────────────────────────┐
│ 1. Juan abre la app.                 │
│ 2. Tap en "Encargos" del home.       │
│ 3. Tap en "+ Pedir".                 │
│ 4. Pantalla "Pedir nuevo encargo".   │
│ 5. Juan elige:                       │
│    a) Producto frecuente (grid):    │
│       "Queso andino 1kg S/25"       │
│    b) O producto custom:             │
│       "1 kg queso andino"            │
│ 6. Precio aprox: S/ [25]             │
│ 7. Para cuándo:                      │
│    ● Mañana                          │
│    ○ Esta semana                     │
│    ○ Fecha específica               │
│ 8. Nota opcional:                    │
│    "Para el cumpleaños de mi hija"  │
│ 9. Tap "PEDIR A CARLOS".             │
└────────────────────────────────────┘
                ↓
┌────────────────────────────────────┐
│ 10. Sistema crea encargo:            │
│     estado = CREADO                  │
│ 11. Push a Carlos: "Juan pide..."   │
└────────────────────────────────────┘
                ↓
FASE 2: COMPRA (Carlos compra en ciudad)
┌────────────────────────────────────┐
│ 12. Carlos está en la ciudad.        │
│ 13. Abre app, va a "Encargos".       │
│ 14. Tap en el encargo de Juan.       │
│ 15. Tap "Comprado".                  │
│ 16. Sistema registra:                │
│     estado = COMPRADO                │
│ 17. Carlos puede ajustar precio real: │
│     S/ [27] (porque costó más)      │
└────────────────────────────────────┘
                ↓
FASE 3: ENTREGA (Carlos entrega a Juan)
┌────────────────────────────────────┐
│ 18. Carlos vuelve a la ruta.          │
│ 19. Llega a casa de Juan.            │
│ 20. Abre app, va a "Encargos".       │
│ 21. Tap "Entregado".                 │
│ 22. Sistema registra:                │
│     estado = ENTREGADO               │
│ 23. Push a Juan: "Carlos te entregó  │
│     el queso. ¿Es correcto?"        │
└────────────────────────────────────┘
                ↓
FASE 4: CONFIRMACIÓN (Juan confirma)
┌────────────────────────────────────┐
│ 24. Juan abre app.                    │
│ 25. Ve "Carlos te entregó queso".    │
│ 26. Juan elige:                      │
│     ✓ SÍ, RECIBÍ CORRECTO          │
│     ⚠ RECIBÍ PERO ES DISTINTO       │
│     ✕ NO RECIBÍ NADA                │
└────────────────────────────────────┘
                ↓
┌────────────────────────────────────┐
│ 27a. Si eligió ✓ → CONFIRMADO        │
│ 27b. Si eligió ⚠ → DISPUTA          │
│ 27c. Si eligió ✕ → DISPUTA          │
│ 28. Carlos notificado.              │
│ 29. El encargo se descuenta al      │
│     cierre de quincena.             │
└────────────────────────────────────┘
                ↓
        FIN DEL FLUJO
```

## Edge Cases

### EC-5.1: Carlos no encuentra el producto

```
... Carlos está en la ciudad ...
12''. Carlos busca "queso andino" en la ciudad pero no encuentra.
13''. Carlos abre la app, tap en el encargo.
14''. Tap "Cancelar" con motivo: "No había en la ciudad".
15''. Estado: CANCELADO_POR_CARLOS.
16''. Juan recibe notificación: "Carlos no encontró queso. ¿Quieres pedir otra cosa?"
```

### EC-5.2: Juan pide pero Carlos se olvida de comprar

```
... Carlos está en la ciudad ...
12'''. Carlos va al mercado pero se olvida del encargo de Juan.
13'''. Al día siguiente, Juan pregunta: "¿Y mi encargo?"
14'''. Carlos verifica y se da cuenta.
15'''. Carlos abre la app, reprograma: "Lo busco el viernes".
16'''. El encargo sigue como CREADO pero con fecha reprogramada.
```

### EC-5.3: Juan cambia de opinión antes de que Carlos compre

```
... Juan pidió queso ...
9'. Juan cambia de opinión. Abre app, tap en el encargo.
10'. Tap "Cancelar" con motivo: "Ya no lo necesito".
11'. Estado: CANCELADO_POR_JUAN.
12'. Carlos recibe push: "Juan canceló el encargo del queso".
```

### EC-5.4: Juan recibe producto distinto (Carlos trajo similar)

```
... Carlos entregó el queso ...
24''. Juan abre app, ve "queso andino 1kg".
25''. Juan recibe, pero es un queso fresco distinto (no el que pidió).
26''. Juan elige "RECIBÍ PERO ES DISTINTO".
27''. Sistema abre disputa con motivo.
28''. Carlos recibe push: "Juan dice que el queso no es lo que pidió".
29''. Carlos puede:
      a) Explicar motivo: "No había de esa marca, traje el único que encontré"
      b) Cambiar el producto
      c) Devolver el dinero
```

### EC-5.5: Carlos tiene varios encargos para llevar

```
... Carlos ya hizo 5 encargos en la ciudad ...
12''''. Carlos abre la app, ve lista de encargos "comprados pero no entregados".
13''''. Carlos puede marcarlos como "entregado" en lote (uno por uno).
14''''. Cada entrega genera push individual al cliente correspondiente.
```

### EC-5.6: Encargo de monto alto (mayor a S/ 300)

```
... Juan pide una herramienta cara: S/ 500 ...
5''''. Sistema avisa: "⚠ Estás pidiendo un encargo alto. ¿Confirmas?"
6''''. Juan confirma.
7''''. Sistema marca como "encargo alto" en audit log.
8''''. Carlos ve destacado al planificar la compra.
```

## Errores y Recuperación

| Error | Detección | Recuperación |
|---|---|---|
| Carlos olvida marcar "Comprado" | Sistema detecta (estado CREADO > 24h) | Push recordatorio a Carlos |
| Juan olvida confirmar recepción | Sistema detecta (ENTREGADO > 24h) | Push a Juan, default confirmado a 48h |
| Carlos no encuentra el producto | Carlos cancela con motivo | Juan recibe notificación |
| Disputa por producto distinto | Sistema abre caso | Resolución Carlos-Juan + admin |
| Juan no tiene app | Carlos confirma verbalmente, sistema marca "FIRMA_PRESENCIAL" | Audit log |

## Métricas

| Métrica | Meta | Cómo medir |
|---|---|---|
| Tiempo medio de pedido (Juan) | < 30 seg | Telemetry |
| Tiempo entre pedido y entrega | < 5 días | Telemetry |
| % de encargos confirmados en < 24h | > 70% | Telemetry |
| % de disputas | < 3% | Telemetry |
| % de cancelados por no encontrar producto | < 10% | Telemetry |
| Costo promedio real vs estimado | < 10% de diferencia | Telemetry |

## Conexiones

- **Wireframes:** WF-L-05 (Carlos), WF-C-05 (Juan)
- **Sub-flujo de:** UF-03 (cierre, los encargos se suman)
- **Edge case:** si vence → EC-3.x en UF-03

## Versión
1.0 — 2026-09-07 — Documento inicial.
