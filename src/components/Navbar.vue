<template>
    <header class="flex justify-between items-center bg-primary-400 h-[128px] px-5 lg:px-24 fixed w-full z-10">
      <div>
        <img src="/src/assets/FACETRO.png" alt="Logo FACETRO" style="width: 150px;">
      </div>
  
      <!-- Hamburger menu icon -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-4xl text-black cursor-pointer focus:outline-none">
          <i class="bi bi-list"></i>
        </button>
      </div>
  
      <!-- Navigasi untuk desktop -->
      <nav class="hidden md:flex gap-4 md:gap-10 items-center">
        <router-link to="/home" class="text-white hover:text-slate-700 text-base font-reguler">Home</router-link>
        <router-link to="/services" class="text-white hover:text-slate-700 text-base font-reguler">Services</router-link>
        <router-link to="/about" class="text-white hover:text-slate-700 text-base font-reguler">About Us</router-link>
        <router-link to="/contact" class="text-white hover:text-slate-700 text-base font-reguler">Contact</router-link>
        <router-link to="/login" class="navigation">
          <button class="bg-primary-500 hover:bg-primary-300 text-white font-reguler py-3 px-8 md:px-10 border-2 border-white rounded shadow">
            Login
          </button>
        </router-link>
      </nav>
  

    </header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  