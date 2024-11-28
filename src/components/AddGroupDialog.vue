<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Add Group</h2>
      <div class="py-2">
        <Alert :status="alertData.status" :msg="alertData.msg"></Alert>
      </div>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name<span
              class="text-red-400">*</span></label>
          <input v-model="group.name" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.name }}</div>
        </div>
        <div class="mb-4">
          <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
          <input v-model="group.location" type="text" id="location" placeholder="Enter Location"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.location }}</div>
        </div>
        <div class="mb-4">
          <label for="users" class="block text-sm font-medium text-gray-700">Notify to<span
            class="text-red-400">*</span></label>
          <Dropdown id="users" filter v-model="group.notifyTo" :options="users" optionLabel="name" optionValue="uuid"
            placeholder="Select User" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
            <template #option="slotProps">
              <div class="flex align-items-center">
                <Avatar :image="slotProps.option.avatar == '' ? no_image_icon : (BASE_URL + slotProps.option.avatar)"
                  class="mr-2 rounded-xl" />
                {{ slotProps.option.name }} ({{ slotProps.option.identityNumber }})
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="mb4">
          <label for="device" class="block text-sm font-medium text-gray-700">This group Presence in<span
            class="text-red-400">*</span></label>
          <Dropdown id="device" filter v-model="group.device" :options="device" optionLabel="name" optionValue="uuid"
            placeholder="Select User" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
          </Dropdown>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleAddGroup" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
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
import { ref, watch } from 'vue';
import Alert from './Alert.vue';
import Dropdown from 'primevue/dropdown';
import Avatar from 'primevue/avatar';
import no_image_icon from '@/assets/no_images.png';
import { createGroup } from '@/services/Group.services';
const BASE_URL = import.meta.env.VITE_BACKEND_API
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  users: {
    type: Array,
    required: true
  },
  device: {
    type: Array,
    required: true
  }
})
const error = ref({
  name: "",
  location: "",
})
console.table(props.permisions)
const alertSection = ref();
const alertData = ref({ status: '', msg: '' })
const emit = defineEmits(['update:visible', 'group-added'])
const group = ref({
  name: "",
  location: ""
})

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
const handleAddGroup = async () => {
  try {
    alertData.value = { status: 'process', msg: 'Mencoba menambahkan grup!' }
    let response = await createGroup(group.value)
    console.info(group.value)
    alertData.value = { status: response.status, msg: response.msg }
    if (response.validateError)
      error.value = data.validateError
    if (response.status == 'success') {
      setTimeout(() => {
        emit('group-added')
        emit('update:visible', false)
      }, 2000);
    }
    return 0
  } catch (error) {
    console.error('Error adding group:', error)
    alertData.value = { status: 'fail', msg: 'Error ketika nemambahkan grup!' }
  }
}

const resetForm = () => {
  group.value = {
    name: "",
    guardName: "",
    description: "",
  }
  alertData.value = { status: '', msg: '' }
}
</script>

<style scoped></style>