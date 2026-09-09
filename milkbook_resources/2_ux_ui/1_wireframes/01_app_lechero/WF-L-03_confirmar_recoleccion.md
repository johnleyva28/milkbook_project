# WF-L-03: Confirmar Recolección (Paso doble) — App Lechero (Carlos)

## Propósito
Documentar el flujo del "paso doble" validado en la investigación: **ambos lados registran independientemente** y Carlos siempre marca "✓ Recogido" cuando físicamente recoge la leche. Reduce errores y discrepancias.

## Contexto validado

> El 100% de los productores tienen smartphone (validado). Carlos puede ver la cantidad registrada por Juan antes de irse. Esto cambia el flujo tradicional donde Carlos era el único que anotaba.

## Los 2 casos

| Caso | Vendedor (Juan) | Lechero (Carlos) |
|---|---|---|
| **A — Normal** | Registra su cantidad al ordeñar | Llega, ve cantidad, marca "✓ Recogido" |
| **B — Juan no pudo** | No registra (sin tiempo, sin señal) | Carlos registra y marca "✓ Recogido" |

## Caso A: Flujo paso a paso

```
1. Juan ordeña 17 L. Abre su app.
2. Juan registra: "17 L". Estado: ESPERANDO_LECHERO.
3. Carlos llega en moto 30 min después.
4. Carlos abre la app y ve "Juan registró 17 L".
5. Carlos vierte el bidón, confirma que son 17 L.
6. Carlos marca "✓ Recogido: 17 L (coincide)".
7. Estado: RECOGIDO_COINCIDE.
8. Push inmediato a Juan: "Carlos recogió 17 L. Confirma para firmar."
9. Juan abre la app y confirma con PIN.
10. Estado: RECOGIDO_COINCIDE (firmado).
```

## Caso A.b: Diferencia detectada por Carlos

```
1. Juan registra "17 L".
2. Carlos llega, vierte, su bidón marca 16.5 L.
3. Carlos marca "⚠ Recogido: 16.5 L (diferencia)".
4. Estado: RECOGIDO_DISCREPANCIA.
5. Push a Juan: "Carlos recogió 16.5 L. Tú habías puesto 17 L. Diferencia 0.5 L."
6. Juan elige:
   - "Aceptar 16.5 L de Carlos" (con firma).
   - "Mantener mis 17 L" (abre disputa).
   - "Otra cantidad" (input manual).
```

## Caso B: Carlos registra porque Juan no pudo

```
1. Juan ordeña 17 L pero no abre la app.
2. Carlos llega y abre su app.
3. Ve "Hoy no hay registro del vendedor".
4. Carlos vierte, registra 16.5 L y marca "✓ Recogido".
5. Estado: RECOGIDO_SIN_CONFIRMAR (temporal).
6. Más tarde, Juan abre la app:
7. Ve "Carlos pasó y registró 16.5 L. ¿Confirmas?"
8. Juan confirma con PIN o huella.
9. Estado: RECOGIDO_COINCIDE (firmado).

Si pasan 24 h sin que Juan confirme:
10. Sistema marca como RECOGIDO_SIN_CONFIRMAR "vencido".
11. Se usa el valor de Carlos como definitivo.
12. Juan puede aún abrir disputa si quiere.
```

## Wireframe (Caso A — Carlos llega y ve que coincide)

```
┌──────────────────────────────────────┐
│ 6:32    📶 4G  85%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ←  Confirmar recolección · Juan P.   │
├──────────────────────────────────────┤
│                                       │
│ [JP] Juan Pérez                      │
│      📍 Caserío El Tambo · 5 vacas   │
│                                       │
│ ┌─ REGISTRO DE JUAN ───────────────┐ │
│ │ ⏰ 6:30 AM (hace 2 min)           │ │
│ │ 📋 Juan puso: 17 L               │ │
│ │ 💧 Tu balde: 17 L (al llegar)    │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌─ CONFIRMAR RECOLECCIÓN ──────────┐ │
│ │                                   │ │
│ │        17 L                       │ │  ← coincide con Juan
│ │                                   │ │
│ │ Coincide con Juan ✓               │ │
│ └───────────────────────────────────┘ │
│                                       │
│ AJUSTE (si no coincide)               │
│ ┌────┬────┬────┐                     │
│ │ −  │ 17 │ +  │                     │
│ └────┴────┴────┘                     │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │      ✓ RECOGIDO 17 L            │ │  ← CTA principal
│ │      (coincide con Juan)         │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ⚠ Recogido 16 L (diferencia con Juan) │  ← CTA secundario
└──────────────────────────────────────┘
```

## Wireframe (Caso B — Carlos registra porque Juan no pudo)

```
┌──────────────────────────────────────┐
│ 6:45    📶 4G  80%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ←  Confirmar recolección · Juan P.   │
├──────────────────────────────────────┤
│                                       │
│ [JP] Juan Pérez                      │
│                                       │
│ ┌─ ⚠ HOY NO HAY REGISTRO DE JUAN ──┐│
│ │ ¿Qué pasó?                        ││
│ │ ○ Juan no pudo registrar (usual)  ││
│ │ ○ Juan no vendió hoy              ││
│ │ ○ Carlos registra por Juan        ││
│ └────────────────────────────────────┘│
│                                       │
│ REGISTRA LOS LITROS QUE RECOGISTE     │
│ ┌──────────────────────────────────┐ │
│ │                                   │ │
│ │        16.5 L                     │ │
│ │                                   │ │
│ │ Tipo manual o usa quick buttons  │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌────┬────┬────┬────┬────┬────┐      │
│ │ 15 │ 16 │ 16.5│ 17 │ 18 │ 20 │      │
│ └────┴────┴────┴────┴────┴────┘      │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │   ✓ RECOGIDO 16.5 L              │ │
│ │   (esperando firma de Juan)      │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Notas de UX

### Por qué "paso doble"

1. **Reduce errores:** Ambos lados escriben, ambos confirman. Si uno se equivoca, el otro lo detecta.
2. **Acelera la operación:** Juan puede registrar mientras espera, Carlos solo confirma.
3. **Resuelve discrepancias en el momento:** Carlos ve la cantidad de Juan antes de irse. No hay "después te digo".

### Decisiones críticas

1. **Display pre-llenado con el valor de Juan:** si coincide, Carlos solo confirma (3 seg). Si no, ajusta.
2. **Banner amarillo cuando no coincide:** indica que hay diferencia sin alarmar.
3. **Botón secundario "⚠ Recogido {otra}"** explícito: Carlos puede marcar discrepancia con un toque.
4. **Estado RECOGIDO_SIN_CONFIRMAR con timer:** el sistema recuerda a Carlos "esperando firma de Juan hace X horas".
5. **24 horas timeout:** si Juan no confirma en 24h, el sistema usa valor de Carlos y archiva para auditoría.

### Decisiones de copy

- **"Confirmar recolección"** vs "Marcar recogida" — más claro para Carlos.
- **"Coincide con Juan ✓"** — afirmación explícita, no asunción.
- **"Esperando firma de Juan"** — informa el estado siguiente, no deja a Carlos adivinando.
- **"Tu balde: 17 L (al llegar)"** — contexto físico, recuerda que el balde es la fuente de verdad.

## Edge cases

| Caso | UX |
|---|---|
| Carlos recoge pero no abre la app por horas | Banner push: "Tienes 1 recolección pendiente de confirmar" |
| Juan edita su registro después | Carlos ve el cambio al abrir la app (sincronización) |
| Carlos y Juan están sin internet | Todo funciona offline, sync al recuperar señal |
| Diferencia > 5 L (anormal) | Notificación inmediata al admin, alerta visual |
| Carlos marca "no recogí" pero Juan ya registró | Estado RECOGIDO_DISCREPANCIA, Juan es notificado |
| Juan fallece o está enfermo | Carlos registra "no vendió hoy" con motivo |

## Estados (resumen)

```
┌─────────────────────────────────┐
│                                 │
│  ESPERANDO_LECHERO              │  ← Juan registró, falta Carlos
│  ↓                              │
│  RECOGIDO_COINCIDE              │  ← Carlos recogió, coincide
│  ↓                              │
│  RECOGIDO_COINCIDE (firmado)    │  ← Juan firmó, cierre OK
│                                 │
│  RECOGIDO_SIN_CONFIRMAR          │  ← Carlos registró solo
│  ↓ (espera 24h o firma de Juan) │
│  RECOGIDO_COINCIDE (firmado)    │
│  o                              │
│  RECOGIDO_SIN_CONFIRMAR (vencido)│  ← después de 24h, valor de Carlos es final
│                                 │
│  RECOGIDO_DISCREPANCIA          │  ← Carlos recogió cantidad distinta
│  ↓ (resolución en cierre)       │
│  RESUELTA_EN_MOMENTO            │  ← Juan aceptó valor de Carlos
│  o                              │
│  ABIERTA_DISPUTA                │  ← Juan mantuvo su valor
│                                 │
│  NO_VENDIO                      │  ← Juan marcó no vendió
│  o                              │
│  RECOGIDO_DISCREPANCIA          │  ← Carlos registró algo pero Juan dice no vendió
│                                 │
└─────────────────────────────────┘
```

## Métricas

- **% de caso A (ambos lados):** target > 80% del total
- **% de caso B (Carlos solo):** target < 20%
- **% de discrepancias resueltas en el momento:** target > 80%
- **% de registros confirmados el mismo día:** target > 90%
- **Tiempo medio de confirmación (incluyendo firma):** target < 30 seg

## Conexiones

- **←** WF-L-01 (home): tap en cliente
- **→** WF-L-06 (sacar cuentas): en el cierre se resuelven todas las discrepancias

## Versión
1.0 — 2026-09-07 — Documento inicial basado en investigación validada (flujo doble).
