# Changelog

Todos los cambios relevantes del proyecto **Milkbook** se documentan en este archivo.

El formato sigue [Keep a Changelog 1.1.0](https://keepachangelog.com/es/1.1.0/) y el proyecto respeta [Semantic Versioning 2.0.0](https://semver.org/lang/es/).

## [Unreleased]

### Pending
- Definir el modelo de datos Prisma completo (entidades validadas en `indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`).
- Implementar la pantalla crítica de "sacar cuentas" en la app del lechero.
- Configurar pipeline de CI/CD.

---

## [0.3.1] - 2026-09-23

### Changed
- **Sprint 01 arranca el 2026-09-25** (antes 2026-09-28). Adelanto de 3 días para empezar esta semana. Fin se mantiene en 2026-10-09. Fechas objetivo de cada historia reajustadas en consecuencia (las que caían lunes ahora se mueven a lunes de la misma semana; las de viernes a viernes). Aplica a toda la documentación y al workspace de Shortcut (iteration ID 26, descripciones de las 6 stories). @leyva

---

## [0.3.0] - 2026-09-23

### Changed
- **Stack móvil: Flutter → Swift nativo**. La app móvil deja de ser multiplataforma Flutter (Dart + Drift + Riverpod + FCM) y pasa a ser **app iOS nativa en Swift 5.9+ con SwiftUI + Core Data + APNs**. Decisión del equipo de apuntar a una experiencia más pulida en iOS primero (los productores objetivo tienen iPhone en su mayoría). Implica reescribir la carpeta `milkbook_app/` cuando arranquemos EP-1. @leyva
- **Notificaciones push: FCM → APNs**. Al ser iOS nativo, usamos Apple Push Notification service (APNs) en vez de Firebase Cloud Messaging. @leyva
- **Firma digital**: biometría ahora es Face ID / Touch ID (en vez de biometría genérica). @leyva

### Docs
- Actualizadas todas las menciones a "Flutter" / "Drift" / "Riverpod" / "FCM" en `milkbook-scrum/` → "Swift" / "Core Data" / "SwiftUI" / "APNs". Archivos tocados: `product-backlog.md`, `equipo.md`, `proceso.md`, `shortcut-setup.md`, `plantillas/{epica,historia-usuario,spike}.md`, `sprints/sprint-01/{planning,tablero,review-retro}.md`, `README.md`. @leyva

---

## [0.2.0] - 2026-09-23

### Changed
- **Herramienta de planificación**: el equipo eligió **[Shortcut](https://www.shortcut.com)** (plan Free) como herramienta oficial para Scrum, reemplazando el tablero Markdown como fuente de verdad del día a día. Decisión documentada en [`../milkbook-scrum/herramientas.md`](../milkbook-scrum/herramientas.md). @leyva

### Added
- **Guía de setup de Shortcut**: `milkbook-scrum/shortcut-setup.md` con 12 pasos detallados para crear el workspace, configurar el workflow (4 columnas: Backlog / In Progress / In Review / Done), activar Iterations (sprints de 2 semanas), migrar las 40+ historias del backlog, crear las 5 épicas, asignar las 6 historias del Sprint 01, conectar la integración GitHub, e invitar al equipo. Incluye tips del Startup Program (12 meses gratis del plan Team) y Nonprofit Program. @leyva
- **Shortcut MCP server configurado**: nuevo archivo `.mcp.json` en la raíz del proyecto que activa el MCP server oficial hosted de Shortcut (`https://mcp.shortcut.com/mcp`) con OAuth. Expone ~65 tools para gestionar stories, epics, iterations, workflows, docs y members desde Claude Code. Permite ejecutar todo el setup de Shortcut sin salir del agente. Se activa en el próximo reinicio de Claude Code. @leyva

### Docs
- Actualizado `proceso.md` con la tabla de mapeo entre las 4 columnas del kanban conceptual y los workflow states de Shortcut. @leyva
- Actualizado `tablero-kanban.md` indicando que ahora es snapshot histórico; la fuente de verdad del día a día pasa a Shortcut. @leyva
- Actualizado `herramientas.md` con banner "Decisión del equipo" al inicio, señalando Shortcut como la elección. @leyva
- Actualizado `shortcut-setup.md` con sección sobre el MCP configurado y tip de uso post-reinicio. @leyva

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
