# 🖼️ Sistema de Iconografía — Milkbook

> **Librería oficial de iconos de Milkbook:** **Lucide** como primaria, **Material Symbols** como contingencia técnica. Decisión tomada el 2026-09-05 tras comparar 6 librerías candidatas con los mismos 12 iconos del contexto real del proyecto.

**Aplica a:** App móvil (lechero + cliente), web admin, dark mode, marketing.
**Archivo de referencia visual:** [`comparativa-iconografia.html`](./comparativa-iconografia.html)

---

## 🎯 Decisión: Lucide

**Lucide** es la librería oficial de iconos de Milkbook.

**Razones:**

1. **Estilo visual coherente con la personalidad de marca** (cercana y cálida + moderna y juvenil). El trazo rounded de Lucide se siente más orgánico y menos corporativo que Material Symbols.
2. **Licencia ISC** (funcionalmente equivalente a MIT): uso comercial libre, redistribución libre, sin atribución obligatoria.
3. **Multiplataforma completo:** React, Flutter, Swift, Vue, Svelte. Misma librería en los 3 stacks del proyecto.
4. **Outline con stroke ajustable:** un solo estilo, una variable CSS controla el grosor. Más simple que los 6 pesos de Phosphor o los 4 ejes de Material.
5. **Comunidad activa:** es el fork comunitario de Feather Icons, con 1500+ iconos y updates frecuentes.
6. **Para la audiencia prioritaria de Milkbook (el lechero, 38 años, repite la app todo el día):** la consistencia visual de Lucide importa más que la flexibilidad de pesos de Phosphor.

## 🎯 Plan B: Material Symbols

**Material Symbols** queda como contingencia si la validación con usuarios reales (Carlos, Juan) muestra que Lucide no funciona en campo. Razones para tenerla como respaldo:

- Es la **librería default de Google/Android** → si Carlos y Juan ya están familiarizados con esos iconos (vienen de Google Maps, Gmail, etc.), la curva de aprendizaje es menor.
- **Variable font con 4 ejes** (peso, fill, grade, optical size) → máximo control sobre densidad visual.
- **Apache 2.0:** uso comercial libre.

**Cuándo cambiar:** solo si las pruebas de campo con Carlos y Juan indican que los iconos de Lucide no se reconocen o confunden. La decisión final se toma **después** de validar con usuarios reales, no por preferencia estética.

---

## 📚 Información de Lucide

**Diseñadores:** Comunidad open-source (fork de Feather Icons)
**Sitio oficial:** https://lucide.dev
**Licencia:** ISC (equivalente a MIT en permisividad)
**Catálogo:** 1500+ iconos
**Estilo:** Outline 2px, rounded, friendly
**Estándar:** SVG nativo, `currentColor` para color dinámico
**Repositorio:** https://github.com/lucide-icons/lucide

### Por qué encaja con Milkbook

| Criterio | Lucide | Justificación |
|---|---|---|
| Personalidad (cercana + juvenil) | ✅ | Estilo rounded, no técnico-frío |
| Paleta cálida cremosa | ✅ | Trazo outline se ve limpio sobre `cream-50` |
| Legibilidad al sol | ✅ | Stroke 2px con grosor ajustable |
| Baja alfabetización | ✅ | Iconos concretos (jarra, gota, persona) mejor que abstractos (estudios Medhi 2007) |
| Multiplataforma | ✅ | React, Flutter, Swift, Vue, Svelte |
| Costo | ✅ Gratis | ISC, sin atribución |
| Tamaño bundle | ~30 KB | Outline + 3 variantes de peso |

---

## 📐 Reglas de uso

### Tamaños por contexto

| Contexto | Tamaño app (dp) | Tamaño web (px) | Stroke width |
|---|---|---|---|
| Icono en botón pequeño | 16 | 16 | 1.5 |
| Icono en botón estándar | 20 | 20 | 2 |
| Icono en lista / card | 24 | 24 | 2 (default) |
| Icono en input (leading icon) | 20 | 20 | 2 |
| Icono en tab bar | 24 | 24 | 2 |
| Icono en estado vacío / hero | 48-64 | 48-64 | 1.5 |
| Icono en splash | 96+ | 96+ | 1 |

**Regla:** stroke 2px es el default. Para tamaños grandes (48px+) usar stroke 1.5 para que el icono no se vea "gordo". Para tamaños muy pequeños (16px) usar stroke 1.75 para mantener legibilidad.

### Color

Los iconos usan `currentColor` por defecto — heredan el color del texto. **Nunca hardcodear el color** en el SVG; pasar el color vía CSS / props.

| Estado | Color del icono | Token |
|---|---|---|
| Default | `var(--text)` | `text` |
| Secundario | `var(--text-soft)` | `text-soft` |
| Sobre botón primario verde | blanco | `#FFFFFF` |
| Sobre botón secundario azul | blanco | `#FFFFFF` |
| Alerta / error | `var(--error)` | `error` |
| Warning | `var(--warning)` | `warning` |
| Disabled | `var(--text-disabled)` | `text-disabled` |

### Tamaño del touch target

**Regla del proyecto:** el área clickeable debe ser mínimo 44x44 dp (Apple HIG) o 48x48 dp (Material). El icono dentro puede ser de 20-24 dp; el resto es padding invisible.

```css
.icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.icon-button svg {
  width: 24px;
  height: 24px;
}
```

### Iconos + texto SIEMPRE

**Regla de baja alfabetización:** nunca usar un icono solo sin texto. Siempre combinación:

```jsx
<button>
  <CheckCircle2 size={20} />
  <span>Confirmar litros</span>
</button>
```

Excepciones (icono solo permitido):
- Iconos de tab bar (con label abajo)
- Iconos de navegación universal (cerrar X, atrás ←)
- Iconos de status (check, alerta) en cards pequeñas

### Estado activo (toggle on/off)

Para tabs y botones toggleables, usar el mismo icono pero con `fill` sólido cuando está activo:

```jsx
// Inactivo: outline
<Home size={24} strokeWidth={2} />

// Activo: fill sólido (mismo icono, diferente color o fill)
<Home size={24} strokeWidth={2} fill="currentColor" />
```

Opcionalmente, swap a un icono variante (ej: `Home` outline → `Home` filled).

---

## 📦 Instalación

### Web (React / Next.js)

```bash
# Con npm
npm install lucide-react

# Con pnpm
pnpm add lucide-react

# Con yarn
yarn add lucide-react
```

```tsx
// components/ConfirmarLitros.tsx
import { CheckCircle2, Droplet, AlertTriangle, RefreshCw, User } from 'lucide-react';

export const ConfirmarLitros = () => (
  <div>
    <div className="litros">
      <Droplet size={32} strokeWidth={2.5} color="#2A782A" />
      <span>18.5 L</span>
    </div>
    <button>
      <CheckCircle2 size={20} strokeWidth={2.5} />
      <span>Confirmar</span>
    </button>
  </div>
);
```

```tsx
// Para usar vía CSS (color currentColor)
import { CheckCircle2 } from 'lucide-react';

<CheckCircle2
  size={24}
  strokeWidth={2}
  className="text-green-500"  // Tailwind
  // o style={{ color: 'var(--green-500)' }}
/>
```

### App móvil (Flutter)

```yaml
# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  lucide_icons: ^0.4.0+1
```

```dart
// lib/screens/confirmar_litros.dart
import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class ConfirmarLitrosScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Dato con icono
          Row(
            children: [
              Icon(
                LucideIcons.droplet,           // o Droplet en versiones nuevas
                size: 32,
                color: Color(0xFF2A782A),       // --green-500
              ),
              SizedBox(width: 8),
              Text('18.5 L', style: TextStyle(
                fontFamily: 'Atkinson',
                fontSize: 32,
                fontWeight: FontWeight.bold,
              )),
            ],
          ),
          // Botón con icono
          FilledButton.icon(
            onPressed: () {},
            icon: Icon(LucideIcons.checkCircle2, size: 20),
            label: Text('CONFIRMAR'),
          ),
          // Alerta
          Row(
            children: [
              Icon(LucideIcons.alertTriangle, color: Color(0xFFB26A00)),
              SizedBox(width: 8),
              Text('Difiere de ayer'),
            ],
          ),
        ],
      ),
    );
  }
}
```

> ⚠️ **Nota sobre Flutter:** la API del paquete puede cambiar entre versiones. Verifica la documentación actual en https://pub.dev/packages/lucide_icons. Algunos iconos cambian de nombre (ej: `Droplet` vs `droplet` casing).

### iOS (SwiftUI)

Para SwiftUI nativo, Lucide no tiene paquete oficial. Opciones:

**Opción 1: Importar SVG manualmente** (recomendado para producción)

```swift
// Assets.xcassets: agregar los SVG como "Single Scale" en una carpeta "Lucide"
// O arrastrar los SVG al proyecto Xcode

import SwiftUI

struct LucideIcon: View {
    let name: String
    let size: CGFloat
    let color: Color

    var body: some View {
        // Asume que cada SVG está en el bundle con nombre "lucide-<name>.svg"
        // Convertir SVG a PDF o usar UIImage
        Image("\(name)")
            .resizable()
            .scaledToFit()
            .frame(width: size, height: size)
            .foregroundColor(color)
    }
}

// Uso:
LucideIcon(name: "check-circle-2", size: 24, color: .green)
```

**Opción 2: Usar SF Symbols como fallback** (si quieres algo nativo iOS)

Apple provee SF Symbols nativamente, pero **no es Lucide**. Si el equipo decide usar SF Symbols en iOS y Lucide en Flutter/Web, hay que mapear manualmente los iconos. **No recomendado** para mantener consistencia cross-platform.

**Opción 3: Renderizar Lucide SVG via WebView** (no recomendado, demasiado overhead)

**Decisión recomendada para iOS:** importar los SVG de Lucide directamente al bundle de Xcode (descargar ZIP de https://lucide.dev/icons, arrastrar a Assets.xcassets, usar `Image("nombre")`). Mantiene la consistencia visual cross-platform.

---

## 🔄 Cómo se integra con la paleta y tipografía

| Elemento | Color del icono | Familia del texto adyacente |
|---|---|---|
| Botón "Confirmar" | blanco sobre fondo `green-500` | Inter Semibold 16sp |
| Botón "Reportar" | blanco sobre fondo `warning` | Inter Semibold 16sp |
| Card de "LITROS HOY" | `green-700` (datos) | Atkinson Bold 32sp |
| Card de alerta | `warning` | Inter Medium 14sp + Atkinson Regular 16sp |
| Tab bar (inactivo) | `text-soft` | Inter Medium 12sp |
| Tab bar (activo) | `green-500` (fill sólido) | Inter Semibold 12sp |
| Avatar de cliente | `blue-300` (color del logo) | — |
| Empty state | `text-soft` | Lexend Regular 16px (web) o Inter Regular 16sp (app) |

---

## 🗺️ Mapeo de iconos clave de Milkbook

Estos son los iconos que **necesitamos sí o sí** para la app. Lista de compra para el MVP:

| Contexto en Milkbook | Icono Lucide | Notas |
|---|---|---|
| Confirmar / Check | `check-circle-2` | Acción #1 del lechero |
| Reportar discrepancia | `alert-triangle` | Estilo outline, color warning |
| Litros / Leche | `droplet` | Con color `green-500` para asociar con el producto |
| Cliente / Productor | `user-round` o `user-circle` | Outline, avatar |
| Lista de clientes | `users-round` | Plural |
| Sincronizar | `refresh-cw` o `refresh-ccw` | Offline-first |
| Sin conexión | `wifi-off` | Estado de red |
| Calendario | `calendar` | Fecha de registro |
| Mapa / GPS | `map-pin` | Ubicación del cliente |
| Búsqueda | `search` | Buscar cliente |
| Inicio | `home` | Tab principal |
| Estadísticas | `bar-chart-3` | Reportes |
| Dinero / Soles | `circle-dollar-sign` o `coins` | Montos |
| Configuración | `settings` | Tab secundario |
| Cerrar / X | `x` | Diálogos |
| Atrás | `arrow-left` o `chevron-left` | Navegación |
| Más opciones | `more-vertical` o `more-horizontal` | Overflow menu |
| Editar | `pencil` o `edit-3` | Edición inline |
| Eliminar | `trash-2` | Con confirmación obligatoria |
| Añadir | `plus` | Acciones primarias |
| Notificación | `bell` | Alerts in-app |
| Éxito | `check-circle-2` con fill verde | Estados de éxito |
| Error | `x-circle` con fill rojo | Estados de error |
| Warning | `alert-triangle` con color warning | Discrepancias |
| Información | `info` | Tooltips, ayuda |
| Cámara | `camera` | Foto de boleta |
| Guardar | `save` | Confirmación de formulario |
| Descargar | `download` | Reportes offline |
| Enviar / Compartir | `send` o `share-2` | Compartir liquidación |

**Lista oficial:** https://lucide.dev/icons — todos los iconos están en el sitio, se pueden buscar por nombre y copiar SVG/JSX directo.

---

## ⚠️ Reglas duras y pitfalls

1. **NUNCA usar un icono solo sin texto** (excepción: tabs, cerrar X, atrás ←).
2. **NUNCA hardcodear color en el SVG** — siempre vía `currentColor`, `className` o `style`.
3. **Stroke 2px es el default.** Para iconos grandes (48px+), bajar a 1.5 para evitar sensación "gorda".
4. **Touch target mínimo 44x44 dp.** El icono dentro puede ser 20-24 dp.
5. **No usar Lucide para cosas que requieren ilustración** (empty states grandes, onboarding). Para eso son las **ilustraciones** (otra sección del manual de marca).
6. **No mezclar Lucide con otra librería** en la misma pantalla. Si una pantalla usa Lucide, todos sus iconos son Lucide.
7. **Validar con usuarios reales** antes de comprometer. El lechero debe reconocer el icono de "sync" o "GPS" sin explicación.

---

## ✅ Checklist de implementación

- [ ] Instalar `lucide-react` en el web admin
- [ ] Instalar `lucide_icons` en Flutter app
- [ ] iOS: descargar SVG de Lucide y agregarlos al bundle de Xcode (en `Assets.xcassets` o carpeta `Lucide/`)
- [ ] Definir tamaño default por contexto (24dp app, 24px web)
- [ ] Definir stroke width default (2)
- [ ] Verificar que TODOS los iconos usan `currentColor` (no color hardcodeado)
- [ ] Verificar que el área clickeable mínima es 44x44 dp
- [ ] Reemplazar cualquier icono de otra librería por Lucide
- [ ] Validar la lista de "iconos clave" con Carlos y Juan en campo
- [ ] Validar con simulador de daltonismo (Coblis o Stark)
- [ ] Validar bajo sol directo con el Xiaomi de Carlos
- [ ] Documentar en Storybook o equivalente

---

## 🔄 Migración desde Material Symbols (plan B)

Si en validación con usuarios reales Lucide no funciona y decidimos migrar a Material Symbols:

1. **Inventariar todos los iconos Lucide usados** con su nombre y contexto.
2. **Mapear 1-a-1 a Material Symbols** usando https://fonts.google.com/icons como catálogo.
3. **Reemplazar imports** en React, Flutter, Swift.
4. **Actualizar este README** con la nueva decisión y las razones del cambio.
5. **Volver a validar** con usuarios reales.

**No recomendado migrar sin evidencia de campo** — la decisión inicial (Lucide) se sostiene a menos que haya datos concretos que muestren problema.

---

## 🔗 Referencias

### Lucide
- Sitio oficial: https://lucide.dev
- Catálogo: https://lucide.dev/icons
- Documentación React: https://lucide.dev/guide/packages/lucide-react
- Documentación Flutter: https://pub.dev/packages/lucide_icons
- GitHub: https://github.com/lucide-icons/lucide
- Licencia (ISC): https://github.com/lucide-icons/lucide/blob/main/LICENSE

### Material Symbols (plan B)
- Sitio oficial: https://fonts.google.com/icons
- Documentación: https://developers.google.com/fonts/docs/material_symbols
- GitHub: https://github.com/google/material-design-icons

### Investigación sobre iconos y baja alfabetización
- Actionable UI Design Guidelines for Smartphone Applications Inclusive of Low-Literate Users (Srivastava et al., CSCW 2021): https://www.shivanikapania.com/assets/cscw2021paper.pdf
- Triadic Relationship of Icon Design for Semi-Literate Communities: https://doi.org/10.5281/zenodo.1105598
- Mobile Wallet Design for Oral Users (MicroSave, 2016): https://www.microsave.net/wp-content/uploads/2017/05/Mobile_Wallet_Design_for_Oral_Users.pdf

### Proyecto
- Paleta: [`../2-paleta-de-colores/`](../2-paleta-de-colores/)
- Tipografía: [`../3-tipografia/`](../3-tipografia/)
- Logo: [`../1-logo/milkbook_logo_v1.png`](../1-logo/milkbook_logo_v1.png)
- Vista previa interactiva: [`./comparativa-iconografia.html`](./comparativa-iconografia.html)
