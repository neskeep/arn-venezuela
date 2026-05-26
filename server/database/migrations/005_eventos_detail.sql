-- 005_eventos_detail.sql
-- Expand eventos for rich detail pages: schedule, gallery, video, registration

ALTER TABLE eventos ADD COLUMN hora TEXT;
ALTER TABLE eventos ADD COLUMN galeria TEXT; -- JSON array of image URLs
ALTER TABLE eventos ADD COLUMN programa TEXT; -- JSON array of {hora, titulo, descripcion}
ALTER TABLE eventos ADD COLUMN video_url TEXT;
ALTER TABLE eventos ADD COLUMN cta_url TEXT;
ALTER TABLE eventos ADD COLUMN cta_texto TEXT;

-- Seed rich content for existing events

UPDATE eventos SET
  hora = '9:00 AM — 5:00 PM',
  galeria = '["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80","https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80","https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80","https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80","https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80","https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80"]',
  programa = '[{"hora":"9:00 AM","titulo":"Registro y bienvenida","descripcion":"Acreditación de participantes y café de networking"},{"hora":"10:00 AM","titulo":"Plenaria de apertura","descripcion":"Mensaje central: El ARN como código de activación del propósito"},{"hora":"12:00 PM","titulo":"Talleres simultáneos","descripcion":"Sesiones prácticas en liderazgo, emprendimiento y servicio comunitario"},{"hora":"2:00 PM","titulo":"Panel de líderes","descripcion":"Conversación con referentes que están transformando sus comunidades"},{"hora":"4:00 PM","titulo":"Activación y cierre","descripcion":"Compromiso colectivo y lanzamiento de la red de vectores"}]'
WHERE id = 1;

UPDATE eventos SET
  hora = '8:00 AM — 6:00 PM',
  galeria = '["https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80","https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80","https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80","https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80","https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80","https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80"]',
  programa = '[{"hora":"8:00 AM","titulo":"Apertura y adoración","descripcion":"Momento de conexión espiritual colectiva"},{"hora":"9:30 AM","titulo":"Keynote: Expansión del propósito","descripcion":"Cómo pasar de la visión individual al impacto colectivo"},{"hora":"11:00 AM","titulo":"Mesas de trabajo regionales","descripcion":"Cada ciudad diseña su plan de acción local"},{"hora":"1:00 PM","titulo":"Networking y almuerzo","descripcion":"Espacio de conexión entre líderes de distintas ciudades"},{"hora":"3:00 PM","titulo":"Paneles temáticos","descripcion":"Educación, salud, emprendimiento y arte como vectores de cambio"},{"hora":"5:00 PM","titulo":"Ceremonia de compromiso","descripcion":"Lanzamiento del programa de mentorías y cierre"}]',
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
WHERE id = 2;

UPDATE eventos SET
  hora = '8:00 AM — 8:00 PM',
  galeria = '["https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80","https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80","https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80","https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80","https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80","https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80"]',
  programa = '[{"hora":"8:00 AM","titulo":"Registro y acreditación","descripcion":"Bienvenida a delegaciones de todas las regiones"},{"hora":"9:00 AM","titulo":"Plenaria inaugural","descripcion":"El ARN como movimiento nacional: retrospectiva y visión"},{"hora":"10:30 AM","titulo":"Talleres de formación","descripcion":"Tracks especializados: liderazgo, educación, salud, tecnología, arte y negocios"},{"hora":"1:00 PM","titulo":"Feria de proyectos","descripcion":"Exposición de iniciativas comunitarias de cada región"},{"hora":"3:00 PM","titulo":"Conversatorio con aliados","descripcion":"Fundaciones y organizaciones presentan oportunidades de colaboración"},{"hora":"5:00 PM","titulo":"Sesión de adoración","descripcion":"Momento central de conexión espiritual y renovación de propósito"},{"hora":"7:00 PM","titulo":"Gala de cierre","descripcion":"Reconocimiento a vectores destacados y lanzamiento de la visión 2027"}]',
  video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  cta_url = 'https://forms.gle/example',
  cta_texto = 'Reserva tu lugar'
WHERE id = 3;
