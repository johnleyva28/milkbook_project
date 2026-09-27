# Project Rules

Convenciones del proyecto milkbook. Aplican a todo archivo o directorio nuevo creado dentro del repo.

## Naming: guiones bajos primariamente

**Regla**: todos los nombres de archivos y directorios nuevos del proyecto usan `snake_case` (guiones bajos `_`). Los guiones medios `-` quedan reservados para dependencias externas o namespaces ya establecidos.

**Por qué**: consistencia cross-platform (Windows es case-insensitive pero respeta `_`); evita colisiones con nombres de paquetes npm/registries; alinea con convención de tablas y columnas PostgreSQL.

**Aplicación**:
- ✅ `milkbook_db/`, `milkbook_logs/`, `user_profile.ts`, `schema.prisma`
- ❌ `milkbook-db/`, `user-profile.ts`, `schema-Prisma.prisma`
- **Excepciones heredadas** (no renombrar): `milkbook-scrum/`, `milkbook-changelog/`, `indagacion_y_planteamiento_de_proyecto/` — fueron creadas antes de esta regla. Las próximas iteraciones de Scrum/Changelog SÍ usan guiones bajos (`milkbook_scrum/` cuando se migren).

**Prisma ↔ Postgres**: cuando se defina un modelo, el nombre del modelo en TS va en `PascalCase` (convención Prisma), pero el `@map` para la tabla y los `@map` de columnas deben ir en `snake_case` (`@@map("user_profiles")`, `@map("created_at")`).
