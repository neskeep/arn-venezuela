# ARN Venezuela — Website

Website institucional del movimiento ARN Venezuela. Single-page landing con panel admin.

## Stack

Nuxt 4 + Tailwind CSS 4 + SQLite (better-sqlite3) + GSAP + Swiper.js

## Contexto

- [Stack](.claude/context/stack.md) — Framework, dependencias y tooling
- [Convenciones](.claude/context/conventions.md) — Naming, estructura, formato API
- [Data Schema](.claude/context/data-schema.md) — Tablas SQLite
- [Branding](.claude/context/branding.md) — Colores, tipografías, logo, tono
- [Design System](.claude/context/design-system.md) — Componentes, layout, animaciones
- [Auth](.claude/context/auth-permissions.md) — Autenticación panel admin

## Estado

- [Roadmap](.claude/state/roadmap.md) — Fases del proyecto
- [Session](.claude/state/session.md) — Sesión actual

## Reglas No Negociables

1. **Tailwind-only** — No CSS custom salvo variables de fuente. Todo se resuelve con utilidades.
2. **TypeScript strict** — Zero `any`. Tipos en `shared/types/`.
3. **Mobile-first** — Breakpoints: 479px, 767px, 991px. Diseñar desde mobile.
4. **Idioma** — UI en español, código y commits en inglés.
5. **Componentes de sección** — Cada sección del landing en `app/components/sections/`.
6. **Server routes** — API en `server/api/`, formato `{ data: T }`.
7. **Migraciones** — Toda alteración de DB vía archivos en `server/database/migrations/`.
8. **Sin dependencias innecesarias** — Antes de instalar un paquete, verificar si Nuxt/Vue ya lo resuelve.
9. **GSAP para animaciones** — ScrollTrigger para efectos on-scroll. No CSS animations complejas.
10. **Agentes especializados** — Delegar UI a `nuxt-ui`, lógica a `nuxt-logic`.

## Skills Disponibles

| Comando | Propósito |
|---------|-----------|
| `/design` | Workflow completo de UI (diagnosticar → diseñar → implementar → pulir) |
| `/backend` | Server routes, SQLite, migraciones |
| `/fix` | Diagnóstico estructurado de bugs |
| `/review` | QA visual con Playwright MCP |
| `/deploy` | Build y despliegue |

## Agentes

- `project-orchestrator` — Coordinación multi-dominio
- `nuxt-ui` — Componentes, estilos, design system
- `nuxt-logic` — Composables, server routes, stores, validación
- `context-keeper` — Documentación y estado de sesión
