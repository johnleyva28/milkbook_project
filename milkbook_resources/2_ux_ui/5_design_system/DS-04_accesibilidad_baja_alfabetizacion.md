# DS-04: Accesibilidad para usuarios de baja alfabetización — MilkBook

> **Cómo diseñar las apps de MilkBook para usuarios con baja alfabetización digital** (Juan tiene 52 años, primaria completa, 90% tiene smartphone pero poca experiencia). Este documento es la traducción práctica del principio G1 del marco SARAL (Srivastava et al., 2021) y de la investigación validada con usuario real.

**Audiencia objetivo:** Juan (productor, 52, primaria completa) y Carlos (lechero, 38, secundaria). Ambos usan WhatsApp fluidamente, pero poco más.

---

## 🎯 Restricciones validadas del usuario

| Restricción | Implicación de diseño |
|---|---|
| **Alfabetización digital baja-media** | Icono + texto SIEMPRE. Nunca solo icono. |
| **Manos mojadas / sucias** (ordeñando) | Botones grandes (60dp), PIN sobre huella como default. |
| **Sol directo** | Alto contraste, texto bold, evitar grises. |
| **Batería baja** | Sin animaciones pesadas, sin parallax. |
| **Dispositivo gama baja** (Xiaomi Redmi 9A) | Optimizar rendimiento, sin Lottie. |
| **A veces manos con guantes** (ordeñando en frío) | Touch targets grandes. |
| **Prisa** (ordeñando antes de que llegue Carlos) | Flujos < 30 seg. |
| **A veces le ayuda un familiar** | Cuenta `CLIENT_FAMILY` separada. |
| **Memoria corta** | Onboarding contextual repetido, breadcrumbs. |
| **A veces batería baja** | Banner "modo oscuro" ahorra batería. |

---

## 📐 Reglas duras (inquebrantables)

### 1. Texto siempre ≥ 16sp

```css
--text-base: 16px;  /* MÍNIMO ABSOLUTO en la app */
--text-sm: 14px;   /* Solo permitido en metadatos secundarios */
--text-xs: 12px;   /* Solo permitido en badges legales */
```

**Por qué:** Juan tiene 52 años. Texto menor a 16sp es ilegible sin esfuerzo bajo sol directo.

---

### 2. Botones siempre ≥ 56dp (touch target)

```css
--touch-primary: 60px;  /* Botón CTA principal */
--touch-default: 56px;  /* Botones secundarios, inputs, items */
--touch-min: 48px;     /* Mínimo WCAG (solo casos extremos) */
```

**Por qué:** Carlos opera con una mano en la moto. Touch targets más grandes = menos errores.

---

### 3. Icono + texto SIEMPRE juntos

```
✅ ❌
┌──────┐ ┌──────┐
│  🔍  │ │      │   ← Solo icono, Juan no entiende
│ Busc.│ └──────┘
└──────┘
```

**Por qué:** Juan entiende más el texto que el icono. WhatsApp usa icono + texto en todo. MilkBook también.

**Excepción:** tabs del bottom nav (donde el espacio es limitado y el usuario aprende los iconos con el uso).

---

### 4. Una sola acción principal por pantalla

```
✅ ❌
┌──────────────┐ ┌──────────────┐
│              │ │              │
│ ✓ CONFIRMAR  │ │ ✓ CONFIRMAR  │
│              │ │              │
│  Cancelar    │ │  Cancelar    │   ← 2 acciones del mismo peso = confusión
│              │ │              │
└──────────────┘ └──────────────┘
```

**Por qué:** Sin acción primaria clara, Juan no sabe qué hacer. Cancelar debe ser secundario (texto-link, no botón).

---

### 5. Confirmación explícita antes de acciones destructivas

**Acciones que SIEMPRE requieren confirmación:**
- Eliminar cuenta
- Cancelar un registro ya confirmado
- Eliminar un cliente
- Cancelar un cierre en curso

**Patrón:**
```dart
showDialog(
  context: context,
  builder: (ctx) => AlertDialog(
    title: Text('¿Estás seguro?'),
    content: Text('Esta acción no se puede deshacer.'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(ctx), child: Text('Cancelar')),
      FilledButton(
        onPressed: () => { handleDelete(); Navigator.pop(ctx); },
        style: FilledButton.styleFrom(backgroundColor: error),
        child: Text('Eliminar'),
      ),
    ],
  ),
);
```

---

### 6. Estados visibles SIEMPRE

Cada acción debe mostrar:
- ⏳ Loading: "Guardando..."
- ✅ Success: "Listo" (toast o vista de éxito)
- ❌ Error: "No pudimos... Intenta de nuevo"
- 📴 Offline: "Sin internet. Guardado localmente"

---

### 7. Errores específicos, no genéricos

```
✅ ❌
"Tu PIN es incorrecto"   "Error de autenticación"
"Sin internet. Tus cambios "Ha ocurrido un error. Por favor
 se guardan localmente"    intenta nuevamente"
```

**Por qué:** Juan necesita saber QUÉ hacer. "Intenta nuevamente" sin contexto es inútil.

---

### 8. Confirmaciones reversibles cuando sea posible

- Adelanto: se puede cancelar antes de que Juan confirme.
- Encargo: se puede cancelar antes de que Carlos compre.
- Cierre: se puede reabrir por 24h.

**Cuándo NO son reversibles:**
- Liquidación cerrada + boleta emitida (ya se generó documento legal).
- Cuenta eliminada.

---

### 9. Progreso siempre visible

- En acciones largas: progress bar (ej. generar boleta).
- En cargas: skeleton screens o spinners.
- En flujos: breadcrumb (paso 1 de 4).

---

### 10. Texto en español cotidiano

```
✅ ❌
"Confirmar litros"        "Validar transacción"
"Tu leche, en orden"      "Sistema de gestión lechera"
"Saqué las cuentas"       "Cierre de liquidación"
"Carlos te dio un adelanto" "Registro de anticipo"
"Habla con Carlos"        "Contactar al lechero"
```

**Por qué:** MilkBook habla como un primo del campo, no como un manual técnico.

---

## 🎨 Reglas de accesibilidad visual

### Contraste WCAG AAA en light mode

| Elemento | Contraste mínimo |
|---|---|
| Texto principal sobre fondo | 7:1 (AAA large) |
| Texto secundario sobre fondo | 4.5:1 (AA normal) |
| Texto en botón sobre color | 4.5:1 (AA normal) |
| Texto en CTA sobre verde | Blanco sobre `green-500` = 5.4:1 ✅ |

### Contraste en dark mode

| Elemento | Contraste mínimo |
|---|---|
| Texto principal | 7:1 |
| Texto en CTA | 4.5:1 |
| Border | 3:1 |

### Tipografía legible

```css
font-family: 'Atkinson Hyperlegible', sans-serif; /* Datos */
font-family: 'Inter', sans-serif;                /* UI */

font-weight: 400;  /* Regular */
font-weight: 500;  /* Medium - preferible */
font-weight: 700;  /* Bold - SOLO para datos destacados */

line-height: 1.4;  /* Normal */
line-height: 1.0;  /* Para displays grandes */
```

---

## 📏 Reglas de accesibilidad auditiva

### Haptic feedback

```dart
import 'package:flutter/services.dart';

void tapHaptic() => HapticFeedback.lightImpact();
void confirmHaptic() => HapticFeedback.mediumImpact();
void errorHaptic() => HapticFeedback.heavyImpact();

// Usar en:
ButtonPrimary(
  onPressed: () {
    tapHaptic();
    handleConfirm();
    confirmHaptic();
  },
)
```

**Cuándo usar:**
- Tap en botón principal → light haptic
- Confirmación exitosa → medium haptic
- Error → heavy haptic

---

### Audio feedback (opcional, futuro)

- Alerta de confirmación: sonido corto "tick".
- Alerta de error: sonido corto "bip".
- Configurable: usuario puede silenciar.

---

## 🔍 Reglas de accesibilidad cognitiva

### Lenguaje claro

```
✅ ❌
"No vendí hoy"          "Producción interrumpida"
"Editar registro"        "Modificar transacción"
"Boleta generada"        "Comprobante electrónico emitido"
"Cerrar contrato"        "Liquidar período contractual"
"Discrepancia"           "Discrepancia volumétrica"
```

### Una idea por oración

```
✅ "Carlos recogió 17.5 L. ¿Recibiste esa cantidad?"
❌ "Se ha registrado una recolección de 17.5 litros por parte del lechero. ¿Confirmas la recepción?"
```

### Evitar jerga técnica

```
✅ ❌
"Sincronizando..."        "Actualizando cache local..."
"Cargando boleta"         "Renderizando documento OSE"
"Firmar con PIN"          "Autenticar transacción"
"Pendiente de confirmar" "Awaiting cryptographic signature"
```

---

## 🔊 Reglas de accesibilidad visual

### Tamaño de texto ajustable (futuro)

```dart
// Permitir al usuario ajustar el tamaño de texto
double textScale = 1.0; // 100% por default

// Opciones: 0.85, 1.0, 1.15, 1.30
```

### Modo alto contraste (futuro)

```dart
// Habilitar paleta alternativa con negros y blancos puros
final paletteHighContrast = {
  'bg': Colors.black,
  'text': Colors.white,
  'accent': Colors.yellow,
};
```

### Modo oscuro (default)

Ya documentado en DS-01. Reduce fatiga visual y ahorra batería.

---

## 🧪 Testing con usuarios reales

### Plan de testing

**Fase 1: Testing interno (equipo MilkBook, 5 personas)**
- Cada miembro usa la app durante 1 semana como si fuera usuario.
- Anotar puntos de fricción.

**Fase 2: Testing con Carlos y Juan reales (3-5 usuarios)**
- Visitar Celendín o Namora.
- Observar cómo usan la app en su rutina diaria.
- Pedir que piensen en voz alta (think-aloud protocol).

**Fase 3: Testing con productores sin smartphone (5%)**
- Carlos registra por ellos.
- ¿Cómo manejamos la firma?
- ¿SMS OTP funciona como fallback?

### Métricas de accesibilidad

| Métrica | Meta | Cómo medir |
|---|---|---|
| Tiempo de primera tarea | < 60 seg | Cronómetro en test |
| Errores por tarea | < 1 | Contar toques incorrectos |
| Abandonos en onboarding | < 20% | Analytics |
| NPS post-test | > 40 | Encuesta |
| Tasa de éxito al primer intento | > 85% | Test con 10+ usuarios |
| Tasa de retorno D7 | > 50% | Analytics |

---

## 📋 Checklist de accesibilidad por pantalla

Antes de lanzar cualquier pantalla, validar:

- [ ] ¿Todo el texto es ≥ 16sp?
- [ ] ¿Todos los touch targets son ≥ 56dp?
- [ ] ¿Hay icono + texto en cada botón?
- [ ] ¿La acción principal es claramente la más grande?
- [ ] ¿Hay feedback para loading, success y error?
- [ ] ¿Los errores son específicos y accionables?
- [ ] ¿Las acciones destructivas tienen confirmación?
- [ ] ¿El copy está en español cotidiano (sin jerga)?
- [ ] ¿El contraste cumple WCAG AA mínimo (4.5:1)?
- [ ] ¿Funciona con TalkBack / VoiceOver?
- [ ] ¿La app es navegable solo con teclado numérico (PIN)?
- [ ] ¿Funciona offline?

---

## 📚 Referencias académicas

- **Srivastava, Kapania, Tuli, Singh — SARAL Framework (CSCW 2021):** https://www.shivanikapania.com/assets/cscw2021paper.pdf — Base teórica para diseñar apps para usuarios de baja alfabetización.
- **Medhi, Toyama — INTERACT 2013:** https://cutrell.org/papers/Medhi-INTERACT2013-ListVsHierachyOnMobiles.pdf — Lista vs jerarquía para usuarios no-alfabetizados.
- **Medhi, Sagar, Toyama — Actionable UI Guidelines (CHI 2007):** Diseño para usuarios de baja renta.
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/ — Estándares de accesibilidad web (aplicables a móvil).
- **WCAG-SR (Success Criteria):** https://www.w3.org/WAI/WCAG22/Understanding/

---

## 🔗 Referencias MilkBook

- Marco de bajo alfabetismo: [`../../../indagacion_y_planteamiento_de_proyecto/diseno-ux/low-literacy/principios-diseno.md`](../../../indagacion_y_planteamiento_de_proyecto/diseno-ux/low-literacy/principios-diseno.md)
- Persona Juan: [`../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/cliente-persona.md`](../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/cliente-persona.md)
- Persona Carlos: [`../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/lechero-persona.md`](../../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/lechero-persona.md)
- [DS-01: Tokens móvil](./DS-01_tokens_movil.md)
- [DS-02: Componentes móvil](./DS-02_componentes_movil.md)
- [DS-03: Patrones de pantallas](./DS-03_patrones_pantallas_movil.md)
