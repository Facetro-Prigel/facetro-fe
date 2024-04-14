<template>
    <div class="h-screen relative">
    <TitleComponent title="UNNESTech" subtitle="Akses dilarang" />
    <GeneralHeader/>
    <main class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 class="text-8xl font-extrabold text-red-600">403</h1>
        <h2 class="text-2xl font-bold text-white bg-red-600">Forbidden!!</h2>
        <h3 v-if="reason" class="text-xl font-bold text-white bg-black mt-2">{{ reason }}</h3>
    </main>
    </div>
</template>

<script setup>
import GeneralHeader from '@/components/GeneralHeader.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import { ref, onMounted } from 'vue';
import { useForbiddenStore } from '@/stores/forbidden.js'
import { useRouter } from 'vue-router';
const reason = ref();
const { forbidden }= useForbiddenStore();
const router = useRouter();
onMounted(()=>{
    reason.value = forbidden.message ?? ""
    if(!forbidden.message){
        router.push("/")
    }
})
</script>