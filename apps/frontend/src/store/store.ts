import { defineStore } from 'pinia';


export const useUserStore = defineStore('user',{
    state:()=>({
            uid:'',
            username:'',
            email:''
    }),
    actions:{
        setUser(user:{uid:string,username:string,email:string}){
            this.uid = user.uid;
            this.username = user.username;
            this.email = user.email;
        }
    }
})