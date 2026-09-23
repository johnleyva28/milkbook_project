# Proceso Scrum — Milkbook

Cómo trabajamos. Scrum suave, sin ceremonias pesadas. El objetivo es entregar valor cada 2 semanas sin que el proceso nos frene.

## Resumen en una línea

> **Sprints de 2 semanas. Kanban con 4 columnas. Planning al inicio, review + retro al final. Cero daily.**

---

## El sprint

| Concepto | Valor |
| --- | --- |
| **Duración** | 2 semanas (10 días hábiles, lunes a viernes) |
| **Inicia** | Lunes — planning de 1 h |
| **Cierra** | Viernes de la segunda semana — review (30 min) + retro (30 min) |
| **Capacidad objetivo** | ~20 story points (5 por dev), ajustable |

## Ceremonias

Solo **3 ceremonias**. Todas ligeras, sin slides, sin formalidades.

### 1. Planning (inicio del sprint)

- **Cuándo**: lunes de la semana 1, 1 hora.
- **Quién**: los 4 devs.
- **Qué se hace**:
  1. Revisar el `product-backlog.md`.
  2. Seleccionar las historias para este sprint (priorizando lo de mayor valor + menos dependencias).
  3. Estimar cada historia en story points si no estaba estimada.
  4. Asignar **un responsable único** por historia (no grupos).
  5. Definir la fecha objetivo dentro del sprint para cada historia.
  6. Documentar todo en `sprints/sprint-NN/planning.md`.

### 2. Daily — **NO EXISTE**

- Sin daily. Cero. La idea es que el kanban muestre el avance.
- Si alguien está bloqueado > 1 día, lo escribe en el chat y se resuelve ahí.

### 3. Review (fin del sprint)

- **Cuándo**: viernes de la semana 2, 30 min.
- **Quién**: los 4 devs (y quien invite el equipo: stakeholders, usuarios piloto, etc.).
- **Qué se hace**:
  1. Demo en vivo de cada historia "hecha" (5 min máx por demo).
  2. Confirmar qué entra al release y qué se mueve al próximo sprint.
  3. Actualizar el `product-backlog.md` (mover lo no hecho al nuevo sprint o descartarlo).
  4. Escribir entrada en `milkbook-changelog/CHANGELOG.md`.

### 4. Retrospective (fin del sprint)

- **Cuándo**: viernes de la semana 2, justo después de la review, 30 min.
- **Quién**: solo los 4 devs.
- **Qué se hace**:
  1. ¿Qué salió bien este sprint? (2-3 bullets)
  2. ¿Qué salió mal? (2-3 bullets)
  3. ¿Qué cambiamos para el próximo sprint? (1-2 acciones concretas con dueño)
  4. Documentar en `sprints/sprint-NN/review-retro.md`.

---

## Kanban

Tablero visual con **4 columnas**. La herramienta oficial del equipo es **[Shortcut](https://www.shortcut.com)** (ver [`herramientas.md`](./herramientas.md) y [`shortcut-setup.md`](./shortcut-setup.md)).

**Mapeo de columnas**:

| Kanban (concepto) | Workflow state en Shortcut |
| --- | --- |
| Backlog | `Backlog` |
| En progreso | `In Progress` |
| En revisión | `In Review` |
| Hecho | `Done` |

```
| Backlog | En progreso | En revisión | Hecho |
|---------|-------------|-------------|--------|
| HU-08   | HU-02       | HU-04       | HU-01  |
| HU-09   |             |             | HU-03  |
| HU-10   |             |             | HU-05  |
```

### Reglas del tablero

- **Una historia solo puede estar en una columna a la vez.**
- **Cada historia tiene un único responsable.** Si dos personas la tocan, una queda como "pair partner" y se aclara en el chat.
- **Una historia pasa a `Hecho` solo cuando cumple toda la Definition of Done.**

---

## Historias de usuario

Cada historia tiene estos campos:

```markdown
### HU-XX — Título corto

- **Responsable**: @persona
- **Story points**: 1, 2, 3, 5, 8 o 13
- **Fecha objetivo**: YYYY-MM-DD
- **Sprint**: sprint-NN

**Como** [rol]
**quiero** [acción]
**para** [beneficio].

**Criterios de aceptación**:
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

**Definition of Done**:
- [ ] Código mergeado a `main`
- [ ] Tests pasando (cuando aplique)
- [ ] Sin warnings de linter
- [ ] Documentación actualizada si aplica
```

Usar la plantilla en [`plantillas/historia-usuario.md`](./plantillas/historia-usuario.md).

---

## Story points — escala de Fibonacci

| SP | Significado | Ejemplo |
| --- | --- | --- |
| **1** | Trivial | Cambiar un texto, fix de 1 línea. |
| **2** | Pequeño | Una pantalla simple, una query, un endpoint sin lógica. |
| **3** | Mediano | Pantalla con formulario + validación, endpoint con reglas de negocio. |
| **5** | Grande pero cabe en sprint | Integración con servicio externo, refactor de módulo. |
| **8** | Muy grande — partir si se puede | Migración completa, pantalla crítica con muchos casos. |
| **13** | Casi seguro hay que partirla | Cualquier historia que toma más de 3 días para un dev. |

**Regla**: si una historia sale > 8, partirla antes del sprint.

---

## Definition of Done (DoD)

Una historia está **Hecha** cuando **TODAS** estas condiciones se cumplen:

- [ ] Código mergeado a `main` con PR aprobado por al menos 1 persona (idealmente 2).
- [ ] Si es backend: tests unitarios pasando, endpoint documentado en `docs/api/`.
- [ ] Si es iOS Swift: compila sin warnings, al menos `xcodebuild` pasa, vista probada manualmente.
- [ ] Si es React: build sin warnings, componente accesible básico.
- [ ] Sin warnings de linter / typecheck.
- [ ] Sin `TODO` o código comentado dejado en el cambio.
- [ ] Si toca schema Prisma: migración creada y aplicada.
- [ ] Si toca UX: revisado con Leyva o López (responsable de UX).
- [ ] Changelog actualizado si es cambio visible al usuario.

---

## Cuándo se mueve una historia

| Situación | Acción |
| --- | --- |
| Historia bloqueada > 1 día | Aviso en chat → Leyva u otro desbloquea. |
| Historia a mitad de sprint sin avance | Se levanta en la review (no hay daily que lo detecte antes). |
| Historia pasa al siguiente sprint | Se mueve en `product-backlog.md`, se reestima si cambió el alcance. |
| Historia cancelada | Se marca como `[CANCELLED]` en el backlog con la razón. |
| Historia descubierta durante el sprint | Se agrega al backlog y se evalúa en el próximo planning (no se cuela al sprint en curso salvo emergencia). |
