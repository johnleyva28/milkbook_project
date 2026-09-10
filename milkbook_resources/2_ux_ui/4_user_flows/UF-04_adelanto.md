# UF-04: Adelanto (Carlos da, Juan recibe)

## Resumen

Flujo de registrar un adelanto en efectivo que Carlos le da a Juan antes del cierre. Es uno de los flujos más comunes (1-3 por semana) y resuelve el problema clásico de "Juan dice 200, Carlos dice 300".

## Actores

- **Carlos** (LECHERO_OWNER) — quien da el adelanto
- **Juan** (CLIENT_OWNER) — quien recibe
- **Sistema** — guarda, notifica, descuenta al cierre

## Precondiciones

- ✅ Contrato activo entre Carlos y Juan.
- ✅ Carlos tiene saldo disponible (no aplica restricción en MVP).
- ✅ Juan tiene app instalada y notificaciones habilitadas (opcional).

## Happy Path

```
CARLOS DA EL ADELANTO
┌────────────────────────────────────┐
│ 1. Carlos abre la app.               │
│ 2. Tap en cliente Juan.             │
│ 3. Tap en "💰 Adelanto".             │
│ 4. Pantalla "Nuevo adelanto".        │
│ 5. Carlos elige monto: S/ 80         │
│    (botones quick: 50, 100, 200, 300)│
│    o manual: S/ [80]                 │
│ 6. Motivo (opcional): "Para colegio" │
│ 7. Método de pago: ● Efectivo       │
│ 8. Tap "DAR ADELANTO Y NOTIFICAR    │
│    A JUAN"                           │
└────────────────────────────────────┘
                ↓
SISTEMA PROCESA
┌────────────────────────────────────┐
│ 9. Sistema crea adelanto con estado:  │
│    PENDIENTE_FIRMA_JUAN              │
│ 10. Push enviado a Juan.             │
│ 11. Email enviado a Juan (si tiene).│
└────────────────────────────────────┘
                ↓
JUAN CONFIRMA
┌────────────────────────────────────┐
│ 12. Juan abre la app (o recibe push).│
│ 13. Ve "Carlos te dio S/ 80 para    │
│     colegio. ¿Recibiste?"           │
│ 14. Juan elige:                      │
│     a) ✓ SÍ, RECIBÍ (firma con PIN) │
│     b) ⚠ RECIBÍ MONTO DIFERENTE    │
│     c) ✕ NO RECIBÍ                  │
└────────────────────────────────────┘
                ↓
FIN DEL FLUJO
┌────────────────────────────────────┐
│ 15a. Si eligió a) → CONFIRMADO       │
│ 15b. Si eligió b) → MONTO_PARCIAL    │
│      (se registra el monto que dijo) │
│ 15c. Si eligió c) → DISPUTA_ABIERTA  │
│ 16. Carlos recibe notificación.      │
│ 17. El adelanto se descuenta al      │
│     cierre de quincena.             │
└────────────────────────────────────┘
```

## Edge Cases

### EC-4.1: Juan no abre la app en 24h

```
... pasaron 24h sin que Juan confirme ...
10'. Sistema asume CONFIRMADO (default: silencio = sí).
11'. Carlos ve en su app: "Adelanto confirmado automáticamente (24h sin respuesta)".
12'. Juan puede aún abrir disputa hasta el cierre.
```

### EC-4.2: Juan dice "MONTO DIFERENTE" (recibió S/ 50 de S/ 80)

```
... Carlos dio S/ 80 ...
15''. Juan: "Recibí solo S/ 50, los otros S/ 30 no me llegaron"
16''. Juan registra: "Recibí S/ 50. Faltan S/ 30."
17''. Sistema guarda: MONTO_PARCIAL con monto_real = 50, monto_original = 80.
18''. Carlos recibe push: "Juan dice que recibió solo S/ 50. ¿Confirmas?"
19''. Carlos puede:
      a) Confirmar S/ 50 → MONTO_PARCIAL cerrado
      b) Disputar → DISPUTA_ABIERTA con monto en discusión
```

### EC-4.3: Carlos se equivocó y quiere cancelar

```
... Carlos dio S/ 80 por error ...
9'. Carlos se da cuenta del error antes de que Juan confirme.
10'. Carlos abre la app, va a "Adelantos".
11'. Tap en el adelanto pendiente.
12'. Tap "Cancelar" con motivo obligatorio.
13'. Estado: CANCELADO_POR_CARLOS.
14'. Juan recibe notificación: "Carlos canceló el adelanto".
```

### EC-4.4: Carlos da un adelanto muy alto

```
... Carlos intenta dar S/ 800 ...
5''. Sistema avisa: "⚠ Estás dando un adelanto alto. ¿Estás seguro?"
6''. Carlos confirma o ajusta.
7''. Si confirma, se marca como "adelanto alto" en audit.
8''. Admin puede revisar si hay patrón sospechoso.
```

### EC-4.5: Carlos tiene empleado y el empleado da el adelanto

```
... empleado de Carlos registra ...
1'. Empleado abre app (cuenta LECHERO_EMPLEADO).
2'. Empleado NO puede dar adelantos (permiso denegado).
3'. Sistema muestra: "Solo el dueño de la cuenta puede dar adelantos".
4'. Carlos debe hacerlo desde su app o亲自亲自.
```

## Errores y Recuperación

| Error | Detección | Recuperación |
|---|---|---|
| Juan no tiene app (no recibe push) | Sistema registra | Carlos puede confirmar manualmente en próxima visita |
| Juan dice NO RECIBÍ pero es falso | Carlos confirma la entrega | Sistema congela el adelanto + admin interviene |
| Carlos cancela después de 24h | Sistema bloquea cancelación (Juan ya confirmó) | Si Juan ya usó el dinero, queda como deuda del productor (raro) |
| Juan sin internet | Guarda local | Sync al recuperar |
| Adelanto duplicado (doble clic) | Sistema valida en backend | Solo se crea 1 |

## Métricas

| Métrica | Meta | Cómo medir |
|---|---|---|
| Tiempo medio de registro (Carlos) | < 30 seg | Telemetry |
| % confirmados en < 1h | > 70% | Telemetry |
| % monto parcial | < 5% | Telemetry |
| % disputas por adelantos | < 3% | Telemetry |
| % cancelados por Carlos | < 5% | Telemetry |
| Tiempo medio de confirmación (Juan) | < 1h | Telemetry |

## Conexiones

- **Wireframes:** WF-L-04 (Carlos), WF-C-04 (Juan)
- **Sub-flujo de:** UF-03 (cierre, los adelantos se suman)
- **Edge case:** si Juan no confirma → EC-3.1 en UF-03

## Versión
1.0 — 2026-09-07 — Documento inicial.
