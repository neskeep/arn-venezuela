# /backend — Server Routes + SQLite

Pre-carga de contexto antes de cualquier trabajo de backend.

## Leer primero

1. `.claude/context/conventions.md` — Naming, formato API
2. `.claude/context/data-schema.md` — Tablas y estructura
3. `.claude/context/auth-permissions.md` — Autenticación admin

## Reglas

- **TypeScript strict** — Zero `any`, tipos en `shared/types/`
- **Server routes** en `server/api/` con naming: `recurso.method.ts`
- **SQLite** via better-sqlite3 — singleton en `server/database/index.ts`
- **Migraciones** en `server/database/migrations/` — formato `NNN_descripcion.sql`
- **Response format:** `{ data: T }` / `{ data: T[], meta: { total } }`
- **Errores:** H3 `createError({ statusCode, message })`
- **Rutas admin:** Protegidas via server middleware (verificar cookie de sesión)

## Migraciones

- Siempre aditivas (no alterar columnas existentes sin autorización)
- Header con comentario descriptivo
- Probar localmente antes de dar por terminado
- **Actualizar `data-schema.md`** después de cada migración

## Flujo para nueva funcionalidad

1. Definir/verificar tabla en `data-schema.md`
2. Crear migración SQL si es necesaria
3. Definir tipo TypeScript en `shared/types/`
4. Implementar server route(s)
5. Crear composable client-side si es necesario
6. Probar endpoint manualmente o con Playwright

## Agente

Delegar implementación a `nuxt-logic`.
