# Backend — Visión General

## Stack técnico

- **Framework:** **NestJS 11** (con TypeScript).
- **HTTP server:** Express (default de NestJS) o Fastify (alternativa).
- **ORM:** Prisma.
- **Base de datos:** PostgreSQL 16.
- **Cache:** Redis 7.
- **Queue:** BullMQ (sobre Redis).
- **Validación:** class-validator + class-transformer (built-in en NestJS).
- **Auth:** JWT con refresh tokens.
- **Push notifications:** Firebase Admin SDK.
- **Object storage:** S3 o MinIO (para fotos, PDFs).
- **Email:** Resend o SendGrid.
- **Documentación API:** @nestjs/swagger (OpenAPI auto-generado).
- **Testing:** Jest (built-in en NestJS).
- **Containerización:** Docker.
- **Orquestación:** Docker Compose en dev, Kubernetes o AWS ECS en prod.

## ¿Por qué NestJS y no Express?

**Decisión: NestJS.**

Razones:
1. **Estructura modular** clara (AuthModule, UsersModule, ContratosModule, etc.) — fundamental para un proyecto con muchas entidades.
2. **DI built-in** — facilita testing y mantenimiento.
3. **Guards, interceptors, pipes** — perfectos para auth, logging, validación.
4. **TypeScript first-class** — mismo stack que frontend y móvil.
5. **OpenAPI auto-generado** — @nestjs/swagger genera docs desde decoradores.
6. **BullMQ y @nestjs/schedule** integrations oficiales.
7. **Escalabilidad probada** en equipos grandes.
8. **Onboarding más rápido** para nuevos devs (estructura clara).

Ver [`arquitectura/nestjs-vs-express.md`](./arquitectura/nestjs-vs-express.md) para análisis detallado.

## Estructura de módulos

```
src/
├── main.ts                          # Entry point
├── app.module.ts                    # Root module
├── common/                          # Compartido
│   ├── decorators/
│   ├── filters/                     # Exception filters
│   ├── guards/                      # Auth guards
│   ├── interceptors/                # Logging, transform
│   ├── pipes/                       # Validation pipes
│   └── middleware/
├── config/                          # Configuración
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── auth.config.ts
│   └── firebase.config.ts
├── modules/                         # Módulos de dominio
│   ├── auth/                        # Login, JWT, refresh
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/             # JWT strategy
│   │   └── dto/
│   ├── users/                       # Users genéricos
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   ├── lecheros/                    # Lecheros (perfil, ruta)
│   │   ├── lecheros.module.ts
│   │   ├── lecheros.controller.ts
│   │   ├── lecheros.service.ts
│   │   └── dto/
│   ├── clientes/                    # Clientes (perfil)
│   │   ├── clientes.module.ts
│   │   ├── clientes.controller.ts
│   │   ├── clientes.service.ts
│   │   └── dto/
│   ├── contratos/                   # Contratos
│   │   ├── contratos.module.ts
│   │   ├── contratos.controller.ts
│   │   ├── contratos.service.ts
│   │   └── dto/
│   ├── registros/                   # Registros diarios
│   │   ├── registros.module.ts
│   │   ├── registros.controller.ts
│   │   ├── registros.service.ts
│   │   └── dto/
│   ├── adelantos/                   # Adelantos
│   │   ├── adelantos.module.ts
│   │   ├── adelantos.controller.ts
│   │   ├── adelantos.service.ts
│   │   └── dto/
│   ├── encargos/                    # Encargos
│   │   ├── encargos.module.ts
│   │   ├── encargos.controller.ts
│   │   ├── encargos.service.ts
│   │   └── dto/
│   ├── liquidaciones/                # Liquidaciones
│   │   ├── liquidaciones.module.ts
│   │   ├── liquidaciones.controller.ts
│   │   ├── liquidaciones.service.ts
│   │   ├── calculator.service.ts    # Lógica de cálculo
│   │   └── dto/
│   ├── boletas/                     # Boletas electrónicas
│   │   ├── boletas.module.ts
│   │   ├── boletas.controller.ts
│   │   ├── boletas.service.ts
│   │   ├── ose-client.service.ts    # Integración Nubefact/Efact
│   │   ├── pdf-generator.service.ts
│   │   └── dto/
│   ├── sync/                        # Sincronización
│   │   ├── sync.module.ts
│   │   ├── sync.controller.ts
│   │   ├── sync.service.ts
│   │   └── dto/
│   ├── notifications/               # Push notifications
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.ts
│   │   └── templates/
│   └── admin/                       # Admin endpoints
│       ├── admin.module.ts
│       ├── admin.controller.ts
│       └── admin.service.ts
├── lib/                             # Infrastructure
│   ├── prisma/                      # Prisma client
│   ├── redis/                       # Redis client
│   ├── queue/                       # BullMQ
│   ├── firebase/                    # Firebase Admin
│   ├── s3/                          # Object storage
│   └── email/                       # Email service
└── database/                        # Prisma
    ├── migrations/
    ├── schema.prisma
    └── seed.ts
```

## Multi-tenancy

**Decisión:** single-tenant (no multi-tenant en MVP).

- Una sola base de datos compartida.
- Todas las queries filtradas por `userId` o `lecheroId`.
- Row-Level Security (RLS) en PostgreSQL como defensa en profundidad.
- Migración a multi-tenant es trivial si se necesita (agregar `tenantId` a tablas).

## Autenticación

- **JWT con access token (15 min) + refresh token (7 días).**
- Refresh token guardado en DB con hash, revocable.
- Passwords con bcrypt (cost factor 12).
- 2FA opcional pero recomendado para admin (TOTP).
- DNI validado contra RENIEC (vía API consultarRUC.pe o similar).

Ver [`../decisiones-tecnicas/auth-dni.md`](../decisiones-tecnicas/auth-dni.md).

## Base de datos

- **PostgreSQL 16** como RDBMS principal.
- **Prisma** como ORM.
- **Migraciones** versionadas (no se modifica migraciones aplicadas).
- **Row-Level Security** (RLS) para defensa en profundidad.
- **Índices** optimizados para queries principales.
- **Backups** diarios con PITR (Point-In-Time Recovery).

Ver [`../base-datos/schema-prisma.md`](../base-datos/schema-prisma.md).

## API design

- **REST** con JSON.
- **Versionado:** `/api/v1/...`
- **OpenAPI** auto-generado con @nestjs/swagger.
- **Idempotency** en mutaciones críticas (POST con `Idempotency-Key` header).
- **Paginación** con cursor o limit/offset según caso.
- **Error responses** consistentes: `{ error: { code, message, details } }`.

Ver [`api-design/`](./api-design/).

## Seguridad

- **HTTPS** obligatorio.
- **Helmet** para headers de seguridad.
- **CORS** restrictivo (solo origins conocidos).
- **Rate limiting** en auth y sync.
- **Input validation** con class-validator en DTOs.
- **SQL injection** prevenido por Prisma.
- **Secrets** en variables de entorno (nunca en código).
- **Auditoría** de acciones críticas (creación de liquidaciones, boletas, suspensiones).

## Despliegue

- **Docker** para el backend.
- **Docker Compose** para dev.
- **AWS ECS o Railway** para producción.
- **PostgreSQL gestionado** (RDS o Supabase).
- **Redis gestionado** (ElastiCache o Upstash).
- **CDN** (CloudFront) para assets estáticos.
- **CI/CD** con GitHub Actions.

## Monitoreo

- **Logs estructurados** (Pino) con correlación ID.
- **Métricas** (Prometheus) con histogramas de latencia.
- **Tracing** (OpenTelemetry) para requests distribuidos.
- **Alertas** en Sentry / PagerDuty.
- **Health check** en `/health` (verifica DB, Redis, etc.).

## Performance esperada

- API p95 < 200ms.
- Sync p95 < 500ms.
- Push delivery p95 < 2s.

## Próximos documentos

- [`arquitectura/`](./arquitectura/) — Decisiones arquitectónicas.
- [`api-design/`](./api-design/) — Diseño de APIs.
- [`logica-negocio/`](./logica-negocio/) — Lógica de dominio.