# AUTH-03: Módulo Contable (mini-ERP sin pasarela de pago) — MilkBook

> **El sistema contable que muestra a Carlos y Juan cuánto deben, cuánto les deben, y el detalle de cada movimiento — sin necesidad de una pasarela de pago.** Este es el "mini-ERP" que tú propusiste, integrado nativamente en la app móvil y la web.

**Decisión crítica (validada con usuario):**
- ✅ MilkBook **REGISTRA** pagos que ocurren fuera del sistema (efectivo, Yape, transferencia).
- ❌ MilkBook **NO COBRA** automáticamente.
- ❌ MilkBook **NO INTEGRA** con Yape/Plin/bancos en MVP.
- ❌ MilkBook **NO PROCESA** microcréditos (habilita data para que un banco lo haga).

---

## 🎯 ¿Por qué un módulo contable sin pasarela?

**Tres razones:**

1. **Los pagos ya ocurren fuera de MilkBook.** Carlos cobra efectivo a Juan, Juan le transfiere por Yape a Carlos. El sistema solo necesita **registrar** que esto pasó.

2. **No podemos forzar a Juan a tener una cuenta bancaria.** El 40% de productores no usa Yape/Plin (validado). Algunos solo reciben efectivo. Si MilkBook exigiera integración, perderíamos el 40%.

3. **El mini-ERP resuelve el problema real.** El problema no es cobrar — es **no perder plata por errores de registro**. El módulo contable resuelve eso sin pasarela.

---

## 📊 ¿Qué muestra a cada usuario?

### Para Carlos (LECHERO_OWNER)

| Pantalla | Qué muestra |
|---|---|
| **Dashboard** | KPIs del mes: litros comprados, ingresos generados, adelantos dados, encargos cobrados |
| **Mi cartera** | Lista de productores con estado de cuenta por cada uno |
| **Estado de cuenta** (por productor) | Saldo actual, adelantos pendientes, encargos comprados vs cobrados, proyección del cierre |
| **Libro mayor** | Todos los movimientos del mes con filtros |
| **Cierre de quincena** | La pantalla crítica con todo el cálculo (ya documentada en WF-L-06) |
| **Boletas generadas** | Lista de boletas PDF descargables |
| **Reportes descargables** | Excel/CSV del libro mayor, por productor, por quincena |

### Para Juan (CLIENT_OWNER)

| Pantalla | Qué muestra |
|---|---|
| **Mi quincena actual** | Litros vendidos, precio, adelantos recibidos, encargos pedidos, estimado a recibir |
| **Mis adelantos** | Lista de adelantos recibidos con fecha, monto, motivo |
| **Mis encargos** | Lista de encargos pedidos con estado (pendiente / entregado / cobrado) |
| **Mi liquidación** | Detalle completo de la última quincena cerrada (al estilo WF-C-06) |
| **Mis boletas** | Lista de boletas PDF descargables |
| **Mi historial** | Quincenas pasadas con resumen |

### Para el equipo MilkBook (ADMIN/OPS)

| Pantalla | Qué muestra |
|---|---|
| **CRM de lecheros** | Lista de lecheros con KPIs por lechero |
| **CRM de productores** | Lista de productores con KPIs por productor |
| **Libro mayor global** | TODOS los movimientos de TODOS los lecheros (sin ver datos bancarios, solo movimientos MilkBook) |
| **Conciliación manual** | Herramienta para que Carlos o el equipo detecten inconsistencias |
| **Reportes globales** | Exportable a Excel/CSV con todos los movimientos |
| **Métricas de uso** | Cuántos cierres, cuántas boletas, cuántas disputas por mes |

---

## 🧮 Estructura del módulo contable

### Modelo de movimientos

```prisma
enum TipoMovimiento {
  REGISTRO_LECHE          // litros vendidos a precio X
  ADELANTO_DADO           // Carlos le dio dinero a Juan
  ADELANTO_RECIBIDO       // Juan recibió dinero de Carlos
  ENCARGO_CREADO          // Juan pidió algo
  ENCARGO_ENTREGADO       // Carlos le entregó el encargo
  ENCARGO_COBRADO         // Se cobró el encargo en la liquidación
  PAGO_EFECTIVO           // Pago en efectivo al cierre
  PAGO_YAPE               // Pago por Yape al cierre
  PAGO_TRANSFERENCIA      // Pago por transferencia al cierre
  AJUSTE                  // Corrección manual con justificación
}

model Movimiento {
  id              String   @id @default(cuid())
  contratoId      String?
  lecheroId       String
  clienteId       String?
  tipo            TipoMovimiento
  monto           Decimal  @db.Decimal(10,2)  // puede ser positivo (ingreso) o negativo (adelanto/descuento)
  descripcion     String?
  referencia      String?  // ej: "Adelanto del 18 sept para medicinas"
  metodoPago      MetodoPago?  // solo para pagos
  registradoPorId String   // QUIÉN hizo el movimiento
  autorizadoPorId String?  // para movimientos que requieren aprobación
  timestamp       DateTime @default(now())
  contrato        Contrato? @relation(...)
}
```

### Libro mayor (vista SQL)

```sql
CREATE VIEW libro_mayor AS
SELECT
  m.id,
  m.timestamp,
  m.tipo,
  m.monto,
  CASE
    WHEN m.tipo = 'REGISTRO_LECHE' THEN 'Litros vendidos'
    WHEN m.tipo = 'ADELANTO_DADO' THEN 'Adelanto a ' || c.nombre
    WHEN m.tipo = 'ENCARGO_ENTREGADO' THEN 'Encargo entregado'
    WHEN m.tipo = 'PAGO_EFECTIVO' THEN 'Pago en efectivo'
    WHEN m.tipo = 'PAGO_YAPE' THEN 'Pago por Yape'
    WHEN m.tipo = 'PAGO_TRANSFERENCIA' THEN 'Pago por transferencia'
    ELSE m.descripcion
  END AS descripcion_completa,
  m.metodo_pago,
  m.registrado_por_id
FROM movimiento m
LEFT JOIN contrato c ON m.contrato_id = c.id
WHERE m.lechero_id = :lechero_id
ORDER BY m.timestamp DESC;
```

---

## 📱 Mockup: Mi quincena actual (Juan)

```
┌─────────────────────────────────────┐
│ ← Mi quincena con Carlos            │
├─────────────────────────────────────┤
│                                     │
│ 📅 Quincena: 15 - 29 septiembre     │
│ Días restantes: 12                  │
│                                     │
│ ┌─ Resumen ────────────────────┐   │
│ │ Litros vendidos: 87.5 L        │   │
│ │ Precio por litro: S/ 1.50     │   │
│ │                               │   │
│ │ Subtotal bruto: S/ 131.25    │   │
│ │ − Adelantos: S/ 100.00       │   │
│ │ − Encargos: S/ 18.00         │   │
│ │ ════════════════════════       │   │
│ │ A recibir (estimado):         │   │
│ │ S/ 13.25                     │   │
│ └───────────────────────────────┘   │
│                                     │
│ [Ver detalle por día]               │
│                                     │
│ ┌─ Adelantos (2) ───────────────┐   │
│ │ 18 sept · S/ 100             │   │
│ │  "Para medicinas" ✓           │   │
│ │                              │   │
│ │ 24 sept · S/ 80              │   │
│ │  "Para colegio" ⏳ pendiente │   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌─ Encargos (1) ───────────────┐   │
│ │ 20 sept · 1 aceite           │   │
│ │  S/ 18 · ✓ entregado        │   │
│ └───────────────────────────────┘   │
│                                     │
│ [Descargar resumen en PDF]          │
└─────────────────────────────────────┘
```

---

## 💼 Mockup: Estado de cuenta por productor (Carlos)

```
┌─────────────────────────────────────┐
│ ← Juan Pérez · Estado de cuenta     │
├─────────────────────────────────────┤
│                                     │
│ Resumen quincena actual:             │
│ ┌─────────────────────────────────┐ │
│ │ Litros: 87.5 L                  │ │
│ │ Subtotal: S/ 131.25            │ │
│ │ Adelantos pendientes: S/ 80.00  │ │
│ │ Encargos cobrados: S/ 18.00    │ │
│ │ A pagar: S/ 33.25              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Historial: 12 quincenas cerradas    │
│                                     │
│ ┌─ Libro mayor (mes actual) ──────┐ │
│ │ 15 sept · 18.5 L · +27.75      │ │
│ │ 16 sept · 20.0 L · +30.00      │ │
│ │ 17 sept · 19.0 L · +28.50      │ │
│ │ 18 sept · 18.5 L · +27.75  ⚠   │ │
│ │ 19 sept · 20.0 L · +30.00      │ │
│ │ 18 sept · ADELANTO · -100.00    │ │
│ │ 20 sept · ADELANTO · -50.00     │ │
│ │ 20 sept · ENCARGO · -18.00      │ │
│ │ 24 sept · ADELANTO · -80.00     │ │
│ │ (mostrando 8 de 24 movimientos) │ │
│ │                              [+] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Exportar a Excel]  [Exportar a PDF] │
└─────────────────────────────────────┘
```

---

## 📈 KPIs y reportes

### KPIs para Carlos

| KPI | Fórmula | Frecuencia |
|---|---|---|
| Litros comprados este mes | SUM(REGISTRO_LECHE) WHERE month | Mensual |
| Ingresos generados | SUM(subtotal_por_contrato) WHERE cerrado_en_mes | Mensual |
| Adelantos totales dados | SUM(ADELANTO_DADO) WHERE month | Mensual |
| Encargos cobrados | SUM(ENCARGO_COBRADO) WHERE month | Mensual |
| Clientes activos | COUNT(DISTINCT cliente_id) WHERE contrato_activo | Mensual |
| Tasa de discrepancias | COUNT(discrepancias) / COUNT(registros) | Mensual |
| Ticket medio por cliente | SUM(subtotal) / COUNT(clientes_cerrados) | Mensual |

### KPIs para Juan

| KPI | Fórmula |
|---|---|
| Litros vendidos este mes | SUM(REGISTRO_LECHE) WHERE month AND cliente=Juan |
| Adelantos recibidos | SUM(ADELANTO_DADO) WHERE cliente=Juan |
| A recibir este mes | (subtotal) - (adelantos) - (encargos) |
| Quincenas cerradas totales | COUNT(contratos_cerrados) WHERE cliente=Juan |
| Boletas descargadas | COUNT(boleta.descargas) WHERE cliente=Juan |

### KPIs para Admin

- MRR de MilkBook (si hay plan premium)
- Adopción: % de lecheros que cierran en <10 min
- Litros totales procesados
- Boletas generadas
- Disputas abiertas
- Tasa de uso de módulos contables

---

## 🚫 Lo que el módulo contable NO hace

| Función | Estado | Por qué NO |
|---|---|---|
| Cobrar automáticamente | ❌ | Juan puede no tener tarjeta/Yape |
| Integración con Yape/Plin | ❌ (V2) | Solo registrar el método, no la transacción |
| Facturación electrónica | ❌ (V2) | Solo boleta por ahora |
| Microcréditos | ❌ (V3) | Habilitar data para bancos, no originar |
| Conciliación bancaria | ❌ | Carlos no usa banco (validado informalmente) |
| Predicción de ingresos | ❌ | Volatilidad del precio de la leche |
| Multi-moneda | ❌ | Solo S/ en MVP |
| Impuestos / SUNAT automático | ❌ | Solo emisión manual de boleta PDF |

---

## 📐 Implementación técnica

### Stack

- **Backend:** NestJS + Prisma + PostgreSQL.
- **Frontend app móvil:** Flutter con `provider` o `riverpod` para state management.
- **Frontend web:** React 19 + TanStack Query para data fetching.
- **Reportes:** Generación PDF con `pdf` (Flutter) y `jsPDF` (web). Excel con `excel` (JS) o `excel` package de Flutter.
- **Cache:** Redis para vistas agregadas (dashboard Carlos tarda <100ms).

### Performance esperado

- Calcular estado de cuenta: < 100ms (con 15 registros).
- Libro mayor mensual: < 200ms (con 100 movimientos).
- Generar PDF de boleta: < 1.5s.
- Exportar Excel: < 3s (con 500 movimientos).

---

## 📋 Próximos pasos

1. ✅ Módulo contable definido
2. ✅ Modelo de movimientos
3. ✅ Mockups básicos
4. ✅ KPIs definidos
5. ⏸️ Implementar schema Prisma completo
6. ⏸️ Crear endpoints de lectura (GET /movimientos, GET /estado-cuenta/:clienteId)
7. ⏸️ Crear generador de PDF de boleta
8. ⏸️ Crear exportador de Excel
9. ⏸️ Validar con Carlos y Juan reales que la información es legible

---

## 🔗 Referencias

- Personas: [`../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/`](../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/)
- Métodos de pago: [`../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/lechero-persona.md`](../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/lechero-persona.md) (validado 50/50 efectivo/Yape)
- Schema: [`../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`](../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md)
- Liquidaciones: [`../../indagacion_y_planteamiento_de_proyecto/backend/logica-negocio/liquidaciones.md`](../../indagacion_y_planteamiento_de_proyecto/backend/logica-negocio/liquidaciones.md)
- Sacar cuentas (pantalla crítica): [`../../indagacion_y_planteamiento_de_proyecto/app-movil/lechero/sacar-cuentas.md`](../../indagacion_y_planteamiento_de_proyecto/app-movil/lechero/sacar-cuentas.md)
