<template>
    <div class="ml-[60px] mt-24">
        <div class="img relative bg-white outline[2px ridge #e6e6e6]">
            <div class="h-[120px] w-[120px] top-[-3rem] left-[5rem] absolute bg-primary-500 flex items-center justify-center rounded-full">
                <img 
                    :src="imgsrc"
                    style=" filter: invert(78%) sepia(95%) saturate(2470%) hue-rotate(337deg)
                      brightness(99%) contrast(104%);"
                    width="36px"
                    
                />
            </div>
      </div>
        <div class="">
            <div class="text pt-32 pl-8 pr-8 border-2 w-[450px] h-[300px]">
              <h4 class="font-semibold">{{ title }}</h4>
              <br>
              <p>{{desc}}</p>
            </div>
          </div>
        </div>
</template>

<script setup>
import {defineProps} from 'vue'
const props = defineProps(['title','desc','imgsrc'])
</script>

<style lang="scss" scoped>

</style>