<template>
    <div class="flex flex-col items-center w-full text-center py-5 h-screen justify-center relative overflow-hidden">
        <!-- Video Background -->
        <div class="absolute top-0 left-0 w-screen h-screen z-10 overflow-hidden">
            <video class="w-screen h-screen object-cover fixed top-0 left-0 right-0 bottom-0" autoplay playsinline loop
                disablepictureinpicture muted poster="@/assets/loginAnimationPoster.png">
                <source src="@/assets/videos/videoBG.mp4" type="video/mp4">
            </video>
        </div>
        <div class="w-full bg-gray-200/90 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 z-20">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Masuk
                </h1>
                <div class="space-y-4 md:space-y-6" action="#">
                    <div class="flex justify-center items-center">
                        <img ref="image" src="@/assets/logo/UNNES.png" alt="Logo UNNES" title="Logo UNNES"
                            width="120px">
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium"><i class="pi pi-envelope"></i>
                            E-mail</label>
                        <input type="email" name="email" ref="emailField"
                            class="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="name@students.unnes.ac.id" required="">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium "><i class="pi pi-lock"></i>
                            Password</label>
                        <div class="flex justify-center items-center">
                            <input v-on:keyup.enter="tombolLogin" type="password" name="password" ref="passwordField"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                required="">
                            <button class="pi pi-eye p-2" @mousedown="passwordField.type = 'text'"
                                @mouseup="passwordField.type = 'password'"></button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline text-primary-400">Lupa
                            Password?</a>
                    </div>
                    <button @click="tombolLogin" ref="loginBtn"
                        class="w-full bg-secondary-300 py-2 px-2 text-primary rounded-md drop-shadow-md hover:bg-secondary-500 disabled:bg-gray-600 transition-colors duration-300">
                        <i class="pi pi-send mr-2"></i>Masuk
                    </button>

                    <div class="relative flex items-center justify-center w-full mt-4">
                        <div class="absolute w-full border-t border-gray-400"></div>
                        <div class="relative bg-gray-200/90 px-4">
                            <span class="text-sm text-gray-500">atau</span>
                        </div>
                    </div>
                    <div class="flex justify-center w-full">
                      <div id="googleBtn"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { login, loginWithGoogle } from '@/services/Auth.services.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies';

const BASE_URL = import.meta.env.VITE_BACKEND_API
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const emailField = ref()
const passwordField = ref()
const image = ref()
const loginBtn = ref()
const router = useRouter()

VueCookies.remove('token');
VueCookies.remove('user');

const handleGoogleCallback = async (response) => {
  try {
    if (response.credential) {
      const result = await loginWithGoogle({ 
        credential: response.credential
      });
      
      if (result.uuid) {
        // Store user data
        image.value.src = BASE_URL + 'avatar/' + result.avatar
        
        // Store permissions and roles if needed
        if (result.user_roles) {
          localStorage.setItem('user_roles', JSON.stringify(result.user_roles));
        }
        if (result.user_permission) {
          localStorage.setItem('user_permission', JSON.stringify(result.user_permission));
        }
        
        setTimeout(() => {
          router.push('/manage-control')
        }, 1000);
      }
    } else {
      console.error('No credential received from Google');
      alert('Tidak dapat menerima data dari Google. Silakan coba lagi.');
    }
  } catch (error) {
    console.error('Google login error details:', {
      error: error,
      response: error.response,
      data: error.response?.data,
      status: error.response?.status
    });

    if (error.response?.data?.detail) {
      alert(error.response.data.detail);
    } else if (error.response?.status === 404) {
      alert('Mohon hubungi admin terlebih dahulu untuk membuat akun!');
    } else if (error.response?.status === 400) {
      alert('Mohon pilih email yang mau digunakan!');
    } else {
      alert('Terjadi kesalahan saat login dengan Google. Silakan coba lagi atau hubungi admin.');
    }
  }
}

const initializeGoogleSignIn = () => {
  try {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
      auto_select: false,
      cancel_on_tap_outside: true
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { 
        theme: "outline", 
        size: "large", 
        width: "100%",
        text: "signin_with",
        shape: "rectangular",
        logo_alignment: "left"
      }
    );

  } catch (error) {
    console.error('Error initializing Google Sign-In:', error);
  }
}

const tombolLogin = async () => {
  emailField.value.disabled = true;
  passwordField.value.disabled = true;
  loginBtn.value.disabled = true
  try {
    const result = await login({
      email: emailField.value.value,
      password: passwordField.value.value
    })
    if (result.uuid) {
      image.value.src = BASE_URL + 'avatar/' + result.avatar
      setTimeout(() => {
        router.push('/manage-control')
      }, 1000);
    }
  } catch (error) {
    emailField.value.disabled = false;
    passwordField.value.disabled = false;
    loginBtn.value.disabled = false;
  }
}

onMounted(() => {
  // Load the Google Identity Services SDK
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = initializeGoogleSignIn
  document.head.appendChild(script)
})
</script>
<style lang="css" scoped>
#googleBtn{
  display: flex;
}
</style>