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
                        class="bg-secondary-300 py-1 px-2 text-primary rounded-md drop-shadow-md hover:bg-secondary-500 disabled:bg-gray-600 transition-colors duration-300">
                        <i class="pi pi-send mr-2"></i>Masuk
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { login } from '@/services/Auth.services.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies';
const BASE_URL = import.meta.env.VITE_BACKEND_API
const emailField = ref()
const passwordField = ref()
const image = ref()
const loginBtn = ref()
const router = useRouter()
VueCookies.remove('token');
VueCookies.remove('user');
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
                router.push('/dashboard')
            }, 1000);
        }
    } catch (error) {
        emailField.value.disabled = false;
        passwordField.value.disabled = false;
        loginBtn.value.disabled = false;
    }
}
</script>