<template>
  <footer class="bottom-0 left-0 relative w-full px-5 sm:px-20 py-5 flex flex-wrap items-start z-50 bg-primary-400 text-white">
    <!-- Logo dan Informasi Kontak -->
    <div class="w-full sm:w-auto flex flex-col items-start mb-6 sm:mr-12">
      <img src="/src/assets/FACETRO.png" style="width: 200px;" alt="Logo FACETRO" />
      <br>
      <span class="mt-2">Jln. Raya Sekaran 08 RT01/RW02</span>
      <br>
      <span>20256, Semarang, Indonesia</span>
      <br>
      <span class="mt-2">rootsOO@gmaiI.com</span>
      <br>
      <span class="mt-2">085123609879</span>
    </div>
    
    <!-- Informasi Navigasi -->
    <div class="w-full sm:w-auto flex flex-col items-start mb-6 sm:ml-12">
      <h2 class="text-2xl font-bold mb-2">Information</h2>
      <router-link to="/home" class="mb-2">Home</router-link>
      <router-link to="/services" class="mb-2">Service</router-link>
      <router-link to="/about" class="mb-2">About Us</router-link>
      <router-link to="/contact" class="mb-2">Contact</router-link>
      <h3 class="mt-2">Privacy Policy | Terms & Conditions</h3>
    </div>
    
    <!-- Informasi Dukungan -->
    <div class="w-full sm:w-auto flex flex-col items-start mb-6 sm:ml-12">
      <h2 class="text-2xl font-bold mb-2">Support</h2>
      <span>support@facetron.com</span>
      <br>
      <span>+62 123 456 789</span>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
@media (min-width: 640px) {
  .footer-mobile {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .footer-mobile .flex-col {
    margin-bottom: 0;
  }
}
</style>
