<template>
  <div class="relative flex min-h-screen flex-col sm:flex-row">
    <!-- Sidebar -->
    <Sidebar :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />

    <!-- Main Content -->
    <div class="flex-1  overflow-y-auto">
      <HeaderTop :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
      
      <!-- Router View -->
      <div class="w-full h-max transition-all duration-300 ">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderTop from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ref } from 'vue'
const openSidebar = ref(false)
const toggleSidebar = () =>{
  openSidebar.value = !openSidebar.value
}
</script>
