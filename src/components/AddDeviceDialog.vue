<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-11/12 sm:w-1/2 max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Add Device</h2>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name<span
              class="text-red-400">*</span></label>
          <input v-model="device.name" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.name }}</div>
        </div>
        <div class="mb-4">
          <label for="Location" class="block text-sm font-medium text-gray-700">Location<span
              class="text-red-400">*</span></label>
          <input v-model="device.locations" type="text" id="Location" placeholder="Enter Location"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.locations }}</div>
        </div>
        <div class="mb-4">
          <label for="Token" class="block text-sm font-medium text-gray-700">Token</label>
          <input v-model="device.token" type="text" id="Token" placeholder="Enter Token"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.token }}</div>
        </div>
      </div>
      <div class="flex justify-end mt-2 sm:mt-4 sm:text-lg text-sm">
        <button @click="handleAddDevice" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
          Add
        </button>
        <button @click="$emit('update:visible', false)" class="bg-gray-300 text-black px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createDevice } from '@/services/Device.services'
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
const error = ref({
  name: "",
  locations: "",
  token: ""
})
const emit = defineEmits(['update:visible', 'device-added'])
const device = ref({
  name: "",
  locations: "",
})

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
const handleAddDevice = async () => {
  try {
    let response = await createDevice(device.value)
    if (response.validateError){
      error.value = response.validateError
    }else{
      setTimeout(() => {
        emit('device-added')
        emit('update:visible', false)
      }, 2000);
    
    }
    return 0
  } catch (error) {
    console.error('Error adding device:', error)
  }
}

const resetForm = () => {
  device.value = {
    name: "",
    locations: "",
    token: null
  }
}
</script>

<style scoped></style>