# Producto recomendado — Arquitectura técnica

## Visión general

> Arquitectura multi-tenant, multi-plataforma, con backend Node.js + Express + PostgreSQL, frontend React + Vite + TypeScript para web admin, y Flutter para iOS/Android/Web de los operadores.

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   USUARIOS                                                   │
│                                                              │
│   Comprador ───> App Flutter (iOS / Android / Web)          │
│   Productor ──> WhatsApp Business API (sin app)             │
│                                                              │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   BALANCEADOR / CDN                                          │
│                                                              │
│   Cloudflare o AWS CloudFront                                │
│                                                              │
└──────────────────┬───────────────────────────────────────────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Frontend │ │ API      │ │ API      │
│ Admin    │ │ Backend  │ │ Workers  │
│ React +  │ │ Node.js  │ │ Node.js  │
│ Vite +   │ │ Express  │ │ BullMQ   │
│ TS       │ │ TypeScript│ │ Redis    │
└──────────┘ └────┬─────┘ └────┬─────┘
                 │            │
                 ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   BASE DE DATOS                                              │
│                                                              │
│   PostgreSQL 16 + PostGIS (opcional para GPS)               │
│                                                              │
│   Schemas: por tenant (multi-tenant real)                   │
│                                                              │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   INTEGRACIONES                                              │
│                                                              │
│   WhatsApp Business API (Meta)                               │
│   OSE (Nubefact, Efact, Izipay) — V2                        │
│   Yape / Plin API — V2                                       │
│   SENASA — V3                                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Componentes principales

### Backend (Node.js + Express + TypeScript)

#### Estructura de carpetas (propuesta)
```
backend/
├── src/
│   ├── api/                  # Rutas REST
│   │   ├── tenants.ts
│   │   ├── users.ts
│   │   ├── producers.ts
│   │   ├── deliveries.ts
│   │   ├── prices.ts
│   │   ├── advances.ts
│   │   ├── liquidations.ts
│   │   ├── notifications.ts
│   │   ├── auth.ts
│   │   └── webhooks.ts
│   ├── domain/               # Lógica de negocio
│   │   ├── pricing.ts
│   │   ├── liquidation.ts
│   │   ├── advance.ts
│   │   └── notification.ts
│   ├── infrastructure/       # Adaptadores externos
│   │   ├── database/         # Prisma/TypeORM
│   │   ├── whatsapp/         # Cliente WhatsApp Business
│   │   ├── sms/              # Cliente SMS
│   │   ├── ose/              # Cliente OSE (V2)
│   │   └── storage/          # S3 / R2 para fotos
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── tenant.ts          # Aislamiento multi-tenant
│   │   ├── error.ts
│   │   └── audit.ts
│   ├── jobs/                 # BullMQ workers
│   │   ├── notification-worker.ts
│   │   ├── pdf-generator.ts
│   │   └── analytics.ts
│   ├── config/
│   └── server.ts
├── prisma/                   # Migraciones
│   ├── migrations/
│   └── schema.prisma
├── tests/
├── package.json
├── tsconfig.json
├── Dockerfile
└── docker-compose.yml
```

#### Patrones de diseño
- **Repository Pattern** para acceso a datos.
- **Domain Events** para auditoría.
- **CQRS ligero** (separación read/write en liquidaciones).
- **Multi-tenancy** vía row-level security + filtro en middleware.

#### Stack específico
- **Framework:** Express 4.x (o NestJS si se prefiere más estructura).
- **Lenguaje:** TypeScript.
- **ORM:** Prisma (recomendado) o TypeORM.
- **Validación:** Zod.
- **Auth:** Passport.js + JWT.
- **Tests:** Jest + Supertest.
- **Logging:** Winston + transporte a CloudWatch.
- **Monitoring:** OpenTelemetry.

### Frontend Admin (React + Vite + TypeScript)

#### Propósito
- Dashboard del Buyer Admin.
- Configuración de tenant.
- Reportes.

#### Estructura
```
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── api/                  # Cliente HTTP
│   ├── auth/
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
├── Dockerfile
└── nginx.conf
```

#### Stack
- **Build:** Vite.
- **UI:** Material-UI o Tailwind + shadcn/ui.
- **State:** TanStack Query (server state) + Zustand (client state).
- **Forms:** React Hook Form + Zod.
- **Routing:** React Router 6.
- **i18n:** i18next (preparación para multi-idioma).

### App Móvil (Flutter)

#### Propósito
- App completa para Buyer Operator.
- Interfaz de gestión de entregas en el campo.

#### Estructura
```
mobile/
├── lib/
│   ├── api/                  # Cliente HTTP
│   ├── auth/
│   ├── models/
│   ├── screens/
│   ├── widgets/
│   ├── services/             # offline sync
│   └── main.dart
├── test/
├── pubspec.yaml
└── Dockerfile (opcional)
```

#### Stack
- **State:** Riverpod (recomendado) o Bloc.
- **HTTP:** Dio.
- **Local storage:** Drift (SQLite) + Hive para caché.
- **Auth:** flutter_secure_storage para tokens.
- **Offline-first:** Drift + lógica de sincronización.
- **i18n:** Flutter i18n.

### Base de datos (PostgreSQL 16)

#### Decisiones técnicas
- **Multi-tenancy:** Schema por tenant en una sola DB. Cada tenant tiene su schema con sus tablas. Row-level security activado.
- **Migraciones:** Prisma Migrate (recomendado) o TypeORM migrations.
- **Backups:** Automáticos diarios, cross-region.
- **Performance:** Índices optimizados, particionamiento por fecha si crece.

#### Schema inicial (por tenant)
```
tenant_X/
├── users
├── producers
├── products
├── price_configs
├── price_change_logs
├── deliveries
├── advances
├── liquidations
├── liquidation_lines
├── liquidation_deliveries
├── liquidation_advances
├── notifications
└── audit_logs
```

### Workers (BullMQ + Redis)

#### Jobs
- **notification-sender:** Envía mensajes WhatsApp/SMS con reintentos.
- **pdf-generator:** Genera PDFs de liquidaciones.
- **liquidator-close:** Cierra liquidaciones periódicas automáticamente (V2).
- **analytics:** Calcula métricas (V2).

### Integraciones externas

#### WhatsApp Business API (Meta)
- **Mensajes transaccionales** (no marketing).
- **Plantillas pre-aprobadas** por Meta.
- **Webhook para recibir respuestas** ("OK", correcciones).
- **Costo:** por mensaje (varía por país; ~US$ 0.005-0.05/mensaje).

#### SMS fallback
- **Proveedor:** Twilio, MessageBird, o similar.
- **Solo si WhatsApp falla** (cobertura o rechazo).

#### OSE (V2)
- **Nubefact, Efact, Izipay** como candidatos.
- **API REST** para emisión de boletas.
- **Webhook** para confirmar emisión.

#### Yape / Plin (V2)
- **Yape API** (públicamente disponible para empresas).
- **Plin API** (vía banco).

#### SENASA (V3)
- **API de aretes DIO** para trazabilidad.

## Infraestructura

### Cloud (recomendado)

#### Opción 1: AWS
- **Compute:** ECS Fargate (con Docker).
- **DB:** RDS PostgreSQL.
- **Cache/Queue:** ElastiCache Redis.
- **Storage:** S3 para fotos.
- **CDN:** CloudFront.
- **Secrets:** AWS Secrets Manager.
- **Monitoring:** CloudWatch + OpenTelemetry.

#### Opción 2: GCP
- **Compute:** Cloud Run.
- **DB:** Cloud SQL PostgreSQL.
- **Cache/Queue:** Memorystore.
- **Storage:** Cloud Storage.
- **CDN:** Cloud CDN.

#### Opción 3: VPS (low-cost)
- **Compute:** VPS único con Docker Compose.
- **DB:** PostgreSQL local.
- **Limitaciones:** no escala bien; single point of failure.

### Despliegue local (para el proyecto académico)

#### Docker Compose
```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
  
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/lactea
      JWT_SECRET: ${JWT_SECRET}
      REDIS_URL: redis://redis:6379
      WHATSAPP_API_TOKEN: ${WHATSAPP_API_TOKEN}
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
  
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
  
  mobile:
    # Flutter web compilado
    build: ./mobile
    ports:
      - "8080:8080"
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Seguridad

### HTTPS obligatorio
- Certificados vía Let's Encrypt.
- HSTS habilitado.

### JWT
- Algoritmo: HS256 (o RS256 si se prefiere asimétrico).
- Expiración access token: 24h.
- Expiración refresh token: 30 días.
- Claims: `sub`, `tenant_id`, `rol`, `iat`, `exp`.

### Rate limiting
- 100 req/min por IP para endpoints públicos.
- 1000 req/min por usuario autenticado.
- Webhooks tienen rate limit por IP.

### WAF
- Cloudflare WAF o AWS WAF.
- Protección contra SQLi, XSS, CSRF.

### Logs
- Centralizados en CloudWatch / Stackdriver.
- Retención 90 días para logs operativos.
- 7 años para logs de auditoría.

## Performance esperada

- **API:** p95 < 200ms.
- **Frontend web:** LCP < 2.5s.
- **App Flutter:** Time to Interactive < 3s.
- **Sync offline:** < 5s por entrega cuando hay señal.

## Migraciones de base de datos

### Estrategia
- **Versionadas:** Cada cambio de schema tiene una migración.
- **Reversibles:** Cada migración tiene un down.
- **Probadas en staging antes de producción.**
- **Herramienta:** Prisma Migrate (recomendado) o Flyway/Liquibase.

### Convención
- Nombres: `YYYYMMDDHHMMSS_description.sql`.
- Una migración por cambio lógico.
- Nunca editar migraciones ya aplicadas.

## Monitoreo

### Métricas clave
- Latencia de API.
- Tasa de errores 5xx.
- Tasa de éxito de notificaciones WhatsApp.
- Tiempo de generación de liquidaciones.
- Churn de tenants.

### Alertas
- Tasa de error > 1% → alerta crítica.
- Latencia p95 > 1s → alerta warning.
- WhatsApp falla > 5% → alerta warning.

## Costos estimados (MVP, 10-50 tenants)

| Servicio | Costo mensual estimado |
| --- | --- |
| RDS PostgreSQL (db.t3.medium) | US$ 50-100 |
| ECS Fargate (2 tasks) | US$ 30-60 |
| ElastiCache Redis (cache.t3.micro) | US$ 15 |
| S3 (fotos, 10GB) | US$ 5 |
| CloudFront (100GB transferencia) | US$ 10 |
| WhatsApp Business (5,000 msgs) | US$ 25-50 |
| Monitoring + logs | US$ 20 |
| **Total** | **US$ 155-260/mes ≈ S/ 575-960/mes** |

> **A partir de 30+ tenants pagando Tier 1 (S/ 30/mes = S/ 900/mes)**, el sistema es autosuficiente.

## Diagrama de secuencia (ejemplo: liquidación)

```
Usuario (Buyer Admin) → Frontend Admin → Backend → Database
                                ↓
                            Notification Worker → WhatsApp → Productor
                                ↓
                            PDF Generator → S3
```

1. Carlos abre la app, selecciona período, click "Generar liquidación".
2. Frontend hace POST a `/api/liquidations` con período.
3. Backend valida, crea Liquidation y LiquidationLines.
4. Backend encola jobs:
   - notification-sender (un job por productor).
   - pdf-generator (un job por liquidación).
5. Carlos recibe confirmación inmediata.
6. Notification worker envía WhatsApp a cada productor.
7. PDF generator crea PDFs y los sube a S3.
8. Carlos ve el estado en su panel ("5 notificaciones enviadas, 3 PDFs generados").

## Decisiones diferidas (V2+)

- Microservicios vs monolito modular → empezar monolito, migrar si crece.
- Kubernetes vs Fargate → Fargate para simplicidad.
- GraphQL vs REST → REST por ahora (más simple, mejor tooling).
- Serverless vs containers → containers (más control para estado complejo).

## Nota final sobre el proyecto académico

> El proyecto académico debe **demostrar el stack completo funcionando**. La arquitectura está sobredimensionada para un MVP académico pero es **exactamente** lo que un producto real necesitaría.
>
> Lo importante es que **cada pieza tiene un rol claro** y se integra con las demás de forma coherente.