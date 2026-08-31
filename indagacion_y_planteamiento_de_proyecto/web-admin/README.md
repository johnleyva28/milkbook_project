# Web Admin (CRM) — Visión General

## Rol

El **web admin** es la herramienta del **equipo interno** (no del usuario rural). Es donde se:
- Gestionan usuarios (lecheros y clientes).
- Monitorea el sistema.
- Resuelve disputas.
- Genera reportes.

**NO** es para usuarios finales.

## Stack técnico

- **Framework:** React 19.
- **Build:** Vite.
- **Lenguaje:** TypeScript.
- **Routing:** React Router 7.
- **State management:** TanStack Query (server state) + Zustand (client state).
- **UI library:** shadcn/ui + Tailwind CSS.
- **Forms:** react-hook-form + Zod.
- **Tables:** TanStack Table.
- **Charts:** Recharts.
- **Auth:** JWT con refresh token.
- **API client:** Axios con interceptors.

## Estructura de la app

### Rutas principales

```
/login                                    # Autenticación
/                                         # Dashboard con KPIs
/users
  /users                                  # Lista de usuarios
  /users/:id                              # Detalle de usuario
  /users/:id/edit                         # Editar usuario
/clientes                                 # Lista de clientes
  /clientes/:id                           # Detalle de cliente
/lecheros                                 # Lista de lecheros
  /lecheros/:id                           # Detalle de lechero
/contratos                                # Lista de contratos
  /contratos/:id                          # Detalle de contrato
/liquidaciones                            # Lista de liquidaciones
  /liquidaciones/:id                      # Detalle
/boletas                                  # Lista de boletas
/registros                                # Auditoría de registros diarios
/disputas                                # Disputas activas
/estadisticas
  /litros                                 # Litros por período
  /ingresos                               # Ingresos por lechero
  /discrepancias                          # Análisis de discrepancias
/soporte
  /tickets                                # Tickets de soporte
/configuracion
  /precios                                # Configuración de precios
  /comisiones                             # Configuración de comisiones (futuro)
/admin/users                              # Gestión de admins
```

## Layout principal

```
┌─────────────────────────────────────────────────────┐
│  [Logo]  Buscar...        🔔 Notif    👤 Admin     │
├─────────┬───────────────────────────────────────────┤
│         │                                           │
│ 🏠 Home │                                           │
│ 👥 Usu. │   Contenido de la página                 │
│ 📋 Cont.│                                           │
│ 💰 Liq. │                                           │
│ 🧾 Bol. │                                           │
│ 📊 Est. │                                           │
│ ⚙️ Conf │                                           │
│         │                                           │
└─────────┴───────────────────────────────────────────┘
```

## Dashboard principal

### KPIs principales (cards grandes)

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Lecheros        │ Clientes        │ Contratos       │ Litros del mes  │
│ activos: 245    │ activos: 1,892  │ activos: 1,580  │ 487,234 L      │
│ ↑ 12 vs mes ant.│ ↑ 89 vs mes ant.│ ↓ 23 vs mes ant.│ ↑ 8.5% vs mes ant│
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Gráficos

- **Litros por día (últimos 30 días)**: línea.
- **Distribución por región (top 5)**: torta.
- **Tasa de discrepancia**: barra.
- **Boletas emitidas vs rechazadas**: línea.

### Alertas operativas

```
⚠️ 12 contratos con cierre pendiente hace más de 24h
⚠️ 3 clientes con discrepancia > 5L en los últimos 3 días
⚠️ 5 lechero sin actividad en los últimos 7 días
```

## Funcionalidades por sección

### Gestión de usuarios

**Lista de usuarios:**
- Filtros: tipo (cliente/lechero), estado (activo/suspendido), región, fecha de registro.
- Búsqueda: por nombre, DNI, celular.
- Acciones masivas: suspender, reactivar, exportar.

**Detalle de usuario:**
- Información personal.
- Historial de actividad.
- Disputas activas.
- Contratos.
- Para lecheros: clientes asociados, litros del mes, ingresos.

**Disputas:**
- Vista de disputas activas.
- Acciones: contactar al cliente, contactar al lechero, resolución manual.
- Cierre: aceptar valor de Carlos, aceptar valor del cliente, o ajustar manualmente.

### Liquidaciones

- Lista filtrable por lechero, período, estado.
- Detalle: ver todos los componentes, descargar boleta, reenviar al cliente.

### Boletas

- Lista de boletas emitidas.
- Estado: pendiente, aceptada, rechazada, anulada.
- Descarga de PDF.
- Reenvío por email.

### Estadísticas

**Vista de litros:**
- Por lechero, por cliente, por región.
- Período configurable.
- Exportable a Excel.

**Vista de discrepancias:**
- Distribución de diferencias.
- Top 10 clientes con más discrepancias.
- Identificación de patrones sospechosos.

### Soporte

- Sistema de tickets.
- Vista del admin de tickets abiertos.
- Respuestas predefinidas.
- Búsqueda en base de conocimiento (futuro).

## Diferenciación clave con la app móvil

| Funcionalidad | Web Admin | App Móvil |
| --- | --- | --- |
| Registrar visita de cliente | ❌ | ✅ |
| Confirmar litros | ❌ | ✅ |
| Cerrar contrato | ❌ (Carlos lo hace) | ✅ |
| Ver lista de clientes | ✅ (todos) | ✅ (solo los suyos) |
| Ver estadísticas globales | ✅ | ❌ |
| Generar reportes | ✅ | ❌ |
| Resolver disputas | ✅ | ❌ |
| Gestionar usuarios | ✅ | ❌ |

## Multi-tenancy (decisión)

**Decisión:** la web admin NO es multi-tenant. Es una sola instalación para el equipo del sistema.

Justificación:
- El equipo admin gestiona **todos** los usuarios de la plataforma.
- No hay "administradores de cliente" en el MVP.
- Si en futuro hay administradores regionales, se puede agregar multi-tenancy.

## Autenticación

- Login con email + password.
- 2FA obligatorio para admin.
- Sesión JWT con refresh token.
- Timeout de sesión: 8 horas.

## Permisos

- **Super admin:** todo.
- **Admin:** todo excepto gestión de admins.
- **Soporte:** solo lectura + tickets.
- **Analista:** solo lectura + estadísticas.

## Performance esperada

- Lista de 10,000 clientes: < 500ms (paginada).
- Dashboard: < 1s.
- Búsqueda: < 300ms.

## Próximo documento

- [`crm-usuarios.md`](./crm-usuarios.md) — Detalle del CRM de usuarios.