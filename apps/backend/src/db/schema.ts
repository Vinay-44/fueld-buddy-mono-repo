import { boolean } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { text, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text().primaryKey().notNull(),
  username: text().notNull(),
  email:text().notNull(),
  created_at:timestamp().defaultNow()
});


export const todos=pgTable("todos",{
  id:text().primaryKey().notNull(),
  user_id:text('user_id').references(()=>users.id).notNull(),
  title:text().notNull(),
  isCompleted:boolean().default(false),
  created_at:timestamp().defaultNow(),
  updated_at:timestamp().defaultNow()
})


export const todosUsers = pgTable('userTodos',{
  user_id:text('user_id').references(()=>users.id).notNull(),
  todo_id:text('todo_id').references(()=>todos.id).notNull()
},(t)=>[primaryKey({columns:[t.user_id,t.todo_id]})])