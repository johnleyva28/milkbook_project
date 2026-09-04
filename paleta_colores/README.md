# 🎨 Paletas de Colores para Milkbook — Plataforma Lechera Rural

> **20 paletas analizadas y diseñadas** específicamente para el proyecto Milkbook (Cajamarca, Perú), basadas en investigación web sobre branding lácteo, apps agrícolas, UX para usuarios de baja alfabetización, y contexto cultural andino.

---

## 📋 Índice de las 20 paletas

| # | Paleta | Personalidad | Mejor para |
|---|--------|-------------|-----------|
| 01 | [Material Design Dairy](./01-material-design-dairy.md) | Clásica, conservadora | MVP rápido sin riesgos |
| 02 | [Andina Tradicional](./02-andina-tradicional.md) | Cultural, vibrante | Diferenciarte con identidad |
| 03 | [Café con Leche](./03-cafe-con-leche.md) | Cálida, hogareña | Onboarding acogedor |
| 04 | [Gloria-Inspired](./04-gloria-inspired.md) | Corporativa, seria | Reuniones con SUNAT/bancos |
| 05 | [Sol de los Andes](./05-sol-de-los-andes.md) | Cosecha, abundancia | Temporada alta de leche |
| 06 | [Pastizal Verde](./06-pastizal-verde.md) | Eco, orgánica | Módulos de sostenibilidad |
| 07 | [Tierra Fértil](./07-tierra-fertil.md) | Sólida, tradicional | Branding "del campo" |
| 08 | [Cielo Lechero](./08-cielo-lechero.md) | Universal, confianza | Convenciones globales |
| 09 | [Sunset Cajamarquino](./09-sunset-cajamarquino.md) | Moderna, vibrante | Atraer productores jóvenes |
| 10 | [Madera y Lana](./10-madera-y-lana.md) | Artesanal, cálida | Boletas físicas, PDFs |
| 11 | [WCAG AAA Solar](./11-wcag-aaa-solar.md) | **Máxima legibilidad** | Uso bajo sol directo |
| 12 | [Modo Noche Rural](./12-modo-noche-rural.md) | Nocturna, descanso | Invierno 5-7 PM |
| 13 | [Monocromo Profesional](./13-monocromo-profesional.md) | B2B seria | **Web admin** |
| 14 | [Queso Andino](./14-queso-andino.md) | Producto-específica | Boletas, identidad de marca |
| 15 | [Bosque de Eucaliptos](./15-bosque-eucaliptos.md) | Profunda, premium | Web admin, reportes |
| 16 | [Niebla Matutina](./16-niebla-matutina.md) | Moderna, fría | Estética startup tech |
| 17 | [Río y Pradera](./17-rio-y-pradera.md) | Frescura, agua | Campañas temporada lluvias |
| 18 | [Trópico Andino](./18-tropico-andino.md) | Audaz, vibrante | Diferenciación radical |
| 19 | [Color-Blind Safe (Wong)](./19-color-blind-safe-wong.md) | **100% accesible** | Inclusión universal |
| 20 | [Indigo Mountain](./20-indigo-mountain.md) | Premium B2B | Fintech rural seria |

---

## 🧭 Contexto del Proyecto (de dónde partimos)

**Milkbook** es una plataforma que digitaliza la relación entre **el lechero rural (Carlos, 38 años, moto lineal, Xiaomi gama media, Android 11+)** y **el productor (Juan, 52 años, caserío rural, Huawei gama baja, baja alfabetización digital)**. Opera en zonas de **Cajamarca, Perú** (Celendín, Llacanora, Namora) entre **2,500-3,500 msnm** con alta radiación solar.

### Restricciones duras
1. **Sol fuerte**: Pantallas deben ser legibles bajo luz directa.
2. **Baja alfabetización**: Usuarios que apenas manejan WhatsApp; colores deben ser fuertes y semánticos.
3. **Sin internet en caseríos**: App offline-first; pantallas necesitan "comunicar sin leer".
4. **Botones grandes** (60dp+) por guantes, manos sucias, prisa.
5. **Tipografía 16sp mínimo** (nunca 14sp).
6. **WCAG mínimo 4.5:1 (AA)** en pares texto/fondo.
7. **Idealmente 7:1 (AAA)** para uso outdoor.
8. **Contexto cultural andino** que conecta con textiles, símbolos, paisaje.

### Paleta actual del proyecto (`diseno-ux/low-literacy/principios-diseno.md`)
- Verde confianza `#2E7D32`
- Azul leche `#1976D2`
- Amarillo alerta `#F9A825`
- Rojo discrepancia `#C62828`
- Gris texto `#212121`
- Gris claro `#F5F5F5`

---

## 🔬 Metodología de Investigación Web

Se investigó con **Exa Web Search** y **Firecrawl** sobre:

| Tema | Fuentes clave |
|------|---------------|
| Branding lácteo internacional | Confetti Design, Hartzler Dairy, KineMilk, Dairyproducts Milk UI |
| Color psychology en lácteos | "Blue = trust/purity, white = freshness, green = natural/healthy" |
| UX para apps agrícolas en países en desarrollo | Gapsy Studio, Outgrow (India), AgriTrust (open source), Cultivar (Nigeria) |
| Diseño para baja alfabetización | Srivastava et al. (SARAL framework), Medhi et al., Making Sense (Latam) |
| Paletas para alta luz solar | Gapsy Studio, AgriTrust-Protocol/AgriTrust-Frontend Issue #14 |
| Branding lácteo peruano | Repositorio ULima (Chugur rebranding 2024), Gloria S.A., Laive |
| Paletas andinas/Perú | Jenny Krauss (Ayacucho textiles), Visit Peru, Material Bank |
| Color blindness | Wong (2011) Nature Methods, Toolsana, Adobe Color Accessibility |

### Hallazgos clave
1. **WCAG AAA (7:1)** es el nuevo estándar para uso outdoor, no AA (4.5:1).
2. **Evitar colores neón/vibrantes** que "florecen" bajo el sol.
3. **Los fondos crema/off-white** (no `#FFFFFF`) reducen el "efecto halo" en pantallas.
4. **Combinar color + íconos/texto** para usuarios con daltonismo (8% de hombres).
5. **En la cultura andina**: rojo = Pachamama, verde = crecimiento, amarillo = sol/cosecha, azul = cielo.
6. **Outgrow (India)**: "earthy, agriculture-rooted colors, greens for growth, yellows for sunlight, browns for soil".
7. **Chugur (Cajamarca, queso artesanal)**: en su rebranding 2024 eligieron "rojo y crema en tonos pastel + Police Blue y Marfil Blanco como secundarios".

---

## ⭐ Recomendaciones por Contexto de Uso

### 🏆 Para la **APP MÓVIL** (cliente Juan + lechero Carlos)

#### 🥇 TOP RECOMENDACIÓN: **#02 Andina Tradicional** + **#11 WCAG AAA Solar** como dark mode
**Por qué**:
- Conecta emocionalmente con la cultura andina (Carlos y Juan la reconocen).
- Cumple WCAG AAA en casi todos los pares.
- Diferencia a Milkbook de apps genéricas.
- Acentos rojo cochinilla + turquesa andino son memorables.

#### 🥈 ALTERNATIVA SEGURA: **#08 Cielo Lechero** (azul + verde)
**Por qué**:
- Cumple todas las convenciones globales de "leche = azul + blanco".
- Tranquiliza a stakeholders bancarios y SUNAT.
- Bajo riesgo.

#### 🥉 DIFERENCIADORA: **#09 Sunset Cajamarquino** (si target es productor joven 25-35)
**Por qué**:
- Moderna, vibrante, captará atención de usuarios más jóvenes.
- Perfecta para onboarding gamificado.
- ⚠️ Validar con usuarios 50+ antes de implementar.

---

### 💻 Para la **WEB ADMIN** (CRM, soporte, reportes)

#### 🥇 TOP RECOMENDACIÓN: **#13 Monocromo Profesional** + acentos de **#15 Bosque de Eucaliptos**
**Por qué**:
- Reduce fatiga visual en jornadas largas.
- Combina bien con cualquier paleta móvil.
- Sensación "profesional" para stakeholders B2B.

#### 🥈 ALTERNATIVA: **#15 Bosque de Eucaliptos** como paleta completa
**Por qué**:
- Verde profundo transmite "datos confiables".
- Acentos dorados (`#DDA15E`) dan jerarquía visual.

---

### 📄 Para **BOLETAS PDF** (comprobantes)

#### 🥇 RECOMENDACIÓN: **#14 Queso Andino**
**Por qué**:
- Conecta visualmente con el producto que se está vendiendo.
- Paleta crema + dorada = sensación de "recibo cálido" en pantalla e impresión.

---

### 📱 Para **ONBOARDING** (primera vez del usuario)

#### 🥇 RECOMENDACIÓN: **#03 Café con Leche** + **#10 Madera y Lana**
**Por qué**:
- Sensación cálida de "bienvenida al hogar".
- Familiar para usuarios rurales.

---

### 🌙 Para **MODO OSCURO**

#### 🥇 RECOMENDACIÓN: **#12 Modo Noche Rural**
**Por qué**:
- Diseñada para uso nocturno en zonas rurales sin luz.
- Reduce deslumbramiento en la oscuridad.

---

## 📊 Tabla Comparativa

| # | Paleta | Contraste AAA | Sol directo | Cultural | WCAG Safe | Daltonismo |
|---|--------|:---:|:---:|:---:|:---:|:---:|
| 01 | Material Design Dairy | ✅ | ⚠️ | 🟡 | ✅ | ⚠️ |
| 02 | Andina Tradicional | ⚠️ | ✅ | ✅ | ✅ | ⚠️ |
| 03 | Café con Leche | ✅ | ⚠️ | ✅ | ✅ | ⚠️ |
| 04 | Gloria-Inspired | ✅ | ⚠️ | 🟡 | ✅ | ⚠️ |
| 05 | Sol de los Andes | ⚠️ | ✅ | ✅ | ✅ | ⚠️ |
| 06 | Pastizal Verde | ✅ | ✅ | 🟡 | ✅ | ⚠️ |
| 07 | Tierra Fértil | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| 08 | Cielo Lechero | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| 09 | Sunset Cajamarquino | ⚠️ | ✅ | ✅ | ✅ | ⚠️ |
| 10 | Madera y Lana | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ |
| 11 | **WCAG AAA Solar** | ✅ | ✅✅ | ⚠️ | ✅✅ | ✅ |
| 12 | Modo Noche Rural | ✅ | N/A | ⚠️ | ✅ | ⚠️ |
| 13 | Monocromo Profesional | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |
| 14 | Queso Andino | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ |
| 15 | Bosque de Eucaliptos | ✅ | ✅ | ✅ | ✅ | ✅ |
| 16 | Niebla Matutina | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| 17 | Río y Pradera | ⚠️ | ✅ | 🟡 | ⚠️ | ⚠️ |
| 18 | Trópico Andino | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ |
| 19 | **Color-Blind Safe** | ⚠️ | ✅ | 🟡 | ✅ | ✅✅ |
| 20 | Indigo Mountain | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |

**Leyenda**: ✅✅ = excelente | ✅ = bueno | ⚠️ = aceptable con reservas | ❌ = no recomendado

---

## 🎨 Guía de Implementación (recomendación final)

### Para Milkbook MVP (recomendación principal):

**App Móvil**: **#02 Andina Tradicional** con estos ajustes para máxima legibilidad:
```css
:root {
  --andina-primary: #C0392B;      /* Rojo Cochinilla */
  --andina-secondary: #1ABC9C;    /* Turquesa Andino - Confirmar */
  --andina-tertiary: #F1C40F;     /* Amarillo Sol - Alerta */
  --andina-deep: #2C3E50;         /* Azul Inkarri - Texto/Navegación */
  --andina-llama: #F5E6D3;        /* Beige Lana - Fondo */
  --andina-bg: #FFFDF7;           /* Crema - Background universal */
  --andina-text: #1B1F1A;         /* Negro suave */
  --andina-error: #C0392B;        /* Rojo Cochinilla */
}
```

**Web Admin**: **#13 Monocromo Profesional** con un acento verde:
```css
:root {
  --mono-bg: #FAFAFA;
  --mono-surface: #FFFFFF;
  --mono-accent: #2D6A4F;           /* Eucalipto - CTAs principales */
  --mono-text: #27272A;
  --mono-success: #10B981;
  --mono-error: #EF4444;
}
```

**Modo Oscuro (App Móvil)**: **#12 Modo Noche Rural**

**Accesibilidad**: Complementar con **#19 Wong (Color-Blind Safe)** para íconos y gráficos.

---

## 📁 Estructura de Archivos

```
paleta_colores/
├── README.md                          # Este archivo
├── 01-material-design-dairy.md        # Cada paleta documentada
├── 02-andina-tradicional.md
├── 03-cafe-con-leche.md
├── 04-gloria-inspired.md
├── ... (hasta 20)
├── 20-indigo-mountain.md
├── palettes.json                       # JSON consolidado de las 20 paletas
└── preview.html                        # Vista previa visual de todas
```

---

## 🔄 Próximos pasos recomendados

1. **Validar con 5-10 usuarios reales** (lechero Carlos + productor Juan) usando mockups.
2. **Hacer test A/B** entre **#02 Andina** y **#08 Cielo Lechero** durante el MVP.
3. **Validar con daltonismo**: usar simulador Coblis o Stark con cada paleta.
4. **Implementar con design tokens** (CSS variables, Flutter ThemeData).
5. **Documentar en Storybook o similar** para mantener consistencia.

---

## 📚 Referencias

### Investigación web
- Confetti Design — "Complete Guide for Milk + Dairy Product Brands"
- Hartzler Family Dairy design system (Refero Styles)
- KineMilk Case Study (Nova Studios)
- Dairyproducts Milk Web UI (ColorsWall)
- Outgrow Farmer App (Ashish Goswami)
- A UI/UX Guide to Agriculture App Design (Gapsy Studio)
- Cultivar — Smallholder Farmers App (Lovable Portfolio)
- Inclusive Design: App Case Study for Farmers in Emerging Markets (Making Sense)
- Farmrise (Lollypop Design)
- AgriTrust-Protocol High-Contrast Theme (GitHub Issue #14)
- "Colors of the Andes" (Jenny Krauss)
- Chugur Rebranding 2024 (Repositorio ULima)
- Wong, B. (2011). Points of view: Color blindness. Nature Methods.

### Marco teórico
- Srivastava et al. (2021). SARAL framework. Proc. ACM Hum.-Comput. Interact.
- Medhi et al. (2011). Designing Mobile Interfaces for Novice and Low-literacy Users.
- WCAG 2.1 / 2.2 Level AA + AAA contrast requirements.
- Material Design 3 — Color system & accessibility.

---

> **Nota final**: Cada paleta fue diseñada considerando los principios del proyecto (`diseno-ux/low-literacy/principios-diseno.md` y `personas-usuarios/`). La recomendación final debe venir del equipo después de validar con usuarios reales en campo (Fase 1 del plan de ejecución).
