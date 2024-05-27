<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="flex justify-between items-center bg-primary-400 h-[128px] px-5 lg:px-24 fixed w-full z-10">
        <div>
            <img src="/src/assets/FACETRO.png" style= "width: 257px">
        </div>
        <nav class="flex gap-4 md:gap-10 px-6 md:static items-center ">
            <router-link to="/" class="text-white hover:text-slate-700 text-base font-reguler">Home</router-link>
            <router-link to="/services" class="text-white hover:text-slate-700 text-base font-reguler">Services</router-link>
            <router-link to="/about" class="text-white hover:text-slate-700 text-base font-reguler">About Us</router-link>
            <router-link to="/contact" class="text-white hover:text-slate-700 text-base font-reguler">Contact</router-link>
            <router-link to="/login" class="navigation">
                <button class="bg-primary-500 hover:bg-primary-300 text-white font-reguler py-3 px-10 border-2 border-white rounded shadow">
                    Login
                </button>
            </router-link>
            
        </nav>
        <div class="text-4xl text-black cursor-pointer md:hidden">
            <i class="bi bi-x"></i>
        </div>
    </header>
</template>

<script setup>
import {RouterLink} from 'vue-router'
</script>

<style scoped>
</style>