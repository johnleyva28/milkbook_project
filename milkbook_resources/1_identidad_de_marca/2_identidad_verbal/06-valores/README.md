# 🧭 Valores — MilkBook

> **Los principios que guían cada decisión de MilkBook.** Los valores no son frases bonitas en un poster: son reglas operativas que usamos para decidir entre opciones difíciles. Definen cómo nos comportamos cuando nadie nos ve, cómo tratamos a Carlos y Juan, cómo construimos producto, cómo trabajamos en equipo.

**Fecha de aprobación:** 2026-09-07
**Aplica a:** Contrataciones, decisiones de producto, resolución de conflictos internos, comunicación con aliados, posts en redes, código de conducta del equipo.

---

## 🎯 Los 6 valores de MilkBook

| # | Valor | Frase corta | Regla operativa |
|---|---|---|---|
| 1 | **Respeto por el usuario** | "El usuario es el jefe." | Si Carlos o Juan no entienden algo, fallamos nosotros, no ellos. |
| 2 | **Pragmatismo andino** | "Funciona en el campo o no funciona." | Si no funciona en el Xiaomi de Carlos bajo sol, no se lanza. |
| 3 | **Honestidad operativa** | "Prometemos lo que cumplimos." | Mejor prometer poco y entregar mucho, que prometer mucho y entregar poco. |
| 4 | **Disciplina del detalle** | "El detalle es la marca." | Cada pixel, cada coma, cada palabra importa. |
| 5 | **Humildad rural** | "Venimos a aprender, no a enseñar." | Escuchamos antes de proponer. Construimos con, no para. |
| 6 | **Pensamiento a 5 años** | "Construimos infraestructura, no features." | Cada decisión se evalúa en horizonte de 5 años, no de 5 sprints. |

---

## 🌱 Valor 1: Respeto por el usuario

### Frase
> "El usuario es el jefe. Si no entiende algo, fallamos nosotros, no ellos."

### Qué significa
- Carlos (38 años, secundaria completa) y Juan (52 años, primaria completa) son nuestros jefes reales, no el CEO, no el inversionista.
- Si una pantalla necesita un tutorial de 3 minutos para entenderse, fallamos.
- Si Juan tiene que pedirle ayuda a su hijo para usar la app, fallamos.
- Si Carlos abandona la app porque "le complica la vida", fallamos.

### Cómo se manifiesta

**En producto:**
- Botones grandes (60dp mínimo), texto legible (16sp+), copy en español cotidiano.
- Una sola acción principal por pantalla.
- Confirmaciones explícitas antes de acciones destructivas.
- Soporte humano disponible (no chatbots que frustran).

**En investigación:**
- Visitamos campo al menos 1 vez al mes para validar con Carlos y Juan.
- Los tests de usabilidad se hacen con usuarios reales, no con el equipo.
- Cuando hay feedback negativo, se documenta y se prioriza.

**En soporte:**
- Tiempo de respuesta mediano <4 horas.
- Si Carlos tiene un bug, lo atendemos como si fuera nuestro único usuario.
- Los bugs reportados por usuarios van al backlog con alta prioridad.

### Anti-patrón (lo que NO hacemos)
- ❌ Decir "los usuarios no entienden porque son de baja alfabetización".
- ❌ Llamar a nuestros usuarios "los users" o "los target".
- ❌ Asumir que el usuario se adaptará a una UX complicada.
- ❌ Lanzar features que el equipo entiende pero el usuario no.

---

## 🏔️ Valor 2: Pragmatismo andino

### Frase
> "Funciona en el campo o no funciona."

### Qué significa
- Un feature que funciona en el iPhone del programador pero no en el Xiaomi de Carlos NO funciona.
- Un feature que requiere WiFi estable NO funciona (Cajamarca pierde señal en caseríos).
- Un feature que requiere letra chica NO funciona (Juan tiene 52 años).
- Un feature que requiere que el usuario piense NO funciona.

### Cómo se manifiesta

**En desarrollo:**
- Probamos en dispositivos gama baja (Xiaomi Redmi 9A, Samsung A03).
- Probamos con red 3G, no solo WiFi.
- Probamos bajo sol directo (literalmente salimos al mediodía a probar).
- Probamos con el celular con poca batería (batería baja = GPU baja = lag).
- Probamos con guantes (Carlos usa guantes al cargar moto).

**En diseño:**
- Validamos tipografía y contraste con simulador de daltonismo.
- Probamos tamaños mínimos (16sp texto, 56dp botones).
- Priorizamos la legibilidad sobre la estética fancy.

**En operaciones:**
- La app funciona offline. La sincronización es eventual, no requisito previo.
- El servidor tiene SLA 99.5% (no 99.9% — Carlos no necesita perfección, necesita disponibilidad).
- Los deploys se hacen sin downtime.

### Anti-patrón
- ❌ "Funciona en mi máquina" — el estándar es el Xiaomi de Carlos, no el MacBook del dev.
- ❌ "Es que la red 3G ya casi no existe" — Carlos tiene 3G en el caserío, eso es lo que importa.
- ❌ "Es que solo el 5% de los usuarios no tiene biometría" — Juan es ese 5%, no podemos dejarlo fuera.

---

## 📏 Valor 3: Honestidad operativa

### Frase
> "Prometemos lo que cumplimos. Mejor poco y bien, que mucho y mal."

### Qué significa
- No inflamos las features en marketing.
- No prometemos fechas que no podemos cumplir.
- No escondemos problemas cuando los hay.
- Si un bug afecta a Carlos, lo decimos abiertamente.
- Si un aliado (cooperativa, banco) nos pide algo que no podemos, lo decimos.

### Cómo se manifiesta

**En marketing y comunicación:**
- Decimos "registra litros y cierra contratos" (no "transformamos el agro").
- Decimos "200 lecheros en Cajamarca" (no "miles de usuarios en LATAM").
- Las screenshots del app store muestran la app real, no mockups idealizados.
- Los testimonios son reales, con nombre y foto del productor (con permiso).

**En producto:**
- El roadmap público refleja la realidad, no lo que quisiéramos.
- Si una feature se atrasa, lo decimos.
- Si una feature no cumple las expectativas, lo decimos y corregimos.

**En equipo:**
- Cultura de feedback honesto (no se premia decir "todo está bien" cuando no lo está).
- Los OKRs no se inflan para "cumplirlos".
- Cuando un miembro del equipo falla, se aborda directamente.

### Anti-patrón
- ❌ Anunciar features que no existen.
- ❌ Vender humo en pitches de inversión.
- ❌ Esconder bugs críticos a usuarios o aliados.
- ❌ Inflar métricas (descargas, usuarios activos) para inflar KPIs.
- ❌ Decir "MVP está listo" cuando MVP está al 60%.

---

## 🔍 Valor 4: Disciplina del detalle

### Frase
> "El detalle es la marca. Cada pixel, cada coma, cada palabra importa."

### Qué significa
- El logo tiene el cuerno de la vaca con 1.5px de stroke, no "cualquier grosor".
- El email de confirmación dice "Tu leche, registrada" — cada palabra curada.
- El botón de "Confirmar" tiene 60dp de alto, no 56dp ni 64dp.
- La sombra de la card tiene tinte verde `rgba(42, 120, 42, 0.06)`, no negro genérico.
- El CSV de exportación usa comillas dobles estándar, no caracteres fancy.

### Cómo se manifiesta

**En diseño:**
- Manual de marca documentado y aplicado consistentemente.
- Revisión de diseño antes de cada release (no "se ve bien, dale").
- Componentes del sistema reutilizados, no reinventados.

**En código:**
- Code reviews con atención al detalle (no "funciona, merge").
- Documentación de funciones complejas.
- Tests unitarios en lógica crítica (cálculos de liquidación, sincronización).

**En comunicación:**
- Cada copy se revisa (no "ya está bien, publiquemos").
- Los emails tienen subject lines curados (no "Notificación" genérico).
- Los commits tienen mensajes claros (no "fix stuff").

### Anti-patrón
- ❌ "Es un detalle, no importa" — sí importa.
- ❌ "Nadie va a notar la coma" — sí la notan.
- ❌ "El tono verde es muy oscuro" — sí, lo afinamos hasta el hex exacto.
- ❌ Lanzar con copy improvisado, revisar después.

---

## 🌾 Valor 5: Humildad rural

### Frase
> "Venimos a aprender, no a enseñar. Construimos con, no para."

### Qué significa
- Carlos y Juan saben más de leche que nosotros. Reconocemos eso siempre.
- No somos los "salvadores del agro". Somos los que facilitan el registro.
- Cuando visitamos campo, vamos a escuchar, no a presentar slides.
- Cuando un productor sugiere algo, lo tomamos en serio aunque suene raro.

### Cómo se manifiesta

**En investigación:**
- Las sesiones con usuarios son escuchas activas, no demos.
- Las preguntas son abiertas antes que cerradas.
- El feedback negativo se agradece, no se defiene.

**En comunicación:**
- Nunca decimos "le enseñamos a Carlos cómo usar la app".
- Decimos "Carlos nos enseñó cómo debe ser la app".
- Los case studies siempre empiezan con la historia del usuario, no con la feature.

**En producto:**
- Las features se prueban con usuarios reales antes de declararse "ganadoras".
- Si un usuario no usa una feature, no insistimos: la removemos.
- El copy se inspira en las palabras reales del usuario ("tu leche" no "tu producción láctea").

**En equipo:**
- Las contrataciones de personas con experiencia rural/agricola son prioritarias.
- Las decisiones de producto pasan por "esto le sirve a Carlos?" antes que "esto es elegante?".

### Anti-patrón
- ❌ Discurso de "salvadores": "vamos a llevar tecnología al campo".
- ❌ Ignorar el feedback del usuario porque "él no entiende de tecnología".
- ❌ Hablar del productor con condescendencia ("los campesinos", "los usuarios rurales").
- ❌ Asumir que sabemos qué necesita Juan sin preguntarle.

---

## 🏛️ Valor 6: Pensamiento a 5 años

### Frase
> "Construimos infraestructura, no features. Cada decisión se evalúa en horizonte de 5 años."

### Qué significa
- No perseguimos tendencias. Si una feature no aporta a la visión de 2030, se difiere.
- Preferimos hacer bien una cosa a hacer 10 cosas mediocres.
- La deuda técnica se aborda con disciplina (no "lo arreglamos en el próximo sprint" cuando no se hace).
- Las integraciones con aliados se piensan como partnerships de largo plazo.

### Cómo se manifiesta

**En producto:**
- El roadmap se piensa en fases de 1-2 años, no sprints sueltos.
- Las decisiones arquitectónicas (DB schema, API design) se hacen pensando en escala (5,000 lecheros, 50,000 productores).
- Las features de moda (AI generativa, blockchain) se evalúan fríamente: ¿realmente aporta al propósito?

**En equipo:**
- Las contrataciones son por mindset a largo plazo, no solo por skill immediate.
- La cultura del equipo se construye con paciencia (no "remotamos en 1 mes").
- Los procesos se documentan y evolucionan, no se improvisan.

**En alianzas:**
- Las conversaciones con bancos, cooperativas, aseguradoras son de meses, no semanas.
- Los contratos se firman pensando en 5 años de relación.
- La confianza se construye con consistencia, no con descuentos.

### Anti-patrón
- ❌ Perseguir el hype ("tenemos que meter AI generativa").
- ❌ Sacrificar calidad por velocidad cuando la velocidad no es crítica.
- ❌ Decisiones arquitectónicas "para salir del paso" que comprometen el futuro.
- ❌ Acordar partnerships baratos que comprometan la visión de largo plazo.

---

## 📐 Cómo se aplican los valores en decisiones difíciles

### Escenario 1: Una feature pide 6 semanas de desarrollo pero el lechero solo la usará 1 vez al año

- **Respeto por el usuario:** ¿De verdad la necesita 1 vez al año? Si sí, vale.
- **Pragmatismo andino:** ¿Cómo se ve esa feature 1 vez al año en el celular de Carlos sin soporte?
- **Honestidad operativa:** Si no la podemos hacer bien, mejor decir que no.
- **Disciplina del detalle:** Si la hacemos, hacerla bien, no a medias.
- **Humildad rural:** ¿Carlos la pidió o la asumimos nosotros?
- **Pensamiento a 5 años:** ¿Es infraestructura o feature de moda?

**Decisión:** evaluarla con Carlos. Si él dice "sí, lo necesito", hacerla bien. Si no, no.

### Escenario 2: Un aliado (banco) nos pide una integración custom que requiere 3 meses

- **Respeto por el usuario:** ¿Beneficia directamente al productor?
- **Pragmatismo andino:** ¿El banco puede esperar 6 meses?
- **Honestidad operativa:** ¿Podemos comprometer ese plazo?
- **Disciplina del detalle:** ¿Está bien especificada la integración?
- **Humildad rural:** ¿El banco nos escucha cuando decimos "esto no escala"?
- **Pensamiento a 5 años:** ¿Es un partnership de largo plazo o un proyecto de 3 meses?

**Decisión:** si es partnership de largo plazo y los 3 meses son sostenibles, hacerlo. Si no, proponer alternativa.

### Escenario 3: El equipo detecta un bug crítico 2 días antes de un release grande

- **Respeto por el usuario:** Si afecta a Carlos, es P0, no P2.
- **Pragmatismo andino:** ¿Carlos lo va a ver? Si sí, no se lanza.
- **Honestidad operativa:** Mejor retrasar el release que lanzar con bug.
- **Disciplina del detalle:** ¿Está bien diagnosticado? ¿El fix es robusto?
- **Humildad rural:** Carlos reportó el bug, no lo inventamos.
- **Pensamiento a 5 años:** El bug va a escalar si no se resuelve bien ahora.

**Decisión:** retrasar el release. Sin excepciones.

---

## 📋 Los valores en el día a día

### En la rutina de hiring

Antes de contratar, preguntamos al candidato:
- "¿Cuál es tu opinión sobre construir producto para personas con baja alfabetización digital?"
- "¿Cómo manejas la presión de lanzar rápido vs hacer bien las cosas?"
- "Cuéntame de un proyecto donde tuviste que equilibrar pragmatismo y calidad."

Si el candidato no resuena con los valores, no encaja — por más skill técnico que tenga.

### En la rutina de planning

Cada OKR trimestral debe:
- Referenciar explícitamente al menos 2 valores en su definición.
- Tener un criterio de éxito medible.
- Pasar el test "¿esto evita que un productor pierda plata?" (alineado con el propósito).

### En la rutina de retro

Cada 2 semanas, el equipo revisa:
- ¿Qué hicimos bien esta sprint? (celebrar lo que funcionó)
- ¿Qué hicimos mal? (identificar fallas sin culpabilizar)
- ¿Qué valores aplicamos? ¿Cuáles descuidamos?

### En la rutina de crisis

Cuando algo sale mal (bug crítico, churn de un lechero, conflicto interno):
- Se aborda directamente, no se evita.
- Se nombra la responsabilidad sin buscar culpables.
- Se aprende: ¿qué valor aplicamos mal? ¿Cómo lo hacemos mejor?

---

## ❌ Anti-valores explícitos

Para evitar ambigüedad, listamos lo que **NO somos**:

| Anti-valor | Por qué NO |
|---|---|
| **Movimiento rápido y romper cosas** | Rompemos cosas en campo y afectan a Carlos. No. |
| **Escala sobre calidad** | Preferimos 200 lecheros felices que 2,000 frustrados. |
| **First mover advantage** | No nos importa ser los primeros, sino ser los mejores para Carlos. |
| **Tech bro culture** | No somos una startup de SV. Somos un equipo que respeta el contexto rural. |
| **Disruption** | No queremos "disrumpir" la leche andina. Queremos poner orden en lo que ya existe. |
| **Growth at all costs** | Si para crecer hay que descuidar la calidad, no crecemos. |
| **Founder worship** | Las decisiones se toman por el equipo, no por carisma del fundador. |

---

## 🧪 Cómo se validan los valores

### Test de los valores en la contratación

Cada candidato a entrar al equipo es evaluado por los 6 valores, no solo por skill técnico. Si alguien es brillante técnicamente pero no resuena con "humildad rural" o "respeto por el usuario", no encaja.

### Test de los valores en el producto

Cada feature nueva se evalúa con la pregunta "¿qué valores aplica?". Si no se puede responder, es una señal de que la feature no está bien fundamentada.

### Test de los valores en crisis

Cuando hay un problema (bug, churn, conflicto), se hace un "values retro": ¿qué valor aplicamos mal? Si no se puede identificar, se profundiza más.

---

## 📢 Cómo se comunican los valores

### Internamente

- En el README del repo principal (este archivo).
- En el onboarding de nuevos empleados (primera semana).
- En el Slack del equipo (canal #valores).
- En las retros trimestrales.

### Externamente

- En la página "About" del web admin (versión resumida).
- En posts de LinkedIn cuando se cuenta la cultura del equipo.
- En pitches a candidatos ("esto es lo que valoramos").
- En entrevistas a medios (cuando se pregunta por la cultura).

---

## ✅ Checklist de implementación

- [ ] Publicar los 6 valores en el README del repo
- [ ] Publicar los 6 valores en el onboarding de nuevos empleados
- [ ] Publicar los 6 valores en la página "About" del web admin
- [ ] Crear canal de Slack #valores para recordatorios y discusiones
- [ ] Crear "values retro" como ritual cada 2 semanas
- [ ] Incluir los valores en las entrevistas de hiring
- [ ] Incluir los valores en los criterios de evaluación de performance
- [ ] Validar con Carlos y Juan que los valores resuenan con su experiencia
- [ ] Revisar los valores cada 12 meses

---

## 🔗 Referencias

### Marcos de valores corporativos
- **Netflix Culture Deck:** https://www.slideshare.net/reed2001/culture-1798664 — ejemplo famoso de valores operativos.
- **Patagonia — Core Values:** https://www.patagonia.com/our-responsibility/ — valores ambientales integrados al negocio.
- **Tony's Chocolonely — Core Values:** valores explícitos de mission-driven.
- **Buffer's Culture:** https://buffer.com/resources/values — transparencia radical como valor.
- **GitLab Values:** https://about.gitlab.com/handbook/values/ — values + handbook integration.

### Cultura de equipo para tech rural / agro
- **80,000 Hours — Career Guide:** https://80000hours.org — criterios para elegir proyectos de impacto.
- **Acumen — Lean Data:** https://acumen.org/lean-data/ — investigación con usuarios de baja renta, con humildad.
- **IDEO — Human-Centered Design:** https://www.ideou.com/pages/design-thinking — kit de herramientas para diseñar con (no para) comunidades.

### Proyecto
- Propósito: [`../03-proposito/`](../03-proposito/)
- Misión: [`../04-mision/`](../04-mision/)
- Visión: [`../05-vision/`](../05-vision/)
- Personalidad: [`../07-personalidad-de-marca/`](../07-personalidad-de-marca/)
- Identidad verbal: [`../`](../)
