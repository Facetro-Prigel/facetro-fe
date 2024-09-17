<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Add Permission</h2>
      <div class="py-2">
        <Alert :status="alertData.status" :msg="alertData.msg"></Alert>
      </div>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name<span
              class="text-red-400">*</span></label>
          <input v-model="permission.name" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.name }}</div>
        </div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Guard Name </label>
          <input v-model="permission.guardName" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.guadName }}</div>
        </div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="permission.description" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.description }}</div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleAddPermission" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
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
import { createPermission } from '@/services/Permission.services.js';
import Alert from './Alert.vue';
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
const error = ref({
  name: "",
  guadName: "",
  description: ""
})
const alertSection = ref();
const alertData = ref({ status: '', msg: '' })
const emit = defineEmits(['update:visible', 'permission-added'])
const permission = ref({
  name: "",
  guadName: "",
  description: ""
})

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
const handleAddPermission = async () => {
  try {
    alertData.value = { status: 'process', msg: 'Mencoba menambahkan izin!' }
    let response = await createPermission(permission.value)
    console.info(response )
    alertData.value = { status: response.status, msg: response.msg }
    if (response.validateError)
      error.value = data.validateError
    if (response.status == 'success') {
      setTimeout(() => {
        emit('permission-added')
        emit('update:visible', false)
      }, 2000);
    }
    return 0
  } catch (error) {
    console.error('Error adding user:', error)
    alertData.value = { status: 'fail', msg: 'Error ketika nemambahkan izin!' }
  }
}

const resetForm = () => {
  permission.value = {
    name: "",
    guadName: "",
    description: "",
  }
  alertData.value ={ status: '', msg: '' }
}
</script>

<style scoped></style>