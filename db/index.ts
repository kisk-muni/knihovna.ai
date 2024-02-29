import { drizzle } from "drizzle-orm/postgres-js";
import * as Schema from "./schema";
import postgres from "postgres";

const queryClient = postgres(process.env.DB_URL!);

export const db = drizzle(queryClient, {
  schema: {
    ...Schema,
  },
});
