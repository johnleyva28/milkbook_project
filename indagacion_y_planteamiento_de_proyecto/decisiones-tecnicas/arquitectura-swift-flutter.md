# Arquitectura Híbrida: iOS Swift Nativo + Android Flutter + Backend Compartido

> **Decisión arquitectónica mayor.** Define cómo se reparten las capas de la app móvil entre **Swift nativo** (para iOS, requerido por el curso) y **Flutter** (para Android, manteniendo multiplataforma).

---

## Motivación y contexto

### Por qué este cambio

1. **Requisito académico:** el equipo está llevando un curso de Swift que exige desarrollar en este lenguaje.
2. **No abandonar Flutter:** la app necesita ser multiplataforma para escalar a futuro (iOS + Android + web).
3. **Restricción de tiempo:** no se puede reescribir toda la app en Swift (sería 100% iOS nativo y 0% multiplataforma).

### Lo que NO cambia

- **Backend:** sigue siendo **NestJS + Prisma + PostgreSQL** (compartido para ambas plataformas).
- **Modelo de datos:** el schema Prisma es la única fuente de verdad.
- **Flujos de negocio:** los flujos validados con el usuario (registro, sacado de cuentas, etc.) son los mismos en ambas plataformas.

---

## Opciones evaluadas

### Opción A — Flutter 100% + SwiftUI embebido (PlatformView)

- Toda la app es Flutter.
- Algunas pantallas específicas (la más crítica: "Sacar Cuentas") se reemplazan por `PlatformView` SwiftUI en iOS.
- Android: solo Flutter.

**Pros:**
- Toda la lógica de negocio compartida (Drift, sync, auth, etc.).
- Una sola base de código Flutter.

**Contras:**
- ~80% Flutter + 20% SwiftUI. No llega al 50/50.
- PlatformView es complejo y tiene problemas de performance.
- Difícil de mantener (dos frameworks de UI).

### Opción B — iOS Swift puro + Android Flutter puro (apps separadas)

- iOS: 100% SwiftUI nativo (Core Data para local, APNs para push, Combine para async).
- Android: 100% Flutter (Drift, FCM, Riverpod).
- Backend: NestJS compartido.

**Pros:**
- **50/50 estricto por plataforma.**
- Cada plataforma con su stack nativo idiomático.
- Demuestra competencias de Swift (lo que pide el curso).

**Contras:**
- Duplicación de la lógica de UI (cada feature se implementa dos veces).
- Offline-first se implementa dos veces (Drift vs Core Data).
- Sync se implementa dos veces (Outbox pattern en ambos).

### Opción C — Módulos mixtos por feature (cada feature puede ser Flutter o Swift)

- Cada feature se asigna a un framework según criterios del curso + equipo.
- Navegación mixta entre Flutter y SwiftUI (push/navigation controllers).
- Backend compartido.

**Pros:**
- Máxima flexibilidad.
- Permite poner las features "más iOS" en Swift (Face ID, Apple Watch).

**Contras:**
- Navegación mixta es compleja.
- El equipo debe conocer ambos frameworks.
- Riesgo de inconsistencia visual entre features Flutter y Swift.

### Opción D — Flutter shell + 50% de pantallas en SwiftUI

- Toda la navegación, estado global, HTTP, sync, DB local: Flutter.
- Mitad de las pantallas (las más complejas) son SwiftUI nativo embebido en Flutter vía `PlatformView`.
- Android: solo Flutter (sin las vistas SwiftUI).

**Pros:**
- Lógica de negocio compartida.
- "Multiplataforma" se mantiene en la lógica (la UI puede variar).
- ~50% del código de UI en Swift.

**Contras:**
- PlatformView sigue siendo complejo.
- Performance puede ser un issue.
- Las "vistas SwiftUI" no funcionan en Android (degradación).

---

## Recomendación: Opción B modificada — **"iOS Swift + Android Flutter + Backend compartido"**

> **Esta es la que recomiendo.**

### Tabla de distribución

| Componente / Feature | iOS (Swift) | Android (Flutter) | Backend (NestJS) |
|---|---|---|---|
| **Auth: login + registro** | ✅ SwiftUI | ✅ Flutter | ✅ |
| **Auth: firma digital (PIN/huella/cara)** | ✅ LocalAuthentication.framework | ✅ local_auth (Flutter) | ✅ (verifica) |
| **Home del cliente (vendedor)** | ✅ SwiftUI | ✅ Flutter | - |
| **Home del lechero (lista de hoy)** | ✅ SwiftUI + SwiftData | ✅ Flutter + Drift | - |
| **Confirmar recolección** (pantalla crítica) | ✅ SwiftUI + SwiftData | ✅ Flutter + Drift | - |
| **Sacar Cuentas** (la pantalla más crítica) | ✅ SwiftUI + SwiftData | ✅ Flutter + Drift | - |
| **Confirmar litros (vendedor)** | ✅ SwiftUI | ✅ Flutter | - |
| **Mi contrato (vendedor)** | ✅ SwiftUI | ✅ Flutter | - |
| **Adelantos y encargos (registro)** | ✅ SwiftUI | ✅ Flutter | ✅ |
| **Liquidación (generar boleta)** | ✅ SwiftUI | ✅ Flutter | ✅ |
| **Notificaciones push** | ✅ APNs + UNUserNotificationCenter | ✅ FCM | ✅ FCM Admin SDK |
| **Sync offline-first** | ✅ Core Data + Combine | ✅ Drift + outbox | ✅ (recibe) |
| **Mapa de ruta del lechero** | ✅ MapKit | ✅ google_maps_flutter | - |
| **Configuración / perfil** | ✅ SwiftUI | ✅ Flutter | ✅ |
| **Web admin (separado)** | - | - | ✅ React 19 |

### Stack técnico por plataforma

#### iOS (Swift)

- **Lenguaje:** Swift 5.10+.
- **UI:** SwiftUI (target iOS 16+).
- **State management:** @Observable / @State / @Binding (SwiftUI nativo).
- **Async:** async/await + Combine.
- **HTTP:** URLSession + async/await.
- **Local DB:** SwiftData (preferido) o Core Data.
- **Auth:** LocalAuthentication.framework + Keychain.
- **Push:** APNs + UNUserNotificationCenter.
- **Maps:** MapKit.
- **PDF:** PDFKit.
- **Secure storage:** Keychain Services.

#### Android (Flutter)

- **Lenguaje:** Dart 3.x.
- **UI:** Flutter widgets (Material 3).
- **State management:** Riverpod (recomendado) o Bloc.
- **HTTP:** Dio con interceptors.
- **Local DB:** Drift (SQLite).
- **Auth:** local_auth + flutter_secure_storage.
- **Push:** firebase_messaging (FCM).
- **Maps:** google_maps_flutter.
- **PDF:** pdf package + printing.
- **Secure storage:** flutter_secure_storage.

#### Backend (compartido)

- NestJS 11 + Prisma + PostgreSQL 16 + Redis.
- FCM Admin SDK para enviar push a ambas plataformas.
- API REST con OpenAPI.

### Justificación de la opción B

1. **50/50 real por plataforma:** el equipo invierte el mismo tiempo en Swift (iOS) que en Flutter (Android). Esto cumple con el requisito académico.
2. **No se duplica la lógica de negocio** porque vive en el backend. La UI se duplica, pero la complejidad real (cálculos, sync, idempotencia) está centralizada.
3. **iOS nativo es la mejor experiencia de usuario posible** en iOS (cara a SwiftUI, animations nativas, MapKit, Keychain).
4. **Android Flutter es la mejor experiencia de usuario posible** en Android (cara a Material 3, widgets idiomáticos).
5. **Multiplataforma se mantiene en Android:** Flutter permite futuro web/desktop sin reescribir nada.
6. **El curso de Swift tiene sentido:** desarrollar UI iOS nativa es más avanzado que aprender Flutter (que es declarativo y más sencillo).

### Trade-offs aceptados

- **Duplicación de UI:** cada pantalla se implementa dos veces (SwiftUI + Flutter). Se mitiga con:
  - Componentes agnósticos (como `ClienteDelDiaCard` ya documentado).
  - QA paralelo (los flujos deben comportarse igual).
  - Pruebas E2E separadas por plataforma pero con los mismos escenarios.
- **Mayor carga de trabajo:** implementar dos veces toma más tiempo que una. Se compensa con la mejor UX en cada plataforma.
- **Tests duplicados:** las pruebas E2E se ejecutan en ambas plataformas. Esto es manejable con frameworks separados (XCUITest + Patrol).

---

## División específica de pantallas (50/50 por componente)

### Las 10 pantallas del lechero

| # | Pantalla | iOS Swift | Android Flutter |
|---|---|---|---|
| 1 | Splash + Login | ✅ | ✅ |
| 2 | Home lechero (Hoy) | ✅ SwiftUI | ✅ Flutter |
| 3 | Registrar / Confirmar recolección | ✅ SwiftUI | ✅ Flutter |
| 4 | Mis clientes (búsqueda) | ✅ SwiftUI | ✅ Flutter |
| 5 | Detalle de cliente | ✅ SwiftUI | ✅ Flutter |
| 6 | Adelantos (registro) | ✅ SwiftUI | ✅ Flutter |
| 7 | Encargos (registro) | ✅ SwiftUI | ✅ Flutter |
| 8 | Sacar Cuentas (liquidación) | ✅ SwiftUI | ✅ Flutter |
| 9 | Mi cuenta / Settings | ✅ SwiftUI | ✅ Flutter |
| 10 | Estadísticas | ✅ SwiftUI | ✅ Flutter |

### Las 7 pantallas del cliente (vendedor)

| # | Pantalla | iOS Swift | Android Flutter |
|---|---|---|---|
| 1 | Splash + Login | ✅ | ✅ |
| 2 | Home cliente | ✅ SwiftUI | ✅ Flutter |
| 3 | Confirmar litros (la principal) | ✅ SwiftUI | ✅ Flutter |
| 4 | Mi contrato | ✅ SwiftUI | ✅ Flutter |
| 5 | Ver liquidación | ✅ SwiftUI | ✅ Flutter |
| 6 | Descargar boleta | ✅ SwiftUI | ✅ Flutter |
| 7 | Mi perfil | ✅ SwiftUI | ✅ Flutter |

> Resultado: **17 pantallas × 2 plataformas = 34 implementaciones**, pero el flujo de negocio vive en backend, la UI se duplica.

---

## Comunicación entre capas

### Backend → App (push notifications)

- **FCM** envía push a ambas plataformas.
- Backend usa `firebase-admin` Node SDK.
- En cada plataforma, el handler de push:
  - Android Flutter: `firebase_messaging.onMessage`.
  - iOS Swift: `UNUserNotificationCenterDelegate`.

### App → Backend (HTTP)

- Mismos endpoints REST.
- iOS Swift: `URLSession`.
- Android Flutter: `Dio`.
- Ambos clientes usan el mismo formato JSON.

### Sincronización offline-first

- **Android Flutter:** Drift (SQLite) + outbox pattern + sync engine (ya documentado en `../app-movil/offline-sync/README.md`).
- **iOS Swift:** SwiftData (modelo local) + outbox pattern (con `CoreData` o `SwiftData` mismo) + sync engine.
- **Lógica de sync idéntica:** los endpoints `/sync/batch` y `/sync` son los mismos. La idempotencia y resolución de conflictos viven en backend.

---

## Plan de implementación

### Fase 0 — Setup (1 semana)

- [ ] Crear el repositorio con dos carpetas: `ios/` (Xcode project) y `android/` (Flutter project).
- [ ] Documentar el setup de cada uno en este README.
- [ ] Configurar CI/CD para que ambas plataformas corran sus tests.

### Fase 1 — Backend completo + APIs (3 semanas)

- [ ] Implementar todos los endpoints documentados en `../backend/api-design/endpoints-lechero.md` y `../backend/api-design/README.md`.
- [ ] Generar OpenAPI spec.
- [ ] Tests unitarios + integración.

### Fase 2 — Android Flutter (3 semanas)

- [ ] Implementar todas las pantallas con Flutter + Drift + Riverpod.
- [ ] Offline-first completo.
- [ ] Push con FCM.
- [ ] Tests E2E con Patrol.

### Fase 3 — iOS Swift en paralelo (3 semanas)

- [ ] Implementar todas las pantallas con SwiftUI + SwiftData.
- [ ] Offline-first con outbox pattern.
- [ ] Push con APNs.
- [ ] Tests E2E con XCUITest.

### Fase 4 — Integración y QA (2 semanas)

- [ ] Pruebas manuales cruzadas (mismo escenario en iOS y Android).
- [ ] Verificar que los flujos son equivalentes.
- [ ] Corregir inconsistencias visuales.

### Fase 5 — Piloto en campo (4-6 semanas)

- [ ] 5-10 lecheros con sus clientes.
- [ ] iOS y Android en paralelo.
- [ ] Feedback y métricas.

---

## Impacto en la documentación existente

### Documentos que NO cambian

- Toda la sección `backend/` (la lógica vive ahí, sin importar el cliente).
- `base-datos/schema-prisma.md` (el schema es único).
- `reglas-negocio/` (las reglas son agnósticas al cliente).
- `personas-usuarios/` (los usuarios son los mismos).
- `validacion-pendiente/pruebas-e2e-doble-registro.md` (los escenarios son agnósticos, solo cambia el framework de testing).

### Documentos que SÍ cambian

- **`app-movil/README.md`** → se reescribe con la nueva arquitectura dual.
- **`app-movil/cliente/*.md` y `app-movil/lechero/*.md`** → agregar al inicio:
  > "Esta pantalla se implementa en iOS con SwiftUI y en Android con Flutter. Ver `../../decisiones-tecnicas/arquitectura-swift-flutter.md` para la distribución."
- **`app-movil/lechero/componentes/cliente-del-dia-card.md`** → ya está agnóstico, pero agregar:
  > "Implementaciones de referencia: ver `../../../ios/Milkbook/Views/ClienteDelDiaCardView.swift` y `../../../android/lib/widgets/cliente_del_dia_card.dart`."
- **`app-movil/offline-sync/README.md`** → agregar una sección "Implementación por plataforma" con las diferencias específicas.
- **`diseno-ux/paleta-estados/paleta-estados-registro.md`** → agregar nota: "Tokens exportados a `colors.swift` (iOS) y `colors.dart` (Android)."

### Documentos nuevos a crear

- `ios/README.md` — setup del proyecto Xcode, dependencias (SPM), estructura de carpetas, convenciones Swift.
- `android/README.md` — setup del proyecto Flutter, dependencias (`pubspec.yaml`), estructura de carpetas, convenciones Dart.
- `decisiones-tecnicas/swiftui-vs-uikit.md` — por qué SwiftUI puro (vs UIKit).
- `decisiones-tecnicas/swiftdata-vs-coredata.md` — por qué SwiftData (vs Core Data).
- `decisiones-tecnicas/comparacion-stack-ios-vs-android.md` — tabla de equivalencias.

---

## Preguntas pendientes antes de implementar

> Estas son las decisiones que faltan tomar. Algunas tienen un default razonable; otras requieren input.

### ✅ Defaults ya elegidos (no requieren decisión)

- **Lenguaje iOS:** Swift 5.10+.
- **Target iOS:** 16+ (cubre 95%+ de dispositivos en Perú según data OSIPTEL 2025).
- **Lenguaje Android:** Dart 3.x.
- **Target Android:** minSdk 24 (Android 7+, ~98% cobertura).
- **State management iOS:** SwiftUI @Observable + @State.
- **State management Android:** Riverpod.
- **HTTP iOS:** URLSession async/await.
- **HTTP Android:** Dio.
- **Mapas iOS:** MapKit.
- **Mapas Android:** google_maps_flutter.

### 🤔 Decisiones pendientes del equipo

1. **¿El equipo iOS tendrá experiencia previa con SwiftData?** Si no, podemos usar Core Data (más maduro, más docs).
2. **¿El equipo Android prefiere Riverpod o Bloc?** (Riverpod es lo recomendado por el equipo; Bloc es alternativa más veterana.)
3. **¿Vamos a invertir en CI/CD con Fastlane (iOS) y Fastlane (Android)?** O solo Android por ahora.
4. **¿El piloto en campo será solo Android o ambos?** Depende del presupuesto.
5. **¿Hay diseño visual único que se respete, o cada plataforma con su look nativo?)
   - Material 3 en Android.
   - iOS HIG (Human Interface Guidelines) en iOS.
   - Algunos elementos compartidos (iconos, paleta de estados, copy).

---

## Riesgos identificados

| Riesgo | Mitigación |
|---|---|
| Duplicación de UI → inconsistencias | Componentes agnósticos + QA cruzado + tests E2E paralelos |
| Esfuerzo 2× vs. solo Flutter | Aceptable por requisito académico + mejor UX en cada plataforma |
| Complejidad de mantener dos codebases | Documentación estricta + PRs cruzados + retrospectivas |
| Sync offline-first implementado dos veces | Lógica de sync idéntica (mismo backend, mismo patrón), solo cambia el storage local |
| Diferentes bugs entre plataformas | Tests E2E con los mismos escenarios + matriz de cobertura |
| Onboarding de devs a ambas plataformas | Pair programming + sesiones de knowledge sharing |

---

## Métricas de éxito

- **% de equivalencia funcional entre iOS y Android:** target 100% (los flujos se comportan igual).
- **% de pantallas implementadas en paralelo:** target 80% (algunas se atrasarán en una plataforma, hay que ir cerrando).
- **Tiempo medio de implementación por pantalla:** target ≤ 3 días (siendo realistas con la duplicación).
- **Bugs críticos por plataforma:** target ≤ 5 por release.

---

## Próximos pasos inmediatos

1. ✅ Este documento creado.
2. ⏳ Validar la opción B con el equipo (especialmente con quien está llevando el curso de Swift).
3. ⏳ Decidir las 5 preguntas pendientes.
4. ⏳ Crear `ios/README.md` con el setup del proyecto Xcode.
5. ⏳ Crear `android/README.md` con el setup del proyecto Flutter.
6. ⏳ Actualizar `app-movil/README.md` para reflejar la nueva arquitectura.
7. ⏳ Iniciar Fase 0 del plan de implementación.

---

## Referencias

- SwiftUI oficial: https://developer.apple.com/swiftui/
- SwiftData: https://developer.apple.com/documentation/swiftdata
- Flutter: https://flutter.dev
- Riverpod: https://riverpod.dev
- Drift: https://drift.simonbinder.eu
- FCM: https://firebase.google.com/docs/cloud-messaging
- APNs: https://developer.apple.com/documentation/usernotifications
- Material 3: https://m3.material.io
- iOS HIG: https://developer.apple.com/design/human-intice-guidelines/