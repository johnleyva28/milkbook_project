# Lógica de Discrepancias

## Contexto validado

**Dato del usuario:** Las discrepancias entre lo que anota el lechero (Carlos) y lo que dice el productor (Juan) ocurren **hasta 5 días al mes**. Se discuten verbalmente y se decide en el momento.

El sistema debe permitir **editar varios días el litraje al momento de sacar cuentas** (palabras textuales del usuario).

## Modelo conceptual

### Doble registro (intencional, no error)

**Decisión arquitectónica clave:** El sistema **NO** considera la discrepancia como un conflicto a resolver con LWW. Es **doble registro intencional** que se mantiene hasta la resolución.

```
Registro diario:
  - litros_carlos: lo que Carlos registró
  - litros_cliente: lo que Juan confirmó/corregió
  - estado: REGISTRADO | CONFIRMADO_COINCIDE | CONFIRMADO_DISCREPANCIA | NO_VENDIO | CARLOS_NO_VINO | PENDIENTE_VENCIDO
```

Ambos valores se mantienen. La resolución se hace **explícitamente** durante la sacada de cuentas.

## Estados del registro diario

### 1. REGISTRADO
- Carlos registró litros, Juan aún no confirma.
- **Trigger:** Carlos guarda litros en la app.
- **Siguiente estado:** CONFIRMADO_COINCIDE o CONFIRMADO_DISCREPANCIA (cuando Juan confirma) o NO_VENDIO (si Juan marca "no vendí") o PENDIENTE_VENCIDO (si pasan 3 días sin acción).

### 2. CONFIRMADO_COINCIDE
- Carlos y Juan registran el mismo valor.
- **Trigger:** Juan confirma y `litros_carlos == litros_cliente`.
- **Acción:** No hay más cambios (salvo edición durante sacada de cuentas).

### 3. CONFIRMADO_DISCREPANCIA
- Carlos y Juan registran valores diferentes.
- **Trigger:** Juan confirma y `litros_carlos != litros_cliente`.
- **Acción:** Se muestra la discrepancia en la UI. Se puede editar al momento de la sacada de cuentas.
- **Resolución:** al cierre del contrato, se usa el valor de Carlos (o el que se acuerde en la sacada de cuentas).

### 4. NO_VENDIO
- Juan confirma que no vendió ese día.
- **Trigger:** Juan marca switch "No vendí".
- **Acción:** `litros_cliente = 0`, pero `litros_carlos` puede tener cualquier valor (incluso > 0, indicando que Carlos cree que sí vendió). Se marca como discrepancia crítica.
- **Resolución:** en sacada de cuentas, Carlos y Juan aclaran.

### 5. CARLOS_NO_VINO
- Carlos no registró nada ese día.
- **Trigger:** pasaron 6+ horas del día y Carlos no registró.
- **Acción:** Sistema marca automáticamente.
- Juan puede entonces confirmar 0 L (no vendió) o registrar litros (si vendió a otro).

### 6. PENDIENTE_VENCIDO
- Pasaron 3+ días sin que Juan confirme.
- **Trigger:** cron job diario.
- **Acción:** Al cierre, se usa el valor de Carlos (con marca de "no confirmado").

## Diagrama de estados

```
        ┌────────────┐
        │  (inicio)  │
        └─────┬──────┘
              │ Carlos registra
              ▼
        ┌────────────┐
        │ REGISTRADO│◄─────────┐
        └─────┬──────┘          │
              │                 │
       ┌──────┼──────┬──────────┴──────┐
       │      │      │                 │
       ▼      ▼      ▼                 │
  ┌────────┐ ┌────┐ ┌──────────┐    (3 días sin acción)
  │NO_VEND.│ │CONF│ │CONF_DISC.│─────────┐
  └────────┘ │COIN│ └──────────┘         │
            └────┘                       ▼
                                    ┌──────────────┐
                                    │PENDIENTE_VENC│
                                    └──────────────┘
              │
              ▼ (Carlos no registró en 6h)
        ┌─────────────────┐
        │ CARLOS_NO_VINO  │
        └─────────────────┘
```

## Resolución de discrepancia (el momento clave)

### Cuándo ocurre
- **Durante la sacada de cuentas** (2-3 días por quincena, 20-40 min por cliente).
- Carlos y Juan están juntos viendo la app.

### Flujo

```
1. Carlos abre "Cerrar contrato con Juan".
2. Sistema muestra el resumen:
   - 12 días con leche
   - 3 días con discrepancia
   - 1 día "no vendí" confirmado por Juan (pero Carlos registró algo)
   - 1 día sin registro de Carlos
3. Carlos toca en "Ver detalles de discrepancias".
4. Sistema muestra cada día con discrepancia, ambos valores.
5. Carlos y Juan discuten verbalmente.
6. Uno u otro edita el valor (toca el número y lo corrige).
7. Sistema actualiza: el que edita es el "resolvedor".
8. Repite hasta que no haya discrepancias o ambas partes estén de acuerdo.
9. Continúa con el resto del cierre.
```

### UI en la app del lechero (pantalla de sacado de cuentas)

```
┌──────────────────────────────────────────────┐
│  Cerrar contrato con Juan Pérez             │
│  Quincena: 15-29 septiembre                │
│                                              │
│  Resumen:                                    │
│  ✓ 12 días con leche                       │
│  ⚠ 3 días con discrepancia                 │
│  ⚠ 1 día "no vendí" (revisar)              │
│  ℹ 1 día sin registro de Carlos            │
│                                              │
│  [Ver detalles de discrepancias]            │
│  [Ver resumen de adelantos]                 │
│  [Ver resumen de encargos]                  │
│                                              │
│  [Continuar con el cierre]                  │
└──────────────────────────────────────────────┘
```

### UI de edición de discrepancia

```
┌──────────────────────────────────────────────┐
│  Discrepancia: 2026-09-18 (viernes)         │
│                                              │
│  Carlos registró:    18.5 L                 │
│  Juan confirmó:      19.0 L                 │
│  Diferencia:         +0.5 L                 │
│                                              │
│  ¿Cuántos litros se vendieron realmente?     │
│  [ 18.5 ] [ 19.0 ] [ 19.5 ] [ 20 ]         │
│  Manual: [_____] L                          │
│                                              │
│  Resuelto por: Carlos                       │
│                                              │
│  [Cancelar]  [Guardar]                     │
└──────────────────────────────────────────────┘
```

## Cálculo de la liquidación

Una vez resuelto el registro (o aceptado el de Carlos si no se editó), el cálculo es:

```
monto_bruto = Σlitros (valor final después de resolución) × precio_del_contrato
monto_neto = monto_bruto - Σadelantos - Σencargos
```

**Si hay muchos días con discrepancia sin resolver:**
- El sistema usa el valor de Carlos (es el "por defecto").
- Se imprime la liquidación con una nota: "Este contrato tiene N días con discrepancia no resuelta. Se usó el valor del lechero."
- Esto permite al cliente ver qué pasó y reclamar después.

## Auditoría y aprendizaje

- **Toda resolución** queda registrada con `resuelto_por_id`, `resuelto_at`, `valor_final`.
- El admin puede ver: "Cliente X ha tenido N discrepancias en M meses".
- El lechero puede ver: "Mis discrepancias promedio son X% por mes".
- Permite detectar patrones: "El empleado_1 del lechero Y genera el 80% de las discrepancias".

## Casos edge

### Juan no confirma en absoluto
- Después de 3 días: estado PENDIENTE_VENCIDO.
- Al cierre, se usa el valor de Carlos.
- Juan puede aún editar si quiere (hasta que la liquidación se cierre).

### Carlos registra pero Juan no vende
- Juan marca "no vendí" en la app.
- Aparece discrepancia crítica: 0 (cliente) vs X (lechero).
- Se discute en la sacada de cuentas.

### Juan vende pero Carlos no vino
- Carlos no registra nada.
- Estado: CARLOS_NO_VINO.
- Juan puede registrar litros (si vendió a otro) o marcar "no vendí".

### Conflicto no resuelto
- Si después del cierre del contrato hay discrepancia NO resuelta, se mantiene el valor de Carlos pero se registra en `audit_log`.
- Admin puede revisar y contactar al cliente.

### Múltiples discrepancias en un mismo día (raro)
- Si Carlos registra múltiples veces el mismo día (error), se toma la última versión.
- Si Juan confirma varias veces, se toma la última.

## Métricas

- **% de discrepancias por mes**: target < 5%.
- **Tiempo medio de resolución**: target < 2 minutos por discrepancia en sacada de cuentas.
- **% de discrepancias resueltas por Carlos vs por Juan**: medir para entender quién "cede" más.
- **% de discrepancias que requieren admin**: target < 1%.