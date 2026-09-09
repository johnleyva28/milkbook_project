# DS-02: Catálogo de componentes móvil — MilkBook

> **Inventario de componentes Flutter reutilizables** para las apps de MilkBook. Cada componente documenta su API, comportamiento, accesibilidad y variantes.

---

## 📦 Componentes base

### Botones

#### ButtonPrimary

```dart
ButtonPrimary(
  text: 'CONFIRMAR 17.5 L',
  onPressed: () => handleConfirm(),
  icon: Icons.check_circle_outline,
  size: ButtonSize.large,  // 60dp (default), medium (56dp), huge (72dp)
  disabled: false,
  loading: false,
)
```

**Especificaciones:**
- Altura: 60dp (default), 56dp (medium), 72dp (huge)
- Color de fondo: `green-500`
- Color de texto: white
- Radio: `radius-md` (8px)
- Font: Inter Bold 16sp
- Icon opcional a la izquierda
- Estado `loading`: spinner reemplaza texto
- Estado `disabled`: opacity 0.5, no clickable
- Touch ripple animado (Android) o alpha (iOS)
- Haptic feedback en tap (light)

**Variantes:** filled (default), outlined (border 2px green-500), ghost (solo texto).

---

#### ButtonSecondary

```dart
ButtonSecondary(
  text: 'Cancelar',
  onPressed: () => handleCancel(),
  icon: Icons.close,
  size: ButtonSize.medium,
)
```

**Especificaciones:**
- Background: white
- Border: 2px solid `blue-500`
- Color de texto: `blue-500`
- Resto igual a ButtonPrimary

---

#### ButtonDanger

```dart
ButtonDanger(
  text: 'Eliminar cuenta',
  onPressed: () => handleDelete(),
  size: ButtonSize.medium,
)
```

**Especificaciones:**
- Color de fondo: `error`
- Para acciones destructivas con confirmación previa.

---

#### ButtonWarning

```dart
ButtonWarning(
  text: 'Resolver discrepancia',
  onPressed: () => handleResolve(),
)
```

**Especificaciones:**
- Color de fondo: `warning`
- Para acciones que requieren atención.

---

### Inputs

#### InputText

```dart
InputText(
  label: 'DNI',
  placeholder: '12345678',
  maxLength: 8,
  keyboardType: TextInputType.number,
  validator: (val) => val.length == 8 ? null : 'DNI inválido',
  prefixIcon: Icons.badge_outlined,
  helperText: 'Tu número de DNI de 8 dígitos',
  errorText: null,  // se muestra si validación falla
)
```

**Especificaciones:**
- Altura: 56dp
- Border: 2px (default `cream-400`, focus `green-500`, error `error`)
- Radio: `radius-md`
- Font: Inter 16sp
- Label arriba del input (no placeholder)
- Helper text debajo (opcional)
- Error text debajo (cuando hay error)
- Prefix icon (opcional)
- Suffix icon (opcional, ej. "ver contraseña")
- Soporte para teclado: number, text, email, phone, multiline

---

#### InputNumber (especializado para datos numéricos)

```dart
InputNumber(
  label: 'Litros',
  defaultValue: 17.5,
  step: 0.5,
  min: 0,
  max: 100,
  onChanged: (val) => setLitros(val),
)
```

**Especificaciones:**
- Igual que InputText pero con:
  - Botones +/- integrados (estilo calculator)
  - Font: **Atkinson Hyperlegible Bold 28sp** (dato destacado)
  - Incremento configurable (0.5, 1, 5, 10, etc.)

---

### Cards

#### Card

```dart
Card(
  child: Padding(
    padding: EdgeInsets.all(MilkbookTokens.space4),
    child: ...,
  ),
)
```

**Especificaciones:**
- Background: white (light) / `bg-card` (dark)
- Border: 1px solid `cream-300`
- Radio: `radius-lg` (12px)
- Padding interno: 16dp

---

#### CardFeatured

```dart
CardFeatured(
  borderColor: green500,
  child: ...,
)
```

**Especificaciones:**
- Igual que Card pero con border de 2px (color personalizable).
- Usado para destacar info importante (ej. resultado de cierre).

---

#### CardWarning

```dart
CardWarning(
  child: Text('Tienes 2 discrepancias por resolver'),
)
```

**Especificaciones:**
- Background: `warning-bg` (amarillo claro)
- Border: 1px solid `warning`
- Para alertas visuales.

---

### Botones de cantidad rápida (QuickButton)

```dart
QuickGrid(
  options: [15, 17, 17.5, 18, 20, 25],
  selected: 17.5,
  onSelected: (val) => setLitros(val),
  columns: 3,
)
```

**Especificaciones:**
- Grid de 3 columnas
- Cada botón: 60-64dp de alto
- Font: Atkinson Hyperlegible Bold 22sp
- Border: 2px (default `cream-300`, selected `green-500`)
- Background: white (default), `green-100` (selected)

---

### Avatares

#### Avatar

```dart
Avatar(
  name: 'Juan Pérez',
  size: AvatarSize.medium,  // small (32), medium (44), large (64)
  color: blue300,
)
```

**Especificaciones:**
- Círculo perfecto
- Inicial del nombre (1-2 letras) si no hay foto
- Color personalizable (default: `blue-300`)
- Tamaño: 32dp (sm), 44dp (md), 64dp (lg)

---

### Badges

#### BadgeStatus

```dart
BadgeStatus(status: 'CONFIRMADO')  // o 'PENDIENTE', 'VENCIDO'
```

**Variantes:**
- `CONFIRMADO` → verde (green-500)
- `PENDIENTE` → amarillo (warning)
- `VENCIDO` → rojo (error)
- `LIQUIDADO` → gris (text-soft)
- `DISCREPANCIA` → amarillo con icono

**Especificaciones:**
- Padding: 4-10dp
- Radio: 12px
- Font: 11sp bold uppercase
- Letter-spacing: 0.5px

---

### Bottom Navigation

```dart
BottomNavigation(
  currentIndex: 0,
  items: [
    BottomNavItem(icon: Icons.home, label: 'Inicio'),
    BottomNavItem(icon: Icons.people, label: 'Clientes'),
    BottomNavItem(icon: Icons.calendar_month, label: 'Quincena'),
    BottomNavItem(icon: Icons.bar_chart, label: 'Reportes'),
  ],
  onTap: (index) => navigateTo(index),
)
```

**Especificaciones:**
- 4 tabs máximo (restricción por baja alfabetización)
- Height: 56dp + safe area iOS
- Background: white (light), `bg-card` (dark)
- Border top: 1px solid `cream-300`
- Icon size: 24-28dp
- Label: Inter Medium 11sp
- Color activo: `green-700`
- Color inactivo: `text-soft`
- Animación: ripple + cambio de color instantáneo

---

### Top App Bar

```dart
AppBar(
  title: Text('Confirmar litros'),
  leading: IconButton(icon: Icons.arrow_back, onPressed: () => back()),
  actions: [
    IconButton(icon: Icons.help_outline, onPressed: () => showHelp()),
  ],
)
```

**Especificaciones:**
- Altura: 56dp
- Background: `cream-50` (light) / `bg-primary` (dark)
- Border bottom: 1px solid `cream-300`
- Title: Inter Bold 16sp, `text` color
- Back arrow: 36dp touch target
- Actions: 36dp touch target cada una

---

### Modal / Dialog

```dart
showModalBottomSheet(
  context: context,
  builder: (ctx) => ResolverDiscrepanciaModal(),
  isScrollControlled: true,
)
```

**Especificaciones:**
- Border-radius top: 16dp
- Padding: 24dp
- Drag handle (para iOS feel)
- Backdrop: rgba(0, 0, 0, 0.5)
- Cierre al tap fuera
- Animación: slide-up 300ms

---

### Toast / SnackBar

```dart
showToast(
  context: context,
  message: '✓ Registrado y sincronizado',
  duration: Duration(seconds: 2),
  type: ToastType.success,
)
```

**Variantes:**
- `success` (verde)
- `error` (rojo)
- `warning` (amarillo)
- `info` (azul)

**Especificaciones:**
- Bottom: 80dp (sobre el bottom nav)
- Padding: 12dp
- Border-radius: 8dp
- Font: Inter Medium 14sp
- Auto-hide después de 2s
- Tap para dismiss

---

### Banner (información persistente)

```dart
OfflineBanner()
ConflictBanner()
DiscrepanciaBanner(discrepancias: 3)
```

**Especificaciones:**
- Top of screen, persistent
- Color de fondo según tipo
- Border-left de 4px (color de acento)
- Icon + texto + acción opcional

---

### Toggle (Switch)

```dart
Toggle(
  value: noVendioHoy,
  onChanged: (val) => setNoVendio(val),
  size: ToggleSize.medium,  // small (32), medium (40), large (52)
)
```

**Especificaciones:**
- Ancho: 32dp (sm), 52dp (md), 64dp (lg)
- Altura proporcional
- Track: `cream-300` (off) / `green-500` (on)
- Thumb: white
- Animación: 200ms
- Touch target: 60dp mínimo

---

### PIN Input

```dart
PinInput(
  length: 4,
  onCompleted: (pin) => handlePin(pin),
  obscureText: true,
)
```

**Especificaciones:**
- 4-6 dígitos (configurable)
- Cada dígito: 56x64dp, border 2px
- Font: Atkinson Bold 32sp
- Dot filled: `green-500`, empty: `cream-400`
- Auto-focus siguiente al escribir
- Soporte para teclado numérico

---

### Numeric Keypad (custom)

```dart
NumericKeypad(
  onDigit: (digit) => handleDigit(digit),
  onBackspace: () => removeLast(),
)
```

**Especificaciones:**
- Grid 3x4 (1-9, _, 0, ⌫)
- Cada tecla: aspect-ratio 1.4, mínimo 64dp alto
- Font: Atkinson Bold 28sp
- Border: 2px `cream-300`, active `cream-200`
- Touch ripple animado

---

## 📦 Componentes especializados

### RegistroItem (fila de registro diario)

```dart
RegistroItem(
  dia: '15 L',
  litros: 18.5,
  estado: 'RECOGIDO_COINCIDE',
  diferenciaCon: 18.5,  // del otro lado
  onTap: () => verDetalle(),
)
```

**Variantes:**
- Verde (coincide)
- Amarillo (discrepancia)
- Gris (no vendido)
- Mostrar valor del lechero Y del productor

---

### LiquidacionResumen

```dart
LiquidacionResumen(
  totalLitros: 287.5,
  precioPorLitro: 1.50,
  subtotal: 431.25,
  adelantos: 230.00,
  encargos: 30.00,
  totalPagar: 171.25,
  editable: true,
)
```

**Estructura visual:**
```
Total litros: 287.5 L
Precio × L: S/ 1.50
─────────────────
Subtotal: S/ 431.25
− Adelantos: − S/ 230.00
− Encargos: − S/ 30.00
═════════════════
TOTAL A PAGAR: S/ 171.25
```

---

### FormaPagoSelector

```dart
FormaPagoSelector(
  totalPagar: 171.25,
  onChange: (efectivo, yape, transferencia) => setPago(efectivo, yape, transf),
)
```

**Variantes:**
- Todo efectivo
- Todo Yape
- Todo transferencia
- Mixto (con inputs por método)

---

### BoletaViewer (vista de boleta PDF)

```dart
BoletaViewer(
  boleta: boletaData,
  onShare: () => shareToWhatsapp(),
  onDownload: () => downloadPDF(),
)
```

**Estructura:**
- Header con logo y RUC
- Datos del cliente (DNI)
- Detalle de items
- Totales
- QR code (verificación SUNAT)
- Botones: descargar PDF, compartir WhatsApp

---

## 📐 Tabla de uso de componentes

| Componente | Pantallas donde se usa |
|---|---|
| `ButtonPrimary` | WF-L-02, WF-L-03, WF-L-06, WF-C-02 (CTA principal) |
| `ButtonSecondary` | Cancelar en modales, Adelanto, Encargo |
| `InputText` | WF-L-04 (adelanto), WF-L-05 (encargo), onboarding |
| `InputNumber` | WF-L-02, WF-L-03, WF-C-02 (litros) |
| `QuickGrid` | WF-L-02, WF-L-03, WF-C-02 (botones rápidos) |
| `Card` | Todas las pantallas |
| `CardFeatured` | WF-L-06 (resumen), WF-C-06 (liquidación) |
| `CardWarning` | WF-L-06 (discrepancias), WF-C-02 (caso A.b) |
| `BottomNavigation` | Todas las apps (4 tabs) |
| `TopAppBar` | Todas (excepto home a veces) |
| `Modal` | WF-L-06 (discrepancia), WF-L-07 (forma pago) |
| `Toast` | Confirmaciones de acciones |
| `Banner` | Offline, conflictos, discrepancias |
| `Toggle` | WF-L-02 (no vendí), WF-C-03 |
| `PinInput` | Login, firma digital |
| `NumericKeypad` | WF-C-02 (PIN) |
| `RegistroItem` | WF-L-06 (lista de días) |
| `LiquidacionResumen` | WF-L-06, WF-C-06 |
| `FormaPagoSelector` | WF-L-06, WF-L-07 |
| `BoletaViewer` | WF-L-07, WF-C-07 |

---

## 📋 Implementación en Flutter

```dart
// lib/components/button_primary.dart
import 'package:flutter/material.dart';

class ButtonPrimary extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final IconData? icon;
  final ButtonSize size;
  final bool disabled;
  final bool loading;

  const ButtonPrimary({
    required this.text,
    required this.onPressed,
    this.icon,
    this.size = ButtonSize.large,
    this.disabled = false,
    this.loading = false,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = MilkbookTokens.of(context);
    final height = size == ButtonSize.large ? 60 : size == ButtonSize.medium ? 56 : 72;

    return SizedBox(
      width: double.infinity,
      height: height,
      child: ElevatedButton(
        onPressed: disabled || loading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: tokens.green500,
          foregroundColor: Colors.white,
          disabledBackgroundColor: tokens.green500.withOpacity(0.5),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(tokens.radiusMd),
          ),
          elevation: 0,
          textStyle: TextStyle(
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: FontWeight.w700,
          ),
        ),
        child: loading
            ? SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  color: Colors.white,
                  strokeWidth: 2,
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (icon != null) ...[
                    Icon(icon, size: 20),
                    SizedBox(width: 8),
                  ],
                  Text(text),
                ],
              ),
      ),
    );
  }
}

enum ButtonSize { medium, large, huge }
```

---

## 🧪 Testing de componentes

Cada componente debe tener:
- **Widget test** que valida render básico.
- **Golden test** que valida pixel-perfect vs diseño.
- **Accessibility test** que valida touch targets, contraste, labels.
- **Integration test** del flujo donde se usa.

---

## 🔗 Referencias

- [DS-01: Tokens móvil](./DS-01_tokens_movil.md)
- [DS-03: Patrones de pantallas](./DS-03_patrones_pantallas_movil.md)
- Material Design 3 components: https://m3.material.io/components
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/components
- Flutter widget catalog: https://docs.flutter.dev/ui/widgets
