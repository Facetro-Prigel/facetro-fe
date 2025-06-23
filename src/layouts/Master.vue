<template>
  <div class="relative flex h-screen flex-col sm:flex-row">
    <!-- Sidebar -->
    <Sidebar :dataOpenSidebar="openSidebar" :clickHambuger="toggleSidebar" />
    <!-- Main Content -->
    <div  class="relative flex-1 overflow-y-auto transition-all duration-300">
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

// State untuk sidebar
const openSidebar = ref(true);
const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
};

// Fungsi untuk deteksi mobile
const checkMobile = () => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    openSidebar.value = false; // Tutup sidebar jika mobile
  }else{
    openSidebar.value = true;
  }
};

// Jalankan saat komponen dipasang
onMounted(() => {
  checkMobile(); // Cek awal saat mount

  // Tambahkan event listener untuk resize window
  window.addEventListener('resize', checkMobile);
});

// Bersihkan event listener saat komponen di-unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>