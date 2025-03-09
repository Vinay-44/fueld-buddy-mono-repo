<script setup lang="ts">
    import {ref} from 'vue';
    import {} from '@mono-repo/firebase'
    import Input from '../components/Input.vue';
    import Button from '../components/Button.vue';
    const username = ref();
    const password = ref();
    const showPassword = ref(false);

    const togglePassword = ()=>{
        showPassword.value = !showPassword.value
    }

</script>


<template>
    <div class="h-screen flex items-center justify-center">
        <form class="border border-gray-300 h-1/2 w-1/2 flex flex-col gap-5 items-center justify-center relative rounded-lg">
            <h1 class="absolute top-5 text-2xl">Registration Form</h1>
            <Input  placeholder="Enter Username" v-model="username"/>
            <span class="relative">
                <Input :type="`${showPassword ? 'text':'password'}`" placeholder="Enter Password" v-model="password"/>
                <i @click="togglePassword" :class="`pi ${showPassword ? 'pi-eye' : 'pi-eye-slash'} absolute right-1 top-3`" style="color: gray"></i>
            </span>
            <Button>Submit</Button>
        </form>
    </div>
    
</template>