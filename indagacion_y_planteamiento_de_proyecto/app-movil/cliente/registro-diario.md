# Registro diario de litros — Pantalla clave del Cliente

## Objetivo

Permitir al cliente **registrar, confirmar o corregir** la cantidad de leche del día, **en menos de 30 segundos por día**.

## Cambio importante: flujo v3 (doble registro)

> **Antes:** Carlos siempre registraba primero; Juan confirmaba después.
> **Ahora:** ambos lados pueden registrar primero, y Carlos siempre marca "✓ recogido" cuando físicamente recoge la leche. Ver [`confirmar-litros.md`](./confirmar-litros.md) para el flujo completo del cliente y [`../lechero/confirmar-recoleccion.md`](../lechero/confirmar-recoleccion.md) para el flujo del lechero.

## Pantalla: "Confirmar litros de hoy"

### Estructura visual (caso A — vendedor registró primero, Carlos ya marcó recogido)

```
┌────────────────────────────────────────────┐
│ [Atrás]              Confirmar litros    │
├────────────────────────────────────────────┤
│                                            │
│  Lechero: Carlos                            │
│  Quincena: 15-29 septiembre                 │
│                                            │
│  ✓ Carlos recogió 17 L                     │
│  (tú habías puesto 17 L)                   │
│                                            │
│  ¿Confirmas? (requiere tu firma)           │
│  ┌──────────────────────────────────────┐ │
│  │ [👆 CONFIRMAR CON HUELLA]            │ │
│  │ [🔒 CONFIRMAR CON PIN]               │ │
│  │ [🔑 CONFIRMAR CON CONTRASEÑA]       │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  O corrige si es diferente:                 │
│  Manual: [___] L                            │
│                                            │
│  [ ✕ No vendí hoy ]                         │
│                                            │
└────────────────────────────────────────────┘
```

### Caso A — El vendedor registra primero

```
Madrugada
─────────
05:30  Juan ordeña 5 vacas y obtiene 17 L.
05:35  Juan abre su app, registra "17 L", toca "Guardar".
       Estado: ESPERANDO_LECHERO.

Cuando Carlos recoge
─────────────────────
06:10  Carlos vierte la leche, ve "17 L" en su pantalla.
06:14  Carlos toca "✓ Recogido: 17 L" (coincide).
       Estado: RECOGIDO_COINCIDE.

Cuando Juan confirma (push inmediato)
──────────────────────────────────────
       Juan ve la pantalla de arriba (con botones de firma).
       Juan toca [👆 CONFIRMAR CON HUELLA].
       Estado: RECOGIDO_COINCIDE (firmado).
```

### Caso B — Carlos registra solo

```
Madrugada
─────────
05:30  Juan ordeña 17 L pero NO abre la app.

Cuando Carlos recoge
─────────────────────
06:10  Carlos vierte la leche. Ve "Hoy no hay registro del vendedor" en su app.
       Carlos registra "16.5 L" y marca "✓ Recogido".
       Estado: RECOGIDO_SIN_CONFIRMAR.

Más tarde, Juan abre la app
───────────────────────────────
       Juan ve "Carlos registró 16.5 L. ¿Confirmas?"
       Juan toca [👆 SÍ, CONFIRMAR 16.5 L].
       Estado: RECOGIDO_COINCIDE (firmado).
```

### Caso 3: No vendió ese día

```
1. Carlos no vino a recoger (lluvia, ausencia).
2. Juan abre la app.
3. Juan ve "No se registró venta hoy".
4. Juan toca [ ✕ No vendí hoy ].
5. Juan confirma con PIN o huella.
6. Sistema marca ese día como 0 L en ambos lados.
   Estado: NO_VENDIO.
```

### Caso 4: Discrepancia detectada por Carlos

```
1. Juan registra "17 L" en la app.
2. Carlos llega, vierte, su bidón marca 16.5 L.
3. Carlos marca "⚠ Recogido con diferencia" → 16.5 L.
4. Estado: RECOGIDO_DISCREPANCIA.
5. Juan ve push: "Carlos recogió 16.5 L. Tú habías puesto 17 L. Diferencia 0.5 L."
6. Juan elige:
   - [👆 ACEPTAR 16.5 L DE CARLOS] (firma)
   - [🔒 MANTENER MIS 17 L (DISPUTA)]
   - [✏️ OTRA CANTIDAD]
```

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

### Juan no confirma en absoluto (>24 h)
- Estado: `RECOGIDO_SIN_CONFIRMAR` (vencido).
- Se usa valor de Carlos como definitivo.
- Juan puede aún abrir una disputa si quiere.

### Juan no tiene smartphone o no sabe firmar
- Carlos marca "✓ Recogido" sin firma del vendedor.
- Se usa solo firma del lechero para ese registro.
- Al cierre, Juan puede firmar la liquidación completa (que es lo crítico legalmente).

## Componentes Flutter necesarios

- `RegistroScreen` — pantalla principal.
- `QuickEntryGrid` — botones de números rápidos.
- `NumericInput` — input manual con validación.
- `NoVendiSwitch` — switch para marcar día no vendido.
- `FirmaButtons` — botones para confirmar con PIN/huella/cara/contraseña.
- `ConfirmButton` — botón principal de confirmación.
- `DiscrepancyBanner` — banner si hay diferencia con Carlos.

## Métricas UX

- **Tiempo promedio** de confirmación (incluyendo firma): target < 30 segundos.
- **Tasa de confirmación con firma** el mismo día: target > 80%.
- **Tasa de discrepancia > 1L**: target < 5% de los días.
- **Tasa de "No vendí" usado correctamente**: target > 90% (no abuso).
- **% de casos B (vendedor no registró)**: target < 20%.