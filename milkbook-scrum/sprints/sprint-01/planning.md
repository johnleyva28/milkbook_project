# Sprint 01 — Planning

## Información general

- **Sprint**: 01
- **Fechas**: 2026-09-28 → 2026-10-09
- **Scrum Master / Product Owner**: @leyva
- **Equipo**: @leyva, @braulio, @lopez, @perez

## Objetivo del sprint

> **Tener la base técnica operativa y arrancar la app iOS nativa en Swift**: backend NestJS configurado y corriendo con auth DNI funcionando, schema Prisma completo modelado, app iOS Swift con login por DNI funcionando, y web admin React compilando. Sin features de producto todavía — solo cimientos.

## Historias comprometidas

| ID interno | Título | ID Shortcut | Épica | Responsable | SP | Fecha objetivo |
| --- | --- | --- | --- | --- | --- | --- |
| HU-20 | Configurar proyecto NestJS 11 con TS estricto, eslint, jest | `sc-32` | EP-2 | @perez | 2 | 2026-09-29 |
| HU-21 | Modelar schema Prisma completo (todas las entidades) | `sc-33` | EP-2 | @perez | 8 | 2026-10-02 |
| HU-22 | Migración inicial + seeders con datos de prueba | `sc-34` | EP-2 | @perez | 3 | 2026-10-03 |
| HU-23 | Auth con DNI: endpoint `POST /auth/login-dni` + JWT | `sc-35` | EP-2 | @leyva | 5 | 2026-10-06 |
| HU-40 | Configurar React 19 + Vite + TS + Tailwind + shadcn/ui | `sc-36` | EP-3 | @lopez | 2 | 2026-09-29 |
| HU-12 | Login con DNI + PIN en la app iOS Swift | `sc-37` | EP-1 | @braulio | 5 | 2026-10-07 |

**Total comprometido**: 25 SP (ligeramente sobre capacidad objetivo — ver nota)

## Capacity check

- Capacidad total objetivo: ~20 SP (5 por dev)
- Comprometido: 25 SP
- Holgura: **-5 SP** (sobrecomprometido a propósito por primera vez, reevaluar en review)

> **Nota**: se sobrecompromete a propósito en el sprint 1 para tener margen si algo se atrasa. Si se completan los 25 SP, en el sprint 2 ajustamos la capacidad hacia arriba.

## Dependencias externas

- **Ninguna bloqueante** para este sprint.
- HU-23 depende de HU-21 (necesitamos el modelo User listo para auth).
- HU-12 depende de HU-23 (la app llama al endpoint de auth).

## Riesgos identificados

- **Riesgo 1**: Pérez asume HU-21 (8 SP) y dos historias más (5 SP total). Si se atrasa en el schema, todo se cae. **Mitigación**: Leyva apoya en la estimación de HU-21 al inicio; si al miércoles no hay schema, partimos el schema en dos sprints.
- **Riesgo 2**: ConsultarRUC.pe (para HU-23) tiene rate limiting y a veces falla. **Mitigación**: tener un mock local del servicio desde el día 1; integrar real al final del sprint.
- **Riesgo 3**: Braulio recién arranca Swift en el proyecto (la app ahora es iOS nativa, no Flutter). **Mitigación**: pair programming con Leyva el primer día para subir la curva de SwiftUI + Core Data.

## Notas del planning

- Asumimos que la decisión de herramienta de planificación se difiere para el sprint 2 — usamos este tablero `tablero-kanban.md` durante el sprint 1.
- Si el equipo se decide por una herramienta externa antes del sprint 2, migramos en el planning del sprint 2.
- **Daily sigue siendo NO**. El tablero se actualiza por historia (mover entre columnas).
- Revisar el tablero el miércoles para detectar bloqueos temprano (esto reemplaza al daily).
