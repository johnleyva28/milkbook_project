# Producto recomendado — Roles y permisos

## Modelo de tenancy

### Estructura jerárquica

```
PLATFORM ADMIN (soporte técnico, oculto al usuario)
│
└── TENANT (cada comprador formalizado o asociación)
    │
    ├── USERS (pertenecen al tenant)
    │   ├── Buyer Admin
    │   ├── Buyer Operator
    │   ├── Buyer Counter
    │   ├── Buyer Auditor (solo en Tier 3+)
    │   └── Producer (vinculado al tenant)
    │
    ├── DATA (datos del tenant)
    │   ├── Productos (leche cruda por defecto)
    │   ├── Precios históricos
    │   ├── Productores
    │   ├── Entregas
    │   ├── Adelantos
    │   ├── Liquidaciones
    │   └── Reportes
    │
    └── CONFIG (configuración del tenant)
        ├── Idioma (default: español)
        ├── Zona horaria
        ├── Plantilla de liquidación
        ├── Mensajes WhatsApp personalizados
        └── Logo
```

### Multi-tenant real (no shared)

- **Database per tenant** si el tenant es premium.
- **Schema per tenant** en una sola database para tenants básicos.
- **Row-level security** siempre activado.
- **Datos completamente aislados**.

## Roles

### R1. Platform Admin (interno)
- **Quién:** Equipo técnico del proveedor del software.
- **Permisos:** Gestión global, debugging, soporte Tier 3.
- **Aislamiento:** Nunca ve datos de tenants sin consentimiento.

### R2. Buyer Admin
- **Quién:** Dueño o gerente del acopio/quesería.
- **Por tenant:** 1-3 por tenant.
- **Permisos:**
  - Gestión de usuarios del tenant.
  - Configuración de precios.
  - Generación y envío de liquidaciones.
  - Emisión de comprobantes.
  - Reportes.
  - Facturación del tenant.

### R3. Buyer Operator
- **Quién:** Empleado que registra entregas.
- **Por tenant:** 1-5.
- **Permisos:**
  - Crear entregas (en su dispositivo).
  - Ver entregas propias.
  - Ver lista de productores.
  - No modificar precios.
  - No generar liquidaciones.

### R4. Buyer Counter
- **Quién:** Persona del área de contabilidad/pagos.
- **Por tenant:** 0-2.
- **Permisos:**
  - Generar liquidaciones (borrador).
  - Ver reportes financieros.
  - No modificar entregas.
  - No crear nuevas entregas.

### R5. Buyer Auditor (Tier 3+)
- **Quién:** Persona externa o interna que audita.
- **Permisos:**
  - Solo lectura de todo el tenant.
  - Genera reportes de auditoría descargables.
  - No modifica datos.

### R6. Producer
- **Quién:** Productor vinculado al tenant (no tiene cuenta propia; el tenant lo "registra").
- **Identificación:** DNI o número de celular.
- **Acceso:**
  - Sin app.
  - Vía WhatsApp: recibe notificaciones, responde confirmaciones, ve liquidaciones por link.
  - Vía SMS: fallback.
  - Vía URL con token: ve su historial completo en web responsive.

## Matriz de permisos finos

| Acción | BuyerAdmin | BuyerOperator | BuyerCounter | BuyerAuditor | Producer |
| --- | --- | --- | --- | --- | --- |
| Crear entrega | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver entregas | ✅ todas | ✅ propias | ✅ todas | ✅ todas | ✅ solo suyas |
| Modificar entrega | ✅ (<24h) | ❌ | ❌ | ❌ | ❌ |
| Eliminar entrega | ✅ (<24h) | ❌ | ❌ | ❌ | ❌ |
| Cambiar precio | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ver precios | ✅ todos | ✅ actual | ✅ todos | ✅ todos | ✅ su histórico |
| Registrar adelanto | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ver adelantos | ✅ todos | ✅ propios | ✅ todos | ✅ todos | ✅ solo suyos |
| Crear liquidación | ✅ | ❌ | ✅ borrador | ❌ | ❌ |
| Enviar liquidación | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ver liquidaciones | ✅ todas | ✅ propias | ✅ todas | ✅ todas | ✅ solo suyas |
| Confirmar liquidación | ✅ | ❌ | ❌ | ❌ | ✅ (vía WhatsApp) |
| Emitir boleta | ✅ | ❌ | ✅ | ❌ | ❌ |
| Ver reportes | ✅ todos | ✅ básicos | ✅ todos | ✅ todos | ❌ |
| Gestionar usuarios | ✅ | ❌ | ❌ | ❌ | ❌ |
| Configuración tenant | ✅ | ❌ | ❌ | ❌ | ❌ |

## Aislamiento de datos

- Cada query incluye `WHERE tenant_id = :tenant`.
- Row-level security en PostgreSQL.
- JWT incluye `tenant_id` y `user_id`.
- Storage de fotos segregado por tenant.

## Auditoría

### Eventos auditados
- Creación, modificación, eliminación de entregas.
- Cambios de precio.
- Creación, envío, anulación de liquidaciones.
- Adelantos.
- Emisión de comprobantes.
- Login / logout.
- Cambios de configuración.

### Registro de auditoría
- Quién hizo qué.
- Cuándo (timestamp UTC).
- Desde dónde (IP, dispositivo).
- Cambio concreto (diff).

### Retención de logs
- 7 años para datos financieros (compliance SUNAT).
- 3 años para datos operativos.
- Indefinido para cambios de precio (auditoría histórica).

## Aislamiento geográfico

- **Default:** servidores en región us-east-1 o sa-east-1.
- **V2:** opción de tenant en Perú (compliance específico).
- **Backup:** cross-region con RPO < 1h.

## Seguridad

- HTTPS obligatorio.
- 2FA opcional pero recomendado para Buyer Admin.
- Rate limiting en API.
- Webhook signatures verificadas.
- Secretos en vault (no en código).

## Cumplimiento Ley 29733 (Perú)

- **Consentimiento:** El productor consiente que el comprador registre datos sobre sus entregas.
- **Finalidad:** Solo para fines comerciales de la relación comprador-productor.
- **Conservación:** Mientras la relación esté activa + 7 años.
- **Derecho ARCO:** Acceso, Rectificación, Cancelación, Oposición.
- **Encargado del tratamiento:** El comprador (tenant).
- **Responsable del tratamiento:** El proveedor del software (nosotros).
- **Seguridad:** Medidas técnicas y organizativas apropiadas (ISO 27001 o equivalente).