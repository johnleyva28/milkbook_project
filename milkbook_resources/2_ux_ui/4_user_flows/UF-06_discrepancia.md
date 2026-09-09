# UF-06: Resolución de Discrepancia

> ⭐ **EL FLUJO MÁS CRÍTICO EN TÉRMINOS DE CONFLICTO.** Una discrepancia no resuelta es la causa #1 de problemas entre lechero y productor. Resolverla bien en el momento es lo que diferencia a MilkBook del cuaderno.

## Resumen

Cuando Carlos registra X litros pero Juan había puesto Y litros (o viceversa), se genera una discrepancia. Hay 3 caminos posibles para resolverla: aceptar el valor del otro, mantener el propio (abre disputa), o llegar a un valor intermedio. La app debe guiar al usuario por el camino más simple.

## Actores

- **Carlos** (LECHERO_OWNER)
- **Juan** (CLIENT_OWNER)
- **Sistema** — calcula, notifica, documenta

## Precondiciones

- ✅ Ambos lados están en la app.
- ✅ Existe un registro diario con estado RECOGIDO_DISCREPANCIA.
- ✅ No han pasado más de 15 días desde la fecha del registro (después se bloquea).

## Los 3 caminos posibles

```
┌────────────────────────────────────┐
│ DISCREPANCIA DETECTADA              │
│ Carlos: 18.5 L · Juan: 19.0 L       │
│ Diferencia: 0.5 L                   │
└────────────────────────────────────┘
                ↓
┌────────────────────────────────────┐
│ CAMINO 1: ACEPTAR VALOR DEL OTRO    │
│ (resolución rápida)                  │
├────────────────────────────────────┤
│ Juan acepta 18.5 L de Carlos        │
│ o Carlos acepta 19.0 L de Juan      │
│ → Estado: RESUELTA_EN_MOMENTO       │
│ → Tiempo: 30 seg                    │
│ → Registra valor final              │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ CAMINO 2: VALOR INTERMEDIO          │
│ (negociación rápida)                │
├────────────────────────────────────┤
│ Ambos eligen un valor entre los dos  │
│ Propuesta: 18.5, 18.75, 19.0      │
│ → Eligen 18.75 L                   │
│ → Estado: RESUELTA_EN_MOMENTO       │
│ → Tiempo: 1-2 min                  │
│ → Registra valor final              │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ CAMINO 3: DISPUTA ABIERTA            │
│ (conflicto no resuelto)              │
├────────────────────────────────────┤
│ Juan mantiene 19 L y no acepta      │
│ → Estado: ABIERTA_DISPUTA           │
│ → Notificación a admin               │
│ → Admin interviene (ver UF-06.1)     │
│ → Resolución puede tardar días      │
└────────────────────────────────────┘
```

## Happy Path (Camino 1 — el más común)

```
DURANTE EL CIERRE DE QUINCENA
┌────────────────────────────────────┐
│ 1. Carlos está cerrando la quincena │
│    con Juan en su casa.              │
│ 2. Pantalla muestra "2 discrepancias│
│    por resolver" (banner amarillo).  │
│ 3. Carlos tap en fila del 18 sept.   │
│ 4. Modal abre: "Carlos 18.5 / Juan │
│    19.0. ¿Cuántos fueron?"          │
│ 5. Carlos elige 18.5 L (su valor).   │
│ 6. Sistema pide firma de Juan.       │
│ 7. Juan confirma con PIN:           │
│    "SÍ, aceptar 18.5 L"             │
│ 8. Sistema registra valor final.     │
│ 9. Juan cierra el modal.             │
│ 10. Estado: RESUELTA_EN_MOMENTO.    │
└────────────────────────────────────┘
                ↓
        FIN (siguiente discrepancia o cierre)
```

## Camino 2: Valor intermedio

```
... Carlos tap en discrepancia del 25 sept ...
4'. Juan dice: "Fueron 19.5, ni 19 ni 20".
5'. Carlos asiente: "OK, 19.5 está bien".
6'. Ambos firman con 19.5 L.
7'. Estado: RESUELTA_EN_MOMENTO.
```

## Camino 3: Disputa abierta

```
... Carlos tap en discrepancia ...
4''. Carlos dice: "Fueron 20, no 19.5".
5''. Juan dice: "No, fueron 19.5".
6''. Carlos insiste: "El balde marcaba 20".
7''. Juan: "Pues yo no entregué 20".
8''. Sistema detecta conflicto no resuelto.
9''. Carlos o Juan abre "Disputa" (botón rojo).
10''. Modal: "Abre disputa con admin. Describe qué pasó."
11''. Carlos escribe: "Balde marcaba 20 L, Juan dice 19.5".
12'. Juan escribe: "Ordeñé 19.5 L, Carlos se equivoca".
13''. Sistema abre DISPUTA_ABIERTA.
14''. Admin recibe push: "Nueva disputa entre Carlos y Juan".
15''. Admin investiga, habla con ambos, propone resolución.
16''. Resolución final se registra con valor final + nota admin.
17''. Estado: RESUELTA_POR_ADMIN.
```

## Edge Cases

### EC-6.1: Disputa resuelta por admin (caso conflictivo)

```
... Carlos y Juan no se ponen de acuerdo ...
15''. Admin llama a Carlos, le dice "el balde tiene marcas de 19.5 L".
16''. Admin llama a Juan, confirma que él había puesto 19.5.
17''. Admin resuelve con 19.5 L.
18''. Sistema notifica a ambos: "Admin resolvió con 19.5 L".
19''. Si ambos aceptan → DISPUTA_CERRADA.
20''. Si uno no acepta → escalación a SUPER_ADMIN (raro).
```

### EC-6.2: Diferencia > 5 L (anormal)

```
... diferencia de 7 L (raro pero crítico) ...
1'. Sistema bloquea la firma normal.
2'. Sistema avisa: "⚠ Diferencia mayor a 5 L. ¿Es correcto?"
3'. Carlos o Juan debe abrir disputa obligatoriamente.
4'. Admin interviene inmediatamente.
```

### EC-6.3: Juan edita registro días después del cierre

```
... Carlos cerró la quincena ...
20'''. Juan abre la app 3 días después.
21'''. Juan ve el registro del 22 sept y dice "en realidad fueron 18 L, no 19".
22'''. Juan edita → genera discrepancia POST-CIERRE.
23'''. Sistema abre disputa retroactiva.
24'''. Liquidación se reabre, se recalcula.
```

### EC-6.4: Juan no responde en 24h y la discrepancia persiste

```
... Carlos y Juan tienen 2 discrepancias sin resolver ...
10''''. Carlos intenta cerrar la quincena.
11''''. Sistema avisa: "Tienes discrepancias sin resolver. Resuélvelas primero."
12''''. Carlos no puede cerrar.
13''''. Carlos tiene 3 opciones:
       a) Llamar a Juan por teléfono
       b) Usar valor de Carlos para todas (con observación)
       c) Cancelar cierre y esperar a Juan
```

### EC-6.5: Carlos tiene empleado que registró y Juan no estaba

```
... empleado de Carlos registró X L ...
1'''''. Juan abre la app, ve "Carlos registró X L (registrado por empleado_1)".
2'''''. Juan acepta o rechaza.
3'''''. Sistema marca quién hizo cada acción (audit).
```

## Errores y Recuperación

| Error | Detección | Recuperación |
|---|---|---|
| Juan no responde en 24h | Cron en backend | Sistema permite cerrar con valor Carlos + observación |
| Disputa no resuelta en 7 días | Admin alert | Admin interviene forzosamente |
| Admin no disponible | Sistema escala | SUPER_ADMIN recibe |
| Conflicto de edición simultánea | LWW + audit | Ambos notificados, último cambio gana |
| Firma falsa | Audit detect | Sistema bloquea, admin interviene |

## Métricas

| Métrica | Meta | Cómo medir |
|---|---|---|
| % resuelta en momento (camino 1 o 2) | > 80% | Telemetry |
| Tiempo medio de resolución | < 1 min | Cronómetro |
| % que termina en disputa abierta | < 15% | Telemetry |
| % resuelta por admin | < 5% | Telemetry |
| % post-cierre | < 5% | Telemetry |

## Conexiones

- **Wireframes:** WF-L-06 (modal de discrepancia), WF-C-06 (discutir en liquidación)
- **Sub-flujo de:** UF-01 (registro diario), UF-03 (cierre)
- **Admin tools:** ver `3_diagramas/4_casos_uso/` para flujos de admin

## Versión
1.0 — 2026-09-07 — Documento inicial.
