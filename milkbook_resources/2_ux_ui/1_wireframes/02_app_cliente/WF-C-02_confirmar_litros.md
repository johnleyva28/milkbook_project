# WF-C-02: Confirmar Litros — App Cliente (Juan)

> ⭐ **LA PANTALLA MÁS IMPORTANTE PARA JUAN.** Todos los días, Juan abre la app y ve esta pantalla. Debe ser rápida, clara y tolerante a errores.

## Contexto validado

- **Frecuencia:** todos los días.
- **Tiempo objetivo:** < 30 segundos por confirmación (incluyendo firma).
- **Juan a veces tiene las manos mojadas** después de ordeñar.
- **Juan a veces tiene poca batería** o sol directo en la cara.
- **Si Carlos ya marcó "✓ Recogido"**, Juan ve la cantidad pre-llenada.

## Datos que muestra

### Caso A: Carlos ya recogió (camino feliz)
- Banner verde: "Carlos recogió tu leche"
- Display grande con la cantidad que Carlos recogió
- Botones quick de ajuste (+0.5, -0.5)
- Switch "No vendí hoy"
- Métodos de firma disponibles (PIN default)
- CTA "CONFIRMAR 17.5 L"

### Caso A.b: Carlos recogió cantidad distinta
- Banner amarillo: "Carlos recogió 16.5 L. Tú habías puesto 17 L. Diferencia 0.5 L."
- Opciones: Aceptar 16.5 / Mantener 17 / Otra cantidad

### Caso B: Carlos registró porque Juan no pudo
- Banner: "Carlos pasó y registró 16.5 L. ¿Confirmas?"
- Display con la cantidad de Carlos
- Opciones: SÍ confirmar / NO fue otra / NO vendí

## Acciones disponibles
- Confirmar con PIN (default)
- Confirmar con huella
- Confirmar con cara
- Aceptar cantidad de Carlos (si difiere)
- Mantener su cantidad (abre disputa)
- Ingresar cantidad manual
- Marcar "no vendí hoy"

## Wireframe (Caso A — Carlos ya recogió, coincide)

```
┌──────────────────────────────────────┐
│ 6:35    📶 3G  68%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ← Confirmar litros de hoy    ❓      │
├──────────────────────────────────────┤
│                                       │
│ ✓ Carlos recogió tu leche           │
│ A las 6:32 AM · te toca confirmar    │
│                                       │
│ LITROS QUE CARLOS RECOGIÓ            │
│ ┌──────────────────────────────────┐│
│ │                                  ││
│ │        17.5 L                    ││
│ │        ✓ Coincide con tu registro││
│ │                                  ││
│ └──────────────────────────────────┘│
│                                       │
│ AJUSTE (si discrepa)                 │
│ ┌────┬────┬────┐                     │
│ │+0.5│17.5│-0.5│                     │
│ └────┴────┴────┘                     │
│                                       │
│ BOTONES RÁPIDOS                       │
│ ┌────┬────┬────┐                     │
│ │ 15 │ 17 │17.5│                     │
│ ├────┼────┼────┤                     │
│ │ 18 │ 20 │ 25 │                     │
│ └────┴────┴────┘                     │
│                                       │
│ ┌─ 🚫 NO VENDÍ HOY ──────────────┐ │
│ │ Marcar si no hubo venta hoy      │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌─ 🔒 CONFIRMA CON TU FIRMA ──────┐│
│ │ ◉ PIN (default)  ○ Huella        ││
│ │ ○ Cara                          ││
│ │                                  ││
│ │ El PIN es más fácil con manos    ││
│ │ mojadas                          ││
│ └──────────────────────────────────┘ │
│                                       │
│ ┌──────────────────────────────────┐│
│ │      ✓ CONFIRMAR 17.5 L         ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Caso A.b — Carlos recogió distinta cantidad)

```
┌──────────────────────────────────────┐
│ ← Confirmar litros de hoy    ❓      │
├──────────────────────────────────────┤
│                                       │
│ ⚠ Carlos recogió 16.5 L            │
│   Tú habías puesto 17 L              │
│   Diferencia: 0.5 L                   │
│                                       │
│ ┌──────────────────────────────────┐│
│ │                                  ││
│ │  👆 ACEPTAR 16.5 L DE CARLOS    ││
│ │  (firma con 16.5)               ││
│ │                                  ││
│ │  🔒 MANTENER MIS 17 L           ││
│ │  (abre disputa con Carlos)      ││
│ │                                  ││
│ │  ✏️ OTRA CANTIDAD                ││
│ │  (input manual)                 ││
│ │                                  ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Caso B — Carlos registró porque Juan no pudo)

```
┌──────────────────────────────────────┐
│ ← Carlos registró por ti             │
├──────────────────────────────────────┤
│                                       │
│ Carlos pasó y registró 16.5 L        │
│ (tú no habías registrado)            │
│                                       │
│ ┌──────────────────────────────────┐│
│ │  ✓ SÍ, CONFIRMAR 16.5 L          ││
│ │  (firma con PIN)                 ││
│ └──────────────────────────────────┘│
│                                       │
│ Si fue otra cantidad:                 │
│ ┌──────────────────────────────────┐│
│ │  ✏️ NO, FUE OTRA CANTIDAD         ││
│ └──────────────────────────────────┘│
│                                       │
│ Si no vendiste:                       │
│ ┌──────────────────────────────────┐│
│ │  ✕ NO VENDÍ HOY                 ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Confirmación exitosa)

```
┌──────────────────────────────────────┐
│                                       │
│         ✓ 17.5 L confirmados          │
│                                       │
│    Tu firma quedó registrada.         │
│                                       │
│       [Volver al inicio]              │
│                                       │
└──────────────────────────────────────┘
```

## Wireframe (Pantalla PIN)

```
┌──────────────────────────────────────┐
│ ← Ingresa tu PIN                      │
├──────────────────────────────────────┤
│                                       │
│        🔒 Ingresa tu PIN              │
│                                       │
│        ○ ○ ○ ○                        │
│                                       │
│ ┌─────┬─────┬─────┐                  │
│ │  1  │  2  │  3  │                  │
│ ├─────┼─────┼─────┤                  │
│ │  4  │  5  │  6  │                  │
│ ├─────┼─────┼─────┤                  │
│ │  7  │  8  │  9  │                  │
│ ├─────┼─────┼─────┤                  │
│ │     │  0  │  ⌫  │                  │
│ └─────┴─────┴─────┘                  │
│                                       │
│        ¿Olvidaste tu PIN?            │
└──────────────────────────────────────┘
```

## Wireframe (No vendí hoy)

```
┌──────────────────────────────────────┐
│ ← No vendí hoy                       │
├──────────────────────────────────────┤
│                                       │
│ ⚠ ¿Estás seguro que no vendiste?     │
│                                       │
│ ¿Por qué? (opcional)                 │
│ ○ 🐄 Vacas secas                     │
│ ○ 🚗 Carlos no vino                  │
│ ○ 🤝 Vendí a otro                    │
│ ○ 🤒 Enfermedad                      │
│ ○ 🎉 Festividad                      │
│ ○ 📝 Otra: [_________________]        │
│                                       │
│ [Cancelar]  [Confirmar no vendí]    │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Banner verde en camino feliz:** Juan ve de inmediato "todo OK, solo confirma". Reduce ansiedad.
2. **Display pre-llenado:** si coincide, Juan solo confirma (3-5 seg). Botón más grande del diseño.
3. **Botones quick de ±0.5:** cubre el 80% de correcciones sin tipear.
4. **PIN por default sobre huella:** porque manos mojadas. El sistema ofrece huella solo si Juan la activó antes.
5. **"El PIN es más fácil con manos mojadas":** copy educativo para Juan.
6. **Switch "No vendí" NO como CTA principal:** Juan debe pensarlo, no es la opción fácil. Color gris, no azul.

### Decisiones de copy

- **"¿Estás seguro que no vendiste?":** confirmación explícita, no "no vendiste?" (asume).
- **"Vacas secas" / "Carlos no vino":** opciones cotidianas, no "producción interrumpida" (jerga técnica).
- **"Te toca confirmar":** vs "Tienes que confirmar". Más cálido.

### Decisiones de eficiencia

- **Si Juan ya registró su cantidad y Carlos recogió la misma:** display coincide, 1 toque.
- **Si Carlos recogió cantidad distinta:** pantalla A.b, 2 opciones claras (aceptar o disputar).
- **Si Juan no registró:** pantalla B, decide rápido.
- **Si Juan no tiene smartphone:** Carlos registra por él + SMS confirmatorio.

## Estados posibles

```
┌──────────────────────────────────┐
│                                  │
│  ESPERANDO_LECHERO               │  ← Juan registró, falta Carlos
│  ↓                              │
│  RECOGIDO_COINCIDE              │  ← Caso A normal
│  ↓ (firma de Juan)              │
│  CONFIRMADO                     │  ← Listo
│                                  │
│  RECOGIDO_DISCREPANCIA          │  ← Caso A.b
│  ↓ (Juan elige)                  │
│  RESUELTA_EN_MOMENTO            │  ← Aceptó valor de Carlos
│  o                              │
│  ABIERTA_DISPUTA                │  ← Mantuvo su valor
│                                  │
│  RECOGIDO_SIN_CONFIRMAR         │  ← Carlos registró solo
│  ↓                              │
│  CONFIRMADO                     │  ← Juan firma
│  o                              │
│  RECOGIDO_SIN_CONFIRMAR (vencido)│  ← Pasaron 24h sin firma
│                                  │
│  NO_VENDIO                      │  ← Juan dice no vendió
│  ↓                              │
│  CONFIRMADO                     │  ← Listo
│                                  │
└──────────────────────────────────┘
```

## Edge cases

| Caso | UX |
|---|---|
| Juan se equivocó y puso 17.5 en vez de 17 | Puede corregir manual o cambiar a 17 con quick buttons |
| Juan puso "no vendí" pero en realidad sí vendió | Sistema permite editar hasta 24h después, abre disputa con Carlos si pasaron >24h |
| Carlos recogió mucho más/menos (>5 L diferencia) | Sistema bloquea firma de Juan, requiere llamada admin |
| Juan no tiene biometría disponible | PIN siempre disponible como fallback |
| Juan quiere ver histórico del día | Tap en "Ver detalle de mi quincena" del home |
| Juan cambia de celular y pierde PIN | Flujo de recuperación con OTP SMS (ver AUTH-05) |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Banner verde (caso A) | `--green-100` fondo, `--green-700` texto | éxito |
| Banner amarillo (caso A.b) | `--warning-bg` fondo, `--warning` texto | advertencia |
| Display litros | `--font-data` 72px bold | Atkinson |
| Botón CONFIRMAR | `--green-500` | verde |
| Botones aceptar/disputar | `--blue-500` | azul |
| PIN dots | `--green-500` filled, `--cream-400` empty | estados |

## Métricas

- **Tiempo medio de confirmación:** target < 30 seg
- **% con firma el mismo día:** target > 80%
- **% de "no vendí" usado correctamente:** target > 90%
- **% de discrepancias resueltas en momento:** target > 80%
- **Tasa de éxito al primer intento (sin reintentos de PIN):** target > 85%

## Conexiones

- **←** WF-C-01 (home): CTA "Confirmar litros de hoy"
- **→** WF-C-06 (ver liquidación): si hay cierre de quincena próximo
- **→** Carlos recibe push de la confirmación (ver WF-L-03)

## Versión
1.0 — 2026-09-07 — Documento inicial basado en `confirmar-litros.md` validado.
