<template>
  <div class="relative">
    <div class="absolute">
      <canvas id="world"></canvas>
    </div>
    <div class="flex hero h-screen items-center justify-center">
      <div class="hero-content text-center bg-indigo-600 shadow-lg bg-opacity-50 rounded-3xl p-5">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold text-white">Login</h1>
          <p class="py-6 text-white">Selamat Datang!</p>
          <div>
            <input
              type="text"
              placeholder="Username"
              class="input w-full max-w-xs mb-3 mr-3 bg-slate-200"
              v-model="datalogin.email"
            /><i class="far fa-user"></i>
            <input
            v-on:keyup.enter="tombollogin"
              type="password"
              placeholder="Password"
              class="input w-full max-w-xs mb-5 mr-3 bg-slate-200"
              v-model="datalogin.password"
            /><i class="fas fa-lock"></i>
          </div>

          <button class="btn glass py-4 px-20 mb-5 bg-white text-black" @click="tombollogin">
            Login
          </button>

          <div class="flex justify-center ml-5">
            <img src="../../assets\logo\google_logo.png" alt="Google Logo" class="h-10 mr-4" />
            <img src="../../assets\logo\github_logo.png" alt="Google Logo" class="h-10 mr-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/services/Noname.services.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const datalogin = ref({ email: '', password: '' })
const tombollogin = () => {
  console.log(datalogin.value)
  let hasil = login(datalogin.value)
  if (hasil) {
    router.push({ name: 'dashboard' })
    alert('Login Berhasil!')
  }
}
</script>
l
