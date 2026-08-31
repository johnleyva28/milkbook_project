# App Móvil — Visión General

## Principio rector

> **La app móvil es la herramienta principal de trabajo del lechero y del cliente.**
> La web es solo para admin y soporte.

## Estructura

```
app-movil/
├── README.md (este archivo)
├── cliente/                      # App del cliente (vendedor)
├── lechero/                      # App del lechero (comprador)
├── notificaciones/               # FCM + APNs + estrategias de push
└── offline-sync/                 # Drift + arquitectura offline-first
```

## Stack técnico

- **Framework:** Flutter (compatible con iOS + Android + Web si se requiere).
- **State management:** Riverpod (recomendado) o Bloc.
- **Local DB:** Drift (SQLite con código generado, type-safe, migraciones).
- **HTTP:** Dio con interceptors (auth, retry, logging).
- **Notificaciones push:** firebase_messaging (FCM para Android, APNs para iOS via FCM).
- **Auth:** JWT (sección auth más adelante).
- **Rutas:** go_router (deep links para notificaciones).
- **Localización:** flutter_localizations (preparación para multi-idioma).
- **PDF generation:** pdf package (para boletas offline).
- **Secure storage:** flutter_secure_storage (para tokens).

## Dos interfaces, una base

El **backend** es único. Las **interfaces** son dos:

### App Cliente (Productor/Vendedor)
- **Función principal:** confirmar lo que el lechero registró.
- **Complejidad:** baja. Solo ver y confirmar.
- **Tiempo de uso diario:** 1-3 minutos.
- **Tono:** confianza, simpleza.

### App Lechero (Comprador)
- **Función principal:** registrar entregas, gestionar contratos, cerrar cuentas.
- **Complejidad:** media. Más acciones, más datos.
- **Tiempo de uso diario:** 15-30 minutos (mañana + liquidación quincenal).
- **Tono:** eficiencia, profesional.

### Backend compartido
- Misma base de datos PostgreSQL.
- Mismos endpoints REST.
- Mismas autenticación (JWT).
- Diferente UI en Flutter según rol.

## Offline-first obligatorio

**El productor vive en caserío con 3G intermitente.** El lechero va en moto por caminos rurales. La app **debe funcionar offline**.

Ver [`offline-sync/`](./offline-sync/) para la estrategia completa.

## Notificaciones push como primera clase

Las **notificaciones push** son la forma principal de comunicación con los usuarios:
- "Carlos registró 18 L hoy"
- "Tu liquidación está lista, confírmala"
- "Nuevo precio desde el 1 de octubre"

Ver [`notificaciones/`](./notificaciones/) para la estrategia completa.

## Diferenciación clave: la app móvil NO es solo "vista" del backend

A diferencia de muchas apps SaaS donde la app móvil es una réplica de la web, aquí:

1. **La app móvil tiene funcionalidad única**:
   - Registro offline de litros.
   - Notificaciones push inmediatas.
   - Boletas descargables en PDF.
   - Firma digital de liquidaciones.

2. **La web tiene funcionalidad distinta**:
   - CRM de usuarios.
   - Reportes administrativos.
   - Soporte al usuario.

3. **No se duplican esfuerzos**: lo que solo tiene sentido en móvil va en la app; lo que solo tiene sentido en admin va en la web.

## Criterios de éxito UX

La app debe ser:
- **Rápida**: cualquier acción < 2 segundos.
- **Offline-first**: funcionar sin internet.
- **Tolerante a errores**: edición fácil, undo, no perder datos.
- **Visual para baja alfabetización**: iconos, números grandes, colores.
- **Fiable**: si pierdo el celular, no pierdo mi información.
- **Consistente**: misma lógica entre app cliente y app lechero.

## Pendiente de validación

- ¿La app cliente debe ser **standalone** o puede ser **parte de la app lechero** como un perfil distinto?
- Decisión inicial: **dos apps separadas** (más simple de mantener).
- Si validación en campo indica fricción, considerar una sola app con selector de perfil.

## Riesgos técnicos principales

| Riesgo | Mitigación |
| --- | --- |
| Drift migrations fallan en producción | Probar exhaustivamente antes de releases |
| Conflicto de datos offline | Outbox pattern + LWW + last-write-wins |
| Push notifications no llegan en iOS | Configurar APNs correctamente; usar FCM como intermediario |
| Rendimiento con DB grande | Índices, paginación, archiving de contratos antiguos |
| Pérdida de datos del dispositivo | Backup automático en backend al sincronizar |

## Próximos documentos

- [`cliente/`](./cliente/) — Diseño detallado de la app del cliente.
- [`lechero/`](./lechero/) — Diseño detallado de la app del lechero.
- [`notificaciones/`](./notificaciones/) — Estrategia de notificaciones push.
- [`offline-sync/`](./offline-sync/) — Arquitectura offline-first.