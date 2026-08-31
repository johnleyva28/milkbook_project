# App Lechero (Comprador) — Visión General

## Rol del lechero en el sistema

El **lechero** es el usuario principal del sistema. Su rol:
- **Registrar entregas diarias** (en su app, en la moto o en la casa del cliente).
- **Gestionar su cartera de clientes**.
- **Registrar adelantos y encargos**.
- **Cerrar contratos** cada 15 días, generando liquidación y boleta.
- **Ver estadísticas** de su negocio.

El lechero **NO** hace:
- **NO** accede a la app del cliente.
- **NO** usa la web admin (la web es solo para nuestro equipo).
- **NO** edita datos del cliente (solo el cliente puede confirmar sus litros).

## Pantallas principales (UX)

### 1. Splash + Login
- Logo + tagline.
- Login con DNI o celular + PIN.
- Opción "Soy nuevo, registrarme" (flujo de 3-5 pantallas).

### 2. Home del lechero (lo más importante)
- **Tarjeta "Hoy"** con resumen del día:
  - "Llevas 5 clientes visitados, 87 L comprados".
  - Lista rápida de los próximos 3 clientes de su ruta.
- **Botón grande "+ Registrar visita"** (acción primaria).
- **Tarjeta "Quincena actual"**:
  - Días restantes para cierre.
  - Litros acumulados.
  - Adelantos dados.
  - Encargos pendientes.
- **Notificaciones** (push recientes).

### 3. Registrar visita (pantalla principal del día)
- Lista de clientes de hoy (orden de ruta).
- Al tocar un cliente: ver historial reciente + botón "Registrar visita".
- Pantalla de registro:
  - Litros quick entry (5, 10, 15, 20, 25, 30).
  - Input manual con decimales.
  - Switch "No recogí".
  - Botón "Guardar y siguiente".

### 4. Mis clientes
- Lista de todos los clientes.
- Búsqueda por nombre o DNI.
- Filtros: activos, inactivos, con contrato activo.
- Detalle de cliente: nombre, DNI, celular, contratos previos.

### 5. Detalle de cliente
- Header: nombre, DNI, celular.
- Botón "Llamar" (abre marcador).
- Botón "WhatsApp" (abre chat).
- Contrato actual: ver detalles (litros, adelantos, encargos).
- Lista de contratos pasados.
- Botón "Iniciar nuevo contrato" (futuro).

### 6. Adelantos
- Lista de adelantos pendientes por cliente.
- Botón "Registrar nuevo adelanto".
- Formulario: cliente, monto, fecha, motivo (opcional), confirmación del cliente.

### 7. Encargos
- Lista de encargos pendientes (los que Carlos hizo y aún no cobró).
- Botón "Nuevo encargo".
- Formulario: cliente, descripción, precio estimado, foto (opcional).

### 8. Cierre de contrato (liquidación)
- Pantalla de revisión:
  - Período del contrato.
  - Tabla con días y litros (registrados por Carlos y confirmados por cliente).
  - Lista de adelantos del período.
  - Lista de encargos del período.
  - Precio por litro (variable).
  - **Cálculo total**:
    ```
    (Σlitros × precio promedio) - adelantos - encargos = monto a pagar
    ```
- Botón "Generar boleta".
- Botón "Cerrar contrato".
- Confirmación del cliente (in-app).

### 9. Mi cuenta / Configuración
- Datos del lechero.
- Ver mi plan (free / pro / enterprise futuro).
- Cambiar precio por litro.
- Configurar ruta (orden de visita).
- Cerrar sesión.

### 10. Estadísticas (futuro)
- Litros comprados por semana/mes.
- Ingresos vs adelantos dados.
- Clientes más frecuentes.
- Mapa de calor de visitas.

## Diferenciación con app del cliente

| Funcionalidad | Lechero | Cliente |
| --- | --- | --- |
| Iniciar sesión | ✅ | ✅ |
| Registrar visita / litros | ✅ (principal) | ✅ (confirmar) |
| Ver histórico | ✅ | ✅ |
| Cerrar contrato / generar boleta | ✅ | ❌ (solo confirmar) |
| Ver boleta | ✅ | ✅ |
| Registrar adelanto | ✅ | ❌ |
| Solicitar adelanto | ❌ (lo entrega directo) | ❌ |
| Registrar encargo | ✅ | ❌ |
| Confirmar recepción de encargo | ❌ | ✅ |
| Cambiar precio por litro | ✅ | ❌ |
| Ver estadísticas de negocio | ✅ (futuro) | ❌ |
| Gestionar cartera de clientes | ✅ | ❌ |

## Componentes UI clave

### Quick Entry de Litros
- Mismo patrón que app cliente.
- Botones: 5, 10, 15, 20, 25, 30 + manual con decimales.
- Switch "No recogí".

### Lista de clientes de hoy
- Orden optimizado por la ruta.
- Cada item muestra: nombre, último valor registrado, próximo a visitar.
- Tap → confirmar visita.

### Cálculo de Liquidación
- Cálculo en tiempo real según inputs.
- Tabla clara con todos los componentes.
- Botón "Generar boleta" → genera PDF + muestra QR.
- Notificación al cliente de que la liquidación está lista.

### Notificaciones Push
- "Confirmar visita pendiente de [cliente]"
- "Nuevo adelanto registrado para [cliente]"
- "Liquidación lista para confirmar"
- "Cambio de precio aplicado"

## Offline-first

- **Toda la información del lechero se cachea localmente**.
- El lechero puede trabajar todo el día sin internet.
- Al llegar a zona con señal, sincroniza todo.

## API endpoints que consume

```
GET    /api/v1/lecheros/me                       # Datos del lechero autenticado
POST   /api/v1/lecheros/registro                  # Registro inicial (DNI + RENIEC)

GET    /api/v1/lecheros/me/clientes              # Lista de clientes
POST   /api/v1/lecheros/me/clientes              # Agregar nuevo cliente
PATCH  /api/v1/lecheros/me/clientes/:id          # Actualizar cliente

GET    /api/v1/lecheros/me/ruta                  # Ruta configurada
PUT    /api/v1/lecheros/me/ruta                  # Actualizar ruta

GET    /api/v1/contratos?lechero=:id             # Contratos del lechero
POST   /api/v1/contratos                          # Iniciar nuevo contrato

POST   /api/v1/registros                          # Crear registro diario
PATCH  /api/v1/registros/:id                      # Actualizar registro

GET    /api/v1/adelantos/contrato/:id             # Adelantos del contrato
POST   /api/v1/adelantos                          # Registrar adelanto

GET    /api/v1/encargos/contrato/:id               # Encargos del contrato
POST   /api/v1/encargos                          # Registrar encargo

POST   /api/v1/liquidaciones                       # Iniciar liquidación
POST   /api/v1/liquidaciones/:id/cerrar           # Cerrar liquidación
POST   /api/v1/liquidaciones/:id/generar-boleta   # Generar boleta

GET    /api/v1/precios/activo                     # Precio vigente
PUT    /api/v1/precios/activo                     # Cambiar precio
```

Ver [`../../backend/api-design/endpoints-lechero.md`](../../backend/api-design/endpoints-lechero.md).

## Diseño visual

### Tema
- Color primario: azul profesional (confianza, formalidad).
- Color secundario: verde confirmación.
- Color de error: rojo discrepancia.

### Layouts
- Bottom navigation con 4 tabs:
  - **Hoy** (registrar visitas, ver pendientes).
  - **Clientes** (cartera).
  - **Quincena** (contrato actual, adelantos, encargos, cierre).
  - **Cuenta** (perfil, configuración).

### Modo oscuro
- Soportado (importante para uso en moto con sol).

## Offline-first en la app lechero

El lechero está **en la moto todo el día**. Sin señal la mayor parte del tiempo.

### Datos cacheados localmente
- Lista de clientes.
- Contrato actual.
- Registros del día.
- Precios vigentes.
- Adelantos y encargos pendientes.

### Datos que NO se cachean
- Históricos de más de 3 meses (se descargan bajo demanda).
- Estadísticas (siempre online).

### Estrategia de sync
- **Push**: al final del día, sincronizar todo.
- **Pull**: al abrir la app, descargar cambios recientes.
- **Background**: cada 15 minutos si hay señal.

Ver [`../offline-sync/`](../../offline-sync/) para detalle.

## Edge cases

### Carlos está en una zona sin señal y registra un litro
- Drift guarda localmente.
- Al recuperar señal, sincroniza.
- El cliente recibe push cuando Carlos sincroniza.

### Carlos cambia el precio en medio de un contrato
- El cambio aplica a partir de la fecha indicada.
- El sistema recalcula automáticamente las liquidaciones futuras.
- Las entregas pasadas mantienen el precio viejo.

### Carlos tiene 20 clientes, va en moto todo el día
- La app debe ser rápida en la moto (interrupciones, sol, etc.).
- Botones grandes (uso con guantes o dedos mojados).
- Feedback háptico importante.

### Carlos tiene un cliente nuevo
- Lechero registra: nombre, DNI, celular.
- Sistema valida DNI con RENIEC.
- Sistema crea contrato inicial (15 días default).
- Sistema envía push al cliente para que descargue la app.