<script setup lang="ts">

    import {defineProps} from 'vue'
    
    defineProps({
        placeholder:{
            type:String,
            default:'Enter Input...'
        }
    })

</script>

<template>
    <input :placeholder="placeholder" class="p-2 outline rounded-2xl"/>
</template>