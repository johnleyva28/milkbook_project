# milkbook_frontend

Aplicación web del proyecto milkbook. React 19 + Vite + TypeScript.

## Stack

- **React 19** + **TypeScript 6** strict
- **Vite 8** (build y dev server)
- **Oxlint** para linting

## Estructura

```
src/
├── main.tsx        # entry point, monta <App /> en #root
├── App.tsx         # componente raíz (landing por ahora)
├── App.css
├── index.css
└── assets/         # logos, iconos
```

Public assets y `index.html` viven en la raíz de la carpeta.

## Comandos

```powershell
# Dev server local (sin Docker, requiere Node 20.19+)
npm install
npm run dev         # http://localhost:5173

# Build producción
npm run build       # → dist/
npm run preview     # sirve dist/ localmente para validar

# Lint
npm run lint        # oxlint
```

## Docker

El frontend se dockeriza en un multi-stage build (`Dockerfile` en esta carpeta):
- **Stage build**: `node:20-alpine` con `npm ci` + `npm run build` → genera `dist/`.
- **Stage runtime**: `nginx:1.27-alpine` sirviendo `dist/` en el puerto 80 interno.

Nginx está configurado con SPA fallback (`try_files $uri $uri/ /index.html`) listo para React Router cuando se agregue. Ver `nginx.conf` para detalle de cache de assets estáticos.

El contenedor expone `${FRONTEND_PORT}` (default `8080`) mapeado al 80 interno.

Para reconstruir manualmente: `docker compose up -d --build frontend`.

## Conectar al backend

El frontend aún no llama al backend (`App.tsx` no tiene fetches). Cuando se agreguen llamadas a la API:

```ts
// Vite resuelve VITE_* en build time → URL queda horneada en el bundle
const apiUrl = import.meta.env.VITE_API_URL;
```

`VITE_API_URL` debe setearse en build time (no runtime). El `Dockerfile` actual no la recibe; cuando se agregue:
1. Definir `VITE_API_URL` en `.env` raíz (ej. `VITE_API_URL=http://localhost:3000`).
2. En `docker-compose.yml`, agregar `args: [VITE_API_URL=...]` al build del frontend.
3. En el `Dockerfile` del frontend: `ARG VITE_API_URL` + `ENV VITE_API_URL=$VITE_API_URL` antes de `npm run build`.

Alternativa para SPA ya en producción: configurar `nginx.conf` con un proxy `/api → backend:3000` (ver el bloque comentado de ejemplo más adelante).

## Convenciones

- **Tamaño**: ≤ 500 líneas por archivo (regla del proyecto, ver `../.agents/rules/coding-rules.md`).
- **Naming**: archivos `kebab-case.tsx` (ej. `user-profile.tsx`), componentes `PascalCase.tsx` en su carpeta.
- **Estado**: aún no hay decisión. Cuando se agregue: Zustand o Context para client state, TanStack Query para server state.

## Recursos

- React docs: https://react.dev
- Vite docs: https://vite.dev
