<template>
    <div class="flex flex-col justify-center items-center w-full text-center  h-screen">
        <img src="/src/assets/logo/facetro_black.png" alt="Logo Facetro" class="w-1/4 inline ">
        <h1 class="text-4xl font-bold mt-2">UNNESTech Headquarters</h1>
        <h2 class="text-3xl my-3">Realtime Member Attendance</h2>
        <Time />
        <div class="w-screen bg-black/75 absolute h-screen -z-10" v-if="backDrop"></div>
        <dialog id="my_modal_1" class="modal" ref="modal">
            <div class="p-5 rounded-lg drop-shadow-lg">
                <h3 class="font-bold text-3xl mb-2"><i class="pi pi-info-circle text-2xl"></i> Baru Saja Presensi</h3>
                <div class="flex justify-center items-center">
                    <div class="w-1/2 overflow-hidden rounded-lg">
                        <ImageViewer type="Gambar Pembading" :is-success="true" :bbox="[0, 0, 20]"
                            :image="BASE_URL + data.photo" />
                    </div>
                    <div class="w-1/2 flex-col text-left pl-3">
                        <div class="text-2xl font-bold">{{ data.name }}</div>
                        <div class="text-lg bg-black text-white px-2">{{ convertToLocale(new Date(data.time)) }}</div>
                        <div class="text-lg mt-1" v-for="x in data.project">
                            <div>{{ x }}</div>
                        </div>
                        <div class="text-lg">dari {{ data.device }}</div>
                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn bg-red-500 text-white p-2 rounded-lg drop-shadow-lg">Tutup ({{ n }}s)</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { socket } from "@/socket";
import Time from "@/components/Time.vue";
import ImageViewer from '@/components/ImageViewer.vue'
const BASE_URL = import.meta.env.VITE_BACKEND_API
const modal = ref()
const backDrop = ref()
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
    photo: "photos/eVw0rtg3fJyMRxZlsiHjLZM.jpg",
    time: new Date()
})
const n = ref(15)
const closeModal = () => {
    if (n.value == 0) {
        modal.value.open = false
        n.value = 15
        backDrop.value = false
    } else {
        setTimeout(() => {
            n.value -= 1
            closeModal()
        }, 1000);
    }
}
onMounted(() => {
    setTimeout(() => {
        if (!VueCookies.get('token')) {
            router.push({ name: "login" })
        }
    }, 700);
    socket.on("logger update", (...args) => {
        data.value = args[0]
        let y = data.value.project
        data.value.project = y.sort((a, b) => a.length - b.length)
        if (modal.value) {
            modal.value.open = true
            backDrop.value = true
            closeModal()
        }
    });
})
</script>

<style lang="scss" scoped></style>