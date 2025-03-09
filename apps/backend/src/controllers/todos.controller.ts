import { FastifyReply, FastifyRequest } from "fastify"
import { db } from "../db";
import { todos, todosUsers, users } from "../db/schema";
import { randomUUID } from "crypto";
import { eq, ne } from "drizzle-orm";
// import { todos } from "../db/schema";
// import { db } from "../db";
// import { eq } from "drizzle-orm";
interface TodoBody {
    task: string;
}

interface TodoRequest{
  Body:TodoBody
}

interface ShareTodoBody{
  todoId:string;
  username:string;
}
export const getTodos = async function (request:FastifyRequest<{Querystring:{type:string}}>, reply:FastifyReply) {
  try {
    const {type} = request.query
    
    if(type==="All"){
      console.log(await db.select().from(todosUsers))
      const myTodos = await db.select().from(todos).where(eq(todos.user_id,request.user.uid));
      const sharedTodos = await db.select().from(todosUsers).innerJoin(todos,eq(todosUsers.todo_id,todos.id)).where(eq(todosUsers.user_id,request.user.uid));


      console.log(myTodos);
      
      reply.send( {todos:myTodos,sharedTodos:sharedTodos.map(item=>({...item.todos}))})
      return;
    }
    else if(type==="My_Todos"){
      const myTodos = await db.select().from(todos).where(eq(todos.user_id,request.user.uid));
      reply.send( {todos:myTodos})
      return;
    }else if(type==="Shared_Todos"){
      const sharedTodos = await db.select().from(todosUsers).innerJoin(todos,eq(todosUsers.todo_id,todos.id)).where(eq(todosUsers.user_id,request.user.uid));
      reply.send( {todos:sharedTodos.map(item=>({...item.todos}))})
      return;
    }
  } catch (error) {
    reply.status(500).send({error:error})
  }
}

export const postTodos = async function (request:FastifyRequest<TodoRequest>, reply:FastifyReply) {
  try {
    const {task} = request.body


    const userId = request.user.uid
  
    await db.insert(todos).values({user_id:userId,title:task,id:randomUUID()});
  
    const todo = await db.select().from(todos).where(eq(todos.user_id,userId));
      return {todo}
  } catch (error) {
    return reply.status(500).send({error:error})
  }
 
}


  export const shareTodo = async function(request:FastifyRequest<{Body:ShareTodoBody}>, reply:FastifyReply) {
    try {

      const {todoId,username} = request.body;

      const getUser = await db.select().from(users).where(eq(users.username,username))
      await db.insert(todosUsers).values({todo_id:todoId,user_id:getUser[0].id})
      reply.send( {success:true})
    } catch (error) {
      console.log(error);
      reply.status(500).send({error:error})
    }
  }