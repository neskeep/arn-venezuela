import { useDatabase } from "~~/server/database";
import type { Evento } from "~~/shared/types";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id || isNaN(Number(id))) {
    throw createError({ statusCode: 400, message: "Invalid event ID" });
  }

  const db = useDatabase();
  const evento = db
    .prepare("SELECT * FROM eventos WHERE id = ?")
    .get(Number(id)) as Evento | undefined;

  if (!evento) {
    throw createError({ statusCode: 404, message: "Event not found" });
  }

  return { data: evento };
});
