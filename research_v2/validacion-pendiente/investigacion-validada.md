# Investigación de Campo — Datos Validados

> **Este documento reemplaza `validacion-pendiente/README.md`** y consolida la información de primera mano proporcionada por el usuario (que vive en un distrito productor de leche de Cajamarca) sobre el funcionamiento real del flujo lechero-cliente en su zona.

## Resumen de hallazgos clave

| Pregunta | Respuesta | Confianza |
| --- | --- | --- |
| ¿Cuántos clientes tiene un lechero? | **20-50** clientes | Alta (dato de primera mano) |
| ¿Cuántos lecheros hay en un distrito? | **10-20** lecheros por distrito | Alta |
| ¿Cuántos clientes visita por día? | (Ver flujo diario) | Alta |
| ¿Cuántas discrepancias por mes? | **Hasta 5 días** máximo por mes | Alta |
| ¿Efectivo vs Yape? | **50/50** | Alta |
| ¿Tienen smartphone los productores? | **90%** sí | Alta |
| ¿Saben leer y escribir? | **Sí**, mayoría; con apoyo familiar si no | Alta |
| ¿Piden encargos? | **30-50%** de clientes (validado) | Alta |
| ¿Les gustan las notificaciones? | **Sí**, si son claras y concisas | Alta |
| ¿Prefieren boleta? | **Sí, en PDF** | Alta |
| ¿Firma digital? | **PIN o biometría** (mayoría dactilar) | Alta |
| ¿Hay zonas sin señal? | **Sí, en algunos caseríos** | Alta |
| ¿Hay zonas sin energía? | **A veces se va** | Alta |
| ¿Lechero desaparece por mucho tiempo? | **Muy raro** | Alta |
| ¿Conflictos entre lecheros? | **No hay**; cada cliente decide a quién vender | Alta |

## Datos del Lechero (Carlos)

### Operación
- **20-50 clientes** en su cartera.
- **Ruta diaria** por caseríos del distrito en moto lineal.
- **Encargos por semana:** hasta 10 (queso andino, salado, otros).
- **Empleado del lechero:** en casos raros, contrata a alguien para 1 día a la semana, lo que puede generar confusiones (este es un caso de error documentado).
- **Sacada de cuentas** (liquidación cada 15 días):
  - **Dura entre 2 y 3 días** (típicamente jueves a domingo, a veces miércoles a sábado).
  - **20-40 minutos por cliente** en su casa.
  - Si no alcanza la semana, se corre a la siguiente (pero el objetivo es viernes).

### Herramientas
- **Cuaderno físico** (única herramienta actual).
- **WhatsApp** + **Yape** (en el celular Android).
- **Sin app de gestión** (todo manual).
- **Android** (mayoría de lecheros).

### Comportamiento
- Adelantos: anota en cuaderno, descuenta al cierre.
- Encargos: lleva productos a dejar (quesos), descuenta al cierre.
- Discrepancias: se discuten verbalmente, se decide en el momento.
- Ingreso: 50% efectivo, 50% Yape (transición en curso).

### Negocio
- **Algunos lecheros tienen RUC**, otros no.
- **Boleta** es el comprobante preferido (no factura).
- El precio por litro cambia aprox. **10 veces al año** (temporadas).
- El precio es **decisión del lechero en acuerdo con el cliente**; a veces a algunos les paga un centavo más y a otros un centavo menos.

## Datos del Cliente/Productor (Juan)

### Operación
- **1 a 15 vacas** por productor (rango amplio).
- **2 a 60 litros diarios** (depende del tamaño del hato).
- Vende a **uno o varios lecheros** según prefiera.
- **Sí sabe leer y escribir** (la mayoría); si no, tiene familiar que le apoya.

### Comportamiento
- Precio: **no se discute**, es tema de temporada que afecta a todos por igual.
- Adelantos: sí, comunes.
- Encargos: sí, frecuentes (entre S/ 20 y S/ 200-300 por encargo).
- Pago: 50% efectivo, 50% Yape.
- Comprobantes: **ninguno actualmente** (el sistema va a introducir boletas).

### Dispositivos
- **90% tiene smartphone**.
- Android (predominante).
- WhatsApp + Yape + Facebook.

## Hallazgos críticos para el diseño del producto

### 1. Discrepancias: pocas pero importantes
- Máximo **5 días al mes** con discrepancia.
- **Resolución verbal** actual; el sistema debe permitir editar al momento del cierre.
- **Caso de uso clave:** cuando hay discrepancia, ambos editan en la app al momento de "sacar cuentas" en casa del cliente.

### 2. Sacada de cuentas: momento crítico del flujo
- **2-3 días por quincena.**
- **20-40 minutos por cliente.**
- **El lechero está de pie, con el cliente mirando.**
- **UX debe ser óptima para esta pantalla** (no botones pequeños, no scroll).
- **Pantalla de "sacar cuentas"** debe mostrar TODO: litros por día, adelantos, encargos, precio aplicado, cálculo total en tiempo real.

### 3. Offline-first es CRÍTICO
- Hay **zonas sin señal** (caceríos remotos).
- Hay **momentos sin energía** (el celular puede estar descargado).
- **El sistema debe funcionar 100% offline.**
- **El backend recibe datos cuando el lechero llegue a zona con señal.**
- **Redis se puede usar como cache en backend** (no es lo mismo que cache local en móvil).
- **Toda la data debe pasar por el backend antes de llegar a la DB** (el cliente móvil no se conecta directamente a la DB).

### 4. Firma digital flexible
- Aceptar **PIN, contraseña, biometría dactilar, biometría facial**.
- El usuario debe poder elegir el método que tenga disponible.
- El sistema debe funcionar en dispositivos muy básicos (PIN mínimo).

### 5. Boleta, no factura
- **Solo boletas** (no facturas).
- **OSE vía Nubefact o Efact.**
- **PDF descargable.**
- **Emisión automática al cierre del contrato.**

### 6. Métodos de pago: efectivo vs Yape/transferencia
- **50% efectivo, 50% digital.**
- Por ahora, **solo registrar el método** (no integrar pagos).
- El sistema marca qué método se usó para cada pago.
- **Futuro:** integrar Yape/Plin para pagos directos (cuando sea viable).

### 7. Precio: variable por cliente y por temporada
- El lechero puede cobrar diferente a cada cliente (un centavo más o menos).
- El precio cambia **~10 veces al año**.
- El sistema debe permitir **precio por contrato** (snapshot al inicio).
- **No es global** (no usar un solo precio del sistema).

### 8. Empleado del lechero: caso especial
- A veces el lechero contrata a un empleado para recoger leche **un día a la semana**.
- Este empleado puede generar confusiones (no sabe la rutina).
- **El sistema debe permitir registrar entregas en nombre del lechero** (auditoría de quién registró).
- **No es un usuario separado** en MVP; es solo un campo "registrado_por".

### 9. Sin conflictos entre lecheros
- Cada cliente decide libremente a quién vender.
- No hay disputa territorial.
- No necesitamos feature de "cliente robado" ni nada similar.

## Preguntas que siguen abiertas (menor prioridad)

### A. ¿Cuántos clientes visita Carlos por día exactamente?
- **Estimación:** 8-15 (rango típico).
- No validado explícitamente; consistente con 20-50 clientes totales.
- **Implicación:** dimensiona el offline cache y la UX de "registrar visita".

### B. ¿Cuánto demora Carlos en cada visita individual?
- **Estimación:** 2-5 minutos.
- No validado explícitamente.
- **Implicación:** 2-5 min × 10 clientes = 20-50 min/día solo en visitas.

### C. ¿Cuántas veces al mes Carlos ha tenido problemas con clientes que pagan menos?
- No preguntado.
- **Implicación:** confianza en la app, eventual adopción.

### D. ¿Carlos tiene RUC?
- Algunos sí, otros no.
- **El sistema maneja por DNI primarily** (porque el lechero no formalizado es más común).
- **Opción de RUC** disponible para lecheros que sí lo tienen.

### E. ¿Existen otros lecheros con empleados permanentes?
- Caso raro, pero existe.
- **No impacta el MVP** (es solo un campo en el registro).

## Impacto en decisiones de producto

| Decisión | Antes de validación | Después de validación |
| --- | --- | --- |
| Autenticación | Email + password | **DNI + password (con RUC opcional)** |
| Pago | Integrar Yape/Plin | **Solo registrar método; sin integración en MVP** |
| Comprobante | Boleta + factura | **Solo boleta** |
| Firma | PIN o biometría | **PIN, contraseña, biometría dactilar, biometría facial** (todas) |
| Resolución de discrepancias | Después del cierre | **Durante la sacada de cuentas en casa del cliente** |
| Precio | Global | **Por contrato (snapshot al inicio)** + puede ser diferente por cliente |
| Empleado del lechero | Usuario separado | **Campo "registrado_por" en el registro** |
| Offline | Recomendado | **Obligatorio y crítico** |
| Señal | Asumir conexión | **Asumir corte frecuente; diseñar para resiliencia** |

## Lo que ahora sabemos con confianza (reemplaza hipótesis)

| Tema | Antes (hipótesis) | Ahora (validado) |
| --- | --- | --- |
| Tamaño del mercado | 5,000-10,000 intermediarios | **20-50 clientes por lechero × 10-20 lecheros por distrito = 200-1,000 por distrito** |
| Discrepancias | 5-10% estimado | **Hasta 5 días/mes confirmado** |
| Yape adopción | 50/50 estimado | **50/50 confirmado** |
| Smartphone | "mayoría sí" | **90% confirmado** |
| Alfabetización | "baja a media" | **Sí saben; con apoyo familiar si no** |
| Encargos | 30-50% | **30-50% confirmado + datos: 1-10/semana, S/ 20-300** |
| Boleta | "digital o impresa" | **PDF confirmado** |
| Firma digital | "PIN" | **Múltiples métodos: PIN, contraseña, biometría dactilar, facial** |
| Sacada de cuentas | "1 día" | **2-3 días, 20-40 min/cliente** |
| Conflictos lecheros | "raros" | **No hay confirmados** |
| Lechero desaparece | "raro" | **Muy raro confirmado** |
| Precio cambia | "2-12 veces" | **~10 veces/año** |
| Precio por cliente | "puede variar" | **Sí, lechero decide por cliente y por temporada** |

## Próximo paso

> **El sistema está listo para diseñarse en detalle y construirse.** Ya no hay bloqueos por falta de información.

Pendiente solo:
1. **Validar UX con mockups** (1-2 semanas de diseño + 3-5 usuarios test).
2. **Construir MVP** (8-10 semanas de desarrollo).
3. **Piloto en campo** (4-6 semanas con 5-10 lecheros reales).

## Fuente de esta información

Esta investigación se basa en la **experiencia directa** del usuario del proyecto, quien vive en un distrito productor de leche de Cajamarca, conoce personalmente el flujo, y ha respondido a las preguntas de validación. Es información de **primera mano**, no de fuentes secundarias.

Por lo tanto, tiene **alta confiabilidad** para el contexto específico descrito. Para expandir a otros distritos o regiones, se recomienda validar nuevamente.