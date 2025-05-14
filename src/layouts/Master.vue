<template>
  <div class="relative flex h-screen flex-col sm:flex-row">
    <!-- Sidebar -->
    <Sidebar :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
    <!-- Main Content -->
    <div  class="relative flex-1 overflow-y-auto">
      <HeaderTop :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
      <!-- Router View -->
      <div  class="w-full transition-all duration-300 h-full ">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderTop from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { ref } from 'vue';

// State untuk sidebar
const openSidebar = ref(false);
const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
};
</script>