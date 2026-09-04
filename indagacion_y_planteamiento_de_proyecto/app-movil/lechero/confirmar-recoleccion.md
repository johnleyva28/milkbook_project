# App Lechero — Pantalla Crítica: "Confirmar Recolección"

## Contexto y problema resuelto

**Versión anterior del flujo:**
- Carlos (lechero) llegaba al corral, anotaba los litros y los registraba en su app.
- Juan (vendedor) confirmaba o corregía después.

**Problema:** este flujo asumía que **siempre Carlos registra primero**. En la realidad:
- A veces Juan ya tiene la leche ordeñada y lista, y quiere registrar él la cantidad **antes** de que Carlos llegue.
- A veces Juan no tiene tiempo/smartphone a la mano y Carlos tiene que registrar él solo.

**Nuevo flujo validado (v3):** ambos lados pueden registrar la cantidad de forma independiente, y luego se sincronizan con un **paso explícito de "✓ recogido"** por parte del lechero que confirma la cantidad. Esto permite:

1. Reducir errores: ambos lados escriben la cantidad (en distintos momentos).
2. Resolver discrepancias en el momento de la recogida (Carlos ve la cantidad del vendedor antes de irse).
3. Mantener la auditoría: el sistema sabe **quién registró primero** y **cuándo**.

---

## Los dos casos del flujo

### Caso A — El vendedor (Juan) registró primero (camino feliz)

```
Madrugada
─────────
05:30  Juan ordeña sus 5 vacas. Obtiene 17 L.
05:35  Abre la app del cliente y registra: "17 L".
       Estado del registro: ESPERANDO_LECHERO.

Mañana — Carlos llega
──────────────────────
06:10  Carlos llega al corral con su moto.
06:11  Carlos abre su app y va a la pantalla "Confirmar recolección".
06:12  Carlos ve: "Juan registró 17 L".
06:13  Carlos vierte la leche en su bidón y verifica el volumen.
06:14  Carlos toca el botón grande:

       ┌──────────────────────────────────────┐
       │  ✓ RECOGIDO: 17 L (coincide)        │ │
       └──────────────────────────────────────┘

       Estado: RECOGIDO_COINCIDE.
06:15  Carlos se va al siguiente productor.

Cuando Juan vuelve a abrir su app
─────────────────────────────────
       Ve: "Carlos recogió 17 L. Confirma para firmar."

       ┌──────────────────────────────────────┐
       │  Carlos recogió 17 L               │ │
       │  Coincide con lo que registraste.  │ │
       │                                      │ │
       │  [👆 CONFIRMAR CON HUELLA]          │ │
       │  [🔒 CONFIRMAR CON PIN]             │ │
       └──────────────────────────────────────┘

       Juan confirma con su huella.
       Estado: RECOGIDO_COINCIDE (firmado).
```

### Caso A.b — El vendedor registró primero, pero el lechero recogió una cantidad distinta

```
Madrugada
─────────
05:30  Juan ordeña y registra "17 L" en la app.
       Estado: ESPERANDO_LECHERO.

Mañana — Carlos llega y la cantidad NO coincide
───────────────────────────────────────────────
06:10  Carlos llega, vierte la leche.
06:11  Su bidón marca 16.5 L (menos de lo que dijo Juan).
06:12  Carlos ve "Juan registró 17 L" pero la realidad es 16.5.
06:13  Carlos toca "Recogido pero con diferencia":

       ┌──────────────────────────────────────┐
       │  Juan registró: 17 L                │ │
       │  Tú registraste: [16.5] L  ✎        │ │
       │                                      │ │
       │  [✓ REGISTRAR 16.5 L Y MARCAR       │ │
       │      RECOGIDO]                       │ │
       └──────────────────────────────────────┘

       Estado: RECOGIDO_DISCREPANCIA.

Cuando Juan abre su app
────────────────────────
       Ve: "Carlos recogió 16.5 L. Tú habías puesto 17 L."
       Banner amarillo: "Hay una discrepancia de 0.5 L."
       Opciones:
       - "Aceptar 16.5 L de Carlos" (con firma)
       - "Mantener mi 17 L" (abre disputa)
```

### Caso B — El vendedor no lo a la la app, lo hace el lechero

```
Madrugada
─────────
05:30  Juan ordeña 17 L pero NO abre la app (está apurado, sin señal, etc.).

Mañana — Carlos llega
──────────────────────
06:10  Carlos llega al corral.
06:11  Carlos abre la app. Ve "Hoy no hay registro del vendedor".
       Carlos vierte la leche, marca "16.5 L" en su app (faltó un poco).
06:12  Carlos marca:

       ┌──────────────────────────────────────┐
       │  No hay registro del vendedor        │ │
       │  Tú registraste: [16.5] L           │ │
       │                                      │ │
       │  [✓ REGISTRAR Y MARCAR RECOGIDO]    │ │
       └──────────────────────────────────────┘

       Estado: RECOGIDO_SIN_CONFIRMAR (temporal).

Cuando Juan abre su app después
─────────────────────────────────
       Ve: "Carlos pasó y registró 16.5 L. ¿Confirmas?"
       ┌──────────────────────────────────────┐
       │  Carlos registró 16.5 L hoy          │ │
       │  (no habías registrado tú)            │ │
       │                                      │ │
       │  [👆 SÍ, CONFIRMAR 16.5 L]          │ │
       │  [✏️ NO, FUE OTRA CANTIDAD]          │ │
       │  [✕ NO VENDÍ HOY]                   │ │
       └──────────────────────────────────────┘

       Si confirma → RECOGIDO_COINCIDE (firmado).
       Si corrige → abre flujo de discrepancia.
       Si no confirma después de 24 h → estado definitivo
       RECOGIDO_SIN_CONFIRMAR, valor = 16.5 L de Carlos.
```

---

## Pantalla del lechero: "Confirmar recolección" (la MÁS USADA del día)

### Estructura visual

```
┌──────────────────────────────────────────────┐
│ ← Cliente: Juan Pérez          [📞][💬]    │
├──────────────────────────────────────────────┤
│                                              │
│  Hoy, viernes 18 de septiembre              │
│  Contrato: 15-29 sept · S/ 1.50/L           │
│                                              │
│  ┌─ Estado actual ──────────────────────┐  │
│  │  Estado: ESPERANDO_LECHERO            │  │
│  │  Vendedor registró: 17 L              │  │
│  │  Hora: 05:35                          │  │
│  │  (hace 35 minutos)                    │  │
│  └───────────────────────────────────────┘  │
│                                              │
│  ¿Cuántos litros recogiste?                  │
│  ┌─────────────────────────────────────┐  │
│  │  [5]  [10]  [15]  [20]              │  │
│  │  [25]  [30]  [+]   [-]              │  │
│  │  Manual: [17.0] L                   │  │
│  └─────────────────────────────────────┘  │
│                                              │
│  ┌─────────────────────────────────────┐  │
│  │  ✓ RECOGIDO: 17 L (coincide)        │  │  ← verde
│  └─────────────────────────────────────┘  │
│                                              │
│  ┌─────────────────────────────────────┐  │
│  │  ⚠ RECOGIDO CON DIFERENCIA          │  │  ← amarillo
│  └─────────────────────────────────────┘  │
│                                              │
│  ┌─────────────────────────────────────┐  │
│  │  ✕ NO RECOGÍ (no vino / no había)  │  │  ← rojo
│  └─────────────────────────────────────┘  │
│                                              │
│  Última visita: ayer 17 L · Carlos          │
│                                              │
└──────────────────────────────────────────────┘
```

### Cuando NO hay registro del vendedor (caso B)

```
┌──────────────────────────────────────────────┐
│ ← Cliente: Juan Pérez                       │
├──────────────────────────────────────────────┤
│                                              │
│  Hoy, viernes 18 de septiembre              │
│  Contrato: 15-29 sept                        │
│                                              │
│  ┌─ Estado actual ──────────────────────┐  │
│  │  Estado: PENDIENTE                    │  │
│  │  Vendedor NO ha registrado.           │  │
│  │                                      │  │
│  │  (puede ser porque:                   │  │
│  │   • No tuvo tiempo                    │  │
│  │   • No tenía señal                    │  │
│  │   • No abrió la app)                 │  │
│  └───────────────────────────────────────┘  │
│                                              │
│  ¿Cuántos litros recogiste tú?              │
│  ┌─────────────────────────────────────┐  │
│  │  [5]  [10]  [15]  [20]              │  │
│  │  Manual: [____] L                   │  │
│  └─────────────────────────────────────┘  │
│                                              │
│  ┌─────────────────────────────────────┐  │
│  │  ✓ REGISTRAR Y MARCAR RECOGIDO      │  │  ← verde
│  └─────────────────────────────────────┘  │
│                                              │
│  Juan deberá confirmar después desde        │
│  su app.                                     │
│                                              │
└──────────────────────────────────────────────┘
```

### Cuando el vendedor marcó "No vendí"

```
┌──────────────────────────────────────────────┐
│                                              │
│  ℹ Juan marcó "no vendí hoy"                │
│  Razón: "Vacas secas"                        │
│                                              │
│  ┌─────────────────────────────────────┐  │
│  │  ✓ CONFIRMAR QUE NO RECOGÍ          │  │  ← verde
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │  ⚠ SÍ RECOGÍ (Juan se equivocó)     │  │  ← amarillo
│  └─────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Lógica del botón grande (cerebro del flujo)

```dart
enum AccionRecoleccion {
  REGISTRAR_Y_RECOGIDO_COINCIDE,   // Caso A: vendedor ya registró y coincide
  REGISTRAR_Y_RECOGIDO_DISCREPANCIA, // Caso A.b: hay diferencia
  REGISTRAR_SOLO_LECHERO,            // Caso B: vendedor no había registrado
  CONFIRMAR_NO_RECOGIO,              // Vendedor marcó no vendí
  CORREGIR_VENDEDOR_NO_VENDIO,       // Sí recogí aunque Juan dijo que no
}

Future<void> ejecutarAccion({
  required String registroId,
  required AccionRecoleccion accion,
  required double litrosLechero,
}) async {
  final db = _db;
  final now = DateTime.now().toUtc();
  final opId = const Uuid().v4();

  await db.transaction(() async {
    // 1. Actualizar el registro local
    final current = await db.registros.getByLocalId(registroId);
    final currentCliente = current.litrosCliente;

    switch (accion) {
      case REGISTRAR_Y_RECOGIDO_COINCIDE:
        // El vendedor registró X, yo también. Coincide.
        await db.registros.updateByLocalId(
          registroId,
          RegistrosCompanion(
            litrosCarlos: Value(litrosLechero),
            carlosRecogio: Value(true),
            recogidoPorCarlosAt: Value(now),
            estado: Value('RECOGIDO_COINCIDE'),
            valorFinal: Value(litrosLechero), // por ahora
          ),
        );
        break;

      case REGISTRAR_Y_RECOGIDO_DISCREPANCIA:
        // El vendedor registró X, yo registré Y. Distintos.
        await db.registros.updateByLocalId(
          registroId,
          RegistrosCompanion(
            litrosCarlos: Value(litrosLechero),
            carlosRecogio: Value(true),
            recogidoPorCarlosAt: Value(now),
            estado: Value('RECOGIDO_DISCREPANCIA'),
            // valorFinal se resuelve después (en la sacado de cuentas)
          ),
        );
        break;

      case REGISTRAR_SOLO_LECHERO:
        // Vendedor no había registrado. Yo registro y marco recogido.
        await db.registros.updateByLocalId(
          registroId,
          RegistrosCompanion(
            litrosCarlos: Value(litrosLechero),
            carlosRecogio: Value(true),
            recogidoPorCarlosAt: Value(now),
            estado: Value('RECOGIDO_SIN_CONFIRMAR'),
            valorFinal: Value(litrosLechero),
          ),
        );
        break;

      case CONFIRMAR_NO_RECOGIO:
        await db.registros.updateByLocalId(
          registroId,
          RegistrosCompanion(
            carlosRecogio: Value(false),
            estado: Value('NO_VENDIO'),
          ),
        );
        break;

      case CORREGIR_VENDEDOR_NO_VENDIO:
        // Juan dijo no vendió pero yo sí recogí.
        await db.registros.updateByLocalId(
          registroId,
          RegistrosCompanion(
            litrosCarlos: Value(litrosLechero),
            carlosRecogio: Value(true),
            recogidoPorCarlosAt: Value(now),
            estado: Value('RECOGIDO_DISCREPANCIA'),
            notas: Value('Vendedor marcó no vendió pero sí se recogió'),
          ),
        );
        break;
    }

    // 2. Encolar en outbox para sync
    await db.outboxItems.insert(OutboxItemsCompanion.insert(
      opId: opId,
      entityType: 'registro',
      entityLocalId: registroId,
      operation: 'update',
      payload: jsonEncode({
        'local_id': registroId,
        'litros_carlos': litrosLechero,
        'carlos_reco gio': true,
        'recogido_por_carlos_at': now.toIso8601String(),
        'estado': /* el estado resultante */,
        'client_timestamp': now.toIso8601String(),
        'idempotency_key': opId,
      }),
      idempotencyKey: opId,
      nextRunAt: Value(now),
    ));
  });

  // 3. Notificar al vendedor inmediatamente (best effort)
  unawaited(_pushService.notificarRecogidaLeche(registroId));

  // 4. Intentar sync inmediato
  unawaited(_syncEngine.trySync());
}
```

> **Nota:** el lechero **NO firma** (PIN/huella) al hacer esto. Solo es un tap. La fricción en la moto sería demasiado alta si tuviera que autenticarse 8-15 veces por mañana.

---

## Lista de "Clientes de hoy" — la pantalla que abre Carlos apenas se sube a la moto

```
┌──────────────────────────────────────────────────────┐
│ Hoy (viernes 18 sept)              [🔍]  [⚙]      │
│ 5 visitados · 87 L comprados                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─ Pendientes (8) ──────────────────────────────┐ │
│  │ [1] Juan Pérez              · 17 L registrado  │ │  ← listo para confirmar
│  │     ⏳ ESPERANDO_LECHERO                     │ │
│  │ [2] Pedro Huamán            · sin registro    │ │  ← caso B
│  │     ⚪ PENDIENTE                              │ │
│  │ [3] María López             · no vendí        │ │  ← Juan marcó
│  │     ℹ NO_VENDIO                              │ │
│  │ [4] Carlos Quispe           · 20 L registrado  │ │
│  │     ⏳ ESPERANDO_LECHERO                     │ │
│  │ [5] Rosa Mamani             · 15 L hace 5min  │ │
│  │     ⏳ ESPERANDO_LECHERO                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                      │
│  ┌─ Ya recogidos hoy (5) ────────────────────────┐ │
│  │ ✓ Juan H.       18 L  · 06:30                │ │
│  │ ✓ Ana C.        22 L  · 06:50                │ │
│  │ ✓ Luis R.       17.5 L · 07:10               │ │
│  └──────────────────────────────────────────────┘ │
│                                                      │
│  [ + Agregar visita fuera de ruta ]                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Cada item muestra:**
- Número de orden (ruta optimizada).
- Nombre del cliente.
- Estado del registro de hoy.
- Cantidad (si el vendedor ya registró).
- Hora relativa ("hace 5 min", "sin registro", "no vendió").

**Tocar un item** → abre la pantalla "Confirmar recolección" de ese cliente.

---

## Notificación push al vendedor

Cuando Carlos marca "✓ recogido" en su app, **inmediatamente** se envía push a Juan:

```
┌─────────────────────────────────┐
│  Carlos recogió tu leche        │
│  Hoy, 17 L (coincide)           │
│  [Confirmar]                    │
└─────────────────────────────────┘
```

Con deep link a `app://cliente/confirmar-recogida/{registroId}`.

Si Carlos marcó con discrepancia:

```
┌─────────────────────────────────┐
│  Carlos recogió 16.5 L          │
│  Tú habías puesto 17 L          │
│  Diferencia: 0.5 L              │
│  [Ver y decidir]                │
└─────────────────────────────────┘
```

---

## Estados finales por caso

| Caso | Acción del lechero | Estado resultante | Acción del vendedor |
|---|---|---|---|
| A — coincide | "✓ Recogido: 17 L" | `RECOGIDO_COINCIDE` (pendiente firma) | Juan firma → `RECOGIDO_COINCIDE` (firmado) |
| A.b — discrepancia | "⚠ Recogido: 16.5 L" | `RECOGIDO_DISCREPANCIA` | Juan acepta o abre disputa |
| B — vendedor no registró | "✓ Registrar y marcar recogido" | `RECOGIDO_SIN_CONFIRMAR` | Juan confirma después (24 h) o corrige |
| Juan marcó no vendí | "✓ Confirmar no recogí" | `NO_VENDIO` | — |
| Juan marcó no vendí pero Carlos sí recogió | "⚠ Sí recogí" | `RECOGIDO_DISCREPANCIA` + nota | Juan decide |

---

## Cronómetro de "24 h" para el caso B

```typescript
// Backend: job que corre cada hora
@Cron('0 * * * *')
async vencerRegistrosSinConfirmar() {
  const hace24h = subHours(new Date(), 24);

  const registros = await this.prisma.registro.findMany({
    where: {
      estado: 'RECOGIDO_SIN_CONFIRMAR',
      recogidoPorCarlosAt: { lt: hace24h },
    },
  });

  for (const reg of registros) {
    await this.prisma.registro.update({
      where: { id: reg.id },
      data: {
        estado: 'RECOGIDO_SIN_CONFIRMAR', // sigue igual, pero ahora es "vencido"
        notas: `${reg.notas || ''}\nVencido: vendedor no confirmó en 24h. Se usa valor del lechero.`,
      },
    });

    // Notificar al vendedor que ya no puede editar sin abrir disputa
    await this.pushService.notificar({
      userId: reg.contrato.clienteId,
      type: 'REGISTRO_VENCIDO',
      data: { registroId: reg.id },
    });
  }
}
```

Si Juan abre la app después de las 24 h, ve un banner: "Este día pasó más de 24 h. Para cambiar el valor, abre una disputa."

---

## Edge cases

### Carlos no recoge leche (enfermedad del cliente, vaca seca, etc.)

- Carlos abre el cliente en su app.
- Marca "✕ No recogí" (con razón opcional).
- Estado: `NO_VENDIO`.
- No se empuja nada raro al vendedor (él ya marcó o verá que coincide).

### Carlos olvida marcar "✓ recogido" ese día

- Estado queda en `PENDIENTE` o `ESPERANDO_VENDEDOR` (si Juan registró).
- Después de 24 h, el sistema marca automáticamente como `CARLOS_NO_VINO` (legacy) y notifica al vendedor.
- En la sacado de cuentas, Carlos puede editar después.

### Carlos y Juan registran valores MUY distintos (>5 L de diferencia)

- Es **discrepancia crítica** → notificación inmediata al admin.
- El admin puede intervenir si ve patrón sospechoso.

### Carlos tiene empleado ese día

- Carlos selecciona "Empleado" en la pantalla principal (ver `reglas-negocio/empleado-lechero.md`).
- El empleado registra el valor.
- Se guarda con `registradoPor = EMPLEADO`.
- Carlos puede revisar después en el log.

### Carlos está sin señal y registra offline

- Drift guarda localmente.
- Al recuperar señal, sincroniza.
- Juan recibe push solo cuando Carlos sincronice.

### Carlos equivoca la cantidad

- Antes de tocar "✓ Recogido", puede corregir con los botones +/- o input manual.
- Después de tocar "✓ Recogido", puede editar desde la pantalla de detalle del registro (cualquier momento, hasta que se cierre la liquidación).

---

## Métricas UX

- **Tiempo medio de "Confirmar recolección"** (tap grande + listo): target < 10 segundos.
- **% de casos donde Carlos confirma antes de irse del corral**: target > 95% (no acumular pendientes).
- **% de discrepancias resueltas en el momento**: target > 80%.
- **% de casos B (vendedor no registró)**: target < 20% del total (con push recordatorio podemos bajarlo).
- **% de registros con estado `RECOGIDO_SIN_CONFIRMAR` vencidos (>24 h)**: target < 10%.

---

## Componentes Flutter

- `ConfirmarRecoleccionScreen` — la pantalla principal del flujo.
- `EstadoRegistroChip` — etiqueta de color según estado.
- `RecogidoButtonGroup` — los tres botones grandes (verde, amarillo, rojo).
- `CantidadQuickEntry` — los botones 5/10/15/20/25/30 + manual.
- `ClienteDelDiaCard` — item de la lista "Hoy".
- `PushNotificacionHelper` — notificar al vendedor al instante.

---

## API endpoints que consume

```
PATCH /api/v1/registros/:id              # Carlos registra y marca recogido
GET   /api/v1/registros/contrato/:cid/hoy  # Lista de "pendientes de hoy" del lechero
POST  /api/v1/registros/:id/carlos-reco gio  # Endpoint específico para el "✓ recogido"
                                            # (optimiza push al vendedor)
POST  /api/v1/registros/:id/carlos-no-reco gio  # "No recogí"
```

Ver `../../../backend/api-design/endpoints-lechero.md` para detalle.