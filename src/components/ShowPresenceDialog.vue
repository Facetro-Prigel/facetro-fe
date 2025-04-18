<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Someones's Presence Logs</h2>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        
      </div>
      <div class="flex justify-end mt-4">
        <button @click="$emit('update:visible', false)" class="bg-gray-300 text-black px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast';
const BASE_URL = import.meta.env.VITE_BACKEND_API
const form = ref()
const props = defineProps({
  uuid: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped></style>