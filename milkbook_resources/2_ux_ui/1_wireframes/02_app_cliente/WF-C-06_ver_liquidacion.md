# WF-C-06: Ver Liquidación — App Cliente (Juan)

## Propósito
Permitir a Juan ver el detalle completo de su liquidación de quincena y firmarla con su PIN. Esta es la pantalla que Juan ve cuando Carlos inicia el cierre de quincena.

## Datos que muestra
- Período de la liquidación (15 - 29 sept)
- Resumen: litros vendidos, precio, subtotal
- Adelantos recibidos (lista con estado)
- Encargos pedidos (lista con estado)
- Cálculo final: total a recibir
- Sección de firma digital (PIN/huella)

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ← Liquidación · 15-29 sept           │
├──────────────────────────────────────┤
│                                       │
│ 📅 QUINCENA 15 - 29 SEPT             │
│ Carlos Mendoza · Lechero activo     │
│                                       │
│ ┌─ RESUMEN ──────────────────────────┐│
│ │                                  ││
│ │ 💧 Litros vendidos: 287.5 L      ││
│ │                                  ││
│ │ 💰 Subtotal: S/ 431.25          ││
│ │   287.5 L × S/ 1.50              ││
│ │                                  ││
│ │ 💸 Adelantos: S/ 230.00         ││
│ │ 💼 Encargos: S/ 30.00           ││
│ │ ═══════════════════════         ││
│ │ A RECIBIR: S/ 171.25           ││
│ │                                  ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ 💸 ADELANTOS (3) ─────────────────┐│
│ │ 18 sept · S/ 100 "medicinas"   ✓│
│ │ 20 sept · S/  50 "mercado"     ✓│
│ │ 24 sept · S/  80 "colegio"    ✓│
│ │ Todos confirmados por ti          ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ 💼 ENCARGOS (2) ──────────────────┐│
│ │ 17 sept · 2kg azúcar  S/ 12    ✓│
│ │ 20 sept · 1 aceite   S/ 18    ✓│
│ │ Todos entregados y confirmados   ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ CÓMO PAGARÁ CARLOS ──────────────┐│
│ │ 💵 Efectivo:        S/ 100.00   ││
│ │ 📱 Yape:            S/  71.25   ││
│ │ 🏦 Transferencia:   S/   0.00   ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ 🔒 TU FIRMA (JUAN) ──────────────┐│
│ │                                  ││
│ │ ◉ PIN (default)  ○ Huella        ││
│ │ ○ Cara                          ││
│ │                                  ││
│ │ Tu firma confirma que estás      ││
│ │ de acuerdo con el cálculo.       ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │   📱 FIRMAR CON PIN              ││
│ │   (esto confirma S/ 171.25)     ││
│ └──────────────────────────────────┘│
│                                       │
│ [Discutir con Carlos]                │
└──────────────────────────────────────┘
```

## Wireframe (Ingreso de PIN)

```
┌──────────────────────────────────────┐
│ ← Ingresa tu PIN                      │
├──────────────────────────────────────┤
│                                       │
│        🔒 Ingresa tu PIN              │
│        Para confirmar S/ 171.25      │
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

## Wireframe (Confirmado)

```
┌──────────────────────────────────────┐
│                                       │
│     ✓ Liquidación confirmada         │
│                                       │
│   Tu firma quedó registrada.          │
│   Carlos también firmó.                │
│                                       │
│   ┌──────────────────────────────────┐│
│   │ 📄 Boleta generada              ││
│   │ 📧 Enviada a tu email          ││
│   │ (juan.perez@gmail.com)          ││
│   └──────────────────────────────────┘│
│                                       │
│   ┌──────────────────────────────────┐│
│   │   📄 VER BOLETA PDF              ││
│   └──────────────────────────────────┘│
│   ┌──────────────────────────────────┐│
│   │   📤 COMPARTIR POR WHATSAPP     ││
│   └──────────────────────────────────┘│
│                                       │
│ [Volver al inicio]                    │
└──────────────────────────────────────┘
```

## Wireframe (Discutir — si Juan no está de acuerdo)

```
┌──────────────────────────────────────┐
│ ← Discutir con Carlos                 │
├──────────────────────────────────────┤
│                                       │
│ ⚠ Antes de firmar                     │
│                                       │
│ Si no estás de acuerdo con algún      │
│ cálculo, abre una disputa. Carlos     │
│ recibirá una notificación.            │
│                                       │
│ ┌──────────────────────────────────┐│
│ │  ¿Qué no está bien?              ││
│ │                                  ││
│ │  ○ Litros de algún día           ││
│ │  ○ Adelanto que no recibí        ││
│ │  ○ Encargo no me lo dieron       ││
│ │  ○ Precio incorrecto             ││
│ │  ○ Otro motivo: [__________]    ││
│ └──────────────────────────────────┘│
│                                       │
│ DESCRIPCIÓN (opcional)                │
│ ┌──────────────────────────────────┐│
│ │ El 22 sept entregué 18 L, no 0. ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │   🚨 ABRIR DISPUTA              ││
│ └──────────────────────────────────┘│
│                                       │
│ [Cancelar]                            │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Vista completa antes de firmar:** Juan ve TODO el cálculo antes de poner su PIN. Sin sorpresas.
2. **PIN por default:** porque es el método más accesible (manos mojadas). Huella como acelerador.
3. **Botón "Discutir con Carlos":** acción explícita para abrir disputa. No escondida.
4. **Información de pago visible:** Juan ve cuánto recibirá por cada método.
5. **Boleta con QR:** Juan puede mostrar la boleta al banco o donde necesite.

### Decisiones de copy

- **"A RECIBIR":** vs "A cobrar". Más directo, menos jerga.
- **"Esto confirma S/ 171.25":** explícito sobre qué está firmando. Sin ambigüedad.
- **"Discutir con Carlos":** vs "Disputar". Más humano, menos agresivo.

## Estados posibles

```
┌──────────────────────────────────┐
│                                  │
│  PROPUESTA (por Carlos)          │  ← Carlos armó el cierre
│  ↓                              │
│  PENDIENTE_FIRMA_JUAN           │  ← Juan revisa y firma
│  ↓                              │
│  CONFIRMADA                     │  ← Ambos firmaron
│  ↓                              │
│  BOLETA_GENERADA                │  ← PDF enviado a Juan
│  ↓                              │
│  CERRADA                        │  ← Estado final
│                                  │
│  (alternativas)                  │
│  ↓                              │
│  DISPUTA_ABIERTA               │  ← Juan abrió disputa│
│  ↓                              │
│  EN_REVISION_ADMIN              │
│  o                              │
│  RESUELTA_DIRECTAMENTE         │  ← Carlos y Juan llegaron│
│                                  │     a acuerdo
│                                  │
└──────────────────────────────────┘
```

## Edge cases

| Caso | UX |
|---|---|
| Juan no está de acuerdo | Abre disputa, sistema congela cierre hasta resolver |
| Juan quiere ver histórico de boletas | Tap en "Mis boletas" del bottom nav |
| Juan tiene RUC y quiere factura | Mostrar opción (en V2, no MVP) |
| Boleta no llega al email | Reenviar desde la app, opción disponible |
| Juan quiere imprimir la boleta | "Compartir por WhatsApp" + opción Bluetooth/impresora |
| Juan es familiar y ve el contrato | Mostrar "Estás confirmando el contrato de [Juan Pérez]" |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Card resumen | `--green-100` fondo, border 2px `--green-500` | destacado |
| Adelantos confirmados | `--green-100` | verde |
| Adelantos pendientes | `--warning-bg` | amarillo |
| Encargos confirmados | `--green-100` | verde |
| Sección firma | `--blue-100` | azul |
| Botón firmar | `--green-500` | verde |
| Botón discutir | outline + `--error` border | rojo |

## Métricas

- **% de Juan que firma el mismo día del cierre:** target > 80%
- **% de disputas abiertas por Juan:** target < 5%
- **Tiempo medio de revisión antes de firmar:** target < 3 min
- **% de boletas descargadas:** target > 30%

## Conexiones

- **←** WF-C-01 (home): tap en "Ver detalle de mi quincena"
- **→** desde WF-L-07 (cerrar contrato Carlos): push a Juan
- **→** WF-C-07 (boletas y perfil): ver boleta PDF

## Versión
1.0 — 2026-09-07 — Documento inicial.
