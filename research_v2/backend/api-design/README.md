# Backend — API Design Detallado

## Endpoints organizados por módulo

### Auth

```
POST   /api/v1/auth/check-dni
POST   /api/v1/auth/request-otp
POST   /api/v1/auth/verify-otp
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/me
PATCH  /api/v1/auth/me
```

### Users (lecheros y clientes)

```
GET    /api/v1/users/me                    # Mi perfil
PATCH  /api/v1/users/me                    # Actualizar perfil
POST   /api/v1/users/me/avatar             # Subir foto
```

### Lecheros

```
GET    /api/v1/lecheros/me                 # Mi perfil de lechero
PATCH  /api/v1/lecheros/me                 # Actualizar perfil
GET    /api/v1/lecheros/me/clientes       # Mis clientes
POST   /api/v1/lecheros/me/clientes       # Agregar cliente (por DNI)
GET    /api/v1/lecheros/me/ruta            # Mi ruta
PUT    /api/v1/lecheros/me/ruta            # Actualizar ruta
GET    /api/v1/lecheros/me/estadisticas    # Métricas básicas
```

### Clientes

```
GET    /api/v1/clientes/me                # Mi perfil de cliente
PATCH  /api/v1/clientes/me                # Actualizar perfil
GET    /api/v1/clientes/me/lecheros       # Mis lecheros (contratos activos)
GET    /api/v1/clientes/me/contratos       # Mis contratos (histórico)
GET    /api/v1/clientes/:id                # Detalle de cliente (solo lechero lo ve)
```

### Contratos

```
GET    /api/v1/contratos/activo           # Contrato activo del cliente actual
GET    /api/v1/contratos/:id              # Detalle de contrato
POST   /api/v1/contratos                  # Crear contrato (solo lechero)
PATCH  /api/v1/contratos/:id/duracion     # Modificar duración (solo lechero)
POST   /api/v1/contratos/:id/cerrar        # Cerrar contrato (solo lechero)
GET    /api/v1/contratos/:id/registros     # Registros del contrato
GET    /api/v1/contratos/:id/adelantos     # Adelantos del contrato
GET    /api/v1/contratos/:id/encargos      # Encargos del contrato
GET    /api/v1/contratos/:id/liquidacion   # Liquidación (si existe)
```

### Registros diarios (CRÍTICO)

```
POST   /api/v1/registros                   # Crear registro (Carlos)
GET    /api/v1/registros/:id              # Detalle
PATCH  /api/v1/registros/:id              # Editar (con expectedVersion)
POST   /api/v1/registros/:id/confirmar     # Confirmar/corregir (cliente)
POST   /api/v1/registros/:id/no-vendio     # Marcar no vendido (cliente)
GET    /api/v1/registros/:id/historial     # Auditoría
```

### Adelantos

```
POST   /api/v1/adelantos                   # Crear (lechero)
GET    /api/v1/adelantos/:id              # Detalle
PATCH  /api/v1/adelantos/:id              # Editar (antes de confirmar)
POST   /api/v1/adelantos/:id/confirmar     # Confirmar recepción (cliente, con firma)
DELETE /api/v1/adelantos/:id              # Eliminar (solo si no liquidado)
GET    /api/v1/adelantos/cliente/:id       # Adelantos de un cliente
```

### Encargos

```
POST   /api/v1/encargos                    # Crear (lechero)
GET    /api/v1/encargos/:id               # Detalle
PATCH  /api/v1/encargos/:id               # Editar (precio, descripción)
POST   /api/v1/encargos/:id/entregar       # Marcar como entregado
POST   /api/v1/encargos/:id/confirmar     # Confirmar recepción (cliente)
GET    /api/v1/encargos/cliente/:id        # Encargos de un cliente
```

### Precios

```
GET    /api/v1/precios/activo              # Precio vigente
GET    /api/v1/precios/historial          # Historial de cambios
PUT    /api/v1/precios/activo              # Cambiar precio (solo lechero)
```

### Liquidaciones (CRÍTICO)

```
POST   /api/v1/liquidaciones               # Iniciar cierre
GET    /api/v1/liquidaciones/:id           # Detalle completo
POST   /api/v1/liquidaciones/:id/discrepancia/:regId  # Resolver discrepancia
POST   /api/v1/liquidaciones/:id/adelanto/:adId/confirmar  # Confirmar adelanto
POST   /api/v1/liquidaciones/:id/encargo/:enId/entregar   # Marcar entregado
POST   /api/v1/liquidaciones/:id/encargo/:enId/confirmar  # Confirmar entrega
POST   /api/v1/liquidaciones/:id/cerrar    # Cerrar (con método de pago)
POST   /api/v1/liquidaciones/:id/anular    # Anular (admin)
POST   /api/v1/liquidaciones/:id/disputar  # Abrir disputa
GET    /api/v1/liquidaciones/:id/boleta    # Obtener boleta
```

### Boletas

```
GET    /api/v1/boletas/:id                 # Detalle
GET    /api/v1/boletas/:id/pdf             # Descargar PDF
GET    /api/v1/boletas/:id/xml             # Descargar XML
POST   /api/v1/boletas/:id/reenviar-email  # Reenviar email al cliente
```

### Disputas

```
GET    /api/v1/disputas/activas            # Disputas activas (admin)
GET    /api/v1/disputas/:id               # Detalle
POST   /api/v1/disputas/:id/resolver      # Resolver (admin)
POST   /api/v1/disputas/:id/escalar        # Escalar (admin)
```

### Sync (CRÍTICO)

```
POST   /api/v1/sync/batch                  # Push: enviar operaciones del cliente
GET    /api/v1/sync                        # Pull: descargar cambios del servidor
GET    /api/v1/sync/status                 # Estado de sincronización
```

### Notificaciones

```
POST   /api/v1/notifications/register-token  # Registrar FCM token
DELETE /api/v1/notifications/token          # Eliminar token
GET    /api/v1/notifications               # Historial de notificaciones
POST   /api/v1/notifications/:id/ack       # Marcar como leída
```

### Push Tokens

```
POST   /api/v1/push-tokens                 # Registrar token
GET    /api/v1/push-tokens                 # Listar mis tokens
DELETE /api/v1/push-tokens/:id            # Eliminar token
```

### Admin (sólo ADMIN)

```
GET    /api/v1/admin/dashboard              # KPIs principales
GET    /api/v1/admin/users                  # Lista de usuarios
GET    /api/v1/admin/users/:id              # Detalle
PATCH  /api/v1/admin/users/:id              # Actualizar
POST   /api/v1/admin/users/:id/suspend      # Suspender
POST   /api/v1/admin/users/:id/unsuspend    # Reactivar
GET    /api/v1/admin/disputas               # Disputas activas
GET    /api/v1/admin/liquidaciones          # Liquidaciones
GET    /api/v1/admin/reports/discrepancias  # Reporte de discrepancias
GET    /api/v1/admin/reports/uso           # Métricas de uso
GET    /api/v1/admin/reports/ingresos      # Ingresos por lechero
```

## Detalle de endpoints clave

### POST /api/v1/auth/login

```typescript
// Request
{
  "dni": "12345678",
  "password": "optional"
}

// O con OTP:
{
  "dni": "12345678",
  "otp": "123456"
}

// Response 200
{
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "expires_in": 900,
    "user": {
      "id": "uuid",
      "dni": "12345678",
      "nombre": "Juan Pérez",
      "userType": "CLIENTE",
      "celular": "987654321",
      "email": null
    }
  }
}

// Response 401
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "DNI o contraseña incorrectos"
  }
}
```

### POST /api/v1/auth/register

```typescript
// Request
{
  "dni": "12345678",
  "celular": "987654321",
  "nombre": "Juan Pérez",
  "password": "optional",  // Si no, solo OTP
  "otp": "123456",          // OTP enviado al celular
  "userType": "CLIENTE" | "LECHERO",
  "ruc": "optional"         // Para lecheros con RUC
}

// Response 201
{
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "expires_in": 900,
    "user": { ... }
  }
}
```

### POST /api/v1/sync/batch

```typescript
// Request
{
  "operations": [
    {
      "idempotency_key": "uuid",
      "entity": "registro",
      "local_id": "uuid",
      "operation": "create",
      "data": { ... },
      "client_timestamp": "2026-09-29T08:30:00Z"
    }
  ]
}

// Response 200
{
  "data": {
    "results": [
      {
        "idempotency_key": "uuid",
        "status": "created" | "updated" | "duplicate" | "error",
        "remote_id": "uuid",
        "server_data": { ... },
        "error": null | { "code": "...", "message": "..." }
      }
    ]
  },
  "meta": {
    "server_time": "2026-09-29T15:00:00Z",
    "sync_token": "eyJ..."
  }
}
```

### GET /api/v1/sync?since={token}

```typescript
// Response 200
{
  "data": {
    "registros": [...],
    "adelantos": [...],
    "encargos": [...],
    "liquidaciones": [...],
    "precios": [...],
    "boletas": [...]
  },
  "meta": {
    "sync_token": "new-token",
    "server_time": "2026-09-29T15:00:00Z"
  }
}
```

## Seguridad y autenticación

Todos los endpoints (excepto `/auth/*`) requieren:

```
Authorization: Bearer <access_token>
```

Refresh tokens se renuevan automáticamente cuando expiran (15 min).

## Próximo documento

- Ver [`logica-negocio/`](./logica-negocio/) para los flujos de negocio detallados.
- Ver [`../base-datos/schema-prisma.md`](../../base-datos/schema-prisma.md) para el modelo de datos.