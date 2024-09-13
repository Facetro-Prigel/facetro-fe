<template>
    <div class="gap-20 flex justify-center items-center">
        <div class="flex justify-center items-center">
          <div class="flex relative w-[280px] h-[400px]"></div>
          <div class="absolute items-center justify-center">
            <img :src="imgcr" />
            <br />
            <h3 class="text-center font-medium">{{name}}</h3>
            <p class="text-center font-light">{{role}}</p>
          </div> 
        </div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue'
const props = defineProps(['name','role','imgcr'])
</script>

<style scoped>
</style>