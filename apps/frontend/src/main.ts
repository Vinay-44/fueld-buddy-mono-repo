import { createApp } from 'vue'
import './style.css'
import ToastPlugin from 'vue-toast-notification';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router/index.ts'
const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(ToastPlugin)
app.use(pinia)
app.use(PrimeVue,{
    
});

app.mount('#app')
