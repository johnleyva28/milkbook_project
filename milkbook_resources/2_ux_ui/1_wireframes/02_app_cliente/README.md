# 📐 Wireframes ASCII — App del Cliente/Productor (Juan)

> **Wireframes en ASCII de las pantallas de la app del productor.** Diseñadas para baja alfabetización digital, con boton grande, iconos + texto siempre, y máximo 1 acción principal por pantalla.

**Convención:** wireframes en ASCII, editables y versionables.

---

## 📋 Pantallas documentadas

| # | Archivo | Pantalla | Importancia |
|---|---|---|---|
| 1 | [`WF-C-01_home_y_contrato.md`](./WF-C-01_home_y_contrato.md) | Home + quincena actual + alertas | Alta |
| 2 | [`WF-C-02_confirmar_litros.md`](./WF-C-02_confirmar_litros.md) | ⭐ La pantalla MÁS IMPORTANTE para Juan | ⭐⭐⭐ |
| 3 | [`WF-C-03_no_vendi.md`](./WF-C-03_no_vendi.md) | Marcar "no vendí" con motivo | Media |
| 4 | [`WF-C-04_adelantos_recibidos.md`](./WF-C-04_adelantos_recibidos.md) | Ver adelantos recibidos | Media |
| 5 | [`WF-C-05_encargos_recibidos.md`](./WF-C-05_encargos_recibidos.md) | Ver encargos pedidos | Media |
| 6 | [`WF-C-06_ver_liquidacion.md`](./WF-C-06_ver_liquidacion.md) | Ver detalle de cierre y firmar | Alta |
| 7 | [`WF-C-07_boletas_y_perfil.md`](./WF-C-07_boletas_y_perfil.md) | Boletas PDF + perfil | Media |

---

## 🎯 Restricciones específicas de Juan

| Restricción | Decisión de UX |
|---|---|
| Baja alfabetización | Icono + texto siempre, nunca icono solo |
| Manos mojadas / sucias | Botón grande (60dp), PIN sobre huella como default |
| Sol directo | Alto contraste, texto bold 16sp+ |
| Dispositivo gama baja | Sin animaciones pesadas, sin parallax |
| Memoria corta | Onboarding contextual repetido, breadcrumbs visibles |
| A veces un familiar le ayuda | Cuenta `CLIENT_FAMILY` separada (ver AUTH-01) |

---

## 🔗 Mockups HTML navegables

Los wireframes críticos están implementados como HTML en `../../2_mockups/`:
- `app_cliente_home.html`
- `app_cliente_confirmar_litros.html`
- `app_cliente_no_vendi.html`

Abrelos en el navegador para ver la UI exacta.

---

## 🔗 Cómo validar antes de programar

1. **Imprime los wireframes** en papel.
2. **Muéstralos a 3-5 productores** (no a Carlos, sino a Juanes).
3. **Pide que señalen con el dedo** dónde tocarían primero.
4. **Pregunta:** "¿Qué pasa después?"
5. **Anota los puntos de fricción** y ajusta.
