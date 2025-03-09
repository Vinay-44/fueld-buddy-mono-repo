import { FastifyPluginAsync } from "fastify"
import { getTodos, postTodos,shareTodo } from "../../controllers/todos.controller";
import { postTodosSchema, shareTodoSchema } from "./schema";
import { verifyUser } from "../../middleware/verifyUser";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/',{schema:{
      querystring:{
      type:'object',
      properties:{
        type:{type:'string'}
      }
    }

    //@ts-ignore
  },preHandler:verifyUser},getTodos),

  fastify.post('/',{
    schema:postTodosSchema,
    preHandler:verifyUser
    // @ts-ignore
  },postTodos),

  fastify.post('/share-todo',{
    schema:{
        ...shareTodoSchema
    },
    preHandler:verifyUser
    // @ts-ignore
  },shareTodo)
}

export default todos;
