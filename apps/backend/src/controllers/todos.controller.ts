import { FastifyReply, FastifyRequest } from "fastify"
// import { todos } from "../db/schema";
// import { db } from "../db";
// import { eq } from "drizzle-orm";



export const getTodos = async function (request:FastifyRequest, reply:FastifyReply) {
  // const userId = !request.user.id;

  // const avaialbleTodos = await db.select().from(todos).where(eq(todos.user_id,userId));

    reply.send( {todos:[]})
  }

export const postTodos = async function (request:FastifyRequest, reply:FastifyReply) {
    return {todos:[{id:1,title:'todo1'},{id:2,title:'todo2'}]}
  }


  export const shareTodo = async function(request:FastifyRequest, reply:FastifyReply) {
    return {todos:[{id:1,title:'todo1'},{id:2,title:'todo2'}]}
  }