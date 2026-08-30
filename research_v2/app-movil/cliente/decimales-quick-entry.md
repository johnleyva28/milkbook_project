# Quick Entry de Decimales — Patrón UX

## Concepto

Los **botones quick** (5, 10, 15, 20, 25, 30 L) cubren el 90% de los casos. Pero el lechero necesita registrar valores como 18.5 L o 7.25 L en zonas donde las vacas producen menos.

## Solución

Combinación de:
1. **Botones quick** para los valores comunes.
2. **Input manual** con teclado numérico y validación de decimales.
3. **Botones +/-** para ajuste fino.

## Implementación técnica

### Botones quick
- Widget: `QuickEntryButton`
- Props: `value: double, isSelected: bool, onTap: () => void`
- Tamaño mínimo: 80×80 dp (tap-friendly).
- Estado seleccionado: color primario + borde marcado.
- Estado normal: fondo claro + borde sutil.
- Haptic feedback al tap (vibración corta).

### Input manual
- Widget: `DecimalInput`
- Props: `initialValue: double?, maxValue: double = 100.0, decimals: int = 2`
- Tipo de teclado: `TextInputType.numberWithOptions(decimal: true)`
- Validación: regex `^\d{1,3}(\.\d{1,2})?$`
- Botón clear para borrar.

### Botones +/-
- Widget: `StepperButton`
- Props: `direction: 'up' | 'down', onTap: () => void`
- Incremento/decremento de 1 L.
- Mantiene valor actual (no resetea a 0).
- Long-press: incrementa/decrementa más rápido.

## Comportamiento esperado

### Juan quiere registrar 18.5 L

```
1. Juan ve los botones [5] [10] [15] [20]
2. Toca [20] (el más cercano)
3. Ve que el valor es 20 L
4. Toca [-] dos veces → valor es 18 L
5. Luego no hay +0.5, así que edita manualmente a 18.5
6. Confirma
```

### Carlos quiere registrar 7.25 L (caso edge)

```
1. Carlos ve los botones [5] [10]
2. Toca [5]
3. Toca [+] dos veces → 7 L
4. Edita manualmente a 7.25
5. Confirma
```

### Juan no vendió

```
1. Juan ve los botones
2. Activa switch "[ ] Hoy no vendí"
3. El input numérico se bloquea (visual: gris)
4. Confirma (no hay input que validar)
```

## Edge cases de decimales

### ¿Por qué hasta 2 decimales?
- Los medidores típicos no son más precisos.
- Los precios se manejan en céntimos (S/ 1.50), y los litros pueden ser 18.50.
- Más decimales serían ruido.

### ¿Por qué máximo 100 L?
- Una vaca produce ~5-15 L/día.
- 10 vacas × 15 L = 150 L/día (caso excepcional).
- 100 L/día es **un límite conservador** que cubre el 99.9% de casos.
- Si se supera, warning pero no bloqueo (el admin puede ver casos excepcionales).

### ¿Por qué input manual bloqueado si "No vendí"?
- Para evitar errores de UX.
- Refuerza la lógica: si no vendiste, no hay litros que registrar.

## Tema visual

### Colores de botones quick
- Cada botón un color sutilmente distinto:
  - 5 L → verde claro
  - 10 L → verde
  - 15 L → verde oscuro
  - 20 L → azul claro
  - 25 L → azul
  - 30 L → azul oscuro
- Esto ayuda a la memoria visual.
- Botón seleccionado: outline más grueso + icono check.

### Tipografía
- Números en botones: 24sp, bold.
- Input manual: 28sp (más grande, porque es la confirmación final).
- Etiquetas: 14sp regular.

## Animaciones y feedback

- Al tocar un botón quick: ripple + haptic.
- Al cambiar valor con +/-: scale animation (200ms).
- Al confirmar: success animation (checkmark + haptic largo).

## Accesibilidad

- **Tap targets**: mínimo 48×48 dp (cumple WCAG).
- **Contraste**: ratio mínimo 4.5:1.
- **Lectores de pantalla**: cada botón tiene `Semantics(label: "Confirmar 18.5 litros")`.
- **Modo alto contraste**: soportado.
- **Tamaño de texto escalable**: respeta configuración del sistema.

## Internacionalización futura

Si el sistema se expande a otras regiones:
- Los valores por defecto de los botones quick podrían cambiar (ej. en costa donde producen más).
- El sistema podría **aprender** los valores más frecuentes del productor y ajustar los botones.
- Esto es V2; por ahora, hardcoded por región.