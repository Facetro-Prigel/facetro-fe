<template>
    <div class="transition-all duration-700 z-20  absolute text-center left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-200/90 p-3 flex items-center flex-col justify-center"
        :class="{
            'opacity-0 -top-full': !modalStatus,
            'opacity-100 top-1/2': modalStatus,
        }">
        <button @click="closeModal" :disabled="serverStatus == 'pending'"
            class="text-white absolute text-xl right-3 top-0 bg-red-500 px-2 rounded mt-3 hover:bg-red-700 transtions duration-300 hover:drop-shadow-lg disabled:bg-gray-700"><i
                class="fa fa-times"></i></button>
        <h1 class="text-2xl mb-2 font-bold">Hasil Presensi</h1>
        <div class="rounded-lg bg-gray-300 p-4 flex felx-col drop-shadow-lg transition-all duration-500 items-center ">
            <ImageViewer type="Gambar yang Dibandingkan" :is-success="serverStatus.code == 'success'"
                :bbox="data.serverBbox" :image="data.serverPhoto ?? '/src/assets/videos/search_person.mp4'" />
            <ImageViewer type="Gambar Pembading" :is-success="serverStatus.code == 'success'"
                :bbox="data.clientBbox ?? [0, 0, 0]" :image="data.clientPhoto ?? '/src/assets/video/search_person.mp4'" />
        </div>
        <div class="p-2 mt-5 rounded-xl text-white flex items-center drop-shadow-lg transition-all duration-500" :class="{
            'bg-yellow-500': serverStatus.code == 'pending',
            'bg-green-500': serverStatus.code == 'success',
            'bg-red-500': serverStatus.code == 'fail',
        }">
            <div v-if="serverStatus.code == 'pending'" class="items-center flex text-black">
                <i class="fa fa-spinner animate-spin text-2xl mr-2"></i> Tunggu Sebentar
            </div>
            <div v-if="serverStatus.code == 'success'" class="items-center flex">
                <i class="fa fa-check text-2xl mr-2"></i> Wajah Anda Cocok!
            </div>
            <div v-if="serverStatus.code == 'fail'" class="items-center flex ">
                <i class="fa fa-ban text-2xl mr-2"></i> {{ serverStatus.msg }}
            </div>
        </div>
        <table v-show="serverStatus.code == 'success'" class="text-left mt-6 text-lg">
            <tr v-for="(value, key) in infoData">
                <td>
                    {{ key }}
                </td>
                <td>
                    :
                </td>
                <td class="pl-2">
                    {{ value }}
                </td>
            </tr>
        </table>

    </div>
</template>

<script setup>
import ImageViewer from './ImageViewer.vue';
import { ref, effect, toRaw } from 'vue'
import no_internet_vid from '@/assets/videos/no_internet.mp4'
import no_record_vid from '@/assets/videos/no_record.mp4'
import search_person_vid from '@/assets/videos/search_person.mp4'
import no_face from '@/assets/videos/no_face.mp4'
import can_not_presence_vid from '@/assets/videos/can_not_presence.mp4'
const data = ref({});
const serverStatus = ref({});

const modalStatus = ref(false)
var infoData = ref({});
var now = new Date();
var closeModalObj;
const closeModal = () => {
    modalStatus.value = !modalStatus.value;
    clearTimeout(closeModalObj)
}
effect(() => {

    if (!data.clientPhoto || !data.serverPhoto) {
        if (serverStatus.value.status == 0) {
            data.value.serverPhoto = no_internet_vid
        }
        if (serverStatus.value.status == 400) {
            data.value.serverPhoto = no_face
        }
        if(serverStatus.value.status == 404){
            data.value.serverPhoto = no_record_vid
        }
        if(serverStatus.value.status == 403){
            data.value.serverPhoto = can_not_presence_vid
        }
        if (serverStatus.value.code == 'pending') {
            data.value.serverPhoto = search_person_vid
        }
    }
    if (infoData) {
        infoData.value = toRaw(infoData.value)
    }
})
defineExpose({
    modalStatus,
    data,
    serverStatus,
    closeModalObj,
    infoData
})
</script>