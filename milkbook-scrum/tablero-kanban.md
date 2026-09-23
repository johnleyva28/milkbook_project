# Tablero Kanban — Milkbook

Vista textual del tablero kanban del sprint actual. **4 columnas**: Backlog → En progreso → En revisión → Hecho.

> **Mientras no adoptemos una herramienta externa** (ver [`herramientas.md`](./herramientas.md)), este archivo es la fuente de verdad. Actualizar al menos **2 veces por semana**.

**Convención de IDs**: `HU-XX` (historia de usuario) del [`product-backlog.md`](./product-backlog.md). Los spikes usan `SP-XX`. Las épicas usan `EP-XX`.

**Símbolos**:
- ✅ = hecho
- 🟡 = en revisión
- 🔵 = en progreso
- ⚪ = bloqueado (con razón)
- 📋 = en backlog

---

## Sprint actual: **Sprint 01** (2026-09-28 → 2026-10-09)

### Backlog (📋)

- HU-20 — Configurar proyecto NestJS 11
- HU-21 — Modelar schema Prisma completo
- HU-23 — Auth con DNI
- HU-25 — CRUD lecheros + clientes
- HU-26 — CRUD contratos con snapshot precio
- HU-40 — Configurar React 19 + Vite + TS
- HU-60 — Integración RENIEC/consultarRUC.pe

### En progreso (🔵)

- _(vacío al inicio del sprint)_

### En revisión (🟡)

- _(vacío al inicio del sprint)_

### Hecho (✅)

- _(vacío al inicio del sprint)_

---

## Cómo actualizar este tablero

- **Cada vez que empieces una historia**: moverla de Backlog → En progreso.
- **Cuando abras un PR**: moverla de En progreso → En revisión.
- **Cuando se mergee el PR**: moverla de En revisión → Hecho.
- **Cuando una historia quede bloqueada**: añadir ⚪ y la razón entre paréntesis (ej: `⚪ HU-21 (esperando decisión sobre RUC)`).
- **Si la historia no se hace este sprint**: regresarla a Backlog (sin tachar) para que se incluya en el próximo planning.

## Formato de cada tarjeta

```
- [HU-XX] — Título corto — @responsable — SP: N — objetivo: YYYY-MM-DD
```

Ejemplo: `- [HU-02] — Confirmar litros diario — @lopez — SP: 3 — objetivo: 2026-10-02`
