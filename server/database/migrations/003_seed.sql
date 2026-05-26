-- 003_seed.sql
-- Seed data for junta_directiva, eventos, aliados (placeholder until real content)

INSERT INTO junta_directiva (nombre, cargo, foto_url, orden, activo) VALUES
  ('Miembro 1', 'Presidente', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', 1, 1),
  ('Miembro 2', 'Vicepresidente', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80', 2, 1),
  ('Miembro 3', 'Secretaria', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80', 3, 1),
  ('Miembro 4', 'Tesorero', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', 4, 1);

INSERT INTO eventos (titulo, descripcion, fecha, imagen_url, estado, orden) VALUES
  ('ARN Edición I', 'Primera edición del encuentro. Un espacio de conexión espiritual y activación de propósito para líderes de distintas áreas.', '2024', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80', 'pasado', 1),
  ('ARN Edición II', 'Segunda edición con mayor alcance. Comunidades de múltiples ciudades conectadas por una misma visión de transformación.', '2025', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80', 'pasado', 2),
  ('ARN Edición III', 'La edición más ambiciosa. Expandiendo el mensaje a nuevas regiones y consolidando la red de vectores de esperanza.', '2026', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80', 'activo', 3);

INSERT INTO aliados (nombre, logo_url, orden, activo) VALUES
  ('Fundación Avanzar', '/images/aliados/logo-1.svg', 1, 1),
  ('Centro Bienestar', '/images/aliados/logo-2.svg', 2, 1),
  ('Nexus Group', '/images/aliados/logo-3.svg', 3, 1),
  ('Impulsa Venezuela', '/images/aliados/logo-4.svg', 4, 1),
  ('Vértice Consulting', '/images/aliados/logo-5.svg', 5, 1),
  ('Altum Partners', '/images/aliados/logo-6.svg', 6, 1),
  ('Red Vital Foundation', '/images/aliados/logo-7.svg', 7, 1),
  ('Tercer Sector', '/images/aliados/logo-8.svg', 8, 1);
