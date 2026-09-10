# AUTH-05: Flujo de Registro y Verificación — MilkBook

> **Cómo un usuario nuevo entra al sistema MilkBook** y verifica su identidad. Cubre el journey completo desde la descarga de la app hasta el primer uso exitoso, con foco en baja alfabetización digital y dispositivos gama media-baja.

---

## 🎯 Principio rector

**"Cualquier persona con DNI puede entrar a MilkBook en menos de 5 minutos, aunque no sepa usar apps."**

Esto implica:
- Flujo guiado paso a paso (sin opciones confusas).
- Validación contra RENIEC para no pedir datos que ya tenemos.
- SMS OTP como fallback universal.
- Onboarding contextual según el rol (Carlos ve cosas distintas a Juan).

---

## 📱 Flujo 1: Carlos descarga la app por primera vez

```
┌────────────────────────────────────┐
│  1. Descarga                        │
│  Carlos busca "MilkBook" en        │
│  Play Store y descarga la app       │
│  (instala sin fricción)            │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  2. Splash de bienvenida            │
│  Logo + "Bienvenido a MilkBook"    │
│  "Vamos a crear tu cuenta en 4     │
│  pasos. ¿Listo?"                    │
│  [Sí, empecemos]                   │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  3. ¿Quién eres?                    │
│  ○ Soy lechero (compro leche)      │
│  ○ Soy productor (vendo leche)     │
│  [Continuar]                        │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  4. Verificación de identidad        │
│  "Necesitamos tu DNI para           │
│  verificarte"                        │
│                                     │
│  DNI: [12345678]                    │
│  Fecha de nacimiento:               │
│  [DD]/[MM]/[AAAA]                  │
│                                     │
│  [Verificarme]                     │
│                                     │
│  ¿Por qué? Leé 30 seg explicativo  │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  5a. Verificación OK (RENIEC)        │
│  "¡Listo, Carlos! Te verificamos    │
│  con RENIEC."                        │
│                                     │
│  Datos confirmados:                  │
│  Carlos Mendoza Torres              │
│  DNI 12345678                       │
│  [foto de RENIEC si la hay]         │
│                                     │
│  Tu número de celular es +51 999... │
│  ¿Confirmas? [Sí, es correcto]     │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  5b. Si RENIEC falla (no encontrado)│
│  "No pudimos verificarte con       │
│  RENIEC. Pero puedes entrar igual."│
│                                     │
│  Te enviaremos un código SMS a tu  │
│  celular para verificar tu número. │
│                                     │
│  Ingresa tu celular:                │
│  [+51] [999 999 999]                │
│  [Enviar código]                     │
│                                     │
│  6 dígitos SMS → [confirmar]        │
│                                     │
│  "Una vez que verifiques tu número, │
│  te pediremos tu nombre completo   │
│  y foto del DNI (delante y atrás)." │
│                                     │
│  Nombre completo: ___________       │
│  Foto DNI frente: [📷]              │
│  Foto DNI atrás: [📷]               │
│  [Enviar para revisión]             │
│                                     │
│  "Te avisaremos por SMS cuando tu   │
│  cuenta esté activa (1-2 días)"    │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  6. Crear PIN                        │
│  "Ahora crea tu PIN de 4 dígitos.   │
│  Lo usarás para firmar registros    │
│  y cierres."                        │
│                                     │
│  [código 1] [código 2] [código 3] [código 4]  │
│                                     │
│  "Repite el PIN:"                   │
│  [código 1] [código 2] [código 3] [código 4]  │
│                                     │
│  ¿Quieres usar tu huella en vez     │
│  del PIN algunas veces?              │
│  [Sí, ahora] [No, solo PIN]         │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  7. ¿Tienes RUC? (opcional)          │
│  ○ Sí, tengo RUC (si quieres       │
│    emitir factura electrónica)      │
│  ○ No, solo DNI                     │
│                                     │
│  Si SÍ: [ingresa RUC]               │
│  Verificación SUNAT vía API         │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  8. Onboarding contextual Carlos    │
│                                     │
│  "¡Listo Carlos! Ahora vamos a     │
│  agregar a tu primer productor."   │
│                                     │
│  "Puedes agregar clientes de 3      │
│  formas:"                            │
│  📷 Escanear su QR (si tiene app)   │
│  🔢 Ingresar su código              │
│  📝 Ingresar su DNI manualmente      │
│                                     │
│  "Si tu productor aún no tiene      │
│  app, puedes crearle un registro    │
│  provisional."                      │
│                                     │
│  [Agregar primer cliente]           │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  9. Tutorial rápido (3 slides)       │
│  Slide 1: "Cada mañana registra     │
│            los litros de cada         │
│            productor en 30 seg."     │
│  Slide 2: "Cada 15 días cierra la   │
│            quincena. Te toma 10 min, │
│            no 30."                    │
│  Slide 3: "Tus productores ven lo    │
│            mismo que tú. Sin         │
│            discusiones."              │
│                                     │
│  [Saltar]  [Siguiente]  [Listo]     │
└────────────────────────────────────┘
              ↓
         HOME del LECHERO
```

---

## 📱 Flujo 2: Juan descarga la app por primera vez

```
┌────────────────────────────────────┐
│  1-3. Idénticos al flujo de Carlos  │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  4. Verificación (idéntica)          │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  5. Juan aún no tiene lechero        │
│  "¡Hola Juan! MilkBook funciona con  │
│  tu lechero Carlos. ¿Ya te agregó    │
│  él en su app?"                      │
│                                     │
│  [Sí, ya estoy agregado]            │
│  [No, pero quiero entrar igual]    │
│                                     │
│  Si SÍ: pedirle código de           │
│  invitación o escanear QR           │
│  Si NO: mostrar "habla con Carlos"  │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  6-7. Idénticos al flujo de Carlos  │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  8. Onboarding contextual Juan       │
│                                     │
│  "Cada mañana, cuando Carlos pase   │
│  a recoger tu leche, vas a ver un  │
│  aviso. Solo tienes que confirmar    │
│  los litros."                       │
│                                     │
│  [Ver demo de 30 seg]               │
│  [Saltar]                            │
└────────────────────────────────────┘
              ↓
┌────────────────────────────────────┐
│  9. Tutorial rápido (3 slides)       │
│  Slide 1: "Cuando Carlos pasa,     │
│            confirmas los litros."     │
│  Slide 2: "Cada 15 días ves la      │
│            liquidación. Puedes firmar │
│            con tu PIN."              │
│  Slide 3: "Tienes una boleta formal  │
│            que puedes llevar al      │
│            banco."                    │
│                                     │
│  [Saltar]  [Siguiente]  [Listo]     │
└────────────────────────────────────┘
              ↓
         HOME del PRODUCTOR
```

---

## 🔄 Flujo 3: Juan que NO tiene smartphone (10% de casos)

```
┌────────────────────────────────────┐
│  OPCIÓN A: SMS fallback              │
│  Juan dicta su confirmación a        │
│  Carlos. Carlos confirma en su app.  │
│                                     │
│  Carlos: "Juan, ¿confirmas 17.5 L?" │
│  Juan: "Sí, fueron 17.5"            │
│  Carlos: marca "✓ Juan confirmó     │
│          vía SMS" en el registro     │
│                                     │
│  Estado: CONFIRMADO_POR_TERCERO     │
│  Auditado como caso especial.       │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  OPCIÓN B: Familiar con smartphone   │
│  Juan autoriza a su hijo/sobrino    │
│  como CLIENT_FAMILY                  │
│                                     │
│  Ver AUTH-01 caso C                 │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  OPCIÓN C (futuro): WhatsApp         │
│  Confirmar vía WhatsApp Business API │
│  "Hola Juan, ¿confirmas 17.5 L?     │
│  Responde SÍ o NO"                  │
│                                     │
│  Status: V2                          │
└────────────────────────────────────┘
```

---

## 🔍 Verificación de DNI vs RENIEC

### Proveedor: `consultarRUC.pe`

**Por qué este proveedor:**
- ✅ API peruana oficial (compatible con SUNAT).
- ✅ Endpoint de DNI → datos de persona.
- ✅ Cobertura: 99% de peruanos con DNI.
- ✅ Costo: S/ 0.30 por consulta (bajo).
- ✅ SLA 99.5%.

**Endpoint:**

```typescript
// GET https://api.consultaruc.pe/dni/{dni}?token={API_KEY}
{
  "dni": "12345678",
  "nombres": "Carlos",
  "apellidoPaterno": "Mendoza",
  "apellidoMaterno": "Torres",
  "fechaNacimiento": "1988-03-15",
  "sexo": "M",
  "estado": "ACTIVO",
  "foto": "base64...", // opcional, no siempre disponible
  "direccion": "Av. La Paz 123, Cajamarca"
}
```

**Manejo de errores:**

| Error | UX |
|---|---|
| DNI no existe en RENIEC | Pedir SMS OTP + foto del DNI (revisión manual) |
| DNI con estado "BAJA" | Rechazar (DNI suspendido/robado/extraviado) |
| API caída | Mostrar "intenta más tarde" + opción SMS OTP |
| Rate limit | Mostrar "muchas consultas, espera 1 min" |
| DNI < 18 años | Rechazar (no puede firmar contratos legales) |

---

## 📊 Métricas del flujo de registro

| Métrica | Meta | Cómo se mide |
|---|---|---|
| Tiempo total de onboarding | < 5 min | Cronómetro desde splash hasta home |
| Tasa de finalización (los que llegan al home) | > 80% | Funnel analytics |
| Tasa de éxito en verificación RENIEC | > 90% | Porcentaje que pasa sin SMS OTP |
| Tasa de SMS OTP exitoso | > 95% | Porcentaje que recibe y confirma |
| Tasa de abandono en paso 4 (verificación) | < 10% | Funnel |
| NPS post-onboarding | > 40 | Encuesta tras home |

---

## ⚠️ Edge cases

### Caso 1: Carlos ya estaba registrado, intenta de nuevo

- Pantalla: "Ya tienes una cuenta. ¿Quieres entrar o crear una nueva?"
- Si "entrar": login normal.
- Si "nueva": solo si tiene RUC distinto (caso D de AUTH-01).

### Caso 2: Juan cambia de celular

- Pantalla: "¿Eres nuevo o ya tenías cuenta?"
- Si "nuevo": onboarding normal.
- Si "ya tenía": pide DNI + OTP SMS + PIN nuevo.

### Caso 3: Carlos tiene RUC con distinto titular

- Solo permite 1 cuenta por DNI.
- Para múltiples RUCs, ver caso D de AUTH-01.

### Caso 4: La API de RENIEC cae

- Mostrar: "No pudimos verificarte ahora. Intenta en 30 minutos."
- Opción: dejar el usuario en cola y notificar cuando vuelva la API.

---

## 📦 Próximos pasos

1. ✅ Flujo de Carlos documentado
2. ✅ Flujo de Juan documentado
3. ✅ Fallback para Juan sin smartphone
4. ✅ Integración con RENIEC vía consultarRUC.pe
5. ✅ Métricas definidas
6. ⏸️ Mockups HTML de cada pantalla del onboarding
7. ⏸️ Implementación del AuthService en NestJS
8. ⏸️ Test E2E del flujo completo
9. ⏸️ Onboarding presencial para lecheros sin smartphone (capacitación)

---

## 🔗 Referencias

- Sistema de roles: [`./AUTH-01_sistema_roles.md`](./AUTH-01_sistema_roles.md)
- Métodos de auth: [`./AUTH-02_metodos_autenticacion.md`](./AUTH-02_metodos_autenticacion.md)
- Jerarquía de permisos: [`./AUTH-04_jerarquia_permisos.md`](./AUTH-04_jerarquia_permisos.md)
- Auth DNI: [`../../../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/auth-dni.md`](../../../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/auth-dni.md)
- consultarRUC.pe: https://www.consultaruc.pe
- Ley 29733 (protección de datos): https://www.gob.pe/insti...
