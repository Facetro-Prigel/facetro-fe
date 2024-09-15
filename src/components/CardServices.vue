<template>
  <div class="ml-auto mr-auto mt-20 sm:mt-24 w-full max-w-[450px]">
    <div class="relative bg-white outline[2px ridge #e6e6e6] flex justify-start items-center">
      <div class="h-[120px] w-[120px] absolute top-[-5rem] left-12 flex items-center justify-center rounded-full bg-primary-500 mt-8">
        <img 
          :src="imgsrc"
          style=" filter: invert(78%) sepia(95%) saturate(2470%) hue-rotate(337deg)
            brightness(99%) contrast(104%);"
          width="36px"
        />
      </div>
      <div class="pt-32 pl-8 pr-8 border-2 w-full h-[300px] text-left">
        <h4 class="font-semibold">{{ title }}</h4>
        <br>
        <p>{{desc}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'desc', 'imgsrc'])
</script>

<style scoped>
</style>
