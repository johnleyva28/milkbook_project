# Autenticación con DNI

## Concepto

En lugar de email (que muchos productores no tienen), usamos **DNI + celular** como identidad principal. Esto se alinea con la realidad rural del Perú, donde casi todos tienen DNI pero no necesariamente email.

## Stack

- **DNI lookup:** API consultarRUC.pe (o JSON.pe, u otro proveedor).
- **Auth:** JWT.
- **Password:** opcional (con OTP por celular como backup).
- **Refresh token:** en DB, revocable.

## Flujos

### Flujo 1: Registro nuevo cliente (con DNI)

```
Cliente abre app → "Soy nuevo" → Pantalla de Registro

1. Ingresa DNI (8 dígitos)
   → POST /api/v1/auth/check-dni
   → Backend valida con RENIEC (vía API)
   → Devuelve: { exists: false, nombres: "...", apellidoPaterno: "...", ... }
   
2. Si existe en RENIEC, auto-completa nombre.
   Cliente confirma/corrige.

3. Cliente ingresa celular
   → Sistema envía OTP por SMS
   → POST /api/v1/auth/verify-otp { celular, otp }
   → Devuelve: { verified: true, token_temporal }

4. Cliente crea password (opcional) o usa solo OTP
   → POST /api/v1/auth/register { dni, celular, nombre, password? }
   → Devuelve: { access_token, refresh_token, user }

5. App guarda tokens en flutter_secure_storage
   → Redirige a Home
```

### Flujo 2: Login (con DNI)

```
Cliente abre app → "Ingresar"

1. Ingresa DNI + password (o solo DNI si usa OTP)
   → POST /api/v1/auth/login { dni, password }
   → Devuelve: { access_token, refresh_token, user }

2. Si olvidó password:
   → POST /api/v1/auth/forgot-password { dni }
   → Sistema envía OTP al celular asociado
   → POST /api/v1/auth/reset-password { dni, otp, new_password }
```

### Flujo 3: Refresh token

```
Cualquier endpoint con 401 (token expirado):
  → POST /api/v1/auth/refresh { refresh_token }
  → Devuelve: { access_token, refresh_token (nuevo) }
  → Reintentar request original
```

### Flujo 4: Lechero agrega cliente (vincular DNI)

```
Lechero abre app → "Agregar nuevo cliente"

1. Ingresa DNI del cliente
   → POST /api/v1/clientes/check-dni { dni }
   → Devuelve: { exists_in_system: bool, nombres: ..., apellidoPaterno: ... }

2. Si NO existe en el sistema:
   → Opción 1: Cliente se registra después.
   → Opción 2: Lechero crea un "pre-registro" (placeholder).
   
3. Si existe en el sistema:
   → El cliente debe confirmar (push notification).
   → Si confirma, se vincula al lechero.
   → Si no confirma, no se vincula.

4. Una vez vinculado, se crea el contrato inicial.
```

## DNI lookup API

### Proveedor recomendado: consultarRUC.pe

```typescript
@Injectable()
export class ReniecService {
  constructor(private httpService: HttpService) {}

  async consultarDni(dni: string): Promise<DniInfo> {
    const response = await this.httpService.axiosRef.post(
      'https://api.consultaperuapi.com/api/v1/consultas-dni',
      { token: this.reniecApiKey, dni }
    ).toPromise();

    if (!response.data.success) {
      throw new NotFoundException('DNI no encontrado en RENIEC');
    }

    return {
      dni: response.data.data.dni,
      nombres: response.data.data.nombres,
      apellidoPaterno: response.data.data.apellidoPaterno,
      apellidoMaterno: response.data.data.apellidoMaterno,
      nombreCompleto: response.data.data.nombreCompleto,
    };
  }
}
```

### Costo

- **Plan gratuito:** 100 consultas/mes.
- **Plan pago:** desde S/ 50/mes por volumen.

### Cache

- Cache de 24 horas en Redis para DNIs consultados.
- Reduce llamadas y costos.
- Key: `reniec:dni:{dni}` → JSON.

## JWT Structure

```typescript
// Access token payload
{
  sub: "user-uuid",
  userType: "CLIENTE" | "LECHERO" | "ADMIN",
  dni: "12345678",
  iat: 1234567890,
  exp: 1234567890 + 900  // 15 minutos
}

// Refresh token: opaque string, guardado en DB
```

## Refresh Token Storage

### Web
- **httpOnly cookie** (no accesible desde JS).
- **Secure** (HTTPS only).
- **SameSite=Lax** para prevenir CSRF.

### Mobile
- **flutter_secure_storage** (Keychain en iOS, Keystore en Android).
- Encriptado en reposo.

## Refresh Token Rotation

- Cada vez que se usa un refresh token, se emite uno nuevo.
- El viejo se marca como "rotated" pero no se elimina inmediatamente.
- Si se detecta reuso del viejo refresh token: **REVOCAR todos los tokens del usuario** (posible compromiso).

## OTP por SMS

### Proveedor recomendado
- Twilio (internacional, caro).
- Alternativas en Perú: Netcel, Infobip.

### Flujo

```
POST /api/v1/auth/request-otp { celular }
  → Genera OTP de 6 dígitos.
  → Guarda en Redis con TTL 5 min.
  → Envía SMS.
  → Devuelve: { sent: true, expires_in: 300 }

POST /api/v1/auth/verify-otp { celular, otp }
  → Valida.
  → Marca como usado (one-time).
  → Devuelve: { verified: true, token_temporal }
```

### Seguridad OTP
- 6 dígitos (1 millón de combinaciones).
- 5 minutos de validez.
- Máximo 3 intentos por código.
- Throttle: máximo 1 OTP por minuto por celular.
- Lockout: después de 5 intentos fallidos, bloquear por 1 hora.

## Permisos y autorización

```typescript
@Roles('CLIENTE', 'LECHERO')  // Decorator
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('me')
async me(@CurrentUser() user: AuthUser) { ... }
```

### Resource-level

- Cliente solo ve sus propios datos.
- Lechero ve sus clientes + sus propios datos.
- Admin ve todo.

```typescript
async findOne(registroId: string, user: AuthUser) {
  const registro = await this.prisma.registro.findUnique({
    where: { id: registroId },
    include: { contrato: true },
  });

  if (user.userType === 'ADMIN') return registro;

  if (user.userType === 'CLIENTE') {
    if (registro.contrato.clienteId !== user.clienteId) {
      throw new ForbiddenException();
    }
    return registro;
  }

  if (user.userType === 'LECHERO') {
    if (registro.contrato.lecheroId !== user.lecheroId) {
      throw new ForbiddenException();
    }
    return registro;
  }
}
```

## 2FA para Admin

- TOTP (Google Authenticator, Authy).
- Activación opcional pero recomendada.
- Backup codes generados al activar 2FA.

```typescript
@Post('admin/2fa/enable')
async enable2FA(@CurrentUser() user: AuthUser) {
  const secret = speakeasy.generateSecret({ length: 20 });
  await this.prisma.user.update({
    where: { id: user.id },
    data: { twoFactorSecret: secret.base32 },
  });
  return {
    secret: secret.base32,
    qrCode: qrcode.toDataURL(secret.otpauth_url),
  };
}
```

## Firma digital también en autenticación (login/registro)

> **Decisión (actualización):** Los mismos métodos de firma digital validados para liquidaciones (**PIN, contraseña, biometría dactilar, biometría facial**) se usan **también** para autenticarse en la app y para re-confirmar acciones sensibles.

### Por qué

- Los usuarios rurales ya validaron que **sí saben usar PIN, contraseña, huella y cara**.
- Evita mantener dos sistemas de auth separados (uno con DNI/password para entrar, otro con PIN/huella para firmar liquidaciones).
- El usuario **elige** el método que su dispositivo soporte.
- Reduce fricción: si el usuario ya configuró su PIN/huella una vez, lo reutiliza en todo.

### Uso de la firma digital

| Momento | Método | Frecuencia |
|---|---|---|
| **Login (después del DNI)** | PIN, huella o cara | Cada vez que abre la app (si pasó el timeout) |
| **Confirmar litros** (vendedor) | PIN, huella o cara | Diario (al confirmar la cantidad que el lechero recogió) |
| **Confirmar adelanto recibido** | PIN, huella o cara | Cuando el lechero le da efectivo en mano |
| **Confirmar encargo recibido** | PIN, huella o cara | Cuando el lechero le entrega algo de la ciudad |
| **Firmar liquidación** | PIN, huella o cara | Una vez por quincena (la pantalla crítica) |
| **Re-autenticación para acciones sensibles** | PIN, huella o cara | Al cambiar precio, cerrar contrato, generar boleta |

> El **lechero NO firma al marcar "recogido"** (esto es solo un tap en la app). Solo el **vendedor firma al confirmar**. Esto evita fricción en la moto.

### Stack técnico (Flutter)

- `local_auth` package: PIN, huella dactilar, biometría facial.
- `flutter_secure_storage`: almacena el PIN/secret de firma.
- Fallback automático: si no hay biometría disponible → PIN.

```dart
// Ejemplo: pedir firma al confirmar litros
Future<bool> pedirFirma() async {
  // 1. Intentar biometría primero
  final soportaBio = await LocalAuthentication().isDeviceSupported();
  if (soportaBio) {
    final ok = await LocalAuthentication().authenticate(
      localizedReason: 'Confirma tu identidad',
      options: AuthenticationOptions(biometricOnly: false),
    );
    if (ok) return true;
  }
  // 2. Fallback a PIN
  return await pedirPin();
}

Future<bool> pedirPin() async {
  final pinIngresado = await mostrarDialogoPin();
  final pinGuardado = await SecureStorage.read('pin_firma');
  return pinIngresado == pinGuardado;
}
```

### Configuración inicial del método de firma

Después del registro (DNI + OTP), el usuario configura su método preferido:

```
┌────────────────────────────────────────┐
│  Configura tu firma                    │
│                                        │
│  Elige cómo vas a confirmar:           │
│                                        │
│  [🔒 PIN de 4-6 dígitos]              │
│  [👆 Huella dactilar] (si disponible) │
│  [😊 Cara] (si disponible)             │
│  [🔑 Contraseña]                       │
│                                        │
│  Si tu dispositivo lo soporta,         │
│  te recomendamos huella o cara.        │
│  Si no, usa PIN (siempre funciona).    │
│                                        │
│  [Continuar]                           │
└────────────────────────────────────────┘
```

El PIN/secret se guarda **encriptado** en `flutter_secure_storage` (Keychain en iOS, Keystore en Android). **Nunca** se envía al backend.

### Login con firma digital

```
┌────────────────────────────────────────┐
│  Ingresar                              │
│                                        │
│  DNI: [________]                       │
│                                        │
│  [ Continuar ]                         │
│                                        │
│  ↓ (verifica DNI, devuelve temp_token)│
│                                        │
│  ┌────────────────────────────────────┐ │
│  │  Confirma tu identidad            │ │
│  │                                   │ │
│  │  [👆 Usar huella]                 │ │
│  │  [😊 Usar cara]                   │ │
│  │  [🔒 Ingresar PIN]                │ │
│  │  [🔑 Usar contraseña]            │ │
│  └────────────────────────────────────┘ │
│                                        │
│  ¿Nuevo aquí? Registrarme →            │
└────────────────────────────────────────┘
```

**Flujo de login con dos pasos:**

1. DNI → backend valida con RENIEC y emite un `temp_token` (corta duración, 5 min).
2. Con el `temp_token`, el cliente elige método de firma:
   - **Biometría:** el device valida localmente (huella/cara) → la app pide al backend canjear el `temp_token` por `access_token`.
   - **PIN/contraseña:** la app envía el PIN hasheado (o la contraseña) al backend → backend valida y emite tokens.

> **Seguridad:** la biometría **nunca viaja al backend**. Solo el OK/FAIL del device. El backend confía en que si el device dice "huella válida", es porque el device validó al usuario real. Si el PIN/contraseña, sí viaja hasheado (bcrypt con salt por usuario).

### Re-autenticación (timeout)

- Después de **15 minutos de inactividad** en la app, se cierra la sesión.
- Al volver, **se re-pide la firma** (PIN o biometría), **sin volver a pedir el DNI**.
- Esto evita que otra persona con el celular abierto haga acciones sensibles.

### Edge cases

| Caso | Comportamiento |
|---|---|
| Dispositivo sin biometría | Solo PIN/contraseña |
| Biometría falla 3 veces | Fallback automático a PIN |
| PIN olvidado | Reset por OTP al celular (flujo `forgot-password` ya existente) |
| Huella no reconocida | Reintentar; si falla 5 veces → fallback a PIN |
| Carlos cambia de celular | Reconfigurar firma en el nuevo device (el PIN se re-registra) |
| Usuario quiere cambiar método de firma | Configuración → Seguridad → Cambiar método |

## Rate Limiting

```typescript
@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: 60, ttl: 60_000 } })  // 60 req/min default
@Post('login')
async login(@Body() dto: LoginDto) { ... }

@Throttle({ default: { limit: 5, ttl: 60_000 } })  // 5 req/min para login
@Post('login')
async login(@Body() dto: LoginDto) { ... }
```

## Próximo documento

- [`stack-eleccion.md`](./stack-eleccion.md) — Justificación detallada del stack.