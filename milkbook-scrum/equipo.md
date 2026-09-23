# Equipo Milkbook

Equipo de desarrollo de la plataforma lechera rural Milkbook. Somos **4 personas**, todas programamos y compartimos responsabilidades de coordinación.

## Personas

| Nombre | Rol técnico | Rol Scrum | Responsabilidades principales |
| --- | --- | --- | --- |
| **Leyva** | Full-stack (Swift + NestJS + React) | **Product Owner + Scrum Master + Dev** | Prioriza el backlog, facilita planning / review / retro, desbloquea al equipo, asume tareas críticas de arquitectura, mergea PRs. |
| **Braulio** | Backend / iOS | Dev | Implementa features de backend (NestJS) y/o mobile iOS (Swift/SwiftUI) según el sprint. |
| **López** | Frontend / iOS | Dev | Implementa features de web admin (React) y/o mobile iOS (Swift/SwiftUI) según el sprint. |
| **Pérez** | Backend / Database | Dev | Implementa features de backend, schema de Prisma, queries y migraciones. |

> **Nota**: la asignación "rol técnico" es orientativa. Cualquier dev puede tomar cualquier historia según su capacidad y ganas. Leyva no tiene especialidad cerrada.

## Carga de trabajo

**Equilibrada por sprint**. Leyva no recibe más carga por ser líder — el rol Scrum es **organización y desbloqueo**, no más tareas.

Ejemplo para un sprint de 2 semanas:

| Persona | Story points objetivo | Horas/semana dedicadas |
| --- | --- | --- |
| Leyva | 5 SP | ~20 h/semana |
| Braulio | 5 SP | ~20 h/semana |
| López | 5 SP | ~20 h/semana |
| Pérez | 5 SP | ~20 h/semana |
| **Total** | **~20 SP/sprint** | |

(Los números son referencia inicial — se ajustan sprint a sprint según `capacity.md`.)

## Por qué carga equilibrada

- Leyva ya dedica tiempo a coordinar (planning, review, retro, desbloquear a los demás, revisar PRs).
- Si se le asigna más carga técnica, termina haciendo加班 o dejando el lado Scrum.
- Los demás devs también necesitan crecer: que Leyva no acapare todo lo crítico les impide aprender.

## Matriz RACI por tipo de tarea

| Tipo de tarea | Leyva | Braulio | López | Pérez |
| --- | --- | --- | --- | --- |
| Definir épica | **A** (aprueba) | C | C | C |
| Estimar historia | **R** (responsable de la estimación final) | C | C | C |
| Implementar historia | A | **R** (si es suya) | **R** (si es suya) | **R** (si es suya) |
| Revisar PR | **R** | C | C | C |
| Merge a main | **R** | I | I | I |
| Cerrar sprint | **R** | I | I | I |
| Actualizar changelog | **R** | I | I | I |

**Leyenda RACI**: **R** = Responsable (hace), **A** = Approver (aprueba), **C** = Consultado, **I** = Informado.

## Comunicación

- **Canal principal**: chat del equipo (definir cuál — WhatsApp, Discord, Slack, etc.).
- **Planning y review-retro**: cada 2 semanas, presencial o videollamada.
- **Daily**: **no hay** — el avance se ve en el tablero kanban (`tablero-kanban.md` o la herramienta que se elija).
- **Bloqueos**: cuando alguien está bloqueado > 1 día, lo escribe en el chat para que Leyva (u otro) lo desbloquee.
