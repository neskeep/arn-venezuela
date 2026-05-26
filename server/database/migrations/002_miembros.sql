-- 002_miembros.sql
-- Members registration table

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
