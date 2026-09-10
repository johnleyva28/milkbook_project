# 📐 Wireframes ASCII — App del Lechero (Carlos)

> **Wireframes en ASCII de las pantallas de la app del lechero.** Cada archivo documenta una pantalla con su layout ASCII, los estados que puede tener, y las decisiones de UX tomadas.

**Convención:** todos los wireframes están en formato ASCII para ser editables en cualquier editor de texto y versionables en git.

---

## 📋 Pantallas documentadas

| # | Archivo | Pantalla | Importancia |
|---|---|---|---|
| 1 | [`WF-L-01_home_y_cartera.md`](./WF-L-01_home_y_cartera.md) | Home con ruta del día + alertas + cartera | Alta |
| 2 | [`WF-L-02_registrar_visita_quick.md`](./WF-L-02_registrar_visita_quick.md) | Quick entry de litros (con previous de Juan) | Crítica |
| 3 | [`WF-L-03_confirmar_recoleccion.md`](./WF-L-03_confirmar_recoleccion.md) | Confirmar litros del cliente (paso doble) | Crítica |
| 4 | [`WF-L-04_adelantos.md`](./WF-L-04_adelantos.md) | Registrar adelanto a cliente | Alta |
| 5 | [`WF-L-05_encargos.md`](./WF-L-05_encargos.md) | Lista y gestión de encargos | Alta |
| 6 | [`WF-L-06_sacar_cuentas.md`](./WF-L-06_sacar_cuentas.md) | ⭐ Pantalla crítica — cerrar contrato | ⭐⭐⭐ |
| 7 | [`WF-L-07_cerrar_contrato_y_boleta.md`](./WF-L-07_cerrar_contrato_y_boleta.md) | Confirmación + boleta PDF | Alta |
| 8 | [`WF-L-08_estadisticas_y_reportes.md`](./WF-L-08_estadisticas_y_reportes.md) | Dashboard del lechero | Media |

---

## 🎯 Cómo leer estos wireframes

Cada wireframe sigue este formato:

```markdown
# WF-L-XX: [Nombre]

## Propósito
Para qué sirve esta pantalla.

## Datos que muestra
Lista de los datos visibles en la pantalla.

## Acciones disponibles
Qué puede hacer el usuario.

## Estados
- Estado vacío (sin datos)
- Estado cargado (con datos)
- Estado de error
- Estado de carga

## Wireframe (ASCII)
[Diagrama]

## Notas de UX
Decisiones y consideraciones de diseño.

## Edge cases
Qué pasa en casos límite.
```

---

## 🔗 Mockups HTML (alta fidelidad)

Cada wireframe tiene un mockup HTML navegable en `../../2_mockups/`:
- `app_lechero_home.html`
- `app_lechero_registrar_visita.html`
- `app_lechero_cerrar_contrato.html`

---

## 🔗 Prototipos navegables

En `../../3_prototipos/` hay versiones clickeables de los flujos críticos.

---

## 📐 Convenciones del ASCII

```
┌─────────────────────────┐
│  Borde de pantalla       │
│  ─────────────            │
│  Línea horizontal         │
│  │ separador vertical      │
│  ░░░ fondo gris           │
│  BOTÓN texto en mayúscula │
│  🔘 botón circular         │
│  ★ acción primaria        │
└─────────────────────────┘
```

---

## 🎨 Sistema de tokens aplicado

| Elemento | Token | Valor |
|---|---|---|
| Botón primario | `--green-500` | #2A782A |
| Botón secundario | outline | var(--blue-500) |
| Botón destructivo | `--error` | #B3261E |
| Botón warning | `--warning` | #B26A00 |
| Fondo principal | `--cream-50` | #FFFDF7 |
| Card | white + `--cream-300` border | 1px |
| Texto principal | `--text` | #1A1F1A |
| Texto secundario | `--text-soft` | #5C5C5C |
| Dato destacado | `--font-data` (Atkinson) | bold 28-32px |
| Touch target primario | `--touch-primary` | 60dp |
| Touch target secundario | `--touch-default` | 56dp |
