import { FastifyReply, FastifyRequest } from "fastify"

export const getTodos = async function (request:FastifyRequest, reply:FastifyReply) {
    return {todos:[{id:1,title:'todo1'},{id:2,title:'todo2'}]}
  }

export const postTodos = async function (request:FastifyRequest, reply:FastifyReply) {
    return {todos:[{id:1,title:'todo1'},{id:2,title:'todo2'}]}
  }