# WF-L-08: Estadísticas y Reportes — App Lechero (Carlos)

## Propósito
Permitir a Carlos ver el rendimiento de su negocio: litros comprados, ingresos generados, adelantos dados, encargos cobrados, comparativa entre quincenas. Y descargar reportes en PDF/CSV.

## Datos que muestra

### Dashboard principal
- KPIs del mes en curso:
  - Litros comprados (vs mes anterior)
  - Ingresos generados
  - Adelantos dados (pendientes vs cobrados)
  - Encargos cobrados
  - Clientes activos
  - Tasa de discrepancias
- Gráfico de tendencia (últimos 6 meses)

### Reportes descargables
- Reporte mensual completo (PDF)
- Libro mayor (Excel/CSV)
- Detalle por cliente (Excel/CSV)
- Boletas generadas (PDF, ZIP)

## Wireframe (Dashboard)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ ← Reportes                  📥 Desc. │
├──────────────────────────────────────┤
│                                       │
│ SEPTIEMBRE 2026                       │
│ ┌──────────────────────────────────┐│
│ │ 💧 Litros comprados              ││
│ │    4,250 L                       ││
│ │    ↑ 8% vs ago                   ││
│ ├──────────────────────────────────┤│
│ │ 💰 Ingresos generados            ││
│ │    S/ 6,375.00                   ││
│ │    ↑ 8% vs ago                   ││
│ ├──────────────────────────────────┤│
│ │ 💸 Adelantos dados                ││
│ │    S/ 1,250.00  (5 pendientes)   ││
│ ├──────────────────────────────────┤│
│ │ 🛒 Encargos cobrados              ││
│ │    S/ 380.00                     ││
│ ├──────────────────────────────────┤│
│ │ 👥 Clientes activos               ││
│ │    23 / 30 totales               ││
│ ├──────────────────────────────────┤│
│ │ ⚠ Tasa de discrepancias           ││
│ │    4.2% (3 de 71 registros)      ││
│ │    ↑ 0.5% vs ago                 ││
│ └──────────────────────────────────┘│
│                                       │
│ TENDENCIA 6 MESES                     │
│ ┌──────────────────────────────────┐│
│ │                                  ││
│ │ 📈 [gráfico de barras]           ││
│ │    S/ 0    S/ 6000               ││
│ │    ───────                       ││
│ │    May Jun Jul Ago Sep Oct       ││
│ │    3.2k 4.1k 4.5k 5.9k 6.4k     ││
│ │                                  ││
│ └──────────────────────────────────┘│
│                                       │
│ TOP CLIENTES (este mes)               │
│ ┌──────────────────────────────────┐│
│ │ 1. Juan Pérez        1,250 L    ││
│ │ 2. María Gómez       980 L      ││
│ │ 3. Pedro Díaz        870 L      ││
│ │ 4. Rosa López        720 L      ││
│ │ 5. Carla Torres      430 L      ││
│ │ [Ver todos los 23]               ││
│ └──────────────────────────────────┘│
│                                       │
│ [📥 Descargar reporte PDF]           │
│ [📊 Descargar libro mayor Excel]    │
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  👥Clientes  📋Quincena  📊│
└──────────────────────────────────────┘
```

## Wireframe (Selector de período)

```
┌──────────────────────────────────────┐
│  Reportes                             │
├──────────────────────────────────────┤
│                                       │
│ PERÍODO                              │
│ ┌──────────────────────────────────┐│
│ │ 📅 Este mes (sept 2026)         ││
│ │                                  ││
│ │ 📅 Mes anterior (agosto 2026)    ││
│ │                                  ││
│ │ 📅 Trimestre (jul-sep 2026)     ││
│ │                                  ││
│ │ 📅 Semestre (abr-sep 2026)      ││
│ │                                  ││
│ │ 📅 Año (ene-dic 2026)            ││
│ │                                  ││
│ │ 📅 Personalizado:                ││
│ │   Desde: [fecha] Hasta: [fecha]  ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## Wireframe (Reporte descargable)

```
┌──────────────────────────────────────┐
│  Descargar reporte                    │
├──────────────────────────────────────┤
│                                       │
│ PERÍODO: Sept 2026                    │
│ TIPO DE REPORTE:                      │
│                                       │
│ ◉ Resumen ejecutivo (PDF, 1-2 págs)  │
│ ○ Libro mayor completo (CSV)         │
│ ○ Detalle por cliente (CSV)          │
│ ○ Boletas generadas (ZIP con PDFs)    │
│ ○ Estado de cuenta por cliente       │
│                                       │
│ ┌──────────────────────────────────┐│
│ │   📥 DESCARGAR                    ││
│ └──────────────────────────────────┘│
│                                       │
│ También enviaremos el reporte a:      │
│ ┌──────────────────────────────────┐│
│ │ carlos.mendoza@gmail.com          ││
│ └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

## KPIs detallados

### Cálculo de cada KPI

```typescript
// Litros comprados
const litrosComprados = registros.reduce((sum, r) => sum + r.litros, 0);

// Ingresos generados
const ingresosGenerados = liquidaciones.reduce((sum, l) => sum + l.subtotal, 0);

// Adelantos dados
const adelantosDados = adelantos.reduce((sum, a) => sum + a.monto, 0);
const adelantosPendientes = adelantos
  .filter(a => !a.confirmadoPorCliente)
  .reduce((sum, a) => sum + a.monto, 0);
const adelantosCobrados = adelantos
  .filter(a => a.liquidado)
  .reduce((sum, a) => sum + a.monto, 0);

// Encargos
const encargosCobrados = encargos
  .filter(e => e.entregado && e.confirmadoPorCliente)
  .reduce((sum, e) => sum + e.precioEstimado, 0);

// Tasa de discrepancias
const totalRegistros = registros.length;
const discrepancias = registros.filter(r => r.estado === 'RECOGIDO_DISCREPANCIA').length;
const tasaDiscrepancias = (discrepancias / totalRegistros) * 100;
```

## Comparativa con mes anterior

```typescript
const compararConMesAnterior = (kpiActual: number, kpiAnterior: number): number => {
  if (kpiAnterior === 0) return 0;
  return ((kpiActual - kpiAnterior) / kpiAnterior) * 100;
};

// Resultado:
// +8%   → crecimiento (verde)
// -5%   → decrecimiento (rojo)
// 0%    → estable (gris)
```

## Gráfico de tendencia

- **Tipo:** barras verticales (últimos 6 meses).
- **Eje X:** meses (May-Oct).
- **Eje Y:** litros comprados o ingresos generados.
- **Color:** verde MilkBook (`--green-500`).
- **Tooltip:** al tocar cada barra, muestra litros + ingresos + clientes activos.

## Reportes descargables — detalle técnico

### 1. Resumen ejecutivo (PDF, 1-2 páginas)

```
Contenido:
- Header con logo y datos del lechero
- Período del reporte
- KPIs principales (litros, ingresos, adelantos, encargos)
- Top 5 clientes del período
- Comparativa con período anterior
- Gráfico de tendencia
- Notas relevantes (discrepancias, disputas)
```

### 2. Libro mayor completo (CSV)

```
Columnas:
- fecha
- tipo_movimiento
- descripcion
- monto (positivo=ingreso, negativo=egreso)
- cliente (DNI + nombre)
- referencia (id de contrato/registro)
- audit_quien (quién hizo el movimiento)
```

### 3. Detalle por cliente (CSV)

```
Una fila por cliente:
- cliente_dni
- cliente_nombre
- litros_totales
- ingresos_totales
- adelantos_dados
- adelantos_pendientes
- encargos_cobrados
- boletas_generadas (count)
- tasa_discrepancias
```

### 4. Boletas generadas (ZIP)

```
Cada boleta en PDF individual:
- boleta_001.pdf
- boleta_002.pdf
- ...
- resumen.zip con todos
```

## Edge cases

| Caso | UX |
|---|---|
| Carlos es nuevo y no tiene datos del mes anterior | Mostrar solo mes actual, sin comparativa |
| Carlos tiene empleados | Mostrar filtro "Por empleado" (cuánto hizo cada uno) |
| Carlos quiere ver histórico de hace 2 años | Permitir filtrar hasta 5 años atrás |
| Carlos está offline | Mostrar últimos datos sincronizados, no tiempo real |
| Carlos tiene 100+ clientes | Paginación en el top, lazy load |
| Carlos quiere ver reporte de un cliente específico | Drill-down: tocar cliente → vista detalle |

## Notas de copy

- **"Litros comprados":** vs "litros vendidos" (Carlos compra, no vende). Aclarar para evitar confusión.
- **"Ingresos generados":** es lo que él FACTURA a sus clientes. NO es su ganancia (eso sería después de costos).
- **"Adelantos dados (5 pendientes)":** separa lo total de lo pendiente, importante para Carlos.

## Métricas

- **% de Carlos que abre reportes mensualmente:** target > 50%
- **% de reportes descargados vs consultados:** target > 10% descarga
- **Tiempo medio de sesión en reportes:** target < 60 seg
- **NPS de la sección de reportes:** target > 35

## Conexiones

- **←** WF-L-01 (home): tap en "Reportes" del bottom nav
- **→** desde WF-L-06 (sacar cuentas): "Ver reporte de esta quincena"

## Versión
1.0 — 2026-09-07 — Documento inicial.
