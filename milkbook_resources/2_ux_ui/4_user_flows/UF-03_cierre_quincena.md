# UF-03: Cierre de Quincena (Sacar Cuentas)

> ⭐ **EL SEGUNDO FLUJO MÁS IMPORTANTE.** Ocurre cada 15 días, dura 2-3 días, involucra a Carlos y Juan cara a cara. Es donde se demuestra el valor real de la app (20-40 min → 5-10 min).

## Resumen

Carlos y Juan se juntan en la casa de Juan (o donde sea) para cerrar la quincena. La app calcula todo automáticamente: litros, adelantos, encargos, total. Ambos firman con PIN. Se genera boleta electrónica con OSE/SUNAT.

## Actores

- **Carlos** (LECHERO_OWNER) — quien ejecuta el cierre
- **Juan** (CLIENT_OWNER) — quien firma la confirmación
- **Sistema** — calcula, genera boleta vía Nubefact/OSE

## Precondiciones

- ✅ Contrato activo (no vencido hace más de 7 días).
- ✅ Todos los registros del período tienen estado != PENDIENTE_VENCIDO.
- ✅ Carlos tiene app abierta con sesión activa.
- ✅ Conexión a internet (para generar boleta, aunque se puede reintentar).

## Happy Path

```
INICIO DEL CIERRE
┌────────────────────────────────────┐
│ 1. Carlos abre la app.               │
│ 2. Tap en "Quincena" del bottom nav.│
│ 3. Ve lista de contratos.            │
│ 4. Tap en "Cerrar" del contrato de   │
│    Juan. → WF-L-06                  │
│ 5. Pantalla muestra resumen de       │
│    registros del período.            │
└────────────────────────────────────┘
                ↓
REVISIÓN DE REGISTROS
┌────────────────────────────────────┐
│ 6. Carlos revisa los 15 registros.   │
│ 7. Si hay discrepancias:            │
│    a) Tap en fila de discrepancia    │
│    b) Modal abre: "Carlos X L /     │
│       Juan Y L. ¿Cuántos?"          │
│    c) Resolver (botones quick o      │
│       manual)                       │
│ 8. Si no hay discrepancias, sigue.  │
│ 9. Carlos verifica adelantos.        │
│ 10. Si hay adelantos pendientes de   │
│     confirmar por Juan:              │
│    a) Tap para confirmar manualmente │
│    b) Juan firma con PIN ahora       │
└────────────────────────────────────┘
                ↓
CÁLCULO AUTOMÁTICO
┌────────────────────────────────────┐
│ 11. Sistema calcula en tiempo real:  │
│     - Total litros (post-discrep.)  │
│     - Subtotal                       │
│     - - Adelantos                    │
│     - - Encargos                     │
│     = TOTAL A PAGAR                  │
│ 12. Carlos revisa el cálculo.        │
│ 13. Carlos selecciona forma de pago: │
│     - Todo efectivo                  │
│     - Todo Yape                      │
│     - Mixto (efectivo + Yape + transf.)│
└────────────────────────────────────┘
                ↓
FIRMA DIGITAL (ambos lados)
┌────────────────────────────────────┐
│ 14. Carlos firma con PIN.            │
│ 15. Sistema marca "esperando firma   │
│     de Juan" y envía push.           │
│ 16. Juan recibe push en su app.      │
│ 17. Juan abre WF-C-06 (Liquidación). │
│ 18. Juan revisa el cálculo (mismo    │
│     que vio Carlos).                 │
│ 19. Juan firma con PIN.              │
│ 20. Sistema cierra el contrato.      │
└────────────────────────────────────┘
                ↓
GENERACIÓN DE BOLETA
┌────────────────────────────────────┐
│ 21. Sistema genera boleta vía        │
│     Nubefact + OSE/SUNAT.            │
│ 22. PDF generado (1-3 seg).          │
│ 23. PDF enviado a email de Juan.     │
│ 24. PDF enviado a email de Carlos.   │
│ 25. Sistema marca liquidación como   │
│     CONFIRMADA + LIQUIDADA.          │
└────────────────────────────────────┘
                ↓
CIERRE COMPLETO
┌────────────────────────────────────┐
│ 26. Carlos ve "✓ Contrato cerrado   │
│     con éxito" en su app.            │
│ 27. Sistema crea nuevo contrato      │
│     auto-renovado (siguiente         │
│     quincena).                      │
│ 28. Carlos puede:                    │
│     - Ver boleta PDF                 │
│     - Compartir por WhatsApp         │
│     - Volver al inicio               │
└────────────────────────────────────┘
                ↓
        FIN DEL FLUJO (tiempo total: 5-10 min)
```

## Edge Cases

### EC-3.1: Hay adelantos pendientes que Juan no confirma

```
... en el paso 10 ...
10'. Carlos ve "1 adelanto sin confirmar de Juan (S/ 80)".
11'. Carlos pregunta: "¿Deseas continuar sin confirmarlo?"
12'. Carlos elige:
      a) Sí, continuar → el adelanto queda PENDIENTE_FIRMA_JUAN
         (se descuenta del total, pero Juan puede reclamar después)
      b) No, esperar → se cancela el cierre hasta que Juan confirme
13'. Si eligió a, se documenta en audit log
```

### EC-3.2: Hay discrepancias no resueltas

```
... en el paso 7 ...
7'. Carlos ve "3 discrepancias sin resolver".
8'. Sistema avisa: "¿Deseas cerrar usando el valor del lechero para las discrepancias?"
9'. Carlos elige:
      a) Sí, usar valor de Carlos → se cierra con observación
      b) No, resolver primero → no puede cerrar hasta resolverlas
10'. Si eligió a, Juan ve "3 días con discrepancia no resuelta. Se usó el valor del lechero."
```

### EC-3.3: El cálculo da negativo

```
... en el paso 11 ...
11''. Total = S/ 431.25 - S/ 530 (adelantos) - S/ 30 (encargos) = S/ -128.75
12''. Sistema avisa: "⚠ El total a pagar es S/ -128.75. Esto puede pasar si Juan recibió muchos adelantos."
13''. Carlos confirma o ajusta:
      a) Confirmar S/ -128.75 (Juan le debe a Carlos, queda como saldo a favor)
      b) Ajustar (revisar adelantos)
```

### EC-3.4: Nubefact está caído

```
... en el paso 21 ...
21''. Nubefact no responde. Sistema reintenta 3 veces con backoff.
22''. Si tras 3 reintentos sigue caído:
       a) Sistema guarda la liquidación como CONFIRMADA pero boleta como PENDIENTE_GENERAR
       b) Sistema avisa a Carlos: "La liquidación se cerró pero la boleta se generará cuando Nubefact responda"
       c) Sistema reintenta en background cada 5 minutos
23''. Cuando Nubefact responde:
       a) Se genera la boleta
       b) Juan y Carlos reciben push con el PDF
```

### EC-3.5: Juan no tiene internet

```
... en el paso 17 ...
17''. Juan abre la app pero está sin señal.
18''. Juan puede ver el cálculo (cargado de antes).
19''. Juan firma con PIN → la firma se guarda local.
20''. Cuando Juan recupera señal, se sincroniza.
21''. Si pasan 24h sin sync, sistema alerta a Carlos y a admin.
```

### EC-3.6: Juan no está presente

```
... en el paso 16 ...
16''. Carlos está solo (Juan no vino a la cita).
17''. Carlos puede:
      a) Cerrar sin firma de Juan (con observación, Juan confirma después)
      b) Posponer el cierre (esperar a Juan)
      c) Llamar a Juan por teléfono, explicarle, y confirmar por SMS
         (futuro: integración WhatsApp Business)
18''. Si eligió a, Juan recibe push "Carlos cerró la quincena, revisa y firma"
```

### EC-3.7: Hay una disputa activa de días pasados

```
... en cualquier momento ...
7'''. Sistema detecta: "Tienes 1 disputa abierta con Juan (por discrepancia del 18 sept)".
8'''. Sistema avisa: "Recomendamos resolver la disputa antes de cerrar la quincena".
9'''. Carlos decide:
      a) Resolver primero (ir a UF-06)
      b) Continuar y resolver después (con observación en la liquidación)
```

## Errores y Recuperación

| Error | Detección | Recuperación |
|---|---|---|
| Carlos no puede generar boleta (Nubefact down) | API call timeout | Reintento + boleta pendiente |
| Juan no confirma dentro de 24h | Cron en backend | Liquidación se cierra con valor Carlos + alerta |
| Nubefact rechaza la boleta (RUC inválido) | API response 400 | Carlos corrige RUC + reintentar |
| Carlos pierde conexión a media firma | Frontend detecta | Guardar local + sync al reconectar |
| Disputa abierta + intento de cierre | Frontend valida | Bloquear cierre + mostrar disputa |

## Métricas de éxito

| Métrica | Meta | Cómo medir |
|---|---|---|
| **Tiempo medio de cierre** | < 10 min/cliente | Cronómetro (vs 20-40 min sin app) |
| **% cierres exitosos (con boleta)** | > 95% | Telemetry |
| **% de discrepancias resueltas en momento** | > 80% | Telemetry |
| **% de adelantos confirmados digitalmente** | > 70% | Telemetry |
| **% de boletas aceptadas por SUNAT** | > 99% | API Nubefact response |
| **% de cierres con Juan presente** | > 70% | Audit log |
| **Tasa de disputes generadas en el cierre** | < 5% | Telemetry |
| **% cierres con generación de boleta en <5 seg** | > 80% | Performance metric |

## Conexiones

- **Wireframes:** WF-L-06 (Carlos), WF-L-07 (cierre y boleta), WF-C-06 (Juan)
- **Mockups:** `app_lechero_cerrar_contrato.html`
- **Prototipo:** `prototipo_sacar_cuentas.html`
- **Edge case discrepancia:** UF-06
- **Sub-flujos:** UF-04 (adelantos), UF-05 (encargos)
- **Sync:** UF-07 (offline)

## Versión
1.0 — 2026-09-07 — Documento inicial basado en `sacar-cuentas.md` validado.
