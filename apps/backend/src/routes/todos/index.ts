import { FastifyPluginAsync } from "fastify"
import { getTodos, postTodos,shareTodo } from "../../controllers/todos.controller";
import { postTodosSchema, shareTodoSchema } from "./schema";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/',getTodos),

  fastify.post('/',{
    schema:{
        ...postTodosSchema
    }
  },postTodos),

  fastify.post('/share-todo',{
    schema:{
        ...shareTodoSchema
    },
    
  },shareTodo)
}

export default todos;
