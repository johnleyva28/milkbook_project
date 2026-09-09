# UF-08: Onboarding del Primer Uso

## Resumen

Journey completo desde que Carlos o Juan descargan la app hasta que tienen su primera interacción exitosa con un cliente. Es crítico para retención: si abandonan en el onboarding, no vuelven.

## Actores

- **Carlos** o **Juan** (usuario nuevo)
- **Sistema** (RENIEC vía consultarRUC.pe, SMS OTP, push)

## Precondiciones

- ✅ Usuario tiene smartphone Android 11+.
- ✅ Usuario tiene DNI peruano.
- ✅ Usuario tiene número de celular activo (para SMS OTP).
- ✅ Usuario tiene al menos 1GB de espacio libre.

## Happy Path (Carlos)

```
DESCARGA E INSTALACIÓN
┌────────────────────────────────────┐
│ 1. Carlos busca "MilkBook" en Play  │
│    Store.                            │
│ 2. Carlos ve descripción + icono.   │
│ 3. Carlos descarga app (~30 MB).    │
│ 4. Carlos abre la app.               │
└────────────────────────────────────┘
                ↓
SPLASH + BIENVENIDA
┌────────────────────────────────────┐
│ 5. Splash (1-2 seg): logo + slogan.│
│ 6. Pantalla "Bienvenido a MilkBook" │
│    "Vamos a crear tu cuenta en 4     │
│    pasos. ¿Listo?"                  │
│ 7. Carlos tap "SÍ, EMPEZAMOS".      │
└────────────────────────────────────┘
                ↓
PASO 1: ¿QUIÉN ERES?
┌────────────────────────────────────┐
│ 8. Pantalla "¿Quién eres?"           │
│ 9. Carlos elige "Soy lechero".      │
│ 10. Tap "Continuar".                │
└────────────────────────────────────┘
                ↓
PASO 2: VERIFICACIÓN DE IDENTIDAD
┌────────────────────────────────────┐
│ 11. Pantalla "Necesitamos tu DNI".  │
│ 12. Carlos ingresa DNI: 12345678.  │
│ 13. Carlos ingresa fecha nacimiento:│
│     15/03/1988.                     │
│ 14. Tap "VERIFICARME".              │
│ 15. Sistema consulta RENIEC.        │
│ 16a. Si OK: continúa.               │
│ 16b. Si falla: SMS OTP al celular    │
│      registrado en RENIEC.          │
│ 17. Datos confirmados:               │
│     "Carlos Mendoza Torres"          │
│     DNI 12345678                     │
│     [foto RENIEC si hay]            │
│ 18. Tap "Confirmar".                │
└────────────────────────────────────┘
                ↓
PASO 3: CREAR PIN
┌────────────────────────────────────┐
│ 19. Pantalla "Crea tu PIN de 4      │
│     dígitos".                        │
│ 20. Carlos ingresa PIN: [1234].     │
│ 21. Carlos repite: [1234].           │
│ 22. Sistema valida (no es 1234, 1111, etc.)│
│ 23. PIN creado y guardado hasheado. │
│ 24. Pregunta: "¿Quieres usar tu     │
│     huella también?"                │
│ 25. Carlos: "Sí, ahora" → activa.   │
│     O: "No, solo PIN" → skip.        │
└────────────────────────────────────┘
                ↓
PASO 4: ¿TIENES RUC?
┌────────────────────────────────────┐
│ 26. "¿Tienes RUC? (opcional)"        │
│     ○ Sí, tengo RUC                 │
│     ● No, solo DNI                   │
│ 27a. Si Sí: ingresa RUC, sistema    │
│      valida con SUNAT vía           │
│      consultarRUC.pe.              │
│ 27b. Si No: skip.                    │
└────────────────────────────────────┘
                ↓
PASO 5: AGREGAR PRIMER CLIENTE
┌────────────────────────────────────┐
│ 28. "¡Listo Carlos! Ahora vamos a   │
│     agregar a tu primer productor." │
│ 29. Carlos tiene 3 opciones:         │
│     a) 📷 Escanear QR (si Juan tiene │
│        app)                          │
│     b) 🔢 Ingresar código            │
│     c) 📝 Ingresar DNI manualmente  │
│ 30. Carlos elige: ingresa DNI de    │
│     Juan (45678901).                 │
│ 31. Sistema busca a Juan (si tiene   │
│     cuenta creada).                  │
│ 32. Juan recibe push: "Carlos quiere │
│     agregarte como cliente".          │
│ 33. Juan acepta.                     │
│ 34. Carlos ve "Juan Pérez agregado". │
└────────────────────────────────────┘
                ↓
TUTORIAL RÁPIDO (3 slides)
┌────────────────────────────────────┐
│ Slide 1: "Cada mañana registra los  │
│ litros de cada productor en 30 seg."│
│ [Saltar]  [Siguiente]                │
│                                    │
│ Slide 2: "Cada 15 días cierra la     │
│ quincena. Te toma 10 min, no 30."  │
│ [Saltar]  [Siguiente]                │
│                                    │
│ Slide 3: "Tus productores ven lo    │
│ mismo que tú. Sin discusiones."      │
│ [Saltar]  [Listo]                   │
└────────────────────────────────────┘
                ↓
        HOME DEL LECHERO
        (Carlos ya puede usar la app)
```

## Happy Path (Juan)

```
... mismos pasos 1-7 ...
8'. Juan elige "Soy productor (vendo leche)".
... mismos pasos 9-25 ...
26'. Juan elige "No, solo DNI".
27'. (skip)
28'. "¡Hola Juan! MilkBook funciona con│
      tu lechero Carlos. ¿Ya te agregó │
│      él en su app?"                  │
│      [Sí, ya estoy agregado]         │
│      [No, pero quiero entrar igual] │
│ 29'. Si SÍ: pedir código o escanear │
│      QR de Carlos.                   │
│      Si NO: "Habla con Carlos para   │
│      que te agregue".                │
│ ... mismos pasos 30-34 ...
```

## Edge Cases

### EC-8.1: RENIEC no encuentra al usuario (DNI no registrado)

```
... paso 15 ...
15''. RENIEC no devuelve datos para ese DNI.
16''. Sistema: "No pudimos verificarte con RENIEC. Pero puedes entrar igual."
17''. Sistema pide SMS OTP al celular.
18''. Juan ingresa OTP.
19''. Sistema: "Ahora necesitamos que tomes fotos de tu DNI (delante y atrás)."
20''. Juan toma fotos.
21''. Sistema: "Tu cuenta será revisada en 1-2 días. Te avisaremos por SMS."
22''. Cuenta creada en estado: PENDIENTE_REVISION.
23''. Carlos no puede agregarlo hasta que la cuenta sea aprobada.
```

### EC-8.2: Usuario tiene RUC pero no se valida con SUNAT

```
... paso 27 ...
27'''. Usuario ingresa RUC 20123456789.
28'''. SUNAT no responde / RUC inválido.
29'''. Sistema: "No pudimos validar tu RUC con SUNAT. Puedes intentar de nuevo o saltarlo."
30'''. Usuario decide:
       a) Reintentar validación
       b) Saltar (continuar sin RUC)
```

### EC-8.3: Carlos quiere agregar un cliente que aún no tiene la app

```
... paso 31 ...
31'. Carlos ingresa DNI de Pedro (78901234).
32'. Pedro no tiene cuenta.
33'. Sistema: "Pedro aún no tiene MilkBook. Puedes crearle una cuenta provisional o enviarle una invitación."
34'. Carlos elige:
      a) Cuenta provisional: Pedro tiene cuenta pero sin acceso hasta que se active.
      b) Invitación: sistema envía SMS a Pedro con link de descarga.
35'. Si a) → Carlos puede registrar a Pedro con la cuenta provisional (Pedro no firma hasta activarse).
36'. Si b) → Pedro recibe SMS, descarga app, hace onboarding, luego se vincula.
```

### EC-8.4: Carlos abandona el onboarding en el paso 2 (verificación)

```
... paso 14 ...
15''. Carlos ve "verificando..." y se va (no espera).
16''. Carlos regresa 2 días después.
17''. Carlos abre la app.
18''. App detecta onboarding incompleto.
19''. Carlos retoma desde donde lo dejó.
20''. Carlos ahora puede continuar.
```

### EC-8.5: El usuario es mayor de 60 años y no sabe usar la app

```
... paso 8 ...
8''''. Usuario no entiende la pantalla.
9''''. Toca cualquier parte y aparece: "¿Necesitas ayuda? Llama al 999-999-999."
10''''. O el hijo/familiar está ayudando.
11''''. La cuenta queda registrada con un "Familiar Asociado" (opcional).
```

## Errores y Recuperación

| Error | Detección | Recuperación |
|---|---|---|
| SMS OTP no llega | 3 reintentos fallidos | Soporte manual con verificación DNI + foto |
| App crash durante onboarding | Crashlytics | Reabrir app retoma desde último paso guardado |
| Internet inestable durante verificación | Retry automático | Si tras 3 reintentos falla, fallback a SMS OTP + foto |
| RUC con dígito verificador incorrecto | Validación frontend | Mensaje claro, no deja avanzar |
| DNI con formato incorrecto | Validación frontend | Mensaje claro |
| Fingerprint/huella no funciona | Hardware no compatible | PIN siempre funciona como fallback |

## Métricas

| Métrica | Meta | Cómo medir |
|---|---|---|
| Tiempo total de onboarding | < 5 min | Cronómetro |
| Tasa de finalización (% que llega al home) | > 80% | Funnel analytics |
| % que crea PIN exitosamente | > 95% | Funnel |
| % que verifica DNI exitosamente (vía RENIEC) | > 90% | Funnel |
| % que agrega al menos 1 cliente (Carlos) | > 70% | Funnel |
| % que activa biometría | > 40% (los que tienen) | Funnel |
| % de cuentas rechazadas (en revisión manual) | < 5% | Telemetry |
| NPS post-onboarding | > 40 | Encuesta al llegar al home |
| Tasa de retorno D1 | > 70% | Analytics |
| Tasa de retención D7 | > 50% | Analytics |

## Conexiones

- **Auth flow:** ver `../6_auth_y_roles/AUTH-05_flujo_registro_verificacion.md`
- **Sistema de roles:** ver `../6_auth_y_roles/AUTH-01_sistema_roles.md`
- **Wireframes:** (próximos) mockups HTML de cada pantalla del onboarding
- **Diseño:** ver `../5_design_system/DS-04_accesibilidad_baja_alfabetizacion.md`

## Versión
1.0 — 2026-09-07 — Documento inicial.
