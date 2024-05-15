<template>
  <div>
    <!-- Navbar -->
    <div :class="{ 'ml-64': sidebarOpen }" class="navbar bg-base-100 bg-indigo-600 relative z-10 transition-all duration-300 ease-in-out">
      <button @click="toggleSidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <div class="flex-1 ml-5">
        <img src="/src/assets/logo/PortaX_Horizontal.png" width="150px" height="150px">
      </div>
      <div class="dropdown dropdown-end mr-2">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 bg-white">
          <li><a class="justify-between">Profile</a></li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>

    <!-- Sidebar -->
    <div :class="{ 'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen }"
      class="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-20">
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
        <li><router-link to="/" class="block py-2">Beranda</router-link></li>
        <li><router-link to="/about" class="block py-2">Tentang</router-link></li>
        <!-- Tambahkan menu lainnya di sini -->
      </ul>
    </div>

    <!-- Backdrop untuk menutup sidebar -->
    <div @click="closeSidebar" :class="{ 'block': sidebarOpen, 'hidden': !sidebarOpen }"
      class="fixed inset-0 bg-black opacity-25 transition-opacity pointer-events-auto z-10"></div>
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

<style scoped>
</style>
