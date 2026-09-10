# 📐 1_wireframes — Wireframes ASCII de MilkBook

> **Wireframes ASCII detallados de las pantallas de las dos apps móviles.** Cada archivo documenta una pantalla con su layout ASCII, los estados que puede tener, y las decisiones de UX tomadas.

**Convención:** wireframes en ASCII, editables y versionables.

---

## 📂 Subcarpetas

| Carpeta | Contenido | Estado |
|---|---|---|
| [`01_app_lechero/`](./01_app_lechero/) | 8 wireframes del flujo de Carlos (lechero) | ✅ Completo |
| [`02_app_cliente/`](./02_app_cliente/) | 7 wireframes del flujo de Juan (productor) | ✅ Completo |

**Total:** 15 wireframes.

---

## 🎯 Cómo leer estos wireframes

Cada wireframe sigue este formato:

```markdown
# WF-X-XX: [Nombre]

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

Los wireframes críticos tienen mockups HTML navegables en `../../2_mockups/`:
- `app_lechero_home.html`
- `app_lechero_registrar_visita.html`
- `app_lechero_cerrar_contrato.html` ⭐ LA MÁS IMPORTANTE
- `app_cliente_home.html`
- `app_cliente_confirmar_litros.html` ⭐ LA MÁS IMPORTANTE PARA JUAN
- `app_cliente_no_vendi.html`

---

## 🔗 Prototipos navegables

En `../../3_prototipos/` hay versiones clickeables de los flujos críticos:
- `prototipo_sacar_cuentas.html` — 5 pasos del cierre de quincena
- `prototipo_cliente_confirmar.html` — Confirmación con PIN funcional

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
