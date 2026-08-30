# Producto recomendado — Procesos principales

> Cada proceso se describe con: Actor, Evento inicial, Pasos, Decisiones, Resultado. Estos procesos serán candidatos a convertirse en diagramas BPMN.

## P-ENT-1: Registro de entrega diaria

```
ACTOR: Buyer Operator (empleado del comprador) o Buyer Admin
EVENTO INICIAL: Camión del comprador llega al establo del productor

PASOS:
1. Buyer Operator abre la app
2. Selecciona productor (búsqueda por nombre o DNI)
3. Ingresa litros entregados
4. Opcionalmente: foto del porongo (verificación visual)
5. Opcionalmente: GPS (ubicación del establo)
6. Confirma el registro

DECISIONES:
- ¿Está en zona con señal? → Si sí, sync inmediato
- ¿Está offline? → Guarda local; sincroniza después

ENTRADAS:
- product_id (FK)
- litros (decimal, validado > 0)
- fecha_hora (auto)
- foto_url (opcional)
- gps (opcional)

SALIDAS:
- delivery_id
- precio_aplicado (automático: precio vigente al momento)
- monto_calculado (litros × precio)
- timestamp_sync (si aplica)

REGLAS DE NEGOCIO:
- Solo se puede registrar entregas con fecha <= hoy
- No se puede modificar una entrega después de 7 días (auditoría)
- Precio se calcula automáticamente del precio vigente en la fecha

EXCEPCIONES:
- Si el productor no está registrado → invitar a crearlo (no es bloqueante)
- Si la balanza del comprador marca distinto → pedir foto y corregir

PERMISOS:
- Buyer Operator: crear, ver las de su tenant
- Buyer Admin: crear, ver, modificar, eliminar (en ventana de 24h)
- Producer: ver las suyas (sin foto del comprador)

ACTOORES:
- Buyer Operator (empleado del comprador)
- Buyer Admin (dueño del acopio)
- Producer (solo como observador)
```

## P-PREC-1: Cambio de precio

```
ACTOR: Buyer Admin
EVENTO INICIAL: Decisión del comprador de cambiar el precio por litro

PASOS:
1. Buyer Admin abre el módulo "Precios"
2. Click "Cambiar precio de leche"
3. Ingresa precio anterior (auto-completado del actual)
4. Ingresa precio nuevo
5. Ingresa fecha de vigencia (por defecto: hoy)
6. Ingresa motivo (texto libre, requerido)
7. Confirma

DECISIONES:
- ¿El nuevo precio es muy diferente (>30%)? → Pedir confirmación adicional
- ¿Hay entregas hoy que ya se liquidaron? → El cambio aplica desde la fecha indicada

ENTRADAS:
- producto
- precio_anterior (auto)
- precio_nuevo (validado > 0)
- fecha_vigencia
- motivo (texto, 5+ caracteres)

SALIDAS:
- price_config_id
- notificación a todos los productores activos del tenant (vía WhatsApp)
- log de auditoría

REGLAS:
- El precio anterior queda como histórico, no se borra
- Solo puede haber UN precio vigente por producto
- El cambio es retroactivo si así se especifica (con confirmación adicional)

EXCEPCIONES:
- Si no se ingresa motivo → bloqueado
- Si precio nuevo <= 0 → bloqueado

PERMISOS:
- Buyer Admin: crear, ver, editar motivo (no editar precio)
- Buyer Counter: ver histórico (no modificar)
- Producer: ver histórico (solo el de su tenant)
```

## P-LIQ-1: Liquidación periódica

```
ACTOR: Buyer Admin o Buyer Counter
EVENTO INICIAL: Llegada de fecha de corte (típicamente cada 15 o 30 días)

PASOS:
1. Buyer Admin abre "Liquidaciones"
2. Selecciona rango de fechas (default: quincena actual)
3. Click "Generar liquidación"
4. Sistema calcula para cada productor:
   a. Σlitros del período
   b. Precio aplicado (variable si hubo cambios)
   c. Adelantos del período
   d. Total = litros * precio - adelantos
5. Sistema muestra resumen por productor
6. Buyer Admin revisa y edita (si hay errores)
7. Click "Enviar liquidaciones"
8. Sistema envía WhatsApp + PDF a cada productor

DECISIONES:
- ¿Hay adelantos no liquidados? → Incluir automáticamente
- ¿Hay entregas en disputa? → Marcar para revisión manual
- ¿Hay errores aritméticos? → Bloquear envío y pedir revisión

ENTRADAS:
- período (fecha_inicio, fecha_fin)
- productores (auto: todos los activos)

SALIDAS:
- liquidation_id
- líneas de liquidación (por productor)
- PDFs generados
- mensajes WhatsApp enviados
- log de envío

REGLAS:
- Cada liquidación es inmutable después de enviada
- Solo se puede "re-liquidar" con nueva liquidación que anule la anterior
- Adelantos del período se restan automáticamente

EXCEPCIONES:
- Si un productor no tuvo entregas → no se genera liquidación para él
- Si una entrega es posterior a la fecha de corte → se incluye en la siguiente

PERMISOS:
- Buyer Admin: crear, editar pre-envío, enviar, ver histórico
- Buyer Counter: crear borrador, ver, no enviar
- Producer: ver solo la suya
```

## P-ADEL-1: Adelanto

```
ACTOR: Buyer Admin
EVENTO INICIAL: Productor pide adelanto al comprador

PASOS:
1. Productor contacta por WhatsApp (no necesita app)
2. Buyer Admin abre "Adelantos"
3. Selecciona productor
4. Ingresa monto
5. Ingresa fecha (default: hoy)
6. Ingresa motivo (opcional)
7. Confirma
8. Sistema notifica al productor por WhatsApp

DECISIONES:
- ¿El productor tiene saldo pendiente de liquidación anterior? → Permitir pero advertir
- ¿El monto es muy alto (>50% del promedio de sus liquidaciones)? → Advertir

ENTRADAS:
- productor_id
- monto (decimal > 0)
- fecha
- motivo (opcional)

SALIDAS:
- advance_id
- mensaje WhatsApp al productor
- liquidado: false (se líquida en próxima liquidación)

REGLAS:
- Adelantos se descuentan automáticamente en la próxima liquidación
- Adelantos no pueden exceder el monto pendiente de liquidación
- Si se liquida antes del adelanto → advertencia al productor

EXCEPCIONES:
- Adelantos de períodos anteriores ya liquidados → no se pueden modificar

PERMISOS:
- Buyer Admin: crear, ver, eliminar (solo si aún no liquidado)
- Producer: ver solo los suyos (sin app, por WhatsApp)
```

## P-CONS-1: Confirmación por productor

```
ACTOR: Producer (María)
EVENTO INICIAL: María entrega leche al comprador

PASOS:
1. María entrega leche (sin app)
2. Buyer Operator registra en la app
3. Sistema envía WhatsApp a María:
   "Confirmas: 35 L el 2026-09-15 a S/ 1.50? Responde OK para confirmar."
4. María responde "OK" o corrige
5. Sistema registra la confirmación

DECISIONES:
- ¿María no responde en 24h? → Se asume OK (auditoría muestra no confirmada)
- ¿María corrige? → El comprador debe aceptar o rechazar (genera disputa)

ENTRADAS:
- delivery_id
- respuesta (OK | corrección)
- timestamp

SALIDAS:
- confirmación (boolean)
- timestamp_confirmacion

REGLAS:
- Si María no responde, el registro es válido pero marcado "sin confirmar"
- Si María corrige, se requiere acción del comprador

EXCEPCIONES:
- María sin WhatsApp → cae a SMS fallback (V3)

PERMISOS:
- Producer: solo confirmar sus propias entregas (vía WhatsApp, sin login)
```

## P-NOTIF-1: Notificaciones al productor

```
EVENTOS QUE DISPARAN NOTIFICACIÓN:
1. Nueva entrega registrada por el comprador.
2. Cambio de precio.
3. Adelanto registrado.
4. Liquidación generada y enviada.
5. Liquidación cobrada / pagada.

CANAL: WhatsApp Business API (con fallback a SMS).

MENSAJES (Plantillas pre-aprobadas):
- "Confirmas {litros} L del {fecha} a S/{precio}? Responde OK."
- "El precio de tu leche cambió a S/{precio} desde {fecha}. Motivo: {motivo}."
- "Recibiste un adelanto de S/{monto} el {fecha}."
- "Tu liquidación del {periodo}: S/{total}. Descarga el PDF aquí: {link}"
- "Pago recibido: S/{monto} el {fecha}."

REGLAS:
- Máximo 1 mensaje por evento (no spam)
- Horario permitido: 7am-9pm hora local del productor
- Si falla el envío → SMS fallback (V2)
```

## P-AUTH-1: Autenticación y acceso

```
ACTOR: Buyer Admin
EVENTO INICIAL: Carlos quiere entrar a la plataforma

PASOS:
1. Carlos abre la app Flutter
2. Ingresa email y contraseña
3. Sistema valida y emite JWT
4. Carlos navega en el panel

DECISIONES:
- ¿Contraseña correcta? → JWT válido
- ¿Cuenta bloqueada? → Email de recuperación

REGLAS:
- Contraseña mínimo 8 caracteres
- JWT expira en 24h
- Refresh token expira en 30 días
- 2FA opcional (recomendado para Buyer Admin)

EXCEPCIONES:
- 5 intentos fallidos → bloqueo temporal de 15 min
- Email no verificado → pedir verificación antes
```

## Resumen de procesos

| Proceso | Actor principal | Disparador | Output clave |
| --- | --- | --- | --- |
| P-ENT-1: Registro de entrega | Buyer Operator | Diario, en cada recolección | delivery |
| P-PREC-1: Cambio de precio | Buyer Admin | Cuando el comprador decide | price_config |
| P-LIQ-1: Liquidación | Buyer Admin | Quincenal/mensual | liquidation + PDF |
| P-ADEL-1: Adelanto | Buyer Admin | Cuando productor pide | advance |
| P-CONS-1: Confirmación | Producer | Después de cada entrega | confirmación |
| P-NOTIF-1: Notificaciones | Sistema | Eventos | mensajes WhatsApp |
| P-AUTH-1: Autenticación | Buyer Admin / Producer | Acceso | JWT |