<script setup lang="ts">
    import axios from 'axios';
    import {ref} from 'vue';
    import Input from '../components/Input.vue';
    import {useToast} from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';
    import Button from '../components/Button.vue';
    import {useRouter} from 'vue-router'
    import {useUserStore} from '../store/store.ts';


    const password = ref<string>('');
    const email = ref<string>('');
    const showPassword = ref<boolean>(false);
    const store = useUserStore();


    const router = useRouter();
    const $toast = useToast();
    const togglePassword = ()=>{
        showPassword.value = !showPassword.value
    }

    const handleSubmit = async()=>{
        if(!email.value || !password.value){
            $toast.error("Please Enter All Fields!")
        }
        try {

            const sendReq = await axios.post('http://localhost:3000/users/login',{
                email:email.value,password:password.value
            })

            if(sendReq.status === 200){
                $toast.success('Login Success!',{
                    position:'top',
                    duration:1000
                })
                store.setUser({
                    uid:sendReq.data.login.id,
                    username:sendReq.data.login.username,
                    email:sendReq.data.login.email
                })
                localStorage.setItem("token", sendReq.data.login.stsTokenManager.accessToken);
                await new Promise((res,rej)=>setTimeout(()=>res(),1000))
                router.push('/dashboard')
            }
        } catch (error) {
            $toast.error('Something Went Wrong!')
            console.log(error)
        }
    }
</script>


<template>
    <div class="h-screen flex items-center justify-center">
        <form @submit.prevent="handleSubmit"  class="border border-gray-300 h-1/2 w-1/2 flex flex-col gap-5 items-center justify-center relative rounded-lg">
            <h1 class="absolute top-5 text-2xl">Login Form</h1>
            <Input  placeholder="Enter Email" v-model="email"/>
            <span class="relative">
                <Input :type="`${showPassword ? 'text':'password'}`" placeholder="Enter Password" v-model="password"/>
                <i @click="togglePassword" :class="`pi ${showPassword ? 'pi-eye' : 'pi-eye-slash'} absolute right-1 top-3`" style="color: gray"></i>
            </span>
            <Button type="submit">Submit</Button>
        </form>
    </div>
    
</template>