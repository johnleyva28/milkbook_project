# "No vendí hoy" — Manejo del día sin venta

## Concepto

El productor (Juan) tiene días en los que **no vende leche** al lechero (Carlos). Razones:
- Carlos no vino (clima, ausencia, enfermedad).
- Las vacas estaban secas o enfermas.
- Decidió guardar la leche para quesillo.
- Festividad local (no hay recolección).

## Por qué es importante manejarlo explícitamente

### Problema actual
- Carlos anota "Juan — 0 L" implícitamente (no hay entrada).
- Juan registra en su cuaderno "no vendí".
- Al cierre, si Juan vendió 0 L ese día, no hay discusión.
- Pero si Carlos **no vino** y **no anota nada**, hay ambigüedad: ¿Juan no vendió? ¿O Carlos olvidó anotar?

### Solución propuesta
- La app del **cliente** tiene un botón explícito "**No vendí**".
- Si Juan marca "No vendí", el sistema registra 0 L para ese día, **vinculado a la razón**.
- Si Carlos no registró nada, el sistema lo trata como **"no vino"** (no como "no vendí" del cliente).

## Flujo del usuario

### Caso A: Carlos no vino
1. Carlos no registra nada ese día en su app.
2. Juan abre su app.
3. Juan ve "No se registró venta hoy. ¿Vendiste leche?"
4. Juan tiene dos opciones:
   - **"Sí vendí"** → registra los litros que vendió (a quién se los vendió).
   - **"No vendí"** → marca el día como 0 L.
5. Sistema registra el estado.

### Caso B: Carlos sí vino pero Juan no vendió
1. Carlos llega y le dice a Juan "hoy no".
2. Carlos no registra nada en su app.
3. Juan abre su app.
4. Juan ve el mismo escenario que arriba.
5. Juan marca "No vendí".
6. Carlos puede confirmar o no (es opcional).

### Caso C: Carlos registró y Juan confirma
1. Carlos registra 18 L en su app.
2. Juan recibe push.
3. Juan confirma.
4. Caso normal.

## Implementación

### Widget: `NoVendiSwitch`
- Switch grande (mínimo 60×60 dp).
- Label: "Hoy no vendí".
- Color: rojo apagado cuando activado.
- Confirmación: diálogo "¿Estás seguro? Si vendiste a otro comprador, registra los litros."
- Si confirma: estado "NO_VENDIO" para ese día.

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

## Estado en la base de datos

```
RegistroDiario:
  - id
  - contrato_id
  - fecha
  - litros_carlos: float (lo que Carlos registró)
  - litros_cliente: float (lo que el cliente confirmó/corregió)
  - estado: enum
    - REGISTRADO (Carlos registró, cliente pendiente)
    - CONFIRMADO_COINCIDE (ambos coinciden)
    - CONFIRMADO_DISCREPANCIA (ambos registran, distinto)
    - NO_VENDIO (cliente confirmó que no vendió)
    - CARLOS_NO_VINO (cliente no confirmó; se asume Carlos no vino)
    - PENDIENTE_VENCIDO (>3 días sin confirmación)
  - razon_no_vendio: text? (opcional)
```

## Lógica de cierre

### Si Juan marca "No vendí":
- El sistema asigna 0 L al cliente para ese día.
- Carlos puede ver "Juan marcó que no vendió el 2026-09-15".
- Si Carlos está de acuerdo, acepta.
- Si Carlos registró un valor distinto (ej. Carlos registró 18 L pensando que recogió), hay discrepancia: cliente 0 L vs Carlos 18 L.
- Esta es una **discrepancia crítica** que requiere resolución.

### Si Juan no hace nada durante 3 días:
- Estado: PENDIENTE_VENCIDO.
- Valor del sistema: el de Carlos.
- Juan puede aún editar si quiere.
- Al cierre, se usa el valor de Carlos (con marca de "no confirmado").

### Si Carlos no registró nada:
- El sistema espera 6 horas (ciclo de Carlos).
- Si sigue sin registro, el sistema marca "CARLOS_NO_VINO" automáticamente.
- Juan puede entonces confirmar 0 L o registrar litros (si vendió a otro).

## UI en la app del cliente

### Banner de "No vendí" cuando aplica

```
┌──────────────────────────────────────┐
│  ℹ️ Carlos no registró hoy.          │
│  ¿Vendiste leche a otro comprador?   │
│                                      │
│  [Sí, vendí]  [No vendí hoy]        │
│                                      │
└──────────────────────────────────────┘
```

### Si Juan torea "No vendí"

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
│  [Cancelar]  [Confirmar]            │
│                                      │
└──────────────────────────────────────┘
```

## Edge cases

### Juan marca "No vendí" pero Carlos ya registró 18 L
- Sistema detecta discrepancia crítica.
- Carlos ve "Juan dice que no vendió, pero yo registré 18 L".
- Carlos debe resolver (o admin si no se resuelve).

### Juan marca "No vendí" pero el sistema tiene un registro previo de Carlos
- Se prioriza el registro de Juan (su declaración).
- Carlos es notificado para revisar.

### Cambios de último momento
- Juan puede editar su declaración de "No vendí" a "Sí vendí" dentro del día (antes de medianoche).
- Después de medianoche, requiere abrir disputa.

## Métricas

- **% de días marcados como "No vendí"** por cliente: debería ser ~5-15% en condiciones normales.
- **% de días sin registro de Carlos**: trackear para mejorar la puntualidad de Carlos.
- **% de discrepancias tipo "0 vs >0"**: crítico, requiere investigación.