# Pruebas E2E del Flujo de Doble Registro (v3)

> **Documento vivo.** Define los escenarios end-to-end que validan el flujo de doble registro del lechero y el vendedor, incluyendo escenarios offline → online. Se ejecuta antes de cada release.

---

## Stack de testing

- **Backend:** Jest + Supertest (NestJS).
- **Mobile:** Patrol (Flutter) o XCUITest (iOS nativo) — según el framework elegido.
- **Infra:** PostgreSQL de prueba (Docker) + Redis (opcional para idempotencia).
- **Network:** Simulador de red con Charles Proxy o toxiproxy para simular offline.

---

## Escenario 1: Caso A — Camino feliz (online todo el tiempo)

**Precondiciones:**
- Lechero Carlos registrado y autenticado.
- Cliente Juan con contrato `ACTIVO` vigente.
- Día actual sin registros previos.

**Pasos:**
1. Juan abre la app del cliente a las 05:35 con internet.
2. Juan registra "17 L" → POST `/api/v1/registros` (o PATCH si ya existe el placeholder).
3. Verificar: estado del registro = `ESPERANDO_LECHERO`. `litrosCliente = 17`, `registradoPorVendedorAt` set.
4. Carlos abre la app del lechero a las 06:10 con internet.
5. GET `/api/v1/registros/contrato/{cid}/hoy` → ver el registro en estado `ESPERANDO_LECHERO`.
6. Carlos toca "✓ Recogido: 17 L (coincide)" → POST `/api/v1/registros/{id}/carlos-reco gio` con `litrosCarlos = 17`.
7. Verificar:
   - Estado = `RECOGIDO_COINCIDE`.
   - `litrosCarlos = 17`, `carlosRecogio = true`, `recogidoPorCarlosAt` set.
   - Push enviado a Juan con `type: 'CARLOS_RECOGIO'`.
8. Juan abre la app, ve el banner verde.
9. Juan toca "👆 Confirmar con huella" → POST `/api/v1/registros/{id}/confirmar-cliente` con `metodoFirma = BIOMETRIA_DACTILAR`.
10. Verificar: `metodoFirmaCliente = BIOMETRIA_DACTILAR`, `confirmadoPorClienteAt` set.
11. GET del registro: `estado = RECOGIDO_COINCIDE` (con firma).

**Resultado esperado:** ✅ Todo OK, ambos lados firman, estado final correcto.

---

## Escenario 2: Caso A.b — Discrepancia detectada por Carlos

**Precondiciones:** igual al Escenario 1, pero Juan registra 17 L y Carlos observa 16.5 L.

**Pasos:**
1-5. Igual al Escenario 1.
6. Carlos toca "⚠ Recogido con diferencia" → POST `/api/v1/registros/{id}/carlos-reco gio` con `litrosCarlos = 16.5`.
7. Verificar:
   - Estado = `RECOGIDO_DISCREPANCIA`.
   - `litrosCarlos = 16.5`, `litrosCliente = 17` (sin cambios).
   - Push a Juan con `tipo: 'CARLOS_RECOGIO_DISCREPANCIA'`, mensaje "Carlos recogió 16.5 L. Tú habías puesto 17 L. Diferencia: 0.5 L".
8. Juan abre app, ve banner naranja con ambos valores.
9. Juan elige "Aceptar 16.5 L de Carlos" → POST `/api/v1/registros/{id}/confirmar-cliente` con `litrosCliente = 16.5, metodoFirma = PIN`.
10. Verificar: `litrosCliente = 16.5`, `valorFinal = 16.5`, `estado = RECOGIDO_COINCIDE` (firmado, con discrepancia resuelta).

**Resultado esperado:** ✅ Discrepancia resuelta en el momento.

---

## Escenario 3: Caso B — Carlos registra solo porque Juan no pudo

**Precondiciones:** igual al Escenario 1.

**Pasos:**
1. Juan ordeña pero NO abre la app.
2. Carlos llega a las 06:10, abre app.
3. GET `/api/v1/registros/contrato/{cid}/hoy` → ve el registro en estado `PENDIENTE` (sin litros de Juan).
4. Carlos registra 16.5 L → POST `/api/v1/registros/{id}/carlos-reco gio-solo` con `litrosCarlos = 16.5`.
5. Verificar:
   - Estado = `RECOGIDO_SIN_CONFIRMAR`.
   - `litrosCarlos = 16.5`, `litrosCliente = null`.
   - Push a Juan: "Carlos pasó y registró 16.5 L porque tú no lo hiciste. ¿Confirmas?".
7. Juan abre app 1 hora después, ve banner amarillo.
8. Juan confirma con PIN → POST confirmar.
9. Verificar: estado = `RECOGIDO_COINCIDE`.

**Resultado esperado:** ✅ Caso B funciona, Juan confirma tarde.

---

## Escenario 4: Caso B con 24 h expiradas

**Precondiciones:** igual al Escenario 3.

**Pasos:**
1-5. Igual al Escenario 3.
6. **Esperar 24 h + 1 minuto** (o ejecutar el cron manualmente en test).
7. Verificar:
   - Estado sigue = `RECOGIDO_SIN_CONFIRMAR` (no cambia a COINCIDE automáticamente).
   - Campo `notas` se actualiza con: "[Vencido YYYY-MM-DDTHH:mm:ss] Vendedor no confirmó en 24 h. Se usa valor del lechero."
   - Push enviado al vendedor.
8. Juan abre app, ve el registro con badge "vencido".
9. Si Juan quiere cambiar el valor, debe abrir disputa (no se permite edición directa de un vencido).

**Resultado esperado:** ✅ Backend es consistente: si pasa 24 h, no se auto-confirma. La auditoría queda registrada.

---

## Escenario 5: Offline-first — Carlos registra offline y sincroniza después

**Precondiciones:**
- Carlos autenticado.
- Día actual sin registros.
- Backend disponible pero la red de Carlos está caída (simular con toxiproxy).

**Pasos:**
1. Carlos abre app en zona sin señal.
2. GET `/api/v1/registros/contrato/{cid}/hoy` falla por timeout → app muestra "Modo offline, datos del último sync".
3. Carlos toca "✓ Recogido: 17 L" → app guarda localmente en Drift con `sync_status: 'pending'` y encola en outbox.
4. Carlos sigue visitando otros clientes. Mismo procedimiento.
5. Carlos llega a zona con sin (recupera señal) a las 09:00.
6. App ejecuta sync: `POST /api/v1/sync/batch` con las operaciones encoladas.
7. Backend procesa cada operación con idempotencia.
8. Verificar:
   - Todas las operaciones retornan `status: 'created'` o `updated` (no `error`).
   - Cada operación incrementa `version` del registro.
   - El backend envía push a los respectivos vendedores.
9. Carlos ve el indicador "✓ Sincronizado" en la app.

**Resultado esperado:** ✅ Carlos puede trabajar todo el día sin señal. La sincronización al recuperar señal funciona sin pérdida de datos.

---

## Escenario 6: Offline-first — Vendedor registra offline y Carlos también offline (ambos sin señal)

**Precondiciones:**
- Ambos sin señal.
- Juan registra a las 05:35 → outbox pendiente.
- Carlos registra "✓ Recogido: 17 L" a las 06:10 (también offline, basado en que Juan le dijo).

**Pasos:**
1. Juan recupera señal a las 06:30 → sync → estado `ESPERANDO_LECHERO` con `litrosCliente = 17`.
2. Carlos recupera señal a las 09:00 → sync → Carlos envía su operación (recogido, 17 L).
3. Backend recibe la operación de Carlos.
4. Backend evalúa: `litrosCarlos (17) === litrosCliente (17)` → estado = `RECOGIDO_COINCIDE`.
5. Backend envía push a Juan: "Carlos recogió 17 L".
6. Juan abre app, ve push.
7. Juan confirma con huella → sync → estado final `RECOGIDO_COINCIDE` (firmado).

**Resultado esperado:** ✅ El backend maneja correctamente la concurrencia offline y aplica LWW donde corresponde.

---

## Escenario 7: Conflicto de versión (OCC)

**Precondiciones:** Carlos y Juan abren el mismo registro al mismo tiempo y editan.

**Pasos:**
1. Carlos abre pantalla, ve registro en estado `ESPERANDO_LECHERO` v=1.
2. Juan abre la app, ve estado `ESPERANDO_LECHERO` v=1.
3. Carlos marca "Recogido con diferencia" (16.5 L) → POST con `version = 1` → backend acepta, v=2.
4. Juan (que aún tiene v=1 en su app offline) intenta confirmar 18 L → POST con `version = 1` → backend retorna **409 VERSION_CONFLICT** con el estado actual v=2.
5. Juan ve banner "Hubo cambios desde la última vez. Recarga."
7. Juan recarga, ve los valores reales (16.5 vs su 18), confirma 16.5 → OK.

**Resultado esperado:** ✅ OCC previene que se pisen los datos. El usuario siempre ve la versión más reciente.

---

## Escenario 8: Vendedor edita después de Carlos cerrar liquidación

**Precondiciones:** Liquidación ya cerrada para ese contrato.

**Pasos:**
1. Juan abre app después del cierre.
2. Juan intenta cambiar "17 L" a "18 L" → app bloquea con mensaje: "La liquidación ya está cerrada. Para cambiar, abre una disputa."
3. Juan abre disputa → POST `/api/v1/disputas` con `liquidacionId`, `tipo = 'litros'`, `descripcion`.
4. Verificar: `Disputa.estado = ABIERTA`, notificación al lechero y al admin.

**Resultado esperado:** ✅ No se permite edición directa post-cierre. El camino formal es abrir disputa.

---

## Escenario 9: Lechero sin marca "✓ recogido" durante 24 h

**Precondiciones:**
- Juan registró 17 L a las 05:35.
- Carlos NO abrió la app durante el día (enfermedad, etc.).

**Pasos:**
1. Esperar 24 h + 1 minuto. Backend corre el cron.
2. Verificar:
   - Registro sigue en estado `ESPERANDO_LECHERO`.
   - Se agrega nota: "[Vencido YYYY-MM-DDTHH:mm:ss] Carlos no marcó recogido en 24 h."
   - Push a Carlos: "Tienes 1 cliente con leche sin marcar recogida. ¿Qué pasó?"
3. Carlos abre app al día siguiente, ve el registro con badge "vencido — Carlos no marcó".
4. Carlos puede:
   - Marcar "✓ Recogido ahora" con fecha retroactiva.
   - O marcar "✕ No recogí" si ya no tiene sentido.

**Resultado esperado:** ✅ El sistema detecta la inacción y permite corregir sin perder el registro.

---

## Escenario 10: Discrepancia MUY grande (>5 L)

**Precondiciones:** Juan registra 17 L. Carlos marca "Recogido: 5 L" (registró mal o fraude).

**Pasos:**
1. Carlos POST `/api/v1/registros/{id}/carlos-reco gio` con `litrosCarlos = 5`.
2. Backend evalúa: diferencia = `|17 - 5| = 12 L`. **Discrepancia crítica**.
3. Verificar:
   - Estado = `RECOGIDO_DISCREPANCIA`.
   - Push a Juan normal.
   - **Push adicional al admin**: "Discrepancia crítica: cliente X, lechero Y, diferencia 12 L. Investigar."
4. Admin ve la alerta en la web.
5. Admin puede:
   - Contactar a Carlos y Juan.
   - Ver el patrón histórico (¿Carlos tiene muchas discrepancias grandes?).

**Resultado esperado:** ✅ El admin es notificado de discrepancias críticas que pueden indicar fraude o error sistemático.

---

## Escenario 11: Carlos rechaza firma del vendedor

**Precondiciones:** Juan confirmó con huella digital.

**Pasos:**
1. Juan POST `/api/v1/registros/{id}/confirmar-cliente` con `metodoFirma = BIOMETRIA_DACTILAR`, `litrosCliente = 17`.
2. Backend acepta.
3. Carlos ve en su app "Juan confirmó con huella hace 5 min".
4. Carlos NO tiene acción; el registro está cerrado para ambos.

**Resultado esperado:** ✅ El sistema no permite que Carlos "rechace" la confirmación de Juan (cada uno firma su lado; la auditoría queda registrada).

---

## Escenario 12: Empleado del lechero registra en nombre de Carlos

**Precondiciones:** Carlos tiene un empleado activo. El empleado va en lugar de Carlos.

**Pasos:**
1. Carlos en la app selecciona "Empleado 1" antes de salir a la ruta (ver `../../reglas-negocio/empleado-lechero.md`).
2. Empleado registra con la app de Carlos (Carlos le da acceso temporal o usa el teléfono de Carlos).
3. POST `/api/v1/registros/{id}/carlos-reco gio` con header `X-Acting-As: empleadoId`.
4. Backend valida que el empleado pertenece a Carlos y guarda `registradoPor = EMPLEADO`, `registradoPorId = empleadoId`.
5. Auditoría completa.

**Resultado esperado:** ✅ El sistema distingue Carlos vs empleado para auditoría, sin requerir login separado para el empleado en MVP.

---

## Escenario 13: Vendedor con smartphone sin biometría

**Precondiciones:** Juan tiene un Android gama baja sin sensor de huella.

**Pasos:**
1. Juan registra la primera vez y configura firma con PIN (única opción).
2. PIN se guarda en `flutter_secure_storage`.
3. Cada confirmación usa PIN en lugar de huella.
4. Backend acepta cualquier método válido.

**Resultado esperado:** ✅ El sistema degrada gracefully a PIN cuando no hay biometría.

---

## Escenario 14: Múltiples dispositivos (Carlos tiene celular y tablet)

**Precondiciones:** Carlos usa celular en la moto y tablet en casa.

**Pasos:**
1. Carlos registra en el celular a las 06:10.
2. Carlos abre la tablet a las 19:00, ve la lista "Para sacar cuentas hoy".
3. Tablet tiene su propio FCM token (registrado en backend).
4. Carlos cierra un contrato desde la tablet → POST `/api/v1/liquidaciones`.
5. Verificar: la operación se procesa normalmente. Backend no distingue dispositivo, solo `userId`.
6. El celular recibe push del cierre.

**Resultado esperado:** ✅ Funciona multi-device sin lógica especial.

---

## Escenario 15: Crash de la app del lechero durante sync

**Precondiciones:** Carlos está sincronizando 8 operaciones del outbox.

**Pasos:**
1. Carlos abre app, sync inicia.
2. Operación 3 de 8 se procesa OK.
3. Carlos mata la app (botón home + swipe).
4. Operaciones 4-8 quedan en outbox con `status = 'syncing'`.
5. Carlos reabre app → sync retoma desde donde quedó.
6. Verificar: operaciones 4-8 se procesan. Backend las trata como duplicadas si ya se procesaron (idempotencia), o las procesa si no.

**Resultado esperado:** ✅ Crash recovery funciona. No se pierden datos ni se duplican.

---

## Matriz de cobertura

| Escenario | Cubierto | Notas |
|---|---|---|
| 1. Caso A online | ✅ | Camino feliz |
| 2. Caso A.b discrepancia | ✅ | Resuelto en el momento |
| 3. Caso B confirma después | ✅ | 24 h funciona |
| 4. Caso B vence | ✅ | Crontab ejecuta |
| 5. Carlos offline | ✅ | Sync al recuperar |
| 6. Ambos offline | ✅ | Backend mergea |
| 7. OCC | ✅ | 409 manejado |
| 8. Edición post-cierre | ✅ | Disputa |
| 9. Carlos inactivo | ✅ | Cron detecta |
| 10. Discrepancia crítica | ✅ | Admin notificado |
| 11. Rechazo de firma | ⏸ | No aplica |
| 12. Empleado | ✅ | MVP sin login empleado |
| 13. Sin biometría | ✅ | Degrada a PIN |
| 14. Multi-device | ✅ | Funciona sin cambios |
| 15. Crash recovery | ✅ | Outbox + idempotencia |

---

## Métricas de éxito del flujo v3

- **% de registros con estado final `RECOGIDO_COINCIDE` (firmado por ambos):** target > 85%.
- **% de registros en `RECOGIDO_DISCREPANCIA`:** target < 10%.
- **% de casos B (`RECOGIDO_SIN_CONFIRMAR`):** target < 20%.
- **% de discrepancias críticas (>5 L)**: target < 1%.
- **Tiempo medio desde que Carlos marca "✓ recogido" hasta Juan confirma con firma:** target < 4 horas.

---

## Próximos pasos

1. Convertir cada escenario en un test automatizado (`*.e2e.spec.ts` o `*.test.dart`).
2. Integrar en el pipeline CI/CD.
3. Correr semanalmente contra staging antes de releases a producción.
4. Crear un dashboard de métricas para visualizar las tasas de éxito por estado.