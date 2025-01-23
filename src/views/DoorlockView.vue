<script setup>
import DeviceName from '@/components/DeviceName.vue'
import Camera from '@/components/LiveCameraComponent.vue'
import Modal from '@/components/Modal.vue'
import Time from '@/components/Time.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import { goToPresence } from '@/services/Presence.services'
import { useForbiddenStore } from '@/stores/forbidden.js'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import VueCookies from 'vue-cookies'
import { socket } from '../socket'
const idInput = ref({ data: '' })
const ImageFrame = ref(null)
const camera = ref(null)
const modal = ref(false)
const saveBtn = ref(false)
const isCapturing = ref(false)
const hexString = ref('')
const BASE_URL = import.meta.env.VITE_BACKEND_API
var is_finish = false
var cookies

const handleKeydown = (event) => {
  const key = event.key
  if (key === 'w') {
    if (isCapturing.value) {
      // Log hex string when second * is pressed
      hexString.value = hexString.value.toUpperCase().replace(/[^A-F0-9]/g, '')
      sendImage(hexString.value)
      isCapturing.value = false
      hexString.value = ''
    } else {
      // Start capturing after first *
      isCapturing.value = true
    }
  } else if (isCapturing.value) {
    // Append characters to hex string if capturing
    if (/^[0-9A-Fa-f]$/.test(key)) {
      hexString.value += key
    }
  }
}

const { show403 } = useForbiddenStore()
const getImageFrame = (data) => {
  ImageFrame.value = data
}
const countDiff = (deltaTime) => {
  var seconds = Math.floor(deltaTime / 1000)
  var minutes = Math.floor(seconds / 60)
  var hours = Math.floor(minutes / 60)
  seconds %= 60
  minutes %= 60
  return hours + 'jam ' + minutes + 'menit ' + seconds + 'detik'
}
const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
const closeModal = () => {
  if (is_finish) {
    var closeModals = setTimeout(() => {
      modal.value.modalStatus = false
    }, 5000)
    modal.value.closeModalObj = closeModals
  } else {
    setTimeout(() => {
      closeModal()
    }, 2000)
  }
}
const sendImage = (identity) => {
  is_finish = false
  modal.value.data = {}
  modal.value.serverStatus.code = 'pending'
  setTimeout(() => {
    camera.value.emitImage()
    modal.value.modalStatus = true
    modal.value.data.clientPhoto = ImageFrame.value
    let data = {
      image: ImageFrame.value,
      identity: identity ? identity : idInput.value.data
    }
    let config_u = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies}`
      }
    }

    axios
      .post(BASE_URL + 'log', data, config_u)
      .then((response) => {
        let tmpData = response.data.result
        let startTime = new Date(tmpData.startTime)
        let endTime = new Date(tmpData.startTime)
        modal.value.infoData = {
          Nama: tmpData.name,
          Identitas: tmpData.identity,
          Peran: tmpData.role.join(','),
          Grup: tmpData.group.join(','),
          Perangkat: tmpData.device,
          Masuk: convertToLocale(startTime)
        }
        try {
          if (tmpData.endTime) {
            endTime = new Date(tmpData.endTime)
            modal.value.infoData.Keluar = convertToLocale(endTime)
            var timeDifferenceInMillis = endTime.getTime() - startTime.getTime()
            modal.value.infoData.Durasi = countDiff(timeDifferenceInMillis)
          }
        } catch (e) {}
        modal.value.data.serverPhoto = BASE_URL + tmpData.serverData.image
        modal.value.data.serverBbox = tmpData.serverData.bbox
        modal.value.data.clientBbox = tmpData.clientData.bbox
        modal.value.data.clientPhoto = BASE_URL + tmpData.clientData.image
        modal.value.serverStatus = {
          code: tmpData.isMatch ? 'success' : 'fail',
          msg: tmpData.isMatch ? 'Wajah Anda Cocok' : 'Wajah Tidak Cocok'
        }
        idInput.value.data = ''
        is_finish = true
      })
      .catch((error) => {
        is_finish = true
        let errorMessage = ''
        if (error.response) {
          errorMessage = error.response.status + ': ' + error.response.data.msg
          if (error.response.data.reson) {
            show403(error.response.data.msg)
          }
        } else if (error.request) {
          errorMessage = error.request.status + ': ' + error.request.statusText + error.message
          console.error(error.request)
        } else {
          errorMessage = error.message
        }
        modal.value.serverStatus = {
          code: 'fail',
          msg: errorMessage,
          status: error.response ? error.response.status ?? error.request.status : 0
        }
      })
    closeModal()
  }, 200)
}
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  cookies = VueCookies.get('device_token')
  if (!cookies) {
    show403('Device Not Registered')
  }
  socket.on('reload-user-page', () => {
    window.location.reload()
  })
})
watch(
  () => idInput.value.data.length,
  (newVal) => {
    idInput.value.data = idInput.value.data.replace(/[^0-9]/g, '')
    saveBtn.value.disabled = true
    if (newVal > 5) {
      saveBtn.value.disabled = false
    }
  }
)
</script>

<template>
  <main class="flex items-center justify-center w-full relative h-screen">
    <div class="w-full max-w-[1200px] flex flex-col justify-center items-center">
      <!-- Tulisan Halaman Doorlock -->
      <h1 class="text-4xl font-bold text-center mt-6 mb-4">Halaman Doorlock</h1>
      <TitleComponent title="UNNESTech" subtitle="Doorlock" />
      <Modal ref="modal" />
      <div
        class="flex items-center flex-col md:flex-row justify-center w-full drop-shadow-xl bg-gray-100 mt-8 p-2 md:pr-10 rounded-2xl py-5"
      >
        <div class="md:hidden text-3xl font-bold mt-4">
          <img
            src="/src/assets/logo/logo-unnes-horizontal.png"
            alt=""
            style="width: 350px; height: auto"
            class="invert"
          />
        </div>
        <div class="w-[700px] md:w-[500px]">
          <Camera @image-frame="getImageFrame" ref="camera" />
        </div>
        <div class="ml-4 flex flex-col items-center md:items-start justify-center">
          <div class="mb-2 md:mb-1">
            <DeviceName />
          </div>
          <Time />
          <label for="identitas" class="text-3xl md:text-2xl mt-2"
            ><i class="pi pi-id-card"></i> Indentitas (NIM/NIP)</label
          >
          <input
            v-on:keyup.enter="sendImage()"
            type="text"
            v-model="idInput.data"
            class="w-full mt-2 text-2xl rounded-md border border-black px-3"
          />
          <button
            @click="sendImage()"
            disabled="false"
            ref="saveBtn"
            class="bg-blue-700 transition duration-300 text-white py-2 mt-2 px-3 rounded-lg disabled:bg-gray-500 hover:bg-blue-900 hover:drop-shadow-lg"
          >
            <i class="pi pi-save mr-2"></i>Simpan
          </button>
          <button
            @click="goToPresence"
            class="bg-green-700 transition duration-300 text-white py-2 mt-2 px-4 rounded-lg hover:bg-green-900 hover:drop-shadow-lg"
          >
            <i class="pi pi-lock mr-2"></i>Presensi
          </button>
        </div>
      </div>
      <div class="mt-5 bg-gray-300 p-4 rounded-lg drop-shadow-lg flex flex-row">
        <img
          src="@/assets/logo/facetro_black.png"
          alt="facetro_black Logo"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110"
        />
        <img
          src="@/assets/logo/REMOSTO.png"
          alt="REMOSTO Logo"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110"
        />
        <img
          src="@/assets/logo/SPARKA.png"
          alt="SPARKA Logo"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110"
        />
        <img
          src="@/assets/logo/Capstone.png"
          alt="Capstone Teknik Komputer"
          class="h-[40px] mx-3 transition-all duration-300 hover:scale-110"
        />
      </div>
    </div>
  </main>
</template>
