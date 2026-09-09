# 🎨 5_design_system — Sistema de diseño específico para móvil

> **Design system específico para las apps móviles de MilkBook.** Esta carpeta documenta los tokens visuales, componentes, patrones de pantallas y consideraciones de accesibilidad que se aplican en las dos apps (lechero y cliente).

**Hereda de:** [`../../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/`](../../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/) y [`../../1_identidad_de_marca/1_identidad_visual/3-tipografia/`](../../1_identidad_de_marca/1_identidad_visual/3-tipografia/) (la paleta y tipografía oficiales).

---

## 📂 Archivos

| Archivo | Contenido |
|---|---|
| [`README.md`](./README.md) | Este archivo (índice) |
| [`DS-01_tokens_movil.md`](./DS-01_tokens_movil.md) | Tokens específicos para móvil (extensión de los generales) |
| [`DS-02_componentes_movil.md`](./DS-02_componentes_movil.md) | Catálogo de componentes Flutter |
| [`DS-03_patrones_pantallas_movil.md`](./DS-03_patrones_pantallas_movil.md) | Patrones de pantallas recurrentes |
| [`DS-04_accesibilidad_baja_alfabetizacion.md`](./DS-04_accesibilidad_baja_alfabetizacion.md) | Cómo diseñar para usuarios de baja alfabetización |

---

## 🎯 Lo que esta carpeta agrega al manual de marca

El manual de marca general define:
- ✅ Paleta de colores
- ✅ Tipografía
- ✅ Iconografía
- ✅ Sistema de composición
- ✅ Formas y elementos

**Esta carpeta define cómo aplicar TODO eso específicamente a:**
- App móvil (lechero + cliente)
- Web admin
- Web lechero
- Portal cliente web

Más:
- Patrones de pantallas específicos (registro, cierre, etc.)
- Componentes concretos (Button, Card, BottomNav, etc.)
- Reglas de accesibilidad para baja alfabetización

---

## 🔗 Conexiones con otros docs

### Hereda de
- Paleta: [`../../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/`](../../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/)
- Tipografía: [`../../1_identidad_de_marca/1_identidad_visual/3-tipografia/`](../../1_identidad_de_marca/1_identidad_visual/3-tipografia/)
- Iconografía: [`../../1_identidad_de_marca/1_identidad_visual/4-iconografia/`](../../1_identidad_de_marca/1_identidad_visual/4-iconografia/)
- Composición: [`../../1_identidad_de_marca/1_identidad_visual/8-sistema-de-composicion/`](../../1_identidad_de_marca/1_identidad_visual/8-sistema-de-composicion/)

### Aplica a
- Wireframes: [`../1_wireframes/`](../1_wireframes/)
- Mockups HTML: [`../2_mockups/`](../2_mockups/)
- Prototipos: [`../3_prototipos/`](../3_prototipos/)
- User flows: [`../4_user_flows/`](../4_user_flows/)

---

## 🎨 Jerarquía de tokens

```
┌─────────────────────────────────────┐
│ Brand Tokens (1_identidad_de_marca)  │  ← Color, tipografía, logo
│ - Paleta (cream-50, green-500, etc.)│
│ - Tipografía (Inter, Atkinson)       │
└────────────────┬────────────────────┘
                 ↓ hereda
┌─────────────────────────────────────┐
│ Global Tokens (composición, favicon)│  ← Espaciado, radios, sombras
│ - --space-4 (16dp)                   │
│ - --radius-md (8px)                  │
└────────────────┬────────────────────┘
                 ↓ hereda
┌─────────────────────────────────────┐
│ Mobile Tokens (este design system)   │  ← Touch targets, safe areas
│ - --touch-primary (60dp)             │
│ - --bottom-nav-h (56dp)              │
│ - --status-bar-h (24dp)              │
└────────────────┬────────────────────┘
                 ↓ aplica
┌─────────────────────────────────────┐
│ Componentes (DS-02)                  │  ← Botones, cards, inputs
│ - ButtonPrimary, ButtonSecondary    │
│ - Card, CardFeatured                │
│ - Input, QuickButton                │
└────────────────┬────────────────────┘
                 ↓ compone
┌─────────────────────────────────────┐
│ Pantallas (1_wireframes)            │  ← Las 15 pantallas documentadas
└─────────────────────────────────────┘
```

---

## 📋 Convenciones de nomenclatura

```css
/* Colores: --color-{rol}-{intensidad} */
--color-bg-primary: var(--cream-50);
--color-text-primary: var(--text);
--color-accent: var(--green-500);

/* Espaciado: --space-{n} (multiplos de 4) */
--space-1: 4px;
--space-4: 16px;

/* Radius: --radius-{size} */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;

/* Tipografía: --font-{rol} */
--font-ui: 'Inter';
--font-data: 'Atkinson Hyperlegible';
--font-display: 'Fraunces';

/* Componentes: --{componente}-{propiedad} */
--button-primary-bg: var(--green-500);
--button-primary-fg: white;
--card-bg: white;
--card-border: var(--cream-300);
```

---

## 🧪 Cómo validar

1. **Revisar mockups HTML** (`../2_mockups/`) y verificar que aplican los tokens correctamente.
2. **Revisar prototipos** (`../3_prototipos/`) y verificar la consistencia.
3. **Test de usabilidad** con Carlos y Juan reales (ver `../4_user_flows/UF-08_onboarding_primer_uso.md`).
4. **Code review** del código Flutter para verificar que los tokens se aplican.

---

## 📊 Métricas de diseño

| Métrica | Meta | Cómo medir |
|---|---|---|
| Tiempo de carga primera pantalla | < 2 seg | Performance |
| Tiempo de carga sub-pantalla | < 300 ms | Performance |
| Tamaño binario app | < 30 MB | Build size |
| FPS scroll | > 55 FPS | Performance |
| Crash-free sessions | > 99.5% | Sentry |
| % de toques con éxito al primer intento | > 85% | Analytics |
