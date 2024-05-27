<template>
    <div class="w-full h-full flex">
      <Sidebar :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
      <div class="w-full h-full">
        <HeaderTop :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
        <div class="w-full h-full">
          <router-view></router-view>
        </div>
      </div>
          <RoomCard :isSidebarOpen="isSidebarOpen"/>
    </div>
  </template>
  
  <script>
  import HeaderTop from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import RoomCard from '@/components/RoomCard.vue';
  
  export default {
    components: {
      HeaderTop,
      Sidebar
    },
    data() {
      return {
        openSidebar:true
      }
    },
    methods: {
        toggleSidebar() {
            this.openSidebar = !this.openSidebar
        }
    }
  };
  </script>
  
  <style scoped>
  </style>
  