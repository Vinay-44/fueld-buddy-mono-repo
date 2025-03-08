<script setup lang="ts">
    import {defineProps} from 'vue';


    defineProps({
        
    })
</script>


<template>
    <button class="p-2 bg-blue-400 text-white rounded-xl w-32">
        <slot></slot>
    </button>
</template>