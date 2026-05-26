import { useDatabase } from "~~/server/database";
import type { MiembroRegistro, Miembro } from "~~/shared/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<MiembroRegistro>(event);

  // Validate required fields
  if (!body.nombre?.trim()) {
    throw createError({ statusCode: 400, message: "El nombre es obligatorio" });
  }
  if (!body.email?.trim()) {
    throw createError({ statusCode: 400, message: "El email es obligatorio" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    throw createError({ statusCode: 400, message: "El email no es válido" });
  }
  if (!body.ciudad?.trim()) {
    throw createError({ statusCode: 400, message: "La ciudad es obligatoria" });
  }

  const validAreas = ["liderazgo", "educacion", "salud", "negocios", "arte", "tecnologia", "otro"];
  if (!body.area_interes || !validAreas.includes(body.area_interes)) {
    throw createError({ statusCode: 400, message: "Selecciona un área de interés válida" });
  }

  const db = useDatabase();

  // Check for duplicate email
  const existing = db.prepare("SELECT id FROM miembros WHERE email = ?").get(body.email);
  if (existing) {
    throw createError({ statusCode: 409, message: "Este email ya está registrado" });
  }

  const result = db.prepare(`
    INSERT INTO miembros (nombre, email, telefono, ciudad, profesion, area_interes, mensaje)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    body.nombre.trim(),
    body.email.trim().toLowerCase(),
    body.telefono?.trim() || null,
    body.ciudad.trim(),
    body.profesion?.trim() || null,
    body.area_interes,
    body.mensaje?.trim() || null,
  );

  const miembro = db.prepare("SELECT * FROM miembros WHERE id = ?").get(result.lastInsertRowid) as Miembro;

  return { data: miembro };
});
