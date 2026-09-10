# UF-02: Registro Diario — Caso B (solo Carlos registra)

## Resumen

Variante del Caso A donde Juan no logra registrar (sin tiempo, sin señal, sin batería). Carlos es el único que registra y la app guarda estado "RECOGIDO_SIN_CONFIRMAR" temporalmente hasta que Juan confirme.

## Actores

- **Juan** (CLIENT_OWNER) — productor, ausente del registro
- **Carlos** (LECHERO_OWNER) — lechero que registra solo
- **Sistema** — maneja el estado temporal

## Precondiciones

- ✅ Carlos y Juan tienen cuenta activa.
- ✅ Existe contrato activo.
- ✅ Juan NO ha registrado el día actual (estado: ESPERANDO_JUAN o sin registro).

## Happy Path

```
MAÑANA (Carlos llega, Juan no registró)
┌────────────────────────────────────┐
│ 1. Juan ordeña pero no abre la app  │
│    (está ocupado, sin señal, etc.)  │
│                                    │
│ Estado del registro:               │
│ (no existe aún)                    │
└────────────────────────────────────┘
                ↓
(Luego - Carlos llega)
┌────────────────────────────────────┐
│ 2. Carlos abre la app.               │
│ 3. Ve el cliente en su cartera.     │
│ 4. Toca. → WF-L-02 (Registrar)       │
│ 5. Pantalla muestra:                 │
│    "Hoy no hay registro del          │
│     productor"                      │
│ 6. Carlos elige el motivo:          │
│    ○ Juan no pudo registrar (usual) │
│    ● Carlos registra por Juan       │
│ 7. Carlos vierte el balde, registra  │
│    16.5 L                           │
│ 8. Carlos marca "✓ Recogido"         │
│ 9. Toca "REGISTRAR"                 │
│                                    │
│ Estado del registro:               │
│ RECOGIDO_SIN_CONFIRMAR (temporal) │
└────────────────────────────────────┘
                ↓
(Sistema envía push a Juan)
┌────────────────────────────────────┐
│ 10. Juan recibe push:               │
│     "Carlos registró 16.5 L.        │
│      ¿Confirmas?"                   │
│ 11. Juan abre la app. → WF-C-02     │
│ 12. Ve display "16.5 L"             │
│ 13. Juan confirma con PIN.           │
│                                    │
│ Estado del registro:               │
│ RECOGIDO_COINCIDE (firmado)        │
│ CONFIRMADO FINAL                   │
└────────────────────────────────────┘
                ↓
        FIN DEL FLUJO
```

## Edge Cases

### Caso B.1: Juan nunca confirma (24h+)

```
... pasaron 24h sin que Juan confirme ...
10'. Sistema marca como RECOGIDO_SIN_CONFIRMAR (vencido)
11'. Sistema usa el valor de Carlos como definitivo
12'. Estado final: RECOGIDO_SIN_CONFIRMAR (vencido)
13'. Juan puede aún abrir disputa si quiere
14'. Carlos ve en su app: "Juan no confirmó en 24h, valor de Carlos es final"
15'. Admin recibe alerta si esto pasa con frecuencia
```

### Caso B.2: Juan confirma con cantidad distinta

```
... Carlos registró 16.5 L ...
12''. Juan abre la app, ve 16.5 L pero él había ordeñado 18 L
13''. Juan elige "Mantener mi 18 L" (abre disputa) o "Otra cantidad"
14''. Si mantiene 18: DISPUTA_ABIERTA
15''. Carlos recibe notificación de la disputa
16''. Carlos decide si reabre o acepta (ver UF-06)
```

### Caso B.3: Juan no tiene batería ni señal

```
... Carlos registró por Juan ...
10'''. Juan no recibe el push (sin batería)
11'''. Juan no abre la app por 24h+
12'''. Sistema marca RECOGIDO_SIN_CONFIRMAR (vencido)
13'''. Juan va a la ciudad al día siguiente, abre app
14'''. Ve "Carlos registró 16.5 L ayer, ¿confirmas?"
15'''. Juan puede confirmar con PIN o disputar
```

### Caso B.4: Carlos tiene prisa y marca "no vino" por error

```
... Carlos llega y Juan sí ordeñó ...
5''. Carlos marca "no vino" por error.
6''. Sistema avisa: "⚠ ¿Estás seguro? El productor podría haber ordeñado."
7''. Carlos confirma (ignorando la advertencia).
8''. Estado: NO_VENDIO (por Carlos, en nombre de Juan)
9''. Juan al ver la app ve "Carlos dice que no recogiste hoy"
10''. Juan abre disputa (porque sí ordeñó)
11''. Se revisa el caso
```

### Caso B.5: Carlos registra y Juan muere / está enfermo

```
... Juan está enfermo y no ordeña ...
10''''. Juan no abre la app por 7 días.
11''''. Sistema marca el contrato como en riesgo.
12''''. Admin recibe alerta: "Juan X días sin actividad. ¿Está bien?"
13''''. Carlos registra "no vino" durante la ausencia.
14''''. Al volver Juan (o familia), continúa con normalidad.
```

## Diferencias vs Caso A

| Aspecto | Caso A | Caso B |
|---|---|---|
| Quién registra primero | Juan (su cantidad) | Carlos (la del balde) |
| Estado inicial | ESPERANDO_LECHERO | (no existe) |
| Estado temporal | RECOGIDO_COINCIDE | RECOGIDO_SIN_CONFIRMAR |
| Riesgo de timeout | Bajo (ambos firman rápido) | Medio (Juan puede no firmar) |
| Tiempo medio de confirmación | < 5 min | < 24h (o vence) |
| % esperado | 80% | 20% |

## Métricas

| Métrica | Meta | Cómo medir |
|---|---|---|
| % de caso B vs caso A | < 20% | Telemetry |
| Tiempo medio de confirmación en caso B | < 24h | Telemetry |
| % de caso B que vence (sin confirmar) | < 5% | Telemetry |
| % de disputas generadas en caso B | < 8% | Telemetry |

## Conexiones

- **Wireframes:** WF-L-02 (Carlos), WF-C-02 (Juan)
- **Variante:** UF-01 (caso A)
- **Si vence:** se puede generar disputa → UF-06

## Versión
1.0 — 2026-09-07 — Documento inicial.
