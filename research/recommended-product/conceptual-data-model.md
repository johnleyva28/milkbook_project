# Producto recomendado — Modelo de datos conceptual

> **NO ES el diseño final de PostgreSQL.** Es un modelo conceptual con entidades, relaciones, atributos importantes, reglas e historial/auditoría. Se convertirá en tablas en una fase posterior.

## Entidades principales

### E1. Tenant (Comprador / Organización)
- **Atributos:**
  - `id` (UUID)
  - `nombre` (string)
  - `ruc` (string, opcional)
  - `direccion` (string)
  - `telefono` (string)
  - `email_admin` (string)
  - `plan` (enum: free | tier1 | tier2 | tier3)
  - `idioma` (default: 'es')
  - `zona_horaria` (default: 'America/Lima')
  - `configuracion` (JSONB)
  - `created_at`, `updated_at`
- **Reglas:**
  - Cada tenant es independiente (multi-tenancy real).
  - Plan determina funcionalidades disponibles.

### E2. User (Usuario del sistema)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `email` (string, único por tenant)
  - `password_hash` (string)
  - `nombre` (string)
  - `rol` (enum: buyer_admin | buyer_operator | buyer_counter | buyer_auditor)
  - `telefono` (string, opcional)
  - `activo` (boolean)
  - `ultimo_login` (timestamp)
  - `2fa_enabled` (boolean)
  - `created_at`, `updated_at`
- **Reglas:**
  - Email único por tenant.
  - Rol determina permisos.
  - Soft delete (no eliminamos).

### E3. Producer (Productor)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `dni` (string, opcional)
  - `nombre` (string)
  - `telefono` (string, para WhatsApp)
  - `direccion` (string, opcional)
  - `zona` (string, opcional)
  - `activo` (boolean)
  - `notas` (text, opcional)
  - `created_at`, `updated_at`
- **Reglas:**
  - Vinculado a UN tenant (no hay cross-tenant en MVP).
  - DNI opcional (muchos no tienen formalización).
  - Teléfono es crítico para WhatsApp.

### E4. Product (Producto)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `nombre` (string, ej. "Leche cruda")
  - `unidad` (enum: litro | kilogramo)
  - `activo` (boolean)
- **Reglas:**
  - MVP solo soporta "leche cruda en litros".
  - Multi-producto en V3 (queso, yogurt).

### E5. PriceConfig (Configuración de precio vigente)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `product_id` (FK)
  - `precio_por_unidad` (decimal)
  - `fecha_inicio` (date)
  - `fecha_fin` (date, NULL = vigente)
  - `motivo_cambio` (text)
  - `created_by` (FK User)
  - `created_at`
- **Reglas:**
  - Solo UN precio vigente por producto y tenant.
  - Al crear uno nuevo, el anterior se cierra (`fecha_fin = new.fecha_inicio`).
  - Histórico completo (nunca borrar).

### E6. PriceChangeLog (Auditoría de cambios de precio)
- **Atributos:**
  - `id` (UUID)
  - `price_config_id` (FK)
  - `precio_anterior` (decimal)
  - `precio_nuevo` (decimal)
  - `diff_porcentaje` (decimal)
  - `fecha_cambio` (timestamp)
  - `usuario_id` (FK)
  - `created_at`
- **Reglas:**
  - Cada cambio genera una entrada.
  - Diff > 30% marca con flag de "alerta" (revisión manual).

### E7. Delivery (Entrega)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `producer_id` (FK)
  - `product_id` (FK)
  - `litros` (decimal, validado > 0)
  - `fecha_hora` (timestamp)
  - `precio_aplicado` (decimal) ← denormalizado para auditoría
  - `monto_calculado` (decimal)
  - `foto_url` (string, opcional)
  - `gps_lat` (decimal, opcional)
  - `gps_lng` (decimal, opcional)
  - `confirmado_por_productor` (boolean, default false)
  - `confirmado_at` (timestamp, opcional)
  - `created_by` (FK User)
  - `created_at`
  - `updated_at`
- **Reglas:**
  - `precio_aplicado` se snapshotea al momento del registro.
  - Modificaciones permitidas solo en ventana de 24h.
  - Eliminación: solo Admin, en ventana de 24h, con log de auditoría.

### E8. Advance (Adelanto)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `producer_id` (FK)
  - `monto` (decimal > 0)
  - `fecha` (date)
  - `motivo` (text, opcional)
  - `liquidado` (boolean, default false)
  - `liquidacion_id` (FK Liquidation, NULL hasta que se liquide)
  - `created_by` (FK User)
  - `created_at`
- **Reglas:**
  - Adelantos no liquidados se descuentan en próxima liquidación.
  - Una vez liquidado, no se modifica.

### E9. Liquidation (Liquidación)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `fecha_inicio` (date)
  - `fecha_fin` (date)
  - `estado` (enum: borrador | enviada | pagada | anulada)
  - `total_calculado` (decimal)
  - `pdf_url` (string, NULL hasta que se genere)
  - `enviada_at` (timestamp, NULL)
  - `pagada_at` (timestamp, NULL)
  - `created_by` (FK User)
  - `created_at`
- **Reglas:**
  - Cada liquidación es inmutable después de enviada.
  - Si se anula, se crea una nueva que la sustituye.
  - Adelantos incluidos como descuento.

### E10. LiquidationLine (Línea de liquidación)
- **Atributos:**
  - `id` (UUID)
  - `liquidation_id` (FK)
  - `producer_id` (FK)
  - `litros_total` (decimal)
  - `monto_bruto` (decimal)
  - `adelantos_total` (decimal)
  - `monto_neto` (decimal)
  - `confirmado_por_producer` (boolean)
  - `confirmado_at` (timestamp)
- **Reglas:**
  - Una línea por productor en cada liquidación.
  - Si el productor no tuvo entregas, no se crea línea.
  - Si el productor tuvo adelantos pero no entregas, se crea línea con monto negativo (se devuelve o se arrastra).

### E11. LiquidationDelivery (Entregas incluidas en liquidación)
- **Atributos:**
  - `id` (UUID)
  - `liquidation_id` (FK)
  - `delivery_id` (FK)
- **Reglas:**
  - Junction table.
  - Permite saber exactamente qué entregas se incluyeron.

### E12. LiquidationAdvance (Adelantos liquidados)
- **Atributos:**
  - `id` (UUID)
  - `liquidation_id` (FK)
  - `advance_id` (FK)
- **Reglas:**
  - Junction table.
  - Marca el adelanto como `liquidado = true`.

### E13. Notification (Notificación enviada)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `producer_id` (FK, opcional)
  - `user_id` (FK, opcional)
  - `canal` (enum: whatsapp | sms)
  - `plantilla_id` (string)
  - `parametros` (JSONB)
  - `estado` (enum: pendiente | enviado | fallido)
  - `enviado_at` (timestamp)
  - `error` (text, opcional)
  - `created_at`
- **Reglas:**
  - Auditoría completa de mensajes enviados.
  - Fallos se reintentan (backoff exponencial).

### E14. AuditLog (Log de auditoría general)
- **Atributos:**
  - `id` (UUID)
  - `tenant_id` (FK)
  - `actor_user_id` (FK User, opcional si es el sistema)
  - `actor_producer_id` (FK Producer, opcional)
  - `accion` (string, ej. "delivery.create", "price.change")
  - `entidad` (string, ej. "delivery", "price_config")
  - `entidad_id` (UUID)
  - `datos_antes` (JSONB)
  - `datos_despues` (JSONB)
  - `ip` (string)
  - `user_agent` (string)
  - `created_at`

## Diagrama de relaciones (simplificado)

```
Tenant ─┬─ User
        ├─ Producer
        ├─ Product ── PriceConfig ── PriceChangeLog
        ├─ Delivery ──┬── Liquidation ── LiquidationLine
        │             │                  │
        │             └──── LiquidationDelivery
        ├─ Advance ─────── LiquidationAdvance
        ├─ Notification
        └─ AuditLog
```

## Reglas de integridad referencial

- **Tenant:** No se puede eliminar un tenant sin eliminar sus datos (cascade con confirmación).
- **Producer:** Soft delete; no se pueden tener entregas si no está activo.
- **Delivery:** No se puede eliminar si está en liquidación; en su lugar, se anula la liquidación.
- **Liquidation:** Inmutable una vez enviada; correcciones requieren nueva liquidación.
- **PriceConfig:** Histórico completo; nunca se borra.
- **AuditLog:** Append-only; nunca se modifica ni borra.

## Índices principales (alto nivel)

- `delivery(tenant_id, fecha_hora)` — consultas por rango de fecha.
- `delivery(tenant_id, producer_id, fecha_hora)` — historial de un productor.
- `producer(tenant_id, telefono)` — búsqueda por WhatsApp.
- `price_config(tenant_id, product_id, fecha_inicio DESC)` — vigente por producto.
- `liquidation(tenant_id, fecha_inicio, fecha_fin)` — búsqueda por período.
- `advance(tenant_id, producer_id, liquidado)` — adelantos pendientes.
- `notification(tenant_id, estado)` — reintentos.

## Retención de datos

| Dato | Retención |
| --- | --- |
| Deliveries | 7 años (compliance SUNAT) |
| PriceConfig | Indefinido (auditoría histórica) |
| Liquidations | 7 años |
| Advances | 7 años |
| Notifications | 3 años |
| AuditLog | 10 años |
| Producers soft-deleted | Indefinido (anonimizado) |

## Próximos pasos

- Convertir este modelo en tablas PostgreSQL con DDL.
- Decidir ORM (probablemente Prisma o TypeORM).
- Implementar migraciones (versión inicial + incrementales).
- Decidir estrategias de particionamiento (cuando el volumen lo requiera).