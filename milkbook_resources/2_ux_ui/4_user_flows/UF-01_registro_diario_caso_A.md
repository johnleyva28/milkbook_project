# UF-01: Registro Diario — Caso A (ambos lados registran)

> ⭐ **EL FLUJO MÁS IMPORTANTE DE LA APP.** Se ejecuta todos los días, entre 8 y 15 veces por Carlos.

## Resumen

Flujo **"paso doble"** validado con usuario real: ambos lados (Juan el productor y Carlos el lechero) registran independientemente la cantidad de leche, y Carlos siempre marca "✓ Recogido" cuando físicamente recoge la leche. Esto reduce errores y acelera la operación.

## Actores

- **Juan** (CLIENT_OWNER) — productor de leche
- **Carlos** (LECHERO_OWNER) — lechero que recoge la leche
- **Sistema** (push notifications, sync, base de datos)

## Precondiciones

- ✅ Juan está registrado en MilkBook con app instalada.
- ✅ Carlos está registrado con app instalada.
- ✅ Existe un contrato activo entre Carlos y Juan (precioLitroInicio snapshot).
- ✅ El día actual NO está cerrado (estado != CERRADO).

## Happy Path

```
MAÑANA TEMPRANO (6:00 AM - Juan ordeñando)
┌────────────────────────────────────┐
│ 1. Juan ordeña sus vacas.           │
│ 2. Abre la app.                      │
│ 3. Ve CTA "Confirmar litros de hoy"  │
│ 4. Toca. → WF-C-02 (Confirmar)       │
│ 5. Ingresa: 17 L                     │
│ 6. Confirma con PIN.                 │
│                                    │
│ Estado del registro:                │
│ ESPERANDO_LECHERO                  │
└────────────────────────────────────┘
                ↓
(30-60 minutos después - Carlos llega en moto)
┌────────────────────────────────────┐
│ 7. Carlos abre la app.               │
│ 8. Ve "Juan registró 17 L a las 6:32"│
│ 9. Toca el cliente. → WF-L-03        │
│ 10. Ve display pre-llenado "17 L"    │
│ 11. Carlos vierte el balde, confirma │
│     que son 17 L                     │
│ 12. Marca "✓ Recogido: 17 L"         │
│ 13. Toca "REGISTRAR"                 │
│ 14. Sistema guarda local + sync      │
│                                    │
│ Estado del registro:                │
│ RECOGIDO_COINCIDE                  │
└────────────────────────────────────┘
                ↓
(Sistema envía push a Juan)
┌────────────────────────────────────┐
│ 15. Juan recibe push:                │
│     "Carlos recogió 17 L. Confirma."│
│ 16. Juan abre la app. → WF-C-02      │
│ 17. Ve display "17 L" pre-llenado   │
│ 18. Confirma con PIN.                │
│                                    │
│ Estado del registro:                │
│ RECOGIDO_COINCIDE (firmado)        │
│ CONFIRMADO FINAL                   │
└────────────────────────────────────┘
                ↓
        FIN DEL FLUJO
```

## Edge Cases

### Caso A.1: Carlos recogió diferente cantidad

```
... Carlos llega y vierte el balde ...
11'. El balde marca 16.5 L (no 17)
12'. Carlos marca "⚠ Recogido: 16.5 L (diferencia)"
13'. Sistema notifica a Juan con la diferencia
14'. Juan abre la app, ve "Carlos recogió 16.5 L, tú 17 L"
15'. Juan elige:
      a) "Aceptar 16.5 L" → confirma con 16.5 → CONFIRMADO
      b) "Mantener 17 L"   → abre disputa → DISPUTA_ABIERTA
      c) "Otra cantidad"   → input manual → CONFIRMADO con valor custom
```

### Caso A.2: Juan tiene las manos mojadas y tarda más

```
... Juan está ordeñando ...
5'. Juan abre la app pero cierra por atender el corral.
6'. Juan vuelve 20 min después.
7'. Juan registra 17 L. Confirma.
... sigue el happy path desde el paso 6 ...
```

### Caso A.3: Carlos olvida registrar y se va

```
... Carlos llega y vierte ...
11''. Carlos NO abre la app por prisa (ya recoge y se va).
12''. No hay registro de Carlos.
13''. Estado: ESPERANDO_LECHERO (sigue esperando 24h)
14''. Pasadas 24h, el sistema marca como RECOGIDO_SIN_CONFIRMAR (vencido)
15''. Juan al día siguiente ve "Carlos no marcó ayer"
16''. Juan puede abrir disputa
```

### Caso A.4: No hay internet

```
Cualquier punto del flujo offline:
- El sistema guarda local (Drift DB)
- Muestra banner amarillo "Sin internet — guardado local"
- Cuando se recupera señal, sincroniza automáticamente
- Si hay conflicto con otro device (empleado de Carlos registró), el sistema aplica LWW (Last Write Wins) y notifica al admin
```

### Caso A.5: Juan edita después de Carlos

```
... Carlos ya marcó "✓ Recogido" ...
15''. Juan abre la app al día siguiente.
16''. Juan edita su cantidad de 17 a 16.5 (porque recordó mejor).
17''. Sistema: ¿el cambio es una discrepancia?
       a) Si Carlos marcó 17 → ahora hay diferencia → RECOGIDO_DISCREPANCIA
       b) Si Carlos marcó 16.5 → coincide → RECOGIDO_COINCIDE (firmado)
18''. Notificación a Carlos del cambio.
```

### Caso A.6: Carlos tiene empleado activo

```
1. Empleado de Carlos abre la app con cuenta LECHERO_EMPLEADO.
2. Ve solo clientes del owner (Carlos).
3. Registra visita en nombre de Carlos.
4. Audit log: "registrado_por = empleado_id, registrado_en_nombre_de = carlos_id"
5. Carlos ve el registro en su app con badge "registrado por empleado".
6. Carlos puede editar o confirmar.
```

## Errores y Recuperación

| Error | Detección | Recuperación |
|---|---|---|
| **Sync falla** | Retry exponencial (1s, 5s, 30s, 5min, 1h) | Si tras 1h falla → guardar en outbox + alerta admin |
| **Conflicto de edición** | LWW + timestamp | Mostrar conflicto en UI para resolución manual |
| **PIN incorrecto 5 veces** | Cuenta bloqueada 30s, 1min, 5min | SMS OTP para desbloquear |
| **Juan sin batería** | No puede confirmar | Carlos registra por él + SMS fallback |
| **Carlos sin internet** | Guarda local, banner amarillo | Sync automático al recuperar |
| **Juan en zona sin señal** | Guarda local | Sync al recuperar, máximo 24h |

## Métricas de éxito

| Métrica | Meta | Cómo medir |
|---|---|---|
| Tiempo de confirmación Juan | < 30 seg | Cronómetro en test de campo |
| Tiempo de confirmación Carlos | < 30 seg | Cronómetro |
| % caso A (ambos lados) | > 80% | Telemetry |
| % discrepancias resueltas en momento | > 80% | Telemetry |
| % registros confirmados el mismo día | > 90% | Telemetry |
| Tasa de uso diario (Carlos) | > 80% | Analytics |
| Tasa de uso diario (Juan) | > 60% | Analytics |

## Conexiones

- **Wireframes:** WF-L-02, WF-L-03 (Carlos), WF-C-02 (Juan)
- **Mockups:** `app_lechero_registrar_visita.html`, `app_cliente_confirmar_litros.html`
- **Prototipo:** `prototipo_cliente_confirmar.html`
- **Caso B (cuando Carlos registra solo):** ver UF-02
- **Edge case discrepancia:** ver UF-06

## Versión
1.0 — 2026-09-07 — Documento inicial basado en investigación validada.
