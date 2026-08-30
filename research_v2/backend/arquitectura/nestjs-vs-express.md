# NestJS vs Express — Decisión arquitectónica

## Contexto

Tenemos que elegir entre **NestJS** y **Express** (o Fastify) para el backend de la plataforma láctea.

## Análisis comparativo

| Criterio | NestJS | Express |
| --- | --- | --- |
| **Arquitectura** | Modular con DI, opinionada | Mínima, sin estructura impuesta |
| **TypeScript** | First-class | Optional, requiere setup manual |
| **Migración desde JS** | Requiere refactor | Compatible con código existente |
| **Inyección de dependencias** | Built-in | Manual o librerías externas |
| **Validación** | Built-in (class-validator) | DIY (Zod, Joi, etc.) |
| **Testing utilities** | Built-in (`@nestjs/testing`) | DIY (Jest + supertest) |
| **Documentación API** | Auto-generada (OpenAPI con decoradores) | Manual o plugin (swagger-jsdoc) |
| **WebSockets** | Built-in (`@nestjs/websockets`) | Librerías externas (socket.io) |
| **GraphQL** | Built-in (`@nestjs/graphql`) | Apollo Server separado |
| **Microservices** | Built-in transports (gRPC, Kafka, NATS) | Manual |
| **Curva de aprendizaje** | Media-alta (Angular-like) | Baja |
| **Velocidad de desarrollo inicial** | Más lento (más boilerplate) | Más rápido |
| **Performance** | ~28k req/s (Express adapter) | ~30k req/s |
| **Bundle size** | Más grande | Mínimo |
| **Comunidad** | Grande, creciendo rápido | La más grande del ecosistema Node |
| **Adopción en la industria** | Creciendo mucho, especialmente en fintech | Estable, dominante legacy |
| **Alineación con TypeScript** | Excelente | Buena pero requiere más setup |
| **Stack similar al frontend** | React + NestJS es combo común | React + Express también |

## Análisis de complejidad del proyecto

Este proyecto tiene:

- **8+ módulos de dominio** (auth, lecheros, clientes, contratos, registros, adelantos, encargos, liquidaciones, boletas, sync, notifications).
- **Lógica de negocio compleja** (liquidaciones, discrepancias, contratos variables).
- **Múltiples roles** (cliente, lechero, admin).
- **Integración con múltiples servicios externos** (SUNAT/OSE, RENIEC, Firebase, email).
- **Requisitos de seguridad altos** (datos personales, financieros).
- **Trabajo en equipo futuro probable** (múltiples devs).

## Análisis de equipo

- **Stack académico**: estudiantes aprendiendo a desarrollar.
- **Aprendizaje**: necesitan entender el código.
- **Mantenibilidad**: el proyecto debe ser mantenible más allá del ciclo académico.

## Recomendación

**NestJS es la elección correcta** para este proyecto por las siguientes razones:

### 1. Estructura importa cuando hay muchos módulos
- 8+ módulos sin estructura = caos en 3 meses.
- NestJS fuerza la separación de responsabilidades (controllers, services, DTOs, entities).
- Cualquier dev que se una al proyecto entiende dónde está cada cosa.

### 2. Validación built-in reduce errores
- `class-validator` + `class-transformer` + DTOs = validación automática en cada endpoint.
- No hay que escribir middleware manual.
- Reduce bugs de input no validado.

### 3. Documentación OpenAPI automática
- `@nestjs/swagger` genera docs desde decoradores.
- El frontend puede usar el OpenAPI para generar tipos TypeScript automáticamente.
- Reduce desalineación backend/frontend.

### 4. Guards y decorators
- `@UseGuards(JwtAuthGuard, RolesGuard)` en cada endpoint protegido.
- `@CurrentUser()` decorator para acceder al usuario autenticado.
- `@Roles('admin')` para control de acceso basado en roles.
- Menos código boilerplate para auth.

### 5. BullMQ integration
- `@nestjs/bull` da integración oficial con BullMQ.
- Procesamiento de liquidaciones, boletas, notificaciones como background jobs.
- Sin reinventar la rueda.

### 6. Testing utilities
- `Test.createTestingModule()` para testing modular.
- Mocking de providers es trivial.
- Importante para proyecto con lógica financiera.

### 7. Escalabilidad del equipo
- Estructura clara permite que múltiples devs trabajen sin pisarse.
- Onboarding más rápido (las convenciones están claras).

## Trade-offs aceptados

- **Más boilerplate inicial**: aceptamos más código "estructural" a cambio de mantenibilidad.
- **Curva de aprendizaje**: estudiantes necesitan aprender NestJS. Pero los conceptos (controllers, services, DTOs) son transferibles.
- **Bundle size mayor**: irrelevante para backend.

## Alternativa considerada: Express modular

Si el equipo **realmente** no quiere aprender NestJS, se puede usar Express con una estructura modular custom:

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   ├── auth.middleware.ts
│   │   └── auth.validator.ts
│   ├── lecheros/...
│   └── ...
├── lib/
├── config/
└── app.ts
```

**Pero esto requiere disciplina manual**, que se pierde con el tiempo.

## Veredicto final

**NestJS 11 + TypeScript + Express adapter.**

Razones:
- Cumple los requisitos del proyecto académico (Node.js + Express, requisito del usuario).
- Estructura profesional que se enseña en la industria.
- Mejor para trabajo en equipo futuro.
- Mejor para mantenimiento a largo plazo.

## Documentación para el equipo

Si el equipo nunca ha usado NestJS:
- Documentación oficial: https://docs.nestjs.com
- Curso: "NestJS Zero to Hero" (recurso gratuito).
- Conceptos clave a entender:
  - Modules (organización)
  - Controllers (HTTP)
  - Services (lógica)
  - DTOs (data transfer objects)
  - Guards (autenticación)
  - Pipes (validación)
  - Interceptors (logging, transform)
  - Decorators (metadata)

## Próximo documento

- [`estructura-modulos.md`](./estructura-modulos.md) — Detalle de cada módulo.