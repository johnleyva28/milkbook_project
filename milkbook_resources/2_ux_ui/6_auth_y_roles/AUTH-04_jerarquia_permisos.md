# AUTH-04: Jerarquía de Permisos — MilkBook

> **La tabla completa de permisos granulares por recurso y por rol.** Este documento es la fuente de verdad para el middleware de autorización en NestJS.

---

## 🎯 Principio rector

**"Cada usuario solo ve y hace lo mínimo necesario para su rol."**

Esto se llama **principio de menor privilegio** (PoLP). Es crítico en MilkBook porque manejamos datos financieros sensibles.

---

## 📊 Permisos por recurso × rol

### Leyenda

- ✅ = puede hacer la acción
- 👁 = solo lectura
- ✏️ = puede escribir/editar
- ❌ = no tiene acceso
- 🔒 = requiere doble verificación (otro ADMIN o el dueño)

---

### 👤 Usuarios y cuentas

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Crear usuario | ✅ | ✏️ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ver lista de usuarios | ✅ | 👁 | 👁 | 👁 sus empleados | 👁 propio | 👁 sus familiares | ❌ |
| Editar perfil propio | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Editar perfil de otro | ✅ | ✏️ | ❌ | ✏️ sus empleados | ❌ | ✏️ sus familiares | ❌ |
| Eliminar usuario | ✅ | 🔒 | ❌ | 🔒 sus empleados | ❌ | ❌ | ❌ |
| Cambiar rol | ✅ | ✏️ | ❌ | ✏️ (solo añadir empleado) | ❌ | ✏️ (solo añadir familiar) | ❌ |

---

### 👥 Cartera (lecheros ↔ clientes)

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver clientes de un lechero | ✅ | 👁 | 👁 | 👁 sus clientes | 👁 sus clientes | 👁 su lechero | 👁 su lechero |
| Agregar cliente a lechero | ✅ | ✏️ | ❌ | ✏️ | ❌ | ❌ | ❌ |
| Eliminar cliente de cartera | ✅ | 🔒 | ❌ | 🔒 (con liquidación previa) | ❌ | ❌ | ❌ |

---

### 📋 Contratos

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver contrato | ✅ | 👁 | 👁 | 👁 propios | 👁 propios | 👁 propio | 👁 delegado |
| Crear contrato | ✅ | ✏️ | ❌ | ✏️ | ❌ | ❌ | ❌ |
| Modificar precio | ✅ | ✏️ | ❌ | ✏️ (con justificación) | ❌ | ❌ | ❌ |
| Cerrar contrato | ✅ | 🔒 | ❌ | ✏️ | ❌ | 👁 + firma | 👁 + firma |
| Reabrir contrato cerrado | ✅ | 🔒 | ❌ | 🔒 | ❌ | 🔒 | ❌ |
| Auto-renovar | ✅ | ✏️ | ❌ | ✏️ | ❌ | 👁 | 👁 |

---

### 🥛 Registros diarios

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver registro | ✅ | 👁 | 👁 | 👁 | 👁 | 👁 propio | 👁 delegado |
| Crear registro (Carlos) | ✅ | ✏️ | ❌ | ✏️ | ✏️ | ❌ | ❌ |
| Crear registro (Juan) | ✅ | ✏️ | ❌ | ❌ | ❌ | ✏️ propio | ✏️ delegado |
| Confirmar con firma | ✅ | ❌ | ❌ | 👁 + firma | ❌ | ✏️ + firma | ✏️ + firma |
| Marcar "no vendí" | ✅ | ✏️ | ❌ | ✏️ | ✏️ | ✏️ propio | ✏️ delegado |
| Editar registro mismo día | ✅ | ✏️ | ❌ | ✏️ | ✏️ | ✏️ propio | ✏️ delegado |
| Editar registro días después | ✅ | ✏️ | ❌ | ✏️ | ❌ | ✏️ propio | ❌ |

---

### 💰 Adelantos

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver adelantos | ✅ | 👁 | 👁 | 👁 sus adelantos | 👁 sus adelantos | 👁 propios | 👁 delegado |
| Crear adelanto | ✅ | ✏️ | ❌ | ✏️ | ✏️ | 👁 + confirmar | 👁 + confirmar |
| Confirmar recibido (cliente) | ✅ | ❌ | ❌ | 👁 | ❌ | ✏️ | ✏️ |
| Marcar como liquidado | ✅ | ✏️ | ❌ | ✏️ (al cerrar contrato) | ❌ | 👁 | 👁 |

---

### 🛒 Encargos

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver encargos | ✅ | 👁 | 👁 | 👁 sus encargos | 👁 sus encargos | 👁 propios | 👁 delegado |
| Crear encargo (cliente pide) | ✅ | ✏️ | ❌ | ❌ | ❌ | ✏️ propio | ✏️ delegado |
| Marcar entregado (lechero) | ✅ | ✏️ | ❌ | ✏️ | ✏️ | 👁 | 👁 |
| Confirmar recepción (cliente) | ✅ | ❌ | ❌ | 👁 | ❌ | ✏️ | ✏️ |
| Marcar como cobrado | ✅ | ✏️ | ❌ | ✏️ (al cerrar contrato) | ❌ | 👁 | 👁 |

---

### 💵 Liquidaciones y boletas

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver liquidación | ✅ | 👁 | 👁 | 👁 propias | 👁 propios | 👁 propias | 👁 delegado |
| Crear liquidación | ✅ | ✏️ | ❌ | ✏️ | ❌ | ❌ | ❌ |
| Firmar liquidación | ✅ | ❌ | ❌ | ✏️ | ❌ | ✏️ | ✏️ |
| Cerrar liquidación | ✅ | ✏️ | ❌ | ✏️ | ❌ | 👁 + firma | 👁 + firma |
| Generar boleta | ✅ | ✏️ | ❌ | ✏️ (automático al cerrar) | ❌ | ❌ | ❌ |
| Descargar boleta PDF | ✅ | 👁 | 👁 | ✅ | 👁 | ✅ | ✅ |
| Reemitir boleta | ✅ | ✏️ | ❌ | ✏️ | ❌ | ❌ | ❌ |

---

### 💰 Módulo contable

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver estado de cuenta | ✅ | 👁 | 👁 | 👁 sus clientes | 👁 | 👁 propio | 👁 delegado |
| Ver libro mayor | ✅ | 👁 | 👁 | 👁 propio | 👁 parcial | 👁 propio | 👁 delegado |
| Crear movimiento | ✅ | ✏️ | ❌ | ✏️ (vía pantallas) | ✏️ (vía pantallas) | ❌ | ❌ |
| Editar movimiento | ✅ | ✏️ | ❌ | 🔒 (con justificación) | ❌ | ❌ | ❌ |
| Exportar a Excel | ✅ | 👁 | 👁 | ✅ propio | 👁 parcial | ✅ propio | 👁 delegado |
| Exportar a PDF | ✅ | 👁 | 👁 | ✅ propio | 👁 parcial | ✅ propio | ✅ delegado |

---

### 🚨 Disputas

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Ver disputa | ✅ | 👁 | 👁 | 👁 propias | 👁 | 👁 propias | 👁 delegado |
| Abrir disputa | ✅ | ✏️ | ❌ | ✏️ | ❌ | ✏️ | ✏️ |
| Resolver disputa | ✅ | ✏️ | ✏️ | ✏️ (con cliente) | ❌ | ✏️ (con lechero) | ✏️ (con lechero) |
| Cerrar disputa | ✅ | ✏️ | ✏️ | ✏️ | ❌ | 👁 | 👁 |

---

### ⚙️ Configuración y admin

| Acción | SUPER_ADMIN | ADMIN | OPS | LECHERO_OWNER | LECHERO_EMPLEADO | CLIENT_OWNER | CLIENT_FAMILY |
|---|---|---|---|---|---|---|---|
| Configuración global | ✅ | 👁 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Pricing global | ✅ | 👁 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Billing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Auditoría (audit log) | ✅ | 👁 | 👁 | 👁 propios | ❌ | 👁 propios | ❌ |

---

## 🔐 Implementación en NestJS

```typescript
// src/auth/guards/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();

    // user.permissions es calculado por el JwtAuthGuard al autenticar
    const hasPermission = requiredPermissions.every(p => user.permissions?.includes(p));

    if (!hasPermission) {
      throw new ForbiddenException(`Falta permiso: ${requiredPermissions.join(', ')}`);
    }
    return true;
  }
}

// Uso en un controller:
@Controller('liquidaciones')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LiquidacionesController {

  @Get(':id')
  @Permissions('liquidacion:read')
  findOne(@Param('id') id: string) { ... }

  @Post()
  @Permissions('liquidacion:write')
  create(@Body() dto: CreateLiquidacionDto) { ... }

  @Post(':id/cerrar')
  @Permissions('liquidacion:close')
  cerrar(@Param('id') id: string) { ... }
}
```

---

## 📋 Próximos pasos

1. ✅ Matriz de permisos por rol × recurso
2. ✅ Implementación en NestJS documentada
3. ⏸️ Implementar la lógica del guard en el backend
4. ⏸️ Tests unitarios de permisos
5. ⏸️ Tests E2E de los 7 roles
6. ⏸️ Auditoría de seguridad externa

---

## 🔗 Referencias

- Sistema de roles: [`./AUTH-01_sistema_roles.md`](./AUTH-01_sistema_roles.md)
- Auth DNI: [`../../../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/auth-dni.md`](../../../indagacion_y_planteamiento_de_proyecto/decisiones-tecnicas/auth-dni.md)
- Schema: [`../../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md`](../../../indagacion_y_planteamiento_de_proyecto/base-datos/schema-prisma.md)
- NestJS Guards: https://docs.nestjs.com/guards
- OWASP PoLP: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
