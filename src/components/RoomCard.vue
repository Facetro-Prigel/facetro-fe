<template>
    <div :class="['Konten', { act: isActive }]">
      <div class="pt-16 wrapper relative bg-transparent border border-opacity-50 border-white rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.5)] flex flex-wrap justify-center items-center py-20 mt-8 mx-2 transition ease-in-out duration-500">
        <span class="absolute top-5 left-20 font-semibold text-4xl">Room</span>
        <div class="absolute h-0.5 w-full bg-purple-700 top-[84px] transition ease-in-out duration-500">
          <span class="opacity-0 pointer-events-none">.</span>
        </div>
        <div v-for="(item, index) in columns" :key="index" class="column relative bg-transparent border border-opacity-50 border-white rounded-2xl shadow-2xl flex justify-center items-center flex-grow mt-20  mx-10 transition ease-in-out duration-500">
          <div class="flex flex-col items-center pb-6">
            <img v-if="item.image" :src="item.image" alt="Room Image" class="object-cover h-[300px] w-full rounded-xl my-8">
            <h3 class="text-lg font-semibold mt-2">{{ item.title }}</h3>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
            <div v-if="item.labels && item.labels.length > 0" class="flex space-x-2 mt-2">
              <Chip v-for="(label, labelIndex) in item.labels" :key="labelIndex" :label="label" removable />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['columns'],
    data() {
      return {
        isActive: false,
      };
    },
    mounted() {
      this.isActive = true;
    },
  };
  </script>
  
  <style scoped>
  .column {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .column:hover {
    background-color: #e5e7eb;
  }
  </style>
  