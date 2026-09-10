# 🎨 Mockups HTML — MilkBook

> **Mockups estáticos de alta fidelidad** de las pantallas más importantes de las apps móviles. Son HTMLs navegables (con `<a href>` entre mockups) que muestran la UI exacta que verá el usuario, sin necesidad de abrir Figma ni compilar Flutter.

**5 mockups creados:**

| Mockup | Pantalla | Rol | Importancia |
|---|---|---|---|
| `app_lechero_home.html` | Home + cartera + alertas | Carlos | Alta (entrada diaria) |
| `app_lechero_registrar_visita.html` | Quick entry + firma + no vendí | Carlos | Crítica (todos los días) |
| `app_lechero_cerrar_contrato.html` | Sacar cuentas + cálculo + boleta | Carlos | ⭐ LA MÁS IMPORTANTE |
| `app_cliente_home.html` | Home + quincena + menú | Juan | Alta |
| `app_cliente_confirmar_litros.html` | Confirmar + firmar | Juan | ⭐ LA MÁS IMPORTANTE PARA JUAN |
| `app_cliente_no_vendi.html` | Motivo + nota | Juan | Media |

**Recursos compartidos:**
- `shared_styles.css` — tokens visuales + componentes base

---

## 🚀 Cómo abrir los mockups

```bash
# Abrir el home del lechero (entrada al flujo)
start "" "C:\Users\LENOVO\milkbook_project\milkbook_resources\2_ux_ui\2_mockups\app_lechero_home.html"

# O navegar entre ellos con los enlaces "Siguiente →" en la esquina inferior derecha
```

Los mockups incluyen **botones clicables** (los `.cliente-card`, `.quick-btn`, `.reason-card`) que cambian de estado visual al hacer click (efecto `:active` + `.selected`), pero no navegan entre mockups automáticamente — usa los enlaces "Siguiente →" / "← Volver" en la esquina inferior derecha de cada pantalla.

---

## 🎯 Cómo leer cada mockup

Cada mockup está construido con el patrón "phone-stage":
- **Marco del dispositivo** (`<div class="phone">`): simula el borde del celular con notch.
- **Pantalla** (`<div class="phone-screen">`): el área visible de 360x760 px.
- **Status bar** arriba (hora + batería + señal).
- **App bar** debajo (back + título + acciones).
- **Content** (scrollable): el contenido principal de la pantalla.
- **Sticky CTA** o **bottom nav** abajo.

Dentro del `content` verás:

- **`<div class="badge">`** para estados (verde = confirmado, amarillo = pendiente, etc.)
- **`<div class="btn btn-primary">`** para acciones primarias (botón verde grande).
- **`<div class="btn btn-secondary">`** para acciones secundarias.
- **`<div class="card">`** para bloques de información agrupada.
- **`<div class="banner">`** para alertas visuales.
- **`<div class="avatar">`** para foto/inicial del usuario.
- **`<div class="input">`** para campos de texto.
- **`<div class="quick-grid">`** para botones rápidos (litros).
- **`<div class="toggle">`** para switches on/off.

---

## 📐 Tokens aplicados (de identidad de marca)

| Token | Valor | Uso |
|---|---|---|
| `--green-500` | `#2A782A` | Botón "Confirmar", CTA primaria |
| `--cream-50` | `#FFFDF7` | Fondo de pantallas |
| `--cream-100` | `#FAF8F3` | Fondo de cards secundarias |
| `--cream-300` | `#EBE3CC` | Bordes de cards |
| `--text` | `#1A1F1A` | Texto principal (negro suave, no puro) |
| `--warning` | `#B26A00` | Discrepancias, alertas |
| `--blue-500` | `#0064B1` | Links, acciones secundarias |
| `--font-data` | Atkinson Hyperlegible | Litros, montos (legible) |
| `--font-ui` | Inter | Textos UI |
| `--touch-primary` | 60dp | Botones primarios |
| `--space-4` | 16dp | Padding default |

Todos los tokens vienen de la paleta oficial documentada en [`../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/`](../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/).

---

## 🧪 Cómo probar con usuarios reales

1. **Abre los mockups en un navegador** (Chrome, Firefox, Edge).
2. **Usa la vista responsive** del navegador para ver el tamaño mobile (F12 → toggle device toolbar → iPhone o Android).
3. **Muestra los mockups al usuario** en este orden:
   - Home del lechero → registrar visita → cerrar contrato
   - Home del cliente → confirmar litros
4. **Pide al usuario que piense en voz alta** (think-aloud protocol):
   - "¿Qué ves aquí?"
   - "¿Qué harías primero?"
   - "¿Qué pasa si tocas ese botón?"
5. **Anota los puntos de fricción** y ajusta antes de programar.

---

## ⚠️ Lo que los mockups NO cubren

Los mockups son **estáticos** y representan un momento congelado. NO incluyen:

- ❌ Transiciones entre pantallas (eso lo verás en prototipos de `3_prototipos/`)
- ❌ Estados de carga (spinners, skeletons)
- ❌ Estados de error (toast, modal de error)
- ❌ Estados vacíos (lista sin clientes)
- ❌ Animaciones (entrada de teclado, haptic, transiciones)
- ❌ Comportamiento responsive (diferentes tamaños)
- ❌ Interacción real con teclado numérico

Para esos casos, ver:
- **Transiciones:** `3_prototipos/`
- **Estados especiales:** wireframes en `1_wireframes/`
- **Design system:** `5_design_system/`

---

## 📋 Próximos mockups a crear

- ⏸ `web_lechero_dashboard.html` — dashboard de Carlos en web
- ⏸ `web_admin_dashboard.html` — dashboard interno del equipo
- ⏸ `web_admin_contabilidad.html` — módulo contable (mini-ERP)
- ⏸ `portal_cliente_resumen.html` — vista web de Juan
- ⏸ `onboarding_paso1.html` al `onboarding_paso4.html`
