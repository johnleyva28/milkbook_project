# DS-03: Patrones de pantallas móvil — MilkBook

> **Layouts recurrentes** que se usan en múltiples pantallas. Documentamos los patrones para que el equipo de diseño y desarrollo los aplique consistentemente, evitando reinventar layouts cada vez.

---

## 🎯 Los 7 patrones de pantalla

| # | Patrón | Usado en | Descripción |
|---|---|---|---|
| 1 | **App Bar + Content + Sticky CTA** | Confirmar litros, registrar visita | Patrón más común. CTA abajo siempre visible. |
| 2 | **App Bar + Content + Bottom Nav** | Home, listado | Para pantallas de navegación sin CTA fijo. |
| 3 | **App Bar + Sectioned Content** | Cerrar contrato | Múltiples secciones (registros, adelantos, encargos, cálculo) |
| 4 | **Full Screen Modal** | Onboarding, login | Para flujos críticos con pasos. |
| 5 | **Bottom Sheet Modal** | Resolver discrepancia, forma de pago | Para acciones dentro de un flujo. |
| 6 | **Tab Bar dentro de Content** | Mi perfil (boletas / perfil / firma) | Para contenido extenso del mismo nivel. |
| 7 | **Empty State** | Sin clientes, sin boletas | Cuando no hay datos. |

---

## Patrón 1: App Bar + Content + Sticky CTA

### Estructura

```
┌─────────────────────┐
│ Status bar          │ (24dp Android / 44dp iOS)
├─────────────────────┤
│ App Bar (56dp)       │ ← back + title + acciones
├─────────────────────┤
│                     │
│                     │
│ Content (scroll)    │
│                     │
│                     │
├─────────────────────┤
│ Sticky CTA (60-80dp) │ ← botón primario siempre visible
└─────────────────────┘
```

### Cuándo usarlo

- Pantallas con UNA acción principal crítica.
- El usuario debe poder completar el flujo en cualquier momento del scroll.
- Ejemplos: confirmar litros, registrar visita, cerrar contrato.

### Tokens

- App bar: 56dp
- Sticky CTA: 60dp + safe area
- Padding del content: `--space-4` (16dp) lateral

### Implementación Flutter

```dart
Scaffold(
  appBar: AppBar(
    title: Text('Confirmar litros'),
    leading: IconButton(icon: Icons.arrow_back, onPressed: back),
  ),
  body: SafeArea(
    child: Column(
      children: [
        Expanded(
          child: SingleChildScrollView(
            padding: EdgeInsets.all(16),
            child: Content(),
          ),
        ),
        Container(
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border(top: BorderSide(color: cream300)),
          ),
          child: SafeArea(
            top: false,
            child: ButtonPrimary(
              text: 'CONFIRMAR 17.5 L',
              onPressed: handleConfirm,
            ),
          ),
        ),
      ],
    ),
  ),
)
```

### Ejemplos en MilkBook

- WF-L-02 (registrar visita)
- WF-L-03 (confirmar recolección)
- WF-C-02 (confirmar litros)
- WF-C-03 (no vendí)

---

## Patrón 2: App Bar + Content + Bottom Nav

### Estructura

```
┌─────────────────────┐
│ Status bar          │
├─────────────────────┤
│ App Bar (56dp)       │
├─────────────────────┤
│                     │
│ Content (scroll)    │
│                     │
│                     │
├─────────────────────┤
│ Bottom Nav (56dp)    │ ← 4 tabs (Inicio / Clientes / etc.)
└─────────────────────┘
```

### Cuándo usarlo

- Pantallas de navegación principal.
- Sin CTA fijo (las acciones están en cards o floating buttons).
- El usuario "explora" más que "ejecuta".

### Tokens

- Bottom nav: 56dp + safe area iOS

### Ejemplos en MilkBook

- WF-L-01 (home del lechero)
- WF-C-01 (home del productor)
- WF-L-08 (reportes)

---

## Patrón 3: App Bar + Sectioned Content + Sticky CTA

### Estructura

```
┌─────────────────────┐
│ Status bar          │
├─────────────────────┤
│ App Bar             │
├─────────────────────┤
│ ┌─ Sección 1 ─────┐ │
│ │  Contenido A    │ │
│ └────────────────┘ │
│ ┌─ Sección 2 ─────┐ │
│ │  Contenido B    │ │
│ └────────────────┘ │
│ ┌─ Sección 3 ─────┐ │
│ │  Contenido C    │ │
│ └────────────────┘ │
│                     │
├─────────────────────┤
│ Sticky CTA           │
└─────────────────────┘
```

### Cuándo usarlo

- La pantalla tiene múltiples "bloques" temáticos independientes.
- Cada sección es scrolleable y editable.
- Ejemplos: cerrar contrato (registros, adelantos, encargos, cálculo).

### Tokens

- Cada sección: card con padding 16dp, gap 12dp entre secciones
- Sticky CTA abajo

### Implementación Flutter

```dart
Scaffold(
  appBar: AppBar(title: Text('Cerrar contrato')),
  body: Column(
    children: [
      Expanded(
        child: ListView(
          padding: EdgeInsets.all(16),
          children: [
            SeccionRegistros(),
            SizedBox(height: 12),
            SeccionAdelantos(),
            SizedBox(height: 12),
            SeccionEncargos(),
            SizedBox(height: 12),
            SeccionCalculo(),
            SizedBox(height: 12),
            SeccionFormaPago(),
            SizedBox(height: 80),  // espacio para sticky CTA
          ],
        ),
      ),
      StickyCta(),
    ],
  ),
)
```

### Ejemplos en MilkBook

- WF-L-06 (sacar cuentas) ⭐ LA MÁS IMPORTANTE
- WF-C-06 (ver liquidación)
- WF-L-08 (reportes)

---

## Patrón 4: Full Screen Modal (sin app bar)

### Estructura

```
┌─────────────────────┐
│ Status bar          │
├─────────────────────┤
│                     │
│   Onboarding /      │
│   Login / Splash    │
│                     │
│                     │
└─────────────────────┘
```

### Cuándo usarlo

- Flujos críticos con steps.
- Cuando NO hay contexto anterior (usuario llega "frío").
- Onboarding, login, splash.

### Tokens

- Full screen, sin app bar (puede tener close button flotante si aplica).
- Padding generoso (24dp+).
- CTA primario grande (72dp) y centrado abajo.

### Ejemplos en MilkBook

- Onboarding inicial (5 pasos)
- Login
- Splash
- Confirmación con PIN

---

## Patrón 5: Bottom Sheet Modal

### Estructura

```
┌─────────────────────┐
│                     │
│   Pantalla padre    │
│                     │
├─────────────────────┤
│   ═══ (drag handle)  │
│ ┌─────────────────┐ │
│ │                 │ │
│ │  Modal Sheet    │ │
│ │  (60-90% altura)│ │
│ │                 │ │
│ └─────────────────┘ │
└─────────────────────┘
```

### Cuándo usarlo

- Acciones rápidas dentro de un flujo (no rompen el contexto).
- Inputs adicionales (ej. motivo de cancelación).
- Confirmaciones destructivas.
- Ejemplos: resolver discrepancia, seleccionar motivo, forma de pago.

### Tokens

- Border-radius top: 16dp
- Drag handle visible
- Padding: 24dp
- Altura: auto-fit, max 90% de pantalla

### Implementación Flutter

```dart
showModalBottomSheet(
  context: context,
  isScrollControlled: true,
  backgroundColor: Colors.transparent,
  builder: (ctx) => Container(
    decoration: BoxDecoration(
      color: cream50,
      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
    ),
    child: SafeArea(
      child: ResolverDiscrepanciaModal(),
    ),
  ),
);
```

### Ejemplos en MilkBook

- Resolver discrepancia (WF-L-06 modal)
- Forma de pago (WF-L-06 selector)
- Pedido de encargo (WF-L-05)
- Adelanto nuevo (WF-L-04)

---

## Patrón 6: Tab Bar dentro de Content

### Estructura

```
┌─────────────────────┐
│ App Bar             │
├─────────────────────┤
│ [Tab1] [Tab2] [Tab3]│ ← tabs horizontales
├─────────────────────┤
│                     │
│   Content del tab   │
│   seleccionado      │
│                     │
│                     │
└─────────────────────┘
```

### Cuándo usarlo

- Contenido extenso del mismo nivel (no jerárquico).
- El usuario quiere ver "diferentes vistas" del mismo objeto.
- Ejemplos: Mi perfil (Boletas / Configuración / Ayuda).

### Tokens

- Tab bar: 48dp
- Indicador activo: `green-500` (3dp bottom border)
- Font: Inter Medium 14sp
- Padding: 16dp horizontal

### Ejemplos en MilkBook

- WF-C-07 (boletas y perfil) - tabs: Boletas / Firma / Notificaciones / Ayuda
- Web admin (filtros de vista)

---

## Patrón 7: Empty State

### Estructura

```
┌─────────────────────┐
│ App Bar (opcional)  │
├─────────────────────┤
│                     │
│                     │
│    [Ilustración]     │
│                     │
│   Título claro      │
│                     │
│   Subtítulo         │
│   explicando qué    │
│   hacer             │
│                     │
│   [CTA principal]   │
│                     │
│                     │
└─────────────────────┘
```

### Cuándo usarlo

- No hay datos que mostrar (sin clientes, sin boletas, sin notificaciones).
- Es importante NO mostrar pantalla vacía sin explicación.

### Tokens

- Ilustración: 120-160dp
- Título: Inter Bold 18sp
- Subtítulo: Inter Regular 14sp, `text-soft`
- CTA: ButtonPrimary o ButtonSecondary
- Padding: 24dp+

### Ejemplos en MilkBook

- Carlos sin clientes: "Aún no tienes clientes. Agrega tu primero."
- Juan sin boletas: "Cuando cierres tu primera quincena, verás tu boleta aquí."
- Sin alertas: "Todo al día. Sin discrepancias pendientes."

---

## 📐 Reglas comunes a todos los patrones

### Safe areas iOS

```dart
SafeArea(
  child: ...,
)
```

### Padding y márgenes

- Lateral: 16dp (default) en pantallas densas, 24dp en vacías.
- Vertical entre secciones: 12dp.
- Padding de cards: 16dp.

### Tipografía

- Datos destacados (litros, montos): Atkinson Hyperlegible Bold, 28-72sp.
- UI general: Inter Regular/Medium, 14-16sp.
- Headings: Inter Bold/SemiBold, 18-24sp.
- Captions: Inter Medium, 11-13sp.

### Color de estado

- Success: `green-500` o `green-100` (fondo)
- Warning: `warning` o `warning-bg`
- Error: `error` o `error-bg`
- Info: `blue-500` o `blue-100`

### Haptic feedback

- Tap en botón: light haptic
- Confirmación exitosa: medium haptic
- Error: heavy haptic

### Animaciones

- Transición entre pantallas: 200ms (slide en iOS, fade en Android).
- Mostrar/ocultar modal: 300ms (slide-up).
- Sin animaciones decorativas (no Lottie, no parallax).

---

## 🧩 Cómo decidir qué patrón usar

```
¿El usuario necesita ejecutar una acción crítica?
├── Sí → Patrón 1 o 3 (con sticky CTA)
└── No →
    ¿Necesita ver múltiples secciones independientes?
    ├── Sí → Patrón 3 (sectioned)
    └── No →
        ¿Necesita navegar entre pantallas?
        ├── Sí → Patrón 2 (con bottom nav)
        └── No →
            ¿Es una pantalla de entrada (sin contexto)?
            ├── Sí → Patrón 4 (full screen)
            └── No → Patrón 5 o 6 o 7
```

---

## 🧪 Testing de patrones

Cada patrón debe tener:
- Screenshot del happy path.
- Screenshot del empty state.
- Screenshot del estado de error.
- Screenshot del estado de carga.
- Verificación de safe areas en iOS.
- Verificación de dark mode (donde aplique).

---

## 🔗 Referencias

- [DS-01: Tokens móvil](./DS-01_tokens_movil.md)
- [DS-02: Componentes móvil](./DS-02_componentes_movil.md)
- [DS-04: Accesibilidad baja alfabetización](./DS-04_accesibilidad_baja_alfabetizacion.md)
- Material Design 3 - Layout: https://m3.material.io/foundations/layout
- Apple HIG - Modality: https://developer.apple.com/design/human-interface-guidelines/modality
