# "No vendí hoy" — Manejo del día sin venta (flujo v3)

## Concepto

El productor (Juan) tiene días en los que **no vende leche** al lechero (Carlos). Razones:
- Carlos no vino (clima, ausencia, enfermedad).
- Las vacas estaban secas o enfermas.
- Decidió guardar la leche para quesillo.
- Festividad local (no hay recolección).

## Por qué es importante manejarlo explícitamente

### Problema que resuelve
- Carlos anota "Juan — 0 L" implícitamente (no hay entrada).
- Juan registra en su cuaderno "no vendí".
- Al cierre, si Juan vendió 0 L ese día, no hay discusión.
- Pero si Carlos **no vino** y **no anota nada**, hay ambigüedad: ¿Juan no vendió? ¿O Carlos olvidó anotar?

### Solución v3 (con doble registro)
- La app del **cliente** tiene un botón explícito "**No vendí**".
- Si Juan marca "No vendí", el sistema registra 0 L para ese día, **vinculado a la razón** y con **firma digital**.
- Si Carlos no registró nada, el sistema lo trata como **"no vino"** (no como "no vendí" del cliente).
- Si Carlos marcó "✓ recogido" pero Juan dice "no vendí", hay **discrepancia crítica** (estado `RECOGIDO_DISCREPANCIA`).

## Flujo del usuario

### Caso A: Carlos no vino
1. Carlos no registra nada ese día en su app.
2. Juan abre su app.
3. Juan ve "No se registró venta hoy. ¿Vendiste leche?"
4. Juan tiene dos opciones:
   - **"Sí vendí"** → registra los litros que vendió (a quién se los vendió).
   - **"No vendí"** → marca el día como 0 L (con razón y firma).
5. Sistema registra el estado: `NO_VENDIO` (si no vendió) o `RECOGIDO_COINCIDE` (si vendió a otro).

### Caso B: Carlos sí vino pero Juan no vendió
1. Carlos llega y le dice a Juan "hoy no" (por la razón que sea).
2. Carlos marca "✕ No recogí" en su app (con razón opcional).
3. Juan abre su app.
4. Juan ve "Carlos no recogió hoy. ¿Vendiste leche?"
5. Juan marca "No vendí" (con firma).
6. Estado: `NO_VENDIO`.

### Caso C: Carlos marcó "✓ recogido" pero Juan dice "no vendí" (discrepancia crítica)
1. Carlos vierte la leche, registra 18 L, marca "✓ Recogido".
2. Juan no estaba o se equivocó y luego marca "no vendí".
3. Estado: `RECOGIDO_DISCREPANCIA`.
4. Carlos ve push: "⚠ Juan dice que no vendió pero yo registré 18 L".
5. Carlos debe resolver:
   - Hablar con Juan (verificar).
   - Si fue error de Juan → mantener 18 L.
   - Si fue error de Carlos (registró mal) → corregir a 0 L.
6. La discrepancia se discute al cierre.

### Caso D: Carlos registró y Juan confirma (caso normal)
1. Carlos registra X L en su app y marca "✓ Recogido".
2. Juan recibe push.
3. Juan confirma con PIN o huella.
4. Caso normal: `RECOGIDO_COINCIDE`.

## Implementación

### Widget: `NoVendiSwitch`
- Switch grande (mínimo 60×60 dp).
- Label: "Hoy no vendí".
- Color: rojo apagado cuando activado.
- Confirmación: diálogo "¿Estás seguro? Si vendiste a otro comprador, registra los litros."
- Si confirma: estado `NO_VENDIO` para ese día.
- **Requiere firma digital** (PIN/huella/cara/contraseña) porque es una declaración con valor legal.

### Razones predefinidas (opcional)
Para distinguir, el usuario puede elegir razón:
- "Vacas secas"
- "Carlos no vino"
- "Enfermedad"
- "Vendí a otro"
- "Festividad"
- "Otra" (texto libre)

Esto ayuda al lechero a entender patrones:
- Si muchos clientes marcan "Carlos no vino" en el mismo día → problema sistémico (lluvia, paro).
- Si un cliente marca "Vendí a otro" → señal de que la relación se está rompiendo.

## Estado en la base de datos (v3)

```
RegistroDiario:
  - id
  - contrato_id
  - fecha
  - litros_carlos: decimal (lo que Carlos registró y marcó recogido)
  - litros_cliente: decimal (lo que el cliente confirmó/corregió)
  - carlos_reco gio: boolean (Carlos físicamente recogió)
  - recogido_por_carlos_at: timestamp
  - estado: enum (v3)
    - PENDIENTE                  → nadie ha registrado nada
    - ESPERANDO_VENDEDOR         → Carlos marcó recogido, falta vendedor
    - ESPERANDO_LECHERO          → vendedor registró, falta Carlos
    - RECOGIDO_COINCIDE          → ambos coinciden
    - RECOGIDO_DISCREPANCIA      → Carlos recogió, los valores no coinciden
    - RECOGIDO_SIN_CONFIRMAR     → Carlos registró solo (24 h para que vendedor confirme)
    - NO_VENDIO                  → cliente confirmó que no vendió
  - razon_no_vendio: text? (opcional)
  - metodo_firma_cliente: enum (PIN, PASSWORD, BIOMETRIA_DACTILAR, BIOMETRIA_FACIAL)
```

## Lógica de cierre

### Si Juan marca "No vendí" (sin que Carlos haya marcado "✓ recogido")
- El sistema asigna 0 L al cliente para ese día.
- Carlos ve "Juan marcó que no vendió el 2026-09-15".
- Si Carlos está de acuerdo, acepta.
- Si Carlos registró un valor distinto (ej. Carlos registró 18 L pensando que recogió), hay discrepancia: cliente 0 L vs Carlos 18 L.
- Esta es una **discrepancia crítica** que requiere resolución.

### Si Juan marca "No vendí" (pero Carlos ya marcó "✓ recogido")
- Estado: `RECOGIDO_DISCREPANCIA` (crítica).
- Carlos recibe push inmediato: "⚠ Juan dice que no vendió pero yo registré 18 L".
- Carlos debe ir a hablar con Juan o ajustar el registro.

### Si Juan no hace nada durante 24 h (caso B — Carlos registró solo)
- Estado: `RECOGIDO_SIN_CONFIRMAR` (vencido).
- Valor del sistema: el de Carlos.
- Juan puede aún editar si quiere (con PIN/huella).
- Al cierre, se usa el valor de Carlos (con marca de "no confirmado por cliente").

### Si Carlos no registró ni marcó nada
- El sistema espera 6 horas (ciclo de Carlos).
- Si sigue sin registro, el sistema marca `PENDIENTE` automáticamente.
- Juan puede entonces confirmar 0 L o registrar litros (si vendió a otro).

## UI en la app del cliente

### Banner de "No vendí" cuando aplica (caso Carlos no vino)

```
┌──────────────────────────────────────┐
│  ℹ️ Carlos no registró hoy.          │
│  ¿Vendiste leche a otro comprador?   │
│                                      │
│  [Sí, vendí]  [No vendí hoy]        │
│                                      │
└──────────────────────────────────────┘
```

### Si Juan toca "No vendí hoy"

```
┌──────────────────────────────────────┐
│  Confirma que no vendiste hoy        │
│                                      │
│  ¿Por qué? (opcional)               │
│  ○ Vacas secas                       │
│  ○ Carlos no vino                     │
│  ○ Vendí a otro                      │
│  ○ Enfermedad                        │
│  ○ Festividad                        │
│  ○ Otra: [___]                       │
│                                      │
│  Confirma tu identidad:               │
│  [👆 Huella] [🔒 PIN] [🔑 Contraseña]│
│                                      │
│  [Cancelar]  [Confirmar]            │
│                                      │
└──────────────────────────────────────┘
```

## Edge cases

### Juan marca "No vendí" pero Carlos ya registró "✓ recogido" 18 L
- Sistema detecta discrepancia crítica (`RECOGIDO_DISCREPANCIA`).
- Carlos ve push: "⚠ Juan dice que no vendió pero yo registré 18 L".
- Carlos debe resolver (o admin si no se resuelve).

### Juan marca "No vendí" pero el sistema tiene un registro previo de Carlos (caso legacy)
- Se prioriza el registro de Juan (su declaración).
- Carlos es notificado para revisar.
- Migración de estados legacy → nuevos estados (ver schema v3).

### Cambios de último momento
- Juan puede editar su declaración de "No vendí" a "Sí vendí" dentro de 24 h (antes de que el sistema marque como vencido).
- Después de las 24 h, requiere abrir disputa.

### Juan marca "no vendí" pero después Carlos llega tarde ese día
- Si Carlos marca "✓ Recogido" después, el estado cambia a `RECOGIDO_DISCREPANCIA` (cliente 0 vs Carlos X).
- Carlos es notificado para resolver.

## Métricas

- **% de días marcados como "No vendí"** por cliente: debería ser ~5-15% en condiciones normales.
- **% de días sin registro de Carlos**: trackear para mejorar la puntualidad de Carlos.
- **% de discrepancias tipo "0 vs >0"**: crítico, requiere investigación.
- **% de "no vendí" firmado digitalmente**: target > 90%.