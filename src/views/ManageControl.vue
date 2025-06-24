<template>
  <div class="flex flex-col h-[150vh] bg-gray-100 p-5">
    <!-- Header -->
    <header class="pb-3 text-center rounded-lg">
      <h1 class="text-2xl font-poppins font-bold text-gray-700">Pilih Sistem</h1>
    </header>

    <main class="flex flex-col items-center justify-start flex-grow space-y-6">
      <!-- Kartu User -->
      <div v-if="user.name" class="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
        <div class="grid grid-cols-[4fr_2fr] gap-4">
          <!-- ID Card -->
          <div class="flex items-center space-x-4">
            <img class="w-[128px] h-[128px] rounded-lg" :src="avatar ? avatar : no_image_icon" :alt="`Avatar of ${user.name}`">
            <div>
              <h2 class="text-2xl font-poppins font-bold">Selamat Datang</h2>
              <p class="font-poppins font-bold text-gray-800">{{ user.name }}</p>
              <p class="font-poppins font-semibold text-gray-800">{{ user.identity_number }}</p>
              <p class="font-poppins font-bold text-black">{{ formattedDate }}</p>
              <p class="font-poppins font-bold text-black">🕒 {{ currentTime }}</p>
            </div>
          </div>

          <!-- Grup Pengguna -->
          <div>
            <h2 class="text-lg font-poppins font-bold">👥 Grup Pengguna</h2>
            <div class="flex flex-wrap">
              <div
                v-for="(group, index) in groupMembers"
                :key="index"
                class="bg-primary-500 text-white rounded-full flex p-2 items-center justify-center m-1 text-[11px]"
              >
                <i class="pi pi-users text-white text-xl mr-2"></i>
                <span class="font-semibold">{{ group.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pemilihan Sistem dan Tentang Sistem -->
      <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto">
        <div class="space-y-8">
          <!-- Pemilihan Sistem -->
          <div class="rounded-lg flex flex-col items-center space-y-4">
            <h2 class="text-lg font-poppins font-bold text-gray-800">Silakan pilih sistem untuk melanjutkan</h2>

            <div class="flex gap-14">
              <!-- SIPRES -->
              <div class="flex flex-col items-center space-y-1">
                <img
                  src="@/assets/Icon Presensi.png"
                  alt="SIPRES"
                  class="w-32 h-auto bg-orange-500 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  @click="pilihSistem('sipres')"
                />
                <p class="text-sm font-poppins font-semibold text-gray-700">SIPRES</p>
                <p class="text-sm font-poppins text-gray-700">(Sistem Informasi Presensi)</p>
              </div>

              <!-- SILOK -->
              <div class="flex flex-col items-center space-y-1">
                <img
                  src="@/assets/Icon DoorLock.png"
                  alt="SILOK"
                  class="w-32 h-auto bg-purple-500 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                  @click="pilihSistem('silok')"
                />
                <p class="text-sm font-poppins font-semibold text-gray-700">SILOK</p>
                <p class="text-sm font-poppins text-gray-700">(Sistem Informasi DoorLock)</p>
              </div>
            </div>
          </div>

          <!-- Tentang Sistem -->
          <div class="border-t pt-6">
            <h2 class="text-lg font-poppins font-bold text-primary-500 mb-4">
              <i class="pi pi-info-circle mr-2"></i>
              Tentang Sistem
            </h2>
            <ul class="space-y-0 list-none pl-6">
              <li class="flex items-start">
                <span class="font-semibold mr-2">• SIPRES</span>
                <span class="text-gray-600">- Sistem Informasi Presensi</span>
              </li>
              <li class="flex items-start">
                <span class="font-semibold mr-2">• SILOK</span>
                <span class="text-gray-600">- Sistem Informasi Doorlock</span>
              </li>
              <li class="text-gray-600 italic mt-2">
                Pastikan Anda memilih sistem yang sesuai
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
import { getUserProfile } from '@/services/MyProfile.services'
import no_image_icon from '@/assets/no_images.png'
import loadingImg from '@/assets/loading.gif'

const router = useRouter()
const BASE_URL = import.meta.env.VITE_BACKEND_API

const user = ref({
  name: '',
  identity_number: '',
  user_group: []
})
const avatar = ref(loadingImg)
const groupMembers = ref([])

const currentTime = ref('')

// Mengatur tanggal dalam bahasa Indonesia
const formattedDate = computed(() => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return new Date().toLocaleDateString('id-ID', options)
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const pilihSistem = (sistem) => {
  VueCookies.set('hasSelectedSystem', true)
  VueCookies.set('selectedSystem', sistem)
  router.push('/dashboard')
}

const fetchUserProfile = async () => {
  const token = VueCookies.get('token')
  try {
    const response = await getUserProfile(token)
    if (response) {
      user.value.name = response.name
      user.value.identity_number = response.identity_number
      groupMembers.value = response.user_group.map(group => ({
        name: group.group.name,
        photo: group.group.photo || no_image_icon
      }))
      if (response.avatar) {
        avatar.value = BASE_URL + 'avatar/' + response.avatar
      }
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchUserProfile()
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style> 