<template>
    <div class="relative flex flex-col justify-center items-center w-full text-center  h-screen">
        <div class="absolute h-screen w-screen bg-black z-10 overflow-hidden">
            <video class="w-screen" autoplay playsinline loop disablepictureinpicture muted
                poster="@/assets/loginAnimationPoster.png">
                <source src="@/assets/videos/videoBG.mp4" type="video/mp4">
            </video>
        </div>
        <div class='z-20 p-5 bg-white/75 rounded-xl flex flex-col justify-center items-center w-1/2'>
            <img src="/src/assets/logo/facetro_black.png" alt="Logo Facetro" class="w-1/4 inline ">
            <h1 class="text-4xl font-bold mt-2">UNNESTech Headquarters</h1>
            <h2 class="text-3xl my-3">Realtime Member Attendance</h2>
            <Time />
        </div>
        <Dialog :visible="modal" pt:root:class="!border-0 !bg-transparent !p-0" pt:mask:class="backdrop-blur-sm">
            <template #container="{ closeCallback }">
                <Card style="width: 25rem; overflow: hidden">
                    <template #header>
                        <ImageViewer type="Gambar Presensi" :is-success="true"
                        :bbox="data.bbox ?? [0, 0, 0]" :image="BASE_URL +'photos/'+ data.photo" />
                    </template>
                    <template #title>{{ data.name }}</template>
                    <template #subtitle>
                        <div class="text-md font-bold" >
                            {{ convertToLocale(new Date(data.time)) }}
                        </div>
                        <div class="text-md">
                            Presensi di {{ data.device }}
                        </div>
                    </template>
                    <template #content>
                            <Chip v-for="x in data.project" :key="index" class="p-1 m-1">
                                <span
                                    class="bg-primary-500 text-white rounded-full flex p-1 items-center justify-center m-2 text-[10px]"><i
                                        class="pi pi-users"></i></span>
                                <span class="mr-2 text-[10px]">{{ x }}</span>
                            </Chip>
                    </template>
                    <template #footer>
                        <button class="btn bg-red-500 text-white p-2 rounded-lg drop-shadow-lg mb-2" @click="modal=false">Tutup ({{ n }}s)</button>
                    </template>
                </Card>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { socket } from "@/socket";
import Time from "@/components/Time.vue";
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import ImageViewer from "@/components/ImageViewer.vue";
const BASE_URL = import.meta.env.VITE_BACKEND_API
const modal = ref(false)
const convertToLocale = (time) => {
    return time.toLocaleString('id-ID', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeStyle: 'long',
        dateStyle: 'medium'
    })
}
const data = ref({
    name: "Fahlul",
    project: ['REMOT', 'FACE', 'MAKAN'],
    device: "Ruang Uji Coba",
    photo: "",
    time: new Date(),
    bbox: [0,0,200]
})
const n = ref(15)
const closeModal = () => {
    if (n.value == 0) {
        modal.value = false
        n.value = 15
    } else {
        setTimeout(() => {
            n.value -= 1
            closeModal()
        }, 1000);
    }
}
onMounted(() => {
    socket.on("logger update", (...args) => {
        data.value = args[0]
        let y = data.value.project
        data.value.project = y.sort((a, b) => a.length - b.length)
        modal.value = true
        closeModal()
    });
})
</script>

<style lang="scss" scoped></style>