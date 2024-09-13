<template>
    <div class="h-screen relative">
    <TitleComponent title="UNNESTech" subtitle="Halaman Tidak Ditemukan" />
    <GeneralHeader/>
    <main class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 class="text-8xl font-extrabold">404</h1>
            <h2 class="text-2xl font-bold text-white bg-black">Page Not Found</h2>
    </main>
    </div>
</template>

<script setup>
import GeneralHeader from '@/components/GeneralHeader.vue';
import TitleComponent from '@/components/TitleComponent.vue';
</script>