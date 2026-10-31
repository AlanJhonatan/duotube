import { drizzle } from "drizzle-orm/node-postgres";
import { transcriptionsTable } from "./schema";

export const db = drizzle(process.env["DATABASE_URL"]!, {
  schema: { transcriptionsTable },
  casing: "snake_case",
  logger: true,
});
