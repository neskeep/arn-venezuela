# Autenticación — Panel Admin

## Arquitectura

Sistema de autenticación simple para proteger el panel de administración (`/admin/*`). No se requieren múltiples roles ni permisos granulares.

## Flujo

```
1. Admin navega a /admin
2. Si no tiene sesión → redirect a /admin/login
3. Login: email + password → POST /api/auth/login
4. Server valida credenciales (bcrypt compare)
5. Si válido → crear session token (cookie httpOnly)
6. Redirect a /admin/dashboard
7. Cada request a /api/admin/* verifica cookie via server middleware
```

## Implementación

### Cookie de Sesión
- Nombre: `arn-admin-session`
- Tipo: `httpOnly`, `secure` (en prod), `sameSite: strict`
- Valor: Token aleatorio (crypto.randomUUID o similar)
- Expiración: 24 horas
- Almacenamiento server-side: tabla `admin_sessions` o en memoria (Map)

### Tabla `admin_sessions` (opcional)

```sql
CREATE TABLE admin_sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES admin_users(id),
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
```

### Server Middleware

```typescript
// server/middleware/admin-auth.ts
// Aplica solo a rutas /api/admin/**
// Lee cookie → busca sesión → valida expiración → continua o 401
```

### Nuxt Middleware (client)

```typescript
// app/middleware/admin.ts
// Antes de navegar a /admin/* → verificar sesión via /api/auth/me
// Si no autenticado → navigateTo('/admin/login')
```

## Seguridad

- Passwords: bcrypt con salt rounds = 10
- Rate limiting: Considerar implementar en login (5 intentos / 15 min)
- CSRF: Cookie `sameSite: strict` mitiga ataques CSRF básicos
- No almacenar passwords en texto plano ni en logs
- El primer usuario admin se crea via seed/migration

## Notas

- Solo un rol: "admin" (todos los admin pueden hacer todo)
- No hay registro público de admin — se crean manualmente
- Si se necesita multi-user en el futuro, la tabla `admin_users` ya soporta múltiples registros
