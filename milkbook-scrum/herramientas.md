# Catálogo de herramientas de planificación

> **No hay recomendación activa en este archivo.** Es solo un catálogo comparativo para que el equipo decida en el futuro.
>
> La herramienta actual del equipo es **`tablero-kanban.md`** (Markdown plano). Cuando el equipo sienta que necesita más, se vuelve aquí y elige.

---

## Tabla resumen (vista rápida)

| # | Herramienta | Tipo | Free | Pago | Open source | Scrum | Kanban | GitHub | Última actividad |
| - | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **GitHub Projects** | SaaS | ✅ (incluido) | $4/u/mes Team | ❌ | parcial | ✅ | ✅ nativa | continuo |
| 2 | **Linear** | SaaS | 250 issues | $10/u/mes Basic | ❌ | ✅ cycles | ✅ | ✅ bidireccional | continuo |
| 3 | **Shortcut** | SaaS | hasta 10 users | $8.50/u/mes Team | ❌ | ✅ | ✅ | ✅ nativa | continuo |
| 4 | **Plane** | OSS + cloud | ✅ self-host | $6/u/mes Pro | ✅ AGPL-3.0 | ✅ | ✅ | ✅ nativa | 2026-08-23 (v1.4.2) |
| 5 | **Jira** | SaaS | hasta 10 users | ~$7.16/u/mes Std | ❌ (cliente sí) | ✅ | ✅ | vía app | 2026-09-03 |
| 6 | **Trello** | SaaS | 10 cols / 10 boards | $5/u/mes Std | ❌ | ❌ | ✅ básico | vía power-up | continuo |
| 7 | **OpenProject** | OSS self-host | ✅ ilimitado | enterprise opcional | ✅ GPL-3.0 | ✅ | ✅ | vía plugin | 2026-09-02 (v17.8.0) |
| 8 | **Taiga** | OSS self-host | ✅ ilimitado | cloud opcional | ✅ MPL-2.0 / AGPL-3.0 | ✅ | ✅ | vía contrib | 2026-09-21 (back) |
| 9 | **Leantime** | OSS self-host | ✅ ilimitado | cloud opcional | ✅ AGPL-3.0 | ✅ | ✅ | ✅ nativa | 2026-07-08 (v3.9.8) |
| 10 | **Focalboard** | OSS self-host | ✅ ilimitado | — (Mattermost) | ✅ AGPL-3.0 | parcial | ✅ | parcial | 2026-05-18 (commits) |
| 11 | **Wekan** | OSS self-host | ✅ ilimitado | — | ✅ AGPL-3.0 | ❌ | ✅ | ❌ | 2026-09-20 (v11.90) |
| 12 | **Notion** | SaaS | limitado | $10/u/mes Plus | ❌ | ❌ | parcial | solo Business | continuo |

---

## Fichas detalladas

### 1. GitHub Projects

- **Web**: https://github.com/features/issues
- **Tipo**: SaaS (parte de GitHub)
- **Pricing**: incluido en GitHub Free; **$4/u/mes** en Team
- **Open source**: no
- **Scrum**: parcial (iterations, sin burndown nativo)
- **Kanban**: ✅ nativo (vista Board con columnas configurables)
- **GitHub**: ✅ integración nativa (PRs se vinculan con `#NN`, cierre automático)
- **Pros**:
  - Cero costo si ya estamos en GitHub Free.
  - Onboarding cero (todo el equipo ya conoce GitHub).
  - Vinculación PR ↔ issue automática.
- **Contras**:
  - Sin burndown, sin velocity charts, sin capacity planning.
  - Reportes limitados.
  - Sin automatización avanzada.
- **Ideal para 4 devs**: ✅ sí — mínimo viable, perfecto para empezar.

### 2. Linear

- **Web**: https://linear.app
- **Tipo**: SaaS
- **Pricing**: free hasta **250 issues**, 2 teams, usuarios ilimitados; **$10/u/mes** Basic
- **Open source**: no
- **Scrum**: ✅ cycles nativos, burndown básico
- **Kanban**: ✅ excelente
- **GitHub**: ✅ sync bidireccional con PRs
- **Pros**:
  - UX considerada la mejor de la categoría.
  - Muy rápido (todo client-side, sin spinners).
  - Documentación impecable.
- **Contras**:
  - Precio crece rápido si el equipo crece o necesitamos features avanzadas.
  - Sin capacity planning real (hay que improvisar).
- **Ideal para 4 devs**: ✅ sí si queremos UX moderna y no nos importa pagar después.

### 3. Shortcut (antes Clubhouse)

- **Web**: https://www.shortcut.com
- **Tipo**: SaaS
- **Pricing**: free hasta **10 users**, 1 team; **$8.50/u/mes** Team
- **Open source**: no
- **Scrum**: ✅ iterations, épicas, roadmaps, reportes completos
- **Kanban**: ✅
- **GitHub**: ✅ integración nativa
- **Pros**:
  - Plan free generoso (4 devs entran sin pagar).
  - Scrum completo out-of-the-box: velocity, burndown, capacity.
  - Roadmap nativo.
- **Contras**:
  - Menos "de moda" que Linear.
  - UX funcional pero menos pulida.
- **Ideal para 4 devs**: ✅ muy buena opción, especialmente gratis.

### 4. Plane

- **Web**: https://plane.so
- **Repo**: https://github.com/makeplane/plane
- **Tipo**: open source + cloud opcional
- **Pricing**: **gratis ilimitado** self-hosted; **$6/u/mes** Pro cloud
- **Open source**: ✅ AGPL-3.0
- **Scrum**: ✅ cycles, épicas, modules, capacity planning
- **Kanban**: ✅
- **GitHub**: ✅ sync nativo
- **Pros**:
  - Open source real (no freemium engañoso).
  - 5 vistas (lista, board, timeline, calendar, workload).
  - Muy activo: último release **v1.4.2 (2026-08-23)**, 60K stars.
- **Contras**:
  - Requiere hosting propio si vamos self-hosted (Docker, 4GB RAM mínimo).
  - Costo de mantener el servidor.
- **Ideal para 4 devs**: ✅ sí si el equipo tiene a alguien que sepa Docker.

### 5. Jira

- **Web**: https://www.atlassian.com/software/jira
- **Tipo**: SaaS (también server / datacenter de pago)
- **Pricing**: free hasta **10 users**; **~$7.16/u/mes** Standard
- **Open source**: no (repos cliente sí: https://github.com/atlassian/jira, 655 stars, último push 2026-09-03)
- **Scrum**: ✅ completo (burndown, velocity, capacity, épicas, sprints)
- **Kanban**: ✅
- **GitHub**: ✅ vía app oficial
- **Pros**:
  - El estándar de la industria (reconocido en CVs).
  - Scrum más configurable del mercado.
- **Contras**:
  - Complejidad enorme para 4 personas (over-engineering).
  - UX lenta y densa.
  - Configuración inicial toma días.
- **Ideal para 4 devs**: ⚠️ sobredimensionado. Mejor para equipos > 20.

### 6. Trello

- **Web**: https://trello.com
- **Tipo**: SaaS
- **Pricing**: free hasta **10 collaborators**, 10 boards; **$5/u/mes** Standard
- **Open source**: no
- **Scrum**: ❌ (Kanban básico, sin sprints reales)
- **Kanban**: ✅ muy simple (columnas + tarjetas)
- **GitHub**: ⚠️ vía Power-Up (no nativo)
- **Pros**:
  - Lo más simple que existe. Onboarding 2 minutos.
  - Móvil decente.
- **Contras**:
  - Sin Scrum (sprints, épicas, velocity).
  - Reportes casi nulos.
  - Power-Ups de pago para features clave.
- **Ideal para 4 devs**: ⚠️ solo si Kanban básico nos alcanza (hoy no).

### 7. OpenProject

- **Web**: https://www.openproject.org
- **Repo**: https://github.com/opf/openproject
- **Tipo**: open source self-host
- **Pricing**: **gratis ilimitado** community; planes enterprise de pago
- **Open source**: ✅ GPL-3.0
- **Scrum**: ✅ completo (backlogs, sprints, burndown, work packages)
- **Kanban**: ✅
- **GitHub**: ⚠️ vía plugin comunitario
- **Pros**:
  - Muy maduro (10+ años).
  - Scrum completo, no solo Kanban.
  - Última release **v17.8.0 (2026-09-02)**, 16K stars.
- **Contras**:
  - Ruby on Rails — instalar y mantener requiere DevOps sólido.
  - UX anticuada comparada con Linear/Plane.
  - Documentación dispersa.
- **Ideal para 4 devs**: ⚠️ viable, pero requiere alguien que sepa mantener Rails.

### 8. Taiga

- **Web**: https://taiga.io
- **Repos**: https://github.com/taigaio/taiga-back (Python, último push 2026-09-21), https://github.com/taigaio/taiga-front (Angular, último push 2026-09-04)
- **Tipo**: open source self-host
- **Pricing**: **gratis ilimitado** community; planes cloud de pago
- **Open source**: ✅ MPL-2.0 (backend) + AGPL-3.0 (frontend)
- **Scrum**: ✅ (backlog, sprints, épicas, user stories, swimlanes)
- **Kanban**: ✅
- **GitHub**: ⚠️ vía contrib oficial (`taiga-contrib-github-auth`)
- **Pros**:
  - UX muy limpia y enfocada en Scrum.
  - Activo (commits esta semana).
  - Wiki + issues integrados.
- **Contras**:
  - Repos split (back + front separados, hay que orquestar).
  - Comunidad más pequeña que Plane/OpenProject.
- **Ideal para 4 devs**: ✅ buena opción, simple y enfocada.

### 9. Leantime

- **Web**: https://leantime.io
- **Repo**: https://github.com/leantime/leantime
- **Tipo**: open source self-host
- **Pricing**: **gratis ilimitado** community; planes cloud de pago
- **Open source**: ✅ AGPL-3.0
- **Scrum**: ✅ (sprints, épicas, historias, retrospectiva, backlog)
- **Kanban**: ✅
- **GitHub**: ✅ integración nativa
- **Pros**:
  - Pensado para equipos chicos y startups.
  - UX moderna (a diferencia de OpenProject).
  - Incluye retrospectiva y otras ceremonias Scrum en la UI.
  - Última release **v3.9.8 (2026-07-08)**, 11K stars.
- **Contras**:
  - Menos popular (menor comunidad que Plane).
  - PHP (no es lo más moderno, pero funciona).
- **Ideal para 4 devs**: ✅ muy buena opción open source con UX moderna.

### 10. Focalboard

- **Web**: https://www.focalboard.com
- **Repo**: https://github.com/mattermost/focalboard
- **Tipo**: open source self-host (de Mattermost)
- **Pricing**: **gratis ilimitado** community; **sin plan de pago propio** (Mattermost es el sponsor)
- **Open source**: ✅ AGPL-3.0
- **Scrum**: parcial (vistas board + tabla, sin sprints nativos)
- **Kanban**: ✅
- **GitHub**: ⚠️ parcial
- **Pros**:
  - Muy pulido (lo mantiene Mattermost).
  - Vistas board + tabla + galería + calendario.
  - 26K stars.
- **Contras**:
  - **Último release v8.0.0 (2024-06-13)** — más de 2 años sin release etiquetado (sí hay commits en 2026-05-18, pero sin releases formales nuevos).
  - Sin Scrum nativo (solo Kanban).
- **Ideal para 4 devs**: ⚠️ si solo necesitamos Kanban es OK, pero los releases estancados preocupan.

### 11. Wekan

- **Web**: https://wekan.github.io
- **Repo**: https://github.com/wekan/wekan
- **Tipo**: open source self-host
- **Pricing**: **gratis ilimitado**
- **Open source**: ✅ AGPL-3.0
- **Scrum**: ❌ (Kanban puro)
- **Kanban**: ✅ (fork de Restyaboard, estilo Trello)
- **GitHub**: ❌ sin integración oficial
- **Pros**:
  - Muy activo: último release **v11.90 (2026-09-20)**, 21K stars.
  - Auto-hospedaje trivial (Docker oficial).
- **Contras**:
  - Solo Kanban (sin Scrum).
  - Sin integración GitHub decente.
- **Ideal para 4 devs**: ⚠️ solo si Kanban básico nos alcanza.

### 12. Notion

- **Web**: https://www.notion.so
- **Tipo**: SaaS
- **Pricing**: free limitado; **$10/u/mes** Plus; **$20/u/mes** Business (necesario para integración GitHub)
- **Open source**: no
- **Scrum**: ❌ (bases de datos + docs, no Scrum puro)
- **Kanban**: ✅ parcial (vista board en databases)
- **GitHub**: ⚠️ solo plan Business ($20)
- **Pros**:
  - Docs + tasks en el mismo lugar.
  - Templates de retrospectiva, planning, etc.
- **Contras**:
  - **No es una herramienta Scrum**, es una herramienta de docs que simula tareas.
  - Integración GitHub solo en plan caro.
  - Reportes/agregaciones limitadas.
- **Ideal para 4 devs**: ❌ no es la herramienta correcta para Scrum puro. Útil para documentación.

---

## Cómo decidir

### Si no quieres gastar nada (free total)

1. **GitHub Projects** — si quieres empezar mañana con cero fricción. Cubre el 70% de lo que necesitamos hoy.
2. **Shortcut free** — si quieres Scrum completo out-of-the-box sin pagar (4 devs entran gratis).
3. **Plane self-hosted** — si alguien del equipo sabe Docker y queremos open source real.
4. **Leantime self-hosted** — si queremos open source con UX moderna y Scrum completo.
5. **Taiga self-hosted** — si queremos open source con Scrum muy bien hecho y UX limpia.

### Si podemos gastar ~$30/mes

1. **Linear** — mejor UX, ciclos nativos.
2. **Plane cloud** — open source pero gestionado.

### Si nuestro objetivo es 1-2 años vista

- **Plane self-hosted** o **Leantime self-hosted** son apuestas seguras: open source, activos, sin lock-in.

---

## Próximos pasos (NO en este archivo — solo referencia)

- Esta carpeta no decide. Cuando el equipo quiera migrar del `tablero-kanban.md` a una herramienta, **Leyva** convoca una mini-planning para elegir y se documenta en la retro del sprint activo.
- La elección se registra en [`proceso.md`](./proceso.md) (sección "Herramienta actual") y se actualiza el flujo de trabajo.
