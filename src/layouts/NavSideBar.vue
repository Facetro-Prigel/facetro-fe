<template>
  <div>
    
    <div class="navbar bg-base-100 bg-indigo-600 relative z-10 transition-all duration-300 ease-in-out">
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
          <li><a>Logouts</a></li>
          <input type="checkbox" class="toggle toggle-info" checked />
        </ul>
      </div>
    </div>
    <Sidebar/>
    <!-- Backdrop Sidebar -->
    <div @click="closeSidebar" :class="{ 'block': sidebarOpen, 'hidden': !sidebarOpen }"
      class="fixed inset-0 bg-black opacity-25 transition-opacity pointer-events-auto z-10"></div>
      <div :class="{'ml-60':sidebarOpen}" class="transition-all duration-300 overflow-y-hidden">
          <router-view />
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
import Sidebar from '@/components/Sidebar.vue';
const sidebarOpen = ref(false)
const router = useRouter()
onMounted(() => {
  setTimeout(() => {
  if(!VueCookies.get('token')){
      router.push({ name:"login" })
    }
  }, 700);
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};
</script>