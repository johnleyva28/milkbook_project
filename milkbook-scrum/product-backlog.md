# Product Backlog — Milkbook

Backlog priorizado con todas las épicas e historias del producto. Cada historia sigue el formato de [`plantillas/historia-usuario.md`](./plantillas/historia-usuario.md).

**Cómo se lee**: de arriba hacia abajo = mayor prioridad. Las épicas se agrupan por componente técnico. Dentro de cada épica, las historias también van de mayor a menor prioridad.

**Estado de las historias**:
- `[ ]` Pendiente
- `[~]` En progreso (este sprint)
- `[x]` Hecha
- `[!]` Bloqueada

---

## ÉPICA 1 — App iOS nativa (Swift) — Cliente y Lechero

> Componente: `milkbook_app/`. Stack: **Swift 5.9+ + SwiftUI + Core Data (offline) + URLSession + APNs (push)**. App **nativa iOS, NO multiplataforma**. Dos perfiles: **Cliente** (Juan) y **Lechero** (Carlos), misma base de código con compilación condicional por perfil.

### Historias

- [ ] **HU-01** — Como lechero, quiero registrar una visita diaria con litros y valor final, para llevar el control diario de mi cartera. (5 SP)
- [ ] **HU-02** — Como cliente, quiero confirmar los litros del día en < 30 segundos, para no perder tiempo. (3 SP)
- [ ] **HU-03** — Como cliente, quiero marcar "no vendí" con una razón, para no generar registro cuando no entrego leche. (2 SP)
- [ ] **HU-04** — Como lechero, quiero ver mi cartera de clientes con búsqueda rápida, para encontrar a un cliente en < 5 segundos. (3 SP)
- [ ] **HU-05** — Como lechero, quiero registrar un adelanto con confirmación del cliente, para llevar control del dinero entregado. (5 SP)
- [ ] **HU-06** — Como cliente, quiero ver mis adelantos pendientes, para saber cuánto llevo prestado. (2 SP)
- [ ] **HU-07** — Como lechero, quiero registrar encargos (productos que me pide el cliente), para no olvidarlos. (5 SP)
- [ ] **HU-08** — Como lechero, quiero la pantalla crítica de "sacar cuentas" optimizada, para cerrar contratos en 5-10 min en vez de 20-40 min. (13 SP — partir)
- [ ] **HU-09** — Como lechero, quiero cambiar el precio por litro y que se snapshot por contrato, para que el histórico no se rompa. (5 SP)
- [ ] **HU-10** — Como cliente, quiero descargar mi boleta en PDF, para tener comprobante de pago. (3 SP)
- [ ] **HU-11** — Como cliente, quiero recibir notificaciones push claras cuando hay algo nuevo, para enterarme sin abrir la app. (3 SP)
- [ ] **HU-12** — Como usuario, quiero iniciar sesión con DNI + PIN en la app iOS, para acceder sin recordar contraseñas largas. (5 SP)
- [ ] **HU-13** — Como usuario, quiero firmar digitalmente (PIN / contraseña / Face ID / Touch ID), para confirmar contratos y liquidaciones. (8 SP)
- [ ] **HU-14** — Como lechero, quiero ver estadísticas básicas (litros/mes, ingresos/mes), para entender mi negocio. (3 SP)
- [ ] **HU-15** — Offline-first con Core Data + outbox pattern: la app debe funcionar sin internet y sincronizar después. (13 SP — épica técnica)

---

## ÉPICA 2 — Backend NestJS + Prisma + PostgreSQL

> Componente: `milkbook_backend/`. Stack: NestJS 11 + Prisma 5 + PostgreSQL 16 + BullMQ + Redis. Auth con DNI via RENIEC / consultarRUC.pe.

### Historias

- [ ] **HU-20** — Configurar proyecto NestJS 11 con TypeScript estricto, eslint, prettier, jest. (2 SP)
- [ ] **HU-21** — Modelar schema Prisma completo: User, Lechero, Cliente, Empleado, Contrato, RegistroDiario, Adelanto, Encargo, Precio, Liquidacion, Boleta, Disputa, PushToken. (8 SP)
- [ ] **HU-22** — Implementar migración inicial y seeders con datos de prueba de Cajamarca. (3 SP)
- [ ] **HU-23** — Auth con DNI: endpoint `POST /auth/login-dni` valida DNI via consultarRUC.pe + emite JWT. (5 SP)
- [ ] **HU-24** — Refresh tokens + revocación. (3 SP)
- [ ] **HU-25** — CRUD de lecheros + clientes (con paginación, búsqueda, filtros). (5 SP)
- [ ] **HU-26** — CRUD de contratos con snapshot de precio. (5 SP)
- [ ] **HU-27** — Endpoint `POST /registros-diarios` con validación y reglas de negocio (litros > 0, valor final coherente). (5 SP)
- [ ] **HU-28** — Endpoint `POST /adelantos` con confirmación del cliente vía push. (5 SP)
- [ ] **HU-29** — Endpoint de liquidación: cálculo automático con método de pago mixto (efectivo + Yape + transferencia). (8 SP)
- [ ] **HU-30** — Endpoint de generación de boleta vía Nubefact (OSE). (8 SP)
- [ ] **HU-31** — Endpoint de sync: `POST /sync/outbox` recibe cambios offline, resuelve conflictos con LWW (last-write-wins) por timestamp. (13 SP — épica técnica)
- [ ] **HU-32** — Rate limiting con Redis (login, sync). (3 SP)
- [ ] **HU-33** — Logs estructurados + métricas básicas (Prometheus). (5 SP)
- [ ] **HU-34** — OpenAPI auto-generado en `/api/docs`. (3 SP)
- [ ] **HU-35** — Tests E2E de los flujos críticos (registro visita → sync → confirmación cliente → liquidación → boleta). (8 SP)

---

## ÉPICA 3 — Web admin React 19

> Componente: `milkbook_frontend/`. Stack: React 19 + Vite + TypeScript + Tailwind + shadcn/ui. Para uso interno del equipo, no para lecheros/clientes.

### Historias

- [ ] **HU-40** — Configurar proyecto React 19 + Vite + TS + Tailwind + shadcn/ui + React Router. (2 SP)
- [ ] **HU-41** — Layout base: sidebar de navegación + header con usuario logueado. (3 SP)
- [ ] **HU-42** — Dashboard con KPIs: lecheros activos, contratos vigentes, litros del mes, ingresos del mes. (5 SP)
- [ ] **HU-43** — CRM de usuarios: tabla con búsqueda + filtros (DNI, RUC, tipo, estado). (5 SP)
- [ ] **HU-44** — Detalle de usuario: ver su cartera, contratos, últimas liquidaciones. (5 SP)
- [ ] **HU-45** — Lista de liquidaciones con detalle + descarga de boleta. (5 SP)
- [ ] **HU-46** — Pantalla de disputas activas con flujo de resolución. (5 SP)
- [ ] **HU-47** — Reportes: discrepancias, uso por lechero, ingresos por distrito. (8 SP)
- [ ] **HU-48** — Login con DNI + 2FA para admins. (3 SP)
- [ ] **HU-49** — Gestión de empleados del lechero (caso raro documentado). (3 SP)
- [ ] **HU-50** — Logs de auditoría: quién hizo qué cambio y cuándo. (5 SP)
- [ ] **HU-51** — Configuración global: precio sugerido por defecto, mensajes push templates. (3 SP)

---

## ÉPICA 4 — Integraciones externas

### Historias

- [ ] **HU-60** — Integración con RENIEC / consultarRUC.pe para validar DNI y obtener RUC opcional. (5 SP)
- [ ] **HU-61** — Integración con Nubefact para emisión de boletas electrónicas OSE. (8 SP)
- [ ] **HU-62** — Apple Push Notification service (APNs) para push notifications a iOS (cliente + lechero). (5 SP)
- [ ] **HU-63** — Storage de PDFs (boletas) — evaluar S3 vs Cloudinary vs Supabase Storage. (5 SP) **← Spike primero**
- [ ] **HU-64** — Servicio de envío de email (SendGrid / Resend) para boletas por email. (3 SP)
- [ ] **HU-65** — Backup automatizado de PostgreSQL a storage externo. (5 SP)

---

## ÉPICA 5 — Piloto en Cajamarca + ajustes de campo

### Historias

- [ ] **HU-70** — Capacitación presencial a 5-10 lecheros piloto (material + manual de uso). (8 SP)
- [ ] **HU-71** — Onboarding remoto a clientes piloto (llamada o visita). (5 SP)
- [ ] **HU-72** — Recolección de feedback semanal durante el piloto (encuesta corta + entrevistas). (5 SP)
- [ ] **HU-73** — Ajustes de UX según feedback: quick entry más fino, textos más claros, iconos más obvios. (8 SP)
- [ ] **HU-74** — Ajustes de reglas de negocio: discrepancias, validaciones, casos raros. (5 SP)
- [ ] **HU-75** — Métricas del piloto: tiempo de sacado de cuentas (antes/después), % de boletas generadas, uso offline. (5 SP)
- [ ] **HU-76** — Documentar lecciones aprendidas y plan de escalamiento a otros distritos. (5 SP)

---

## Backlog "no priorizado" (ideas para más adelante)

- Modo multi-tenant para varios distritos.
- Integración real de pagos (Yape/Plin API).
- Factura electrónica (no solo boleta).
- App para empleados del lechero (caso raro hoy).
- Versión web responsive de la app del cliente (hoy solo móvil iOS).
- App nativa Android (Kotlin/Swift) si el piloto se expande.
- Dashboard público de métricas del distrito (transparencia).
- Soporte multi-idioma (quechua / awajún si se expande a más zonas rurales).

---

## Referencias

- Investigación validada: [`../indagacion_y_planteamiento_de_proyecto/README.md`](../indagacion_y_planteamiento_de_proyecto/README.md)
- Decisiones arquitectónicas: [`../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/`](../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/)
- Modelo de datos: [`../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`](../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md)
