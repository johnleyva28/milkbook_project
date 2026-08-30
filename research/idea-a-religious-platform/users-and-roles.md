# Idea A — Usuarios, roles y gobierno de datos

## Usuarios principales

### U1. Platform Administrator (Super Admin)
- **Quién:** Equipo técnico del proveedor del software (o equipo LADP SATD).
- **Permisos:** Configuración global, gestión de regiones, plantillas, integraciones.

### U2. National Administrator
- **Quién:** Directorio Nacional de LADP (CIO, Director de Comunicaciones, etc.).
- **Permisos:** Acceso a todas las regiones, reportes agregados, gestión de ministerios nacionales.

### U3. Regional Administrator
- **Quién:** Presidente Regional, Secretario Regional.
- **Permisos:** Acceso a todas las iglesias de su región, reportes regionales, gestión de ministerios regionales, acreditación regional.

### U4. Local Pastor (Pastor Principal)
- **Quién:** Pastor titular de la iglesia local.
- **Permisos:** Gestión completa de su iglesia: miembros, finanzas, eventos, documentos.
- **Restricciones:** No ve otras iglesias de la región (por defecto), salvo autorización.

### U5. Local Administrator / Tesorero / Secretario
- **Quién:** Diáconos y oficiales de la iglesia local.
- **Permisos:** Específicos por rol:
  - **Tesorero:** Solo finanzas.
  - **Secretario:** Solo actas, membresía, documentos.
  - **Director de Ministerio:** Solo el módulo del ministerio.

### U6. Minister / Pastor General
- **Quién:** Pastor acreditado, obispo, superintendente.
- **Permisos:** Lectura de su expediente ministerial, gestión de acreditaciones propias.

### U7. Miembro de iglesia
- **Quién:** Feligrés bautizado.
- **Permisos (si hay portal/app de feligrés):** Ver su perfil, descargar certificados, dar ofrenda online, ver directorio, suscribirse a comunicaciones.

## Roles especiales

### R-CMI: Comité Ministerial (Presbiterio)
- Quién: Ministros acreditados con rol ejecutivo.
- Permisos: Voto en decisiones ministeriales, revisión de candidatos a ordenación.

### R-CAL: Cuerpo Administrativo Local
- Quién: Pastor + cuerpo ministerial + cuerpo de diáconos de una iglesia.
- Permisos: Gestión operativa de la iglesia.

### R-AUD: Auditor
- Quién: Persona designada por la región para auditar iglesias locales.
- Permisos: Lectura de finanzas y documentos de iglesias bajo auditoría.

## Modelo de tenancy

### Opción 1: Single-tenant para LADP
- Una sola instalación para toda la organización.
- Datos segregados lógicamente por región y por iglesia.
- Gobierno: LADP SATD o equipo interno.

### Opción 2: Multi-tenant para varias denominaciones
- Misma plataforma sirve a LADP, MMM, Iglesias Pentecostales Unidas, etc.
- Cada denominación es un tenant.
- Gobierno: proveedor externo (ej. nuestra startup).

### Opción 3: Multi-tenant para cualquier iglesia pequeña
- Mismo modelo pero sin restricción denominacional.
- Iglesias independientes pueden registrarse.

> **[RECOMENDACIÓN]** Si vamos por Idea A, la **Opción 3** ofrece el TAM más grande pero requiere más producto y más estrategia de marketing. La **Opción 1** es viable pero colisiona con el SATD existente de LADP. La **Opción 2** es un punto medio razonable.

Ver [`saas-analysis.md`](./saas-analysis.md) para análisis detallado.

## Modelo de jerarquía

```
PLATFORM ADMIN (super usuario técnico)
│
└── DENOMINATION / TENANT (si aplica)
    │
    ├── NATIONAL LEVEL
    │   ├── Junta Directiva
    │   ├── Ministerios Nacionales (Damas, Jóvenes, etc.)
    │   └── Direcciones Nacionales
    │
    ├── REGIONAL LEVEL (N regiones)
    │   ├── Junta Ejecutiva Regional
    │   ├── Ministerios Regionales
    │   └── Iglesias Locales (N por región)
    │       ├── Pastor Principal
    │       ├── Cuerpo Administrativo Local
    │       │   ├── Tesorero
    │       │   ├── Secretario
    │       │   └── Diáconos
    │       ├── Ministerios Locales (si aplica)
    │       └── Miembros (N)
    │           └── Lectura de su propio perfil
```

## Permisos finos (ejemplos)

| Recurso | Pastor | Tesorero | Secretario | Miembro |
| --- | --- | --- | --- | --- |
| Crear miembro | ✅ | ❌ | ✅ | ❌ |
| Ver miembros | ✅ | ❌ | ✅ | ✅ solo iglesia |
| Registrar ofrenda | ✅ | ✅ | ❌ | ❌ (si hay portal feligrés, ofrendar sí) |
| Ver finanzas | ✅ | ✅ | ❌ | ❌ |
| Emitir certificado bautismo | ✅ | ❌ | ✅ | ❌ |
| Ver su propio certificado | ✅ | ✅ | ✅ | ✅ |
| Crear evento | ✅ | ❌ | ✅ | ❌ |
| Aprobar traspaso de miembro | ✅ | ❌ | ❌ | ❌ |

## Auditoría

Toda acción debe quedar registrada:
- Quién hizo qué.
- Cuándo.
- Desde dónde (IP, dispositivo).
- Cambio concreto.

Especialmente crítico para:
- Acreditaciones ministeriales.
- Cambios en finanzas.
- Modificación de datos de miembros.
- Eliminación de registros.

## Referencias

| # | Fuente | URL | Tipo | Fecha |
| --- | --- | --- | --- | --- |
| A15 | Estatuto LADP | https://es.slideshare.net/slideshow/estatuto-y-reglalmento-2019-vigente-2023pdf/265387657 | Oficial | 2026-08 |