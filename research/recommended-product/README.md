# Producto recomendado

Este directorio contiene la definición del producto recomendado tras la comparación entre Idea A y Idea B.

> **Conclusión:** Construir el proyecto integrador sobre **Idea B (plataforma de gestión láctea)** con MVP acotado, arquitectura multi-tenant, modelo B2B (cobrar al comprador/acopio, no al productor), e interfaz WhatsApp-first para el productor rural.

## Contenido

1. [`problem.md`](./problem.md) – Problema, usuarios y propuesta de valor
2. [`personas.md`](./personas.md) – Personas primarias, secundarias y anti-personas
3. [`jobs-to-be-done.md`](./jobs-to-be-done.md) – JTBD priorizados
4. [`mvp.md`](./mvp.md) – MVP, V2, Fuera de alcance, criterios de éxito
5. [`future-roadmap.md`](./future-roadmap.md) – Roadmap por horizontes
6. [`processes.md`](./processes.md) – Procesos principales (candidatos a BPMN)
7. [`roles-and-permissions.md`](./roles-and-permissions.md) – Roles, permisos, multi-tenancy
8. [`conceptual-data-model.md`](./conceptual-data-model.md) – Modelo de datos conceptual
9. [`architecture.md`](./architecture.md) – Arquitectura técnica completa

## Resumen en una frase

> **Una plataforma SaaS multi-tenant que registra entregas de leche, traza cambios de precio, genera liquidaciones digitales, y notifica a productores por WhatsApp, ayudando a compradores pequeños (acopiadores, queseros) a profesionalizar su relación con productores rurales en Perú.**

## Diferenciadores clave

1. **WhatsApp-first para productores** (no app que instalar).
2. **Multi-tenant SaaS** desde día 1.
3. **Modo offline robusto** (SQLite local + sync).
4. **Integración SUNAT/OSE** (V2) y **Yape/Plin** (V2).
5. **Enfoque local peruano** (no adaptación de software genérico).
6. **Modelo B2B** (cobrar al comprador, no al productor).

## Próximo paso (NO programación)

**Validar el problema con 5-10 compradores reales en Cajamarca antes de programar.**

- 5 entrevistas a compradores (lecheros, queseros, acopiadores).
- 5 entrevistas a productores rurales.
- Preguntar willingness-to-pay: ¿S/ 30-100/mes?
- Preguntar pain points específicos.
- Construir MVP solo después de validar.

Si la validación falla, **replantear** el producto antes de invertir tiempo de programación.