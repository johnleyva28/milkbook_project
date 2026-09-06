# Milkbook — Prompts para Google Flow (mejora del logo v1)

> Basado en el análisis pixel-a-pixel del logo actual + la guía oficial de Flow (Nano Banana Pro) y mejores prácticas de prompting para logos.
> **Cómo usar:** abre Flow (labs.google/fx/tools/flow) → prompt box → modelo **Nano Banana Pro** → pega el prompt → Generate.
> Para ediciones: arrastra el logo actual como *ingredient* al prompt box y usa los prompts de refinamiento (3, 5, 8).

---

## Qué tiene tu logo v1 (verificado programáticamente)

- **Composición:** botella de leche central; cabeza de vaca detrás/encima asomando por la izquierda (manchas verdes y azules, no negras); planta/hierba saliendo a la derecha; wordmark "MilkBook" abajo en dos colores (azul "Milk" + verde "Book").
- **Colores exactos medidos:** azul pastel `#7EC7FD` (vaca y borde), verde pastel `#8ED28C`–`#9ED79E` (manchas de la vaca, planta, "Book"), fondo blanco puro `#FFFFFF` (77.6% del lienzo).
- **Problema principal:** el verde pastel dentro de la botella no es coherente con tu sistema de diseño, donde el verde es color de marca pero "la leche es crema" (regla de oro #5: "Los cremas evocan la leche").
- **Otros puntos:** fondo blanco puro (tu guía dice evitar `#FFFFFF` como fondo → usar `#FFFDF7`); sin versión icónica sin texto; bordes pastel de bajo contraste.

---

## PROMPT 1 — Rediseño del símbolo (sin texto) ✅ RECOMENDADO PARA EMPEZAR

```
Flat vector logo mark for "Milkbook", a milk delivery app for rural families in Cajamarca, Peru. A friendly cow head peeking from behind a milk bottle. The bottle is filled with soft cream white (#FFFDF7) representing fresh milk, with a warm caramel accent (#B89766) on the cap, and a soft sky blue (#78C0F8) outline. The cow is sky blue (#78C0F8) with cream (#FAF8F3) patches. A small fresh green (#88D088) leaf sprig near the bottle base. Bold rounded outlines, kawaii minimal style, flat design, no gradients, no shadows, white background, clean geometry, scalable, recognizable at 32px, sticker-friendly silhouette.
```

## PROMPT 2 — Símbolo + wordmark (combination mark)

```
Flat vector combination logo for "Milkbook", a milk delivery app for rural families in Cajamarca, Peru. A friendly cow head peeking from behind a milk bottle filled with soft cream white (#FFFDF7) milk. The cow is soft sky blue (#78C0F8) with cream (#FAF8F3) patches, with warm caramel (#B89766) horns. A tiny fresh green (#88D088) leaf sprig near the bottle base. Below the icon, the wordmark "MilkBook" in rounded friendly sans-serif, "Milk" in deep blue (#003965) and "Book" in deep green (#2A782A). Bold rounded outlines, kawaii minimal flat design, no gradients, no shadows, white background, clean geometry, works at 32px.
```

## PROMPT 3 — Edición del logo actual (arrastra milkbook_logo_v1.png como ingredient)

```
Edit this logo: keep the same composition — cow head peeking from behind the milk bottle — but remove all green color from inside the bottle. Fill the bottle with soft cream white (#FFFDF7) like fresh milk, and use warm caramel (#B89766) for the bottle cap. Keep the sky blue (#78C0F8) cow with its patches, and keep the small green leaf sprig. Keep bold rounded outlines and flat style. White background, no gradients, no shadows.
```

## PROMPT 4 — Variaciones para explorar (con Agent en Flow)

```
Give me 20 variations of this milk bottle and cow logo keeping the same composition: bottle filled with cream white (#FFFDF7), caramel cap (#B89766), sky blue cow (#78C0F8) with cream patches (#FAF8F3), tiny green leaf sprig (#88D088). Some variations slightly more geometric, some more kawaii, some badge style. All flat vector, white background, no gradients.
```

## PROMPT 5 — Test de silueta en un solo color (blanco y negro)

```
Single-color black version of this milk bottle and cow logo, one solid silhouette, strong recognizable shape at small size, no interior details that disappear at 24px, white background, flat vector.
```

## PROMPT 6 — Fallback simple (si el modelo no respeta colores específicos)

```
Simple flat logo of a milk bottle with a friendly cow head peeking from behind it. The bottle contains white milk (cream white #FFFDF7). The cow is soft blue with cream-colored patches and small caramel-colored horns. A tiny green leaf sprig next to the bottle. Flat vector, bold rounded outlines, kawaii minimal style, white background, no gradients, no shadows.
```

## PROMPT 7 — App icon (avatar / splash)

```
Flat vector app icon for a milk delivery app: milk bottle filled with cream white (#FFFDF7) with caramel cap (#B89766) and a friendly sky blue cow head peeking from behind, tiny green leaf sprig. Rounded square app icon format, centered composition, flat design, no gradients, no shadows, recognizable at 48px.
```

## PROMPT 8 — Reparación del wordmark (si el texto sale ilegible o mal escrito)

```
Keep the same overall direction, but rebuild the wordmark with clear, correctly spelled text "MilkBook" — "Milk" in deep blue (#003965), "Book" in deep green (#2A782A). Use simple rounded sans-serif letterforms, fewer custom cuts, no decorative distortion. Keep the flat style, white background.
```

## PROMPT 9 — Agent Instructions de Flow (contexto permanente del proyecto)

Pega en Agent Instructions → Add instruction (así el Agent ya conoce tu marca en toda la sesión):

```
Milkbook is a milk delivery and accounting app for rural dairy families in Cajamarca, Peru. Brand colors: cream white #FFFDF7 (milk, bottle fill), warm caramel #B89766 (cap, accents), soft sky blue #78C0F8 (cow, outlines), soft green #88D088 (leaf sprig only, never inside the bottle). Style: kawaii minimal flat vector, bold rounded outlines, no gradients, no shadows. All logos must work at 32px and in black-and-white.
```

---

## Checklist de evaluación (basado en la guía oficial de Flow / Nano Banana)

1. **Silueta:** ¿reconoces la botella+vaca entrecerrando los ojos / a 32px? Si no, descarta.
2. **Blanco y negro:** la marca debe seguir funcionando en un solo color (PROMPT 5).
3. **Colores exactos:** crema `#FFFDF7` en la botella, azul `#78C0F8` en la vaca, caramelo `#B89766` en tapa/cuernos, verde `#88D088` SOLO en la hoja — **nunca dentro de la botella**.
4. **Sin gradientes, sin sombras, sin 3D.**
5. **Texto:** no confíes en la IA para el wordmark final — genera el símbolo en Flow y agrega "MilkBook" en Figma/Illustrator con **Fraunces Medium 500** (tu fuente display oficial).
6. El resultado de Flow es un **concepto**: para el logo final, redibújalo en vector (SVG) con geometría limpia — es lo que recomienda la propia guía de Nano Banana para marcas profesionales.
