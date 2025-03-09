import { FastifyReply, FastifyRequest } from "fastify";
import { adminFirebase } from '../firebase_admin/index'
export const verifyUser  = async(request:FastifyRequest,reply:FastifyReply)=>{
    try {
        const token = request.headers.authorization?.split(' ')[1];

        if(!token){
            reply.status(400).send({error:'Unauthorized Please Relogin!'})
            return;
        }

        const verifyToken  = await adminFirebase.auth().verifyIdToken(token);


        request.user = verifyToken;

    } catch (error) {
        reply.status(500).send({error:error})
    }
}