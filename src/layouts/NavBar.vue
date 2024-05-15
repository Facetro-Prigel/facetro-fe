<template>
  <div>
    <!-- Navbar -->
    <div class="navbar bg-indigo-600 text-white">
      <button @click="toggleSidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div class="flex-1 ml-5">
        <img src="@/assets/logo/PortaX_Horizontal.png" width="150px" height="150px">
      </div>
      <div class="dropdown dropdown-end mr-2">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>

    <div v-if="isOpen" class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
}
</script>
