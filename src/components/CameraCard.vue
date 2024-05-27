<template>
    <div :class="['Konten', { act: isActive }]">
      <div class="pt-16 wrapper relative bg-transparent border border-opacity-50 border-white rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.5)] flex flex-col items-center py-20 mt-8 mx-2 transition ease-in-out duration-500">
        <span class="absolute top-5 left-20 font-semibold text-4xl">Camera</span>
        <div class="absolute h-0.5 w-full bg-purple-700 top-[84px] transition ease-in-out duration-500">
          <span class="opacity-0 pointer-events-none">.</span>
        </div>
        <div v-for="(group, index) in groupedColumns" :key="index" class="location-group w-full mb-8 mt-10">
          <h2 class="text-2xl font-semibold mb-4">{{ group.location }}</h2>
          <div class="flex flex-wrap justify-center items-center">
            <div v-for="(item, itemIndex) in group.items" :key="itemIndex" class="column relative bg-transparent border border-opacity-50 border-white rounded-2xl shadow-2xl flex justify-center items-center flex-grow mt-4 mx-2 transition ease-in-out duration-500">
              <div class="flex flex-col items-center text-center pb-6">
                <img v-if="item.image" :src="item.image" alt="Room Image" class="object-cover h-[240px] w-full rounded-xl my-8">
                <h3 class="text-lg font-semibold mt-2">{{ item.title }}</h3>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
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
    computed: {
      groupedColumns() {
        const groups = this.columns.reduce((acc, item) => {
          if (!acc[item.location]) {
            acc[item.location] = [];
          }
          acc[item.location].push(item);
          return acc;
        }, {});
  
        return Object.keys(groups).map(location => ({
          location,
          items: groups[location]
        }));
      }
    },
    mounted() {
      this.isActive = true;
    },
  };
  </script>
  
  <style scoped>
  .location-group {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .column {
    width: calc(25% - 2rem); /* 4 cards per row with some margin */
  }
  
  .column:hover {
    background-color: #e5e7eb;
  }
  </style>
  