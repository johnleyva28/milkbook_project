# App Lechero — Pantalla "Mis clientes": búsqueda, agrupación y vistas

## Contexto y problema

Carlos (lechero) tiene **20-50 clientes activos**. Necesita una vista optimizada para:

1. **Encontrar al cliente correcto** cuando está en su moto, en la mañana, sin señal a veces.
2. **Ver la cartera completa** para entender su negocio.
3. **Cerrar la quincena** casa por casa (vista "Para sacar cuentas hoy") recorriendo los clientes del contrato actual.
4. **Buscar un cliente puntual** cuando le piden un encargo o tiene una duda.

La pantalla anterior era una lista plana + búsqueda por nombre. Ahora se rediseñó como un **módulo de dos interfaces principales + interfaz secundaria**.

---

## Arquitectura del módulo (dos interfaces principales)

```
┌──────────────────────────────────────────────────────────┐
│  Módulo "Clientes"                                       │
│  ┌───────────────┬──────────────────────────────┐       │
│  │  Lista de     │   Detalle del                │       │
│  │  productores  │   productor                  │       │
│  │  (PRINCIPAL)  │   (SECUNDARIA —              │       │
│  │               │    se abre al tocar uno)     │       │
│  └───────────────┴──────────────────────────────┘       │
│                                                          │
│  Dentro del detalle → acción "Anotar o confirmar        │
│  cantidad" → abre ConfirmarRecoleccionScreen            │
└──────────────────────────────────────────────────────────┘
```

### Interfaz principal — Lista de productores

Es la pantalla que ve Carlos apenas abre el módulo. Ofrece **dos vistas conmutables**:

- **Vista cards** (default): tarjetas grandes con foto, nombre, última visita, estado del contrato.
- **Vista detalle**: lista compacta con más items visibles por pantalla.

Un toggle en la parte superior permite alternar. La elección se persiste en las preferencias del usuario.

### Interfaz secundaria — Detalle del productor

Cuando Carlos toca un productor de la lista, entra al detalle donde puede:

- Ver info del cliente (DNI, celular, contratos).
- Llamar / mandar WhatsApp.
- Ver historial de visitas.
- **Acceder a la acción principal: "📝 Anotar o confirmar cantidad"** (que abre `ConfirmarRecoleccionScreen`).
- Registrar adelanto, encargo, ver liquidación.

---

## Pantalla principal: "Mis clientes" (vista cards)

```
┌──────────────────────────────────────────────────────┐
│ Mis clientes                          [🔍]  [⚙]    │
│ 32 productores · 24 con contrato vigente            │
├──────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐  │
│  │  Vista:  [▢ Cards]  [☰ Detalle]              │  │
│  │  Orden:   [A-Z ▾]                             │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  [ Vigentes (24) | Vencidos (8) ]                   │  ← tabs/filtro
│  [ 🔍 Buscar productor...               ]            │  ← búsqueda integrada
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ [Foto]  Ana Cruz Vargas                  [>]│  │
│  │         DNI: 12345678                       │  │
│  │         Última visita: ayer · 20 L          │  │
│  │         Contrato: VIGENTE · 8 días          │  │
│  │         Quincena: 18-22 sept                │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ [Foto]  Carlos Quispe Mamani             [>]│  │
│  │         DNI: 87654321                       │  │
│  │         Última visita: hoy · 17.5 L ✓     │  │
│  │         Contrato: VIGENTE · 3 días          │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ [Foto]  Juan Pérez López                [>]│  │
│  │         DNI: 11223344                       │  │
│  │         Última visita: hace 3 días · 18 L  │  │
│  │         Contrato: VIGENTE · 5 días          │  │
│  │         ⚠️ Discrepancia pendiente           │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  [ Mostrar más... ]                                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Componentes:**
- **Toggle Vista:** `▢ Cards` / `☰ Detalle`. Default: cards. Persiste en SharedPreferences.
- **Orden:** dropdown con `A-Z (alfabético)` (default), `Z-A`, `Última visita (recientes primero)`, `Última visita (antiguos primero)`. Más adelante: por litros producidos, por monto pendiente.
- **Tabs de filtro:** `| Vigentes | Vencidos |`. Default: Vigentes. Conteo entre paréntesis.
- **Barra de búsqueda:** siempre visible arriba. Búsqueda fuzzy por nombre o DNI.

---

## Pantalla principal: "Mis clientes" (vista detalle)

```
┌──────────────────────────────────────────────────────┐
│ Mis clientes                          [🔍]  [⚙]    │
│ 32 productores · 24 con contrato vigente            │
├──────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐  │
│  │  Vista:  [▢ Cards]  [☰ Detalle ✓]            │  │
│  │  Orden:   [A-Z ▾]                             │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  [ Vigentes (24) | Vencidos (8) ]                   │
│  [ 🔍 Buscar productor...               ]            │
│                                                      │
│  A                                                  │
│  ┌──────────────────────────────────────────────┐  │
│  │ Ana Cruz V.      DNI 12345678      [>]      │  │
│  │ ayer · 20 L · VIGENTE                        │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │ Andrés López H.   DNI 22345678      [>]      │  │
│  │ hoy · 22 L · VIGENTE                         │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  C                                                  │
│  ┌──────────────────────────────────────────────┐  │
│  │ Carlos Quispe M. DNI 87654321      [>]      │  │
│  │ hoy · 17.5 L ✓ · VIGENTE                     │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  J                                                  │
│  ┌──────────────────────────────────────────────┐  │
│  │ Juan Pérez L.    DNI 11223344      [>]      │  │
│  │ hace 3 días · 18 L · VIGENTE                 │  │
│  │ ⚠ discrepancia                               │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Diferencias con vista cards:**
- Sin foto (más items visibles).
- Agrupado por inicial alfabética (`A`, `C`, `J`...).
- Una sola línea por cliente.
- Badge "⚠ discrepancia" inline si tiene.

---

## Tabs: Vigentes | Vencidos

### Default: Vigentes

Solo muestra productores con contrato en estado `ACTIVO`. Esto es lo que Carlos ve normalmente porque son los que le importan para el día a día.

### Tab Vencidos

Muestra productores cuyo contrato está `CERRADO` o `CANCELADO`. Sirve para:
- Ver histórico de un cliente antiguo.
- Recuperar un cliente que dejó de vender.
- Hacer seguimiento de quién dejó de comprar leche.

### Comportamiento

- Al cambiar de tab, **se resetea la búsqueda** (porque los resultados no se mezclan).
- Al cambiar de tab, **se mantiene el scroll** si hay cache de esa vista.

---

## Búsqueda integrada

### Búsqueda fuzzy

- Busca por **nombre completo** o **DNI**.
- Permite typos (ej: "juan perez" encuentra "Juan Pérez", "1234567" encuentra "12345678").
- Coincidencia **case-insensitive**.
- Ordena resultados por relevancia (nombre exacto > empieza con > contiene > fuzzy).

```dart
// Implementación
Future<List<Cliente>> buscar(String query) async {
  if (query.isEmpty) return _todosVigentes();

  final clientes = await _db.clientes.getAll();
  return clientes.where((c) {
    final nombre = c.nombre.toLowerCase();
    final dni = c.dni;
    final q = query.toLowerCase();

    // Match exacto
    if (nombre == q) return true;
    if (dni == q) return true;

    // Empieza con
    if (nombre.startsWith(q)) return true;

    // Contiene
    if (nombre.contains(q)) return true;
    if (dni.contains(q)) return true;

    // Fuzzy (Levenshtein ≤ 2)
    return _levensthein(nombre, q) <= 2;
  }).toList();
}
```

### Barra de búsqueda

- Aparece **siempre visible** arriba (no hay que hacer scroll).
- Tiene un ícono de lupa + placeholder "Buscar productor...".
- Botón "✕" para limpiar (aparece solo si hay texto).
- Al tocar Enter, hace focus en el primer resultado.

---

## Vista especial: "Para sacar cuentas hoy"

> Esta es la **vista más crítica** durante la sacado de cuentas (2-3 días cada quincena, 20-40 min por cliente).

Cuando Carlos está cerrando contratos, abre una **vista filtrada** que muestra solo los clientes del **contrato actual que vence en los próximos 3 días** y que aún no han sido cerrados.

```
┌──────────────────────────────────────────────────────┐
│ ← Mis clientes             [⚙ Vista: cards ▾]      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │ 🔥 Para sacar cuentas HOY                    │  │  ← banner especial
│  │ 8 clientes pendientes de cerrar la quincena   │  │
│  │ Quincena actual: 15-29 sept                   │  │
│  │ [ Ver lista optimizada → ]                    │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  [ Vigentes (24) | Vencidos (8) ]                   │
│  ...vista normal...                                  │
└──────────────────────────────────────────────────────┘
```

**Lógica del banner "Para sacar cuentas hoy":**
- Aparece solo si hay contratos que **vence en ≤3 días** y están en estado `ACTIVO` y sin liquidación generada.
- El número entre paréntesis indica cuántos clientes faltan cerrar.

### Pantalla "Para sacar cuentas hoy"

```
┌──────────────────────────────────────────────────────┐
│ ← Para sacar cuentas HOY                             │
│ Quincena: 15-29 sept · 8 clientes                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Orden sugerido: por ruta (los más cercanos primero) │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ 1. Juan Pérez L.                          [>]│  │
│  │    📍 2.3 km · 287 L · 3 discrepancias     │  │
│  │    [📝 Cerrar y generar boleta]              │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │ 2. Ana Cruz V.                           [>]│  │
│  │    📍 4.1 km · 250 L · 0 discrepancias      │  │
│  │    [📝 Cerrar y generar boleta]              │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────┐  │
│  │ 3. Carlos Quispe M.                       [>]│  │
│  │    📍 5.8 km · 310 L · 1 discrepancia        │  │
│  │    ⚠ Resolver discrepancia antes de cerrar  │  │
│  │    [📝 Cerrar y generar boleta]              │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ... más 5 clientes ...                              │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ ✅ Ya cerrados hoy (2)                      │  │
│  │ ✓ María López     18:30                      │  │
│  │ ✓ Pedro Huamán    19:15                      │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Cada item muestra:**
- **Orden sugerido** (1, 2, 3...) basado en ruta optimizada (los más cercanos primero).
- **Distancia** desde la ubicación actual de Carlos.
- **Total litros** del contrato actual.
- **Discrepancias pendientes** (banner amarillo si > 0).
- **Botón principal** "Cerrar y generar boleta" → abre la pantalla `Sacar Cuentas` (ver `sacar-cuentas.md`).

**Filtros aplicados:**
- Contrato en estado `ACTIVO`.
- `fechaFin <= hoy + 3 días`.
- Sin liquidación generada todavía.

**Orden:**
- Por defecto: ruta optimizada (usando GPS + histórico de visitas).
- Alternativa: alfabético (cuando no hay GPS).

---

## Filtros avanzados (próximamente)

> Estos filtros se irán agregando progresivamente. La estructura ya está pensada para soportarlos.

### Plan v1 (primera iteración)

| Filtro | Uso |
|---|---|
| Por **región/zona** | Útil cuando Carlos tiene clientes en varios caseríos |
| Por **adelantos pendientes** | Saber quién le debe más, priorizar cierre |
| Por **encargos pendientes** | Verificar antes de la sacado de cuentas |

### Plan v2

| Filtro | Uso |
|---|---|
| Por **litros producidos** (alto/medio/bajo) | Segmentar para promociones |
| Por **días desde última visita** | Detectar clientes en riesgo de abandono |
| Por **estado del contrato** (a punto de vencer, vigente, etc.) | Vista complementaria al tab Vigentes/Vencidos |

### Implementación del menú de filtros

```
┌──────────────────────────────────────────────┐
│  Filtros                              [✕]    │
├──────────────────────────────────────────────┤
│  Región:    [Todas ▾]                       │
│  Adelantos: [Todos | Con pendientes | Sin]  │
│  Encargos:  [Todos | Con pendientes | Sin]  │
│  Litros:    [Todos | Alto >20 | Bajo <10]  │
│                                              │
│  [Limpiar filtros]              [Aplicar]    │
└──────────────────────────────────────────────┘
```

---

## Componentes Flutter

- `MisClientesScreen` — la pantalla principal del módulo.
- `ClienteCardView` — vista en formato tarjeta.
- `ClienteListView` — vista en formato lista compacta.
- `VistaToggle` — el conmutador de cards/lista.
- `OrdenDropdown` — el selector de orden.
- `TabsVigenteVencido` — los tabs de filtro.
- `SearchBarClientes` — barra de búsqueda con fuzzy.
- `BannerSacarCuentas` — el banner que aparece si hay contratos por cerrar.
- `PantallaSacarCuentasHoy` — la vista optimizada para cerrar la quincena.
- `ClienteItemOrdenado` — cada item con orden sugerido.

---

## API endpoints que consume

```
GET    /api/v1/lecheros/me/clientes                    # Todos mis clientes
GET    /api/v1/lecheros/me/clientes?vigentes=true       # Solo vigentes
GET    /api/v1/lecheros/me/clientes?vencidos=true       # Solo vencidos
GET    /api/v1/lecheros/me/clientes?buscar=juan          # Búsqueda fuzzy
GET    /api/v1/lecheros/me/clientes?orden=alfabetico    # Ordenamiento
GET    /api/v1/lecheros/me/clientes/para-cerrar         # Lista "Para sacar cuentas hoy"
GET    /api/v1/clientes/:id                            # Detalle del cliente
GET    /api/v1/clientes/:id/contratos                   # Contratos del cliente
```

---

## Consideraciones offline-first

- La lista de clientes **siempre se descarga completa** al abrir la app (cache local en Drift).
- La búsqueda funciona **offline** contra el cache local.
- La lista "Para sacar cuentas hoy" se calcula al abrir la app contra el cache local + sync del día.
- La distancia al cliente se calcula **localmente** con GPS (no se llama al backend).

---

## Métricas UX

- **Tiempo medio para encontrar un cliente específico** (búsqueda): target < 5 segundos.
- **% de veces que Carlos usa la vista cards vs detalle**: ~50/50 según observado.
- **% de cierres de quincena hechos desde la vista "Para sacar cuentas hoy"**: target > 80%.
- **% de filtros avanzados usados** (cuando se agreguen): medir para entender cuáles realmente sirven.