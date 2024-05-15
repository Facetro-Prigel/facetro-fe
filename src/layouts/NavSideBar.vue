<template>
  <div>
    <!-- Navbar -->
    <div class="navbar bg-base-100 bg-indigo-600">
      <div class="flex-none">
        <button @click="toggleSidebar" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
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
    <div :class="{ 'sidebar': true, 'open': isOpen }">
      <ul>
        <li><router-link to="/">Beranda</router-link></li>
        <li><router-link to="/about">Tentang</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
  console.log("Toggle Sidebar:", isOpen.value); // Tambahkan ini untuk melihat nilai isOpen
}

// Fungsi untuk menutup sidebar ketika klik diluar sidebar
const closeSidebarOnClickOutside = (event) => {
  // Periksa apakah elemen yang diklik adalah sidebar atau elemen dalam sidebar
  if (isOpen.value && !event.target.closest('.sidebar')) {
    isOpen.value = false; // Tutup sidebar jika klik diluar sidebar dan sidebar terbuka
  }
}

onMounted(() => {
  document.addEventListener('click', closeSidebarOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', closeSidebarOnClickOutside);
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -200px;
  width: 200px;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s;
}
.sidebar.open {
  left: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
}
a {
  text-decoration: none;
  color: #333;
}
a:hover {
  color: #555;
}
</style>
