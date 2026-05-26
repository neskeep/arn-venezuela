import { useDatabase } from "~~/server/database";
import type { Evento } from "~~/shared/types";

export default defineEventHandler(() => {
  const db = useDatabase();
  const eventos = db
    .prepare("SELECT * FROM eventos ORDER BY orden ASC")
    .all() as Evento[];

  return { data: eventos, meta: { total: eventos.length } };
});
