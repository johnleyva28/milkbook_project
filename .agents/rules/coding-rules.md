# Coding Rules

Reglas de estilo y tamaño del código en milkbook. Aplican a TypeScript, Prisma schema, archivos de configuración y cualquier código escrito a mano.

## Tamaño de archivo: 500 estándar, 700 máximo

**Regla**:
- **Estándar**: cada archivo debe tener ≤ 500 líneas.
- **Máximo absoluto**: 700 líneas. Superarlo es motivo de rechazo en review.
- Si un archivo crece más allá de 500, es señal de refactor próximo; si supera 700, refactor antes de merge.

**Por qué**: archivos cortos se navegan, se revisan y se testean. Archivos de 1000+ líneas esconden bugs, rompen code-splitting y hacen diffs imposibles de leer.

**Aplicación**:
- Aplica a: `.ts`, `.tsx`, `.prisma`, `.yml`/`.yaml` authored, `.md` de docs internas.
- **No aplica a**: archivos generados (`dist/`, `node_modules/`, `package-lock.json`, código emitido por NestJS CLI, migraciones generadas por `prisma migrate`).
- **Cómo se mide**: líneas reales, no líneas lógicas. Excluir líneas en blanco al final.

**Señales de que toca refactorizar**:
- Un controller con > 10 endpoints → partir en módulos por dominio (`auth.controller.ts`, `accounts.controller.ts`).
- Un service con > 5 dependencias inyectadas → extraer sub-servicios.
- Un archivo `.prisma` con > 8 modelos → considerar partir en archivos múltiples y/o mover a módulo de dominio separado (Prisma no soporta archivos múltiples oficialmente, así que esto señaliza extraer otro schema).

## Otras reglas (heredadas, en crecimiento)

- Idioma del código: identificadores y comentarios en **inglés**. Documentación y mensajes de commit en **español** (ver `git-rules.md`).
- Sin emojis en código ni en commits.
- TypeScript `strict: true`. Sin `any` salvo en bordes con librerías externas sin tipos (justificar con `// eslint-disable-next-line` + razón).
