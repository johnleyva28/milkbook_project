# Plantilla — Historia de usuario

> Copiar y llenar para cada historia nueva. Pegar en [`../product-backlog.md`](../product-backlog.md) o en el planning del sprint correspondiente.

```markdown
### HU-XX — Título corto

- **Responsable**: @persona
- **Story points**: 1, 2, 3, 5, 8 o 13
- **Fecha objetivo**: YYYY-MM-DD
- **Sprint**: sprint-NN
- **Épica**: EP-X — Nombre de la épica
- **Componente técnico**: app móvil Flutter / backend NestJS / web admin React

**Como** [rol del usuario — Cliente, Lechero, Admin, etc.]
**quiero** [acción concreta que el usuario quiere hacer]
**para** [beneficio / valor que obtiene].

**Contexto adicional** (opcional):
> Información de fondo que ayude a entender la historia. Cita la investigación validada si aplica.

**Criterios de aceptación**:
- [ ] Criterio observable 1
- [ ] Criterio observable 2
- [ ] Criterio observable 3
- [ ] Validación con usuario piloto (si aplica)

**Definition of Done** (ver [`../proceso.md`](../proceso.md)):
- [ ] Código mergeado a `main`
- [ ] PR aprobado por ≥ 1 persona
- [ ] Tests pasando (cuando aplique)
- [ ] Sin warnings de linter / typecheck
- [ ] Sin `TODO` dejado en el código
- [ ] Documentación actualizada (si aplica)
- [ ] Changelog actualizado (si es visible al usuario)

**Notas técnicas** (opcional):
> Si hay decisiones técnicas que tomar (librería, patrón, etc.), listarlas aquí o como spike aparte.

**Dependencias** (opcional):
- HU-YY (necesita estar hecha primero)
```

## Buenas prácticas al escribir historias

- **Una historia = un valor entregable**. Si se puede partir, se parte.
- **"Como / quiero / para"** en presente, no condicional.
- **Criterios de aceptación**: lo que el usuario podría verificar (no detalles técnicos).
- **Story points**: estimar en grupo, no individualmente.
- **Responsable único**: una persona, no un grupo.
- **Sin detalles de implementación** en la historia (esos van en notas técnicas o spike).
- **Si pasa de 8 SP**: partir antes del sprint.

## Ejemplo (HU-02 — confirmar litros)

```markdown
### HU-02 — Confirmar litros diario

- **Responsable**: @lopez
- **Story points**: 3
- **Fecha objetivo**: 2026-10-15
- **Sprint**: sprint-02
- **Épica**: EP-1 — App móvil Flutter
- **Componente técnico**: app móvil Flutter

**Como** cliente lechero (Juan)
**quiero** confirmar los litros del día en menos de 30 segundos
**para** no perder tiempo y mantener al día mi registro con Carlos.

**Contexto**:
> Validado en investigación: el cliente quiere una pantalla ultra rápida, sin pasos innecesarios. Fuente: `indagacion_y_planteamiento_de_proyecto/app-movil/cliente/confirmar-litros.md`.

**Criterios de aceptación**:
- [ ] Pantalla única muestra los litros propuestos por Carlos
- [ ] Botón principal "Confirmar" con un tap guarda la confirmación
- [ ] Si los litros no coinciden, hay un campo para corregir y notificar a Carlos
- [ ] Funciona offline (Drift cachea la confirmación y la sube después)
- [ ] Animación / feedback visual al confirmar (no solo cambio de estado silencioso)

**Definition of Done**:
- (igual que arriba)
```
