# App Cliente — Pantalla Principal: Confirmar Litros

## Contexto validado

**Datos del usuario:**
- 90% de los productores tienen smartphone.
- Sí saben leer y escribir (la mayoría); con apoyo familiar si no.
- Las discrepancias se resuelven en la mañana, no después.
- A veces un lechero manda a un empleado (1 día/semana).
- Las notificaciones push son bien recibidas si son claras.
- La boleta llega en PDF al email (si tiene) o se descarga.

## Pantalla: "Confirmar litros de hoy"

### Flujo típico del cliente

```
1. Juan está en su corral ordeñando.
2. Carlos llega con la moto (o el empleado del lechero).
3. Carlos vierte la leche.
4. Carlos registra en su app: 18.5 L.
5. Juan recibe push: "Carlos registró 18.5 L hoy".
6. Juan abre la app (con manos húmedas, prisa).
7. Juan ve el valor registrado por Carlos.
8. Juan confirma o corrige.
9. Listo, sigue ordeñando.
```

### Tiempo objetivo: menos de 30 segundos

Esta es la pantalla que Juan ve **todos los días**. Cada segundo cuenta. Debe ser:

- **Rápida** (un toque confirma).
- **Clara** (número grande).
- **Tolerante a errores** (puede editar después).
- **Accesible con manos mojadas** (botones grandes).

## Diseño: principios

1. **Una sola pantalla** sin scroll crítico.
2. **Botones quick grandes** (5, 10, 15, 20, 25, 30).
3. **Input manual** con teclado numérico y decimales.
4. **Switch "No vendí"** prominente.
5. **Feedback inmediato** (confirmación visual + haptic).
6. **Accesible** (modo alto contraste, tamaño de texto ajustable).

## Pantalla: Confirmar litros (Juan confirma lo que Carlos registró)

```
┌──────────────────────────────────────┐
│ ← Confirmar litros                │
├──────────────────────────────────────┤
│                                      │
│  Hoy, 18 de septiembre             │
│  Lechero: Carlos                    │
│                                      │
│  Carlos registró:                    │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │        1 8 . 5  L          │  │
│  │     (lo que Carlos dice)     │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                      │
│  ¿Cuántos vendiste tú?             │
│  ┌──────────────────────────────┐  │
│  │   [5]  [10]  [15]  [20]    │  │
│  │   [25]  [30]  [+]   [-]    │  │
│  │                              │  │
│  │  Manual: [_______] L        │  │
│  │                              │  │
│  │  ☐ Hoy no vendí              │  │
│  └──────────────────────────────┘  │
│                                      │
│  [  CONFIRMAR 18.5 L  ]            │
│                                      │
│  Si discrepas con Carlos, ambos    │
│  valores se registran. Carlos      │
│  verá tu versión.                  │
│                                      │
└──────────────────────────────────────┘
```

## Pantalla: Cuando hay discrepancia (Juan corrige a 19.5)

```
┌──────────────────────────────────────┐
│ ← Confirmar litros                │
├──────────────────────────────────────┤
│                                      │
│  Hoy, 18 de septiembre             │
│  Lechero: Carlos                    │
│                                      │
│  Carlos registró:                    │
│  ┌──────────────────────────────┐  │
│  │        1 8 . 5  L          │  │
│  └──────────────────────────────┘  │
│                                      │
│  ¿Cuántos vendiste tú?             │
│  ┌──────────────────────────────┐  │
│  │   [5]  [10]  [15]  [20]    │  │
│  │   [25]  [30]  [+]   [-]    │  │
│  │   18.5 (seleccionado)       │  │
│  │                              │  │
│  │  Manual: [_____] L          │  │
│  │                              │  │
│  │  ☐ Hoy no vendí              │  │
│  └──────────────────────────────┘  │
│                                      │
│  [  CONFIRMAR 19.5 L  ]            │
│                                      │
│  ⚠ Quedará discrepancia con Carlos │
│  (él registró 18.5, tú 19.5).     │
│  Se discutirá al sacar cuentas.    │
│                                      │
└──────────────────────────────────────┘
```

## Pantalla: "No vendí hoy"

```
┌──────────────────────────────────────┐
│ ← Hoy no vendí                     │
├──────────────────────────────────────┤
│                                      │
│  ⚠ ¿Estás seguro que no vendiste  │
│     hoy?                            │
│                                      │
│  Por favor confirma:                │
│                                      │
│  ¿Por qué? (opcional)             │
│  ○ Vacas secas                      │
│  ○ Carlos no vino                  │
│  ○ Vendí a otro                    │
│  ○ Enfermedad                       │
│  ○ Festividad                       │
│  ○ Otra: [_________________]      │
│                                      │
│  [Cancelar]  [Confirmar no vendí] │
│                                      │
└──────────────────────────────────────┘
```

## Pantalla: Confirmación exitosa

```
┌──────────────────────────────────────┐
│                                      │
│          ✓ 19.5 L confirmados        │
│                                      │
│     Tu registro se ha guardado.     │
│                                      │
│     [Volver al inicio]                │
│                                      │
└──────────────────────────────────────┘
```

(esta pantalla se muestra brevemente y se cierra automáticamente)

## Pantalla: Home del cliente

```
┌──────────────────────────────────────────────────────┐
│ Bienvenido, Juan                                     │
│ Lechero activo: Carlos                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  🔔  Notificaciones (2)                             │
│                                                      │
│  Hoy, hace 1 hora:                                 │
│  Carlos registró 18.5 L. [Confirmar]                │
│                                                      │
│  Ayer:                                              │
│  Cambio de precio desde 1 oct. Ver.                │
│                                                      │
│  [Ver todas]                                         │
│                                                      │
│  ┌─ Quincena actual (15-29 sept) ────────────────┐  │
│  │  Días restantes: 3                          │  │
│  │  Litros vendidos: 87.5 L (al día 13)         │  │
│  │  Precio actual: S/ 1.50/L                   │  │
│  │  Adelantos pendientes: S/ 80                │  │
│  │  Encargos pendientes: 1                    │  │
│  │  Estimado a recibir: S/ 90.25              │  │
│  │                                              │  │
│  │  [Ver detalle]                                │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  [Mi contrato]  [Historial]  [Mi cuenta]          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Pantalla: Mi contrato actual

```
┌──────────────────────────────────────────────────────┐
│ ← Mi contrato con Carlos                            │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Período: 15 - 29 septiembre                        │
│  Días transcurridos: 13 / 15                       │
│  Días restantes: 2                                  │
│                                                      │
│  [Ver registros]  [Ver adelantos]  [Ver encargos]  │
│                                                      │
│  ┌─ Resumen ───────────────────────────────────┐    │
│  │  Días con leche: 11                        │    │
│  │  Días sin venta: 1 (marcaste no vendí)    │    │
│  │  Días discrepancia: 2 (pendiente cerrar)  │    │
│  │  Total litros: 87.5 L                     │    │
│  │  Precio: S/ 1.50/L                       │    │
│  │  Subtotal: S/ 131.25                      │    │
│  │  Adelantos dados: S/ 100                  │    │
│  │  Encargos: S/ 18                          │    │
│  │  A recibir (estimado): S/ 13.25           │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  [Cerrado de quincena programado para 29 sept]      │
│  [Carlos vendrá a tu casa a sacar cuentas]          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Lógica de confirmación (cliente)

```dart
Future<void> confirmarLitros({
  required String registroLocalId,
  required double litrosCliente,
  required bool noVendi,
  String? razonNoVendi,
}) async {
  final db = _db;
  final now = DateTime.now().toUtc();
  final opId = const Uuid().v4();

  await db.transaction(() async {
    // 1. Actualizar registro local
    await db.into(db.registrosDiarios).insertOnConflictUpdate(
      RegistrosDiariosCompanion.insert(
        localId: Value(registroLocalId),
        // ... otros campos
        litrosCliente: Value(noVendi ? 0.0 : litrosCliente),
        estado: Value(noVendi ? 'NO_VENDIO' : 'CONFIRMADO_COINCIDE'),
        razonNoVendio: Value(noVendi ? razonNoVendi : null),
        confirmadoPorClienteAt: Value(now),
        updatedAt: Value(now),
        serverUpdatedAt: Value(null),
      ),
    );

    // 2. Encolar en outbox para sync
    await db.into(db.outboxItems).insert(OutboxItemsCompanion.insert(
      opId: opId,
      entityType: 'registro',
      entityLocalId: registroLocalId,
      operation: 'update',
      payload: jsonEncode({
        'local_id': registroLocalId,
        'litros_cliente': noVendi ? 0.0 : litrosCliente,
        'no_vendi': noVendi,
        'razon_no_vendio': razonNoVendi,
        'client_timestamp': now.toIso8601String(),
        'idempotency_key': opId,
      }),
      idempotencyKey: opId,
      nextRunAt: Value(now),
    ));
  );

  // 3. Intentar sync inmediato
  unawaited(_syncEngine.trySync());
}
```

## Edge cases

### Juan no tiene smartphone o no puede confirmar
- Carlos registra como "pendiente" (no confirmado por Juan).
- Al cierre, se usa el valor de Carlos.
- Juan puede reclamar después abriendo una disputa.

### Carlos registró pero Juan NO vendió
- Juan marca "no vendí".
- Si Carlos también registró algo (>0), es una discrepancia crítica.
- Se discute al cierre.

### Carlos no vino
- Juan ve "Carlos no registró hoy".
- Juan puede marcar "no vendí" o "vendí a otro" (futuro).

### Juan edita después de Carlos
- Juan puede editar cualquier registro del período.
- Al cierre, Carlos ve la versión final de Juan.

### Juan no confirma en absoluto
- Estado PENDIENTE_VENCIDO.
- Al cierre, se usa el valor de Carlos.
- Juan puede aún editar si quiere (hasta que la liquidación se cierre).

## Métricas

- **Tasa de confirmación el mismo día**: target > 80%.
- **Tasa de discrepancia confirmada**: target < 5%.
- **% de "no vendí" usado correctamente**: target > 90% (no abuso).
- **Tiempo medio de confirmación**: target < 30 segundos.