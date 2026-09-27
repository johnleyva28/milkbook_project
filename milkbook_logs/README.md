# milkbook_logs

Configs del stack de observabilidad: Loki (almacén de logs), Promtail (agente que los recoge) y Grafana (visualización con datasource auto-aprovisionada).

## Contenido

```
milkbook_logs/
├── loki/
│   └── config.yml                 # Loki single-binary, schema v13 TSDB, retention 30d
├── promtail/
│   └── config.yml                 # Promtail con docker_sd_configs filtrado por label
├── grafana/
│   └── provisioning/
│       └── datasources/
│           └── loki.yml           # datasource Loki auto-configurada en Grafana
└── README.md
```

Todo el contenido se bind-mounta read-only a los contenedores (`/etc/loki`, `/etc/promtail`, `/etc/grafana/provisioning`). Los **datos** runtime de Loki y Grafana viven en volúmenes Docker nombrados (`loki_data`, `grafana_data`) — no se commitean.

## Servicios

| Servicio | Imagen | Puerto (host) | Volumen de datos | Healthcheck |
|---|---|---|---|---|
| Loki | `grafana/loki:2.9.10` | `${LOKI_PORT:-3100}` | `loki_data:/loki` | `GET /ready` |
| Promtail | `grafana/promtail:2.9.10` | (no expone) | (stateless) | `GET /ready` |
| Grafana | `grafana/grafana:11.6.16` | `${GRAFANA_PORT:-3001}` | `grafana_data:/var/lib/grafana` | `GET /api/health` |

## Flujo de logs

```
[contenedor backend/frontend/etc.] ──stdout JSON──> Docker daemon
                                                          │
                                                          ▼
                                          [Promtail, lee via Docker socket]
                                                          │ filtra label=logging=promtail
                                                          ▼
                                                     [Loki :3100]
                                                          │
                                                          ▼
                                          [Grafana datasource Loki]
                                                          │
                                                          ▼
                                              http://localhost:3001
```

**Filtro clave**: Promtail solo scrapea contenedores con label `logging=promtail`. Esto está en `docker-compose.yml` y evita tragar logs del sistema o de sidecars no deseados.

## Configuración

### Loki (`loki/config.yml`)

- **Modo**: single-binary (no distributed). Adecuado para dev. Migrar a scalable cuando crezca.
- **Schema**: v13 TSDB (más eficiente que el clásico boltdb-shipper).
- **Retention**: 30 días (`retention_period: 744h`), compactor con `retention_enabled: true`.
- **Usuario**: corre como `root` (`user: "0:0"`) para evitar fricción de permisos con el volumen `loki_data`. En prod: usuario no-root + permisos pre-creados (deuda).

### Promtail (`promtail/config.yml`)

- Descubrimiento de contenedores vía `docker_sd_configs` con `refresh_interval: 5s`.
- Filtro: `filters: [{name: label, values: ["logging=promtail"]}]`.
- Relabel rules para extraer `container`, `service`, `stream`.
- Push a `http://loki:3100/loki/api/v1/push` (red interna de Docker).

### Grafana (`grafana/provisioning/datasources/loki.yml`)

- Datasource Loki auto-aprovisionada al arrancar Grafana (`provisioning/datasources/`).
- UID `loki`, URL `http://loki:3100`.
- `editable: false` para que devs no rompan la config compartida.

## Dashboards

Aún no hay dashboards provisionados. Crearlos desde la UI:
1. Ir a http://localhost:3001 (admin / changeme).
2. Dashboards → New → New dashboard.
3. Panel de ejemplo: query `{service="backend"} | json | level="error"`, visualization "Logs".
4. Guardar y (cuando esté estable) exportar el JSON a `milkbook_logs/grafana/provisioning/dashboards/<nombre>.yml` para provisionarlo automáticamente.

## Queries útiles en Grafana → Explore → Loki

| Query | Qué muestra |
|---|---|
| `{service="backend"}` | Todos los logs del backend. |
| `{service="backend"} \| json \| level="error"` | Solo errores del backend parseados como JSON. |
| `{container=~".+"} \| json \| statusCode=500` | Cualquier contenedor con respuesta HTTP 500. |
| `{service="migrate"}` | Output del job de migración de Prisma. |

## Agregar un servicio nuevo al pipeline

Solo agregar el label en `docker-compose.yml`:

```yaml
nuevo_servicio:
  image: ...
  labels:
    - "logging=promtail"   # ← requerido
```

Promtail lo descubre en ≤ 5 segundos y empieza a enviar logs a Loki automáticamente. Grafana los ve sin config adicional.
