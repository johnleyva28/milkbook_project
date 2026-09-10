# UF-07: Offline Sync (modo sin conexión)

## Resumen

MilkBook es **offline-first**. Carlos y Juan pueden usar toda la app sin internet. Cuando recuperan señal, los datos se sincronizan automáticamente. Este documento explica los 4 escenarios offline y cómo se resuelven.

## Actores

- **Carlos** (LECHERO_OWNER) — puede estar sin señal en caseríos
- **Juan** (CLIENT_OWNER) — puede estar sin señal también
- **Sistema** — outbox + LWW (Last Write Wins) + audit

## Principio rector

> **Si funciona sin internet, el producto es MilkBook. Si requiere internet, es "otra app más".**

## Arquitectura offline-first

```
┌─────────────────────────────────────┐
│ DISPOSITIVO (Android)                │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ Drift DB (SQLite local)         ││
│ │ Tablas:                          ││
│ │ - registros                      ││
│ │ - adelantos                      ││
│ │ - encargos                       ││
│ │ - liquidaciones                  ││
│ │ - outbox (operaciones pendientes)││
│ └─────────────────────────────────┘│
│              ↑↓                    │
│ ┌─────────────────────────────────┐│
│ │ Sync Engine                      ││
│ │ - Detecta conexión              ││
│ │ - Envía outbox → backend        ││
│ │ - Recibe cambios del backend    ││
│ │ - Resuelve conflictos (LWW)      ││
│ └─────────────────────────────────┘│
│              ↑↓                    │
│ ┌─────────────────────────────────┐│
│ │ Conectivity Manager              ││
│ │ - Monitorea WiFi/4G/3G          ││
│ │ - Notifica cambios de estado     ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
                ↕
┌─────────────────────────────────────┐
│ BACKEND (NestJS)                    │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ PostgreSQL (fuente de verdad)   ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Escenarios offline

### Escenario 1: Carlos registra sin internet

```
Carlos está en caserío sin señal.

1. Carlos abre la app.
2. Ve banner amarillo: "Sin internet. Cambios guardados localmente."
3. Carlos selecciona cliente Juan.
4. Carlos registra 16.5 L (sin internet).
5. App guarda en Drift DB local + outbox.
6. Estado: PENDIENTE_SYNC.

Cuando Carlos recupera señal (llega al pueblo):
7. Connectivity Manager detecta cambio.
8. Sync Engine toma el outbox.
9. Envía POST /api/registros con id local + timestamp.
10. Backend valida y guarda.
11. Backend responde con id remoto.
12. App actualiza Drift: id_local → id_remoto.
13. Banner amarillo desaparece.
14. Estado: SINCRONIZADO.
```

### Escenario 2: Juan y Carlos registran el mismo día, sin internet

```
Carlos y Juan están sin señal al mismo tiempo (caserío aislado).

MAÑANA:
1. Juan registra 17 L en su app (sin internet).
2. Carlos registra 16.5 L en su app (sin internet).
3. Ambos guardan en su Drift local + outbox.

TARDE (ambos recuperan señal):
4. Juan sync primero (su POST llega al backend primero).
5. Backend: estado del 22 sept = RECOGIDO (Juan puso 17 L).
6. Carlos sync después (su POST llega segundo).
7. Backend: ya existe un registro de Juan con 17 L. Carlos marcó 16.5 L.
8. Sistema detecta conflicto:
   - Backend: Juan puso 17 L primero.
   - Carlos puso 16.5 L después.
9. Backend aplica LWW (Last Write Wins):
   - El registro de Carlos tiene timestamp más reciente.
   - Backend toma el valor de Carlos (16.5 L) como base.
   - Estado: RECOGIDO_DISCREPANCIA (17 vs 16.5).
10. Notificación a ambos: "Hay una discrepancia del 22 sept: Juan 17 vs Carlos 16.5".
11. Ambos pueden resolver en la próxima visita (UF-06).
```

### Escenario 3: Juan edita offline, Carlos marca offline

```
MAÑANA (Juan sin señal):
1. Juan abre app, edita su registro del 18 sept: "Fueron 19 L, no 18.5".
2. Juan guarda en Drift local.

TARDE (Carlos sin señal):
3. Carlos abre app, marca "Recogido: 18.5 L".

NOCHE (ambos recuperan señal):
4. Juan sync primero → actualiza registro del 18 sept a 19 L.
5. Carlos sync después → su "Recogido" se basa en 18.5 L, pero ya hay 19 L.
6. Sistema: Carlos está confirmando un valor viejo.
7. Backend: Carlos quiere mantener 18.5, Juan quiere 19.
8. Estado: RECOGIDO_DISCREPANCIA.
9. Backend notifica: "Hay conflicto del 18 sept".
10. Resolución vía UF-06 cuando se vean.
```

### Escenario 4: Carlos cierra contrato offline

```
Carlos y Juan están en casa de Juan, sin señal.

1. Carlos inicia cierre de quincena (offline).
2. App calcula todo localmente (datos en Drift).
3. Carlos edita discrepancias offline.
4. Carlos y Juan firman localmente (PIN funciona offline).
5. Liquidación queda en estado: CERRADA (offline).
6. Sistema guarda en outbox con todas las operaciones.

DÍA SIGUIENTE (Carlos recupera señal):
7. Sync Engine toma el outbox.
8. Envía al backend: liquidacion cerrada + boleta pendiente.
9. Backend valida.
10. Sistema intenta generar boleta vía Nubefact.
11. Boleta se genera y se envía a email de Juan.
12. Estado final: CONFIRMADA + BOLETA_GENERADA.
```

## Estrategias de resolución de conflictos

### Last Write Wins (LWW)

Por defecto, el cambio más reciente gana. Implementado por timestamp del cliente + server clock.

```typescript
async function resolveConflict(localVersion, remoteVersion) {
  if (localVersion.updated_at > remoteVersion.updated_at) {
    // Local gana
    await saveLocalAsWinner(localVersion);
    await notifyConflict(remoteVersion.user, localVersion);
  } else {
    // Remoto gana
    await saveRemoteAsWinner(remoteVersion);
    await notifyConflict(localVersion.user, remoteVersion);
  }
}
```

### Operaciones que NO generan conflicto

- Crear registro nuevo (id_local único).
- Crear adelanto nuevo (id_local único).
- Crear encargo nuevo (id_local único).

### Operaciones que SÍ generan conflicto

- Editar un registro existente (mismo id, diferente valor).
- Cerrar una liquidación.
- Marcar un registro como "no vendí".
- Confirmar una firma.

## Outbox pattern

Todas las operaciones offline se encolan en la tabla `outbox`:

```sql
CREATE TABLE outbox (
  id_local TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,        -- 'registro', 'adelanto', etc.
  entity_id_local TEXT NOT NULL,    -- id local de la entidad
  operation TEXT NOT NULL,          -- 'create', 'update', 'delete'
  payload JSONB NOT NULL,           -- datos completos
  timestamp_client TIMESTAMP NOT NULL,
  timestamp_server TIMESTAMP,
  idempotency_key TEXT UNIQUE,
  attempts INT DEFAULT 0,
  last_error TEXT,
  next_retry_at TIMESTAMP,
  status TEXT DEFAULT 'PENDING'     -- 'PENDING', 'SYNCED', 'FAILED', 'CONFLICT'
);
```

## Retry strategy

```typescript
const retryDelays = [
  1000,        // 1 segundo
  5000,        // 5 segundos
  30000,       // 30 segundos
  300000,      // 5 minutos
  3600000,     // 1 hora
];

async function syncWithRetry(item) {
  for (let attempt = 0; attempt < retryDelays.length; attempt++) {
    try {
      await syncOne(item);
      item.status = 'SYNCED';
      return;
    } catch (error) {
      item.attempts++;
      item.last_error = error.message;
      item.next_retry_at = Date.now() + retryDelays[attempt];
      if (attempt === retryDelays.length - 1) {
        item.status = 'FAILED';
        alertAdmin(item);
      }
      await sleep(retryDelays[attempt]);
    }
  }
}
```

## Conectividad Manager

```typescript
class ConnectivityManager {
  private listeners: Function[] = [];
  private isOnline = false;

  constructor() {
    // Monitorea WiFi, 4G, 3G, 2G
    NetInfo.addEventListener('connectionChange', this.handleChange);
    this.checkInitial();
  }

  private handleChange = (state) => {
    const wasOnline = this.isOnline;
    this.isOnline = state.isConnected && state.isInternetReachable;

    if (wasOnline !== this.isOnline) {
      this.listeners.forEach(fn => fn(this.isOnline));
    }
  };

  onChange(listener: Function) {
    this.listeners.push(listener);
  }
}
```

## UI Feedback para el usuario

| Estado | Banner |
|---|---|
| **Online + sync OK** | Sin banner |
| **Online + sync pendiente** | "Sincronizando... 3 cambios pendientes" (auto-hide) |
| **Offline** | Banner amarillo persistente: "Sin internet. Cambios guardados localmente." |
| **Conflicto detectado** | Banner rojo persistente: "1 conflicto detectado. Toca para resolver." |
| **Sync falló > 1h** | Banner rojo: "No pudimos sincronizar. Te avisaremos cuando funcione." |

## Edge Cases

### EC-7.1: Carlos edita mismo registro 3 veces offline

```
Carlos offline:
- Edit 1: 18.5 → 17.5
- Edit 2: 17.5 → 18.0
- Edit 3: 18.0 → 17.5

Al sync:
- Solo la última edición se envía (las anteriores se sobrescriben localmente).
- Outbox tiene 1 entrada: {valor_final: 17.5}.
- Backend recibe 17.5 L. Estado: RESUELTA_EN_MOMENTO.
```

### EC-7.2: Carlos cierra contrato y luego se queda offline 24h

```
- Cierre: timestamp T1
- Outbox: liquidacion cerrada en T1
- Carlos sin señal 24h
- En T1 + 24h: Carlos recupera señal
- Sync: backend recibe liquidación cerrada en T1
- Problema: la quincena ya está vencida (era de 15 días, hoy es T1+15)
- Backend: ¿acepta el cierre tardío?
  - Sí, con observación "Cerrado con X días de retraso"
  - Admin recibe alerta por cierre tardío
```

### EC-7.3: Juan confirma registro offline y luego Carlos lo edita offline

```
MAÑANA (Juan sin señal):
- Juan confirma registro del 22 sept con 17 L.

TARDE (Carlos sin señal):
- Carlos edita ese mismo registro a 18 L (porque le parece que Juan se equivocó).

NOCHE (ambos recuperan señal):
- Juan sync primero: confirma 17 L.
- Carlos sync después: actualiza a 18 L.
- Backend: ahora hay un conflicto de ediciones.
- Sistema: LWW (Carlos es más reciente, gana).
- Estado: 18 L confirmado por Carlos. Juan había puesto 17.
- Se genera DISCREPANCIA (17 vs 18).
- Notificación a ambos.
```

### EC-7.4: Carlos cambia de celular

```
- Carlos tenía app en Xiaomi con 50 registros.
- Compra nuevo celular (Samsung).
- Descarga app, hace login.
- App nueva está vacía (no hay Drift local).
- Sistema: backend sincroniza todo (Carlos tenía los registros).
- Carlos ve los mismos 50 registros en nuevo celular.
- Audit log: "Carlos cambió de celular. Datos sincronizados."
```

## Métricas

| Métrica | Meta | Cómo medir |
|---|---|---|
| % de operaciones que requieren sync | < 5% | Telemetry |
| Tiempo medio de sync (cuando hay señal) | < 3 seg | Performance |
| % de conflictos generados | < 2% | Telemetry |
| % de operaciones resueltas por LWW | > 90% | Telemetry |
| % de operaciones que requieren intervención admin | < 1% | Telemetry |
| % del tiempo Carlos está online | > 60% | Analytics |

## Conexiones

- **Wireframes:** Todos (banner offline en cada uno)
- **Documentación backend:** schema Prisma + endpoint sync
- **Arquitectura:** ver `3_diagramas/1_arquitectura/` para diagramas de flujo

## Versión
1.0 — 2026-09-07 — Documento inicial.
