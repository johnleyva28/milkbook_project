# Idea B — Facturación y regulación

## Pregunta de investigación

> "¿El sistema podría o debería incluir: Facturas, Boletas, Comprobantes, Liquidaciones, Recibos, Documentos electrónicos, Integración con SUNAT, Requisitos tributarios, Formalización del productor, Formalización del comprador?"

## Marco tributario peruano (verificado)

### Regímenes tributarios en Perú (2026)

| Régimen | Abreviatura | Topes | Comprobantes permitidos | IGV |
| --- | --- | --- | --- | --- |
| **Nuevo RUS (NRUS)** | NRUS | Cat 1: S/5,000/mes · Cat 2: S/8,000/mes · Cat Esp: S/60,000/año (agro) | Boletas de venta, tickets, guías. **NO facturas**. | Exonerado (incluye leche) |
| **Régimen Especial de Renta** | RER | S/525,000/año | Boletas y facturas | Exonerado |
| **Régimen MYPE Tributario** | RMT | Sin tope específico | Todos | 18% |
| **Régimen General** | RG | Sin tope | Todos | 18% |

### Leche fresca y derivados: tratamiento del IGV

> **[HECHO]** La **leche fresca entera, evaporada y pasteurizada** está **exonerada del IGV** según Apéndice I del D.S. 055-99-EF (TUO de la Ley del IGV). Algunos quesos frescos también.

> **[HECHO]** Esta exoneración se prorrogó hasta **31/12/2026**. Después de esa fecha, el Congreso debe decidir si se prorroga o elimina.

### Obligación de facturación electrónica

| Régimen | Obligado a facturación electrónica desde |
| --- | --- |
| Régimen General | 2021-2022 (completado) |
| RMT | 2021-2022 (completado) |
| RER | 2021-2022 (completado) |
| Nuevo RUS | **NO obligado**, puede emitir físicos |
| Nuevos inscritos RG/RMT/RER | Automático desde inscripción en RUC (Proyecto Res. 000062-2026) |
| PRICOS con ingresos >300 UIT | Adicionalmente OBLIGADOS a OSE desde 01/07/2025 |

### Sistemas de emisión SUNAT

| Sistema | Costo | Requisitos | Para quién |
| --- | --- | --- | --- |
| **SEE-SOL** (portal web) | **GRATIS** | Clave SOL | Pequeños contribuyentes, bajo volumen |
| **SEE-Facturador SUNAT** | **GRATIS** (descargable) | Clave SOL, certificado digital opcional | Volumen medio |
| **SEE-Contribuyente** | Variable | Certificado digital obligatorio | Empresas con sistema propio |
| **SEE-OSE** | Tarifa del OSE | Certificado digital | PRICOS >300 UIT |

### Plazo de envío
- **Fecha de emisión + 3 días calendario** para enviar a SUNAT/OSE. Fuera de plazo: pierde validez tributaria.

### Sanciones

| Infracción | Sanción |
| --- | --- |
| No emitir CPE (1ra vez) | 50% UIT (S/ 2,750 con UIT 2026 = S/ 5,500) |
| No emitir CPE (2da vez) | Cierre temporal del local (3 días) |
| Emitir CPE sin requisitos | 25% UIT (S/ 1,375) |
| Subsanación voluntaria sin notificación | Rebaja 90% |

## Implicaciones para nuestro producto

### ¿Qué necesitamos incluir en MVP?

| Feature | MVP / V2 / V3 | Justificación |
| --- | --- | --- |
| Liquidación digital con detalle (PDF) | **MVP** | Reemplaza el "recibo a mano". No requiere integración con SUNAT. |
| Firma simple del productor (PIN o botón OK) | **MVP** | Da validez mínima. |
| Emisión de boleta de venta electrónica vía SEE-SOL | **V2** | Útil para compradores que quieren formalizar; opcional para MVP. |
| Emisión de factura electrónica | **V3** | Solo si el comprador quiere facturar (ej. vende queso a supermercado). |
| Integración con SUNAT/OSE automática | **V3** | Requiere certificado digital y desarrollo significativo. |
| Liquidación con detracción | **V3** | Servicios sujetos a detracción >S/700. |
| Guías de Remisión Electrónicas (GRE) | **V3** | Solo si hay traslado de bienes. |

### ¿El sistema debe ser obligatorio?

> **[INFERENCIA]** El sistema **no debe pretender reemplazar** al sistema tributario. Debe **producir la información** que el usuario necesita (litros, fechas, montos) y permitirle **emitir sus propios comprobantes** vía SUNAT/SEE-SOL si lo desea.

> **Lo más simple:** el sistema emite una **liquidación digital** (documento interno), y **opcionalmente** ofrece al usuario "enviar a SUNAT" con un click.

### ¿Cómo manejar al productor informal?

> **[HECHO]** La mayoría de pequeños productores lácteos **NO están formalizados** (no tienen RUC). Operan en Nuevo RUS o ni siquiera en RUS.

> **[INFERENCIA]** Si exigimos formalización para usar el sistema, **perdemos el mercado**. La solución es:
> 1. **El comprador es el cliente** (formalizado o con RUC activo).
> 2. **El productor no necesita RUC** para aparecer en la liquidación digital como "proveedor".
> 3. **El comprobante oficial** (si se requiere) lo emite el comprador, no el productor.

### Casos específicos

#### Caso 1: Productor informal → Comprador informal → Quesero informal
- **Tipo de transacción:** Sin factura, sin boleta.
- **Riesgo tributario:** Bajo (todos en RUS o no inscritos).
- **Nuestro rol:** Generar liquidación interna con detalle.
- **SUNAT:** No aplicable.

#### Caso 2: Productor informal → Comprador formal → Quesero formal
- **Tipo de transacción:** El comprador formal podría querer factura del productor (no es posible sin RUC), o emitir factura de compra (permitido en algunos regímenes).
- **Nuestro rol:** Permitir al comprador emitir **factura de compra** (es el comprador quien emite, no el productor). Ver Art. 14 del Reglamento Especial Agropecuario.
- **SUNAT:** El comprador necesita Clave SOL + certificado digital si usa SEE-Contribuyente.

#### Caso 3: Productor formal (Nuevo RUS) → Comprador formal
- **Tipo de transacción:** El productor emite boleta de venta (no factura). El comprador recibe la boleta.
- **Nuestro rol:** Generar la boleta y enviarla a SUNAT vía SEE-SOL.
- **SUNAT:** Se puede automatizar con API de SUNAT.

#### Caso 4: Productor formal (RMT/RG) → Comprador formal
- **Tipo de transacción:** Factura electrónica completa.
- **Nuestro rol:** Integración total con SUNAT, OSE, detracciones si aplica, GRE si hay traslado.

## Decisión recomendada para MVP

### Para MVP, hacer solo lo siguiente:

1. **Liquidación digital** (PDF descargable) con detalle: litros × precio = total, fecha, productor, comprador.
2. **Firma simple** del productor (botón "Confirmo" + timestamp + GPS).
3. **Generador de boleta de venta electrónica** vía **integración con un OSE** (operador de servicios electrónicos) autorizado por SUNAT. Por ejemplo: **Nubefact, FacturaYa, Efact, o similar**.
4. **NO integración directa con SUNAT** en MVP (demasiada complejidad regulatoria).
5. **NO factura electrónica** en MVP (suficiente con boletas para transacciones B2C).

### En V2, agregar:

- Integración opcional con SUNAT vía API propia (más complejo).
- Factura electrónica con detracciones y GRE.

### En V3, agregar:

- Integración con ERP de la planta si el comprador es Gloria/Nestlé/Laive.
- Liquidaciones con tipos de cambio (exportación).

## Riesgo regulatorio

> **[INFERENCIA]** El mayor riesgo es **cambios regulatorios**. SUNAT cambia normativa frecuentemente. La exoneración del IGV a la leche vence el 31/12/2026. Si se elimina, **cambia toda la lógica** de precios para los compradores formales.

> **Mitigación:** Arquitectura flexible donde el tratamiento tributario es configurable, no hardcoded.

## Costos regulatorios para el productor

| Concepto | Costo |
| --- | --- |
| RUC | Gratis |
| Clave SOL | Gratis |
| Emitir boleta electrónica vía SEE-SOL | Gratis |
| Emitir factura electrónica vía SEE-SOL | Gratis (pero requiere certificado para > cierto volumen) |
| Contador mensual (si RMT o RG) | S/ 200-500/mes |
| Planilla electrónica PLAME | Gratis (si tiene empleados) |

> **[INFERENCIA]** El costo tributario es bajo para pequeños. La barrera es más **cultural y de alfabetización** que económica.

## Reflexión crítica

> **Nuestra decisión arquitectónica más importante para MVP:**
> - **NO integrar directamente con SUNAT.** Demasiada complejidad regulatoria.
> - **Integrar con un OSE** (operador tercero) que ya tiene la conexión. Cobramos al usuario S/ 1-2 por boleta emitida, que cubre nuestro costo del OSE.
> - **Mantener la opción de NO emitir comprobante oficial** si el usuario es informal. Eso amplía el mercado enormemente.

## Fuentes

| # | Fuente | URL | Tipo |
| --- | --- | --- | --- |
| B27 | DigiFact – Nuevo RUS | https://www.digifactperu.com/que-es-el-rus | Información comercial |
| B28 | TrámitesPerú – Factura electrónica SUNAT | https://tramitesperu.com/sunat/factura-electronica/ | Información comercial |
| B29 | Buk – Tipos de régimen tributario Perú 2026 | https://www.buk.pe/blog/tipos-regimen-tributario-peru | Información comercial |
| B30 | Yo Facturo – Nuevo RUS 2026 | https://yo-facturo.com/blog/nuevo-rus-regimen-unico-simplificado-2026/ | Información comercial |
| B31 | IvaCalculator – Exenciones IGV | https://ivacalculator.com/peru/exenciones-igv/ | Información comercial |
| B32 | FAOLEX – Régimen Especial Agropecuario Costa Rica | https://faolex.fao.org/docs/pdf/cos191428.pdf | Oficial CR (referencia) |
| B33 | Reglamento Especial Agropecuario Costa Rica | https://proleche.com/wp-content/uploads/2022/06/Regimen-Especial-Agropecuario.pdf | Sector privado CR |