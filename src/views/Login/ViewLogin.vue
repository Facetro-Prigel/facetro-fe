<template>
  <div class="flex flex-col items-center w-full text-center py-5 h-screen justify-center">
      <div class="w-full bg-gray-600 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Masuk ke akun administrasi
              </h1>

              <div class="space-y-4 md:space-y-6" action="#">
                  <div class="flex justify-center items-center">
                      <img ref="image" src="@/assets/logo/UNNES.png" alt="Logo UNNES"
                          title="Logo UNNES" width="120px">
                  </div>
                  <Alert :status="alertData.status" :msg="alertData.msg"></Alert>
                  <div>
                      <label for="email"
                          class="block mb-2 text-sm font-medium text-white "><i class="pi pi-envelope"></i> E-mail</label>
                      <input type="email" name="email" ref="emailField"
                          class="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="name@students.unnes.ac.id" required="">
                  </div>
                  <div>
                      <label for="password"
                          class="block mb-2 text-sm font-medium text-white"><i class="pi pi-lock"></i> Password</label>
                      <div class="flex justify-center items-center">
                          <input type="password" name="password" ref="passwordField" placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          required="">
                          <button class="pi pi-eye text-white p-2" @mousedown="passwordField.type ='text'" @mouseup="passwordField.type ='password'"></button>
                      </div>
                  </div>
                  <div class="flex items-center justify-between">
                      <a href="#"
                          class="text-sm font-medium text-primary-600 hover:underline text-secondary-400">Lupa
                          Password?</a>
                  </div>
                  <button @click="tombolLogin"
                      class="bg-secondary-300 py-1 px-2 text-primary rounded-md drop-shadow-md hover:bg-scondary-500 hover:text-white transition-colors duration-300">
                      <i class="pi pi-send mr-2"></i>Masuk
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { login } from '@/services/Noname.services.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Alert from '@/components/Alert.vue'
import BASE_URL from '@/stores/config'
const emailField = ref()
const passwordField = ref()
const image = ref()
const router = useRouter()
const alertData = ref({status:'', msg:''})
const tombolLogin = async () => {
  emailField.value.disabled = true;
  passwordField.value.disabled = true;
  alertData.value= {status:'process', msg:'Memperoses'}
  let hasil = await login({
    email: emailField.value.value,
    password: passwordField.value.value
  })
  if (hasil.status) {
      alertData.value= {status:'success', msg: hasil.msg}
      image.value.src= BASE_URL + hasil.img
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000);
  }else{
    alertData.value= {status:'fail', msg:hasil.msg}
    emailField.value.disabled = false;
    passwordField.value.disabled = false;
  }
}
</script>
l
