-- 006_eventos_speakers.sql
-- Add speakers JSON field to eventos for event detail pages

ALTER TABLE eventos ADD COLUMN speakers TEXT; -- JSON array of {nombre, cargo, foto_url, bio}

UPDATE eventos SET
  speakers = '[{"nombre":"Carlos Méndez","cargo":"Fundador ARN","foto_url":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80","bio":"Visionario detrás del movimiento ARN. Más de 15 años liderando iniciativas de transformación comunitaria."},{"nombre":"María Torres","cargo":"Directora de Formación","foto_url":"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80","bio":"Especialista en desarrollo de liderazgo y activación de propósito en comunidades."},{"nombre":"Andrés Gutiérrez","cargo":"Pastor y Conferencista","foto_url":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80","bio":"Referente en liderazgo espiritual con alcance en más de 20 ciudades de Latinoamérica."}]'
WHERE id = 1;

UPDATE eventos SET
  speakers = '[{"nombre":"Carlos Méndez","cargo":"Fundador ARN","foto_url":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80","bio":"Visionario detrás del movimiento ARN."},{"nombre":"Laura Rivas","cargo":"Directora Ejecutiva","foto_url":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80","bio":"Estratega organizacional con enfoque en impacto social sostenible."},{"nombre":"Andrés Gutiérrez","cargo":"Pastor y Conferencista","foto_url":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80","bio":"Referente en liderazgo espiritual con alcance continental."},{"nombre":"Patricia Hernández","cargo":"Fundadora Red Vital","foto_url":"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80","bio":"Líder en alianzas estratégicas entre organizaciones de impacto social."}]'
WHERE id = 2;

UPDATE eventos SET
  speakers = '[{"nombre":"Carlos Méndez","cargo":"Fundador ARN","foto_url":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80","bio":"Visionario detrás del movimiento ARN. Keynote principal."},{"nombre":"Laura Rivas","cargo":"Directora Ejecutiva","foto_url":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80","bio":"Estratega organizacional. Presenta la visión 2027."},{"nombre":"Andrés Gutiérrez","cargo":"Pastor y Conferencista","foto_url":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80","bio":"Dirige la sesión de adoración y el conversatorio con aliados."},{"nombre":"Patricia Hernández","cargo":"Fundadora Red Vital","foto_url":"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80","bio":"Modera el panel de alianzas estratégicas."},{"nombre":"Diego Salazar","cargo":"Director de Tecnología","foto_url":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80","bio":"Lidera el track de innovación y tecnología para el cambio social."},{"nombre":"María Torres","cargo":"Directora de Formación","foto_url":"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80","bio":"Coordina los talleres de formación en las 6 áreas temáticas."}]'
WHERE id = 3;
