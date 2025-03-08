import { FastifyPluginAsync } from "fastify"
import { getTodos, postTodos } from "../../controllers/todos.controller";
import { postTodosSchema } from "./schema";

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/',getTodos),
  
  fastify.post('/',{
    schema:{
        ...postTodosSchema
    }
  },postTodos)
}

export default todos;
