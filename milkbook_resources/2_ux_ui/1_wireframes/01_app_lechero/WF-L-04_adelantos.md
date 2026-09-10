# WF-L-04: Adelantos — App Lechero (Carlos)

## Propósito
Permitir a Carlos registrar un adelanto que le dio a un productor, con confirmación inmediata del cliente. Esto evita el clásico problema de "Juan dice 200, Carlos dice 300".

## Contexto validado

- **Frecuencia:** Común. Carlos da adelantos en efectivo cada vez que un productor lo pide.
- **Monto típico:** S/ 50 - S/ 300.
- **Dinámica actual:** Carlos anota en cuaderno. Juan también anota. A veces olvidan. A veces discuten.
- **Solución:** registro digital con confirmación obligatoria de Juan.

## Datos que muestra
- Lista de adelantos pendientes de confirmar (los que Carlos dio pero Juan no ha firmado)
- Botón rápido "Dar adelanto nuevo"
- Lista de adelantos ya confirmados (histórico)
- Total de adelantos pendientes por cliente (en su perfil)

## Acciones disponibles
- Dar nuevo adelanto (formulario)
- Confirmar manualmente un adelanto que Juan ya confirmó verbalmente
- Cancelar un adelanto antes de que se confirme (caso raro)
- Ver historial completo

## Wireframe (Lista de adelantos)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ←  Adelantos                  + Nuevo │
├──────────────────────────────────────┤
│                                       │
│ 🔔 PENDIENTES DE CONFIRMAR (2)       │
│ ┌──────────────────────────────────┐ │
│ │ Juan Pérez          S/ 80.00    │ │
│ │ 📅 24 sept · "Para colegio"     │ │
│ │ ⏳ Esperando firma de Juan       │ │
│ │ [Cancelar]                       │ │
│ ├──────────────────────────────────┤ │
│ │ María Gómez         S/ 50.00    │ │
│ │ 📅 26 sept · "Para mercado"     │ │
│ │ ⏳ Esperando firma de María     │ │
│ │ [Cancelar]                       │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ÚLTIMOS CONFIRMADOS (5)               │
│ ┌──────────────────────────────────┐ │
│ │ Rosa López          S/ 100.00   │ │
│ │ 📅 22 sept · "Para medicinas"   │ │
│ │ ✓ Confirmado por Rosa           │ │
│ ├──────────────────────────────────┤ │
│ │ Pedro Díaz          S/ 200.00   │ │
│ │ 📅 20 sept · "Para colegio"     │ │
│ │ ✓ Confirmado por Pedro          │ │
│ ├──────────────────────────────────┤ │
│ │ Juan Pérez          S/ 100.00   │ │
│ │ 📅 18 sept · "Para medicinas"   │ │
│ │ ✓ Confirmado por Juan           │ │
│ ├──────────────────────────────────┤ │
│ │ Carla Torres        S/ 50.00    │ │
│ │ 📅 15 sept · "Para mercado"     │ │
│ │ ✓ Confirmado por Carla          │ │
│ ├──────────────────────────────────┤ │
│ │ Julio Ramírez       S/ 80.00    │ │
│ │ 📅 12 sept · "Para fertilizantes"│ │
│ │ ✓ Confirmado por Julio          │ │
│ └──────────────────────────────────┘ │
│ [Ver todos los adelantos]             │
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  👥Clientes  📋Quincena  📊│
└──────────────────────────────────────┘
```

## Wireframe (Formulario "Dar adelanto nuevo")

```
┌──────────────────────────────────────┐
│ ←  Nuevo adelanto · Juan Pérez      │
├──────────────────────────────────────┤
│                                       │
│ ¿CUÁNTO LE DISTE A JUAN?             │
│                                       │
│ ┌──────────┬──────────┐              │
│ │  S/ 50   │  S/ 100  │              │
│ │  S/ 200  │  S/ 300  │              │
│ └──────────┴──────────┘              │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │ S/ [80]                          │ │  ← manual
│ └──────────────────────────────────┘ │
│                                       │
│ ¿PARA QUÉ ES? (opcional)             │
│ ┌──────────────────────────────────┐ │
│ │ Para colegio                     │ │
│ └──────────────────────────────────┘ │
│                                       │
│ ¿QUIÉN LO RECIBE?                     │
│ ● Juan Pérez                         │
│                                       │
│ ¿CÓMO FUE?                             │
│ ◉ Efectivo                            │
│ ○ Yape                                │
│ ○ Transferencia                       │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │   DAR ADELANTO Y NOTIFICAR       │ │
│ │         A JUAN                   │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Wireframe (Notificación a Juan)

```
┌──────────────────────────────────────┐
│ MilkBook                       9:42  │
├──────────────────────────────────────┤
│                                       │
│ 💰 Carlos te dio un adelanto          │
│                                       │
│ S/ 80 · "Para colegio"                │
│ 24 sept 2026                          │
│                                       │
│ [VER Y CONFIRMAR]                     │
│                                       │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Sección "Pendientes de confirmar" arriba:** Carlos ve inmediatamente qué falta. El sistema le recuerda "tienes 2 sin confirmar".
2. **Botón "+ Nuevo" prominente en el header:** la acción principal. Carlos la usa varias veces por semana.
3. **Quick amounts (50, 100, 200, 300):** los montos más comunes en Cajamarca. Cubren 80% de casos.
4. **Confirmación obligatoria de Juan:** sin firma de Juan, el adelanto queda en estado "pendiente". Carlos puede cancelar pero NO confirmarlo unilateralmente.
5. **Método de pago registrado (efectivo/Yape/transferencia):** importante para el módulo contable (ver AUTH-03).

### Decisiones de copy

- **"DAR ADELANTO Y NOTIFICAR A JUAN":** acción + consecuencia. Carlos sabe qué pasa después.
- **"Esperando firma de Juan":** estado claro, no deja duda.
- **"¿Para qué es? (opcional)":** Carlos puede omitir. Útil para auditoría.

### Decisiones de auditoría

- Si Juan confirma después de 24h: el sistema marca el tiempo de demora (auditoría).
- Si Carlos cancela un adelanto: debe escribir motivo. Se guarda en audit log.
- Si Carlos marca como "dado en efectivo" pero Juan dice "no recibí": abre disputa.

## Edge cases

| Caso | UX |
|---|---|
| Carlos da adelanto y Juan no tiene smartphone | Carlos registra, Juan confirma en próxima visita (firma en pantalla de Carlos) |
| Carlos da adelanto a sí mismo por error | Botón cancelar con confirmación obligatoria y motivo |
| Adelanto mayor a S/ 500 | Advertencia: "¿Seguro? Es un monto alto" |
| Carlos olvidó dar adelanto pero Juan lo pide | Pantalla permite registrar del lado de Carlos solo (estado PENDIENTE_FIRMA_JUAN) |
| Juan edita el motivo después de confirmar | Audit log + alerta al admin |
| Carlos tiene 5+ adelantos pendientes | Banner rojo en home "Tienes 5 adelantos sin confirmar de Juan" |

## Estados de un adelanto

```
┌────────────────────────────┐
│                            │
│  CREADO                    │  ← Carlos lo registra
│  ↓ (push a Juan)           │
│  PENDIENTE_FIRMA_JUAN      │  ← Espera confirmación
│  ↓                          │
│  CONFIRMADO                │  ← Juan firma con PIN/huella
│  ↓ (al cierre de quincena) │
│  LIQUIDADO                 │  ← Se descuenta del total a pagar
│                            │
│  (alternativas)            │
│  ↓                          │
│  CANCELADO_POR_CARLOS      │  ← Carlos lo cancela antes de firmar
│  o                          │
│  DISPUTA_ABIERTA           │  ← Juan dice "no recibí" |
│                            │
└────────────────────────────┘
```

## Métricas

- **% de adelantos confirmados en < 1 hora:** target > 80%
- **% de adelantos cancelados:** target < 5% (es raro)
- **Tiempo medio de registro:** target < 30 seg
- **% de disputas por adelantos:** target < 2%

## Conexiones

- **←** WF-L-01 (home): tap en "Adelantos" del bottom nav
- **→** desde WF-L-02 (registrar visita): botón rápido "💰 Adelanto"
- **→** hacia WF-L-06 (sacar cuentas): los adelantos se suman al cálculo

## Versión
1.0 — 2026-09-07 — Documento inicial.
