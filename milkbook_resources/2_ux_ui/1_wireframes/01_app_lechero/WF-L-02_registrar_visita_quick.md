# WF-L-02: Registrar Visita (Quick Entry) — App Lechero (Carlos)

## Propósito
Permitir a Carlos registrar los litros recogidos de un cliente en menos de 30 segundos, idealmente sin tocar el teclado. Esta es la pantalla que Carlos ve 8-15 veces al día.

## Datos que muestra
- Header con el cliente (Juan Pérez, caserío, número de vacas)
- Registro previo de Juan (si existe): "Juan registró 17.5 L a las 6:32 AM"
- Display grande con los litros a registrar (por defecto: lo que dijo Juan)
- Botones quick: +0.5, -0.5
- Quick grid: 15, 17, 17.5, 18, 20, 25
- Switch "No vino hoy / no recogí leche"
- Botones rápidos para adelanto/encargo
- Sección de firma digital (PIN por defecto)

## Acciones disponibles
- Ajustar cantidad con quick buttons
- Tipo manual (si no coincide)
- Marcar "no vendí"
- Registrar adelanto
- Registrar encargo
- Firmar y registrar (acción principal)

## Estados
- **Sin previous de Juan:** display vacío, Carlos debe tipear
- **Previous de Juan:** display pre-llenado con su valor
- **Con diferencia:** Carlos marca como advertencia
- **Sin internet:** banner amarillo, registro se guarda local
- **Confirmado:** vista de éxito breve (1-2 seg) y vuelve al home

## Wireframe (ASCII)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ←  Juan Pérez             📍         │
├──────────────────────────────────────┤
│                                       │
│ [JP] Juan Pérez          ✓ Activo    │
│      📍 Caserío El Tambo · 5 vacas   │
│                                       │
│ 📋 Juan registró a las 6:30 AM      │
│    Esperando tu confirmación → 17.5L │
│                                       │
│ ┌─ LITROS RECOGIDOS ──────────────┐ │
│ │                                   │ │
│ │       17.5 L                      │ │
│ │       (coincide ✓)                │ │
│ │                                   │ │
│ └───────────────────────────────────┘ │
│                                       │
│ AJUSTAR CANTIDAD                       │
│ ┌────┬────┬────┐                     │
│ │ −  │17.5│ +  │                     │
│ └────┴────┴────┘                     │
│                                       │
│ AJUSTE RÁPIDO (±0.5)                  │
│ ┌────┬────┬────┐                     │
│ │ 17 │17.5│ 18 │                     │
│ └────┴────┴────┘                     │
│                                       │
│ ┌─ 🚫 NO RECOGÍ HOY ──────────────┐ │
│ │ [toggle OFF]                      │ │
│ │ Marca si no hubo recolección     │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌─ ACCIONES RÁPIDAS (opcional) ────┐ │
│ │ [💰 Adelanto]    [🛒 Encargo]   │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌─ 🔒 FIRMA DIGITAL ──────────────┐ │
│ │ ○ PIN (default)  ○ Huella        │ │
│ │ ● PIN                          ✓ │ │
│ │ El productor confirmará también  │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌──────────────────────────────────┐ │
│ │      ✓ REGISTRAR 17.5 L         │ │  ← CTA principal
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Display grande con valor anterior:** Carlos ve de un vistazo si coincide con lo que registró Juan. Reduce errores.
2. **Botones quick ±0.5:** cubren el 80% de las correcciones sin tipear.
3. **Quick grid con valores típicos:** 17, 17.5, 18 son los más comunes en Cajamarca (validado informalmente).
4. **Switch "No recogí":** prominente pero no invasivo. Toggle, no botón separado.
5. **Firma PIN por default:** funciona en 100% de dispositivos. Huella como acelerador opcional.
6. **CTA único y claro:** "REGISTRAR 17.5 L" — un solo botón grande, color verde.

### Decisiones de copy

- **"LITROS RECOGIDOS"** vs "Cantidad" — más claro para el contexto.
- **"AJUSTAR CANTIDAD"** vs "Modificar" — usar palabra cotidiana.
- **"El productor confirmará también"** — informa a Carlos qué pasa después, reduce ansiedad.

### Decisiones de eficiencia

- **Si Carlos abre la app, ve la lista de clientes pendientes:** 1 tap abre el quick entry.
- **Si Juan ya registró su valor:** display pre-llenado, Carlos solo confirma.
- **Si Carlos no toca nada y la pantalla tiene el valor de Juan:** presiona CONFIRMAR y listo (3-5 segundos total).

## Edge cases

| Caso | UX |
|---|---|
| Juan no registró y Carlos no vio su cantidad | Display vacío, Carlos tipea manualmente |
| Carlos quiere cambiar de "no recogí" a "sí recogí" | Switch se mueve, display se habilita |
| Carlos olvidó firmar con PIN | Botón CONFIRMAR pide PIN antes de proceder |
| Hay 3 clientes siguientes en la ruta | Sugeriría "Siguiente cliente: Rosa López" como quick action |
| Carlos quiere ver el historial del día | Botón flotante "📊 Ver historial" abajo |
| El bidón marca una cantidad rara (e.g. 17.3) | Input manual con teclado numérico se abre |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Card header cliente | white + `--cream-300` border | 1px |
| Display grande (litros) | `--font-data` 72px bold | Atkinson |
| Botón quick | white + `--cream-300` border, `--green-500` cuando selected | 64dp min |
| Toggle "no recogí" | `--cream-200` OFF / `--warning` ON | pill 52x32dp |
| Sección firma | `--blue-100` fondo | `--blue-500` título |
| CTA principal | `--green-500` | white text, 60dp |
| Banner previous Juan | `--blue-100` + texto `--blue-700` | advertencia |

## Métricas

- **Tiempo medio de registro:** target < 30 seg
- **% registros en <15 seg:** target > 60%
- **% con "no recogí" usado correctamente:** target < 5% (es caso raro)
- **Errores aritméticos reportados:** target < 1%

## Conexiones

- **←** WF-L-01 (home): tap en cliente de la lista
- **→** WF-L-04 (adelantos): tap en "💰 Adelanto"
- **→** WF-L-05 (encargos): tap en "🛒 Encargo"
- **→** Confirmación exitosa (toast) → vuelve a WF-L-01

## Versión
1.0 — 2026-09-07 — Documento inicial.
