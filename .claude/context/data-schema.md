# Data Schema — SQLite

## Tablas

### `admin_users`

Usuarios con acceso al panel de administración.

```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nombre TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### `eventos`

Eventos pasados y futuros del movimiento.

```sql
CREATE TABLE eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha TEXT NOT NULL,
  imagen_url TEXT,
  ubicacion TEXT,
  estado TEXT NOT NULL DEFAULT 'activo' CHECK(estado IN ('activo', 'pasado', 'proximo')),
  orden INTEGER DEFAULT 0,
  tagline TEXT,
  asistentes INTEGER,
  highlights TEXT,       -- JSON array of strings
  hora TEXT,             -- e.g. "9:00 AM — 5:00 PM"
  galeria TEXT,          -- JSON array of image URLs
  programa TEXT,         -- JSON array of {hora, titulo, descripcion}
  video_url TEXT,        -- YouTube/Vimeo URL
  cta_url TEXT,          -- External registration link
  cta_texto TEXT,        -- CTA button text
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### `aliados`

Organizaciones aliadas (logos para carrusel).

```sql
CREATE TABLE aliados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  orden INTEGER DEFAULT 0,
  activo INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### `junta_directiva`

Miembros de la junta directiva.

```sql
CREATE TABLE junta_directiva (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  cargo TEXT NOT NULL,
  bio TEXT,
  foto_url TEXT,
  orden INTEGER DEFAULT 0,
  activo INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

### `miembros`

Miembros registrados a través del formulario público.

```sql
CREATE TABLE IF NOT EXISTS miembros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT,
  ciudad TEXT NOT NULL,
  profesion TEXT,
  area_interes TEXT NOT NULL CHECK(area_interes IN ('liderazgo', 'educacion', 'salud', 'negocios', 'arte', 'tecnologia', 'otro')),
  mensaje TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK(estado IN ('pendiente', 'activo', 'inactivo')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

## Enums

| Campo | Valores |
|-------|---------|
| eventos.estado | `activo`, `pasado`, `proximo` |
| aliados.activo | `1` (visible), `0` (oculto) |
| junta_directiva.activo | `1` (visible), `0` (oculto) |
| miembros.area_interes | `liderazgo`, `educacion`, `salud`, `negocios`, `arte`, `tecnologia`, `otro` |
| miembros.estado | `pendiente`, `activo`, `inactivo` |

## Storage

- Imágenes se almacenan en `public/uploads/` con subdirectorios por entidad:
  - `public/uploads/eventos/`
  - `public/uploads/aliados/`
  - `public/uploads/junta/`
- Los campos `*_url` almacenan rutas relativas: `/uploads/eventos/nombre-archivo.webp`

## Notas

- SQLite no tiene tipo DATE nativo — se usa TEXT en formato ISO 8601
- El campo `orden` permite al admin reordenar elementos via drag & drop
- `activo` funciona como soft-delete (ocultar sin eliminar)
- Todas las tablas tienen timestamps para auditoría básica
