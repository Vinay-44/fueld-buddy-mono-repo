<script setup lang="ts">

    import {defineProps,defineEmits} from 'vue'
    
    defineProps({
        placeholder:{
            type:String,
            default:'Enter Input...'
        },
        modelValue:{
            type:String
        }
    })

    const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <input :value="modelValue" v-on:input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" class="p-2 outline rounded-2xl"/>
</template>