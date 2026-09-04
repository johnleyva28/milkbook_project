# App Cliente — Pantalla Principal: Confirmar Litros

## Contexto validado

**Datos del usuario:**
- 90% de los productores tienen smartphone.
- Sí saben leer y escribir (la mayoría); con apoyo familiar si no.
- Las discrepancias se resuelven en la mañana, no después.
- A veces un lechero manda a un empleado (1 día/semana).
- Las notifications push son bien recibidas si son claras.
- La boleta llega en PDF al email (si tiene) o se descarga.

## Flujo v3 (actualizado): doble registro + paso de "✓ recogido"

> **Antes:** solo Carlos registraba primero, y Juan confirmaba después.
> **Ahora:** ambos lados pueden registrar la cantidad de forma independiente, y **Carlos siempre marca "✓ recogido"** cuando físicamente recoge la leche. Luego Juan confirma la cantidad (con firma digital).

Este nuevo flujo **reduce errores** (ambos lados escriben), **acelera la operación** (Juan puede registrar mientras espera), y **resuelve discrepancias en el momento** (Carlos ve la cantidad de Juan antes de irse).

Los dos casos:

| Caso | Vendedor (Juan) | Lechero (Carlos) |
|---|---|---|
| **A — Normal** | Registra la cantidad al ordeñar | Llega, ve la cantidad, marca "✓ Recogido" (con o sin diferencia) |
| **B — Vendedor no registró** | No lo hace | Llega, registra él y marca "✓ Recogido". Juan confirma después |

> **Ver detalle completo del flujo desde el lado del lechero:** [`../lechero/confirmar-recoleccion.md`](../lechero/confirmar-recoleccion.md)

---

## Flujo típico del cliente (caso A — camino feliz)

```
1. Juan está en su corral ordeñando.
2. Juan abre su app y registra: "17 L".
3. Estado: ESPERANDO_LECHERO.

Más tarde, Carlos llega:
4. Carlos vierte la leche.
5. Carlos abre su app y ve "Juan registró 17 L".
6. Carlos marca "✓ Recogido: 17 L (coincide)".
7. Estado: RECOGIDO_COINCIDE.

Push inmediato a Juan:
8. Juan ve: "Carlos recogió 17 L. Confirma para firmar."
9. Juan abre la app (con manos húmedas, prisa).
10. Juan confirma la cantidad con PIN o huella.
11. Estado final: RECOGIDO_COINCIDE (firmado).
12. Listo, Juan sigue con su día.
```

## Flujo caso A.b — diferencia detectada por Carlos

```
1. Juan registra "17 L" en la app.
2. Carlos llega, vierte la leche, su bidón marca 16.5 L.
3. Carlos marca "⚠ Recogido: 16.5 L (diferencia)".
4. Estado: RECOGIDO_DISCREPANCIA.

Push a Juan:
5. Juan ve: "Carlos recogió 16.5 L. Tú habías puesto 17 L. Diferencia 0.5 L."
6. Juan elige:
   - "Aceptar 16.5 L de Carlos" (con firma).
   - "Mantener mi 17 L" (abre disputa).
   - "Otra cantidad" (corrige).
```

## Flujo caso B — Carlos registra porque Juan no pudo

```
1. Juan ordeña 17 L pero no abre la app (sin tiempo, sin señal, etc.).
2. Carlos llega y abre su app.
3. Ve "Hoy no hay registro del vendedor".
4. Carlos vierte la leche, registra 16.5 L y marca "✓ Recogido".
5. Estado: RECOGIDO_SIN_CONFIRMAR (temporal).

Más tarde, Juan abre la app:
6. Ve: "Carlos pasó y registró 16.5 L. ¿Confirmas?"
7. Juan confirma con PIN o huella.
8. Estado: RECOGIDO_COINCIDE (firmado).

Si pasan 24 h sin que Juan confirme:
9. El sistema marca el registro como RECOGIDO_SIN_CONFIRMAR "vencido".
10. Se usa el valor de Carlos como definitivo.
11. Juan puede aún abrir una disputa si no está de acuerdo.
```

---

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
6. **Firma digital** (PIN/huella/cara/contraseña) al confirmar.
7. **Accesible** (modo alto contraste, tamaño de texto ajustable).

---

## Pantalla principal: "Confirmar litros" (caso A — Carlos ya marcó recogido)

```
┌──────────────────────────────────────────────┐
│ ← Confirmar litros                          │
├──────────────────────────────────────────────┤
│                                              │
│  Hoy, 18 de septiembre                       │
│  Lechero: Carlos                              │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  ✓ Carlos recogió: 17 L              │  │  ← verde (coincide)
│  │  Tú habías puesto: 17 L              │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ¿Confirmas?                                 │
│  ┌──────────────────────────────────────┐  │
│  │  [👆 CONFIRMAR CON HUELLA]            │  │  ← firma
│  │  [🔒 CONFIRMAR CON PIN]              │  │
│  │  [🔑 CONFIRMAR CON CONTRASEÑA]       │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  O corrige si hay diferencia:                │
│  Manual: [_______] L                         │
│                                              │
│  [ ✕ No vendí hoy ]                          │
│                                              │
└──────────────────────────────────────────────┘
```

## Pantalla: Discrepancia (caso A.b — Carlos recogió distinta cantidad)

```
┌──────────────────────────────────────────────┐
│ ← Confirmar litros                          │
├──────────────────────────────────────────────┤
│                                              │
│  ⚠ Carlos recogió 16.5 L                    │
│  Tú habías puesto 17 L                       │
│  Diferencia: 0.5 L                            │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  [👆 ACEPTAR 16.5 L DE CARLOS]       │  │  ← firma con 16.5
│  │  [🔒 MANTENER MIS 17 L (DISPUTA)]    │  │  ← firma con 17, abre disputa
│  │  [✏️ OTRA CANTIDAD]                  │  │  ← input manual
│  └──────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

## Pantalla: Caso B — Carlos registró porque Juan no pudo

```
┌──────────────────────────────────────────────┐
│ ← Carlos registró por ti                     │
├──────────────────────────────────────────────┤
│                                              │
│  Carlos pasó y registró 16.5 L               │
│  (tú no habías registrado)                    │
│                                              │
│  ¿Confirmas esa cantidad?                    │
│  ┌──────────────────────────────────────┐  │
│  │  [👆 SÍ, CONFIRMAR 16.5 L]            │  │  ← firma
│  └──────────────────────────────────────┘  │
│                                              │
│  Si fue otra cantidad:                       │
│  [ ✏️ NO, FUE OTRA CANTIDAD ]                │
│                                              │
│  Si no vendiste:                              │
│  [ ✕ NO VENDÍ HOY ]                          │
│                                              │
└──────────────────────────────────────────────┘
```

## Pantalla: "No vendí hoy"

```
┌──────────────────────────────────────────────┐
│ ← Hoy no vendí                               │
├────────────────────────────────────────────────────────────────────┤
│                                              │
│  ⚠ ¿Estás seguro que no vendiste hoy?       │
│                                              │
│  Por favor confirma:                          │
│                                              │
│  ¿Por qué? (opcional)                        │
│  ○ Vacas secas                               │
│  ○ Carlos no vino                            │
│  ○ Vendí a otro                              │
│  ○ Enfermedad                                │
│  ○ Festividad                                │
│  ○ Otra: [_________________]                 │
│                                              │
│  [Cancelar]  [Confirmar no vendí]            │
│                                              │
└──────────────────────────────────────────────┘
```

> **Importante:** Si Carlos también había marcado algo (porque ya pasó), el sistema genera una discrepancia automáticamente. Carlos verá "Juan dice que no vendió pero yo registré X".

## Pantalla: Confirmación exitosa

```
┌──────────────────────────────────────────────┐
│                                              │
│       ✓ 17 L confirmados y firmados          │
│                                              │
│    Tu registro se ha guardado correctamente.  │
│                                              │
│       [Volver al inicio]                     │
│                                              │
└──────────────────────────────────────────────┘
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
│  Carlos recogió 17 L. [Confirmar]                  │
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

## Lógica de confirmación con firma digital (cliente)

```dart
Future<void> confirmarLitros({
  required String registroLocalId,
  required double litrosCliente,
  required bool noVendi,
  String? razonNoVendi,
  required MetodoFirma metodo, // PIN, BIOMETRIA_DACTILAR, etc.
}) async {
  final db = _db;
  final now = DateTime.now().toUtc();
  final opId = const Uuid().v4();

  // 1. Verificar firma digital
  final firmaOk = await _firmaService.verificar(metodo);
  if (!firmaOk) {
    throw Exception('Firma no válida');
  }

  await db.transaction(() async {
    // 2. Determinar estado resultante según coincidencia con Carlos
    final current = await db.registros.getByLocalId(registroLocalId);
    final litrosCarlos = current.litrosCarlos;
    final carlosRecogio = current.carlosRecogio;

    String nuevoEstado;
    if (noVendi) {
      nuevoEstado = litrosCarlos != null && litrosCarlos > 0
          ? 'RECOGIDO_DISCREPANCIA'  // Carlos dijo que recogió pero Juan no vendió
          : 'NO_VENDIO';
    } else if (!carlosRecogio) {
      // Carlos aún no había registrado. Juan registró primero.
      nuevoEstado = 'ESPERANDO_LECHERO';
    } else if (litrosCarlos == litrosCliente) {
      nuevoEstado = 'RECOGIDO_COINCIDE';
    } else {
      nuevoEstado = 'RECOGIDO_DISCREPANCIA';
    }

    // 3. Actualizar registro local
    await db.registros.updateByLocalId(
      registroLocalId,
      RegistrosCompanion(
        litrosCliente: Value(noVendi ? 0.0 : litrosCliente),
        estado: Value(nuevoEstado),
        metodoFirmaCliente: Value(metodo),
        razonNoVendio: Value(noVendi ? razonNoVendi : null),
        clientUpdatedAt: Value(now),
      ),
    );

    // 4. Encolar en outbox para sync
    await db.outboxItems.insert(OutboxItemsCompanion.insert(
      opId: opId,
      entityType: 'registro',
      entityLocalId: registroLocalId,
      operation: 'update',
      payload: jsonEncode({
        'local_id': registroLocalId,
        'litros_cliente': noVendi ? 0.0 : litrosCliente,
        'no_vendi': noVendi,
        'razon_no_vendio': razonNoVendi,
        'metodo_firma': metodo.toString(),
        'client_timestamp': now.toIso8601String(),
        'idempotency_key': opId,
      }),
      idempotencyKey: opId,
      nextRunAt: Value(now),
    ));
  });

  // 5. Intentar sync inmediato
  unawaited(_syncEngine.trySync());
}
```

## Edge cases

### Juan no tiene smartphone o no puede confirmar
- Carlos registra y marca "✓ Recogido".
- Estado: `RECOGIDO_SIN_CONFIRMAR` por 24 h.
- Después de 24 h: se usa el valor de Carlos como definitivo.
- Juan puede reclamar después abriendo una disputa.

### Carlos registró "✓ recogido" pero Juan NO vendió
- Juan marca "no vendí".
- Si Carlos registró algo (>0), es **RECOGIDO_DISCREPANCIA** (crítica).
- Se discute al cierre.

### Carlos no vino
- Juan ve "Carlos no registró hoy".
- Juan puede marcar "no vendí" o registrar litros propios (si vendió a otro).

### Juan edita después de Carlos
- Juan puede editar cualquier registro del período.
- Al cierre, Carlos ve la versión final de Juan.

### Juan no confirma en absoluto (>24 h)
- Estado: `RECOGIDO_SIN_CONFIRMAR` (vencido).
- Al cierre, se usa el valor de Carlos.
- Juan puede aún editar si quiere (hasta que la liquidación se cierre).
- Si Juan quiere cambiar un valor vencido, debe abrir disputa.

### Carlos recoge una cantidad muy distinta (>5 L de diferencia)
- Discrepancia crítica → notificación inmediata al admin.
- El admin puede intervenir si ve patrón sospechoso.

## Métricas

- **Tasa de confirmación con firma el mismo día**: target > 80%.
- **Tasa de discrepancia**: target < 5%.
- **% de "no vendí" usado correctamente**: target > 90% (no abuso).
- **Tiempo medio de confirmación (incluyendo firma)**: target < 30 segundos.
- **% de casos B (vendedor no registró)**: target < 20% del total.