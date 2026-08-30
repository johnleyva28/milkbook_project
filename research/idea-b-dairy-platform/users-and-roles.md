# Idea B — Usuarios, roles y casos de uso

## Personas / Actores del dominio lácteo

### Personas primarias

#### P1. Productor pequeño ("Vendedor")
- **Quién:** Persona natural, dueña de 5-10 vacas, vive en caserío rural, trabaja con familia.
- **Edad típica:** 40-65 años.
- **Educación:** Primaria-secundaria, a veces con estudios técnicos.
- **Tecnología:** Smartphone Android básico; WhatsApp sí; app nueva probablemente no.
- **Conectividad:** Móvil con señal intermitente; WiFi solo si va al pueblo.
- **Dolor principal:** No tiene registro claro de cuánto entregó, cuánto le pagaron, cuánto le deben. "Cuentas a mano".
- **Necesidades:**
  - Registrar entregas diarias de forma simple.
  - Saber el precio vigente (que puede cambiar sin aviso).
  - Ver cuánto le deben.
  - Historial para discutir con el comprador.
  - Generar comprobantes simples.
- **Dispositivo objetivo:** Smartphone Android (principal). iOS descartable para MVP rural.

#### P2. Comprador / Intermediario ("Lechero")
- **Quién:** Persona natural o pequeña empresa, recoge leche de varios productores y vende a queseros, plantas grandes o consumidor final.
- **Edad:** 30-55 años.
- **Educación:** Secundaria, a veces superior.
- **Tecnología:** Smartphone, en algunos casos tablet.
- **Conectividad:** Mejor que el productor (vive en pueblo).
- **Dolor:** Registros de compra imprecisos; disputas frecuentes con productores por "litros entregados" vs "litros registrados".
- **Necesidades:**
  - Registrar entregas por productor con peso validado.
  - Generar liquidación al productor cada 15 días / mes.
  - Rastrear su propia ruta de compra.
  - Registrar adelantos y deudas.
  - Control de calidad básico (densidad, temperatura).

#### P3. Centro de acopio / Quesero artesanal
- **Quién:** Empresa pequeña o mediana que recibe leche de varios productores.
- **Edad:** 35-60 años, dueño y gestor.
- **Tecnología:** Smartphone + laptop básica, posiblemente.
- **Conectividad:** En el pueblo, con WiFi.
- **Dolor:** Múltiples proveedores con distintas calidades; cálculos de pago variables; rastreabilidad limitada.
- **Necesidades:**
  - Registrar entregas de múltiples productores.
  - Calcular precio con bonos por calidad (grasa, proteína, densidad).
  - Generar facturas o boletas a quien compre sus quesos.
  - Reportes diarios de acopio.
  - Liquidación quincenal/mensual a productores.

#### P4. Administrador de planta industrial (Gloria, Nestlé, Laive)
- **Quién:** Empresa formal con departamento de sistemas.
- **Tecnología:** ERP propio, integración con sus sistemas.
- **Conectividad:** Alta.
- **Dolor:** Rastreabilidad hasta el productor; calidad constante; cumplimiento normativo.
- **Necesidades:** Probablemente NO son nuestro mercado objetivo primario para MVP (tienen sus propios sistemas).

#### P5. Transportista
- **Quién:** Conductor del camión cisterna o poronguero.
- **Tecnología:** Smartphone Android básico.
- **Necesidades:** Registrar ruta, confirmar entregas, novedades (accidentes, derrames, retrasos).

### Personas secundarias

#### P6. Asociación de productores
- **Quién:** Cooperativa o asociación formal (ej. ASG-SRA Puruay Alto con 43 socios).
- **Necesidades:** Consolidados de producción y venta de todos sus socios; reparto de utilidades.

#### P7. Regulador / Inspector (MIDAGRI, SENASA, SUNAT)
- **Necesidades:** Reportes de trazabilidad, cumplimiento tributario.

#### P8. Consumidor final
- **Quién:** Persona en ciudad que compra leche fresca, quesos.
- **Necesidades (potencial V2):** Trazabilidad del producto ("¿de qué finca viene esta leche?").

## Modelo de tenancy

### Escenario B1: Multi-tenant SaaS regional
- Cada asociación / centro de acopio = un tenant.
- Productores y compradores = usuarios dentro de un tenant.
- Sin denominacional ni institucional.

### Escenario B2: SaaS vertical con actores como tenants
- Cada "comprador grande" = un tenant.
- Sus productores son usuarios.

### Escenario B3: Producto "productor-centrado"
- Cada productor es un usuario independiente.
- El comprador (si quiere ver datos) requiere autorización.
- Es lo más simple pero limitado.

### Escenario B4: Híbrido red de acopio
- Similar a una red social de supply chain.
- Productores y compradores se conectan voluntariamente.
- Plataforma cobra por transacción o por suscripción.

## Modelo de jerarquía

```
PLATFORM ADMIN
│
├── BUYER TENANT (Comprador / Centro de Acopio / Quesero)
│   ├── Buyer Admin (dueño del acopio / gerente)
│   ├── Buyer Operators (personas que reciben la leche)
│   ├── Buyer Accountants (generan liquidaciones, facturas)
│   └── Producers (proveedores del comprador)
│       ├── Cada Producer puede ser:
│       │   ├── Persona natural (dueño)
│       │   └── Productores secundarios (familiares)
│       └── Lectura de su propio historial
│
├── Producer Tenant (independiente)
│   └── Igual estructura
│
└── Association Tenant
    ├── Association Admin
    └── Producer Members
```

## Roles y permisos finos (borrador)

| Acción | Producer Admin | Producer Operador | Buyer Admin | Buyer Operator | Buyer Contador |
| --- | --- | --- | --- | --- | --- |
| Registrar entrega | ✅ | ✅ | ✅ | ✅ | ❌ |
| Ver su propio historial | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver historial de sus proveedores | ❌ | ❌ | ✅ | ✅ | ✅ |
| Ver historial de sus compradores | ✅ | ✅ | ❌ | ❌ | ❌ |
| Modificar precio | ❌ (solo buyer) | ❌ | ✅ | ❌ | ✅ |
| Generar liquidación | ❌ | ❌ | ✅ | ❌ | ✅ |
| Emitir comprobante | ❌ | ❌ | ✅ | ✅ | ✅ |
| Ver precios del mercado | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ver reportes | ✅ (propios) | ✅ (propios) | ✅ (todos) | ✅ (todos) | ✅ |
| Administración de usuarios | ✅ | ❌ | ✅ | ❌ | ❌ |

## Jobs to be Done

### Para el Productor:
- "Cuando entrego mi leche al comprador, quiero **acceder a un comprobante** que muestre litros y precio para no depender solo de la memoria."
- "Cuando cambia el precio, quiero **saberlo inmediatamente** y ver el histórico para entender por qué cambió."
- "Cuando llega la fecha de pago, quiero **ver cuánto me corresponde y verificarlo** sin tener que pedirle al comprador."

### Para el Comprador:
- "Cuando recibo leche, quiero **registrar los litros de forma rápida** (sin pelearme con un formulario) y tenerlos asignados al productor correcto."
- "Cuando llega la fecha de liquidación, quiero **generar automáticamente el cálculo** y enviarlo al productor para su aprobación."
- "Cuando hay cambios de precio, quiero **mantener un histórico** y poder justificarlo ante el productor."

### Para el Centro de Acopio / Quesero:
- "Cuando tengo varios productores, quiero **consolidar las entregas** y aplicar reglas de calidad/precio automáticamente."
- "Cuando vendo mis quesos, quiero **emitir facturas o boletas electrónicas** sin complicarme con el portal de SUNAT."

## Reflexión crítica

> **[INFERENCIA]** El **usuario más interesante y olvidado** es el **comprador/intermediario pequeño**, no el productor grande (que tiene menos dolor) ni la planta industrial (que ya tiene software). Es un actor con Smartphone Android, WhatsApp fluido, pero sin sistema formal de registro. **Ese es nuestro ICP** (Ideal Customer Profile) primario.

> **[INFERENCIA]** El **productor pequeño no es buen cliente directo** para un SaaS porque:
> 1. No tiene poder adquisitivo (puede pagar S/ 5-15/mes, no S/ 50+).
> 2. Tiene baja alfabetización digital.
> 3. Su pain es real pero no tiene quién le compre la solución (el comprador, no él).
> 4. El comprador es quien tiene el incentivo económico para digitalizar.

**Conclusión:** El modelo de negocio más viable es **cobrarle al comprador/acopio** (B2B), con el productor como usuario final gratuito.