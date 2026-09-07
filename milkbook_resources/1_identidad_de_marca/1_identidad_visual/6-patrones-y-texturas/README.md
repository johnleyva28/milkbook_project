# 🟫 Sistema de Patrones y Texturas — Milkbook

> **Catálogo oficial de patrones repetibles y texturas de Milkbook.** Define los 3 patrones y 2 texturas adoptados, las reglas de uso, y las técnicas de implementación por plataforma.

**Fecha de aprobación:** 2026-09-05
**Aplica a:** Web admin (hero, marketing, secciones), boletas PDF, emails, marketing secundario.
**NO aplica a:** Pantalla principal de la app móvil (distrae al sol).
**Archivo de referencia visual:** [`comparativa-patrones.html`](./comparativa-patrones.html)

---

## 🎯 Principio fundamental

**Los patrones y texturas dan calidez y coherencia a la marca, pero NUNCA deben competir con el texto o los datos.** Siempre se usan como fondo sutil o acento decorativo, con opacidad reducida y la paleta Milkbook.

**Regla de oro:** opacidad 30-60% sobre fondo, máximo 2 colores por patrón, nunca patrones en pantallas donde el usuario lee datos críticos.

---

## 📦 Los 5 elementos adoptados

### Resumen rápido

| # | Nombre | Tipo | Color principal | Uso principal |
|---|---|---|---|---|
| 1 | Gotas de leche azules | Patrón orgánico | `#78C0F8` (blue-300) | Tarjetas, hero, emails |
| 2 | Hojas de pasto realistas | Patrón orgánico | `#88D088` (green-300) / `#2A782A` (green-500) | Marketing, hero |
| 3 | Puntos crema | Patrón geométrico | `#B89766` (cream-500) | Web admin, headers |
| 4 | Papel crema (noise) | Textura sutil | `#FAF8F3` + grano `#B89766` | Boletas PDF, emails |
| 5 | Madera kraft | Textura (opcional) | `#F5F0E1` + vetas `#D9CCA8` | "Sección artesanal" web admin |

---

## 🔵 1. Gotas de leche azules

**Patrón orgánico principal de Milkbook.** Evoca directamente el producto (leche) sin ser literal.

### Especificación SVG

```xml
<svg viewBox="0 0 90 90">
  <pattern id="drop" x="0" y="0" width="90" height="90">
    <!-- Gota principal -->
    <path d="M45 25 Q35 38 35 48 Q35 60 45 60 Q55 60 55 48 Q55 38 45 25 Z"
          fill="#78C0F8" opacity="0.7"/>
    <ellipse cx="40" cy="42" rx="2.5" ry="4" fill="#FFFFFF" opacity="0.8"/>
    <!-- Gotas pequeñas alrededor -->
    <circle cx="20" cy="70" r="2" fill="#78C0F8" opacity="0.5"/>
    <circle cx="70" cy="80" r="1.5" fill="#78C0F8" opacity="0.5"/>
    <circle cx="10" cy="20" r="1.5" fill="#78C0F8" opacity="0.4"/>
    <circle cx="80" cy="15" r="2" fill="#78C0F8" opacity="0.4"/>
  </pattern>
</svg>
```

### Dónde usar

- ✅ **Tarjetas de cliente** (con fondo `blue-100`)
- ✅ **Email headers** (con fondo `cream-50`)
- ✅ **Hero del web admin** (sobre `green-500` oscuro)
- ✅ **Marketing secundario** (boletines, anuncios)
- ❌ **Fondo del app móvil** (distrae al sol)
- ❌ **Inputs o formularios** (dificulta lectura)

### Cómo aplicar

```css
.tarjeta-cliente {
  background-color: #D9ECFA;  /* blue-100 */
  background-image: url('/patterns/gotas-leche-azules.svg');
  background-repeat: repeat;
  background-size: 90px 90px;
  background-blend-mode: normal;
}
```

---

## 🌿 2. Hojas de pasto realistas

**Patrón orgánico con detalle botánico.** Evoca el pasto andino de Cajamarca, refuerza identidad rural.

### Especificación SVG

```xml
<svg viewBox="0 0 120 100">
  <pattern id="leaf" x="0" y="0" width="120" height="100">
    <!-- Hoja grande (forma de lágrima con nervadura) -->
    <g transform="translate(30 55)">
      <path d="M0 0 Q-8 -20 -2 -40 Q8 -42 10 -20 Q5 -2 0 0 Z"
            fill="#88D088" stroke="#2A782A" stroke-width="0.8"/>
      <line x1="0" y1="0" x2="2" y2="-36" stroke="#2A782A" stroke-width="0.6" opacity="0.6"/>
      <path d="M-1 -10 Q-5 -12 -7 -8 M-2 -20 Q-7 -22 -8 -18 M-2 -30 Q-7 -32 -8 -28"
            stroke="#2A782A" stroke-width="0.4" fill="none" opacity="0.4"/>
    </g>
    <!-- Hoja mediana inclinada derecha -->
    <g transform="translate(75 50) rotate(35)">
      <path d="M0 0 Q-7 -18 -2 -32 Q7 -34 8 -18 Q4 -2 0 0 Z"
            fill="#2A782A" stroke="#184318" stroke-width="0.8"/>
      <line x1="0" y1="0" x2="1" y2="-28" stroke="#FAF8F3" stroke-width="0.6" opacity="0.5"/>
    </g>
    <!-- Briznas de pasto alrededor -->
    <path d="M15 75 Q17 65 19 75" stroke="#88D088" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M55 80 Q58 68 60 80" stroke="#2A782A" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M95 75 Q97 65 100 75" stroke="#88D088" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M50 85 Q52 78 55 85" stroke="#2A782A" stroke-width="1" fill="none" stroke-linecap="round"/>
  </pattern>
</svg>
```

### Dónde usar

- ✅ **Hero del web admin** (sobre `green-500` oscuro, opacidad 30-40%)
- ✅ **Onboarding** del app móvil (solo el slide de bienvenida)
- ✅ **Splash screen** secundario
- ✅ **Material impreso** (folletería, tarjetas de presentación)
- ❌ **Inputs o cards** (dificulta lectura del texto)
- ❌ **Fondo de pantallas con datos** (tablas, listas)

### Cómo aplicar

```css
.hero-web {
  background-color: #2A782A;  /* green-500 */
  background-image: url('/patterns/hojas-pasto.svg');
  background-repeat: repeat;
  background-size: 120px 100px;
  opacity: 0.95;  /* deja que el patrón se opaque */
}
.hero-web::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(42, 120, 42, 0.6);  /* capa verde para suavizar el patrón */
}
```

---

## ⚪ 3. Puntos crema

**Patrón geométrico sutil.** Útil para web admin donde se quiere orden visual sin distracción.

### Especificación SVG

```xml
<svg viewBox="0 0 30 30">
  <pattern id="dots" x="0" y="0" width="30" height="30">
    <circle cx="15" cy="15" r="2.5" fill="#B89766" opacity="0.5"/>
    <circle cx="0" cy="0" r="2" fill="#B89766" opacity="0.3"/>
    <circle cx="30" cy="0" r="2" fill="#B89766" opacity="0.3"/>
    <circle cx="0" cy="30" r="2" fill="#B89766" opacity="0.3"/>
    <circle cx="30" cy="30" r="2" fill="#B89766" opacity="0.3"/>
  </pattern>
</svg>
```

### Dónde usar

- ✅ **Web admin** (tablas densas, headers de sección)
- ✅ **Documentos administrativos** (SUNAT, contratos)
- ✅ **Loading screens** del app móvil (animado suavemente)
- ❌ **Hero** (queda muy plano, mejor los orgánicos)
- ❌ **Tarjetas de cliente** (se siente "tech")

### Cómo aplicar

```css
.web-admin-header {
  background-color: #FAF8F3;  /* cream-50 */
  background-image: url('/patterns/puntos-crema.svg');
  background-repeat: repeat;
  background-size: 30px 30px;
}
```

---

## 📄 4. Textura papel crema (noise)

**Textura sutil usando filtro SVG de ruido.** Da calidez sin distraer. Perfecta para boletas PDF y emails.

### Especificación SVG

```xml
<svg viewBox="0 0 400 220">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 0.7   0 0 0 0 0.65   0 0 0 0 0.55   0 0 0 0.08 0"/>
    </filter>
  </defs>
  <rect width="400" height="220" filter="url(#grain)"/>
</svg>
```

### Dónde usar

- ✅ **Boletas PDF** (fondo completo, opacidad 60%)
- ✅ **Emails transaccionales** (header con textura)
- ✅ **Marketing de marca** (folletos digitales, anuncios)
- ✅ **Sección "historia" del web admin**
- ❌ **App móvil** (no se aprecia en pantallas chicas)
- ❌ **Tablas o formularios** (distrae)

### Cómo aplicar

```css
.boleta-pdf {
  background-color: #FAF8F3;
  background-image: url('/patterns/papel-crema.svg');
  background-blend-mode: multiply;
  background-size: 400px 220px;
  background-repeat: repeat;
}
```

---

## 🪵 5. Madera kraft (textura opcional)

**Textura que evoca madera cálida.** Solo para una sección muy específica del web admin.

### Especificación SVG

```xml
<svg viewBox="0 0 400 8">
  <pattern id="wood" x="0" y="0" width="400" height="8">
    <path d="M0 4 Q100 0 200 4 T400 4" stroke="#D9CCA8" stroke-width="0.8" fill="none" opacity="0.4"/>
    <path d="M0 8 Q150 4 300 8 T600 8" stroke="#B89766" stroke-width="0.5" fill="none" opacity="0.3"/>
  </pattern>
</svg>
```

### Dónde usar

- ✅ **Sección "artesanal" del web admin** (si existe)
- ✅ **Packaging físico** (cajas, etiquetas de productos)
- ❌ **App móvil** (distrae)
- ❌ **Boletas PDF** (compite con la información)

---

## 🚦 Reglas duras (todas las texturas y patrones)

### Lo que SIEMPRE

1. **Opacidad 30-60%** sobre el fondo — nunca compiten con el texto
2. **Solo 1-2 colores de la paleta** por patrón
3. **SVG repetible** usando `<pattern>` o PNG seamless tileable
4. **Coherencia con la marca** — solo verde/crema/azul de la paleta
5. **Validar bajo sol directo** — un patrón con buen contraste en oficina puede ser ilegible al sol
6. **Comprimir SVG** antes de producción (svgo, ~50% reducción)

### Lo que NUNCA

1. **NUNCA gradientes** en patrones — rompe el flat design
2. **NUNCA patrones de alto contraste** en app móvil
3. **NUNCA mezclar más de 2 patrones** en la misma pantalla
4. **NUNCA usar un patrón como fondo de un input o formulario** (dificulta la escritura)
5. **NUNCA patrones con logos o marcas de agua** visibles (distrae y se ve poco profesional)
6. **NUNCA usar la misma textura en la app móvil y el web admin** (la app necesita limpieza visual por el sol)

---

## 📐 Implementación por plataforma

### Web (React / Next.js)

```tsx
// components/PatternBackground.tsx
export const PatternBackground = ({ children, variant = 'drops' }) => (
  <div className={`pattern-bg pattern-${variant}`}>
    {children}
  </div>
);

// styles/patterns.module.css
.pattern-bg {
  position: relative;
  background-repeat: repeat;
  background-size: 90px 90px;
}
.pattern-drops { background-image: url('/patterns/gotas-leche-azules.svg'); }
.pattern-leaves { background-image: url('/patterns/hojas-pasto.svg'); background-size: 120px 100px; }
.pattern-dots { background-image: url('/patterns/puntos-crema.svg'); background-size: 30px 30px; }
```

### Flutter

```dart
// assets/patterns/gotas_leche.svg en pubspec.yaml
Container(
  decoration: BoxDecoration(
    color: Color(0xFFD9ECFA),  // blue-100
    image: DecorationImage(
      image: AssetImage('assets/patterns/gotas_leche.svg'),
      repeat: ImageRepeat.repeat,
    ),
  ),
  child: YourContent(),
)
```

### iOS SwiftUI

```swift
// Agregar SVG al bundle via Assets.xcassets
ZStack {
  Color(red: 0.85, green: 0.93, blue: 0.98)  // blue-100
  Image("patron_gotas_leche")
    .resizable(resizingMode: .tile)  // .tile = repeat
  // Tu contenido encima
}
```

---

## 📁 Estructura de archivos

```
6-patrones-y-texturas/
├── README.md                    # Este archivo
├── comparativa-patrones.html    # Vista previa interactiva
└── assets/                      # (a crear) Los 5 SVGs optimizados
    ├── gotas-leche-azules.svg
    ├── hojas-pasto.svg
    ├── puntos-crema.svg
    ├── papel-crema.svg
    └── madera-kraft.svg
```

---

## ✅ Checklist de implementación

- [ ] Generar los 5 SVGs optimizados (svgo o similar) y guardarlos en `assets/`
- [ ] Comprobar cada SVG con la paleta Milkbook exacta
- [ ] Probar el patrón de hojas de pasto en el hero del web admin
- [ ] Verificar que la textura de papel crema se ve bien en boletas PDF generadas
- [ ] Validar que los patrones NO distraen bajo sol directo (probar en el celular de Carlos al mediodía)
- [ ] Documentar tokens CSS o Flutter del sistema
- [ ] Comprimir todos los SVGs para producción (target: cada uno < 5KB)
- [ ] Validar con Carlos y Juan: ¿los patrones refuerzan o distraen?

---

## 🔗 Referencias

### Manuales de marca consultados

- **Fluent 2 — Shapes:** https://fluent2.microsoft.design/shapes
- **Atlassian Design System — Radius:** https://atlassian.design/foundations/radius
- **Material Design 3 — Shape:** https://m3.material.io/styles/shape
- **Hero Patterns (Steve Schoger):** https://heropatterns.com
- **Transparent Textures (papel crema):** https://www.transparenttextures.com
- **Marlo Studios — Graphic Elements:** https://marlostudios.co/blogs/journal/graphic-elements
- **Designsystemproblems — Border Radius Tokens:** https://designsystemproblems.com/token-management/border-radius-tokens/

### Marcos teóricos

- Border radius como diferenciador de marca: tokens que expresan la "personalidad geométrica" (sharp/medium/pill)
- Principio de "nested radii": radio interno = radio externo - gap entre elementos
- Para rural/agro: texturas de papel kraft y noise sutil evocan artesanía sin ser literal

### Proyecto

- Paleta: [`../2-paleta-de-colores/`](../2-paleta-de-colores/)
- Tipografía: [`../3-tipografia/`](../3-tipografia/)
- Iconografía: [`../4-iconografia/`](../4-iconografia/)
- Estilo fotográfico: [`../5-estilo-fotografico/`](../5-estilo-fotografico/)
- Vista previa interactiva: [`./comparativa-patrones.html`](./comparativa-patrones.html)
