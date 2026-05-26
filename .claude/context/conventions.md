# Convenciones de Código

## Estructura de Directorios

```
app/
├── pages/              # Rutas (index.vue, admin/*.vue)
├── components/
│   ├── sections/       # Secciones del landing (Hero, Nosotros, etc.)
│   └── ui/             # Componentes reutilizables (Button, Card, etc.)
├── composables/        # Lógica reutilizable (useX)
└── layouts/            # Layouts (default, admin)

server/
├── api/                # Server routes (REST)
│   ├── eventos/
│   ├── aliados/
│   └── junta/
├── database/
│   ├── index.ts        # Conexión SQLite singleton
│   └── migrations/     # SQL migrations (001_init.sql, etc.)
├── middleware/         # Server middleware (auth)
└── utils/              # Utilidades server-side

shared/
└── types/              # TypeScript interfaces compartidas

assets/
├── css/                # Tailwind entry point
└── fonts/              # Agency Regular, Montserrat

public/
└── images/             # Assets estáticos (logo, og-image)
```

## Naming Conventions

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes Vue | PascalCase | `HeroSection.vue`, `AdminLayout.vue` |
| Composables | camelCase + `use` prefix | `useEventos()`, `useAdmin()` |
| Server routes | kebab-case + HTTP suffix | `eventos.get.ts`, `eventos.post.ts` |
| Tablas DB | snake_case | `junta_directiva`, `admin_users` |
| Tipos TS | PascalCase | `Evento`, `Aliado`, `MiembroJunta` |
| CSS classes | Tailwind utilities only | — |
| Archivos de migración | NNN_descripcion.sql | `001_init.sql` |

## API Response Format

```typescript
// Success (single)
{ data: T }

// Success (list)
{ data: T[], meta: { total: number } }

// Error
{ error: { message: string, statusCode: number } }
```

## Error Handling

- Server: H3 `createError({ statusCode, message })`
- Client: try/catch con feedback visual al usuario
- No silenciar errores en consola durante desarrollo

## Commits

- Formato: `type: description` (en inglés)
- Tipos: feat, fix, refactor, style, docs, chore
- Ejemplo: `feat: add hero section with GSAP animations`

## Idioma

- **UI (templates):** Español — Todo texto visible al usuario
- **Código:** Inglés — Variables, funciones, tipos, comentarios técnicos
- **Commits:** Inglés
- **Documentación .claude:** Español
