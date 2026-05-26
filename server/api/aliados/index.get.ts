import { useDatabase } from "~~/server/database";
import type { Aliado } from "~~/shared/types";

export default defineEventHandler(() => {
  const db = useDatabase();
  const aliados = db
    .prepare("SELECT * FROM aliados WHERE activo = 1 ORDER BY orden ASC")
    .all() as Aliado[];

  return { data: aliados, meta: { total: aliados.length } };
});
