# Schema Prisma — Modelo Completo v2 (post-validación)

> **Actualizado con datos validados** del usuario (información de primera mano de un distrito lechero de Cajamarca).

## Cambios respecto a v1 del schema

- **Liquidacion:** agregados campos `metodoPago` y `mixtoDetalle` (para pagos mixtos efectivo+Yape).
- **Registro:** agregado campo `registradoPor` (Carlos o empleado) y `registradoPorId`.
- **Contrato:** agregado `precioLitroInicio` (snapshot al inicio).
- **Empleado:** nueva entidad para el caso especial del empleado del lechero.
- **User:** agregado `email` opcional (para boletas por email).
- **Boleta:** agregado `clienteEmail` para el envío.

## Cambios v2 → v3 (firma digital en auth + flujo de doble registro)

- **`User.pinHash`** y **`User.firmaMetodoPreferido`**: el PIN hasheado del usuario y el método de firma que eligió (PIN, PASSWORD, BIOMETRIA_DACTILAR, BIOMETRIA_FACIAL). Se usan en **login (paso 2)** y en re-autenticación después de 15 min de inactividad.
- **`EstadoRegistro` extendido**: se mantienen los 6 estados originales (legacy) y se agregan 6 nuevos para soportar el **flujo de doble registro**:
  - `PENDIENTE`: nadie ha registrado nada.
  - `ESPERANDO_VENDEDOR`: Carlos marcó "recogido" pero falta que el vendedor confirme.
  - `ESPERANDO_LECHERO`: el vendedor registró, falta que Carlos marque "recogido".
  - `RECOGIDO_COINCIDE`: ambos lados coinciden.
  - `RECOGIDO_DISCREPANCIA`: hay recogida pero los valores no coinciden.
  - `RECOGIDO_SIN_CONFIRMAR`: pasaron 24h sin que el vendedor confirmara; se usa el valor de Carlos.
- **`Registro.registradoPorVendedorAt`**: timestamp de cuándo Juan (vendedor) registró la cantidad por primera vez.
- **`Registro.recogidoPorCarlosAt`**: timestamp de cuándo Carlos marcó "✓ recogido" en su app.
- **`Registro.carlosRecogio`**: boolean para saber si Carlos físicamente recogió leche ese día.
- **`Registro.estado` default cambió de `REGISTRADO` a `PENDIENTE`**: ya nadie "registra primero", ambos lados registran independientemente.

## `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  extensions = [pgcrypto, citext]
}

// ============================================================
// ENUMS
// ============================================================

enum UserType {
  CLIENTE
  LECHERO
  EMPLEADO
  ADMIN
}

enum EstadoContrato {
  ACTIVO
  CERRADO
  CANCELADO
}

enum EstadoRegistro {
  // === Estados originales (mantener para compatibilidad) ===
  REGISTRADO               // Carlos registró, cliente pendiente (legacy)
  CONFIRMADO_COINCIDE      // Ambos coinciden (legacy)
  CONFIRMADO_DISCREPANCIA  // Ambos registran, distinto (legacy)
  NO_VENDIO                // Cliente confirmó que no vendió (legacy)
  CARLOS_NO_VINO           // Cliente no confirmó; se asume Carlos no vino (legacy)
  PENDIENTE_VENCIDO        // >3 días sin confirmación (legacy)

  // === Nuevos estados del flujo de doble registro (v3) ===
  PENDIENTE                // Aún nadie ha registrado nada este día
  ESPERANDO_VENDEDOR       // Carlos marcó "recogido", falta que el vendedor confirme
  ESPERANDO_LECHERO        // El vendedor registró, falta que el lechero marque "recogido"
  RECOGIDO_COINCIDE        // Ambos lados coinciden en la cantidad
  RECOGIDO_DISCREPANCIA    // Hubo recogida pero los valores no coinciden
  RECOGIDO_SIN_CONFIRMAR   // Carlos recogió y registró solo (vendedor no confirmó en 24h) → se usa valor de Carlos
}

enum RegistradoPor {
  LECHERO
  EMPLEADO
}

enum EstadoLiquidacion {
  BORRADOR
  ENVIADA
  CONFIRMADA
  DISPUTADA
  PAGADA
  ANULADA
}

enum MetodoPago {
  EFECTIVO
  YAPE
  TRANSFERENCIA
  MIXTO
}

enum EstadoBoleta {
  PENDIENTE
  EMITIDA
  ACEPTADA
  RECHAZADA
  ANULADA
}

enum EstadoDisputa {
  ABIERTA
  EN_REVISION
  RESUELTA
  ESCALADA
}

enum Platform {
  IOS
  ANDROID
}

enum MetodoFirma {
  PIN
  PASSWORD
  BIOMETRIA_DACTILAR
  BIOMETRIA_FACIAL
}

// ============================================================
// USERS
// ============================================================

model User {
  id              String      @id @default(uuid())
  dni             String?     @unique @db.VarChar(8)
  ruc             String?     @unique @db.VarChar(11)  // Opcional, algunos lecheros tienen
  email           String?     @unique @db.Citext
  celular         String      @db.VarChar(20)
  nombre          String      @db.VarChar(200)
  passwordHash    String?     @map("password_hash") @db.VarChar(200)

  // Firma digital para autenticación (login + acciones sensibles)
  pinHash                 String?   @map("pin_hash") @db.VarChar(200)  // bcrypt
  firmaMetodoPreferido    MetodoFirma? @map("firma_metodo_preferido")
  firmaConfiguradaAt      DateTime? @map("firma_configurada_at")

  userType        UserType    @map("user_type")
  activo          Boolean     @default(true)
  suspendedAt     DateTime?   @map("suspended_at")
  suspendedReason String?    @map("suspended_reason")
  lastLoginAt     DateTime?   @map("last_login_at")
  createdAt       DateTime    @default(now()) @map("created_at")
  updatedAt       DateTime    @updatedAt @map("updated_at")

  // Relations
  lechero              Lechero?
  cliente              Cliente?
  empleado             Empleado?
  refreshTokens        RefreshToken[]
  pushTokens           PushToken[]
  auditLogs            AuditLog[]
  disputasAbiertas      Disputa[]   @relation("disputa_abierto_por")
  disputasResueltas    Disputa[]   @relation("disputa_resuelto_por")

  @@index([celular])
  @@index([userType, activo])
  @@map("users")
}

// ============================================================
// AUTH
// ============================================================

model RefreshToken {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  tokenHash   String   @unique @map("token_hash") @db.VarChar(200)
  expiresAt   DateTime @map("expires_at")
  revokedAt   DateTime? @map("revoked_at")
  deviceId    String?  @map("device_id")
  ip          String?  @db.VarChar(45)
  createdAt   DateTime @default(now()) @map("created_at")

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
  @@map("refresh_tokens")
}

// ============================================================
// LECHERO
// ============================================================

model Lechero {
  id                  String   @id @default(uuid())
  userId              String   @unique @map("user_id")
  direccion           String?
  fotoPerfilUrl       String?  @map("foto_perfil_url")
  celularSecundario    String?  @map("celular_secundario")
  precioPorLitroActual Decimal? @map("precio_por_litro_actual") @db.Decimal(10, 4)
  createdAt           DateTime @default(now()) @map("created_at")
  updatedAt           DateTime @updatedAt @map("updated_at")

  // Relations
  user          User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  contratos     Contrato[]
  empleados     Empleado[]
  precios       Precio[]
  liquidaciones Liquidacion[]

  @@map("lecheros")
}

// ============================================================
// EMPLEADO (caso especial validado)
// ============================================================

model Empleado {
  id              String    @id @default(uuid())
  userId          String?   @unique @map("user_id")  // null si no tiene user propio
  lecheroId       String    @map("lechero_id")
  dni             String?   @db.VarChar(8)
  nombre          String    @db.VarChar(200)
  celular         String?   @db.VarChar(20)
  activo          Boolean   @default(true)
  fechaIngreso    DateTime? @map("fecha_ingreso")
  fechaSalida     DateTime? @map("fecha_salida")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  // Relations
  user            User?      @relation(fields: [userId], references: [id], onDelete: SetNull)
  lechero         Lechero    @relation(fields: [lecheroId], references: [id], onDelete: Cascade)
  registros       Registro[]

  @@index([lecheroId, activo])
  @@map("empleados")
}

// ============================================================
// CLIENTE
// ============================================================

model Cliente {
  id                String   @id @default(uuid())
  userId            String   @unique @map("user_id")
  dni               String   @unique @db.VarChar(8)
  direccion         String?
  fotoEstabloUrl    String?  @map("foto_establo_url")
  coordenadasGps    String?  @map("coordenadas_gps") @db.VarChar(50)
  asociadoDesde     DateTime @default(now()) @map("asociado_desde")
  observaciones     String?
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  // Relations
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  contratos   Contrato[]

  @@map("clientes")
}

// ============================================================
// CONTRATO
// ============================================================

model Contrato {
  id                  String        @id @default(uuid())
  clienteId           String        @map("cliente_id")
  lecheroId           String        @map("lechero_id")
  fechaInicio         DateTime      @map("fecha_inicio") @db.Date
  fechaFin            DateTime      @map("fecha_fin") @db.Date
  duracionDias        Int           @map("duracion_dias")
  precioLitroInicio    Decimal       @map("precio_litro_inicio") @db.Decimal(10, 4)
  estado              EstadoContrato @default(ACTIVO)
  observaciones       String?
  cerradoAt           DateTime?     @map("cerrado_at")
  createdAt           DateTime      @default(now()) @map("created_at")
  updatedAt           DateTime      @updatedAt @map("updated_at")

  // Relations
  cliente       Cliente        @relation(fields: [clienteId], references: [id], onDelete: Restrict)
  lechero       Lechero        @relation(fields: [lecheroId], references: [id], onDelete: Restrict)
  registros     Registro[]
  adelantos     Adelanto[]
  encargos      Encargo[]
  liquidaciones Liquidacion[]

  @@unique([clienteId, lecheroId, fechaInicio])
  @@index([lecheroId, estado])
  @@index([clienteId, estado])
  @@index([fechaInicio, fechaFin])
  @@map("contratos")
}

// ============================================================
// REGISTRO DIARIO
// ============================================================

model Registro {
  id                      String          @id @default(uuid())
  contratoId              String          @map("contrato_id")
  fecha                   DateTime        @db.Date
  litrosCarlos            Decimal?        @map("litros_carlos") @db.Decimal(10, 2)
  litrosCliente           Decimal?        @map("litros_cliente") @db.Decimal(10, 2)
  valorFinal              Decimal?        @map("valor_final") @db.Decimal(10, 2) // Resultado tras resolver discrepancia
  estado                  EstadoRegistro  @default(PENDIENTE)
  razonNoVendio           String?         @map("razon_no_vendio")
  notas                   String?

  // Caso especial: empleado del lechero
  registradoPor           RegistradoPor  @default(LECHERO) @map("registrado_por")
  registradoPorId         String?         @map("registrado_por_id")  // FK a Lechero o Empleado
  registradoPorNombre     String?         @map("registrado_por_nombre")  // snapshot

  // Flujo de doble registro (v3): ambos lados pueden registrar primero
  registradoPorVendedorAt DateTime?       @map("registrado_por_vendedor_at")  // Juan registró primero
  recogidoPorCarlosAt     DateTime?       @map("recogido_por_carlos_at")      // Carlos marcó "recogido"
  carlosRecogio          Boolean         @default(false) @map("carlos_reco_gio")

  // Resolución de discrepancia
  resueltoPorId           String?         @map("resuelto_por_id")
  resueltoAt              DateTime?       @map("resuelto_at")

  // Firmas (usadas para confirmar litros, adelantos, liquidaciones)
  metodoFirmaCarlos       MetodoFirma?    @map("metodo_firma_carlos")
  metodoFirmaCliente      MetodoFirma?    @map("metodo_firma_cliente")

  // Auditoría offline-first
  version                 Int             @default(1)
  clientUpdatedAt         DateTime?       @map("client_updated_at")  // Timestamp del cliente (offline)
  createdAt               DateTime        @default(now()) @map("created_at")
  updatedAt               DateTime        @updatedAt @map("updated_at")
  serverUpdatedAt         DateTime?       @map("server_updated_at")

  // Relations
  contrato    Contrato  @relation(fields: [contratoId], references: [id], onDelete: Cascade)
  empleado    Empleado? @relation(fields: [registradoPorId], references: [id], onDelete: SetNull, map: "Registro_empleado_fk")

  @@unique([contratoId, fecha])
  @@index([contratoId, fecha])
  @@index([estado])
  @@index([registradoPor, fecha])
  @@map("registros")
}

// ============================================================
// ADELANTO
// ============================================================

model Adelanto {
  id                    String    @id @default(uuid())
  contratoId            String    @map("contrato_id")
  monto                 Decimal   @db.Decimal(10, 2)
  fecha                 DateTime  @db.Date
  motivo                String?
  entregadoPorCarlos    Boolean   @default(true) @map("entregado_por_carlos")
  confirmadoPorCliente  Boolean   @default(false) @map("confirmado_por_cliente")
  confirmadoAt          DateTime? @map("confirmado_at")
  metodoConfirmacion    MetodoFirma? @map("metodo_confirmacion")
  liquidacionId         String?   @map("liquidacion_id")
  liquidado             Boolean   @default(false)
  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")

  // Relations
  contrato     Contrato     @relation(fields: [contratoId], references: [id], onDelete: Cascade)
  liquidacion  Liquidacion? @relation(fields: [liquidacionId], references: [id], onDelete: SetNull)

  @@index([contratoId, liquidado])
  @@index([confirmadoPorCliente])
  @@map("adelantos")
}

// ============================================================
// ENCARGO
// ============================================================

model Encargo {
  id                    String    @id @default(uuid())
  contratoId            String    @map("contrato_id")
  descripcion           String
  precioEstimado        Decimal   @map("precio_estimado") @db.Decimal(10, 2)
  fotoUrl               String?   @map("foto_url")
  fechaSolicitud        DateTime  @default(now()) @map("fecha_solicitud") @db.Date
  fechaEntrega          DateTime? @map("fecha_entrega") @db.Date
  entregado             Boolean   @default(false)
  confirmadoPorCliente  Boolean   @default(false) @map("confirmado_por_cliente")
  confirmadoAt          DateTime? @map("confirmado_at")
  metodoConfirmacion    MetodoFirma? @map("metodo_confirmacion")
  liquidacionId         String?   @map("liquidacion_id")
  liquidado             Boolean   @default(false)
  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")

  // Relations
  contrato     Contrato     @relation(fields: [contratoId], references: [id], onDelete: Cascade)
  liquidacion  Liquidacion? @relation(fields: [liquidacionId], references: [id], onDelete: SetNull)

  @@index([contratoId, liquidado])
  @@map("encargos")
}

// ============================================================
// PRECIO
// ============================================================

model Precio {
  id            String    @id @default(uuid())
  lecheroId     String    @map("lechero_id")
  producto      String    @default("leche_cruda")
  valorPorLitro Decimal   @map("valor_por_litro") @db.Decimal(10, 4)
  fechaInicio   DateTime  @map("fecha_inicio") @db.Date
  fechaFin      DateTime? @map("fecha_fin") @db.Date
  motivo        String?
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  lechero Lechero @relation(fields: [lecheroId], references: [id], onDelete: Cascade)

  @@index([lecheroId, producto, fechaInicio(sort: Desc)])
  @@map("precios")
}

// ============================================================
// LIQUIDACIÓN
// ============================================================

model Liquidacion {
  id                      String              @id @default(uuid())
  contratoId              String              @map("contrato_id")
  fechaInicio             DateTime            @map("fecha_inicio") @db.Date
  fechaFin                DateTime            @map("fecha_fin") @db.Date
  estado                  EstadoLiquidacion  @default(BORRADOR)
  totalLitros             Decimal             @map("total_litros") @db.Decimal(12, 2)
  precioPromedioEfectivo  Decimal             @map("precio_promedio_efectivo") @db.Decimal(10, 4)
  montoBruto              Decimal             @map("monto_bruto") @db.Decimal(12, 2)
  totalAdelantos          Decimal             @default(0) @map("total_adelantos") @db.Decimal(12, 2)
  totalEncargos           Decimal             @default(0) @map("total_encargos") @db.Decimal(12, 2)
  montoNeto               Decimal             @map("monto_neto") @db.Decimal(12, 2)
  metodoPago              MetodoPago?         @map("metodo_pago")

  // Para pagos mixtos: cuánto en cada método (en S/)
  pagoEfectivo            Decimal?            @map("pago_efectivo") @db.Decimal(10, 2)
  pagoYape                Decimal?            @map("pago_yape") @db.Decimal(10, 2)
  pagoTransferencia       Decimal?            @map("pago_transferencia") @db.Decimal(10, 2)

  pagadaAt                DateTime?           @map("pagada_at")
  enviadaAt               DateTime?           @map("enviada_at")
  confirmadaAt            DateTime?           @map("confirmada_at")
  notas                   String?
  createdAt               DateTime            @default(now()) @map("created_at")
  updatedAt               DateTime            @updatedAt @map("updated_at")

  // Relations
  contrato     Contrato    @relation(fields: [contratoId], references: [id], onDelete: Restrict)
  lechero       Lechero     @relation(fields: [lecheroId], references: [id], onDelete: Restrict) // via contrato
  boleta       Boleta?
  adelantos    Adelanto[]
  encargos     Encargo[]
  disputas     Disputa[]

  @@unique([contratoId, fechaInicio, fechaFin])
  @@index([estado, fechaInicio(sort: Desc)])
  @@map("liquidaciones")
}

// ============================================================
// BOLETA
// ============================================================

model Boleta {
  id              String          @id @default(uuid())
  liquidacionId   String          @unique @map("liquidacion_id")
  tipo            String          @default("boleta") // boleta (siempre en MVP)
  serie           String?         @db.VarChar(4)
  numero          String?         @db.VarChar(8)
  montoTotal      Decimal         @map("monto_total") @db.Decimal(12, 2)
  igv             Decimal         @default(0) @db.Decimal(12, 2) // Leche exonerada
  estado          EstadoBoleta    @default(PENDIENTE)
  oseTicket       String?         @map("ose_ticket")
  oseCdrUrl       String?         @map("ose_cdr_url")
  pdfUrl          String?         @map("pdf_url")
  xmlUrl          String?         @map("xml_url")
  clienteEmail    String?         @map("cliente_email") // Para envío
  emitidaAt       DateTime?       @map("emitida_at")
  aceptadaAt      DateTime?       @map("aceptada_at")
  rechazadaAt     DateTime?       @map("rechazada_at")
  rechazadaMotivo String?        @map("rechazada_motivo")
  createdAt       DateTime        @default(now()) @map("created_at")
  updatedAt       DateTime        @updatedAt @map("updated_at")

  // Relations
  liquidacion Liquidacion @relation(fields: [liquidacionId], references: [id], onDelete: Restrict)

  @@index([estado])
  @@map("boletas")
}

// ============================================================
// DISPUTA
// ============================================================

model Disputa {
  id              String          @id @default(uuid())
  liquidacionId   String          @map("liquidacion_id")
  tipo            String          // litros, precio, monto, otro
  descripcion     String
  abiertoPorId    String          @map("abierto_por_id")
  estado          EstadoDisputa   @default(ABIERTA)
  resueltoPorId   String?         @map("resuelto_por_id")
  resolucion      String?
  createdAt       DateTime        @default(now()) @map("created_at")
  updatedAt       DateTime        @updatedAt @map("updated_at")
  resueltaAt      DateTime?       @map("resuelta_at")

  // Relations
  liquidacion   Liquidacion @relation(fields: [liquidacionId], references: [id], onDelete: Cascade)
  abiertoPor    User        @relation("disputa_abierto_por", fields: [abiertoPorId], references: [id])
  resueltoPor   User?       @relation("disputa_resuelto_por", fields: [resueltoPorId], references: [id])

  @@index([estado])
  @@index([liquidacionId])
  @@map("disputas")
}

// ============================================================
// PUSH TOKENS
// ============================================================

model PushToken {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  userType    UserType  @map("user_type")
  deviceId    String    @map("device_id") @db.VarChar(200)
  fcmToken    String    @unique @map("fcm_token") @db.VarChar(500)
  platform    Platform
  appVersion  String?   @map("app_version") @db.VarChar(20)
  enabled     Boolean   @default(true)
  lastSeenAt  DateTime  @default(now()) @map("last_seen_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, userType])
  @@index([fcmToken])
  @@map("push_tokens")
}

// ============================================================
// AUDIT LOG
// ============================================================

model AuditLog {
  id              String    @id @default(uuid())
  actorUserId     String?   @map("actor_user_id")
  actorUserType   UserType? @map("actor_user_type")
  actorEmpleadoId String?  @map("actor_empleado_id")
  accion          String    @db.VarChar(100)
  entidad         String    @db.VarChar(50)
  entidadId       String?   @map("entidad_id")
  datosAntes      Json?     @map("datos_antes")
  datosDespues    Json?     @map("datos_despues")
  ip              String?   @db.VarChar(45)
  userAgent       String?   @map("user_agent") @db.VarChar(500)
  createdAt       DateTime  @default(now()) @map("created_at")

  actor User? @relation(fields: [actorUserId], references: [id], onDelete: SetNull)

  @@index([actorUserId])
  @@index([entidad, entidadId])
  @@index([createdAt])
  @@map("audit_logs")
}

// ============================================================
// SYNC INFRASTRUCTURE
// ============================================================

model ServerOutboxItem {
  id            String    @id @default(uuid())
  opId          String    @unique
  userId        String    @map("user_id")
  entityType    String    @map("entity_type") @db.VarChar(50)
  entityLocalId String    @map("entity_local_id") @db.VarChar(100)
  entityRemoteId String?  @map("entity_remote_id")
  operation     String    @db.VarChar(20)
  payload       Json      @map("payload")
  status        String    @default("received") @db.VarChar(20) // received, processing, completed, failed
  attempts      Int       @default(0)
  errorMessage  String?   @map("error_message")
  receivedAt    DateTime  @default(now()) @map("received_at")
  processedAt   DateTime? @map("processed_at")

  @@index([userId, status])
  @@index([entityType, entityLocalId])
  @@map("server_outbox_items")
}

model SyncCursor {
  userId    String   @id @map("user_id")
  cursor    BigInt   @default(0)
  updatedAt DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sync_cursors")
}
```

## Resumen de cambios vs v1

| Cambio | Razón | Validación |
| --- | --- | --- |
| `User.ruc` opcional | Algunos lecheros tienen RUC, otros no | ✅ Validado |
| `User.email` opcional | Productores pueden no tener email; boleta se envía si existe | ✅ |
| Nueva entidad `Empleado` | Caso especial del empleado del lechero | ✅ Validado |
| `Registro.registradoPor` y `registradoPorId` | Para distinguir Carlos vs empleado | ✅ Validado |
| `Registro.metodoFirmaCarlos` y `metodoFirmaCliente` | Múltiples métodos de firma digital | ✅ Validado |
| `Liquidacion.metodoPago` y campos `pagoEfectivo`, `pagoYape`, `pagoTransferencia` | 50/50 efectivo/Yape + casos mixtos | ✅ Validado |
| `Boleta.clienteEmail` | Envío opcional de boleta por email | ✅ |
| `UserType.EMPLEADO` | Para empleados con cuenta propia (futuro) | V2 |
| `MetodoFirma` enum | PIN, contraseña, biometría | ✅ Validado |
| `ServerOutboxItem` y `SyncCursor` | Para el patrón de sync del cliente al backend | ✅ |

## Resumen de cambios v2 → v3 (actualización)

| Cambio | Razón | Validación |
| --- | --- | --- |
| `User.pinHash` + `firmaMetodoPreferido` | Firma digital también en login/registro (no solo en liquidaciones) | ✅ Usuario validó PIN, contraseña, biometría |
| `EstadoRegistro` extendido (6 nuevos valores) | Soportar que **ambos lados** puedan registrar primero | ✅ Flujo nuevo de doble registro |
| `Registro.registradoPorVendedorAt` | Saber cuándo Juan registró primero (caso A) | ✅ |
| `Registro.recogidoPorCarlosAt` | Saber cuándo Carlos marcó "✓ recogido" | ✅ |
| `Registro.carlosRecogio` | Saber si Carlos recogió leche ese día | ✅ |

## Notas

- **`registradoPorId` en Registro** apunta a Lechero o Empleado según el caso. Usar tabla polimórfica simplificada: la lógica de aplicación determina a qué entidad apunta.
- **`precioLitroInicio` en Contrato** es el snapshot. No se actualiza si el lechero cambia el precio general.
- **`metodoPago` y campos de pago** son opcionales pero se llenan al cerrar la liquidación como pagada.

## Próximos pasos

- Generar primera migración.
- Implementar RLS policies.
- Crear seeds con datos de prueba (un lechero con 5 productores, 2 contratos activos, etc.).