# milkbook_db

Schema de Prisma, migrations y seeds de la base de datos Postgres del proyecto milkbook.

## Contenido

```
milkbook_db/
├── schema.prisma        # modelos de datos (source of truth)
├── prisma.config.ts     # config de Prisma 7 (ruta del schema, migrations, datasource URL)
├── package.json         # scripts prisma y deps (@prisma/client, prisma CLI)
├── migrations/          # migraciones SQL versionadas (generadas con `prisma migrate dev`)
└── README.md            # este archivo
```

## Por qué una carpeta separada

`milkbook_db` es el "source of truth" del modelo de datos. Vive como sibling del backend (no dentro) porque:
- El backend importa `@prisma/client` y se conecta, pero no es dueño del schema.
- Migraciones se commitean acá y se aplican via el servicio `migrate` de Docker Compose.
- Otros servicios (scripts de admin, jobs, etc.) pueden compartir el schema sin acoplarse al backend.

## Comandos (desarrollo local)

```powershell
# Instalar deps (primera vez)
cd milkbook_db
npm install

# Generar cliente (lo hace Docker automáticamente; en local solo si cambiás el schema)
$env:PRISMA_OUTPUT = "../milkbook_backend/node_modules/.prisma/client"
$env:DATABASE_URL = "postgres://milkbook:changeme@localhost:5432/milkbook"
npx prisma generate

# Crear nueva migración (tras editar schema.prisma)
npx prisma migrate dev --name <descripcion_corta_en_snake_case>
# → genera SQL en migrations/<timestamp>_<descripcion>/
# → regenera el cliente automáticamente
# → aplica la migración a la DB local

# Aplicar migraciones pendientes (como hace el servicio `migrate` de compose)
npx prisma migrate deploy

# Inspeccionar la DB visualmente
npx prisma studio   # abre http://localhost:5555

# Reset completo (⚠ borra todos los datos)
npx prisma migrate reset --force

# Formatear schema.prisma
npx prisma format
```

> **Cross-platform**: en PowerShell las env vars se setean con `$env:VAR = "valor"`. En bash/zsh con `export VAR=valor`.

## Prisma 7: cambios importantes vs Prisma 6

- ❌ **NO** se acepta `url = env("DATABASE_URL")` en el bloque `datasource` del `schema.prisma`. La URL va en `prisma.config.ts`.
- ❌ **NO** se acepta `datasourceUrl` en el constructor de `PrismaClient`. Hay que usar un **driver adapter** explícito (`@prisma/adapter-pg` para Postgres nativo).
- ✅ El schema solo declara el `provider` (`postgresql`) y los modelos. Todo lo demás va en `prisma.config.ts` o al instanciar el cliente.

Ver `../milkbook_backend/src/prisma/prisma.service.ts` para el patrón de uso actual.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `DATABASE_URL` | — | URL Postgres. Formato: `postgres://USER:PASS@HOST:PORT/DB`. |
| `PRISMA_OUTPUT` | — | Path absoluto donde se genera el cliente tipado. Default recomendado: `../milkbook_backend/node_modules/.prisma/client` (para que el backend lo importe sin config extra). |

## Docker

El servicio `migrate` (definido en `docker-compose.yml`) corre `npx prisma migrate deploy` automáticamente cada `docker compose up`. Las migraciones se leen desde este folder bind-mounteado, no se commitean ejecuciones.

Para que el backend use el cliente generado durante su build, ver `../milkbook_backend/Dockerfile` (paso `npx prisma generate --schema=./prisma/schema.prisma` con `ENV PRISMA_OUTPUT=/app/node_modules/.prisma/client`).

## Modelo actual

Solo un placeholder (`User`) hasta que se defina el dominio completo. Ver el `CHANGELOG.md` raíz para historias pendientes ("Definir el modelo de datos Prisma completo").

## Reglas

- **Naming**: modelos en `PascalCase` (TS), tablas con `@@map("snake_case")` y columnas con `@map("snake_case")` (regla `project-rules.md`).
- **Tamaño**: `schema.prisma` ≤ 700 líneas (regla `coding-rules.md`). Si crece, evaluar partir por dominio o extraer a otro schema.
- **Migrations inmutables**: una vez commiteada y aplicada, una migration no se modifica. Para correcciones: nueva migration que ajusta.
