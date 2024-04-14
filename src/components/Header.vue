<template>
<header>
    <nav class="flex items-center justify-center w-full bg-gray-800 py-2 z-30" >
      <div class="flex w-full max-w-[1200px] justify-between items-center">
        <div class="flex justify-center items-center">
          <img src="@/assets/logo/UNNES.png" alt="UNNES Logo" class="h-[50px]">
          <div class="text-3xl text-white font-extrabold">Presensi UNNESTech</div>
        </div>
        <button @click="resetToken" class="text-white p-2 bg-red-600 rounded drop-shadow-lg hover:bg-red-800 transition duration-300"><i class="fa fa-recycle"></i> Reset Token</button>
      </div>
    </nav>
  </header>
</template>
<script setup>
import VueCookies from 'vue-cookies';
import { useRouter } from 'vue-router';
const router = useRouter();
const resetToken = () =>{
  VueCookies.remove('device_token')
  router.go()
};

</script>

<style lang="scss" scoped>

</style>