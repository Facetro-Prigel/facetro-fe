<template>
  <Toast />
  <div class="w-full h-full flex">
    <Sidebar :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
    <div class="w-full h-full">
      <HeaderTop :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
      <div class="w-full h-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderTop from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Toast from 'primevue/toast';
import { ref } from 'vue'
const openSidebar = ref(true)
const toggleSidebar = () =>{
  openSidebar.value = !openSidebar.value
}
</script>
