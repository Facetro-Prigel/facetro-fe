<template>
  <div>
    <!-- Navbar -->
    <nav :class="{ 'ml-64': sidebarOpen }" class="bg-gray-800 shadow-lg fixed top-0 left-0 w-full z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <!-- Tombol untuk membuka/tutup sidebar -->
          <button @click="toggleSidebar" class="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path v-if="sidebarOpen" fill-rule="evenodd" clip-rule="evenodd" d="M3 9h14v2H3V9Z"></path>
              <path v-else fill-rule="evenodd" clip-rule="evenodd" d="M3 5h14v2H3V5Z"></path>
            </svg>
          </button>

          <!-- Logo -->
          <div>
            <a href="#" class="text-white text-2xl font-bold">Logo</a>
          </div>

          <!-- Menu Navbar -->
          <div>
            <ul class="flex space-x-4">
              <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
              <li><a href="#" class="text-white hover:text-gray-300">About</a></li>
              <li><a href="#" class="text-white hover:text-gray-300">Contact</a></li>
              <!-- Tambahkan menu lainnya di sini -->
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <div :class="{ 'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen }"
      class="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-50">
      <div class="p-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Sidebar</h1>
        </div>
        <div>
          <button @click="closeSidebar" class="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.293 5.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Isi Sidebar -->
      <ul class="mt-4">
        <li><a href="#" class="block py-2">Menu 1</a></li>
        <li><a href="#" class="block py-2">Menu 2</a></li>
        <li><a href="#" class="block py-2">Menu 3</a></li>
        <!-- Tambahkan menu lainnya di sini -->
      </ul>
    </div>

    <!-- Konten utama -->
    <div :class="{ 'ml-64': sidebarOpen }" class="ml-0 transition-all duration-300 ease-in-out">
      <!-- Isi konten utama -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};
</script>
