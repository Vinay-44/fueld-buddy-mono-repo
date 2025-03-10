import {createRouter, createWebHistory} from 'vue-router'


import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            component:Home,
            name:'home'
        },
        {
            path:'/dashboard',
            component:Dashboard,
            name:'dashboard'
        },
        {
            path:'/login',
            component:Login,
            name:'login'
        },
        {
            path:'/register',
            component:Register,
            name:'register'
        }
    ]
})


export default router;