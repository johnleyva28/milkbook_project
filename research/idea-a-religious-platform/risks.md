# Idea A — Riesgos

## Riesgos identificados

### R1 — Riesgo político-institucional (IDEAA: ALTO)
- **Descripción:** LADP es una organización conservadora con gobierno democrático. Comprar/adoptar una plataforma requiere decisiones de la Junta Directiva y, para software que implique costos, posiblemente aprobación de la Asamblea Nacional.
- **Probabilidad:** Alta de fricción.
- **Impacto:** Catastrófico si el proyecto se politiza.
- **Mitigación:**
  - Empezar con un ministerio específico que tenga autonomía presupuestal.
  - Ofrecer un piloto gratuito de 6 meses con resultados medibles.
  - Construir bajo un modelo de "donación" o "subsidio pastoral" en lugar de venta comercial.

### R2 — Riesgo de competencia (IDEAA: ALTO)
- **Descripción:** Iglesia Fiel, Ekklesia, Adminfiel, Atrio y otros ya están en el mercado.
- **Probabilidad:** 100% (es un hecho).
- **Impacto:** Capturar mercado nuevo requiere diferenciación real.
- **Mitigación:**
  - Nicho ultra-específico (ministerio vertical, zona rural, etc.).
  - Alianza con un actor establecido para distribución.

### R3 — Riesgo del SATD existente (IDEAA: MEDIO-ALTO)
- **Descripción:** LADP ya tiene un sistema llamado SATD implementado en 2015. Cualquier nuevo sistema debe evitar duplicarlo.
- **Probabilidad:** Alta.
- **Impacto:** Si LADP no ve un valor claro, preferirá su SATD.
- **Mitigación:**
  - Posicionarse como **complemento** al SATD, no como reemplazo.
  - Apuntar a un dominio que SATD no cubre (comunicación con miembros, app móvil, eventos, ministerios específicos).
  - Verificar si SATD sigue activo y es mantenido.

### R4 — Riesgo de adopción digital del usuario final (IDEAA: MEDIO)
- **Descripción:** Muchos pastores y miembros son digitales-básicos. WhatsApp sí, app nueva quizás no.
- **Probabilidad:** Alta en zonas rurales andinas.
- **Impacto:** Implementación falla si la UX no es trivial.
- **Mitigación:**
  - UX con botones grandes, lenguaje claro, tutoriales integrados.
  - **WhatsApp como canal primario**, app como secundario.
  - Capacitación previa al despliegue (incluso videos de YouTube).

### R5 — Riesgo de financiamiento (IDEAA: MEDIO)
- **Descripción:** ¿Quién paga? LADP como organización religiosa sin fines de lucro, o cada iglesia local, o el ministerio específico, o un sponsor externo.
- **Probabilidad:** Alta de indefinición.
- **Impacto:** Sin modelo de ingresos claro, el producto muere.
- **Mitigación:**
  - Validar willingness-to-pay ANTES de construir.
  - Ofrecer free tier robusto para adopción inicial.
  - Modelo freemium + upgrade a pago por funciones avanzadas.

### R6 — Riesgo de privacidad y datos (IDEAA: MEDIO)
- **Descripción:** Datos de feligreses (DNI, fechas de nacimiento, dirección, estado civil). En Perú, la Ley N° 29733 (Protección de Datos Personales) aplica.
- **Probabilidad:** Media.
- **Impacto:** Multas y daño reputacional si hay brecha.
- **Mitigación:**
  - Cumplimiento explícito de Ley 29733 desde el día 1.
  - Encriptación en tránsito y en reposo.
  - Política clara de retención y eliminación de datos.
  - Auditorías periódicas.

### R7 — Riesgo de soberanía de datos (IDEAA: BAJO-MEDIO)
- **Descripción:** Si LADP usa cloud externo, ¿los datos quedan en Perú? ¿Quién los controla?
- **Probabilidad:** Media.
- **Impacto:** Sensibilidad política para una organización religiosa.
- **Mitigación:**
  - Opción de despliegue en datacenter peruano o VPS local.
  - Contratos claros de propiedad de datos.

### R8 — Riesgo de churn (IDEAA: ALTO)
- **Descripción:** Las iglesias son clientes cíclicos; un pastor se va y puede dejar de usar el sistema. Una región cambia de dinámica y abandona el producto.
- **Probabilidad:** Alta en SaaS宗教.
- **Impacto:** Churn alto = unit economics negativo.
- **Mitigación:**
  - Datos que trasciendan al pastor (histórico financiero, actas ministeriales, registros de la denominación).
  - Onboarding de múltiples usuarios por iglesia.
  - Hacer el sistema indispensable para la organización, no solo para un individuo.

### R9 — Riesgo de cambio denominacional (IDEAA: BAJO)
- **Descripción:** Si LADP decide construir su propio sistema internamente, ¿qué pasa con nosotros?
- **Probabilidad:** Media.
- **Impacto:** Catastrófico si LADP levanta barreras internas.
- **Mitigación:**
  - No ser un proyecto LADP-céntrico sino multi-denominacional.
  - Mantener datos y propiedad intelectual propios.

### R10 — Riesgo académico (proyecto integrador) (IDEAA: MEDIO)
- **Descripción:** El proyecto integrador requiere demostrar integración de tecnologías. ¿Es Idea A suficientemente amplia para integrar Node, Express, React, Vite, TS, Flutter, iOS, Swift, Android, Kotlin, Docker, PostgreSQL?
- **Probabilidad:** Sí es posible (ChMS multi-plataforma).
- **Impacto:** Bajo – es factible.
- **Mitigación:** Ninguna específica; el alcance MVP debe asegurar la integración.

## Matriz de riesgos

| Riesgo | Probabilidad | Impacto | Estrategia |
| --- | --- | --- | --- |
| R1 Político | Alta | Catastrófico | Mitigar |
| R2 Competencia | Alta (hecho) | Alto | Mitigar |
| R3 SATD | Alta | Alto | Mitigar |
| R4 Adopción | Alta | Alto | Mitigar |
| R5 Financiamiento | Alta | Alto | Mitigar |
| R6 Privacidad | Media | Alto | Mitigar |
| R7 Soberanía | Media | Medio | Aceptar/Mitigar |
| R8 Churn | Alta | Alto | Mitigar |
| R9 Cambio denominacional | Media | Catastrófico | Evitar (diversificar) |
| R10 Académico | Baja | Bajo | Aceptar |

## Conclusión

Idea A tiene **varios riesgos estructurales** que no se pueden ignorar:
- Mercado competitivo.
- Cliente institucional complejo.
- Riesgo político alto.
- Adopción rural incierta.

No es imposible, pero requiere una **estrategia muy afinada** (modelo F: vertical ministerial + multi-tenant desde día 1) y **validación previa con actores reales**.

Si la decisión se inclina por Idea A, **el primer paso no es programar – es hablar con un ministerio específico de LADP o de otra denominación**, validar el dolor, validar el willingness-to-pay, y entonces empezar a construir.