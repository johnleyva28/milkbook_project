# Shortcut — Guía de setup para Milkbook

> **Herramienta elegida**: [Shortcut](https://www.shortcut.com) (plan Free hasta 10 usuarios). Scrum completo out-of-the-box: iterations, burndown, capacity, épicas, integraciones GitHub.
>
> Esta guía es paso a paso para dejar la cuenta lista y empezar a trabajar el lunes 2026-09-28 (inicio del Sprint 01).

## Por qué Shortcut

Ver [`herramientas.md`](./herramientas.md) para la comparativa completa. Resumen de por qué ganó:

- **Costo**: $0 con 4 devs (entra en el plan Free de hasta 10 usuarios).
- **Scrum completo de fábrica**: iterations (sprints de 2 semanas por defecto), burndown chart, cumulative flow diagram, velocity.
- **Integración GitHub nativa**: vincula Stories a commits, branches y PRs; mueve automáticamente las Stories entre columnas del workflow según eventos.
- **Sin instalar nada**: SaaS, abre en el navegador.
- **Roadmap** incluido (visualización de épicas a lo largo del tiempo).

## 0. Pre-requisitos

- 4 cuentas de GitHub (una por dev). Cada quien debe tener su email principal de GitHub configurado en su perfil (lo usaremos para vincular commits/PRs).
- El repo `https://github.com/johnleyva28/milkbook_project` con acceso de los 4.
- Un email de equipo (recomendado) para centralizar invitaciones.

## 1. Crear cuenta

1. Ir a https://www.shortcut.com/signup
2. Registrarse con el email del líder del equipo (Leyva). Usar Google SSO si se puede.
3. **Nombre del Workspace**: `Milkbook`.
4. **Slug** (URL): `milkbook` → la URL quedará `https://app.shortcut.com/milkbook`.
5. Elegir plan **Free** (no requiere tarjeta).
6. Durante los primeros 14 días tendrás acceso completo al trial; al día 15, si tienes ≤ 10 usuarios, baja automáticamente al Free sin perder datos.

## 2. Crear Team

1. En Shortcut, ir a **Settings > Teams**.
2. Crear un Team llamado `Milkbook Core` (slug `milkbook-core`).
3. Esto será el team por defecto donde vivan todas las Stories.

## 3. Configurar Workflow

Shortcut trae un workflow por defecto ("One", "Two", "In Progress", "Done") pero lo vamos a ajustar a nuestro kanban de 4 columnas:

1. **Settings > Workflows** (en el Team).
2. Personalizar el workflow por defecto con estos estados:
   - **Backlog** (estado inicial — tipo "Unstarted")
   - **In Progress** (tipo "Started")
   - **In Review** (tipo "Started")
   - **Done** (tipo "Done")
3. Guardar.

> Los nombres exactos se pueden ajustar, pero **mapean a las 4 columnas de nuestro [`tablero-kanban.md`](./tablero-kanban.md)**.

## 4. Activar Iterations

1. **Settings > Features**.
2. Activar **Iterations**.
3. En **Settings > Iterations**:
   - **Duración por defecto**: 2 semanas.
   - **Nombre**: usar el patrón `Sprint NN` (ej: `Sprint 01`, `Sprint 02`).
   - **Fecha de inicio de la primera iteration**: lunes 2026-09-28.
4. Shortcut generará automáticamente las iterations futuras si activas la opción **Auto-create future Iterations** (recomendado).

## 5. Crear las 5 Épicas

Ir a **Epics > New Epic** y crear:

| # | Nombre | Descripción corta | Color sugerido |
| - | --- | --- | --- |
| EP-1 | App móvil Flutter | Componente `milkbook_app/`. Perfiles Cliente y Lechero, offline-first con Drift. | Verde |
| EP-2 | Backend NestJS + Prisma | Componente `milkbook_backend/`. Auth DNI, sync, módulos. | Azul |
| EP-3 | Web admin React | Componente `milkbook_frontend/`. CRM, reportes, disputas. | Morado |
| EP-4 | Integraciones externas | RENIEC/consultarRUC.pe, Nubefact OSE, FCM push. | Naranja |
| EP-5 | Piloto Cajamarca + ajustes | Capacitación, onboarding, métricas, lecciones aprendidas. | Rojo |

Pegar la descripción larga de cada épica desde [`product-backlog.md`](./product-backlog.md).

## 6. Migrar el backlog (40+ historias)

Por cada historia en [`product-backlog.md`](./product-backlog.md):

1. **Stories > New Story**.
2. **Título**: el título corto (ej: "Confirmar litros diario").
3. **Tipo**: Feature (o Bug, si aplica).
4. **Story type**: Mantener en **Feature**.
5. **Estimate**: 1, 2, 3, 5, 8 o 13 (Fibonacci).
6. **Owner**: asignar al responsable único (`@persona`).
7. **Epic**: vincular a la épica correspondiente.
8. **Iteration**: dejar en blanco (Backlog) salvo si entra al Sprint 01.
9. **Descripción** (cuerpo del Story): pegar la historia en formato "Como / quiero / para" + criterios de aceptación + Definition of Done. Fuente: [`plantillas/historia-usuario.md`](./plantillas/historia-usuario.md).
10. **Custom fields** (si los creaste): Sprint target, due date.

> **Tip**: usar la vista **Stories > Import/Export** para subir un CSV con todas las historias de una. Ver https://www.shortcut.com/help/admin/import-overview.

## 7. Asignar las 6 historias del Sprint 01

Las 6 historias comprometidas en [`sprints/sprint-01/planning.md`](./sprints/sprint-01/planning.md):

| ID | Historia | Responsable | SP |
| --- | --- | --- | --- |
| HU-20 | Configurar proyecto NestJS 11 | @perez | 2 |
| HU-21 | Modelar schema Prisma completo | @perez | 8 |
| HU-22 | Migración inicial + seeders | @perez | 3 |
| HU-23 | Auth con DNI: endpoint `POST /auth/login-dni` | @leyva | 5 |
| HU-40 | Configurar React 19 + Vite + TS | @lopez | 2 |
| HU-12 | Login con DNI + PIN en Flutter | @braulio | 5 |

Para cada una:
- Crear el Story en Shortcut con el ID `HU-XX` en el título (ej: `[HU-20] Configurar proyecto NestJS 11`).
- Asignar a la iteration `Sprint 01` (2026-09-28 → 2026-10-09).
- Asignar owner.
- Poner due date alineado con la fecha objetivo del planning.

## 8. Conectar GitHub

1. En Shortcut: **Integrations > GitHub > Add Account**.
2. Autorizar la organización `johnleyva28` (o el owner del repo).
3. Otorgar acceso a `milkbook_project`.
4. **Vincular emails**: cada dev debe poner en su perfil de Shortcut el mismo email primario que usa en GitHub (Shortcut matchea por email).
5. **Configurar event handlers** (mover Stories automáticamente según eventos):
   - **Branch association** → mover a `In Progress`.
   - **Pull request opened** → mover a `In Review`.
   - **Pull request merged** → mover a `Done`.

## 9. Convención de branches y commits

Una vez conectado, Shortcut detecta automáticamente Stories en:

- **Branch name**: contiene `/sc-<story-id>/` (formato por defecto).
- **Commit message**: contiene `[sc-123]` o URL del Story.
- **PR title / description**: contiene `[sc-123]`.

Nuestra convención:
- **Branch**: `feature/hu-XX-descripcion-corta` (sin `/sc-<id>/` necesario — el ID va en el commit).
- **Commit**: `feat(scope): descripcion [HU-XX]` — el `HU-XX` ayuda a rastrear, Shortcut matchea por `[sc-XX]` si quieres auto-vincular.
- **PR title**: `feat(scope): descripcion [sc-XX]` — el `[sc-XX]` es el ID real de Shortcut (lo verás al crear el Story).

> **Nota**: los IDs en Shortcut son `sc-123` numéricos, no `HU-01` como en nuestro backlog. Cuando migremos, mantener el `HU-XX` en el título y usar el `sc-XX` solo para auto-vinculación con Shortcut.

## 10. Invitar al equipo

1. **Settings > Members > Invite Users**.
2. Invitar a: `braulio@...`, `lopez@...`, `perez@...` (reemplazar con emails reales).
3. Asignar rol **Member** (no Admin) a los 3 devs.
4. **Líder (Leyva)**: queda como **Owner/Admin** del Workspace.

## 11. Verificación post-setup

Antes del planning del Sprint 01 (lunes 2026-09-28), confirmar:

- [ ] Workspace creado y accesible en `https://app.shortcut.com/milkbook`.
- [ ] Los 4 miembros están invitados y aceptaron.
- [ ] Workflow personalizado con 4 columnas.
- [ ] Iterations activadas (Sprint 01 = 2026-09-28 → 2026-10-09).
- [ ] 5 épicas creadas.
- [ ] 40+ historias migradas al backlog.
- [ ] 6 historias del Sprint 01 asignadas a la iteration `Sprint 01`.
- [ ] Integración GitHub conectada al repo `johnleyva28/milkbook_project`.
- [ ] Emails de GitHub matcheados con perfiles de Shortcut.
- [ ] Event handlers configurados (branch → In Progress, PR open → In Review, PR merge → Done).

## 12. Migración del tablero Markdown

A partir del Sprint 01, **`tablero-kanban.md` queda como archivo histórico** (snapshot). La fuente de verdad del estado de las historias pasa a ser Shortcut.

Aún lo mantenemos porque:
- Da una vista rápida sin necesidad de loguearse.
- Sirve de backup si Shortcut cae.
- Es fácil de compartir capturas para la retrospectiva.

## Referencias oficiales

- Quick Start: https://www.shortcut.com/help/getting-started/quick-start
- Core Concepts: https://www.shortcut.com/help/getting-started/core-concepts
- Iterations: https://www.shortcut.com/help/iterations/iterations-overview
- GitHub integration: https://www.shortcut.com/help/integrations/github
- Pricing: https://www.shortcut.com/pricing
- API REST v3 (por si queremos automatizar): https://developer.shortcut.com/api/rest/v3

## Startup Program (opcional)

Si Milkbook califica como startup (≤ 50 empleados), Shortcut ofrece **12 meses gratis del plan Team** ([postular aquí](https://www.shortcut.com/startups)). No es bloqueante — podemos quedarnos en Free hasta decidir.

## Nonprofit Program (opcional)

Si Milkbook llega a operar como asociación sin fines de lucro en el futuro, Shortcut ofrece plan **gratuito permanente** ([postular aquí](https://forms.gle/nEycYUu6MFB7EP5AA)). Guardar este dato para cuando aplique.
