<template>
    <div :class="['Konten', { act: isActive }]">
      <div class="pt-16 wrapper relative bg-transparent border border-opacity-50 border-white rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.5)] flex flex-col items-center py-20 mt-8 mx-2 transition ease-in-out duration-500">
        <span class="absolute top-5 left-20 font-semibold text-4xl">Attendance</span>
        <div class="absolute h-0.5 w-full bg-blue-700 top-[84px] transition ease-in-out duration-500">
          <span class="opacity-0 pointer-events-none">.</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-10">
          <div v-for="(card, index) in cards" :key="index" class="relative bg-transparent border border-opacity-50 border-white rounded-2xl shadow-2xl flex justify-center items-center flex-grow transition ease-in-out duration-500 px-4">
            <div class="flex flex-col items-center text-center pb-6">
              <ImageViewer v-if="card.image" type="Gambar Pembading" :is-success="true"
                :bbox="card.bbox ?? [0, 0, 0]" :image="BASE_URL+card.image ?? '/src/assets/video/search_person.mp4'" />
              <h3 class="text-lg font-semibold mt-2">{{ card.name }}</h3>
              <p class="text-sm text-gray-500"> {{ card.nim }}</p>
              <p class="text-sm text-red-400"> {{ card.device }}</p>
              <p class="text-sm mt-4 bg-primary-500 text-white px-4 py-2 rounded">In Time: {{ convertToLocale(new Date(card.inTime)) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ImageViewer from '../components/ImageViewer.vue';
  import { ref, onMounted } from 'vue'
  const BASE_URL = import.meta.env.VITE_BACKEND_API
  defineProps({ 'cards': Array });
  const isActive = ref(false)
  const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
onMounted(()=>{
  isActive.value = true
})
  </script>
  
  <style scoped>
  </style>
  