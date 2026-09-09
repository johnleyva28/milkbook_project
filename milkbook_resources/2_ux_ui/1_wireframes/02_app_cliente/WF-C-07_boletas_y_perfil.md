# WF-C-07: Boletas y Perfil — App Cliente (Juan)

## Propósito
Permitir a Juan ver su historial de boletas (descargables en PDF), gestionar su perfil personal, configurar sus preferencias de firma, y cerrar sesión si lo necesita.

## Datos que muestra

### Sección "Mis boletas"
- Lista de boletas de las quincenas pasadas
- Estado (descargada / no descargada / compartida)
- Botón de descarga y compartir

### Sección "Mi perfil"
- Datos personales (nombre, DNI, email, RUC si tiene)
- Lechero activo (Carlos)
- Métodos de firma habilitados (PIN, huella, cara)
- Notificaciones (push activas, email)
- Idioma
- Ayuda y soporte
- Cerrar sesión
- Eliminar cuenta

## Wireframe (Boletas + Perfil, tabbed)

```
┌──────────────────────────────────────┐
│ 9:41    📶 4G  72%  ▮▮▮▮▮            │
├──────────────────────────────────────┤
│ Yo, Juan                              │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐│
│ │  [JP] Juan Pérez                ││
│ │      DNI 45678901                ││
│ │      Lechero activo: Carlos      ││
│ │      ✉ juan.perez@gmail.com    ││
│ │      📱 +51 999 999 999         ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ 📄 MIS BOLETAS ─────────────────┐ │
│ │                                  │ │
│ │ Quincena 15-29 sept 2026        │ │
│ │ 💰 S/ 171.25                    │ │
│ │ ✓ SUNAT: ACEPTADA               │ │
│ │ [📥 Descargar PDF] [📤 WhatsApp]│ │
│ ├──────────────────────────────────┤│
│ │ Quincena 1-15 sept 2026         │ │
│ │ 💰 S/ 145.50                    │ │
│ │ ✓ SUNAT: ACEPTADA               │ │
│ │ [📥 Descargar PDF] [📤 WhatsApp]│ │
│ ├──────────────────────────────────┤│
│ │ Quincena 15-31 ago 2026         │ │
│ │ 💰 S/ 198.00                    │ │
│ │ ✓ SUNAT: ACEPTADA               │ │
│ │ [📥 Descargar PDF] [📤 WhatsApp]│ │
│ ├──────────────────────────────────┤│
│ │ Quincena 1-15 ago 2026         │ │
│ │ 💰 S/ 132.75                    │ │
│ │ ✓ SUNAT: ACEPTADA               │ │
│ │ [📥 Descargar PDF] [📤 WhatsApp]│ │
│ │                                  │ │
│ │ [Ver todas las boletas]          │ │
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ 🔒 FIRMA Y SEGURIDAD ──────────┐│
│ │                                  ││
│ │ Métodos habilitados:             ││
│ │ ● PIN (4 dígitos)                ││
│ │ ● Huella dactilar                ││
│ │ ○ Cara (Face ID)                 ││
│ │                                  ││
│ │ Cambiar PIN: [toca aquí]         ││
│ │ Cambiar biometría: [toca aquí]   ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ 🔔 NOTIFICACIONES ──────────────┐│
│ │                                  ││
│ │ ● Push: "Sí, recibir"           ││
│ │ ● Email: "Sí, para boletas"     ││
│ │ ● SMS (emergencias): "Sí"        ││
│ └──────────────────────────────────┘│
│                                       │
│ ┌─ AYUDA ──────────────────────────┐│
│ │ ❓ Cómo funciona MilkBook        ││
│ │ 📞 Contactar a Carlos            ││
│ │ 💬 Chat de soporte               ││
│ │ 📧 soporte@milkbook.com          ││
│ └──────────────────────────────────┘│
│                                       │
│ ⚠ Sobre MilkBook                      │
│ v1.0.0 · Términos · Privacidad      │
│                                       │
│ [Cerrar sesión]                       │
│                                       │
├──────────────────────────────────────┤
│ 🏠Inicio  📅Quincena  📜Boletas  👤Yo│
└──────────────────────────────────────┘
```

## Wireframe (Cambiar PIN)

```
┌──────────────────────────────────────┐
│ ← Cambiar PIN                         │
├──────────────────────────────────────┤
│                                       │
│ Tu PIN actual tiene 4 dígitos.        │
│                                       │
│ PIN ACTUAL                            │
│ ┌──────┬──────┬──────┬──────┐         │
│ │      │      │      │      │         │
│ └──────┴──────┴──────┴──────┘         │
│                                       │
│ NUEVO PIN                             │
│ ┌──────┬──────┬──────┬──────┐         │
│ │      │      │      │      │         │
│ └──────┴──────┴──────┴──────┘         │
│                                       │
│ REPETIR PIN                           │
│ ┌──────┬──────┬──────┬──────┐         │
│ │      │      │      │      │         │
│ └──────┴──────┴──────┴──────┘         │
│                                       │
│ [Cancelar]  [Guardar PIN]            │
└──────────────────────────────────────┘
```

## Wireframe (Eliminar cuenta)

```
┌──────────────────────────────────────┐
│ ← Eliminar cuenta                    │
├──────────────────────────────────────┤
│                                       │
│ ⚠ Esta acción es IRREVERSIBLE         │
│                                       │
│ Al eliminar tu cuenta:                │
│ • Perderás acceso a tus boletas       │
│ • Tu historial se conservará por      │
│   5 años (Ley 29733)                 │
│ • Carlos seguirá teniendo sus datos   │
│ • Las liquidaciones pasadas no se     │
│   borran (auditoría)                 │
│                                       │
│ Para confirmar, escribe tu DNI:       │
│ ┌──────────────────────────────────┐│
│ │ 45678901                         ││
│ └──────────────────────────────────┘│
│                                       │
│ [Cancelar]  [Eliminar mi cuenta]    │
└──────────────────────────────────────┘
```

## Notas de UX

### Decisiones críticas

1. **Perfil arriba:** Juan ve sus datos y cómo contactarlo. Importante para soporte.
2. **Boletas accesibles siempre:** Juan puede descargar en cualquier momento, no solo al cierre.
2. **Métodos de firma configurables:** Juan puede activar huella si su celular lo soporta.
3. **"Cerrar sesión"** explícito, no escondida. Juan debe poder hacerlo sin fricción.
4. **"Eliminar cuenta"** con confirmación doble (escribir DNI). Es serio, requiere intención clara.

### Decisiones de copy

- **"Yo, Juan":** vs "Mi perfil". Más personal.
- **"Lechero activo: Carlos":** propiedad. Es su lechero.
- **"Cerrar sesión":** claro, no "Salir".

### Decisiones de privacidad

- **Datos personales:** Juan puede editar email y teléfono.
- **Email:** puede cambiar el asociado a boletas (las anteriores mantienen el email viejo).
- **Eliminar cuenta:** protegido por DNI + confirmación escrita. Audit log.

## Estados posibles

```
┌──────────────────────────────────┐
│                                  │
│  PERFIL_ACTIVO                  │  ← Normal
│  ↓                              │
│  PIN_CAMBIANDO                  │  ← Cambia su PIN
│  ↓                              │
│  BIOMETRIA_CONFIGURANDO         │  ← Activa huella/cara
│                                  │
│  (salidas)                      │
│  ↓                              │
│  SESION_CERRADA                 │  ← Cerró sesión
│  ↓                              │
│  CUENTA_ELIMINADA              │  ← Cuenta eliminada│
│                                  │    (datos conservados│
│                                  │     por 5 años)
│                                  │
└──────────────────────────────────┘
```

## Edge cases

| Caso | UX |
|---|---|
| Juan quiere compartir boleta con familiar | Botón WhatsApp nativo, pre-carga texto + PDF |
| Juan no tiene email | Mostrar "Agregar email para recibir boletas" como CTA |
| Juan perdió acceso a su celular | Flujo de recuperación: SMS OTP + DNI (ver AUTH-05) |
| Juan quiere cambiar de Carlos a otro lechero | Sistema marca "cambio de lechero", nuevo contrato |
| Juan es `CLIENT_FAMILY` | Ve perfil del titular, no puede editar |
| Juan eliminó su cuenta por error | Soporte puede restaurar dentro de 30 días (después: irrecuperable) |

## Tokens aplicados

| Elemento | Token | Valor |
|---|---|---|
| Fondo | `--cream-50` | #FFFDF7 |
| Card perfil | `--cream-100` + border | destacado |
| Botón SUNAT "Aceptada" | `--green-500` texto | verde |
| Sección firma | `--blue-100` | azul |
| Botón "Eliminar cuenta" | `--error` | rojo |
| Advertencias | `--warning-bg` | amarillo |

## Métricas

- **% de Juan que descarga su primera boleta:** target > 60%
- **% que comparte boleta por WhatsApp:** target > 30%
- **% que cambia PIN por seguridad:** target < 10% (raro en rural)
- **% que activa biometría:** target > 40% (los que tienen)

## Conexiones

- **←** WF-C-01 (home): tap en "Yo" del bottom nav
- **←** WF-C-06 (ver liquidación): "Ver boleta PDF" abre esta pantalla
- **→** Pantalla de login (cerrar sesión)

## Versión
1.0 — 2026-09-07 — Documento inicial.
