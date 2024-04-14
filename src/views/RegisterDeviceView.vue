<template>
    <Header/>
    <main class="flex items-center justify-center w-full relative">
        <div class="w-full max-w-[1200px] flex flex-col justify-center items-center">
            <div class="bg-gray-100 my-3 rounded-lg drop-shadow-lg text-center p-5 flex flex-col items-center">
                <h1 class="text-3xl font-bold mb-3">Mendaftarkan Perangkat Presensi</h1>
                <img src="@/assets/verivication_symbol.png" class="w-[250px]" alt="Computer Verification">
                <div class="bg-white w-fit rounded-lg drop-shadow-lg flex flex-row overflow-hidden border border-black">
                    <label for="token" class="m-2">Token:</label>
                    <input type="text" name="token" v-model="data.token" class="rounded-l-lg text-xl px-2 py-1 bg-blue-200">
                </div>
                <button ref="sendBtn" disabled="true" @click="validateToken"  class="mt-2 p-3 rounded-lg  transition duration-300 bg-blue-600  text-white hover:bg-blue-800 disabled:bg-gray-600"><i class="fa fa-paper-plane mr-2"></i>Kirim</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { effect, ref } from 'vue';
import VueCookies from 'vue-cookies';
import { useRouter } from 'vue-router';
import axios from 'axios';
const sendBtn = ref();
const data = ref({token:""});
const router = useRouter();
let config_u = {
      headers: {
        "Content-Type": "application/json",
      }
    }
const validateToken = () =>{
    axios.post('http://localhost:3039/device/register', {token:data.value.token}, config_u).then((response) => {
        let tmpData = response.data
        VueCookies.set('device_token', tmpData.token,"14d")  
        VueCookies.set('device_name', tmpData.name,"14d")  
        router.push({name:"presence"})
    }).catch((error)=>{
        let errorMessage =""
        if (error.response) {
            errorMessage = error.response.status + ': ' + error.response.data.msg
        } else if (error.request) {
            errorMessage = error.request.status + ': ' + error.request.statusText + error.message
            console.error(error.request)
        } else {
            errorMessage = error.message
        }
        alert(errorMessage)
    })
}
effect(()=>{
  if(sendBtn.value){
    if(data.value.token.length > 4){
        sendBtn.value.disabled = false
    }else{
        sendBtn.value.disabled = true
    }
    data.value.token = data.value.token.replace(/[^a-zA-Z0-9]/g, '')
  }
})

</script>

<style lang="scss" scoped>

</style>