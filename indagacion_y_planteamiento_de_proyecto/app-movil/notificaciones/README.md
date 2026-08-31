# Notificaciones Push — Estrategia General

## Contexto validado

**Datos del usuario:**
- **90% de productores tienen smartphone** (Android).
- **Sí les gustan las notificaciones push** si son claras y concisas.
- **50% reciben pago por Yape** (usan apps móviles).
- Hay **zonas sin señal** intermitente, pero las notificaciones se entregan cuando llega la señal.

## Stack técnico

- **Flutter:** `firebase_messaging` (FCM) + `flutter_local_notifications` (display local).
- **Android:** FCM entrega directo.
- **iOS:** FCM entrega vía APNs (configurar Apple Developer + APNs Auth Key en Firebase).
- **Backend:** Firebase Admin SDK (Node.js) para enviar.

## Tipos de notificaciones

### Notificaciones transaccionales (alta prioridad, daily)

| Evento | Destinatario | Mensaje | Acción al tap |
| --- | --- | --- | --- |
| Carlos registra litros | Juan | "Carlos registró 18.5 L hoy. Confirma aquí." | Abre app en pantalla de confirmación |
| Cambio de precio | Todos los clientes del lechero | "Nuevo precio desde 1 de octubre: S/ 1.55" | Abre pantalla de perfil del lechero |
| Adelanto registrado | Juan | "Recibiste S/ 300 de Carlos. Saldo: S/ 1,200" | Abre pantalla de adelantos |
| Liquidación lista | Juan | "Tu liquidación de S/ 350.50 está lista. Confirma." | Abre detalle de liquidación |
| Boleta emitida | Juan (si tiene email) | Email + push: "Tu boleta está disponible" | Abre pantalla de boletas |
| Disputa abierta | Admin | "Nueva disputa abierta por cliente X" | Abre detalle de disputa |

### Notificaciones informativas (prioridad normal, no diario)

| Evento | Mensaje |
| --- | --- |
| Resumen semanal (lunes) | "Esta semana: 87 L vendidos, S/ 130 a recibir" |
| Recordatorio de confirmación (después de 1 día) | "Tienes 2 días pendientes de confirmar" |
| Adelanto próximo a vencer | "Tienes un adelanto de S/ 80 pendiente" |

### Notificaciones críticas (alta prioridad + canal especial)

| Evento | Mensaje |
| --- | --- |
| Discrepancia > 3L detectada | "Discrepancia grande (5 L) requiere atención" |
| Liquidación bloqueada | "Liquidación bloqueada por falta de confirmación" |
| Boleta rechazada por SUNAT | "Boleta rechazada. Acción requerida." |

## Reglas anti-spam

- **Máximo 1 push transaccional por evento** (no duplicados).
- **No push entre 9 PM y 7 AM** (horario de descanso).
- **Máximo 3 push informativos por semana**.
- **Agrupar push similares**: si Carlos tiene 5 visitas pendientes, enviar 1 push con resumen.
- **Respeto a la batería**: el cliente puede configurar "no molestar" en la app.

## Personalización (validado)

- **Mensaje claro y conciso** (usuario validó: "si es claro y conciso el mensaje si les gusta").
- **Idioma:** español (con posibilidad de quechua en V2).
- **Tono:** profesional pero amigable, no condescendiente.
- **Datos concretos:** siempre incluir números (litros, soles).

## Deep links

### Flutter side
- Usar `go_router` con configuración de deep links.
- Cuando push llega, parsear `data.deep_link` y navegar.

### Notificaciones
- Payload: `{ notification: { title, body }, data: { deep_link, type, ... } }`
- `deep_link`: ruta interna (ej: `app://cliente/registro/2026-09-15`).

## Manejo de estados de la app

| Estado | Comportamiento |
| --- | --- |
| **Foreground** | push llega, mostrar in-app banner |
| **Background** | push llega, mostrar en system tray |
| **Terminated** | push llega, tap abre la app en deep link |

### Implementación

```dart
FirebaseMessaging.onMessage.listen((message) {
  // Foreground: mostrar banner o in-app
  showInAppBanner(message);
});

FirebaseMessaging.onMessageOpenedApp.listen((message) {
  // Background tap: navegar a deep link
  navigateToDeepLink(message.data['deep_link']);
});

final initial = await FirebaseMessaging.instance.getInitialMessage();
if (initial != null) {
  // Terminated tap
  navigateToDeepLink(initial.data['deep_link']);
}
```

## FCM Token lifecycle

### Cliente (Flutter)
- `getToken()` al login.
- `onTokenRefresh` listener.
- Enviar token al backend asociado a user_id + device_id.
- Eliminar token al logout.

### Backend
- Almacenar tokens por usuario.
- Marcar inactive si FCM devuelve NotRegistered.
- Reenviar push a todos los tokens activos del usuario (multi-device).

### Tabla en PostgreSQL

```prisma
model PushToken {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  userType    UserType  @map("user_type")
  deviceId    String    @map("device_id")
  fcmToken    String    @unique @map("fcm_token")
  platform    Platform
  appVersion  String?   @map("app_version")
  enabled     Boolean   @default(true)
  lastSeenAt  DateTime  @default(now()) @map("last_seen_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, userType])
  @@index([fcmToken])
  @@map("push_tokens")
}
```

## Plantillas de notificaciones

### Backend-side templates (con i18n)

```typescript
// confirmation-needed.es.ts
{
  notification: {
    title: "Confirmar litros de hoy",
    body: "Carlos registró {litros} L. ¿Cuántos vendiste tú?",
  },
  data: {
    type: "DAILY_CONFIRMATION",
    deep_link: "app://cliente/registro/{fecha}",
    contract_id: "{contractId}",
    registration_id: "{registrationId}",
  },
  android: { priority: "high" },
  apns: { payload: { aps: { sound: "default", "content-available": 1 } } },
}
```

```typescript
// adelantos.es.ts
{
  notification: {
    title: "Adelanto recibido",
    body: "Recibiste S/ {monto} de {lecheroNombre}. Saldo pendiente: S/ {saldo}.",
  },
  data: {
    type: "ADELANTO_REGISTRADO",
    deep_link: "app://cliente/adelantos",
    contract_id: "{contractId}",
  },
  android: { priority: "high" },
  apns: { payload: { aps: { sound: "default" } } },
}
```

## Configuración de FCM (Firebase)

### Android setup
1. Crear proyecto Firebase.
2. Agregar Android app con package name.
3. Descargar `google-services.json` → `android/app/`.
4. Agregar `classpath 'com.google.gms:google-services:4.4.0'` en `android/build.gradle`.
5. Agregar `apply plugin: 'com.google.gms.google-services'` en `android/app/build.gradle`.
6. Solicitar `POST_NOTIFICATIONS` permission.

### iOS setup
1. Agregar iOS app en Firebase.
2. Descargar `GoogleService-Info.plist` → `ios/Runner/`.
3. En Xcode: agregar Push Notifications capability.
4. Habilitar Background Modes → Remote notifications.
5. Crear APNs Auth Key en Apple Developer.
6. Subir APNs Auth Key a Firebase Console.

## Manejo de canales en Android

- Canal "transaccional": importancia HIGH, sonido, vibración.
- Canal "informativo": importancia DEFAULT.
- Canal "crítico": importancia HIGH, con sonido distintivo.

## FCM vs APNs vs Backend

```
┌─────────────┐
│  Flutter    │
│  (Cliente)  │
└──────┬──────┘
       │ getToken() / onRefresh
       ▼
┌─────────────┐
│  Backend    │  POST /push-tokens
│  NestJS     │
└──────┬──────┘
       │ Firebase Admin SDK
       ▼
┌─────────────┐
│  FCM        │
└──────┬──────┘
       │
       ├──► Android: directo
       └──► iOS: APNs
```

## Edge case: zonas sin señal

**Validado:** En caseríos remotos puede no haber señal por días.

- FCM **almacena mensajes** hasta que el dispositivo esté en línea.
- El push llega cuando el dispositivo recupera señal.
- Si el mensaje es urgente (cambio de precio), el lechero también puede llamar por teléfono al cliente.

## Edge case: batería baja

- Si el dispositivo del cliente está descargado, no recibe push.
- Cuando Juan cargue el celular, recibe todos los push acumulados.
- **Frecuencia de push limitada** para no agotar batería.

## Edge case: el cliente desactiva las notificaciones

- Permitir configurar en la app.
- Si Juan desactiva, las notificaciones se pausan (excepto críticas).
- El admin puede ver que Juan no está recibiendo pushs.

## Observabilidad

### Métricas
- Tasa de entrega de push.
- Tasa de apertura de push.
- Tiempo entre push y acción.
- Fallos de token (NotRegistered).
- Latencia backend → FCM.

### Logs
- Log cada push enviado (id, target, type, payload).
- Log cada error de envío.
- Log cada tap (deep link reached).

## Métricas

- **% de pushs entregados**: target > 95%.
- **% de pushs abiertos** (CTR): target > 30%.
- **% de usuarios con push habilitado**: target > 80%.
- **Tiempo medio de push → acción**: target < 5 min para pushs transaccionales.