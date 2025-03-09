import { FastifyReply, FastifyRequest } from "fastify"
import {auth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@mono-repo/firebase'
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
interface UserBody {
    email: string;
    password: string;
    username: string;
}

interface UserLoginBody {
    email: string;
    password: string;
}

export const registerUser = async(request:FastifyRequest<{Body:UserBody}>, reply:FastifyReply) => {
    try {
        const {email,password,username} = request.body;
        if(!email || !password || !username){
            reply.send({error:'Please provide all the fields'})
            return;
        }
        
        const checkUser = await db.select().from(users).where(eq(users.email,email))
        if(checkUser.length>0){
            reply.send({error:'User already exists'})
            return;
        }
        const user = await createUserWithEmailAndPassword(auth,email,password);

        await db.insert(users).values({username:username,id:user.user.uid,email})

        reply.send({message:'User registered successfully'})
    } catch (error) {
        reply.send({error:error})
    }
}


export const loginUser = async(request:FastifyRequest<{Body:UserLoginBody}>, reply:FastifyReply) => {
    try {
        const {email,password}= request.body;

        if(!email || !password){
            reply.send({error:'Please provide all the fields'})
            return;
        }

        const login  = await signInWithEmailAndPassword(auth,email,password);

        reply.send({message:'Login Successful',login})
    } catch (error) {
        reply.status(400).send({error:error})
    }
}


export const getMyDetails = async(request:FastifyRequest,reply:FastifyReply)=>{
    try {
        if(!request.user){
            reply.status(400).send({error:'Please Login'})
            return;
        }
        const getUser = await db.select().from(users).where(eq(users.id,request.user.uid))
        if(getUser.length===0){
            reply.status(400).send({error:'User not found'})
            return;
        }
        
        const addedUsername = getUser.map((user)=>({...user,...request.user}))
        reply.send({user:addedUsername[0]})
    } catch (error) {
        reply.status(500).send({error:error})
    }
}