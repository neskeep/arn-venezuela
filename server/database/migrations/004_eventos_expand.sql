-- 004_eventos_expand.sql
-- Add richer content fields to eventos for fullscreen display

ALTER TABLE eventos ADD COLUMN tagline TEXT;
ALTER TABLE eventos ADD COLUMN asistentes INTEGER;
ALTER TABLE eventos ADD COLUMN highlights TEXT; -- JSON array of strings

UPDATE eventos SET
  tagline = 'Conexión · Propósito · Activación',
  asistentes = 120,
  highlights = '["Líderes de 8 ciudades reunidos","Talleres de activación de propósito","Primera red de vectores de cambio"]'
WHERE id = 1;

UPDATE eventos SET
  tagline = 'Expansión · Comunidad · Visión',
  asistentes = 350,
  highlights = '["15 ciudades conectadas en simultáneo","Paneles con referentes nacionales","Lanzamiento del programa de mentorías"]'
WHERE id = 2;

UPDATE eventos SET
  tagline = 'Consolidación · Regiones · Esperanza',
  asistentes = 600,
  highlights = '["Alcance en 4 nuevas regiones","Alianzas estratégicas con fundaciones","Formación de 50 vectores comunitarios"]'
WHERE id = 3;
