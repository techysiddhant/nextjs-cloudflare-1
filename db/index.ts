import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
const db = drizzle(process.env.DB, {
  schema,
});

export default db;
