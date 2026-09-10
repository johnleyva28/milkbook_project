# 🎨 2_ux_ui — Interfaz, Flujos y Diseño

> **Documentación completa de UX/UI de MilkBook.** Cubre los flujos de las dos apps móviles (lechero y productor/cliente), las tres plataformas web, los wireframes ASCII, mockups HTML interactivos, prototipos navegables, user flows detallados, design system específico para móvil, y el sistema de autenticación + roles + módulo contable (mini-ERP sin pasarela de pago).

**Fecha de creación:** 2026-09-07
**Estado:** 🟢 Estructura completa (50+ archivos)
**Basado en:** [`../../indagacion_y_planteamiento_de_proyecto/`](../../indagacion_y_planteamiento_de_proyecto/) (datos validados con usuario real)

---

## 📁 Estructura completa

```
2_ux_ui/
├── README.md                          ← Este archivo (índice maestro)
├── 1_wireframes/                      ← 15 wireframes ASCII detallados
│   ├── README.md
│   ├── 01_app_lechero/                ← 8 wireframes del flujo de Carlos
│   │   ├── README.md
│   │   ├── WF-L-01_home_y_cartera.md
│   │   ├── WF-L-02_registrar_visita_quick.md
│   │   ├── WF-L-03_confirmar_recoleccion.md
│   │   ├── WF-L-04_adelantos.md
│   │   ├── WF-L-05_encargos.md
│   │   ├── WF-L-06_sacar_cuentas.md          ← ⭐ LA MÁS IMPORTANTE
│   │   ├── WF-L-07_cerrar_contrato_y_boleta.md
│   │   └── WF-L-08_estadisticas_y_reportes.md
│   └── 02_app_cliente/                ← 7 wireframes del flujo de Juan
│       ├── README.md
│       ├── WF-C-01_home_y_contrato.md
│       ├── WF-C-02_confirmar_litros.md       ← ⭐ LA MÁS IMPORTANTE PARA JUAN
│       ├── WF-C-03_no_vendi.md
│       ├── WF-C-04_adelantos_recibidos.md
│       ├── WF-C-05_encargos_recibidos.md
│       ├── WF-C-06_ver_liquidacion.md
│       └── WF-C-07_boletas_y_perfil.md
├── 2_mockups/                         ← 6 mockups HTML estáticos (alta fidelidad)
│   ├── README.md
│   ├── shared_styles.css
│   ├── app_lechero_home.html
│   ├── app_lechero_registrar_visita.html
│   ├── app_lechero_cerrar_contrato.html    ← ⭐ LA MÁS IMPORTANTE
│   ├── app_cliente_home.html
│   ├── app_cliente_confirmar_litros.html   ← ⭐ CRÍTICA PARA JUAN
│   └── app_cliente_no_vendi.html
├── 3_prototipos/                      ← Prototipos HTML interactivos
│   ├── README.md
│   ├── prototipo_lechero_registro.html      ← Flujo de Carlos
│   ├── prototipo_cliente_confirmar.html     ← PIN funcional
│   └── prototipo_sacar_cuentas.html         ← ⭐ 5 pasos navegables
├── 4_user_flows/                      ← 8 flujos detallados + edge cases
│   ├── README.md
│   ├── UF-01_registro_diario_caso_A.md  (ambos lados)
│   ├── UF-02_registro_diario_caso_B.md  (solo Carlos)
│   ├── UF-03_cierre_quincena.md
│   ├── UF-04_adelanto.md
│   ├── UF-05_encargo.md
│   ├── UF-06_discrepancia.md
│   ├── UF-07_offline_sync.md
│   └── UF-08_onboarding_primer_uso.md
├── 5_design_system/                   ← Sistema de diseño específico móvil
│   ├── README.md
│   ├── DS-01_tokens_movil.md           (extensión de tokens generales)
│   ├── DS-02_componentes_movil.md      (catálogo de componentes)
│   ├── DS-03_patrones_pantallas_movil.md (layouts recurrentes)
│   └── DS-04_accesibilidad_baja_alfabetizacion.md
└── 6_auth_y_roles/                    ← Autenticación, roles, módulo contable
    ├── README.md
    ├── AUTH-01_sistema_roles.md
    ├── AUTH-02_metodos_autenticacion.md
    ├── AUTH-03_modulo_contable.md       ← mini-ERP sin pasarela
    ├── AUTH-04_jerarquia_permisos.md
    └── AUTH-05_flujo_registro_verificacion.md
```

---

## 🎯 Principios rectores de toda la UX

### Restricciones del usuario (validadas)

| Restricción | Carlos (lechero) | Juan (productor) |
|---|---|---|
| **Dispositivo** | Xiaomi Redmi gama media, Android 11+ | Xiaomi Redmi 9A gama baja, Android 11+ |
| **Conectividad** | 4G pueblo, 3G caseríos, sin señal en zonas remotas | 3G caserío, sin señal frecuente |
| **Alfabetización digital** | Media | Baja-media |
| **Contexto de uso** | Moto, manos ocupadas, prisa | Corral, manos húmedas o sucias, prisa |
| **Frecuencia** | Diario (mañana) + quincenal (cierre) | Diario (mañana) + quincenal (cierre) |
| **Tiempo por tarea crítica** | ≤30s (registro), ≤10min (cierre) | ≤30s (confirmar) |
| **Pantalla en condiciones** | Sol directo, batería baja, sin audífonos | Sol directo, sin audífonos |

### Principios de diseño (8 inquebrantables)

1. **Offline-first absoluto.** Toda interacción funciona sin internet. La sincronización ocurre cuando hay señal.
2. **Una sola acción principal por pantalla.** El usuario nunca debe adivinar qué hacer.
3. **Botones grandes.** 60dp para acción primaria, 56dp para secundaria, 48dp mínimo absoluto.
4. **Texto mínimo 16sp.** Datos críticos (litros, monto) en 28-32sp bold Atkinson.
5. **Icono + texto SIEMPRE.** Nunca icono solo (excepto tabs y navegación universal).
6. **Confirmación explícita antes de acciones destructivas.** Discrepancias, eliminaciones, cierre.
7. **Firma digital multi-método.** PIN / huella dactilar / biometría facial / contraseña.
8. **Mensajes en español cotidiano.** "Ey Carlos" no "Estimado usuario".

---

## 🔄 Los 3 flujos críticos

### 1. Registro diario (todos los días, ambos lados)
- **Frecuencia:** diaria
- **Tiempo objetivo:** < 30s por lado
- **Estado deMilkBook:** MEJORA al cuaderno en 80% de casos
- **Documentado en:** `1_wireframes/01_app_lechero/WF-L-03_confirmar_recoleccion.md` + `02_app_cliente/WF-C-02_confirmar_litros.md`
- **User flow:** `4_user_flows/UF-01_registro_diario_caso_A.md`
- **Mockup HTML:** `2_mockups/app_cliente_confirmar_litros.html`
- **Prototipo:** `3_prototipos/prototipo_cliente_confirmar.html`

### 2. Sacar cuentas / Cierre de quincena (cada 15 días)
- **Frecuencia:** quincenal
- **Tiempo objetivo:** < 10 min/cliente (vs. 20-40 min sin app)
- **Estado deMilkBook:** LA PANTALLA MÁS IMPORTANTE de toda la app
- **Documentado en:** `1_wireframes/01_app_lechero/WF-L-06_sacar_cuentas.md`
- **User flow:** `4_user_flows/UF-03_cierre_quincena.md`
- **Mockup HTML:** `2_mockups/app_lechero_cerrar_contrato.html`
- **Prototipo interactivo:** `3_prototipos/prototipo_sacar_cuentas.html`

### 3. Onboarding del primer uso (una vez por usuario)
- **Frecuencia:** única
- **Tiempo objetivo:** < 5 minutos
- **Estado deMilkBook:** crítico para retención
- **Documentado en:** `4_user_flows/UF-08_onboarding_primer_uso.md`
- **Auth flow:** `6_auth_y_roles/AUTH-05_flujo_registro_verificacion.md`

---

## 🔗 Tres plataformas web (propuesta)

| Plataforma | Para quién | Qué hace |
|---|---|---|
| **1. Web Admin interna** | Equipo MilkBook | CRM, disputas, reportes, onboarding, módulo contable |
| **2. Web Lechero** | Carlos y su equipo | Dashboard personal, cartera, reportes propios, facturación |
| **3. Portal Cliente Web** | Juan que no tiene app o quiere ver en pantalla grande | Resumen del contrato, descargar boletas, ver historial |

**La pieza que tú propusiste (mini-ERP contable) está integrada en:**
- **Web Admin interna** → módulo "Contabilidad" para el equipo
- **Web Lechero** → dashboard de ingresos/gastos/adelantos/encargos/balance
- **App móvil** → "Mi quincena" para Juan con resumen legible

**Módulo contable que NO integra pasarelas de pago** (como pediste):
- ✅ Libro mayor de movimientos
- ✅ Balance por cliente y global
- ✅ Estado de cuenta corriente
- ✅ Adelantos pendientes vs pagados
- ✅ Encargos comprados vs cobrados
- ✅ Proyección de cierre
- ✅ Reportes descargables (PDF/CSV)
- ✅ Export a Excel/CSV

Documentado en `6_auth_y_roles/AUTH-03_modulo_contable.md`.

---

## 👥 Sistema de roles y permisos

Documentado en `6_auth_y_roles/`. Resumen:

| Rol | Quién | Permisos clave |
|---|---|---|
| `SUPER_ADMIN` | Fundador MilkBook | Todo, incluyendo config de billing |
| `ADMIN` | Equipo interno MilkBook | Todo excepto billing |
| `OPS` | Soporte de primera línea | Lectura + disputas |
| `LECHERO_OWNER` | Carlos | Su cartera + sus liquidaciones |
| `LECHERO_EMPLEADO` | Empleado del lechero | Registrar, no cerrar liquidaciones |
| `CLIENT_OWNER` | Juan | Su contrato + sus boletas |
| `CLIENT_FAMILY` | Familiar que ayuda a Juan | Confirmar a nombre de Juan (con permiso) |

---

## 📊 Métricas de UX

| Métrica | Meta | Cómo se mide |
|---|---|---|
| Tiempo de confirmación de litros | < 30 seg | Cronómetro en test de campo |
| Tiempo de cierre de contrato | < 10 min/cliente | Cronómetro en sacado de cuentas |
| % de discrepancias resueltas en momento | > 80% | Telemetry: registros con estado RESUELTA_EN_MOMENTO |
| Tasa de adopción a 30 días | > 50% | Retención D30 |
| NPS del lechero | > 30 | Encuesta post-cierre |
| NPS del productor | > 40 | Encuesta post-cierre |
| Crash-free sessions | > 99.5% | Sentry/Crashlytics |
| % de acciones con éxito al primer intento | > 85% | Test de usabilidad con usuarios reales |

---

## 🔗 Referencias cruzadas

### Desde indagación
- Personas: [`../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/`](../../indagacion_y_planteamiento_de_proyecto/personas-usuarios/)
- Pantallas críticas documentadas: [`../../indagacion_y_planteamiento_de_proyecto/app-movil/`](../../indagacion_y_planteamiento_de_proyecto/app-movil/)
- Reglas de negocio: [`../../indagacion_y_planteamiento_de_proyecto/reglas-negocio/`](../../indagacion_y_planteamiento_de_proyecto/reglas-negocio/)
- Diseno-UX principios: [`../../indagacion_y_planteamiento_de_proyecto/diseno-ux/`](../../indagacion_y_planteamiento_de_proyecto/diseno-ux/)

### Desde identidad de marca
- Paleta y tokens: [`../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/`](../1_identidad_de_marca/1_identidad_visual/2-paleta-de-colores/)
- Tipografía: [`../1_identidad_de_marca/1_identidad_visual/3-tipografia/`](../1_identidad_de_marca/1_identidad_visual/3-tipografia/)
- Iconografía: [`../1_identidad_de_marca/1_identidad_visual/4-iconografia/`](../1_identidad_de_marca/1_identidad_visual/4-iconografia/)
- Composición: [`../1_identidad_de_marca/1_identidad_visual/8-sistema-de-composicion/`](../1_identidad_de_marca/1_identidad_visual/8-sistema-de-composicion/)
- Favicon: [`../1_identidad_de_marca/1_identidad_visual/9-favicon-y-app-icon/`](../1_identidad_de_marca/1_identidad_visual/9-favicon-y-app-icon/)
- Personalidad de marca (tono): [`../1_identidad_de_marca/2_identidad_verbal/`](../1_identidad_de_marca/2_identidad_verbal/)

### Hacia el código
- (Próximamente: design tokens para Flutter, React)

---

## 📋 Próximos pasos

1. ✅ Estructura completa con 50+ archivos
2. ✅ Wireframes detallados (15)
3. ✅ Mockups HTML navegables (6)
4. ✅ Prototipos HTML interactivos (3)
5. ✅ User flows con edge cases (8)
6. ✅ Design system específico (4 archivos)
7. ✅ Sistema de auth + roles + módulo contable (5 archivos)
8. ⏸️ Mockups HTML de las pantallas web (admin, lechero, portal cliente)
9. ⏸️ Implementación de design tokens en Flutter + React
10. ⏸️ Test de usabilidad con Carlos y Juan reales
