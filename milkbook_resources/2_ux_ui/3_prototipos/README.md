# 🔄 3_prototipos — Prototipos interactivos de MilkBook

> **Versiones HTML interactivas y navegables** de los flujos más críticos de las apps móviles. Cada prototipo simula el flujo completo con navegación entre pantallas, clicks en botones, y transiciones.

---

## 📂 Prototipos disponibles

| Archivo | Flujo | Importancia |
|---|---|---|
| [`prototipo_sacar_cuentas.html`](./prototipo_sacar_cuentas.html) | ⭐ Cierre de quincena (5 pasos) | ⭐⭐⭐ |
| [`prototipo_cliente_confirmar.html`](./prototipo_cliente_confirmar.html) | Confirmar litros con PIN (3 pasos) | ⭐⭐⭐ |
| [`prototipo_lechero_registro.html`](./prototipo_lechero_registro.html) | Registro de visita (4 pasos) | ⭐⭐ |

---

## 🎯 Cómo abrir los prototipos

```bash
# Abrir el más importante (sacar cuentas)
start "" "C:\Users\LENOVO\milkbook_project\milkbook_resources\2_ux_ui\3_prototipos\prototipo_sacar_cuentas.html"

# O navegar desde el explorador de archivos
```

**No requieren servidor.** Son HTMLs standalone que funcionan abriendo directamente en el navegador.

---

## 🎮 Cómo usar cada prototipo

### Prototipo 1: Sacar Cuentas (5 pasos)

```
1. Pantalla principal del cierre
   ↓ tap "Siguiente"
2. Modal de discrepancia (puedes hacer click en quick buttons)
   ↓ tap "Siguiente"
3. Forma de pago (mixto)
   ↓ tap "Siguiente"
4. Confirmación con firma digital
   ↓ tap "Siguiente"
5. Cierre exitoso + boleta
```

**Qué probar:**
- Click en las filas amarillas de discrepancia → se abre el modal.
- Click en los quick buttons (18, 18.5, 19, etc.) → cambia la selección.
- Navega entre pasos con los botones arriba.

### Prototipo 2: Confirmar Litros con PIN (3 pasos)

```
1. Pantalla inicial — Carlos ya recogió
   ↓ tap "Confirmar"
2. Ingresa tu PIN (click en los números del keypad)
   ↓ automático al completar 4 dígitos
3. Confirmación exitosa
```

**Qué probar:**
- Click en los números del keypad → ves cómo se llena el PIN.
- Cuando completas 4 dígitos, automáticamente avanza.
- Click en ⌫ para borrar.

### Prototipo 3: Registro de Visita (4 pasos)

```
1. Cliente en cartera (Juan)
   ↓ tap en Juan
2. Pantalla de registro con previous de Juan
   ↓ ajusta cantidad si quieres
   ↓ tap "REGISTRAR 17.5 L"
3. Sincronizando...
   ↓ auto-avance
4. Confirmado · Carlos
```

**Qué probar:**
- Click en cliente → abres la pantalla de registro.
- Ajusta cantidad con quick buttons.
- Confirma y observa el flujo de sincronización.

---

## 🧪 Para qué sirven estos prototipos

1. **Validar con usuarios reales** antes de codificar.
   - Mostrar el prototipo a Carlos y Juan en una tablet.
   - Pedirles que ejecuten las tareas.
   - Observar dónde se atoran.

2. **Comunicar al equipo de desarrollo** qué interacciones existen.
   - El desarrollador ve exactamente cómo debe funcionar el flujo.
   - Reduce ambigüedad en historias de usuario.

3. **Testear con stakeholders** (banco, cooperativa, etc.).
   - Mostrar el cierre + boleta para validar el flujo de aprobación.
   - "Así es como Carlos cierra la quincena con Juan".

4. **Iterar antes de codificar**.
   - Si un flujo no funciona, iterar el prototipo ANTES de implementar.
   - Cambiar 1 botón en HTML es más barato que reescribir 200 líneas de Flutter.

---

## 📐 Cómo se construyen técnicamente

Los prototipos usan:
- **HTML + CSS** puro (sin frameworks pesados).
- **JavaScript vanilla** para navegación entre pasos.
- **Tokens compartidos** con `../2_mockups/shared_styles.css` (consistencia visual).
- **Sin backend**, todo client-side.

### Estructura típica de un prototipo

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../2_mockups/shared_styles.css">
  <style>
    /* Estilos específicos del prototipo */
  </style>
</head>
<body>
  <div class="stage">
    <div class="stage-header">
      <h1>Título del prototipo</h1>
      <div class="stage-nav">
        <button onclick="irAtras()">← Atrás</button>
        <span>Paso <span id="paso-num">1</span>/5</span>
        <button onclick="irAdelante()">Siguiente →</button>
      </div>
    </div>
    <div class="stage-content" id="screen-container">
      <!-- Pantallas dinámicas -->
    </div>
  </div>
  <script>
    let pasoActual = 1;
    function irAdelante() { ... }
    function irAtras() { ... }
  </script>
</body>
</html>
```

---

## 🆚 Diferencia entre Mockup, Prototipo y Wireframe

| Tipo | Fidelidad | Interactividad | Uso |
|---|---|---|---|
| **Wireframe** (1_wireframes/) | Baja — ASCII | Nula — solo lectura | Pensar estructura y copy |
| **Mockup** (2_mockups/) | Alta — visual exacto | Nula — solo lectura | Validar diseño visual |
| **Prototipo** (3_prototipos/) | Alta — visual exacto | **Alta — navegación funcional** | Validar flujos completos con usuarios |
| **Implementación** | 100% | 100% | Producto final |

---

## 🔗 Conexiones con otros documentos

- **Wireframes:** `../1_wireframes/` — fuente de cada paso del flujo.
- **Mockups:** `../2_mockups/` — visual exacto de cada pantalla individual.
- **User flows:** `../4_user_flows/` — happy path + edge cases de cada flujo.
- **Design system:** `../5_design_system/` — tokens aplicados en el prototipo.

---

## ⚠️ Lo que estos prototipos NO son

- ❌ NO son la implementación final (son HTML estático).
- ❌ NO tienen backend (todo se simula client-side).
- ❌ NO tienen autenticación real (los PIN son simulados).
- ❌ NO tienen base de datos (los datos son ficticios).
- ❌ NO son responsive (están optimizados para 360x760px).

---

## 📋 Próximos prototipos a crear

| Pendiente | Cuándo |
|---|---|
| Onboarding de Carlos (5 pasos) | Antes de implementar la app |
| Onboarding de Juan (5 pasos) | Antes de implementar la app |
| Flujo de disputa (admin interviene) | Después de la versión 1 |
| Flujo de generar boleta con Nubefact | Cuando se integre OSE |
| Flujo de onboarding con SMS fallback | Cuando se integre SMS provider |
| Flujo de offline sync (LWW + conflictos) | Antes de implementar sync |
