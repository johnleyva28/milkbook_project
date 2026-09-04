# Backend — Auth y Onboarding con DNI (validado)

## Contexto validado

**Datos del usuario:**
- Los lecheros **sí tienen DNI** (todos los peruanos lo tienen).
- **Algunos lecheros tienen RUC, otros no.**
- Los productores también tienen DNI.
- El sistema debe manejar **primariamente por DNI** con **opción de agregar RUC** según la preferencia del usuario.
- **Solo boleta**, no factura.
- La boleta se puede generar con DNI o RUC del cliente.

## Stack

- **DNI lookup:** API consultarRUC.pe (o JSON.pe, similar).
- **Auth:** JWT.
- **Password:** opcional (con OTP por celular como backup).
- **Refresh token:** en DB, revocable.
- **2FA:** solo para admin (PIN, biometría, contraseña).

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
   → POST /api/v1/auth/register { dni, celular, nombre, password?, userType: "CLIENTE" }
   → Devuelve: { access_token, refresh_token, user }

5. App guarda tokens en flutter_secure_storage
   → Redirige a Home
```

### Flujo 1b: Registro nuevo lechero (con DNI, opción RUC)

```
Lechero abre app → "Soy nuevo" → Pantalla de Registro

1. Ingresa DNI (8 dígitos)
   → POST /api/v1/auth/check-dni
   → Devuelve: { nombres, apellidoPaterno, ... }

2. Auto-completa nombre. Lechero confirma.

3. Lechero ingresa celular
   → OTP

4. Lechero decide: ¿agregar RUC?
   - SI: pantalla para ingresar RUC (11 dígitos), validar con SUNAT
   - NO: continuar sin RUC

5. POST /api/v1/auth/register { dni, ruc?, celular, nombre, password?, userType: "LECHERO" }
   → Devuelve: { access_token, refresh_token, user { ..., ruc } }
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

## Manejo de RUC

### Escenario: lechero con RUC
- Carlos tiene RUC.
- Al registrarse, ingresa RUC además del DNI.
- El sistema valida con SUNAT vía API.
- La boleta se emite a nombre de Carlos (con RUC).

### Escenario: lechero sin RUC
- Carlos no tiene RUC.
- Al registrarse, solo DNI.
- La boleta se emite con DNI (válido para boletas).

### Escenario: productor con o sin RUC
- Juan es productor, normalmente no tiene RUC.
- La boleta se emite a Juan con su DNI.
- En el futuro, si Juan se formaliza, puede agregar RUC.

## Validación de RUC

```typescript
@Injectable()
export class SunatService {
  async consultarRuc(ruc: string): Promise<RucInfo> {
    const response = await this.httpService.axiosRef.post(
      'https://api.consultaperuapi.com/api/v1/consultas-ruc',
      { token: this.rucApiKey, ruc }
    ).toPromise();

    if (!response.data.success) {
      throw new NotFoundException('RUC no encontrado en SUNAT');
    }

    return {
      ruc: response.data.data.ruc,
      razonSocial: response.data.data.razonSocial,
      direccion: response.data.data.direccion,
      estado: response.data.data.estado,
    };
  }
}
```

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

## Métodos de firma digital (validado)

- **PIN:** soportado en todos los dispositivos.
- **Contraseña:** soportado en todos.
- **Biometría dactilar:** en Android (huella) y iPhone (Touch ID).
- **Biometría facial:** en iPhone (Face ID) y Android (Face Unlock).

```typescript
enum MetodoFirma {
  PIN
  PASSWORD
  BIOMETRIA_DACTILAR
  BIOMETRIA_FACIAL
}
```

El usuario **elige** el método disponible en su dispositivo.

### Dónde se usa la firma digital

| Acción | Quién firma | Método |
|---|---|---|
| **Login (paso 2)** | Cliente y Lechero | DNI + PIN/huella/cara/contraseña |
| **Re-autenticación (después de 15 min)** | Cliente y Lechero | PIN/huella/cara (sin re-pedir DNI) |
| **Confirmar litros** | Cliente | PIN/huella/cara |
| **Confirmar adelanto recibido** | Cliente | PIN/huella/cara |
| **Confirmar encargo recibido** | Cliente | PIN/huella/cara |
| **Firmar liquidación** | Cliente | PIN/huella/cara |
| **Acciones sensibles** (cambiar precio, cerrar contrato, generar boleta) | Lechero | PIN/huella/cara |

> **Nota importante:** el **lechero NO firma al marcar "recogido"**. Solo el vendedor (cliente) firma al confirmar la cantidad. Esto evita fricción en la moto con guantes/sol.

### Login en dos pasos con firma

```typescript
@Post('auth/login-step1')
async loginStep1(@Body() dto: { dni: string }) {
  // 1. Verificar DNI existe
  const user = await this.prisma.user.findUnique({ where: { dni: dto.dni } });
  if (!user) throw new UnauthorizedException('DNI_NOT_FOUND');
  if (!user.activo) throw new UnauthorizedException('USER_SUSPENDED');

  // 2. Emitir token temporal de 5 minutos
  const tempToken = jwt.sign(
    { sub: user.id, userType: user.userType, scope: 'firma' },
    { expiresIn: '5m' }
  );
  return { temp_token: tempToken, user_id: user.id };
}

@Post('auth/login-step2')
async loginStep2(@Body() dto: { temp_token: string, method: 'PIN'|'PASSWORD'|'BIO', value: string }) {
  // 1. Verificar temp_token
  const payload = jwt.verify(dto.temp_token);
  if (payload.scope !== 'firma') throw new UnauthorizedException();

  // 2. Si es PASSWORD, comparar con hash
  if (dto.method === 'PASSWORD') {
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    const ok = await bcrypt.compare(dto.value, user.passwordHash);
    if (!ok) throw new UnauthorizedException('INVALID_CREDENTIALS');
  }

  // 3. Si es PIN, comparar hash
  if (dto.method === 'PIN') {
    const ok = await this.verifyPin(payload.sub, dto.value);
    if (!ok) throw new UnauthorizedException('INVALID_PIN');
  }

  // 4. Si es BIO, el device ya validó → confiar y emitir tokens
  // (Si el device reporta OK, el user es quien dice ser)

  // 5. Emitir access + refresh tokens
  return this.emitTokens(payload.sub);
}
```

### Almacenamiento del PIN

- El PIN se guarda **hasheado** en la DB (bcrypt con salt).
- El PIN en el device se guarda en **flutter_secure_storage** (Keychain/Keystore), nunca viaja al backend en claro.
- Tamaño: 4-6 dígitos.

```typescript
async setPin(userId: string, pin: string): Promise<void> {
  const hash = await bcrypt.hash(pin, 12);
  await this.prisma.user.update({
    where: { id: userId },
    data: { pinHash: hash, firmaMetodoPreferido: 'PIN' },
  });
}
```

### Biometría (consideraciones de seguridad)

- La biometría **nunca viaja al backend**. Solo el resultado OK/FAIL del device.
- El backend **confía** en que si el device reporta OK, el usuario fue autenticado correctamente por el hardware.
- Riesgo: si el dispositivo está comprometido, la biometría puede ser falsificada. Por eso se ofrece fallback a PIN.
- Se puede requerir PIN **periódicamente** (ej: cada 72 horas) incluso con biometría, como medida extra.

### Re-autenticación por timeout

- Access token expira a los **15 minutos**.
- Al expirar, la app pide la firma de nuevo (PIN o biometría) **sin volver a pedir el DNI**.
- Refresh token (7-30 días) renueva el access sin pedir firma; se usa solo para refresh silencioso.
- Si el refresh token expira o se revoca → login completo desde DNI.

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

## Onboarding presencial

Aunque no es parte del software, **el onboarding de los primeros lecheros debe ser presencial** (validado):
- Carlos necesita ayuda para entender la app.
- Un técnico (o el admin) visita a Carlos en su casa o punto de acopio.
- Le ayuda a registrarse, configurar su cartera, hacer una primera prueba.
- Sin este acompañamiento, la adopción falla.

## Próximo documento

- Ver [`../api-design/`](../../api-design/) para los endpoints detallados.