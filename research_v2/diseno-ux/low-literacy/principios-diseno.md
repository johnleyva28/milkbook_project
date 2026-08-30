# Diseño UX para Usuarios con Baja Alfabetización

## Contexto

El lechero y el cliente rural a menudo tienen:
- **Baja alfabetización digital** (a veces baja alfabetización general).
- **Familiaridad limitada con smartphones** (algunos con WhatsApp únicamente).
- **Cansancio físico** (largas jornadas de trabajo).
- **Condiciones difíciles** (sol, moto, prisa, ruido).
- **Edad media 40-55 años.**

## Principios de diseño (basados en investigación)

Basado en el framework SARAL de Srivastava et al. (2021) y la investigación de Medhi et al. sobre usuarios no-alfabetizados:

### 1. Múltiples modalidades (G1)
- **Visual** (iconos, colores, números) — primary.
- **Textual** (pocos labels) — secondary.
- **Audio** (opcional, futuras versiones) — para usuarios con dificultad lectora.

### 2. Aprovechar alfabetización numérica (G2)
- Los usuarios se sienten cómodos con números.
- Usar números prominentemente, no solo texto.
- Ej: "18 L" es más claro que "dieciocho litros".

### 3. Interfaz minimalista (G3)
- Máximo 1 acción principal por pantalla.
- Mucho espacio en blanco.
- Pocos elementos visuales.

### 4. Cues visuales (G4)
- Colores fuertes para acciones primarias (verde = confirmar, rojo = error).
- Iconos grandes, coloridos.
- No depender solo del color (usar también forma/posición).

### 5. Texto simple (G5)
- Vocabulario cotidiano, no técnico.
- "Confirmar" no "Validar".
- "Litros" no "Volumen en unidades métricas".

### 6. Información chunked (G6)
- Romper información compleja en pedazos.
- Una pantalla = una decisión.

### 7. Navegación simple (G7)
- Máximo 3 niveles de profundidad.
- Navegación lineal, no jerárquica cuando es posible.

### 8. Diseñar para tap, no para scroll (G8)
- Toda la información importante visible sin scroll.
- Bottom navigation con máximo 4 tabs.

### 9. Diseñar culturalmente (G11)
- Iconos reconocibles culturalmente.
- No usar iconos internacionales si no son familiares.
- Probar con usuarios reales.

## Implementación visual

### Tipografía

- **Fuente:** Inter o Roboto (legible en baja resolución).
- **Tamaño base:** 16sp (no 14sp, demasiado pequeño).
- **Botones primarios:** 18sp bold.
- **Números grandes:** 28sp (en display, p.ej. litros).
- **Pesos:** 400 (regular) y 700 (bold) solamente.

### Paleta de colores

| Color | Uso | Hex |
| --- | --- | --- |
| Verde confianza | Confirmar, acción positiva | #2E7D32 |
| Azul leche | Color primario, branding | #1976D2 |
| Amarillo alerta | Advertencia, pendiente | #F9A825 |
| Rojo discrepancia | Error, cancelar, eliminar | #C62828 |
| Gris texto | Texto principal | #212121 |
| Gris claro | Fondos, divisores | #F5F5F5 |

### Espaciado

- **Mínimo 16dp** entre elementos interactivos.
- **Mínimo 48dp × 48dp** para tap targets (recomendado 60dp+).
- **Padding de 16-24dp** en pantallas.
- **Sin bordes** innecesarios; usar espacio y color.

### Iconos

- **Tamaño mínimo:** 32dp.
- **Tamaño recomendado:** 48dp.
- **Color:** sólido (no outline) para mayor visibilidad.
- **Estilo:** Material Icons filled (más visible que outlined).
- **Con label** SIEMPRE debajo (accesibilidad).

## Patrones de UI específicos

### Botón primario

```
┌──────────────────────────────┐
│                              │
│      CONFIRMAR 18.5 L        │   ← Grande, verde, bold
│                              │
└──────────────────────────────┘
```

- 80-100dp de alto.
- Color verde.
- Texto blanco, 18-20sp, bold.
- Texto SIEMPRE en mayúsculas.
- Haptic feedback al tap.
- Animación de press.

### Botón secundario

```
┌──────────────────────────────┐
│                              │
│      Cancelar                │   ← Menos prominente
│                              │
└──────────────────────────────┘
```

- Borde gris, fondo blanco.
- Texto gris, 16sp.
- O: text button simple.

### Input numérico

```
┌──────────────────────────────┐
│                              │
│         1 8 . 5  L          │   ← 28sp, bold
│                              │
└──────────────────────────────┘
```

- Caja grande (80dp alto).
- Borde grueso (2dp) en estado normal.
- Borde azul grueso (3dp) en estado focus.
- Botón clear visible si hay valor.
- Soporte para teclado numérico decimal.

### Discrepancia banner

```
┌──────────────────────────────────────┐
│  ⚠️  Carlos registró 18 L,           │
│      tú confirmaste 18.5 L           │
│  [Discutir]  [Aceptar Carlos]       │
└──────────────────────────────────────┘
```

- Color amarillo de fondo (#FFF8E1).
- Borde amarillo a la izquierda (4dp).
- Texto legible.
- Acciones claras.

### Confirmación visual

```
✓ 18.5 L confirmados
```

- Checkmark grande verde.
- Texto breve.
- Animación de "stamp".

## Accesibilidad

### Contraste
- Ratio mínimo 4.5:1 (WCAG AA).
- Verificar con herramientas como WebAIM Contrast Checker.

### Tamaño de texto
- Respetar `MediaQuery.textScaleFactor` del usuario.
- Si el usuario agranda el texto, los layouts deben escalar.

### Lectores de pantalla (TalkBack/VoiceOver)
- Todos los elementos interactivos con `Semantics(label: "...")`.
- Labels descriptivos, no técnicos.

```dart
Semantics(
  label: "Confirmar 18.5 litros",
  button: true,
  child: ElevatedButton(
    onPressed: () => ...,
    child: Text("CONFIRMAR"),
  ),
)
```

### Modo alto contraste
- Soportado nativamente por el sistema.
- Solo verificar que los colores custom funcionen.

## Testing con usuarios reales

### Reclutamiento
- Mínimo 5-10 lecheros y 5-10 clientes.
- Variedad de edades, géneros, niveles de alfabetización.
- Idealmente: de la zona de Celendín, Llacanora o Namora.

### Metodología
- **Test de usabilidad moderado** (con tareas específicas).
- **Entrevista semi-estructurada** antes y después.
- **Think-aloud protocol** (que digan en voz alta lo que piensan).

### Tareas críticas a probar
1. "Confirmar 20 litros del día" (cliente).
2. "Marcar que no vendí hoy" (cliente).
3. "Registrar visita con 18.5 litros" (lechero).
4. "Registrar adelanto de 300 soles" (lechero).
5. "Cerrar el contrato y generar boleta" (lechero).
6. "Ver cuánto me deben" (cliente).

### Métricas a medir
- **Tasa de éxito** por tarea (target > 90%).
- **Tiempo promedio** por tarea (target < 30s para tareas simples).
- **Errores** (target < 1 por tarea en usuarios expertos).
- **Satisfacción** (target NPS > 30).

## Iteración

- **Versión 1** → Test con 3 usuarios → Ajustes.
- **Versión 2** → Test con 5 usuarios → Ajustes.
- **Versión 3** → Test con 10 usuarios → Release.
- **Post-release** → Monitoreo continuo de uso real.

## Referencias

- Srivastava, A., Kapania, S., Tuli, A., & Singh, P. (2021). "Actionable UI Design Guidelines for Smartphone Applications Inclusive of Low-Literate Users." _Proc. ACM Hum.-Comput. Interact._, 5(CSCW1).
- Medhi, I., et al. (2011). "Designing Mobile Interfaces for Novice and Low-literacy Users." _ACM Trans. Comput.-Hum. Interact._
- Medhi, I., & Toyama, K. (2015). "User Interface Design for Low-Literate and Novice Users: Past, Present and Future." _Found. Trends Hum.-Comput. Interact._
- MicroSave (2017). "Mobile Wallet Design for Oral Users." _Briefing Note #168_.
- Microsoft Research. "UIs for Low-Literate Users." https://www.microsoft.com/en-us/research/project/uis-low-literate-users/
- GSMA. "AgriTech UX Design Guidebook." (2025). https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/agritech-ux-design-guidebook/

## Próximo documento

- [`../quick-entry/`](../../diseno-ux/quick-entry/) — Patrón de entrada rápida.
- [`../offline-ux/`](../../diseno-ux/offline-ux/) — UX específica para modo offline.