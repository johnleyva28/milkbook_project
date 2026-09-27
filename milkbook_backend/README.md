# milkbook_backend

API REST del proyecto milkbook. NestJS 12 + Express + Prisma 7 (cliente generado con driver adapter `@prisma/adapter-pg`).

## Stack

- **NestJS 12** sobre **Express**
- **Prisma 7** con driver adapter `@prisma/adapter-pg` (Postgres nativo, sin Accelerate)
- **Pino** + **nestjs-pino** para logging estructurado JSON
- **Vitest** para tests unitarios y e2e
- **TypeScript 6** strict

## Estructura interna

```
src/
├── main.ts                 # bootstrap NestJS, configura pino como logger global
├── app.module.ts           # módulo raíz: LoggerModule (pino) + PrismaModule
├── app.controller.ts       # endpoint raíz GET /
├── app.service.ts          # servicio raíz
└── prisma/
    ├── prisma.module.ts    # @Global, exporta PrismaService
    └── prisma.service.ts   # extiende PrismaClient con adapter-pg
```

El schema de Prisma vive en `../milkbook_db/schema.prisma` (carpeta sibling, no acá).

## Endpoints actuales

| Método | Path | Descripción |
|---|---|---|
| `GET` | `/` | Healthcheck ligero. Retorna string hardcoded (placeholder). |

Endpoints nuevos se agregan en módulos NestJS por dominio (`auth/`, `accounts/`, etc.).

## Comandos

```powershell
# Desarrollo local sin Docker (requiere Postgres corriendo en localhost:5432)
$env:DATABASE_URL = "postgres://milkbook:changeme@localhost:5432/milkbook"
$env:NODE_ENV = "development"
npm install
npm run start:dev

# Tests
npm test              # unit (vitest run)
npm run test:watch    # watch mode
npm run test:e2e      # e2e (config: vitest.config.e2e.ts)
npm run test:cov      # coverage

# Build
npm run build         # genera dist/

# Lint
npm run lint          # oxlint
npm run format        # prettier
```

## Docker

El backend se dockeriza con un multi-stage build (`Dockerfile` en esta carpeta). La imagen final:
- Base: `node:20-alpine`
- Stage `deps`: `npm ci`
- Stage `build`: copia el schema desde `../milkbook_db/` vía BuildKit `additional_contexts`, corre `npx prisma generate` y `nest build`, prune dev deps
- Stage `runtime`: imagen final sin dev deps, `CMD ["node", "dist/main.js"]`

Para reconstruir manualmente: `docker compose up -d --build backend`.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `NODE_ENV` | `development` | `production` desactiva `pino-pretty` (JSON puro a stdout). |
| `PORT` | `3000` | Puerto HTTP interno del contenedor. Mapeado a `${BACKEND_PORT}` en el host. |
| `DATABASE_URL` | — | URL Postgres completa (formato `postgres://user:pass@host:port/db`). Inyectada por compose. |

## Logging

Logger global via `nestjs-pino`. Formato según `NODE_ENV`:
- **`production`** (contenedor): JSON puro a stdout → Promtail lo lee, lo etiqueta y lo envía a Loki.
- **`development`** (local): `pino-pretty` con `singleLine: true` para consola legible.

Cada log incluye automáticamente: `level`, `time`, `pid`, `hostname`, `reqId`, `req.method`, `req.url`, `res.statusCode`, `responseTime`.

Para agregar contexto custom: `this.logger.log({ userId }, 'mensaje')` en cualquier servicio (inyectar `Logger` de `nestjs-pino`).

## Prisma

- **Schema**: `../milkbook_db/schema.prisma`
- **Migrations**: `../milkbook_db/migrations/`
- **Cliente generado**: `node_modules/.prisma/client/` (ubicación controlada por `PRISMA_OUTPUT`, ver `../milkbook_db/README.md`)
- **Driver adapter**: `@prisma/adapter-pg` para conexión nativa a Postgres sin Accelerate.

El `PrismaService` está marcado `@Global()`, así que cualquier módulo del backend puede inyectarlo sin reimportar `PrismaModule`.

## Tests

```powershell
# Test unit del controller raíz (existente)
npm test
```

Para agregar tests de un módulo nuevo: `*.spec.ts` al lado del archivo a testear, importar `Test.createTestingModule` de `@nestjs/testing`. Cobertura actual: 1/1 (controller.spec.ts).

## Estructura para crecer

Cuando se agreguen features (auth, accounts, transactions, etc.):

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   │   └── login.dto.ts
│   └── auth.service.spec.ts
├── accounts/
│   └── ...
└── ...
```

Cada feature module ≤ 500 líneas (regla del proyecto). Si crece, partir en submódulos.

## Recursos

- NestJS docs: https://docs.nestjs.com
- Prisma 7 docs: https://www.prisma.io/docs
- Pino: https://getpino.io
