# 👥 Público objetivo — MilkBook

> **Quiénes son las personas específicas para las que existe MilkBook.** Define con precisión los segmentos primarios, secundarios y anti-personas, sus JTBD (Jobs To Be Done), sus frustraciones, sus aspiraciones y los criterios de inclusión/exclusión. Sin público objetivo claro, cualquier feature es "para todos" — y por lo tanto para nadie.

**Fecha de aprobación:** 2026-09-07
**Aplica a:** Decisiones de producto, priorización de features, criterios de aceptación, copy, diseño visual, partnerships, pricing, expansión geográfica.

---

## 🎯 Decisión adoptada

**MilkBook tiene DOS públicos primarios muy específicos** (no "todos los del agro" ni "cualquier lechero"). La precisión en el público objetivo es lo que permite diseñar con foco.

### 👤 Persona 1: Carlos — El Lechero (Comprador)
**Rol:** compra leche a 8-15 productores cada mañana, la vende a un quesero o planta mediana.

### 👤 Persona 2: Juan — El Productor (Vendedor)
**Rol:** ordeña 3-8 vacas, vende 5-60 litros diarios al lechero que pasa por su caserío.

Ambos son **igualmente importantes** pero con experiencias distintas:
- **Carlos** es el **usuario primario de la app móvil del lechero**.
- **Juan** es el **usuario primario de la app móvil del productor** y, en cierto sentido, el **usuario más vulnerable** (es quien más pierde cuando no hay registro).

---

## 👤 Persona 1: Carlos — El Lechero (Comprador)

### Identidad

| Atributo | Detalle |
|---|---|
| **Nombre** | Carlos |
| **Edad** | 38 años (estimado) |
| **Ubicación** | Distrito rural de Cajamarca (Celendín, Llacanora, Namora, etc.) |
| **Educación** | secundaria completa, estudios técnicos en agropecuaria (no siempre) |
| **Idioma** | español (algunas palabras en quechua) |
| **Estado civil** | casado/a, con familia, hijos en escuela local |

### Dispositivos y conectividad

- **Dispositivo principal:** Xiaomi Redmi, Samsung A0X, o similar gama media, **Android 11+**
- **Conectividad:** 4G en el pueblo, 3G en caseríos, **sin señal en zonas remotas**
- **Yape/Plin:** instalado, lo usa para recibir pagos de queseros grandes
- **Experiencia con apps:** WhatsApp fluido, Facebook regular, YouTube a veces
- **Alfabetización digital:** media — sabe usar smartphone, pero con paciencia limitada

### Contexto laboral (validado con el usuario real)

- **Cartera:** 20-50 clientes activos
- **Ruta diaria:** 8-15 clientes visitados por mañana (en moto)
- **Tiempo por visita:** 2-5 minutos
- **Vehículo:** moto lineal (símbolo de su trabajo)
- **Producción manejada:** 200-500 L/día comprados
- **Venta:** a quesero artesanal mediano, ocasionalmente a planta grande
- **Ingreso mensual:** S/ 2,500-5,000
- **Riesgos:** lluvia, mantenimiento de moto, calidad de leche, robo ocasional

### Herramientas actuales

- **Cuaderno físico** (su principal herramienta de gestión)
- **WhatsApp + Yape** (en Android)
- **Calculadora del celular** para sumar
- **Sin app de gestión** (todo manual)

### Frustraciones (lo que MilkBook resuelve)

- **Discrepancias con clientes** — a veces el cliente anota más litros que él. No hay forma de resolver objetivamente.
- **Errores aritméticos** — suma mal, descuenta mal, se pierde plata en cálculos mentales.
- **Olvido de adelantos** — a veces olvida anotar un adelanto que dio.
- **Encargos confusos** — anotar varios encargos pequeños y no saber el total.
- **Sacada de cuentas larga** — 15-20 horas por quincena es **demasiado tiempo**.
- **Sin historial** — si un cliente le reclama "el mes pasado me pagaste menos", no tiene cómo verificar.
- **Sin respaldo ante SUNAT** — si se formalizara, no tendría cómo justificar compras.

### Aspiraciones (lo que MilkBook habilita)

- **Reducir el tiempo de sacado de cuentas** drásticamente.
- **Eliminar las discusiones por discrepancias** con evidencia objetiva.
- **Ser visto como un comprador serio y profesional**.
- Crecer su cartera de clientes.
- **Tener boletas** que pueda mostrar a sus proveedores y al banco.
- **Acceder a crédito formal** con un historial verificable.

### Jobs to be Done (Carlos)

| ID | JTBD | Criticidad |
|---|---|---|
| **JTBD-L1** | "Cuando llego al establo del productor, quiero registrar los litros en menos de 30 segundos sin tipear más de lo necesario, para no retrasar mi ruta." | Crítico |
| **JTBD-L2** | "Cuando un cliente me pide un adelanto, quiero registrarlo con su confirmación inmediata, para que no haya reclamos después." | Crítico |
| **JTBD-L3** | "Cuando llega el cierre de quincena en casa del cliente, quiero ver TODO en una sola pantalla: litros por día, adelantos, encargos, precio aplicado, cálculo total. Quiero editar cualquier discrepancia con el cliente mirando, y cerrar el contrato en 5 minutos en lugar de 20-40." | Crítico |
| **JTBD-L4** | "Cuando un cliente me encarga algo de la ciudad, quiero registrar el encargo con su descripción y precio estimado, para incluirlo en la liquidación." | Alto |
| **JTBD-L5** | "Cuando hay una discrepancia entre lo que anoté y lo que el cliente dice, quiero resolverla al momento editando ambos valores, sin pelear, para mantener la relación." | Alto |
| **JTBD-L6** | "Cuando quiero ver cómo va mi negocio en el mes, quiero ver gráficos simples de litros comprados, ingresos, adelantos dados, para tomar decisiones." | Medio |
| **JTBD-L7** | "Cuando cambia el precio del litro, quiero actualizarlo para nuevos contratos (los contratos en curso mantienen el precio viejo)." | Medio |

### Frases típicas que diría Carlos

- *"Antes tenía un cuaderno, ahora tengo la app."*
- *"Ya no peleo con los clientes por los litros."*
- *"Ahora tengo boletas, puedo ir al banco tranquilo."*
- *"Saqué las cuentas en 10 minutos en vez de 30."*
- *"Si funciona en mi moto, funciona en cualquier lado."*

---

## 👤 Persona 2: Juan — El Productor (Vendedor)

### Identidad

| Atributo | Detalle |
|---|---|
| **Nombre** | Juan |
| **Edad** | 52 años (estimado) |
| **Ubicación** | caserío rural a 20-40 km de la capital distrital, altitud 2,500-3,500 msnm |
| **Educación** | primaria completa (a veces incompleta) |
| **Idioma** | español rural; algunas palabras en quechua según zona |
| **Estado civil** | casado/a con 4-5 hijos, a veces alguno emigró a Lima |

### Dispositivos y conectividad

- **Dispositivo principal:** Huawei Y6, Xiaomi Redmi 9A, o similar gama baja (**Android 11+**)
- **Conectividad:** 3G en caserío, **a veces sin señal** en zonas remotas
- **Yape/Plin:** instalado si tiene cuenta bancaria, pero no siempre
- **Experiencia con apps:** WhatsApp fluido, Facebook regular, YouTube a veces
- **Alfabetización digital:** baja a media — sabe usar WhatsApp y ver videos
- **90% tiene smartphone propio** (validado)

### Habilidades

- **Sí sabe leer y escribir** (la mayoría)
- Si no sabe, **tiene familiar que le apoya** (hijo, sobrino, vecino)
- Maneja cantidades (litros, soles) con fluidez
- Calcula mentalmente o con calculadora del celular

### Contexto laboral

- **Vacas:** 1 a 15 (rango amplio, mayoría entre 3-8)
- **Litros diarios:** 2-60 (depende del tamaño del hato y temporada)
- **Venta:** a Carlos (lechero) que pasa cada mañana. Si Carlos no viene, hace quesillo.
- **Otros ingresos:** agricultura de subsistencia (papa, habas), ventas eventuales en mercado local
- **Ingreso mensual:** S/ 800-1,500 (depende de litros y precio)

### Comportamiento con el lechero

- **Sí pide adelantos** en efectivo cuando necesita
- **Sí encarga cosas** de la ciudad (monto S/ 20-300)
- **Sí recibe pago mixto**: 50% efectivo, 50% Yape/transferencia
- **Sí discute el tema de la leche** con el lechero, pero el **precio no se discute** (es tema de temporada que afecta a todos)

### Herramientas actuales

- **Libreta de mano** (cuaderno escolar, libreta de la abuela) para anotar litros diarios
- **Memoria** para recordar adelantos y encargos
- **WhatsApp** para hablar con Carlos y familia en Lima
- **Yape/Plin** si tiene cuenta bancaria
- **No usa apps especializadas** en absoluto
- **No tiene boleta ni comprobante** actualmente

### Frustraciones

- **No tiene control sobre el precio**: Carlos decide cuánto le paga. Juan acepta o busca otro lechero.
- **No tiene respaldo de lo que vendió**: si Carlos anota "19 L" y Juan vendió "20 L", Juan pierde sin prueba.
- **Adelantos confusos**: a veces pide S/ 300, Carlos anota S/ 200 o S/ 400, hay confusión.
- **Encargos incumplidos o confusos**: a veces encarga algo y Carlos no lo trae o trae algo distinto.
- **Cálculos del cierre**: cuando Carlos llega a "sacar cuentas", no tiene cómo verificar los cálculos fácilmente.
- **No tiene boleta**: si quisiera formalizarse, no tiene cómo demostrar ingresos.

### Aspiraciones

- **Recibir el pago justo** por su leche
- **No perder plata** por errores del lechero
- **Tener respaldo** de lo que vendió cada día
- **Que sus encargos lleguen** y al precio justo
- **Tener una boleta** que respalde sus ventas
- **Algún día formalizarse** (tener RUC) si ve que es rentable

### Comportamiento típico

- **Confianza**: depende mucho de su relación con Carlos. Si la relación es buena, acepta lo que dice.
- **Memoria**: lleva la cuenta en su cabeza + cuaderno.
- **Resistencia a la app**: si la app le complica, no la usa. Pero **si ve valor inmediato, la adopta**.
- **Practicidad**: prefiere hacer las cosas rápido. Si la app tiene 3 pantallas, se frustra.
- **Apoyo familiar**: si no entiende, le pide ayuda a su hijo o sobrino.

### Jobs to be Done (Juan)

| ID | JTBD | Criticidad |
|---|---|---|
| **JTBD-C1** | "Cuando entrego la leche a Carlos, quiero ver la confirmación de los litros que él registró, para tener un respaldo." | Crítico |
| **JTBD-C2** | "Cuando Carlos me paga la liquidación en mi casa, quiero ver el detalle completo (litros, adelantos, encargos, precio, total) en una sola pantalla, firmar con mi PIN o huella, y tener un comprobante." | Crítico |
| **JTBD-C3** | "Cuando Carlos me da un adelanto, quiero ver el registro inmediatamente en mi celular, para no olvidar cuánto me dieron." | Crítico |
| **JTBD-C4** | "Cuando pido un adelanto, quiero saber cuánto me queda disponible, para no pedir de más." | Alto |
| **JTBD-C5** | "Cuando Carlos me entrega un encargo, quiero ver qué es, cuánto costó, y confirmar la recepción." | Alto |
| **JTBD-C6** | "Cuando hay cambio de precio, quiero enterarme inmediatamente por push, para entender por qué recibo más o menos." | Medio |
| **JTBD-C7** | "Cuando Carlos no vino a recoger, quiero marcar ese día como 'no vendí' en un solo toque, para que no me descuente." | Medio |

### Frases típicas que diría Juan

- *"Carlos me dijo que me dio 300 pero yo creo que fueron 200."*
- *"A veces Carlos anota menos de lo que entrego."*
- *"Si tengo la app, puedo ver lo que pasa."*
- *"Solo necesito saber cuánto me pagan y cuánto me deben."*
- *"Con la huella confirmo rápido."*

### Casos especiales

**Productora (mujer) jefa de hogar:** muchas mujeres productoras son jefas de hogar en zonas rurales. Pueden tener menor alfabetización digital. La UX debe ser igual de accesible (incluso más, con iconos grandes y confirmaciones explícitas).

**Productor joven (25-35) con smartphone:** segmento que adopta más rápido. Maneja mejor la app. Influenciador para los demás.

**Productor mayor (60+) sin smartphone:** no usa la app directamente. Depende del lechero para registrar sus ventas. Alternativas: confirmación por SMS, familiar con smartphone que confirma en su nombre, o firma en pantalla del lechero.

**Productor familia del lechero:** si Juan es tío de Carlos, la confianza es mayor. Pero los adelantos y encargos se mezclan con favores familiares. El sistema debe funcionar igual (es objetivo).

---

## 🚫 Anti-personas (no es nuestro target)

MilkBook **NO está diseñado** para:

| Anti-persona | Por qué NO |
|---|---|
| **Roberto — lechero con pickup y 80 productores** | Tiene su propio sistema, ya está digitalizado. |
| **Gloria / Nestlé (planta industrial)** | Tiene ERP propio. No es nuestro cliente objetivo. |
| **Quesero gigante** | Tiene varios lecheros empleados, sistema propio. |
| **Caficultores, paperos, ganadero de carne** | No son productores de leche. Otro dominio. |
| **Productores de Lima o ciudad** | MilkBook es rural, offline-first. En ciudad hay otras apps. |
| **Cooperativas industriales** | Tienen su propio sistema de gestión. |
| **Distribuidores de insumos** | No son productores ni compradores de leche. |
| **Inversionistas** | Audience secundaria (B2B), no target principal del producto. |

---

## 📊 Cuantificación del público objetivo

| Segmento | Universo | Tamaño MilkBook (Y1) | % penetración Y1 |
|---|---|---|---|
| **Lecheros de Cajamarca** (20-50 clientes) | ~3,000 | 200 | 7% |
| **Productores de Cajamarca** (3-15 vacas) | ~30,000 | 1,500 | 5% |
| **Lecheros andinos (Perú)** | ~15,000 | — (futuro Y2) | — |
| **Productores andinos (Perú)** | ~150,000 | — (futuro Y2) | — |
| **Lecheros andinos (Perú+Bolivia+Ecuador+Colombia)** | ~50,000 | — (futuro Y3-5) | — |

---

## 🌐 Públicos secundarios (B2B)

MilkBook también habla con audiencias secundarias que **no son usuarias finales** pero son importantes para el modelo de negocio:

### 🏦 Bancos rurales y aseguradoras

- **Quiénes:** Banco Agro, Caja Rural, aseguradoras con pólizas rurales
- **Qué buscan:** datos verificables de productores para originar microcréditos
- **Cómo los hablamos:** tono Aliado Profesional, con datos de tracción

### 🏛️ Cooperativas agrarias

- **Quiénes:** Cooperativa Agraria de Cajamarca, asociaciones de productores
- **Qué buscan:** visibilidad real de su membresía, herramientas de fidelización
- **Cómo los hablamos:** tono Aliado Profesional, con foco en datos compartidos

### 🏭 Queseros medianos y plantas procesadoras

- **Quiénes:** queseros artesanales medianos, plantas procesadoras pequeñas
- **Qué buscan:** trazabilidad de la leche que compran, datos de calidad
- **Cómo los hablamos:** tono Aliado Profesional, con foco en datos técnicos

### 💼 Inversionistas

- **Quiénes:** VCs, family offices, fondos de impacto, BID, CAF
- **Qué buscan:** tracción, equipo, mercado, retorno
- **Cómo los hablamos:** tono Aliado Profesional, con números y proyección

---

## 🎯 Criterios de inclusión / exclusión para features

Cada feature nueva debe pasar este filtro:

| Criterio | Pregunta |
|---|---|
| **¿Sirve a Carlos?** | ¿Resuelve al menos un JTBD-L# documentado? |
| **¿Sirve a Juan?** | ¿Resuelve al menos un JTBD-C# documentado? |
| **¿Sirve offline?** | ¿Funciona sin internet en el caserío de Juan? |
| **¿Funciona al sol?** | ¿Se ve bien bajo sol directo en el Xiaomi de Carlos? |
| **¿Cumple restricciones de alfabetización?** | ¿Es entendible para Juan (52, primaria)? |
| **¿Cabe en el horizonte?** | ¿Aporta a la visión 2030 documentada? |

Si una feature **NO pasa al menos 5 de 6 criterios**, no entra al MVP.

---

## 🧪 Cómo se valida el público objetivo

### Test 1: ¿Las dos personas son distintas?

Si no se puede distinguir entre Carlos y Juan con claridad, el público objetivo está mal definido. Cada feature debe tener un dueño claro.

### Test 2: ¿Las frustraciones son medibles?

Las frustraciones listadas deben poder traducirse en métricas:
- "Olvida adelantos" → % de adelantos no registrados en MilkBook
- "Saqué las cuentas en 30 min" → tiempo medio de sacado de cuentas en MilkBook

### Test 3: ¿Los JTBD son testeables?

Cada JTBD debe poder convertirse en una tarea testeable con Carlos o Juan reales.

### Test 4: ¿Las anti-personas están bien definidas?

Si MilkBook intenta servir a todos, termina sin foco. Las anti-personas son tan importantes como las personas.

---

## 📋 Resumen: el público objetivo

```
PRIMARIO (producto):

  👤 Carlos, 38, lechero de Cajamarca
     - 20-50 clientes · moto · cuaderno
     - App móvil del lechero
     - 7 JTBDs documentados
     - Frustraciones: discrepancias, errores, olvidos, sin historial

  👤 Juan, 52, productor de Cajamarca
     - 3-15 vacas · 5-60 L/día
     - App móvil del productor
     - 7 JTBDs documentados
     - Frustraciones: pierde plata, sin respaldo, sin boleta

SECUNDARIO (negocio):

  🏦 Bancos rurales · 🏛️ Cooperativas · 🏭 Queseros/Plantas · 💼 Inversionistas

NO TARGET (anti-personas):

  ❌ Roberto (lechero grande) · ❌ Gloria/Nestlé (plantas) · ❌ No-lecheros
```

---

## ✅ Checklist de implementación

- [x] Definir las 2 personas primarias con detalle
- [x] Documentar JTBDs de Carlos (7) y Juan (7)
- [x] Documentar frustraciones y aspiraciones
- [x] Definir 8 anti-personas
- [x] Cuantificar el universo del público objetivo
- [ ] Validar las personas con Carlos y Juan reales (entrevistas de campo)
- [ ] Actualizar el público objetivo cada 6 meses con nuevos learnings
- [ ] Crear posters de las personas para el wall del equipo
- [ ] Documentar el público secundario B2B en este README

---

## 🔗 Referencias

### Marcos de personas
- **Alan Cooper — The Inmates Are Running the Asylum:** https://www.cooper.com — origen del concepto de "persona".
- **Kim Goodwin — Designing for the Digital Age:** https://www.wiley.com — guía práctica de personas.
- **NN/g — Personas:** https://www.nngroup.com/articles/persona/ — investigación sobre personas en UX.
- **Tony Ulwick — Jobs to be Done:** https://jobs-to-be-done.com — marco teórico de JTBD.

### Contextos rurales y de baja alfabetización
- **Srivastava et al. — SARAL Framework (CSCW 2021):** https://www.shivanikapania.com/assets/cscw2021paper.pdf — marco para diseñar apps para usuarios de baja alfabetización.
- **Medhi et al. — INTERACT 2013:** https://cutrell.org/papers/Medhi-INTERACT2013-ListVsHierachyOnMobiles.pdf — lista vs jerarquía para usuarios no-alfabetizados.
- **GSMA — AgriTech UX Design Guidebook:** https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/agritech-ux-design-guidebook/ — UX para agricultural ICT.
- **Acumen — Lean Data:** https://acumen.org/lean-data/ — investigación con usuarios de baja renta.

### Validación en campo
- **IDEO — Human-Centered Design Toolkit:** https://www.designkit.org — toolkit para diseñar con comunidades.
- **NCBI — Rural mHealth Research:** investigación en salud móvil rural.

### Proyecto
- Propósito: [`../identidad_verbal/03-proposito/`](../identidad_verbal/03-proposito/)
- Misión: [`../identidad_verbal/04-mision/`](../identidad_verbal/04-mision/)
- Visión: [`../identidad_verbal/05-vision/`](../identidad_verbal/05-vision/)
- Propuesta de valor: [`../identidad_estrategica/02-propuesta-de-valor/`](../identidad_estrategica/02-propuesta-de-valor/)
- Arquetipo: [`../identidad_estrategica/05-arquetipo-de-marca/`](../identidad_estrategica/05-arquetipo-de-marca/)
- Personas en contexto proyecto: [`../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/`](../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/)
