# milkbook

Monorepo del proyecto milkbook: backend API (NestJS + Prisma), frontend web (React + Vite), app iOS nativa (Swift), DB Postgres y stack de observabilidad (Loki + Promtail + Grafana).

## Stack

| Capa | Tecnología | Carpeta |
|---|---|---|
| Backend | NestJS 12 + Express + Prisma 7 | `milkbook_backend/` |
| Frontend web | React 19 + Vite + TypeScript | `milkbook_frontend/` |
| App iOS | Swift + SwiftUI | `milkbook_app/` |
| Base de datos | PostgreSQL 16 + Prisma 7 | `milkbook_db/` |
| Logs | Grafana Loki + Promtail + Grafana 11 | `milkbook_logs/` |

Toda la infraestructura (Postgres, backend, frontend, Loki, Promtail, Grafana y un job de migración) corre con un único `docker compose up -d --build`.

## Requisitos previos

- **Docker Desktop** (Windows / macOS / Linux) con WSL2 habilitado en Windows.
- **Node.js 20.19+** y **npm** solo si vas a correr algo **fuera** de Docker (desarrollo local sin compose, o para `prisma migrate dev`).
- **Git**.

## Quickstart (5 minutos)

```powershell
# 1. Clonar
git clone <url-del-repo>
cd milkbook_project

# 2. Crear .env desde el template (NO commitear este archivo)
Copy-Item .env.example .env

# 3. (Una sola vez) crear carpetas que el compose bind-mounta
New-Item -ItemType Directory -Force milkbook_logs\loki | Out-Null
New-Item -ItemType Directory -Force milkbook_logs\promtail | Out-Null
New-Item -ItemType Directory -Force milkbook_logs\grafana\provisioning\datasources | Out-Null
New-Item -ItemType Directory -Force milkbook_db\migrations | Out-Null

# 4. Levantar el stack completo
docker compose up -d --build

# 5. Esperar ~30-60s a que todos los healthchecks pasen
docker compose ps
```

Si todo está healthy, abrí:

| Servicio | URL | Credenciales |
|---|---|---|
| Frontend web | http://localhost:8080 | — |
| Backend API | http://localhost:3000 | — |
| Grafana | http://localhost:3001 | `admin` / `changeme` (ver `.env`) |
| Loki (API) | http://localhost:3100 | — |
| Postgres | `localhost:5432` | `milkbook` / `changeme` / DB `milkbook` |

## Estructura del repo

```
milkbook_project/
├── milkbook_backend/      # NestJS API REST
├── milkbook_frontend/     # React 19 SPA
├── milkbook_app/          # App iOS nativa (Swift)
├── milkbook_db/           # Prisma schema, migrations, seeds
├── milkbook_logs/         # Configs de Loki, Promtail y Grafana provisioning
├── milkbook_resources/    # Brand, UX/UI, diagramas, multimedia
├── docs/                  # Documentación general
├── .agents/               # Reglas y workflows para agentes IA
│   ├── rules/             # Convenciones del proyecto (naming, tamaño de archivos, etc.)
│   ├── agents/            # Perfiles de agente por dominio
│   └── workflows/         # Flujos estandarizados (bugfix, feature, etc.)
├── docker-compose.yml     # Stack completo
├── .env.example           # Template de variables de entorno
└── README.md              # Este archivo
```

## Flujo de trabajo típico

```powershell
# Ver logs de un servicio en vivo
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f promtail

# Reiniciar solo un servicio
docker compose restart backend

# Parar todo (sin borrar datos)
docker compose down

# Parar y borrar volúmenes (reset completo)
docker compose down -v

# Reconstruir tras cambios en código o Dockerfile
docker compose up -d --build backend
```

## Trabajando con la base de datos

Las migraciones las maneja el servicio `migrate` (job one-shot) en cada `docker compose up`. Para crear una nueva migración:

```powershell
# 1. Editar milkbook_db/schema.prisma (agregar/editar modelos)
# 2. Generar la migración localmente
cd milkbook_db
$env:PRISMA_OUTPUT = "../milkbook_backend/node_modules/.prisma/client"
$env:DATABASE_URL = "postgres://milkbook:changeme@localhost:5432/milkbook"
npx prisma migrate dev --name <descripcion_corta>

# 3. Confirmar que se creó milkbook_db/migrations/<timestamp>_<name>/
# 4. Commit
git add milkbook_db/
git commit -m "feat(db): add <descripcion>"

# 5. El próximo `docker compose up -d --build` aplicará la migración automáticamente
```

## Observabilidad

- **Logs estructurados**: el backend emite JSON a stdout (pino). Promtail los recoge, los etiqueta con `service`/`container` y los empuja a Loki. Grafana consulta Loki con la datasource auto-aprovisionada (ver `milkbook_logs/grafana/provisioning/datasources/loki.yml`).
- **Query de ejemplo en Grafana → Explore → Loki**: `{service="backend"}` para ver los logs del backend. Filtros: `| json | level="error"` para parsear el JSON y filtrar errores.
- **Dashboards**: aún no hay. Crearlos desde la UI de Grafana (Dashboards → New) y exportar a `milkbook_logs/grafana/provisioning/dashboards/` cuando estén estables.

## Convenciones del proyecto

Ver `.agents/rules/` para todas las reglas. Resumen rápido:

- **Naming**: archivos y directorios en `snake_case` (guiones bajos). Excepciones heredadas en `milkbook-scrum/`, `milkbook-changelog/`.
- **Tamaño de archivo**: ≤ 500 líneas estándar, ≤ 700 máximo. Refactor antes de merge si se pasa.
- **Idioma del código**: identificadores y comentarios en inglés. Mensajes de commit y documentación en español.
- **Estilo de commits**: Conventional Commits con scope: `feat(scope): descripción`, `fix(scope):`, `docs(scope):`, `chore(scope):`. Branches: `feature/hu-XX-descripcion`.

## Troubleshooting

| Problema | Solución |
|---|---|
| `docker compose ps` muestra servicios en `Restarting` | `docker compose logs <servicio>` para ver el error. Lo más común: credenciales en `.env` no coinciden con `docker-compose.yml`. |
| Backend no se conecta a Postgres | Esperar a que el healthcheck de postgres pase (~20s). El backend tiene `depends_on: postgres: healthy`. |
| Frontend muestra 502 | El contenedor nginx está vivo pero sin `dist/`. Reconstruir: `docker compose up -d --build frontend`. |
| Loki no recibe logs | Verificar que el servicio tiene label `logging=promtail`. Promtail filtra por ese label. |
| Puerto ocupado | Cambiar el puerto en `.env` (ej. `BACKEND_PORT=3100`) y `docker compose up -d --build`. |
| Cambié `schema.prisma` pero el backend sigue con cliente viejo | Reconstruir: `docker compose up -d --build backend`. El paso `npx prisma generate` corre en el build. |

## Recursos

- Documentación interna: `docs/`
- Reglas para agentes IA: `.agents/rules/`
- Workflows estandarizados: `.agents/workflows/`
- Scrum / historias: `milkbook-scrum/` (heredado, migrar a `milkbook_scrum/` cuando se refactore)
- Changelog: `milkbook-changelog/` (heredado)

## Licencia

Privado / uso interno.
