<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bottom-0  left-0 relative w-full px-20 py-5 flex items-start z-50 bg-primary-400 text-white ">
    <div class="flex flex-col mr-44">
      <img src="/src/assets/FACETRO.png" style="width: 257px" alt="Logo" />
      <br>
      <span class="mt-2">Jln. Raya Sekaran 08 RT01/RW02</span>
      <br>
      <span>20256, Semarang, Indonesia</span>
      <br>
      <span class="mt-2">rootsOO@gmaiI.com</span>
      <br>
      <span class="mt-2">085123609879</span>
    </div>
    <div class="flex flex-col items-start">
        <br>
      <h2 class="text-2xl font-bold mb-2">Infomation</h2>
      <br>
      <router-link to="/">Home</router-link>
      <br>
      <router-link to="/services">Service</router-link>
      <br>
      <router-link to="/about">About Us</router-link>
      <br>
      <router-link to="/contact" class="mr-9">Contact</router-link>
      <br>
      <h3 class="mt-2">Privacy Policy | Terms & Conditions</h3>
      <br>
    </div>
    <div class="flex flex-col items-start ml-[490px] pt-7 text-left">
      <h2 class="text-2xl font-bold mb-2">Support</h2>
    </div>
  </footer>
</template>
