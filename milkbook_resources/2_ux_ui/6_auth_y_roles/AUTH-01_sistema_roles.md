# AUTH-01: Sistema de Roles — MilkBook

> **Los 7 roles que componen el sistema de usuarios de MilkBook**, con sus permisos, casos especiales, herencia y matriz de quién-puede-hacer-qué. Este documento es la fuente de verdad para el modelo de datos (schema Prisma) y el middleware de autorización (NestJS).

**Versión:** 1.0
**Estado:** 🟡 Documentado, pendiente validación en campo

---

## 🎯 Los 7 roles

| # | Rol | Quién | Plataforma |
|---|---|---|---|
| 1 | `SUPER_ADMIN` | Fundador(es) de MilkBook | Web admin |
| 2 | `ADMIN` | Equipo interno MilkBook | Web admin |
| 3 | `OPS` | Soporte de primera línea | Web admin |
| 4 | `LECHERO_OWNER` | Carlos (lechero titular) | App móvil + web lechero |
| 5 | `LECHERO_EMPLEADO` | Empleado del lechero | App móvil |
| 6 | `CLIENT_OWNER` | Juan (productor titular) | App móvil + portal cliente |
| 7 | `CLIENT_FAMILY` | Familiar que ayuda a Juan | App móvil |

---

## 📋 Detalle por rol

### 1. SUPER_ADMIN

**Quién:** Los fundadores de MilkBook (probablemente 1-2 personas al inicio).

**Permisos:** TOTAL. Puede hacer cualquier acción en cualquier cuenta, incluyendo:
- Ver y editar datos de TODOS los lecheros y clientes.
- Cambiar precios globalmente.
- Configurar parámetros del sistema (SLA, límites, integraciones).
- Acceder a billing, métricas financieras globales.
- Eliminar cuentas (solo en casos extremos).
- Asignar roles ADMIN a otros usuarios.

**Limitaciones:**
- Ninguna. Es Dios del sistema.
- Sin embargo, todas sus acciones quedan en `audit_log` con timestamp y razón.

**Cuántos:** 1-2 personas. No escala más allá de 5.

---

### 2. ADMIN

**Quién:** Equipo interno MilkBook (gerente de operaciones, líder de soporte, etc.).

**Permisos:**
- ✅ Todo lo que OPS puede hacer.
- ✅ Crear / editar / suspender cuentas de lecheros y clientes.
- ✅ Modificar precios para lecheros específicos (con justificación).
- ✅ Forzar cierre de contratos en disputa.
- ✅ Emitir boletas manuales.
- ✅ Ver todos los reportes globales.
- ❌ NO puede modificar billing/configuración crítica del sistema.
- ❌ NO puede asignar rol SUPER_ADMIN.

**Casos especiales:**
- Si un ADMIN es ex-LECHERO_OWNER, conserva su rol pero pierde acceso a sus datos pasados (separación de funciones).

---

### 3. OPS

**Quién:** Soporte de primera línea (1-3 personas).

**Permisos:**
- ✅ Ver todos los datos (lectura).
- ✅ Responder tickets de soporte.
- ✅ Gestionar disputas activas.
- ✅ Asignar códigos de invitación.
- ✅ Marcar tareas como resueltas.
- ❌ NO puede editar datos de usuarios.
- ❌ NO puede crear/eliminar cuentas.
- ❌ NO puede modificar precios.
- ❌ NO puede emitir boletas manuales.

**Limitaciones:**
- Si edita algo (en casos extremos), debe pedir aprobación de un ADMIN.

---

### 4. LECHERO_OWNER

**Quién:** Carlos. El lechero titular dueño de una cartera de 20-50 productores.

**Permisos (sobre SU cuenta):**
- ✅ Ver y gestionar su cartera completa de clientes.
- ✅ Crear contratos nuevos con clientes existentes o nuevos.
- ✅ Registrar visitas (litros diarios, no vendí).
- ✅ Registrar adelantos y encargos.
- ✅ Cerrar liquidaciones y generar boletas.
- ✅ Ver reportes propios (litros, ingresos, adelantos dados).
- ✅ Configurar precio por litro para nuevos contratos.
- ✅ Gestionar sus empleados (asignar rol LECHERO_EMPLEADO).
- ✅ Descargar reportes en PDF/CSV.
- ❌ NO puede ver datos de OTROS lecheros.
- ❌ NO puede modificar precios globalmente.
- ❌ NO puede eliminar clientes sin liquidar primero.

**Casos especiales:**
- Si Carlos tiene RUC, puede asociarlo a su perfil.
- Si Carlos tiene empleados, cada empleado es un `LECHERO_EMPLEADO` con acceso restringido.

---

### 5. LECHERO_EMPLEADO

**Quién:** Persona que trabaja para Carlos (lo reemplaza 1 día a la semana según validación).

**Permisos (sobre la cuenta del LECHERO_OWNER que lo emplea):**
- ✅ Ver la lista de clientes del lechero.
- ✅ Registrar visitas (litros diarios, no vendí).
- ✅ Registrar adelantos y encargos.
- ✅ Marcar pagos recibidos.
- ❌ NO puede cerrar liquidaciones.
- ❌ NO puede generar boletas.
- ❌ NO puede modificar precios.
- ❌ NO puede ver reportes financieros globales.
- ❌ NO puede eliminar registros (solo editar si es el mismo día).
- ❌ NO puede crear nuevos clientes (solo los existentes).

**Restricción de tiempo:** Carlos puede configurar que el empleado solo pueda registrar hasta X días atrás (default: 1 día).

**Audit:** Cada acción del empleado se registra con `registrado_por = empleado.id` para auditoría.

---

### 6. CLIENT_OWNER

**Quién:** Juan. El productor titular.

**Permisos (sobre SU cuenta):**
- ✅ Ver su contrato activo (con Carlos o quien le compre).
- ✅ Ver y confirmar los litros diarios registrados.
- ✅ Ver adelantos que ha recibido.
- ✅ Ver encargos que ha pedido.
- ✅ Ver y firmar la liquidación al cierre.
- ✅ Descargar su boleta en PDF.
- ✅ Ver historial de quincenas cerradas.
- ✅ Configurar su método de firma preferido (PIN / huella / facial).
- ❌ NO puede ver datos de OTROS productores.
- ❌ NO puede modificar precios.
- ❌ NO puede cerrar liquidaciones unilateralmente (siempre requiere firma de Carlos).
- ❌ NO puede crear otros productores.

**Casos especiales:**
- Juan puede tener RUC o solo DNI. Si tiene RUC, puede asociarlo.
- Juan puede ser hombre, mujer, joven o mayor. La UX se adapta.

---

### 7. CLIENT_FAMILY

**Quién:** Familiar de Juan que tiene smartphone y le ayuda (hijo, sobrino, vecino).

**Permisos:** EXACTAMENTE LOS MISMOS que `CLIENT_OWNER` que lo autoriza, pero SOLO sobre el contrato de ese Juan.

**Cómo se vincula:**
1. Juan (CLIENT_OWNER) genera un código de invitación familiar en su app.
2. Familiar descarga la app e ingresa el código.
3. Familiar se registra con SU PROPIO DNI y celular (es una cuenta separada).
4. Juan autoriza al familiar a confirmar y firmar EN SU NOMBRE.
5. Familiar ve en su app: "Estás ayudando a Juan Pérez (DNI 45678901)".

**Limitaciones críticas:**
- El familiar SOLO ve el contrato de Juan, NO puede ver otros productores.
- Si Juan retira la autorización, el familiar pierde acceso al instante.
- El familiar tiene su propio PIN (no comparte con Juan).

**Por qué no compartir cuenta:** Por seguridad y auditoría. Si el familiar comete un error, se identifica claramente.

---

## 🧬 Herencia y relaciones

```
              SUPER_ADMIN
                   │
              ┌────┴────┐
           ADMIN       (otros admins)
              │
            OPS
           
LECHERO_OWNER ───┬─── LECHERO_EMPLEADO (1 a N)
                 │       (empleados del owner)
                 │
                 └─── comparte cartera completa
                 
CLIENT_OWNER ────┬─── CLIENT_FAMILY (0 a N)
                 │       (familiares autorizados)
                 │
                 └─── comparte contrato único
```

### Reglas de herencia

| Regla | Descripción |
|---|---|
| **LECHERO_EMPLEADO hereda cartera** | Ve solo los clientes que su owner ve. |
| **LECHERO_OWNER ve TODO del empleado** | Carlos ve todos los registros hechos por su empleado. |
| **CLIENT_FAMILY hereda contrato** | Ve solo el contrato del Juan que lo autorizó. |
| **CLIENT_OWNER ve TODO del familiar** | Juan ve todas las acciones hechas por su familiar EN SU nombre. |
| **ADMIN > LECHERO_OWNER en soporte** | ADMIN puede ver cualquier cuenta para soporte, pero solo LECHERO_OWNER puede editarla. |
| **SUPER_ADMIN > todo** | Acceso total, auditado. |

---

## 🎯 Casos especiales documentados

### Caso A: Empleado renueva relación laboral

- Carlos agrega empleado → empleado recibe SMS con código → empleado crea cuenta → empleado vinculado.
- Si Carlos despide al empleado: se desvincula la cuenta, los registros quedan con `registrado_por = empleado_id` (auditoría histórica).

### Caso B: Productor mayor sin smartphone

- 10% de productores no tienen smartphone.
- Alternativa 1: `CLIENT_FAMILY` (familiar con smartphone que ayuda).
- Alternativa 2: SMS OTP — Juan recibe SMS con código, lo dicta a Carlos, Carlos lo confirma en su app.
- Alternativa 3 (futuro): integración con WhatsApp Business API para confirmar vía WhatsApp.

### Caso C: Juan fallece o se retira

- Se cierra su contrato activo con Carlos.
- Su familia puede acceder al historial con rol `CLIENT_FAMILY` (con documento legal).
- Datos se mantienen por 5 años (Ley 29733 de protección de datos).

### Caso D: Carlos tiene 2 RUCs (una para cada zona)

- Se permite crear 2 cuentas `LECHERO_OWNER` asociadas al mismo DNI.
- Cada RUC tiene su cartera independiente.
- Útil para lecheros que compran en zonas geográficas distintas.

### Caso E: Juan es familia de Carlos

- Si tío-sobrino, etc.: se permite la relación comercial pero se **registra como advertencia** en el sistema.
- Los audit logs son especialmente cuidadosos.
- El sistema sigue funcionando igual (es objetivo, sin excepciones).

---

## 📐 Modelo de datos (resumen Prisma)

```prisma
enum Role {
  SUPER_ADMIN
  ADMIN
  OPS
  LECHERO_OWNER
  LECHERO_EMPLEADO
  CLIENT_OWNER
  CLIENT_FAMILY
}

model Usuario {
  id          String   @id @default(cuid())
  dni         String   @unique
  nombres     String
  apellidos   String
  telefono    String   @unique
  email       String?  @unique
  ruc         String?  @unique
  pinHash     String   // PIN hasheado
  metodoFirma MetodoFirma @default(PIN)
  biometriaHash String? // Hash de la biometría registrada
  roles       RolAsignado[]
  contratos   Contrato[]
  creadoEn    DateTime @default(now())
  actualizadoEn DateTime @updatedAt
}

model RolAsignado {
  id        String   @id @default(cuid())
  usuarioId String
  rol       Role
  scope     RolScope  // GLOBAL, LECHERO_X, CLIENTE_Y, CONTRATO_Z
  asignadoPor String
  asignadoEn  DateTime @default(now())
  activo      Boolean  @default(true)
  usuario    Usuario  @relation(...)
}

enum RolScope {
  GLOBAL          // SUPER_ADMIN, ADMIN
  CARTERA         // LECHERO_EMPLEADO vinculado a un LECHERO_OWNER
  CONTRATO        // CLIENT_FAMILY vinculado a un CLIENT_OWNER
  USUARIO         // LECHERO_OWNER, CLIENT_OWNER
}

model AuditLog {
  id        String   @id @default(cuid())
  usuarioId String   // QUIÉN hizo la acción
  accion    String   // QUÉ hizo
  entidad   String   // SOBRE QUÉ entidad (contrato, registro, etc.)
  entidadId String
  contexto  Json     // DATOS adicionales
  timestamp DateTime @default(now())
  ip        String
  userAgent String?
}
```

**Detalle completo del schema** está en [`../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`](../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md).

---

## 🔐 Permisos por recurso (resumen)

| Recurso | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Usuarios (CRUD global) | ✅ | ✏️ (no crear) | 👁 | — | — | — | — |
| Lecheros (CRUD global) | ✅ | ✏️ | 👁 | 👁 propio | 👁 propio | — | — |
| Productores (CRUD global) | ✅ | ✏️ | 👁 | 👁 sus clientes | 👁 sus clientes | 👁 propio | 👁 único |
| Contratos | ✅ | ✏️ | 👁 | ✏️ | 👁 | ✏️ (firmar) | ✏️ (firmar delegado) |
| Registros | ✅ | ✏️ | 👁 | ✏️ | ✏️ | ✏️ (confirmar) | ✏️ (confirmar delegado) |
| Liquidaciones | ✅ | ✏️ | 👁 | ✏️ | ❌ | ✏️ (firmar) | ✏️ (firmar delegado) |
| Boletas | ✅ | ✏️ | 👁 | ✏️ | ❌ | ✏️ (firmar) | ✏️ (firmar delegado) |
| Adelantos | ✅ | ✏️ | 👁 | ✏️ | ✏️ | 👁 propios | 👁 delegado |
| Encargos | ✅ | ✏️ | 👁 | ✏️ | ✏️ | 👁 propios | 👁 delegado |
| Disputas | ✅ | ✏️ | ✏️ | ✏️ | ❌ | ✏️ | 👁 |
| Reportes globales | ✅ | 👁 | 👁 | 👁 propios | 👁 parcial | 👁 propios | 👁 delegado |
| Configuración sistema | ✅ | 👁 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Billing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Leyenda:** ✅ puede · ✏️ puede escribir · 👁 solo leer · ❌ no tiene acceso · 👁 propio solo lo suyo

**Detalle completo en [`AUTH-04_jerarquia_permisos.md`](./AUTH-04_jerarquia_permisos.md).**

---

## 🧪 Cómo validar este modelo

### Test 1: Carlos y Juan pueden ver lo mismo al cierre

- Carlos genera liquidación.
- Juan abre su app y ve la misma liquidación.
- Ambos firman y la liquidación se cierra.
- ✅ Ambos ven exactamente los mismos datos.

### Test 2: El familiar NO ve otros contratos

- Juan autoriza a su hijo como `CLIENT_FAMILY`.
- El hijo abre su app y solo ve el contrato de Juan.
- ✅ No ve contratos de otros productores.

### Test 3: El empleado NO puede cerrar liquidaciones

- Carlos crea cuenta para su empleado.
- Empleado abre la app, registra litros de un cliente.
- Empleado intenta cerrar liquidación: NO le aparece el botón.
- ✅ Permiso denegado.

### Test 4: ADMIN no ve datos bancarios

- Carlos pregunta a ADMIN "¿puedes ver mi banco?".
- ADMIN responde: "No, solo veo tus liquidaciones con MilkBook".
- ✅ Separación de funciones respetada.

---

## 📋 Próximos pasos

1. ✅ Modelo conceptual de 7 roles
2. ✅ Herencia y casos especiales
3. ✅ Modelo de datos resumido
4. ✅ Matriz de permisos resumida
5. ⏸️ Definir el schema Prisma exacto (en `base-datos/schema-prisma.md`)
6. ⏸️ Implementar el middleware de autorización en NestJS
7. ⏸️ Hacer un test E2E con los 7 roles
8. ⏸️ Validar en campo con Carlos y Juan reales

---

## 🔗 Referencias

- Personas: [`../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/`](../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/)
- Schema Prisma: [`../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`](../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md)
- Auth DNI validado: [`../../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/auth-dni.md`](../../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/auth-dni.md)
- Reglas de negocio: [`../../indagacion_y_planteamiento_de_proyecto/reglas-negocio/`](../../indagacion_y_planteamiento_de_proyecto/reglas-negocio/)
