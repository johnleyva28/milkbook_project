# Decisiones Técnicas — Resumen

## Stack final

| Capa | Tecnología | Justificación |
| --- | --- | --- |
| **App móvil** | Flutter (iOS + Android) | Una base, dos plataformas, requisito académico cumplido |
| **App móvil (cliente)** | Flutter, perfil Cliente | UI simple, registro de confirmación |
| **App móvil (lechero)** | Flutter, perfil Lechero | UI rica, gestión de operaciones |
| **Local DB móvil** | Drift (SQLite) | Type-safe, migraciones, offline-first |
| **Push notifications** | FCM (Android) + APNs via FCM (iOS) | Estándar de la industria |
| **Web admin** | React 19 + Vite + TypeScript | Requisito académico |
| **Web admin (UI)** | shadcn/ui + Tailwind CSS | Componentes modernos, accesibles |
| **Web admin (state)** | TanStack Query + Zustand | Server state + client state |
| **Backend** | NestJS 11 + TypeScript | Estructura modular, DI, OpenAPI auto |
| **HTTP server** | Express (default NestJS) | Cumple requisito académico |
| **ORM** | Prisma | Type-safe, migraciones, ecosystem |
| **Base de datos** | PostgreSQL 16 | RLS, JSONB, type-safe con Prisma |
| **Cache/Queue** | Redis 7 + BullMQ | Tareas async (boletas, notificaciones) |
| **Validación** | class-validator (built-in NestJS) | Decorators, integrado |
| **Auth** | JWT (access 15min + refresh 7d) | Estándar, stateless, mobile-friendly |
| **DNI lookup** | API consultarRUC.pe o similar | Validación en tiempo real |
| **Facturación** | OSE via API (Nubefact, Efact) | Generación de boletas electrónicas |
| **Email** | Resend o SendGrid | Notificaciones a admin |
| **Storage** | S3 o MinIO | PDFs, fotos, XMLs de boletas |
| **Container** | Docker + Docker Compose | Estándar |
| **CI/CD** | GitHub Actions | Gratis para proyectos académicos |
| **Hosting** | Railway o AWS ECS | Bajo costo, fácil de escalar |
| **Monitoring** | Sentry + OpenTelemetry + Grafana | Errores + tracing + métricas |
| **Tests** | Jest (backend) + Vitest (web) + Flutter Test | Estándar del ecosistema |

## Decisiones arquitectónicas clave

### 1. App móvil vs web — separación clara
- **Móvil** = usuarios rurales (lechero + cliente).
- **Web** = admin interno del sistema.
- **No se solapan** en funcionalidad.

Ver [`../web-admin/README.md`](../web-admin/README.md) y [`../app-movil/README.md`](../app-movil/README.md).

### 2. Backend — NestJS sobre Express
- Estructura modular para 8+ módulos.
- DI built-in para testabilidad.
- OpenAPI auto-generado.
- BullMQ integration oficial.

Ver [`../backend/arquitectura/nestjs-vs-express.md`](../backend/arquitectura/nestjs-vs-express.md).

### 3. Multi-tenancy — single-tenant en MVP
- Una sola DB compartida con RLS.
- Migración a multi-tenant es trivial.

### 4. Offline-first con Drift
- Toda la información se cachea localmente.
- Outbox pattern para mutaciones.
- LWW + versioning para conflictos.

Ver [`../app-movil/offline-sync/`](../app-movil/offline-sync/).

### 5. Auth con DNI
- DNI validado vía RENIEC (vía API consultarRUC.pe).
- Password opcional (puede usar OTP por celular como backup).
- JWT con refresh tokens.
- 2FA para admin.

Ver [`auth-dni.md`](./auth-dni.md).

### 6. Facturación electrónica vía OSE
- Usar un OSE autorizado (Nubefact, Efact).
- API REST documentada.
- Costo: S/ 70/mes + costo por documento.

### 7. Push notifications con FCM
- Estándar de la industria.
- Soporte iOS + Android.
- Costo: gratis.

### 8. TypeScript end-to-end
- Mismo lenguaje en backend, web, mobile.
- Reduce fricción de tipos compartidos.
- OpenAPI genera tipos para web automáticamente.

## Decisiones diferidas (para V2+)

| Decisión | Por qué se difiere |
| --- | --- |
| Multi-tenant real con `tenantId` | MVP no lo necesita; se puede agregar |
| Multi-país (Bolivia, Ecuador) | Primero consolidar Perú |
| AI para predicción de precios | Requiere datos históricos; no prioritario |
| Integración con ERP de plantas grandes | Mercado secundario |
| Blockchain para inmutabilidad | Overkill para MVP |
| Microservicios | Monolito modular es suficiente por ahora |

## Anti-patrones evitados

- ❌ **No microservicios prematuros**: monolito modular NestJS escala hasta ~100k usuarios.
- ❌ **No GraphQL sin necesidad**: REST con OpenAPI es más simple para este equipo.
- ❌ **No NoSQL**: PostgreSQL es suficiente y más maduro.
- ❌ **No Kafka/EventBus pesado**: BullMQ (sobre Redis) es suficiente.
- ❌ **No Kubernetes para MVP**: Docker Compose en dev, ECS/Railway en prod.
- ❌ **No microservicios de auth separados**: auth es un módulo más del monolito.

## Próximo documento

- [`auth-dni.md`](./auth-dni.md) — Estrategia detallada de autenticación.
- [`stack-eleccion.md`](./stack-eleccion.md) — Justificación de cada elección.