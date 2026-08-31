# Registro diario de litros — Pantalla clave del Cliente

## Objetivo

Permitir al cliente **confirmar o corregir** los litros que el lechero registró, **en menos de 30 segundos por día**.

## Pantalla: "Confirmar litros de hoy"

### Estructura visual

```
┌────────────────────────────────────────────┐
│ [Atrás]              Confirmar litros    │
├────────────────────────────────────────────┤
│                                            │
│  Lechero: Carlos                            │
│  Quincena: 15-29 septiembre                 │
│                                            │
│  Hoy se registró:                            │
│  ┌──────────────────────────────────────┐ │
│  │                                      │ │
│  │         1 8 . 5  L                  │ │
│  │         (Carlos anota)              │ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ¿Cuántos litros vendiste hoy?             │
│  ┌──────────────────────────────────────┐ │
│  │   [5]  [10]  [15]  [20]             │ │
│  │                                      │ │
│  │   [25]  [30]  [+]   [-]             │ │
│  │                                      │ │
│  │  Manual: [___] L                    │ │
│  │                                      │ │
│  │  [ ] Hoy no vendí                    │ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [  CONFIRMAR 18.5 L  ]                   │
│                                            │
│  Si discrepas con Carlos, ambos valores    │
│  se registran. Carlos verá tu versión.    │
│                                            │
└────────────────────────────────────────────┘
```

## Flujo del usuario

### Caso 1: Coincide el valor
1. Carlos anota 18.5 L en su app.
2. Juan recibe push: "Confirmar 18.5 L hoy".
3. Juan abre la app.
4. Juan ve el número 18.5 L.
5. Juan toca el botón "CONFIRMAR 18.5 L".
6. Sistema registra la confirmación. Cierra la pantalla.

### Caso 2: Difiere el valor
1. Carlos anota 18 L en su app.
2. Juan sabe que vendió 19.5 L.
3. Juan recibe push.
4. Juan abre la app.
5. Juan ve el número 18 L.
6. Juan toca "20" (o cualquier valor cercano).
7. Juan edita manualmente a 19.5 L.
8. Juan toca "CONFIRMAR 19.5 L".
9. Sistema registra: 18 L (Carlos) y 19.5 L (Juan).
10. Sistema notifica a Carlos de la discrepancia.
11. Carlos ve la discrepancia y puede ajustar antes del cierre.

### Caso 3: No vendió ese día
1. Carlos no vino a recoger (lluvia, ausencia).
2. Juan abre la app.
3. Juan ve "No se registró venta hoy".
4. Juan toca "[ ] Hoy no vendí".
5. Sistema marca ese día como 0 L en ambos lados.

### Caso 4: Carlos registró pero Juan no
1. Carlos anota 18 L.
2. Juan no abre la app.
3. Después de 24h, sistema envía recordatorio.
4. Juan confirma después.
5. Si pasan 3 días sin confirmar, sistema marca como "Pendiente de confirmación" pero mantiene el valor de Carlos.

## Lógica de los botones quick

### Valores por defecto
- 5, 10, 15, 20, 25, 30 L
- Estos son los **valores más comunes** en la región.
- Configurables por el admin si una región tiene rangos distintos (ej. costa con producción mayor).

### Botones +/-
- Incrementa/decrementa en 1 L.
- Mantiene la selección actual.
- Útil para ajustes finos.

### Input manual
- Teclado numérico.
- Hasta 2 decimales.
- Validación: 0 < valor < 100 (sanity check).
- Valor persiste después de confirmado para mostrar histórico.

### Casilla "Hoy no vendí"
- Switch grande.
- Cuando activa: bloquea el input numérico.
- Registra valor 0 para ese día.

## Persistencia de la pantalla

- Si Juan abre la app, confirma a medias y cierra: el estado se guarda en Drift.
- Al volver, ve su entrada parcial.
- Si hay confirmación parcial: muestra "Pendiente" para Juan y "Discrepancia parcial" para Carlos.

## Sincronización

- **Escritura local** siempre primero (Drift).
- **Sync al backend** cuando hay conexión (background).
- **Idempotency key** en cada POST para evitar duplicados.

## Edge cases

### Juan edita después de que Carlos cerró la liquidación
- Si la liquidación ya está cerrada: Juan no puede cambiar el valor directamente.
- Juan debe abrir una **disputa** que el lechero y admin revisan.
- Esto preserva la integridad del contrato cerrado.

### Juan registra valor muy alto o muy bajo (>100L o <1L)
- Validación: warning, no bloqueo (puede ser legítimo si tuvo vaca extra o algo excepcional).
- Log para análisis posterior.

### Juan no confirma en absoluto
- Después de 3 días: valor de Carlos se mantiene como "definitivo" para efectos de cierre.
- Juan puede ver su discrepancia pendiente cuando quiera.
- Al cierre, ambos valores se imprimen en la liquidación final.

## Componentes Flutter necesarios

- `RegistroScreen` — pantalla principal.
- `QuickEntryGrid` — botones de números rápidos.
- `NumericInput` — input manual con validación.
- `NoVendiSwitch` — switch para marcar día no vendido.
- `ConfirmButton` — botón principal de confirmación.
- `DiscrepancyBanner` — banner si hay diferencia con Carlos.

## Métricas UX

- **Tiempo promedio** de confirmación: target < 30 segundos.
- **Tasa de confirmación** el mismo día: target > 80%.
- **Tasa de discrepancia > 1L**: target < 5% de los días.
- **Tasa de "No vendí" usado correctamente**: target > 90% (no abuso).