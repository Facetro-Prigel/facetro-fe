<template>
    <div class="flex rounded-lg justify-center items-center bg-black text-white border-4 border-black  text-md p-2">
        <div>
            <i class="pi pi-desktop mr-1"></i> {{ deviceName }}
        </div>
        <div class="bg-white ml-2 text-black px-2 rounded font-extrabold">
            <i class="pi pi-wifi" :class="{
                'text-green-800': wifiConection.status == true,
                'text-red-800': wifiConection.status == false
            }"></i> {{ wifiConection.let }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
const config = import.meta.env.VITE_BACKEND_API
const deviceName = ref()
const wifiConection = ref({status:'',let:''})
onMounted(
    () => {
        deviceName.value = VueCookies.get('device_name');
        wifiConection.value.status =false
        const checkConnection = () => {
            let stat = new Date().getTime()
            axios.get(config).then(() => {
                wifiConection.value.status = true
                let end = new Date().getTime()
                wifiConection.value.let = end-stat+"ms"
                console.info("Connections Good")
            }).catch(() => {
                wifiConection.value.let = "Lost"
                wifiConection.value.status = false
                console.info("Poor Connections")
            })
            setTimeout(() => {
                checkConnection()
            }, 10000);
        }
        checkConnection()
    }
)
</script>