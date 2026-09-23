# Capacidad del equipo por sprint

Este archivo rastrea cuántos **story points** puede comprometerse cada persona en cada sprint, considerando disponibilidad y responsabilidades.

## Plantilla por sprint

```markdown
## Sprint NN — Fechas: YYYY-MM-DD → YYYY-MM-DD

| Persona | SP objetivo | Días disponibles | Notas |
| --- | --- | --- | --- |
| Leyva | 5 | 10 | coordina + dev |
| Braulio | 5 | 10 | dev |
| López | 5 | 10 | dev |
| Pérez | 5 | 10 | dev |
| **Total** | **20** | | |
```

---

## Sprint 01 — 2026-09-28 → 2026-10-09

**Objetivo del sprint**: dejar la base técnica lista y arrancar el primer desarrollo visible.

| Persona | SP objetivo | Días disponibles | Notas |
| --- | --- | --- | --- |
| Leyva | 5 | 10 | coordina + backend + dev |
| Braulio | 5 | 10 | backend + mobile |
| López | 5 | 10 | frontend + mobile |
| Pérez | 5 | 10 | backend + db |
| **Total comprometido** | **~20 SP** | | ver `sprints/sprint-01/planning.md` |

---

## Cómo se calcula la capacidad

1. **Días hábiles** en el sprint (lun-vie, descontando feriados).
2. **Horas por día** dedicadas al proyecto (no necesariamente 8 h — depende de la disponibilidad real de cada persona).
3. **Velocidad histórica** una vez tengamos 2-3 sprints cerrados.
4. **Holidays / vacaciones** conocidas de antemano.

> **Por ahora**: como no tenemos histórico, asumimos **5 SP / dev / sprint** = ~1 historia de tamaño mediano por persona.

## Cómo se ajusta sprint a sprint

- Si la velocity real (SP completados al cerrar el sprint) es > capacidad → subir capacidad para el próximo sprint.
- Si la velocity es < capacidad → mantener o bajar (no queremos comprometernos a más de lo que podemos).
- Revisar en cada retrospective si alguien tuvo menos disponibilidad real (vacaciones, otros proyectos, etc.).
