# WF-C-03: No Vendí Hoy — App Cliente (Juan)

## Propósito
Permitir a Juan marcar que un día no vendió leche, con motivo opcional. Caso de uso importante: las vacas no siempre producen (sequía, enfermedad, festividad), y Carlos no debe cobrarle por leche que no recibió.

## Datos que muestra
- Pregunta de confirmación ("¿Estás seguro?")
- Motivos opcionales predefinidos (vacas secas, Carlos no vino, vendí a otro, enfermedad, festividad)
- Campo de nota libre (opcional)
- Botón confirmar / cancelar

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 6:40    📶 3G  68%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ← No vendí hoy                       │
├──────────────────────────────────────┤
│                                       │
│          🚫                          │
│                                       │
│ ⚠ ¿Estás seguro que no vendiste      │
│   hoy?                                │
│                                       │
│ Si no vendes leche hoy, el sistema   │
│ no te va a cobrar ni pagar. Carlos   │
│ verá que no hubo venta.               │
│                                       │
│ ¿POR QUÉ? (opcional)                 │
│ ┌──────────────────────────────────┐ │
│ │  🐄 Vacas secas                  │ │
│ │  🚗 Carlos no vino              │ │
│ │  🤝 Vendí a otro                │ │
│ │  🤒 Enfermedad                  │ │
│ │  🎉 Festividad                  │ │
│ │  📝 Otra: [_________________]    │ │
│ └──────────────────────────────────┘ │
│                                       │
│ NOTA PARA CARLOS (opcional)           │
│ ┌──────────────────────────────────┐ │
│ │ Ej: "Le di leche a mi vecino    │ │
│ │ porque Carlos no vino"           │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ┌──────────────────────────────────┐│
│ │  💡 ¿Sabías?                    ││
│ │  Si Carlos pasó pero no te       ││
│ │  encontró, también puedes marcar  ││
│ │  "Carlos no vino" para que ambos ││
│ │  vean lo mismo.                  ││
│ └──────────────────────────────────┘│
│                                       │
│ [Cancelar]  [✕ Confirmar no vendí]  │
└──────────────────────────────────────┘
```

## Wireframe (Confirmado)

```
┌──────────────────────────────────────┐
│                                       │
│         ✓ Marcado como no vendido    │
│                                       │
│    Carlos ya fue notificado.          │
│    Tu quincena no te cobrará hoy.     │
│                                       │
│       [Volver al inicio]              │
│                                       │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Confirmación explícita:** "¿Estás seguro?" — no asumimos que Juan quiere marcar no vendido. Puede ser un error de toque.
2. **Motivos predefinidos:** 5 motivos cubren 80% de casos. Juan solo toca uno en lugar de escribir.
3. **Motivo opcional:** no obligatorio. Juan puede omitir sin problema.
4. **Nota libre opcional:** para auditoría o aclaración a Carlos.
5. **Mensaje "Carlos ya fue notificado":** Juan sabe que pasó, no se queda con duda.

### Decisiones de copy

- **"¿Por qué? (opcional)":** indica que no es obligatorio, pero útil.
- **"Tu quincena no te cobrará hoy":** afirmación clara, Juan sabe que no afecta su pago.

### Decisiones de audit

- Si Juan marca "Vendí a otro", se guarda el motivo para auditoría (¿está vendiendo a la competencia?).
- Si Carlos tiene quejas sobre esto, puede abrir disputa.

## Estados posibles

```
┌──────────────────────────────────┐
│                                  │
│  NO_VENDIO (normal)              │  ← Juan marca
│  ↓                              │
│  CARLOS_NOTIFICADO               │  ← Push a Carlos
│  ↓ (Carlos acepta)              │
│  CONFIRMADO                     │  ← Listo
│                                  │
│  (alternativas)                  │
│  ↓                              │
│  RECOGIDO_DISCREPANCIA          │  ← Si Carlos ya registró algo
│  (requiere resolución)          │
│                                  │
│  CARLOS_RECHAZA                 │  ← Carlos dice "sí recogí"
│  ↓                              │
│  ABIERTA_DISPUTA                │
│                                  │
└──────────────────────────────────┘
```

## Edge cases

| Caso | UX |
|---|---|
| Juan marca no vendido pero Carlos SÍ registró algo | Sistema genera RECOGIDO_DISCREPANCIA, ambos notificados |
| Juan marca no vendido hace 3 días (atrasado) | Sistema permite pero marca "registro tardío" en audit |
| Juan marca no vendido y luego quiere corregir | Puede editar el mismo día; después abre disputa |
| Juan marca no vendido pero ya había recibido adelanto | El adelanto queda pendiente, se descuenta en próxima quincena con leche |
| Juan edita motivo después de confirmar | Audit log + Carlos ve el cambio |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Fondo principal | `--cream-50` | #FFFDF7 |
| Card | white + `--cream-300` border | 1px |
| Motivo seleccionado | `--warning-bg` fondo, `--warning` border | 2px |
| Botón confirmar | `--warning` fondo | amarillo MilkBook |
| Card de ayuda | `--blue-100` | azul claro |

## Métricas

- **% de "no vendido" usado correctamente:** target > 90% (no abuso)
- **% de "no vendido" con motivo:** target > 50%
- **Tiempo medio de marcar:** target < 20 seg
- **% que resulta en disputa:** target < 5%

## Conexiones

- **←** WF-C-02 (confirmar litros): switch "No vendí hoy"
- **→** WF-C-01 (home): vuelve al home
- **→** Carlos recibe push de la marca

## Versión
1.0 — 2026-09-07 — Documento inicial.
