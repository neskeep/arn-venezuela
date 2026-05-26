import { useDatabase } from "~~/server/database";
import type { Evento } from "~~/shared/types";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id || isNaN(Number(id))) {
    throw createError({ statusCode: 400, message: "Invalid event ID" });
  }

  const db = useDatabase();
  const eventos = db
    .prepare("SELECT * FROM eventos WHERE id != ? ORDER BY orden DESC LIMIT 4")
    .all(Number(id)) as Evento[];

  return { data: eventos };
});
