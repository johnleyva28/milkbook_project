# Base de Datos — Visión General

## Stack

- **PostgreSQL 16** (open source, maduro, JSONB, RLS, índices avanzados).
- **Prisma** como ORM (type-safe, migraciones, type generation).
- **Migraciones** versionadas con `prisma migrate`.

## Decisiones clave

### Multi-tenancy

**Single-tenant** en MVP. Una sola DB compartida con Row-Level Security (RLS) como defensa en profundidad.

### RLS (Row Level Security)

Activamos RLS en PostgreSQL para que, incluso si una query olvida el filtro `WHERE user_id = X`, la DB rechace el acceso.

```sql
-- Activar RLS en tabla
ALTER TABLE "Registro" ENABLE ROW LEVEL SECURITY;

-- Política: el usuario solo ve sus propios registros
CREATE POLICY user_isolation ON "Registro"
  USING (user_id = current_setting('app.current_user_id')::uuid);
```

Prisma soporta RLS con `$extends` y `SET LOCAL app.current_user_id` antes de cada query.

### UUIDs vs serial integers

**UUID v4** como primary key:
- No colisiones al generar offline (Drift).
- No revela información del negocio.
- Permite merge de datos de múltiples dispositivos.

### Timestamps

- `created_at` y `updated_at` en **todas** las tablas.
- Tipo: `TIMESTAMPTZ` (con zona horaria).
- Default: `now()` (PostgreSQL).
- UTC en DB, display en zona local del usuario.

### Soft delete

- `deleted_at: TIMESTAMPTZ?` en entidades principales.
- Permite recuperación y auditoría.
- `deleted_at IS NULL` en queries por defecto.

### Enums

- Usar enums de PostgreSQL con `CREATE TYPE`.
- Prisma los mapea a TypeScript enums.

### Índices

- Índices en foreign keys (siempre).
- Índices en columnas de búsqueda frecuente.
- Índices compuestos para queries específicos.
- Índice GIN para búsqueda en JSONB (futuro).

## Schema (vista general)

Ver [`schema-prisma.md`](./schema-prisma.md) para el schema completo.

```
┌──────────┐      ┌──────────────┐      ┌──────────────┐
│  User    │──1:N─│  Lechero     │──1:N──│  Contrato    │
│          │      │ (perfil)     │      │              │
└──────────┘      └──────────────┘      └──────┬───────┘
                                              │
                                              │ 1:N
                                              ▼
┌──────────────┐      ┌──────────────┐    ┌──────────────┐
│  Adelanto    │      │  Encargo     │    │  Registro    │
│              │      │              │    │  (diario)    │
└──────────────┘      └──────────────┘    └──────┬───────┘
                                              │
                                              │ N:1
                                              ▼
                                       ┌──────────────┐
                                       │ Liquidación  │
                                       └──────┬───────┘
                                              │
                                              │ 1:1
                                              ▼
                                       ┌──────────────┐
                                       │  Boleta      │
                                       └──────────────┘
```

## Entidades principales

### User
- DNI, celular, email, nombre, password_hash, tipo (cliente/lechero/admin).

### Lechero (perfil)
- user_id (FK a User)
- RUC (opcional, futuro)
- celular_secundario, direccion
- foto_perfil (URL en S3)

### Cliente (perfil)
- user_id (FK a User)
- DNI (único)
- celular
- direccion, foto_establo (opcional)
- asociado_desde (fecha)

### Contrato
- cliente_id, lechero_id
- fecha_inicio, fecha_fin (calculada)
- duracion_dias (default 15, modificable por lechero)
- estado (activo, cerrado, cancelado)
- precio_litro_inicio (snapshot)
- observaciones

### RegistroDiario
- contrato_id
- fecha
- litros_carlos, litros_cliente
- estado (registrado, confirmado_coincide, confirmado_discrepancia, no_vendio, carlos_no_vino)
- razon_no_vendio (opcional)
- registrado_por_carlos_at, confirmado_por_cliente_at

### Adelanto
- contrato_id
- monto
- fecha
- motivo (opcional)
- entregado_por_carlos (boolean, true)
- confirmado_por_cliente (boolean)
- liquidado (boolean, false initially)

### Encargo
- contrato_id
- descripcion
- precio_estimado
- foto (opcional)
- fecha_solicitud, fecha_entrega
- entregado_por_carlos (boolean)
- confirmado_por_cliente (boolean)
- liquidado (boolean)

### Liquidacion
- contrato_id
- fecha_inicio, fecha_fin (período)
- estado (borrador, enviada, confirmada, pagada, disputada, anulada)
- total_litros, total_adelantos, total_encargos
- monto_bruto, monto_neto
- precio_promedio_efectivo
- generada_at, enviada_at, confirmada_at, pagada_at

### Boleta
- liquidacion_id
- serie, numero (asignado por OSE)
- tipo (factura, boleta)
- monto_total
- estado (pendiente, emitida, aceptada, rechazada, anulada)
- emitida_at
- pdf_url, xml_url (en S3)
- cliente_email (envío)

### Precio
- producto (leche cruda, default)
- valor_por_litro
- fecha_inicio
- fecha_fin (NULL = vigente)
- created_by (lechero_id)

### Disputa
- liquidacion_id
- tipo (litros, precio, monto, otro)
- descripcion
- abierto_por (user_id)
- estado (abierta, en_revision, resuelta, escalada)
- resuelto_por (admin_id, opcional)
- resolucion (texto, opcional)

### PushToken
- user_id, user_type
- device_id, fcm_token (unique)
- platform (ios, android)
- app_version
- enabled, last_seen_at

### AuditLog
- actor_user_id, actor_user_type
- accion (string: "registro.create", "liquidacion.cerrar", etc.)
- entidad, entidad_id
- datos_antes (JSONB)
- datos_despues (JSONB)
- ip
- created_at

## Tipos comunes

```prisma
enum UserType {
  CLIENTE
  LECHERO
  ADMIN
}

enum EstadoContrato {
  ACTIVO
  CERRADO
  CANCELADO
}

enum EstadoRegistro {
  REGISTRADO                    // Carlos registró, cliente pendiente
  CONFIRMADO_COINCIDE            // Ambos coinciden
  CONFIRMADO_DISCREPANCIA        // Ambos registran, distinto
  NO_VENDIO                      // Cliente confirmó que no vendió
  CARLOS_NO_VINO                 // Carlos no registró; cliente no confirmó
  PENDIENTE_VENCIDO              // Pasó el tiempo sin confirmación
}

enum EstadoLiquidacion {
  BORRADOR
  ENVIADA                       // Carlos la envió al cliente
  CONFIRMADA                    // Cliente confirmó
  DISPUTADA                     // Abierta disputa
  PAGADA                        // Carlos pagó al cliente
  ANULADA                       // Cancelada
}

enum EstadoBoleta {
  PENDIENTE
  EMITIDA
  ACEPTADA
  RECHAZADA
  ANULADA
}
```

## Migraciones

Ver [`migraciones.md`](./migraciones.md) para la estrategia completa.

- **Versionadas** con timestamp (`20260929120000_xxx`).
- **Reversibles** (down migration incluida).
- **Probadas** en staging antes de producción.
- **No se modifican** migraciones ya aplicadas.

## Connection pooling

- Prisma con `pgBouncer` en producción.
- Pool size: 10-20 conexiones por app instance.
- Connection timeout: 10s.
- Statement timeout: 30s (para evitar queries colgados).

## Backups

- **Diarios** (full backup) con PITR.
- **Retención:** 30 días.
- **Almacenamiento:** S3 con lifecycle (move a Glacier después de 7 días).
- **Restore test** mensual.

## Observabilidad

- **Slow query log** (queries > 1s).
- **Connection pool** stats.
- **Migration status** (versiones aplicadas).
- **DB size** tracking.