# Changelog

Todos los cambios relevantes del proyecto **Milkbook** se documentan en este archivo.

El formato sigue [Keep a Changelog 1.1.0](https://keepachangelog.com/es/1.1.0/) y el proyecto respeta [Semantic Versioning 2.0.0](https://semver.org/lang/es/).

## [Unreleased]

### Pending
- Definir el modelo de datos Prisma completo (entidades validadas en `indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`).
- Implementar la pantalla crítica de "sacar cuentas" en la app del lechero.
- Configurar pipeline de CI/CD.

---

## [0.1.0] - 2026-09-23

### Added
- **Estructura Scrum**: nueva carpeta `milkbook-scrum/` con setup Scrum suave para el equipo de 4 desarrolladores (Leyva, Braulio, López, Pérez). Incluye `README.md`, `equipo.md`, `proceso.md`, `product-backlog.md`, `herramientas.md`, `tablero-kanban.md`, `capacity.md`, `sprints/` y `plantillas/`. @leyva
- **Catálogo de herramientas de planificación**: `milkbook-scrum/herramientas.md` con 9 opciones comparadas (GitHub Projects, Linear, Shortcut, Plane, Jira, Trello, OpenProject, Taiga, Leantime/Focalboard). La elección queda pendiente para decisión del equipo. @leyva
- **Product backlog inicial**: 5 épicas basadas en la investigación validada (app móvil Flutter, backend NestJS, web admin React, integraciones externas, piloto en Cajamarca). Ver [`../milkbook-scrum/product-backlog.md`](../milkbook-scrum/product-backlog.md). @leyva
- **Primer sprint planificado**: `milkbook-scrum/sprints/sprint-01/` con 5 historias de usuario listas para arrancar el desarrollo. @leyva

### Changed
- **Renombrado de carpeta de changelog**: `changelogs/` → `milkbook-changelog/` para alinear con la convención de nombres del proyecto (todas las carpetas usan prefijo `milkbook-`). Se conserva el formato de Keep a Changelog 1.1.0. @leyva

### Docs
- Documentación del proceso Scrum: sprints de 2 semanas, kanban con 4 columnas (`Backlog`, `En progreso`, `En revisión`, `Hecho`), reuniones cada 2 semanas (planning + review + retrospective), sin daily. Ver [`../milkbook-scrum/proceso.md`](../milkbook-scrum/proceso.md). @leyva

---

## Cómo leer este changelog

- Las versiones mayores (`1.0.0`+) marcan hitos de release (ej: piloto en Cajamarca, versión pública).
- Mientras estamos en `0.x.y`, los `MINOR` bumps agrupan nuevas funcionalidades y los `PATCH` son fixes.
- Cada entrada referencia al autor con `@usuario`.
