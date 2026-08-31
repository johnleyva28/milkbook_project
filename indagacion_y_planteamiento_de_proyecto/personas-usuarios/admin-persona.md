# Persona: Admin — El Operador del Sistema

## Identidad

- **Nombre:** puede ser un administrador del propio equipo (startup) o un super-admin del sistema.
- **Rol:** visibilidad total del sistema, soporte a usuarios, gestión de incidencias, métricas de negocio.
- **Herramienta principal:** web admin (React + Vite + TS).
- **Frecuencia de uso:** diaria, por horas.

## Funciones

### Gestión de usuarios
- Ver lista de lecheros y clientes (vendedores).
- Verificar DNIs contra RENIEC.
- Resolver problemas de cuentas (reset password, etc.).
- Suspender cuentas por mal uso.

### Monitoreo
- Ver métricas de uso: lecheros activos, litros procesados, contratos cerrados.
- Ver tasas de discrepancia.
- Ver errores de la app móvil.
- Ver tasas de boletas emitidas.

### Soporte
- Responder tickets de usuarios.
- Acompañar onboarding de nuevos lecheros.
- Resolver disputas entre lechero y cliente que la app no pudo resolver.

### Análisis de negocio
- Reportes para toma de decisiones.
- Segmentación de usuarios.
- Análisis de churn.

## Interacción con el producto

### Web admin (React + Vite + TS)
- Dashboard de KPIs.
- Tablas con filtros (lecheros, clientes, transacciones, boletas).
- Acciones de moderación.
- Reportes descargables.

### NO en app móvil
- El admin **no usa la app móvil**. Su herramienta es solo web.

## Separación clara con la app móvil

La **app móvil** es para el usuario rural (lechero + cliente).
La **web admin** es para el equipo interno.

**No se solapan en funcionalidades.** Esto es importante para evitar complejidad.

### Funcionalidades exclusivas de la web (NO en app)
- Dashboards con gráficos complejos.
- Reportes descargables (Excel, PDF).
- Gestión masiva de usuarios.
- Configuración del sistema.
- Auditoría completa.

### Funcionalidades exclusivas de la app (NO en web)
- Registro rápido de litros.
- Confirmación de entregas.
- Notificaciones push.
- Modo offline.
- Boleta en PDF descargable.

## Anti-persona

- **Cliente del sistema (lechero)**: NO es admin, no tiene acceso a la web.
- **Productor (cliente)**: NO es admin, no tiene acceso a la web.
- **Usuario malicioso**: admin tiene que detectar y suspender.

## Tamaño del equipo admin

Para una startup en fase inicial:
- 1-2 personas manejando todo.
- A medida que crece, se especializan: soporte, análisis, moderación.