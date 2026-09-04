# Backend — Endpoints del Lechero (Carlos)

> **Documento vivo.** Se actualiza con cada cambio en los flujos del lechero.
> Última actualización: incluye endpoints del flujo v3 de doble registro.

## Convenciones generales

- **Base URL:** `/api/v1`
- **Auth:** Bearer JWT en header `Authorization` (todos los endpoints).
- **Permisos:** solo `LECHERO` puede acceder (excepto donde se indique).
- **Idempotencia:** toda mutación acepta header `Idempotency-Key` (UUID v4). Sin este header, el backend genera uno basado en el payload (riesgo de duplicados en retries).
- **Offline-first:** los endpoints críticos de registro soportan `client_timestamp` y manejan conflictos con lógica LWW por timestamp del servidor.

## Tabla de endpoints

| Método | Endpoint | Propósito | Auth |
|---|---|---|---|
| `GET` | `/lecheros/me` | Mi perfil de lechero | Lechero |
| `PATCH` | `/lecheros/me` | Actualizar mi perfil | Lechero |
| `GET` | `/lecheros/me/clientes` | Lista de mis clientes | Lechero |
| `GET` | `/lecheros/me/clientes/para-cerrar` | Clientes para sacar cuentas hoy | Lechero |
| `POST` | `/lecheros/me/clientes` | Agregar cliente (por DNI) | Lechero |
| `PATCH` | `/lecheros/me/clientes/:id` | Actualizar cliente | Lechero |
| `GET` | `/lecheros/me/ruta` | Mi ruta del día | Lechero |
| `PUT` | `/lecheros/me/ruta` | Actualizar mi ruta | Lechero |
| `GET` | `/lecheros/me/estadisticas` | Métricas básicas | Lechero |
| `GET` | `/registros/contrato/:cid/hoy` | Pendientes de hoy del lechero | Lechero |
| `POST` | `/registros/:id/carlos-reco gio` | Marcar "✓ recogido" con cantidad (CASO A) | Lechero |
| `POST` | `/registros/:id/carlos-reco gio-solo` | Carlos registra solo sin que vendedor haya registrado (CASO B) | Lechero |
| `POST` | `/registros/:id/carlos-no-reco gio` | Marcar "✕ no recogí" | Lechero |
| `GET` | `/contratos?lechero=:id` | Contratos del lechero | Lechero |
| `POST` | `/contratos` | Iniciar nuevo contrato | Lechero |
| `PATCH` | `/contratos/:id/duracion` | Modificar duración | Lechero |
| `POST` | `/contratos/:id/cerrar` | Cerrar contrato | Lechero |
| `POST` | `/adelantos` | Crear adelanto | Lechero |
| `GET` | `/adelantos/contrato/:id` | Adelantos del contrato | Lechero |
| `POST` | `/encargos` | Crear encargo | Lechero |
| `GET` | `/encargos/contrato/:id` | Encargos del contrato | Lechero |
| `POST` | `/liquidaciones` | Iniciar liquidación | Lechero |
| `POST` | `/liquidaciones/:id/cerrar` | Cerrar liquidación | Lechero |
| `POST` | `/liquidaciones/:id/generar-boleta` | Generar boleta | Lechero |
| `GET` | `/precios/activo` | Precio vigente | Lechero |
| `PUT` | `/precios/activo` | Cambiar precio | Lechero |

---

## Endpoints detallados

### `GET /api/v1/lecheros/me`

Devuelve el perfil del lechero autenticado.

**Response 200:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "dni": "12345678",
    "nombre": "Carlos Quispe Mamani",
    "celular": "987654321",
    "email": null,
    "direccion": "Jr. Los Pinos 123, Cajamarca",
    "precioPorLitroActual": "1.5000",
    "metodoPagoPreferido": "MIXTO",
    "configuracion": {
      "firmaMetodo": "BIOMETRIA_DACTILAR",
      "mostrarRuta": true,
      "ordenamientoClientes": "alfabetico"
    }
  }
}
```

---

### `GET /api/v1/lecheros/me/clientes`

Lista todos los clientes del lechero. Soporta filtros.

**Query params:**
- `vigentes=true` → solo clientes con contrato `ACTIVO`.
- `vencidos=true` → solo clientes con contrato `CERRADO` o `CANCELADO`.
- `buscar=juan` → búsqueda fuzzy por nombre o DNI.
- `orden=alfabetico` (default) | `ultima_visita_desc` | `ultima_visita_asc`.
- `region=cajamarca` (futuro).
- `con_adelantos=true` (futuro).
- `limit=50` (default 50, max 200).
- `offset=0` (paginación).

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "dni": "11223344",
      "nombre": "Juan Pérez López",
      "celular": "987111222",
      "fotoEstabloUrl": "https://cdn.../establo.jpg",
      "ultimaVisita": "2026-09-17",
      "ultimaVisitaLitros": "18.5",
      "contratoActivo": {
        "id": "uuid",
        "fechaInicio": "2026-09-15",
        "fechaFin": "2026-09-29",
        "duracionDias": 15,
        "precioLitroInicio": "1.5000",
        "estado": "ACTIVO",
        "diasRestantes": 2,
        "disputaPendiente": false
      }
    }
  ],
  "meta": {
    "total": 24,
    "limit": 50,
    "offset": 0
  }
}
```

---

### `GET /api/v1/lecheros/me/clientes/para-cerrar`

Lista optimizada de clientes cuyo contrato vence en ≤3 días y aún no tiene liquidación.

**Response 200:**
```json
{
  "data": [
    {
      "clienteId": "uuid",
      "nombre": "Juan Pérez López",
      "dni": "11223344",
      "direccion": "Caserío Llacanora",
      "coordenadasGps": "-7.123,-78.456",
      "contratoId": "uuid",
      "fechaFin": "2026-09-20",
      "diasRestantes": 1,
      "totalLitrosEstimado": "287.50",
      "disputasPendientes": 0,
      "distanciaKm": 2.3
    }
  ],
  "meta": {
    "total": 8,
    "quincenaActual": "2026-09-15 al 2026-09-29"
  }
}
```

> La distancia se calcula en backend si Carlos envió su última ubicación conocida (header `X-Last-Known-Location: lat,lon`).

---

### `POST /api/v1/lecheros/me/clientes`

Agrega un cliente nuevo al sistema. Puede ser:
1. Cliente que ya existe en el sistema (se vincula al contrato del lechero).
2. Cliente nuevo (se crea pre-registro; debe completar su registro después).

**Request:**
```json
{
  "dni": "11223344",
  "celular": "987111222",
  "observaciones": "Vive en caserío Llacanora, 5 vacas"
}
```

**Response 201:**
```json
{
  "data": {
    "clienteId": "uuid",
    "existeEnSistema": true,
    "nombre": "Juan Pérez López",
    "estadoVinculacion": "PENDIENTE_CONFIRMACION_CLIENTE",
    "mensaje": "Se envió push al cliente para que confirme la vinculación"
  }
}
```

**Errores:**
- `400 DNI_INVALIDO` — DNI no encontrado en RENIEC.
- `409 CLIENTE_YA_VINCULADO` — El cliente ya tiene contrato activo con este lechero.

---

### `GET /api/v1/registros/contrato/:cid/hoy`

Lista los registros del día actual de un contrato, agrupados por cliente.

**Response 200:**
```json
{
  "data": [
    {
      "registroId": "uuid",
      "contratoId": "uuid",
      "fecha": "2026-09-18",
      "cliente": {
        "id": "uuid",
        "nombre": "Juan Pérez López",
        "dni": "11223344"
      },
      "estado": "ESPERANDO_LECHERO",
      "litrosCarlos": null,
      "litrosCliente": "17.00",
      "registradoPorVendedorAt": "2026-09-18T05:35:00Z",
      "carlosRecogio": false,
      "recogidoPorCarlosAt": null,
      "disputa": false
    },
    {
      "registroId": "uuid",
      "estado": "PENDIENTE",
      "litrosCarlos": null,
      "litrosCliente": null,
      "registradoPorVendedorAt": null,
      "carlosRecogio": false,
      "cliente": { "nombre": "Pedro Huamán", "dni": "33445566" }
    }
  ],
  "meta": {
    "totalPendientes": 8,
    "totalRecogidos": 5,
    "fecha": "2026-09-18"
  }
}
```

**Estados posibles por registro:**
- `PENDIENTE`: nadie ha registrado.
- `ESPERANDO_LECHERO`: vendedor registró, falta Carlos.
- `ESPERANDO_VENDEDOR`: Carlos ya marcó "✓ recogido", falta vendedor.
- `RECOGIDO_COINCIDE` / `RECOGIDO_DISCREPANCIA`: completo, Carlos ya recogió.
- `RECOGIDO_SIN_CONFIRMAR`: Carlos registró solo (24 h para que vendedor confirme).
- `NO_VENDIO`: cliente confirmó que no vendió.

---

### `POST /api/v1/registros/:id/carlos-reco gio` ⭐ Endpoint clave del flujo v3

Marca el registro como "✓ recogido" por el lechero, con la cantidad.

**Caso de uso:** El vendedor (Juan) ya registró la cantidad. Carlos llega, vierte la leche, y confirma la cantidad coincidente o con discrepancia.

**Request:**
```json
{
  "litrosCarlos": "16.50",
  "clientTimestamp": "2026-09-18T06:14:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Lógica del backend:**

```typescript
async carlosRecogio(
  registroId: string,
  userId: string,
  dto: { litrosCarlos: string; clientTimestamp: string; idempotencyKey: string }
) {
  return prisma.$transaction(async (tx) => {
    // 1. Verificar que el registro pertenece al lechero
    const reg = await tx.registro.findUnique({
      where: { id: registroId },
      include: { contrato: true },
    });
    if (!reg) throw new NotFoundException('REGISTRO_NO_ENCONTRADO');
    if (reg.contrato.lecheroId !== userId) throw new ForbiddenException();

    // 2. Verificar idempotencia
    const existing = await tx.serverOutboxItem.findUnique({
      where: { opId: dto.idempotencyKey },
    });
    if (existing && existing.status === 'completed) {
      return { data: existing.entityRemoteId, status: 'duplicate' };
    }

    // 3. Determinar estado resultante
    const litrosCarlosNum = parseFloat(dto.litrosCarlos);
    let nuevoEstado: string;
    if (reg.litrosCliente === null) {
      // Vendedor no ha registrado → Caso B
      nuevoEstado = 'RECOGIDO_SIN_CONFIRMAR';
    } else if (parseFloat(reg.litrosCliente) === litrosCarlosNum) {
      // Coincide
      nuevoEstado = 'RECOGIDO_COINCIDE';
    } else {
      // Discrepancia
      nuevoEstado = 'RECOGIDO_DISCREPANCIA';
    }

    // 4. Actualizar registro
    const actualizado = await tx.registro.update({
      where: { id: registroId },
      data: {
        litrosCarlos: litrosCarlosNum,
        carlosRecogio: true,
        recogidoPorCarlosAt: new Date(dto.clientTimestamp),
        estado: nuevoEstado,
        version: { increment: 1 },
      },
    });

    // 5. Disparar push al vendedor
    await this.pushService.notify({
      userId: reg.contrato.cliente.userId,
      type: 'CARLOS_RECOGIO',
      data: {
        registroId,
        litrosCarlos: litrosCarlosNum,
        litrosCliente: reg.litrosCliente,
        estado: nuevoEstado,
        deepLink: `app://cliente/confirmar-recogida/${registroId}`,
      },
    });

    // 6. Auditoría
    await tx.auditLog.create({
      data: {
        actorUserId: userId,
        actorUserType: 'LECHERO',
        accion: 'CARLOS_RECOGIO',
        entidad: 'registro',
        entidadId: registroId,
        datosAntes: { estado: reg.estado, litrosCarlos: reg.litrosCarlos },
        datosDespues: { estado: nuevoEstado, litrosCarlos: litrosCarlosNum },
      },
    });

    // 7. Marcar operación como completada
    await tx.serverOutboxItem.update({
      where: { opId: dto.idempotencyKey },
      data: { status: 'completed', processedAt: new Date() },
    });

    return actualizado;
  });
}
```

**Response 200:**
```json
{
  "data": {
    "registroId": "uuid",
    "estado": "RECOGIDO_COINCIDE",
    "litrosCarlos": "16.50",
    "litrosCliente": "17.00",
    "carlosRecogio": true,
    "recogidoPorCarlosAt": "2026-09-18T06:14:00Z",
    "version": 2,
    "pushEnviado": true
  }
}
```

**Errores:**
- `403 FORBIDDEN` — El registro no pertenece a este lechero.
- `409 VERSION_CONFLICT` — Otro agente actualizó primero. Retornar registro actual.
- `422 LITROS_FUERA_DE_RANGO` — Valor <=0 o >100.
- `500 ERROR_SINCRONIZACION` — Error de DB; cliente debe reintentar.

---

### `POST /api/v1/registros/:id/carlos-reco gio-solo` ⭐ Endpoint para Caso B

Carlos registra la cantidad **y** marca "✓ recogido" cuando el vendedor no había registrado.

**Request:**
```json
{
  "litrosCarlos": "16.50",
  "clientTimestamp": "2026-09-18T06:11:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Diferencia vs `/carlos-reco gio`:** fuerza el estado a `RECOGIDO_SIN_CONFIRMAR` independientemente de si el vendedor registró o no.

**Lógica del backend:**

```typescript
async carlosRecogioSolo(
  registroId: string,
  userId: string,
  dto: { litrosCarlos: string; clientTimestamp: string; idempotencyKey: string }
) {
  return prisma.$transaction(async (tx) => {
    const reg = await tx.registro.findUnique({
      where: { id: registroId },
      include: { contrato: true },
    });
    if (!reg) throw new NotFoundException();
    if (reg.contrato.lecheroId !== userId) throw new ForbiddenException();

    const litrosCarlosNum = parseFloat(dto.litrosCarlos);

    const actualizado = await tx.registro.update({
      where: { id: registroId },
      data: {
        litrosCarlos: litrosCarlosNum,
        carlosRecogio: true,
        recogidoPorCarlosAt: new Date(dto.clientTimestamp),
        estado: 'RECOGIDO_SIN_CONFIRMAR',
        version: { increment: 1 },
      },
    });

    // Push al vendedor: "Carlos registró 16.5 L porque tú no lo hiciste"
    await this.pushService.notify({
      userId: reg.contrato.cliente.userId,
      type: 'CARLOS_RECOGIO_SOLO',
      data: {
        registroId,
        litrosCarlos: litrosCarlosNum,
        deepLink: `app://cliente/confirmar-recogida/${registroId}`,
        mensajeEspecial: 'No habías registrado. Carlos pasó y registró 16.5 L. ¿Confirmas?',
      },
    });

    return actualizado;
  });
}
```

**Response 200:**
```json
{
  "data": {
    "registroId": "uuid",
    "estado": "RECOGIDO_SIN_CONFIRMAR",
    "litrosCarlos": "16.50",
    "carlosRecogio": true,
    "recogidoPorCarlosAt": "2026-09-18T06:11:00Z",
    "vencimientoConfirmacionAt": "2026-09-19T06:11:00Z",
    "version": 2
  }
}
```

---

### `POST /api/v1/registros/:id/carlos-no-reco gio`

Marca que Carlos **no recogió leche** este día (no vino, o vino pero no había leche).

**Request:**
```json
{
  "razon": "CLIENTE_AUSENTE",
  "clientTimestamp": "2026-09-18T06:00:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Razones válidas (enum):**
- `CLIENTE_AUSENTE`
- `VACAS_SECAS` (Juan le dijo al llegar)
- `ENFERMEDAD_CLIENTE`
- `FESTIVIDAD`
- `LLUVIA_CAMINO`
- `OTRO` (con texto libre en `observaciones`)

**Request con razón libre:**
```json
{
  "razon": "OTRO",
  "observaciones": "Juan está de viaje",
  "clientTimestamp": "2026-09-18T06:00:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Lógica del backend:**

```typescript
async carlosNoRecogio(
  registroId: string,
  userId: string,
  dto: { razon: string; observaciones?: string; clientTimestamp: string; idempotencyKey: string }
) {
  return prisma.$transaction(async (tx) => {
    const reg = await tx.registro.findUnique({
      where: { id: registroId },
      include: { contrato: true },
    });
    if (!reg) throw new NotFoundException();
    if (reg.contrato.lecheroId !== userId) throw new ForbiddenException();

    let nuevoEstado: string;
    if (reg.litrosCliente !== null && parseFloat(reg.litrosCliente) > 0) {
      // Discrepancia crítica: Juan dice que vendió pero Carlos no recogió
      nuevoEstado = 'RECOGIDO_DISCREPANCIA';
    } else if (reg.litrosCliente === null) {
      // Nadie registró nada todavía
      nuevoEstado = 'NO_VENDIO';
    } else {
      // Juan ya marcó "no vendí" antes → coincide
      nuevoEstado = 'NO_VENDIO';
    }

    const actualizado = await tx.registro.update({
      where: { id: registroId },
      data: {
        carlosRecogio: false,
        estado: nuevoEstado,
        razonNoVendio: dto.observaciones || dto.razon,
        version: { increment: 1 },
      },
    });

    // Notificar si hay discrepancia crítica
    if (nuevoEstado === 'RECOGIDO_DISCREPANCIA') {
      await this.pushService.notify({
        userId: userId, // lechero
        type: 'DISCREPANCIA_CRITICA',
        data: {
          registroId,
          mensaje: `Juan dice que vendió ${reg.litrosCliente} L pero tú no recogiste. Resolver.`,
        },
      });
    }

    return actualizado;
  });
}
```

**Response 200:**
```json
{
  "data": {
    "registroId": "uuid",
    "estado": "NO_VENDIO",
    "carlosRecogio": false,
    "razonNoVendio": "CLIENTE_AUSENTE",
    "version": 2
  }
}
```

---

### `GET /api/v1/contratos?lechero=:id`

Lista los contratos del lechero.

**Query params:**
- `estado=ACTIVO|CERRADO|CANCELADO` (default: todos).
- `cliente_id=uuid` (filtra por cliente).

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "clienteId": "uuid",
      "clienteNombre": "Juan Pérez López",
      "fechaInicio": "2026-09-15",
      "fechaFin": "2026-09-29",
      "duracionDias": 15,
      "precioLitroInicio": "1.5000",
      "estado": "ACTIVO",
      "diasRestantes": 2,
      "totalLitrosRegistrados": "87.50",
      "totalAdelantos": "230.00",
      "totalEncargos": "30.00"
    }
  ]
}
```

---

### `POST /api/v1/contratos`

Inicia un nuevo contrato.

**Request:**
```json
{
  "clienteId": "uuid",
  "fechaInicio": "2026-10-01",
  "duracionDias": 15,
  "precioLitroInicio": "1.5500"
}
```

**Response 201:**
```json
{
  "data": {
    "id": "uuid",
    "clienteId": "uuid",
    "lecheroId": "uuid",
    "fechaInicio": "2026-10-01",
    "fechaFin": "2026-10-15",
    "duracionDias": 15,
    "precioLitroInicio": "1.5500",
    "estado": "ACTIVO"
  }
}
```

**Errores:**
- `409 CONTRACT_ALREADY_ACTIVE` — Ya hay un contrato activo del mismo par.

---

### `POST /api/v1/contratos/:id/cerrar`

Cierra un contrato. Genera la liquidación y bloquea nuevos registros.

**Request:**
```json
{
  "liquidacionData": {
    "metodoPago": "MIXTO",
    "pagoEfectivo": "100.00",
    "pagoYape": "71.25",
    "pagoTransferencia": "0.00"
  }
}
```

**Response 200:**
```json
{
  "data": {
    "contratoId": "uuid",
    "estado": "CERRADO",
    "liquidacionId": "uuid",
    "boletaId": "uuid",
    "montoTotalPagado": "171.25"
  }
}
```

---

### `POST /api/v1/adelantos`

Registra un adelanto. **Requiere firma digital del cliente** (PIN/huella) en la app del cliente — este endpoint solo crea el adelanto "pendiente de confirmación".

**Request:**
```json
{
  "contratoId": "uuid",
  "monto": "300.00",
  "fecha": "2026-09-18",
  "motivo": "Para medicinas",
  "clientTimestamp": "2026-09-18T14:00:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Response 201:**
```json
{
  "data": {
    "id": "uuid",
    "monto": "300.00",
    "fecha": "2026-09-18",
    "confirmadoPorCliente": false,
    "estado": "PENDIENTE_FIRMA_CLIENTE",
    "deepLink": "app://cliente/adelantos/{id}"
  }
}
```

> Push al cliente: "Recibiste S/ 300 de Carlos. Confirma con tu huella."

---

### `POST /api/v1/encargos`

Registra un encargo pendiente (lo que Carlos va a comprar en la ciudad).

**Request:**
```json
{
  "contratoId": "uuid",
  "descripcion": "2kg de azúcar, 1 botella de aceite",
  "precioEstimado": "18.00",
  "fotoUrl": null,
  "clientTimestamp": "2026-09-18T15:00:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Response 201:**
```json
{
  "data": {
    "id": "uuid",
    "descripcion": "2kg de azúcar, 1 botella de aceite",
    "precioEstimado": "18.00",
    "entregado": false,
    "confirmadoPorCliente": false
  }
}
```

---

### `POST /api/v1/precios/activo`

Cambia el precio general por litro del lechero (afecta solo nuevos contratos).

**Request:**
```json
{
  "valorPorLitro": "1.5500",
  "motivo": "Inicio de temporada alta",
  "fechaInicio": "2026-10-01",
  "clientTimestamp": "2026-09-18T10:00:00Z",
  "idempotencyKey": "uuid-v4"
}
```

**Response 200:**
```json
{
  "data": {
    "id": "uuid",
    "valorPorLitro": "1.5500",
    "fechaInicio": "2026-10-01",
    "contratosActivosMantenidos": 24
  }
}
```

> **Importante:** los contratos activos mantienen su `precioLitroInicio` (snapshot). Solo los nuevos contratos usan el nuevo precio.

---

## Reglas transversales

### Idempotencia

Toda mutación acepta `idempotencyKey` (UUID v4). Si el cliente reenvía la misma operación (timeout, retry), el backend detecta el duplicado y retorna el mismo resultado.

### Conflicto de versión (OCC)

Los registros tienen `version` (int). Si el cliente envía una versión desactualizada, el backend retorna `409 VERSION_CONFLICT` con el estado actual. El cliente debe reconciliar.

### Push automático

Cuando Carlos marca "✓ recogido" o "✕ no recogió", se dispara push inmediato al vendedor con deep link al registro.

### Rate limiting

```typescript
@Throttle({ default: { limit: 60, ttl: 60_000 } })  // 60 req/min default
```

Los endpoints de "✓ recogido" tienen límite más alto (120 req/min) porque Carlos los llama 8-15 veces por mañana.

### Auditoría

Toda mutación crítica genera entrada en `audit_logs` con `datos_antes` y `datos_despues`. El admin puede ver el log completo desde la web.

---

## Próximos endpoints a documentar

- `POST /api/v1/registros/:id/carlos-confirmar-vendedor` (futuro): si Carlos quiere confirmar que el vendedor ya confirmó (caso de auditoría).
- `GET /api/v1/disputas/lechero/me`: lista de disputas activas del lechero.
- `POST /api/v1/registros/:id/corregir`: editar un registro ya cerrado (con justificación, abre disputa automáticamente).