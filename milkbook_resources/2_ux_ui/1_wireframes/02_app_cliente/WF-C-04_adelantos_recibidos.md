# WF-C-04: Adelantos Recibidos — App Cliente (Juan)

## Propósito
Mostrar a Juan todos los adelantos que ha recibido de Carlos, con su estado (pendiente de confirmar / confirmado / liquidado). Esto es importante porque el productor a veces olvida cuánto le dieron, y el sistema le da respaldo.

## Datos que muestra
- Lista de adelantos pendientes (que debe confirmar)
- Lista de adelantos ya confirmados (histórico)
- Total de adelantos pendientes
- Total de adelantos del mes

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ← Adelantos recibidos                │
├──────────────────────────────────────┤
│                                       │
│ 🔔 PENDIENTES DE CONFIRMAR (1)       │
│ ┌──────────────────────────────────┐│
│ │ 💰 Carlos te dio un adelanto    ││
│ │                                  ││
│ │ S/ 80.00                         ││
│ │ "Para colegio"                   ││
│ │ 📅 24 sept 2026                  ││
│ │                                  ││
│ │ ¿Recibiste este monto?          ││
│ │ ┌──────────────────────────────┐││
│ │ │  ✓ SÍ, RECIBÍ                │││
│ │ └──────────────────────────────┘││
│ │ ┌──────────────────────────────┐││
│ │ │  ✕ NO RECIBÍ                  │││
│ │ └──────────────────────────────┘││
│ └──────────────────────────────────┘│
│                                       │
│ HISTÓRICO SEPTIEMBRE 2026             │
│ ┌──────────────────────────────────┐│
│ │ 22 sept · S/ 100.00              ││
│ │ "Para medicinas" ✓ confirmado   ││
│ │                                  ││
│ │ 18 sept · S/ 50.00              ││
│ │ "Para mercado" ✓ confirmado    ││
│ │                                  ││
│ │ 12 sept · S/ 80.00              ││
│ │ "Para fertilizantes" ✓ confirm  ││
│ └──────────────────────────────────┘│
│                                       │
│ TOTAL DEL MES                         │
│ ┌──────────────────────────────────┐│
│ │ Adelantos recibidos: S/ 230.00   ││
│ │ Pendientes: S/ 80.00 (1)       ││
│ │ Confirmados: S/ 150.00 (2)     ││
│ └──────────────────────────────────┘│
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  📅Quincena  📜Boletas  👤Yo│
└──────────────────────────────────────┘
```

## Wireframe (Confirmar/No recibir)

```
┌──────────────────────────────────────┐
│ ← Confirmar adelanto                 │
├──────────────────────────────────────┤
│                                       │
│ Adelanto del 24 de septiembre         │
│                                       │
│ ┌──────────────────────────────────┐│
│ │ 💰 Monto: S/ 80                  ││
│ │ 📅 Fecha: 24 sept 2026           ││
│ │ Motivo: "Para colegio"           ││
│ │ De: Carlos Mendoza               ││
│ └──────────────────────────────────┘│
│                                       │
│ ¿Recibiste este monto?               │
│                                       │
│ ┌──────────────────────────────────┐│
│ │   ✓ SÍ, RECIBÍ                  ││
│ │   (firma con PIN)                ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │   ✕ NO RECIBÍ                    ││
│ │   (abre disputa con Carlos)      ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │   💵 NO RECIBÍ EL MONTO COMPLETO ││
│ │   (registrar cuánto recibí)      ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Confirmado)

```
┌──────────────────────────────────────┐
│                                       │
│        ✓ Adelanto confirmado         │
│                                       │
│    Carlos ya sabe que recibiste.     │
│                                       │
│    S/ 80.00 se descontará al         │
│    cierre de la quincena.            │
│                                       │
│       [Volver al inicio]              │
│                                       │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Sección "Pendientes" arriba:** la acción principal. Juan confirma sus adelantos aquí.
2. **"¿Recibiste este monto?":** pregunta directa. Juan no tiene que pensar qué le están pidiendo.
3. **Opción "NO RECIBÍ EL MONTO COMPLETO":** caso legítimo (Juan recibió S/ 50 de S/ 80). Se registra.
4. **Total del mes:** Juan ve cuánto ha recibido. Útil para auditoría.

### Decisiones de copy

- **"Recibiste este monto?":** vs "Confirma el adelanto" — más natural.
- **"Se descontará al cierre de la quincena":** explica qué pasa después, sin tecnicismos.

### Decisiones de audit

- Si Juan dice "NO RECIBÍ": se abre disputa con Carlos. Audit log.
- Si Juan dice "MONTO COMPLETO": se registra el monto parcial. Audit log.
- Si Juan confirma después de 24h: el sistema marca "confirmación tardía".

## Estados posibles

```
┌──────────────────────────────────┐
│                                  │
│  CREADO (por Carlos)             │  ← Carlos registra
│  ↓                              │
│  PENDIENTE_FIRMA_JUAN           │  ← Espera confirmación
│  ↓                              │
│  CONFIRMADO                    │  ← Juan firma "sí recibí"
│  ↓ (al cierre)                  │
│  LIQUIDADO                     │  ← Descontado del pago
│                                  │
│  (alternativas)                  │
│  ↓                              │
│  CANCELADO_POR_CARLOS          │  ← Carlos se equivocó
│  o                              │
│  DISPUTA_ABIERTA               │  ← Juan dice "no recibí"
│  o                              │
│  MONTO_PARCIAL                 │  ← Recibió menos
│                                  │
└──────────────────────────────────┘
```

## Edge cases

| Caso | UX |
|---|---|
| Juan dice "NO RECIBÍ" | Disputa abierta, Carlos notificado, sistema congela el adelanto |
| Juan dice "MONTO COMPLETO" (ej: S/ 50 de S/ 80) | Se registra el monto parcial, audit log |
| Carlos canceló el adelanto antes de que Juan confirme | Juan ve el adelanto como CANCELADO |
| Juan olvidó confirmar y pasaron 7 días | Sistema usa valor de Carlos (default: confirmado) + alerta |
| Juan es `CLIENT_FAMILY` | Ve solo adelantos del titular que autoriza |
| Adelanto de Juan en otra quincena | Se ve en histórico con badge "Liquidado en [quincena]" |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Card pendiente | `--warning-bg` | amarillo claro |
| Card confirmado | `--green-100` | verde claro |
| Botón SÍ | `--green-500` | verde |
| Botón NO | `--error` | rojo |
| Total del mes | `--cream-100` | fondo neutro |

## Métricas

- **% de adelantos confirmados en < 1 hora:** target > 70%
- **% de disputas por adelantos:** target < 3%
- **Tiempo medio de confirmación:** target < 30 seg
- **% de "monto parcial":** target < 5% (caso raro)

## Conexiones

- **←** WF-C-01 (home): tap en tile "Adelantos"
- **←** WF-C-02 (confirmar litros): tap en notificación de adelanto
- **→** WF-C-06 (ver liquidación): los adelantos se restan del total

## Versión
1.0 — 2026-09-07 — Documento inicial.
