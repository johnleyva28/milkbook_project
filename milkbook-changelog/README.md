# milkbook-changelog

Registro de cambios paso a paso del proyecto **Milkbook** (plataforma lechera rural con Flutter, NestJS y React).

Este changelog sigue el formato de [Keep a Changelog 1.1.0](https://keepachangelog.com/es/1.1.0/) y respeta [Semantic Versioning 2.0.0](https://semver.org/lang/es/).

## Cómo usar esta carpeta

- Cada cambio relevante del proyecto (funcionalidad, corrección, breaking change, decisión técnica) se registra en `CHANGELOG.md` con una entrada fechada.
- Una entrada agrupa varios cambios bajo un número de versión (`0.x.y` mientras estamos en MVP, `1.0.0` cuando se libere el piloto en Cajamarca).
- Cada cambio individual dentro de una entrada usa una sección según su tipo:

  | Sección | Uso |
  | --- | --- |
  | **Added** | Funcionalidades nuevas. |
  | **Changed** | Cambios en funcionalidades existentes. |
  | **Deprecated** | Funcionalidades que se eliminarán pronto. |
  | **Removed** | Funcionalidades eliminadas. |
  | **Fixed** | Corrección de bugs. |
  | **Security** | Cambios relacionados con vulnerabilidades. |
  | **Docs** | Cambios solo de documentación. |
  | **Chore** | Tareas internas sin impacto en el producto. |

- Las versiones siguen el patrón `MAJOR.MINOR.PATCH`:
  - **MAJOR**: cambios incompatibles con versiones anteriores (ej: nuevo modelo de datos que rompe sync).
  - **MINOR**: nueva funcionalidad compatible hacia atrás (ej: pantalla de encargos).
  - **PATCH**: corrección de bugs compatible hacia atrás (ej: fix en cálculo de litros).

## Convención para escribir entradas

```markdown
## [0.2.0] - 2026-10-07

### Added
- Pantalla de confirmación de litros para el cliente (HU-12). @braulio
- Endpoint `POST /api/registros` con validación de schema. @lopez

### Changed
- Auth pasa a usar solo DNI (RUC opcional). @leyva

### Fixed
- Crash en app móvil al abrir sin conexión. @perez
```

- Se nombra a **una sola persona** por bullet (la que hizo el cambio o lo mergeó).
- Se referencia el issue / historia de usuario entre paréntesis si aplica (ej: `(HU-12)`).
- Las fechas se escriben en formato `YYYY-MM-DD`.

## Relación con Scrum

- Cada sprint genera una entrada de changelog al cierre (con sus historias completadas).
- El Scrum Master (Leyva) es responsable de mantener este archivo actualizado al cierre de cada sprint.
- Ver [`../milkbook-scrum/proceso.md`](../milkbook-scrum/proceso.md) para el flujo completo.
