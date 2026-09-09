# 🗺️ 4_user_flows — Flujos detallados de MilkBook

> **Diagramas de flujo + edge cases** para los flujos críticos del producto. Cada archivo documenta un journey completo: happy path, edge cases, errores, y criterios de éxito.

---

## 📂 Archivos

| Archivo | Flujo | Importancia |
|---|---|---|
| [`README.md`](./README.md) | Este archivo (índice) | - |
| [`UF-01_registro_diario_caso_A.md`](./UF-01_registro_diario_caso_A.md) | Registro diario — caso A (ambos lados) | ⭐⭐⭐ |
| [`UF-02_registro_diario_caso_B.md`](./UF-02_registro_diario_caso_B.md) | Registro diario — caso B (solo Carlos) | ⭐⭐⭐ |
| [`UF-03_cierre_quincena.md`](./UF-03_cierre_quincena.md) | Cierre de quincena (sacar cuentas) | ⭐⭐⭐ |
| [`UF-04_adelanto.md`](./UF-04_adelanto.md) | Registrar adelanto (Carlos da, Juan recibe) | ⭐⭐ |
| [`UF-05_encargo.md`](./UF-05_encargo.md) | Ciclo de encargo (pedido → entrega → confirmación) | ⭐⭐ |
| [`UF-06_discrepancia.md`](./UF-06_discrepancia.md) | Resolución de discrepancia (3 caminos posibles) | ⭐⭐⭐ |
| [`UF-07_offline_sync.md`](./UF-07_offline_sync.md) | Flujo offline → online sync | ⭐⭐ |
| [`UF-08_onboarding_primer_uso.md`](./UF-08_onboarding_primer_uso.md) | Onboarding del primer uso | ⭐⭐ |

**Total:** 8 flujos detallados.

---

## 🎯 Cómo se conecta con el resto

Cada flujo referencia:
- **Wireframes:** `../1_wireframes/` con las pantallas específicas
- **Mockups HTML:** `../2_mockups/` con la UI exacta
- **Prototipos:** `../3_prototipos/` con versiones navegables
- **Design system:** `../5_design_system/` con tokens aplicados
- **Auth:** `../6_auth_y_roles/` con permisos de cada rol

---

## 📐 Convenciones de los diagramas

Usamos notación estándar para los flujos:

```
[rectángulo]         = acción del usuario o sistema
(rombo)             = decisión (sí/no)
○ (círculo)         = inicio/fin del flujo
→                   = flujo principal
⇢                   = flujo alternativo
[async]             = operación asíncrona
```

Cada archivo de flujo sigue este formato:

```markdown
# UF-XX: [Nombre]

## Resumen
Vista general del flujo y su importancia.

## Actores
Quiénes participan (Carlos, Juan, sistema, admin).

## Precondiciones
Qué debe estar listo antes de empezar.

## Happy path
El camino principal paso a paso.

## Edge cases
Variantes y situaciones inesperadas.

## Errores y recuperación
Qué pasa cuando algo falla y cómo se recupera.

## Métricas de éxito
KPIs del flujo (tiempo, tasa de éxito, etc.).
```

---

## 🧪 Cómo validar los flujos

1. **Imprimir los diagramas** en papel.
2. **Recorrer el happy path** con Carlos y Juan reales (o simular).
3. **Disparar cada edge case** y verificar que la respuesta del sistema es la esperada.
4. **Medir tiempos** vs las metas definidas.
5. **Iterar** antes de codificar.

---

## 📊 Métricas globales de los flujos

| Flujo | Métrica | Meta |
|---|---|---|
| UF-01 / UF-02 (registro diario) | Tiempo de confirmación | < 30 seg |
| UF-03 (cierre) | Tiempo de cierre | < 10 min/cliente |
| UF-04 (adelanto) | % confirmado en < 1h | > 70% |
| UF-05 (encargo) | % entregado a tiempo | > 80% |
| UF-06 (discrepancia) | % resuelta en momento | > 80% |
| UF-07 (offline sync) | % de registros sin conflicto | > 95% |
| UF-08 (onboarding) | % que completa | > 80% |
