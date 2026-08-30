# App Cliente (Productor/Vendedor) — Visión General

## Rol del cliente en el sistema

El **cliente** es el productor de leche (campesino). Su rol principal es:
- **Ver** lo que el lechero registró.
- **Confirmar o corregir** los litros diarios.
- **Recibir notificaciones** de adelantos, encargos, cambios de precio.
- **Confirmar liquidaciones** cuando el lechero las propone.
- **Ver historial** de ventas, adelantos, encargos.
- **Descargar boletas** cuando se emiten.

El cliente **NO** hace:
- **NO** inicia contratos (los inicia el lechero).
- **NO** gestiona precios (los gestiona el lechero).
- **NO** emite boletas (las emite el sistema a través del lechero).
- **NO** accede a la web (la web es solo para admin).

## Pantallas principales (UX)

### 1. Splash + Login
- Logo + tagline.
- Botón "Ingresar con mi DNI".
- Opción "Soy nuevo, registrarme".

### 2. Registro inicial
- Pantalla 1: número de DNI (8 dígitos).
- Pantalla 2: nombre completo (auto-completado desde RENIEC).
- Pantalla 3: celular (para Yape).
- Pantalla 4: dirección (texto libre o GPS).
- Pantalla 5: foto del establo (opcional).
- Pantalla 6: confirmación.

### 3. Home del cliente (lo más importante)
- **Tarjeta grande** con el nombre del lechero activo (Carlos).
- **Botón grande**: "Confirmar litros de hoy" (si hay litros pendientes de confirmar).
- **Tarjeta resumen**:
  - "Esta quincena llevas 280 L".
  - "Te deben S/ 420 aproximadamente".
- **Lista de notificaciones recientes** (últimas 5).

### 4. Pantalla "Confirmar litros"
- Lista de los días del contrato actual.
- Para cada día: input numérico grande con **botones quick**: 5, 10, 15, 20, 25, 30 L.
- **Botón "No vendí"** (casilla que marca el día como 0).
- Si el lechero registró algo distinto, ambos valores se muestran.
- Botón "Guardar" al final.

### 5. Mi contrato actual
- Período (ej: "Quincena del 15 al 29 de septiembre").
- Días transcurridos / restantes.
- Litros vendidos (acumulado).
- Adelantos pendientes (lista con descripción).
- Encargos pendientes (lista con descripción).
- Monto estimado a recibir (cálculo en tiempo real).
- Botón "Ver liquidación cuando esté lista".

### 6. Mi historial
- Lista de contratos pasados (scrollable).
- Cada item: período, litros totales, monto pagado.
- Filtro: por año, por lechero.
- Botón "Ver boleta" (descarga PDF).

### 7. Mi perfil
- Nombre, DNI, dirección.
- Lechero(s) activo(s).
- Cambiar foto.
- Cambiar celular.
- Cerrar sesión.

## Componentes UI clave

### Botones de Quick Entry
- Tamaños: mínimo 60×60 dp cada uno.
- Colores diferenciados: verde para "5", azul para "10", etc. (consistencia con app lechero).
- Animación al tap (feedback táctil).
- Input manual al lado para decimales o valores no listados.

### Inputs numéricos
- Teclado numérico forzado.
- Hasta 2 dígitos decimales (ej: 19.5).
- Botones +/- para incrementar/decrementar.
- Validación: máximo 100 L por día (sanity check).

### Casilla "No vendí"
- Switch grande.
- Color rojo cuando activado.
- Texto: "Hoy no vendí leche".
- Bloquea la entrada de litros en ese día.

### Notificaciones
- Banner en home con conteo.
- Lista cronológica.
- Acciones rápidas: "Confirmar", "Ver detalle", "Marcar leído".

## Offline-first en la app cliente

- **Lee del Drift local** (sincronizado previamente).
- **Escribe al Drift local** + encola en outbox.
- **Sincroniza al backend** cuando hay conectividad.
- **Resolución de conflictos**: si el lechero y el cliente registran valores distintos, el sistema **NO sobrescribe automáticamente**; muestra una pantalla de resolución.

## Diferencia con app lechero

| Funcionalidad | Cliente | Lechero |
| --- | --- | --- |
| Ver litros del día | ✅ | ✅ |
| Confirmar litros | ✅ | ✅ |
| Registrar litros nuevos | ❌ | ✅ (principal) |
| Ver adelantos | ✅ | ✅ |
| Solicitar adelanto | ❌ (futuro) | ❌ (lo entrega directamente) |
| Ver encargos | ✅ | ✅ |
| Confirmar encargo recibido | ✅ | ❌ |
| Solicitar encargo | ✅ (futuro) | ❌ |
| Cerrar contrato (generar liquidación) | ❌ | ✅ (principal) |
| Confirmar liquidación | ✅ | ❌ |
| Ver boletas | ✅ | ✅ |
| Cambiar precio | ❌ | ✅ |
| Ver estadísticas de negocio | ❌ | ✅ (futuro) |

## API endpoints que consume

```
GET    /api/v1/clientes/me                       # Datos del cliente autenticado
POST   /api/v1/clientes/registro                  # Registro inicial (DNI + RENIEC)
PATCH  /api/v1/clientes/me                        # Actualizar perfil

GET    /api/v1/contratos/activo                  # Contrato actual del cliente
GET    /api/v1/contratos/:id                      # Detalle de contrato específico
GET    /api/v1/contratos/:id/registros            # Registros diarios del contrato

POST   /api/v1/registros/:id/confirmar             # Confirmar litros del día
PATCH  /api/v1/registros/:id                      # Corregir litros (con justificación)
POST   /api/v1/registros/:id/no-vendio            # Marcar día como no vendido

GET    /api/v1/adelantos/cliente/:clienteId       # Adelantos pendientes
POST   /api/v1/adelantos/:id/confirmar             # Confirmar recepción de adelanto

GET    /api/v1/encargos/cliente/:clienteId        # Encargos pendientes
POST   /api/v1/encargos/:id/confirmar              # Confirmar recepción de encargo

GET    /api/v1/liquidaciones/:id                  # Detalle de liquidación
POST   /api/v1/liquidaciones/:id/confirmar         # Confirmar liquidación
POST   /api/v1/liquidaciones/:id/disputar          # Abrir disputa

GET    /api/v1/boletas/:id                        # Detalle de boleta
GET    /api/v1/boletas/:id/pdf                    # PDF de boleta
```

Ver [`../backend/api-design/endpoints-cliente.md`](../../backend/api-design/endpoints-cliente.md) para detalle.

## Diseño visual específico

### Paleta de colores
- **Primario**: verde confianza (recolección, naturaleza).
- **Secundario**: azul leche (frescura).
- **Acento**: amarillo (destacados, alertas).
- **Error**: rojo (discrepancias, alertas críticas).
- **Texto**: gris oscuro (legibilidad).

### Tipografía
- Tamaño base: 16sp (más grande que default).
- Botones quick: 24sp en números.
- Botones primarios: 18sp bold.

### Iconografía
- Iconos grandes, coloridos.
- Material Icons o similar.
- Text labels SIEMPRE acompañando al icono (accesibilidad).

Ver [`../diseno-ux/`](../../diseno-ux/) para principios completos.