import { useDatabase } from "~~/server/database";
import type { MiembroJunta } from "~~/shared/types";

export default defineEventHandler(() => {
  const db = useDatabase();
  const members = db
    .prepare("SELECT * FROM junta_directiva WHERE activo = 1 ORDER BY orden ASC")
    .all() as MiembroJunta[];

  return { data: members, meta: { total: members.length } };
});
