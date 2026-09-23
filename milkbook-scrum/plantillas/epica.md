# Plantilla — Épica

> Copiar y llenar para cada épica nueva. Una épica agrupa varias historias de usuario que entregan juntas un bloque de valor.

```markdown
## ÉPICA X — Nombre corto

> Una frase que diga qué valor grande entrega esta épica.

**Componente técnico**: app iOS Swift / backend NestJS / web admin React / integraciones / piloto.

**Por qué importa**:
> Por qué esta épica está en el producto. Qué problema del usuario resuelve. Si hay dato validado de la investigación, citarlo.

**Stakeholders / usuarios**:
- Persona 1 (rol)
- Persona 2 (rol)

**Criterios de éxito** (qué tiene que ser verdad cuando esta épica esté completa):
- [ ] Criterio 1 (observable por el usuario)
- [ ] Criterio 2
- [ ] Criterio 3

**Historias hijas**:
- HU-XX — Título
- HU-YY — Título
- HU-ZZ — Título

**Dependencias externas**:
- Servicio / API / sistema del que dependemos
- Persona fuera del equipo

**Riesgos**:
- Riesgo 1 → mitigación
- Riesgo 2 → mitigación

**Métrica de éxito** (si aplica):
- Métrica observable (ej: tiempo de sacado de cuentas pasa de 20-40 min a 5-10 min)
```

## Buenas prácticas al escribir épicas

- **Una épica = un bloque de valor** entregado por el equipo. No es una tarea técnica.
- **Las épicas se parten en historias** que caben en sprints.
- **Criterios de éxito**: lo que el usuario o el negocio puede verificar, no detalles técnicos.
- **No más de 5-8 historias por épica**. Si pasa, partir la épica.
- **Una épica puede tomar varios sprints** — eso es normal.

## Ejemplo (ÉPICA 1 — App iOS Swift)

```markdown
## ÉPICA 1 — App iOS Swift (offline-first)

> Una app móvil que funciona sin internet y sincroniza cuando hay conexión, permitiendo a lecheros y clientes registrar su operación diaria en zonas rurales de Cajamarca.

**Componente técnico**: app iOS Swift.

**Por qué importa**:
> Validado en investigación: el 90% de productores tiene smartphone, pero la cobertura es intermitente. Sin offline-first, la app no es usable. Fuente: `indagacion_y_planteamiento_de_proyecto/README.md` (tabla "Datos clave validados").

**Stakeholders / usuarios**:
- Carlos (lechero, perfil principal)
- Juan (cliente, perfil secundario)
- Empleado del lechero (caso raro, 1 día/semana)

**Criterios de éxito**:
- [ ] La app arranca sin internet y permite registrar visita / confirmar litros
- [ ] Las operaciones offline se sincronizan correctamente cuando vuelve la conexión
- [ ] El cliente confirma litros en < 30 segundos
- [ ] El lechero cierra un contrato (saca cuentas) en 5-10 minutos (vs 20-40 min sin app)
- [ ] El 100% de las pantallas críticas validadas con ≥ 3 usuarios piloto

**Historias hijas**:
- HU-01 — Registrar visita diaria (5 SP)
- HU-02 — Confirmar litros diario (3 SP)
- HU-08 — Pantalla crítica "sacar cuentas" (13 SP — partir)
- HU-12 — Login con DNI + PIN (5 SP)
- HU-15 — Offline-first con Drift + outbox (13 SP — épica técnica)

**Dependencias externas**:
- HU-23 (backend auth DNI) — bloquea HU-12.

**Riesgos**:
- Drift puede no escalar bien con > 10K registros → evaluar Isar como plan B.
- FCM puede no llegar a zonas sin cobertura → tener fallback por SMS en backlog futuro.

**Métrica de éxito**:
- Tiempo medio de sacado de cuentas: < 10 min (medido durante el piloto).
- % de operaciones registradas offline que sincronizan sin conflicto: > 95%.
```
