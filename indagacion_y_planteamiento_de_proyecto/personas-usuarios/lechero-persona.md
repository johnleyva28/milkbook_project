# Persona: Carlos — El Lechero (Comprador)

> **Datos validados con el usuario** (información de primera mano de un distrito lechero de Cajamarca).

## Identidad

- **Nombre:** Carlos
- **Edad:** 38 años (estimado)
- **Ubicación:** Distrito rural de Cajamarca (Celendín, Llacanora, Namora, etc.)
- **Educación:** secundaria completa, estudios técnicos en agropecuaria (no siempre)
- **Idioma:** español (algunas palabras en quechua)
- **Estado civil:** casado/a, con familia, hijos en escuela local

## Dispositivos y conectividad

- **Dispositivo principal:** Xiaomi Redmi, Samsung A0X, o similar gama media, **Android 11+**.
- **Conectividad:** 4G en el pueblo, 3G en caseríos, **sin señal en zonas remotas**.
- **Yape/Plin:** instalado, lo usa para recibir pagos de queseros grandes.
- **Experiencia con apps:** WhatsApp fluido, Facebook regular, YouTube a veces.
- **Alfabetización digital:** media — sabe usar smartphone, pero con paciencia limitada.

## Contexto laboral (validado)

- **Cartera:** 20-50 clientes activos.
- **Ruta diaria:** 8-15 clientes visitados por mañana (en moto).
- **Tiempo por visita:** 2-5 minutos (estimado).
- **Vehículo:** moto lineal (símbolo de su trabajo).
- **Producción manejada:** 200-500 L/día comprados.
- **Venta:** a quesero artesanal mediano, ocasionalmente a planta grande.
- **Ingreso mensual:** S/ 2,500-5,000.
- **Riesgos:** lluvia, mantenimiento de moto, calidad de leche, robo ocasional.

## Sacada de cuentas (validado)

- **Frecuencia:** cada 15 días.
- **Duración total:** 2-3 días (típicamente jueves a domingo).
- **Tiempo por cliente:** 20-40 minutos en su casa.
- **Carga total por quincena:** ~15-20 horas solo en sacado de cuentas.
- **Método de resolución de discrepancias:** discusión verbal con edición inmediata (cliente o Carlos ceden según memoria).

## Encargos (validado)

- **Hasta 10 encargos por semana.**
- **Monto:** S/ 20-300 por encargo.
- **Tipo común:** quesos (andino, salado), abarrotes, medicinas, útiles.
- **Dinámica:** Carlos anota, compra en ciudad, entrega en próxima visita, descuenta al cierre.

## Adelantos (validado)

- Anota en cuaderno: "Juan, S/ 300, fecha 2026-09-15".
- Cliente también anota.
- Riesgo: olvidos, malentendidos.
- **Necesidad clara:** registro digital con confirmación del cliente.

## Métodos de pago (validado)

- **50% efectivo, 50% Yape/transferencia** (en transición).
- El lechero cobra al cliente en la sacada de cuentas.
- El sistema debe **registrar el método de pago** de cada transacción.

## Herramientas actuales

- **Cuaderno físico** (su principal herramienta de gestión).
- **WhatsApp** + **Yape** (en Android).
- **Sin app de gestión** (todo manual).
- **Calculadora del celular** para sumar.

## Frustraciones

- **Discrepancias con clientes**: a veces el cliente anota más litros que él. No hay forma de resolver objetivamente.
- **Errores aritméticos**: suma mal, descuenta mal, se pierde plata en cálculos mentales.
- **Olvido de adelantos**: a veces olvida anotar un adelanto que dio, o el cliente lo "olvida".
- **Encargos confusos**: anotar varios encargos pequeños y no saber el total.
- **Sacada de cuentas larga y tediosa**: 15-20 horas por quincena es **demasiado tiempo**.
- **No tiene historial**: si un cliente le reclama "el mes pasado me pagaste menos", no tiene forma de verificar.
- **Sin respaldo ante SUNAT**: si se formalizara, no tendría cómo justificar compras.

## Aspiraciones

- **Reducir el tiempo de sacado de cuentas** drásticamente.
- **Eliminar las discusiones por discrepancias** con evidencia objetiva.
- **Ser visto como un comprador serio y profesional**.
- Crecer su cartera de clientes (de 12 a 20 productores, o más).
- **Tener boletas** que pueda mostrar a sus proveedores y al banco.
- **Acceder a crédito formal** con un historial verificable.

## Comportamiento típico

- **Eficiencia**: optimiza su tiempo. Cada minuto cuenta.
- **Pragmatismo**: si algo no funciona, lo abandona rápido.
- **Confianza**: usa memoria + cuaderno; pocas veces verifica con el cliente.
- **Resistencia al cambio**: si una app le complica la vida, la deja.
- **Necesidad de validación**: quiere ver que el sistema **le ahorra tiempo** desde el día 1.
- **Acepta tecnología**: ya usa Yape, WhatsApp, Facebook. No es tecnofóbico, pero exige valor inmediato.

## Interacción con el producto

### Desde la app móvil (principal)
- **Mañana (6:00-9:00):** registra litros de cada cliente al recoger (rápido, en la moto).
- **Tarde (2:00-7:00):** registra adelantos dados, encargos comprados.
- **Cada 15 días (2-3 días):** cierra contratos, genera liquidaciones, genera boletas. **Esta es la pantalla más importante de toda la app.**
- **Cuando hay discrepancia:** usa el flujo de resolución (in-app, en casa del cliente).
- **Caso especial: empleado**: a veces manda a un empleado. El sistema registra `registrado_por` (Carlos o empleado_1), pero el empleado no es usuario del sistema en MVP.

### Desde la web (ocasional, admin)
- Ve reportes de sus operaciones.
- Gestiona su cartera de clientes.
- Configura precios.
- Ve alertas de clientes nuevos.

## Jobs to be Done

### JTBD-L1 (Crítico)
> "Cuando llego al establo del productor, quiero registrar los litros en menos de 30 segundos sin tipear más de lo necesario, para no retrasar mi ruta."

### JTBD-L2 (Crítico)
> "Cuando un cliente me pide un adelanto, quiero registrarlo con su confirmación inmediata, para que no haya reclamos después."

### JTBD-L3 (Crítico — el más importante)
> "Cuando llega el cierre de quincena en casa del cliente, quiero ver TODO en una sola pantalla: litros por día, adelantos, encargos, precio aplicado, cálculo total. Quiero editar cualquier discrepancia con el cliente mirando, y cerrar el contrato en 5 minutos en lugar de 20-40."

### JTBD-L4 (Alto)
> "Cuando un cliente me encarga algo de la ciudad, quiero registrar el encargo con su descripción y precio estimado, para incluirlo en la liquidación."

### JTBD-L5 (Alto)
> "Cuando hay una discrepancia entre lo que anoté y lo que el cliente dice, quiero resolverla al momento editando ambos valores, sin pelear, para mantener la relación."

### JTBD-L6 (Medio)
> "Cuando quiero ver cómo va mi negocio en el mes, quiero ver gráficos simples de litros comprados, ingresos, adelantos dados, para tomar decisiones."

### JTBD-L7 (Medio)
> "Cuando cambia el precio del litro, quiero actualizarlo para nuevos contratos (los contratos en curso mantienen el precio viejo)."

## Frases típicas que diría

- "Antes tenía un cuaderno, ahora tengo la app."
- "Ya no peleo con los clientes por los litros."
- "Ahora tengo boletas, puedo ir al banco tranquilo."
- "Saqué las cuentas en 10 minutos en vez de 30."
- "Si funciona en mi moto, funciona en cualquier lado."

## Anti-persona (no es nuestro target)

- **Roberto, lechero con pickup y 80 productores**: tiene su propio sistema, ya está digitalizado.
- **Gloria/Nestlé (planta industrial)**: no es nuestro cliente objetivo, tienen ERP propio.
- **Quesero gigante**: tiene varios lecheros empleados, sistema propio.