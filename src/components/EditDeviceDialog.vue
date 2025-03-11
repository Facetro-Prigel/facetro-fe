<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Edit Device</h2>
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
        <div class="mb-4">
          <h3 class="block text-sm font-medium text-gray-700">Groups that are pressence on this device</h3>
          <div class="flex flex-wrap">
            <Chip v-for="item in device.presence_group" :key="index" class="py-0 pl-0 pr-4 m-1">
              <span
                class="bg-primary-500 text-white rounded-full p-2 flex items-center justify-center m-2"><i class="pi pi-users"></i></span>
              <span class="mr-2 text-sm">{{ item.group.name }}</span>
            </Chip>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="block text-sm font-medium text-gray-700">Groups that are open doorlock on this device</h3>
          <div class="flex flex-wrap">
            <Chip v-for="item in device.door_group" :key="index" class="py-0 pl-0 pr-4 m-1">
              <span
                class="bg-primary-500 text-white rounded-full p-2 flex items-center justify-center m-2"><i class="pi pi-users"></i></span>
              <span class="mr-2 text-sm">{{ item.group.name }}</span>
            </Chip>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleEditDevice" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
          Update
        </button>
        <button @click="$emit('update:visible', false)" class="bg-gray-300 text-black px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { fetchDevice, updateDevice } from '@/services/Device.services'
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  uuid: {
    type: String,
    required: true
  }
})
const error = ref({
  name: "",
  locations: "",
  token: ""
})
const emit = defineEmits(['update:visible', 'permission-added'])
const device = ref({
  name: "",
  locations: "",
})

watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    resetForm()
  }
  const response = await fetchDevice(props.uuid)
  if (!response.title) {
    device.value = response
  }
})
const handleEditDevice = async () => {
  try {
    if(device.value.presence_group.length){
      delete device.value.presence_group
    }
    if(device.value.door_group.length){
      delete device.value.door_group
    }
    let response = await updateDevice(props.uuid, device.value)
    if (response.validateError){
      error.value = data.validateError
    }else{
      setTimeout(() => {
        emit('device-added')
        emit('update:visible', false)
      }, 1000);
    }
    return 0
  } catch (error) {
    console.error('Error updateting device:', error)
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