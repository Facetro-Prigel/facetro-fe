<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Edit Permission</h2>
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
          <label for="guard_name" class="block text-sm font-medium text-gray-700">Guard Name </label>
          <input v-model="permission.guardName" type="text" id="guard_name" placeholder="Enter Guard Name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.guardName }}</div>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="permission.description" type="text" id="description" placeholder="Enter description"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.description }}</div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleAddPermission" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
          Edit
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
import { fetchPermission, updatePermission } from '@/services/Permission.services.js';
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
  guardName: "",
  description: ""
})
const emit = defineEmits(['update:visible', 'permission-added'])
const permission = ref({
  name: "",
  guardName: "",
  description: ""
})

watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    resetForm()
  }
  const response = await fetchPermission(props.uuid)
  if(response.status == 'success'){
      permission.value =response.data
  }else{
    toast.add({ severity: response.status == 'fail' ? 'error' : 'success', summary: response.msg , life: 3000 });
  }
})
const handleAddPermission = async () => {
  try {
    toast.add({ severity: 'warn', summary: 'Mencoba mengubah izin!' , life: 3000 });
    let response = await updatePermission(props.uuid, permission.value)
    console.info(response)
    toast.add({ severity: response.status == 'fail' ? 'error' : 'success', summary: response.msg , life: 3000 });
    if (response.validateError)
      error.value = data.validateError
    if (response.status == 'success') {
      emit('permission-added')
      emit('update:visible', false)
    }
    return 0
  } catch (error) {
    console.error('Error adding user:', error)
    toast.add({ severity: 'error', summary: 'Error ketika mengubah izin!' , life: 3000 });
  }
}

const resetForm = () => {
  permission.value = {
    name: "",
    guardName: "",
    description: "",
  }
}
</script>

<style scoped></style>