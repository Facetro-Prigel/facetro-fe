<script setup>
import TitleComponent from '@/components/TitleComponent.vue';
import Camera from '@/components/LiveCameraComponent.vue';
import DeviceName from '@/components/DeviceName.vue'
import Modal from '@/components/Modal.vue';
import Time from '@/components/Time.vue';
import { ref, onMounted, effect } from 'vue'
import axios from 'axios';
import VueCookies from 'vue-cookies'
import { useForbiddenStore } from '@/stores/forbidden.js';
import BASE_URL from '@/stores/config'

const idInput = ref({ data: "" })
const ImageFrame = ref(null)
const camera = ref(null)
const modal = ref(false)
const saveBtn = ref(false)
const { show403 } = useForbiddenStore()
const getImageFrame = (data) => {
  ImageFrame.value = data
}
var cookies
const countDiff = (deltaTime) => {
  var seconds = Math.floor(deltaTime / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  seconds %= 60;
  minutes %= 60;
  return hours + "jam " + minutes + "menit " + seconds + "detik"
}
const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
var is_finish = false
const closeModal = () =>{
  if(is_finish){
    var closeModals = setTimeout(() => {
        modal.value.modalStatus = false
      }, 5000)
    modal.value.closeModalObj = closeModals
  }else{
    setTimeout(()=>{
      closeModal()
    }, 2000)
  }
  
}
const sendImage = () => {
  is_finish = false
  modal.value.data = {};
  modal.value.serverStatus.code = "pending"
  setTimeout(() => {
    camera.value.emitImage()
    modal.value.modalStatus = true
    modal.value.data.clientPhoto = ImageFrame.value
    let data = {
      "image": ImageFrame.value,
      "identity": idInput.value.data
    }
    let config_u = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies}`
      }
    }
     
    axios.post(BASE_URL+'log', data, config_u).then((response) => {
      let tmpData = response.data.result
      let startTime = new Date(tmpData.startTime)
      let endTime = new Date(tmpData.startTime)
      modal.value.infoData = {
        "Nama": tmpData.name,
        "Identitas": tmpData.identity,
        "Peran": tmpData.role.join(","),
        "Grup": tmpData.group.join(","),
        "Perangkat": tmpData.device,
        'Masuk': convertToLocale(startTime)
      }
      try {
        if (tmpData.endTime) {
          endTime = new Date(tmpData.endTime)
          modal.value.infoData.Keluar = convertToLocale(endTime)
          var timeDifferenceInMillis = endTime.getTime() - startTime.getTime();
          modal.value.infoData.Durasi = countDiff(timeDifferenceInMillis)
        }
      } catch (e) { }
      modal.value.data.serverPhoto = BASE_URL + tmpData.serverData.image
      modal.value.data.serverBbox = tmpData.serverData.bbox
      modal.value.data.clientBbox = tmpData.clientData.bbox
      modal.value.data.clientPhoto =  BASE_URL + tmpData.clientData.image
      modal.value.serverStatus = {
        'code': tmpData.isMatch ? "success" : "fail",
        'msg': tmpData.isMatch ? "Wajah Anda Cocok" : "Wajah Tidak Cocok"
      };
      idInput.value.data = ''
      is_finish = true
    }).catch((error) => {
      is_finish = true
      let errorMessage = '';
      if (error.response) {
        errorMessage = error.response.status + ': ' + error.response.data.msg
        if (error.response.data.reson){
            show403(error.response.data.msg)
        }
      } else if (error.request) {
        errorMessage = error.request.status + ': ' + error.request.statusText + error.message
        console.error(error.request)
      } else {
        errorMessage = error.message
      }
      modal.value.serverStatus = { 'code': "fail", 'msg': errorMessage, "status": error.response ? error.response.status ?? error.request.status : 0};
    });
    closeModal()
  }, 200)
}
onMounted(
  () => {
    cookies = VueCookies.get('device_token');
    if (!cookies) {
      show403("Device Not Registered")
    }
  }
)
effect(() => {
  if (saveBtn.value) {
    if (idInput.value.data.length > 4) {
      saveBtn.value.disabled = false
    } else {
      saveBtn.value.disabled = true
    }
    if(idInput.value.data.indexOf('*') > 0 ){
      sendImage()
    }
    idInput.value.data = idInput.value.data.replace(/[^A-F0-9]/g, '')
  }
})
</script>

<template>
  <Header />
  <main class="flex items-center justify-center w-full relative">
    <div class="w-full max-w-[1200px] flex flex-col justify-center items-center">
      <TitleComponent title="UNNESTech" subtitle="Presence" />
      <Modal ref="modal" />
      <div class="flex items-center justify-center w-full drop-shadow-xl bg-gray-100 mt-8 p-2 pr-10 rounded-2xl">
        <div class="w-[500px]">
          <Camera @image-frame="getImageFrame" ref="camera" />
        </div>
        <div class="ml-4 flex flex-col items-start justify-center">
          <DeviceName/>
          <Time/>
          <label for="identitas" class="text-2xl mt-2"><i class="fa fa-address-card"></i> <i
              class="fa-brands fa-nfc-symbol"></i> Indentitas (NIM/NIP)</label>
          <input v-on:keyup.enter="sendImage" type="text" v-model="idInput.data" class="w-full mt-2 text-2xl rounded-md border border-black px-3">
          <button @click="sendImage" disabled="true" ref="saveBtn"
            class="bg-blue-700 transition duration-300 text-white py-2 mt-2 px-3 rounded-lg disabled:bg-gray-500  hover:bg-blue-900 hover:drop-shadow-lg ">
            <i class="fa fa-save mr-2"></i>Simpan</button>
        </div>
      </div>
      <div class="mt-5 bg-gray-300 p-4 rounded-lg drop-shadow-lg flex flex-row ">
        <img src="@/assets/logo/facetro_black.png" alt="facetro_black Logo"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110">
        <img src="@/assets/logo/REMOSTO.png" alt="REMOSTO Logo"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110">
        <img src="@/assets/logo/SPARKA.png" alt="SPARKA Logo"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110">
        <img src="@/assets/logo/Capstone.png" alt="Capstone Teknik Komputer"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110">
      </div>
    </div>
  </main>
</template>
