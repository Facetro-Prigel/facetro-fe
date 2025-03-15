<template>
  <div class="flex items-center">
    <input v-if="!qrVisible" class="flex w-[100px]" :type="type" :value="value" disabled>
      <vue-qrcode v-if="qrVisible" :value="value ?? 'Not Yet' " :options="{ width: 250 }"></vue-qrcode>
      <button v-if="showInQr" class="p-1 hover:bg-gray-400 transition-all duration-300 rounded-lg" @click="qrVisible = !qrVisible">
        <i class="pi pi-qrcode"></i>
      </button>
    <button v-if="!qrVisible" class="p-1 hover:bg-gray-400 transition-all duration-300 rounded-lg"
      @click="type == 'password' ? type = 'text' : type = 'password'">
      <i :class="type == 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
    </button>
    <button class="p-1 hover:bg-gray-400 transition-all duration-300 rounded-lg" @click="copyValue"><i
        class="pi pi-copy"></i></button>
    <div v-if="alert.status" class="flex items-center text-sm bg-white z-20 p-2"
      :class="alert.value == 'Copied!' ? 'text-green-500' : 'text-red-500'">
      <i class="pi pi-check mr-1"></i> Copied!
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import VueQrcode from 'vue-qrcode';
const props = defineProps({
  value: {
    require: true,
    type: String
  },
  showInQr:{
    type:Boolean,
    default: false
  }
})
const qrVisible = ref(false)
const alert = ref({ status: false, value: 'Copied!' })
const type = ref('password')
const copyValue = async () => {
  try {
    await navigator.clipboard.writeText(props.value);
    alert.value.status = true
    alert.value.value = 'Copied!'
    setTimeout(() => {
      alert.value.status = false
    }, 3000);
  } catch ($e) {
    alert.value.status = true
    alert.value.value = 'Error!'
    setTimeout(() => {
      alert.value.status = false
    }, 3000);
  }

}
</script>