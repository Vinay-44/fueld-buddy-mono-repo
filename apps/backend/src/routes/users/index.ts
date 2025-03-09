import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { getMyDetails, loginUser, registerUser } from "../../controllers/users.controller";
import { loginUserSchema, registerUserSchema } from "./schema";
import { db } from "../../db";
import { users as UserSchema } from "../../db/schema";
import { verifyUser } from "../../middleware/verifyUser";
const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/',async(req:FastifyRequest,reply:FastifyReply)=>{

        const data = await db.select().from(UserSchema)
        reply.send({data})
    })

  fastify.post('/register',{
    schema:{...registerUserSchema}
  },registerUser)

  fastify.post('/login',{
    schema:{
        ...loginUserSchema
    },
  },loginUser)

  fastify.get('/myDetails',{preHandler:verifyUser},getMyDetails)
}

export default users;
