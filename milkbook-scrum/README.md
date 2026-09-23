# milkbook-scrum

Esta carpeta contiene todo el material Scrum del proyecto **Milkbook**: equipo, proceso, backlog, ceremonias, retrospectivas y catálogo de herramientas de planificación.

> **Filosofía**: Scrum suave. Sin ceremonias pesadas. Lo importante es tener un tablero kanban con responsables y fechas, y revisar el avance cada 2 semanas.

## Contenido

| Archivo | Para qué sirve |
| --- | --- |
| [`equipo.md`](./equipo.md) | Quiénes somos, roles Scrum, responsabilidades. |
| [`proceso.md`](./proceso.md) | Cómo trabajamos: sprints, ceremonias, kanban, estimación. |
| [`product-backlog.md`](./product-backlog.md) | Backlog priorizado con épicas e historias. |
| [`capacity.md`](./capacity.md) | Capacidad del equipo por sprint (story points por persona). |
| [`tablero-kanban.md`](./tablero-kanban.md) | Vista textual del kanban (Backlog / En progreso / En revisión / Hecho). |
| [`herramientas.md`](./herramientas.md) | Catálogo de herramientas + **decisión registrada: Shortcut**. |
| [`shortcut-setup.md`](./shortcut-setup.md) | Guía paso a paso para configurar Shortcut (elegida 2026-09-23). |
| [`sprints/`](./sprints/) | Una carpeta por sprint con planning, tablero y review. |
| [`plantillas/`](./plantillas/) | Templates para escribir historias, épicas y spikes. |

## Cómo empezar

1. Lee [`equipo.md`](./equipo.md) para saber quién hace qué.
2. Lee [`proceso.md`](./proceso.md) para entender las reglas del juego.
3. Lee [`product-backlog.md`](./product-backlog.md) para ver qué viene.
4. Lee [`sprints/sprint-01/planning.md`](./sprints/sprint-01/planning.md) para arrancar la primera iteración.

## Cómo contribuir

- **Cada historia nueva** va al backlog en [`product-backlog.md`](./product-backlog.md) usando la plantilla [`plantillas/historia-usuario.md`](./plantillas/historia-usuario.md).
- **Cada sprint nuevo** se crea como `sprints/sprint-NN/` copiando [`sprints/plantilla-sprint.md`](./sprints/plantilla-sprint.md).
- **Cada cierre de sprint** se registra en `sprints/sprint-NN/review-retro.md` y se actualiza [`../milkbook-changelog/CHANGELOG.md`](../milkbook-changelog/CHANGELOG.md).

## Glosario rápido

- **Épica**: bloque grande de funcionalidad (ej: "App iOS Swift").
- **Historia de usuario**: funcionalidad concreta desde la perspectiva del usuario (ej: "Como lechero quiero registrar visitas").
- **Spike**: tarea de investigación con tiempo limitado (ej: "Investigar Drift vs Isar para offline").
- **Story points**: estimación de esfuerzo relativa (1, 2, 3, 5, 8, 13 — escala de Fibonacci).
- **Velocity**: total de story points completados por sprint.
- **Sprint**: iteración de **2 semanas**.
- **Definition of Done (DoD)**: criterios que una historia debe cumplir para considerarse "hecha" (ver `proceso.md`).

## Contacto

- **Scrum Master / Product Owner**: Leyva.
- **Repositorio**: `C:\Users\LENOVO\milkbook_project` (este).
- **Rama principal**: `main`.
