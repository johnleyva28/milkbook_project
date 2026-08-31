# Offline-First con Drift + Outbox Pattern

## Contexto validado

**Datos del usuario:**
- Hay **zonas sin señal** en caseríos remotos.
- **La señal se va a veces** incluso en pueblos.
- **A veces se va la energía** (el celular puede estar descargado).
- El sistema debe funcionar **100% offline** la mayor parte del tiempo.

**Decisión arquitectónica validada con el usuario:**
> "Toda absolutamente toda la data vaya a la db de nuestro sistema que priemro tiene que conectarse por el backend y el abckend envia la data a guardarse en la db."

Esto significa:
- El **cliente móvil NO se conecta directo a la DB**.
- El cliente móvil habla **solo con el backend**.
- El backend es quien persiste en la DB.
- **Redis se puede usar como cache en el backend** (no en el móvil).

## Arquitectura

```
┌─────────────────┐
│ App Móvil         │ (Drift local)
│ (Flutter)         │
└────────┬─────────┘
         │ HTTPS (REST)
         │ (Solo cuando hay señal)
         ▼
┌──────────────────────────────────────────────────┐
│ Backend (NestJS)                                 │
│ ┌─────────┐  ┌─────────┐  ┌──────────────┐    │
│ │ Outbox  │  │ Inbox   │  │   Redis     │    │
│ │ (fila)  │  │ (fila)  │  │   (cache)   │    │
│ └────┬────┘  └────┬────┘  └──────────────┘    │
└──────┼─────────────┼─────────────────────────────┘
       │             │
       ▼             ▼
┌──────────────────────────────────┐
│ PostgreSQL                        │
│ - Datos persistentes             │
│ - Outbox / Inbox tables         │
└──────────────────────────────────┘
```

**Importante:** El cliente móvil **NO** conoce la DB directamente. Siempre va por el backend.

## Patrón: Outbox en backend (no en cliente)

### Concepto
Cuando el cliente móvil hace una mutación, escribe en su DB local y **encola la operación en un outbox local**. Cuando hay señal, envía la operación al backend. El backend la recibe, la procesa, y la persiste en la DB.

### En el cliente móvil

```dart
// Tabla local
class OutboxItems extends Table {
  TextColumn get opId => text()();           // UUID v4
  TextColumn get entityType => text()();      // "registro", "adelanto", "encargo", "liquidacion"
  TextColumn get entityLocalId => text()();   // Local ID del registro
  TextColumn get operation => text()();        // "create", "update"
  TextColumn get payload => text()();         // JSON
  TextColumn get idempotencyKey => text()();   // Mismo que opId
  IntColumn get attemptCount => integer()();
  TextColumn get status => text()();          // "pending", "syncing", "synced", "failed"
  DateTimeColumn get nextRunAt => dateTime()();
  DateTimeColumn get createdAt => dateTime()();

  @override
  Set<Column> get primaryKey => {opId};
}
```

### En el backend

```prisma
// Recibe operaciones del cliente y las procesa
model ServerOutboxItem {
  id            String    @id @default(uuid())
  opId          String    @unique              // Mismo que el cliente
  userId        String
  entityType    String
  entityLocalId String
  operation     String
  payload       Json
  status        String    // "received", "processing", "completed", "failed"
  attempts      Int       @default(0)
  errorMessage  String?
  receivedAt    DateTime  @default(now())
  processedAt   DateTime?
  
  @@index([userId, status])
  @@index([entityType, entityLocalId])
  @@map("server_outbox_items")
}
```

## Sincronización (push del cliente al backend)

### Endpoint

```
POST /api/v1/sync/batch
```

### Request

```json
{
  "operations": [
    {
      "idempotency_key": "uuid-v4",
      "entity": "registro",
      "local_id": "uuid-v4",
      "operation": "create",
      "data": {
        "contrato_local_id": "uuid-v4",
        "fecha": "2026-09-29",
        "litros_carlos": 18.5,
        "registrado_por_carlos": true,
        "client_timestamp": "2026-09-29T08:30:00Z"
      }
    },
    {
      "idempotency_key": "uuid-v4",
      "entity": "adelanto",
      "local_id": "uuid-v4",
      "operation": "create",
      "data": {
        "contrato_local_id": "uuid-v4",
        "monto": 300.00,
        "fecha": "2026-09-29",
        "motivo": "Para medicinas",
        "client_timestamp": "2026-09-29T14:00:00Z"
      }
    }
  ]
}
```

### Response

```json
{
  "data": {
    "results": [
      {
        "idempotency_key": "uuid-v4",
        "status": "created",
        "remote_id": "uuid-v4-asignado-por-server",
        "server_data": {
          "id": "uuid-v4-asignado-por-server",
          "litros_carlos": 18.5,
          "created_at": "2026-09-29T15:00:00Z"
        }
      },
      {
        "idempotency_key": "uuid-v4",
        "status": "created",
        "remote_id": "uuid-v4-asignado-por-server",
        "server_data": { ... }
      }
    ]
  },
  "meta": {
    "server_time": "2026-09-29T15:00:00Z",
    "sync_token": "eyJ..."
  }
}
```

### Idempotencia

- **Cada operación tiene `idempotency_key` único** (UUID v4 generado en el cliente).
- Si el cliente reenvía la misma operación (por timeout, retry), el backend detecta el duplicado.
- **Backend logica:**
  ```typescript
  async processarOperacion(op: SyncOperation): Promise<SyncResult> {
    // Buscar si ya existe esta idempotency_key
    const existing = await this.prisma.serverOutboxItem.findUnique({
      where: { opId: op.idempotency_key },
    });
    if (existing && existing.status === 'completed') {
      return { status: 'duplicate', remote_id: existing.entityRemoteId };
    }
    // Procesar
    // ...
  }
  ```

## Sincronización (pull del cliente al backend)

### Endpoint

```
GET /api/v1/sync?since={sync_token}&entities=registros,adelantos,encargos,liquidaciones
```

### Response

```json
{
  "data": {
    "registros": [
      { "local_id": "uuid", "remote_id": "uuid", "litros_cliente": 19, "estado": "CONFIRMADO_COINCIDE", ... }
    ],
    "adelantos": [...],
    "encargos": [...],
    "liquidaciones": [...],
    "precios": [...]
  },
  "meta": {
    "sync_token": "eyJ...",
    "server_time": "2026-09-29T15:00:00Z"
  }
}
```

### Sync Token

- Backend mantiene un `sync_cursors` por usuario.
- Cliente guarda `lastSyncToken` en Drift.
- En cada pull, envía el token.
- Backend devuelve solo cambios posteriores.

```prisma
model SyncCursor {
  userId    String   @id
  cursor    BigInt   @default(0)
  updatedAt DateTime @updatedAt
}
```

## Redis como cache en backend (no en móvil)

**Decisión validada:** Redis se usa **solo en el backend**, no en el móvil.

### Usos de Redis en el backend

1. **Cache de DNI lookup (RENIEC):**
   - Key: `reniec:dni:{dni}` → JSON.
   - TTL: 24 horas.
   - Reduce llamadas a RENIEC y costos.

2. **Cache de sesiones activas:**
   - Key: `session:{userId}` → JSON.
   - TTL: 1 hora.
   - Permite invalidación rápida.

3. **Rate limiting:**
   - Key: `ratelimit:{ip}:{endpoint}` → contador.
   - TTL: 1 minuto.

4. **Cache de sync tokens:**
   - Key: `sync:cursor:{userId}` → counter.
   - TTL: 1 día.

5. **BullMQ (queue):**
   - Procesamiento de boletas, notificaciones, sync.
   - Storage: Redis (built-in).

6. **Idempotency keys cache:**
   - Key: `idempotency:{opId}` → result.
   - TTL: 24 horas.
   - Permite retornar el mismo resultado si el cliente reintenta.

## Sincronización: estrategia

### Cuándo sincroniza el cliente

1. **Background cada 5-15 minutos** (si hay señal y batería).
2. **Inmediato después de una mutación** (best effort).
3. **Al abrir la app** (pull).
4. **Al recuperar señal** (transición de offline a online).
5. **Antes de cerrar la app** (best effort).

### Estrategia de reintentos

```dart
class SyncEngine {
  Future<void> trySync() async {
    if (!await connectivity.hayRed()) return;
    if (outbox.isEmpty) return;

    final items = await outbox.pendientes();
    for (final item in items) {
      try {
        await enviarOperacion(item);
        await outbox.marcarSynced(item.opId);
      } catch (e) {
        await outbox.incrementarAttempt(item.opId);
        final backoff = backoffExponencial(item.attemptCount); // 1s, 2s, 4s, 8s, 16s, 32s, 60s max
        await outbox.programarProximoIntento(item.opId, backoff);
      }
    }
  }
}
```

## Resolución de conflictos

### Doble registro intencional (NO es un "conflicto")

- **litros_carlos** y **litros_cliente** se mantienen ambos.
- Resolución: durante la sacada de cuentas, ambos editan.
- El sistema **NO** sobrescribe automáticamente uno sobre otro.

### LWW solo para metadatos

- Para campos como `updated_at`, `nombre`, `direccion`, etc.
- LWW basado en `updated_at`.

### Versioning optimista (OCC) para edición de registros

- Si Carlos y Juan editan el mismo registro al mismo tiempo, gana el último en submit.
- Backend retorna 409 si hay conflicto.

```typescript
@Patch('registros/:id')
async update(@Param('id') id: string, @Body() dto: UpdateRegistroDto) {
  const registro = await this.prisma.registro.findUnique({ where: { id } });
  if (registro.version !== dto.expectedVersion) {
    throw new ConflictException('VERSION_CONFLICT');
  }
  return this.prisma.registro.update({
    where: { id },
    data: { ...dto, version: { increment: 1 } },
  });
}
```

## UI: estados de sync

### Indicador global

```
┌──────────────────────────────────┐
│  ● Sincronizado                  │
│  ◌ Sincronizando...              │
│  ⚠ 3 cambios pendientes         │
│  ✗ Error de sincronización       │
└──────────────────────────────────┘
```

### Cuando hay error
- Mostrar al usuario qué item falló.
- Ofrecer reintentar.
- Permitir trabajar localmente (no bloquear la app).

## Edge cases

### App cerrada durante sync
- Drift persiste outbox.
- Al reabrir la app, retoma desde donde quedó.

### Batería baja
- Reducir frecuencia de sync background.
- Sync solo al abrir la app.

### Cambios de zona horaria
- Backend usa UTC internamente.
- Cliente usa zona local solo para display.

### Conflict de timestamp
- Relojes del cliente pueden no estar sincronizados.
- Backend usa `server_time` como referencia.
- Cliente puede usar NTP si es posible.

## Validación con tests

### Tests unitarios
- Outbox encola correctamente.
- Retry funciona.
- Backoff exponencial.

### Tests de integración
- App funciona completamente sin red.
- Sync recupera estado después de estar offline varios días.
- 1000 inserts offline + sync no pierden datos.

### Tests de caos
- Matar app durante sync.
- Cambiar de red WiFi a 4G mid-sync.
- Forzar clock skew.