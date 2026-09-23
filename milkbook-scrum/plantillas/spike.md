# Plantilla — Spike

> Un **spike** es una tarea de investigación con **tiempo limitado**. Se usa cuando necesitamos aprender algo antes de comprometerse a una historia.

```markdown
## SP-XX — Título del spike

- **Responsable**: @persona
- **Tiempo límite**: X horas o Y días
- **Sprint**: sprint-NN (opcional)

**Pregunta a responder**:
> ¿Qué decisión técnica / de producto necesitamos tomar? Formular como pregunta concreta.

**Opciones a evaluar**:
1. Opción A — descripción breve
2. Opción B — descripción breve
3. Opción C — descripción breve

**Criterios de comparación**:
- Criterio 1 (ej: costo)
- Criterio 2 (ej: facilidad de integración)
- Criterio 3 (ej: comunidad / soporte)
- Criterio 4 (ej: performance)

**Entregable**:
> ¿Qué tiene que producir este spike al final? (un ADR, un prototipo, una recomendación escrita, etc.)

**Output esperado** (al cerrar el spike):
- [ ] Respuesta clara a la pregunta
- [ ] Recomendación con justificación
- [ ] Si aplica: spike nuevo para implementar la recomendación, o historia para el backlog
```

## Cuándo usar un spike

- **Decisiones técnicas con varias opciones válidas** (ej: Drift vs Isar, S3 vs Cloudinary, etc.).
- **Estimaciones imposibles sin investigar** (ej: rendimiento de FCM en zonas rurales).
- **Validar suposición de la investigación** antes de comprometerse.

## Cuándo NO usar un spike

- Para tareas que ya sabemos hacer (es una historia, no un spike).
- Para aprender cosas que no van a usarse pronto (backlog futuro sin sprint).
- Para "experimentar" sin objetivo concreto (eso es trabajo de investigación, no de sprint).

## Ejemplo (SP-01 — Drift vs Isar)

```markdown
## SP-01 — Drift vs Isar para offline-first

- **Responsable**: @braulio
- **Tiempo límite**: 1 día (6 h)
- **Sprint**: sprint-01

**Pregunta a responder**:
> ¿Qué librería de SQLite para Flutter es la mejor para nuestra app offline-first: Drift o Isar?

**Opciones a evaluar**:
1. Drift — SQL-first, código generado, comunidad grande.
2. Isar — NoSQL-like, muy rápido, más nuevo.
3. sqflite + custom — más control, más código.

**Criterios de comparación**:
- Performance con > 10K registros
- Facilidad de migraciones
- Soporte para sync (LWW, outbox)
- Madurez y comunidad
- Documentación y curva de aprendizaje

**Entregable**:
- Documento `docs/arquitectura/drift-vs-isar.md` con la recomendación y pruebas básicas.

**Output esperado**:
- [ ] Benchmark con datos sintéticos (10K registros)
- [ ] Recomendación escrita con justificación
- [ ] Si se elige Drift: spike SP-02 para implementar el patrón outbox.
```
