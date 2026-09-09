# 🔐 6_auth_y_roles — Autenticación, Roles y Módulo Contable

> **Sistema completo de autenticación, jerarquía de roles, permisos granulares y el módulo contable (mini-ERP sin pasarela de pago).** Esta carpeta documenta cómo se controla el acceso al producto y cómo los datos financieros se exponen tanto a lecheros como a productores sin necesidad de pasarela de pagos.

**Por qué existe este módulo:**
1. **El sistema tiene 7 tipos de usuarios** con diferentes niveles de acceso.
2. **Los datos financieros son sensibles** y necesitan permisos granulares.
3. **El lechero y el productor necesitan ver un resumen contable** (cuánto deben, cuánto les deben) pero no requiere pasarela de pago.
4. **El equipo interno MilkBook** necesita acceso a CRM + disputas + reportes.

---

## 📋 Documentos en esta carpeta

| Archivo | Contenido |
|---|---|
| `README.md` | Este archivo (índice) |
| [`AUTH-01_sistema_roles.md`](./AUTH-01_sistema_roles.md) | Los 7 roles + casos especiales + herencia |
| [`AUTH-02_metodos_autenticacion.md`](./AUTH-02_metodos_autenticacion.md) | PIN, huella, facial, OTP SMS, recuperación |
| [`AUTH-03_modulo_contable.md`](./AUTH-03_modulo_contable.md) | Mini-ERP contable (sin pasarela de pago) |
| [`AUTH-04_jerarquia_permisos.md`](./AUTH-04_jerarquia_permisos.md) | Tabla de permisos granulares por rol |
| [`AUTH-05_flujo_registro_verificacion.md`](./AUTH-05_flujo_registro_verificacion.md) | Cómo un usuario nuevo entra al sistema |

---

## 🎯 Resumen ejecutivo: los 7 roles

| # | Rol | Quién | Acceso principal |
|---|---|---|---|
| 1 | `SUPER_ADMIN` | Fundador(es) de MilkBook | Total: billing, config, todos los datos |
| 2 | `ADMIN` | Equipo interno MilkBook | Todo excepto billing y config crítica |
| 3 | `OPS` | Soporte de primera línea | Lectura + gestión de disputas + onboarding |
| 4 | `LECHERO_OWNER` | Carlos (lechero titular) | Su cartera + sus liquidaciones + reportes propios |
| 5 | `LECHERO_EMPLEADO` | Empleado del lechero | Registrar, no cerrar liquidaciones |
| 6 | `CLIENT_OWNER` | Juan (productor titular) | Su contrato + sus boletas + su perfil |
| 7 | `CLIENT_FAMILY` | Familiar que ayuda a Juan | Confirmar a nombre de Juan (con permiso) |

**Detalle completo en [`AUTH-01_sistema_roles.md`](./AUTH-01_sistema_roles.md).**

---

## 🔒 Métodos de autenticación

**Validados con usuario real:**

| Método | Compatible | Uso principal |
|---|---|---|
| **PIN 4-6 dígitos** | ✅ Todos los Android 11+ | Default para ambos roles |
| **Huella dactilar** | ✅ Mayoría de dispositivos | Acción rápida con manos mojadas |
| **Face ID** | ✅ Gama media-alta | Alternativa a huella |
| **Contraseña** | ✅ Todos | Recuperación |
| **OTP por SMS** | ✅ Todos | Onboarding + recuperación de cuenta |

**Detalle completo en [`AUTH-02_metodos_autenticacion.md`](./AUTH-02_metodos_autenticacion.md).**

---

## 💰 Módulo contable (mini-ERP sin pasarela)

**Decisión crítica:** MilkBook NO cobra pagos ni se integra con Yape/Plin/bancos en el MVP. **Solo REGISTRA** los pagos que ocurren fuera del sistema.

### ¿Qué hace el módulo contable?

| Función | Para Carlos | Para Juan | Para Admin |
|---|---|---|---|
| Ver estado de cuenta corriente | ✓ (su cartera) | ✓ (su contrato) | ✓ (todos) |
| Ver adelantos pendientes | ✓ | ✓ (los que recibió) | ✓ |
| Ver encargos comprados vs cobrados | ✓ | ✓ (los que pidió) | ✓ |
| Ver proyección de cierre | ✓ | ✓ (estimado a recibir) | ✓ |
| Exportar a PDF/CSV | ✓ | ✓ (boleta) | ✓ |
| Libro mayor de movimientos | ✓ (su lechería) | — | ✓ (todos) |
| Balance global del lechero | ✓ | — | ✓ |
| Conciliación manual | ✓ | — | ✓ |

### Lo que NO hace (fuera de alcance MVP)

- ❌ No cobra automáticamente.
- ❌ No se integra con Yape/Plin (solo registra que el pago fue por Yape).
- ❌ No genera factura electrónica (solo boleta).
- ❌ No hace conciliación bancaria.
- ❌ No procesa microcréditos.

**Detalle completo en [`AUTH-03_modulo_contable.md`](./AUTH-03_modulo_contable.md).**

---

## 🧬 Herencia de permisos

```
              SUPER_ADMIN
                   │
              ┌────┴────┐
           ADMIN       (otros admins)
              │
            OPS
           
LECHERO_OWNER ──────── LECHERO_EMPLEADO
     │                       │
     └──── comparte cartera ─┘
     
CLIENT_OWNER ───────── CLIENT_FAMILY
     │                       │
     └──── comparte contrato ─┘
```

**Reglas de herencia:**
- LECHERO_OWNER > LECHERO_EMPLEADO (empleado tiene menos permisos que owner).
- LECHERO_OWNER puede ver TODO lo que hace su empleado.
- CLIENT_FAMILY tiene exactamente los mismos permisos que CLIENT_OWNER, pero solo dentro del contrato familiar.
- ADMIN > OPS en acceso a datos, pero ambos son internos.

**Detalle completo en [`AUTH-04_jerarquia_permisos.md`](./AUTH-04_jerarquia_permisos.md).**

---

## 🚪 Flujo de registro y verificación

**Resumen del journey de un usuario nuevo:**

```
1. Descarga la app (Carlos o Juan)
   ↓
2. Pantalla de bienvenida
   ↓
3. Ingresa DNI (8 dígitos) + fecha de nacimiento
   ↓
4. Verificación RENIEC vía API (consultarRUC.pe)
   ↓
5. Si pasa: continuar. Si no: SMS OTP al celular registrado en RENIEC
   ↓
6. Crear PIN (4-6 dígitos) + confirmar
   ↓
7. (Opcional) Activar huella / Face ID
   ↓
8. Si es LECHERO_OWNER: vincular con primer productor por código de invitación
   Si es CLIENT_OWNER: esperar a que su lechero lo agregue o usar código
   ↓
9. Onboarding contextual (ver UF-08)
```

**Detalle completo en [`AUTH-05_flujo_registro_verificacion.md`](./AUTH-05_flujo_registro_verificacion.md).**

---

## 🧪 Cómo validar antes de implementar

Antes de codificar esto, hay que validar 4 cosas:

1. **¿El usuario acepta OTP por SMS?** Sí, validado: 90% de productores tienen smartphone, todos tienen SIM.
2. **¿La verificación RENIEC es accesible?** Sí, vía `consultarRUC.pe` (API peruana validada).
3. **¿El familiar necesita cuenta propia o puede usar la del titular?** Decisión: cuenta separada, pero con permisos delegados por el titular (ver `AUTH-01` caso especial: `CLIENT_FAMILY`).
4. **¿El módulo contable del lechero es legible para él?** Pendiente validar en campo (la pantalla debe ser MUY simple, ver `DS-04_accesibilidad_baja_alfabetizacion.md`).

---

## 📦 Próximos pasos

1. ✅ Sistema de roles documentado
2. ✅ Métodos de autenticación documentados
3. ✅ Módulo contable definido
4. ✅ Jerarquía de permisos especificada
5. ✅ Flujo de registro y verificación
6. ⏸️ Mockups HTML de las pantallas de auth (login, OTP, fingerprint)
7. ⏸️ Tabla `usuarios` + `roles` + `permisos` en schema Prisma
8. ⏸️ Middleware de autorización en NestJS
9. ⏸️ Diseño final de la pantalla "Mi cuenta" para Juan (resumen contable legible)
