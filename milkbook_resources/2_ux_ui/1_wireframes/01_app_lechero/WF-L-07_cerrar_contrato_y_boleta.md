# WF-L-07: Cerrar Contrato y Generar Boleta — App Lechero (Carlos)

## Propósito
Documentar la pantalla final del cierre de quincena: confirmación con firma digital, generación de boleta PDF, y envío a Juan. Es el último paso del flujo crítico WF-L-06.

## Datos que muestra
- Resumen del cierre (totales)
- Selección de método de firma digital
- Confirmación de que Juan también está firmando
- Estado de la boleta (generándose / enviada / error)
- Acciones post-cierre (ver boleta, próximo contrato)

## Acciones disponibles
- Firmar con PIN / huella / cara
- Ver boleta PDF generada
- Compartir boleta por WhatsApp
- Iniciar siguiente contrato (auto-renovación)
- Volver al home

## Wireframe (Confirmación de cierre)

```
┌──────────────────────────────────────┐
│ 11:55   📶 3G  40%  ▮▮▮▮▮           │
├──────────────────────────────────────┤
│ ← Confirmar cierre · Juan Pérez     │
├──────────────────────────────────────┤
│                                       │
│ ┌─ RESUMEN ──────────────────────────┐│
│ │ 📅 Quincena 15-29 sept 2026       ││
│ │ 💧 Litros vendidos: 287.5 L       ││
│ │ 💰 Subtotal: S/ 431.25          ││
│ │ − Adelantos: S/ 230.00          ││
│ │ − Encargos: S/ 30.00            ││
│ │ ═══════════════════════         ││
│ │ A PAGAR: S/ 171.25              ││
│ │                                ││
│ │ 💵 Efectivo: S/ 100.00         ││
│ │ 📱 Yape: S/ 71.25             ││
│ └────────────────────────────────────┘│
│                                       │
│ ┌─ TU FIRMA (CARLOS) ──────────────┐│
│ │                                  ││
│ │ 🔒 ¿Cómo quieres firmar?         ││
│ │                                  ││
│ │ ◉ PIN (default)  ○ Huella        ││
│ │ ○ Cara                          ││
│ │                                  ││
│ │ Ingresa tu PIN:                  ││
│ │ [_][_][_][_]                     ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ FIRMA DE JUAN ──────────────────┐│
│ │                                  ││
│ │ 📱 Juan está viendo esto en su   ││
│ │ app ahora mismo.                 ││
│ │                                  ││
│ │ Le enviaremos una notificación    ││
│ │ push para que confirme.           ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │   📱 FIRMAR Y NOTIFICAR A JUAN   ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Generando boleta)

```
┌──────────────────────────────────────┐
│  Generando boleta...                  │
├──────────────────────────────────────┤
│                                       │
│          ⏳ (animación spinner)        │
│                                       │
│  Conectando con Nubefact (OSE)         │
│                                       │
│  ████████████░░░░░  65%               │
│                                       │
│  Esto puede tomar 1-3 segundos.       │
│  No cierres la app.                   │
│                                       │
└──────────────────────────────────────┘
```

## Wireframe (Cierre exitoso)

```
┌──────────────────────────────────────┐
│ ✓ Contrato cerrado con éxito         │
├──────────────────────────────────────┤
│                                       │
│                                       │
│         ✓ (check verde grande)        │
│                                       │
│     ¡Listo, Carlos!                   │
│     Quincena cerrada con Juan         │
│                                       │
│ ┌──────────────────────────────────┐│
│ │ 📅 Cierre: 29 sept 2026 14:32   ││
│ │ 💧 Litros: 287.5 L              ││
│ │ 💰 Pagado: S/ 171.25            ││
│ │                                  ││
│ │ ✓ Boleta electrónica generada    ││
│ │   OSE: B001-00234                ││
│ │   SUNAT: ACEPTADA ✓             ││
│ │                                  ││
│ │ 📧 Enviada a Juan:               ││
│ │   juan.perez@gmail.com            ││
│ │                                  ││
│ │ 📱 Push enviada a Juan            ││
│ │   Esperando confirmación final     ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │  📄 VER BOLETA PDF                ││
│ └──────────────────────────────────┘│
│ ┌──────────────────────────────────┐│
│ │  📤 COMPARTIR POR WHATSAPP        ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌──────────────────────────────────┐│
│ │  ↻ INICIAR SIGUIENTE QUINCENA     ││
│ └──────────────────────────────────┘│
│                                       │
│ [Volver al inicio]                    │
└──────────────────────────────────────┘
```

## Wireframe (Boleta PDF preview)

```
┌──────────────────────────────────────┐
│ ←  Boleta · Juan Pérez               │
├──────────────────────────────────────┤
│                                       │
│ ┌─ BOLETA DE VENTA ELECTRÓNICA ────┐│
│ │                                  ││
│ │ MilkBook S.A.C.                 ││
│ │ RUC: 20123456789                ││
│ │ Av. La Paz 123, Cajamarca        ││
│ │                                  ││
│ │ ─────────────────────────────   ││
│ │ B001-00234                       ││
│ │ 29 de septiembre de 2026         ││
│ │ ─────────────────────────────   ││
│ │                                  ││
│ │ CLIENTE                          ││
│ │ Juan Pérez Mamani                ││
│ │ DNI: 45678901                    ││
│ │ Caserío El Tambo, Cajamarca      ││
│ │                                  ││
│ │ DETALLE                          ││
│ │ 287.5 L × S/ 1.50    S/ 431.25 ││
│ │ (−) Adelantos        S/ 230.00 ││
│ │ (−) Encargos         S/  30.00 ││
│ │ ═══════════════════════         ││
│ │ TOTAL A PAGAR      S/ 171.25  ││
│ │                                  ││
│ │ FORMA DE PAGO                    ││
│ │ 💵 Efectivo         S/ 100.00  ││
│ │ 📱 Yape             S/ 71.25   ││
│ │                                  ││
│ │ ─────────────────────────────   ││
│ │ ✓ ACEPTADA POR SUNAT (OSE)       ││
│ │ Generada: 29/09/2026 14:32:18    ││
│ │ ─────────────────────────────   ││
│ │ Autorizado mediante resolución   ││
│ │ de superintendencia N° 225-2019  ││
│ │                                  ││
│ │ [📄 DESCARGAR PDF]                ││
│ │ [📤 ENVIAR POR WHATSAPP]          ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Animación de "Generando boleta":** entre 1 y 3 segundos (depende de Nubefact). Mostrar progreso claro, NO usar loading genérico.
2. **Doble confirmación de firma:** Carlos firma primero, Juan después. Si Juan no confirma en 5 min, Carlos recibe alerta.
3. **Boleta con OSE + SUNAT:** desde el MVP, la boleta es electrónica con valor legal. Carlos no debe perder esto.
4. **Botón "Iniciar siguiente quincena":** Carlos decide explícitamente. No auto-renueva por defecto (lo activa en WF-L-01).

### Decisiones de copy

- **"✓ Contrato cerrado con éxito":** afirmación clara, no pregunta.
- **"¡Listo, Carlos!":** saludo cálido. Es un momento importante para él.
- **"Boleta generada y enviada":** acción completada, no "se está enviando".
- **"Esperando confirmación final":** informa el estado siguiente, no oculta pasos.

### Decisiones de compartir

- **WhatsApp como canal secundario:** Carlos usa WhatsApp todo el día. Compartir la boleta por ahí es natural.
- **PDF descargable:** Carlos quiere tener el archivo en su celular.

## Estados posibles del cierre

```
┌────────────────────────────────────┐
│                                    │
│  CONFIRMANDO_FIRMA_CARLOS         │  ← Carlos pone su PIN
│  ↓                                 │
│  NOTIFICANDO_A_JUAN                │  ← Push a Juan
│  ↓                                 │
│  ESPERANDO_FIRMA_JUAN              │  ← Juan debe firmar (timeout 5 min)
│  ↓                                 │
│  GENERANDO_BOLETA                  │  ← Llamada a Nubefact (1-3 seg)
│  ↓                                 │
│  CERRADO_EXITOSO                   │  ← Estado final
│                                    │
│  (alternativas)                    │
│  ↓                                 │
│  ERROR_NUBEFACT                    │  ← Reintentar
│  ↓                                 │
│  FIRMA_JUAN_TIMEOUT                │  ← Notificar admin
│                                    │
└────────────────────────────────────┘
```

## Edge cases

| Caso | UX |
|---|---|
| Nubefact está caído | Botón "Reintentar" + log del error + opción de generar boleta manual |
| Juan no confirma en 5 min | Push recordatorio, alerta visual a Carlos, sigue pendiente |
| Carlos pierde internet durante el cierre | Cierre se guarda local, sync al recuperar |
| Boleta falla por RUC inválido | Carlos puede corregir RUC y reintentar |
| Carlos quiere compartir la boleta en WhatsApp | Pre-carga texto + PDF en WhatsApp share sheet |
| Juan ya confirmó antes de que Carlos cierre | El sistema marca como "doble confirmación" y procede |
| Carlos quiere editar algo después del cierre | Tiene 24h para abrir disputa propia, después se bloquea |

## Generación de boleta — Integración con Nubefact

```typescript
// Llamada a Nubefact API
const generarBoleta = async (liquidacion: Liquidacion) => {
  const response = await fetch('https://api.nubefact.com/api/v1/06a7f8b7-b4d2-4c8d-9f7e-3a5b6c8d9e0f', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NUBEFACT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operacion: 'generar_comprobante',
      tipo_de_comprobante: 2,  // BOLETA (no factura)
      serie: 'B001',
      numero: liquidacion.id,
      cliente_tipo_de_documento: '1',  // DNI
      cliente_numero_de_documento: liquidacion.cliente.dni,
      cliente_denominacion: liquidacion.cliente.nombre,
      cliente_email: liquidacion.cliente.email || '',
      items: [
        {
          unidad_de_medida: 'LITROS',
          descripcion: 'Leche cruda',
          cantidad: liquidacion.totalLitros,
          valor_unitario: liquidacion.contrato.precioLitroInicio,
          precio_unitario: liquidacion.contrato.precioLitroInicio,
          subtotal: liquidacion.subtotal,
          tipo_de_igv: '1',  // Gravado
          igv: liquidacion.subtotal * 0.18,
          total: liquidacion.subtotal * 1.18,
        },
      ],
      // (Aquí iría el detalle de adelantos y encargos como descuentos)
      // ...
      total_operacion_gravadas: liquidacion.subtotal,
      total_igv: liquidacion.subtotal * 0.18,
      total_impuestos: liquidacion.subtotal * 0.18,
      total: liquidacion.total,
    }),
  });
  
  return response.json();
};
```

## Métricas

- **% de cierres exitosos:** target > 95%
- **Tiempo medio de cierre:** target < 10 min/cliente
- **% de boletas aceptadas por SUNAT:** target > 99%
- **Tiempo de generación de boleta:** target < 3 seg
- **% de Juan que confirma vía push (vs Carlos):** target > 70%

## Conexiones

- **←** WF-L-06 (sacar cuentas): botón "Generar boleta"
- **→** WF-L-01 (home): tras el cierre, volver al inicio
- **→** WF-C-06 (ver liquidación del lado Juan): Juan recibe push

## Versión
1.0 — 2026-09-07 — Documento inicial.
