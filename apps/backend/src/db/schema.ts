import { timestamp } from "drizzle-orm/pg-core";
import { text, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text().primaryKey().notNull(),
  username: varchar({ length: 255 }).notNull(),
  created_at:timestamp().defaultNow()
});