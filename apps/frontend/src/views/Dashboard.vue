<script setup lang="ts">
    import Input from '../components/Input.vue';
    import Button from '../components/Button.vue';
    import {ref,watch} from 'vue';
    import axios from 'axios';
    import {useUserStore} from '../store/store.ts';
    import {onMounted} from 'vue'
    import Dialog from 'primevue/dialog';
    import {useToast} from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';


    const tasks = ref<string[]>([]);
    const newTask = ref<string>('');
    const store = useUserStore();
    const visible = ref<boolean>(false);
    const username = ref<string>('');
    const taskId = ref<string>('');
    const $toast = useToast();


    const selectVal=ref<string>('All');

    const getTodos = async(type="All")=>{
        try {
            const todos = await axios.get(`http://localhost:3000/todos?type=${type}`,{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })

            if(todos.status === 200){
                if(type==="All"){
                    tasks.value = [...todos.data.todos,...todos.data.sharedTodos];
                }else if(type === "My_Todos"){
                    tasks.value = todos.data.todos;
                }else if(type === "Shared_Todos"){
                    tasks.value = todos.data.todos;
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    onMounted(getTodos)


    const handleSave = async()=>{
        try {
            if(!newTask){
                return;
            }

            const sendReq = await axios.post(`http://localhost:3000/todos`,{
                task:newTask.value,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            tasks.value = sendReq.data.todo;
            newTask.value=''
        } catch (error) {
            
        }
    }

    const handleUpdate = (id)=>{
        console.log(id);
        
    }

    const toggleShare = (id)=>{
        visible.value = !visible.value
        taskId.value = id
    }


    const handleShare=async()=>{
        try {
            const sendReq = await axios.post('http://localhost:3000/todos/share-todo',{
                todoId:taskId.value,
                username:username.value
            },{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            if(sendReq.status === 200){
                $toast.success('Todo Shared!')
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    watch(selectVal,async(newVal)=>{
        await getTodos(newVal)
    })
</script>


<template>


    <h1 class="text-center text-3xl  absolute top-5 left-1/2">Todo's {{ store.username }}</h1>
    <div class="h-screen flex flex-col items-center justify-center">
        <form @submit.prevent="handleSave" class="flex gap-5">
            <Input v-model="newTask" placeholder="Enter Todo..."/>
            <Button type="submit">Add</Button>
        </form>  
       <select v-model="selectVal" class="mt-2 border">
            <option value="All">All</option>
            <option value="My_Todos">My Todos</option>
            <option value="Shared_Todos">Shared Todos</option>
       </select>

        <ul class="pt-5 flex flex-col gap-5">
                <li  class="border rounded-md py-2 px-5 bg-gray-200 flex justify-between items-center" v-for="task in tasks">
                    <span >{{ task.title }}</span>
                    <i @click="toggleShare(task.id)" class="pi pi-share-alt ml-5" ></i>
                </li>
            </ul>

        <span class="mt-5" v-if="visible">
            <Input v-model="username" placeholder="Enter Username..."/>
            <br/>
            <Button class="ml-5 mt-2" @click="handleShare">Share</Button>
        </span>
    </div>

    

</template>