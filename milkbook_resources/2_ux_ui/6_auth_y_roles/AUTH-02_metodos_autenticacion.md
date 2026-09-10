# AUTH-02: Métodos de Autenticación — MilkBook

> **Los métodos de firma digital y autenticación soportados por MilkBook**, priorizados según la validación con usuario real (Cajamarca rural, baja alfabetización digital, dispositivos gama media-baja).

---

## 🎯 Principios

1. **Default = PIN.** Porque funciona en el 100% de los dispositivos Android 11+ (incluso gama baja).
2. **Biometría es opcional.** Se activa DESPUÉS del PIN. Es un acelerador, no un requisito.
3. **Nunca se queda solo el usuario sin poder firmar.** Si la biometría falla 3 veces, fallback automático a PIN.
4. **SMS OTP es el último recurso.** Solo para recuperación de cuenta o onboarding sin DNI validado.

---

## 📊 Métodos soportados

| # | Método | Compatible | UX | Cuándo se usa |
|---|---|---|---|---|
| 1 | **PIN 4-6 dígitos** | ✅ 100% Android 11+ | Teclado numérico en pantalla dedicada | Default para todo |
| 2 | **Huella dactilar** | ✅ 85% (Android 11+) | Toque en sensor | Acción rápida con manos mojadas/sucias |
| 3 | **Face ID / facial** | ✅ 70% (gama media+) | Cámara frontal | Alternativa a huella |
| 4 | **Contraseña alfanumérica** | ✅ 100% | Teclado completo | Recuperación de cuenta |
| 5 | **OTP por SMS** | ✅ 100% (requiere SIM) | Lectura de SMS | Onboarding + recuperación crítica |
| 6 | **WhatsApp OTP** (futuro) | ✅ 90% | Mensaje de WhatsApp | Onboarding sin DNI |

---

## 🔢 PIN 4-6 dígitos (DEFAULT)

### Diseño

```
┌─────────────────────────────┐
│  🔒 Ingresa tu PIN          │
├─────────────────────────────┤
│                              │
│       [_][_][_][_]           │  ← 4 dígitos por default
│                              │
│   ¿PIN de 6 dígitos?         │  ← toggle opcional
│                              │
│   ┌───┬───┬───┐              │
│   │ 1 │ 2 │ 3 │              │
│   ├───┼───┼───┤              │
│   │ 4 │ 5 │ 6 │              │  ← teclado numérico
│   ├───┼───┼───┤              │     grande (60dp por tecla)
│   │ 7 │ 8 │ 9 │              │
│   ├───┼───┼───┤              │
│   │   │ 0 │ ⌫ │              │
│   └───┴───┴───┘              │
│                              │
│   ¿Olvidaste tu PIN? SMS OTP │
└─────────────────────────────┘
```

### Reglas

| Regla | Valor |
|---|---|
| Longitud mínima | 4 dígitos |
| Longitud máxima | 6 dígitos |
| Dígitos permitidos | 0-9 |
| Restricciones | NO consecutivos (1234), NO repetidos (1111), NO生日 (1980) |
| Intentos antes de bloqueo | 5 |
| Tiempo de bloqueo | 30 segundos, luego 1 min, luego 5 min |
| Almacenamiento | Hasheado con bcrypt (rounds=12), nunca en claro |
| Cambio de PIN | cada 90 días sugerido, no obligatorio |

---

## 👆 Huella dactilar

### Cuándo se activa

El usuario configura la huella DESPUÉS de crear su PIN (no antes). Si la huella falla 3 veces, fallback automático a PIN.

### Flujo de activación

```
1. Usuario crea PIN ✅
   ↓
2. App pregunta: "¿Quieres usar tu huella para acciones rápidas?"
   ↓
3. Si acepta → solicita huella
   ↓
4. Huella OK → habilitada como acelerador (no reemplaza PIN)
```

### Casos edge

- **Mano mojada** (leche en el corral): la huella puede fallar. Fallback a PIN.
- **Dedo sucio**: mismo caso.
- **Guantes**: usar PIN, no huella.
- **Dispositivo sin huella**: solo PIN (es el caso default).

---

## 👤 Face ID / biometría facial

Solo en dispositivos gama media-alta con cámara frontal decente (iPhone 11+ en iOS, gama media desde 2020 en Android).

**Misma lógica que huella:** acelerador, no reemplazo del PIN.

**Casos especiales:**
- En la moto con sol directo: puede fallar. Fallback a PIN.
- Con mascarilla (post-COVID): puede fallar. Fallback a PIN.

---

## 🔐 Contraseña alfanumérica

### Cuándo se usa

- **Recuperación de cuenta** cuando se olvidó el PIN.
- **Acceso desde la web** (donde no hay biometría).
- **Backoffice de admin** (donde se requiere mayor seguridad).

### Requisitos

- Mínimo 8 caracteres.
- Al menos 1 mayúscula, 1 minúscula, 1 número.
- Opcionalmente 1 símbolo.
- NO puede ser el DNI, nombre, o teléfono.
- Hasheada con bcrypt (rounds=12).

---

## 📱 OTP por SMS

### Cuándo se usa

| Caso | Flujo |
|---|---|
| **Onboarding inicial** | DNI no validado en RENIEC → fallback a SMS OTP al celular registrado |
| **Recuperación de PIN** | "Olvidé mi PIN" → SMS con código de 6 dígitos → restablecer |
| **Cambio de celular** | Verificación con OTP para no perder acceso |
| **Acceso desde celular陌生的** | Login desde nuevo device requiere OTP |

### Diseño

```
┌─────────────────────────────┐
│  📱 Verificación por SMS     │
├─────────────────────────────┤
│                              │
│  Te enviamos un código de    │
│  6 dígitos a tu celular:     │
│                              │
│  **** *** 847                │
│                              │
│  ┌───┬───┬───┬───┬───┬───┐  │
│  │ _ │ _ │ _ │ _ │ _ │ _ │  │
│  └───┴───┴───┴───┴───┴───┘  │
│                              │
│  ¿No llegó? Reenviar en 0:30│
│                              │
│  Cambiar de celular           │
└─────────────────────────────┘
```

### Reglas

| Regla | Valor |
|---|---|
| Longitud del código | 6 dígitos |
| Vigencia | 5 minutos |
| Reenvíos disponibles | 3 cada 10 minutos |
| Almacenamiento | Hasheado en backend, NO en SMS gateway |
| Provider (Perú) | Twilio, MessageBird, o Gupshup |
| Costo estimado | S/ 0.05 por SMS |

---

## 🔄 Flujos combinados

### Flujo 1: Onboarding de Carlos (LECHERO_OWNER)

```
1. Carlos descarga app
   ↓
2. "Hola, bienvenido a MilkBook. Vamos a crear tu cuenta."
   ↓
3. Pantalla: "¿Tienes DNI? Sí / No"
   ↓
4. Si SÍ → Ingresa DNI + fecha de nacimiento
   ↓
5. Verificación RENIEC (vía consultarRUC.pe)
   ↓
6. Si pasa: continuar. Datos vienen pre-llenados.
   Si falla: SMS OTP al celular registrado en RENIEC.
   ↓
7. Crear PIN (con confirmación)
   ↓
8. (Opcional) Activar huella
   ↓
9. ¿Tienes RUC? Sí / No (opcional)
   ↓
10. Listo. Redirige a home.
```

### Flujo 2: Confirmación de Juan al cierre de contrato

```
1. Carlos envía liquidación a Juan
   ↓
2. Push a Juan: "Carlos quiere cerrar tu quincena. Revisa y firma."
   ↓
3. Juan abre la app
   ↓
4. Pantalla: revisión completa (litros, adelantos, encargos, total)
   ↓
5. Si todo OK: "Confirmar cierre"
   ↓
6. Modal: "¿Cómo quieres firmar?"
   - PIN
   - Huella
   - Cara
   ↓
7. Usuario elige → confirma → estado pasa a CONFIRMADO
   ↓
8. Liquidación cerrada. Boleta generada.
```

### Flujo 3: Juan olvidó PIN

```
1. Pantalla de PIN → "¿Olvidaste tu PIN?"
   ↓
2. Ingresa DNI + fecha de nacimiento para verificar identidad
   ↓
3. Si pasa: enviar SMS OTP al celular registrado
   ↓
4. Ingresa OTP (6 dígitos)
   ↓
5. Crear nuevo PIN (con confirmación)
   ↓
6. Volver al home. Sesión renovada.
```

---

## 🔐 Política de seguridad

### Almacenamiento

| Dato | Almacenamiento |
|---|---|
| PIN | bcrypt(rounds=12) |
| Contraseña | bcrypt(rounds=12) |
| Huella | Android Keystore (nunca sale del device) |
| Face ID | Android Keystore (nunca sale del device) |
| OTP en backend | bcrypt(rounds=8) + TTL 5min |
| JWT secret | Variable de entorno, rotado cada 90 días |

### Sesión

| Token | Vigencia |
|---|---|
| Access token (JWT) | 24 horas |
| Refresh token | 30 días, rotado en cada uso |
| PIN attempt counter | Reset después de login exitoso |
| Lockout | 30s → 1min → 5min → contactar soporte |

### Rate limiting

| Endpoint | Límite |
|---|---|
| `/auth/login` | 10 / hora / IP |
| `/auth/verify-pin` | 5 / min / device |
| `/auth/send-otp` | 3 / hora / celular |
| `/auth/verify-otp` | 5 / hora / celular |

---

## 📱 Compatibilidad por dispositivo

| Gama | Dispositivo típico | PIN | Huella | Cara |
|---|---|---|---|---|
| Baja | Xiaomi Redmi 9A | ✅ | ❌ | ❌ |
| Media-baja | Samsung A03 | ✅ | ⚠️ (a veces) | ❌ |
| Media | Xiaomi Redmi Note 12 | ✅ | ✅ | ❌ |
| Media-alta | Samsung A54 | ✅ | ✅ | ✅ |
| Alta | iPhone 13+ / Pixel 7+ | ✅ | ✅ | ✅ |

**Decisión:** La app funciona 100% con PIN. La biometría es un **acelerador opcional**. El usuario nunca debe quedarse sin poder firmar porque su biometría no funciona.

---

## 📋 Próximos pasos

1. ✅ Métodos definidos y priorizados
2. ✅ Flujos combinados
3. ✅ Política de seguridad
4. ✅ Compatibilidad por dispositivo
5. ⏸️ Mockups HTML de pantallas de auth (PIN screen, OTP screen, fingerprint)
6. ⏸️ Implementación de AuthService en NestJS
7. ⏸️ Integración con proveedor SMS (Twilio / Gupshup)
8. ⏸️ Tests E2E de cada flujo
