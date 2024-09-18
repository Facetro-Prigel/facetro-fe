<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Edit Role</h2>
      <div class="py-2">
        <Alert :status="alertData.status" :msg="alertData.msg"></Alert>
      </div>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name<span
              class="text-red-400">*</span></label>
          <input v-model="role.name" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.name }}</div>
        </div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Guard Name </label>
          <input v-model="role.guardName" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.guardName }}</div>
        </div>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="role.description" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.description }}</div>
        </div>
        <div class="mb-4">
            <label for="group" class="block text-sm font-medium text-gray-700">Permission</label>
            <MultiSelect v-model="role.permisions" :options="permisions.value" optionValue="uuid"
              optionLabel="label" filter placeholder="Select "
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
              <template #footer>
                <div class="py-2 px-4">
                  <b>{{ role.permisions ? role.permisions.length : 0 }}</b> Permission{{ (role.permisions ?
                    role.permisions.length : 0) > 1 ? 's' : '' }} selected.
                </div>
              </template>
            </MultiSelect>

          </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleAddRole" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
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
import { ref, watch } from 'vue'
import MultiSelect from 'primevue/multiselect'
import { fetchRole, updateRole } from '@/services/Role.services'
import Alert from './Alert.vue';
const props = defineProps({
  uuid:{
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  },
  permisions: {
    type: Array,
    required: true
  }
})
const error = ref({
  name: "",
  guardName: "",
  description: "",
})
console.table(props.permisions)
const alertSection = ref();
const alertData = ref({ status: '', msg: '' })
const emit = defineEmits(['update:visible', 'role-added'])
const role = ref({
  name: "",
  guardName: "",
  description: "",
  permisions:[]
})

watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    resetForm()
  }
  const response = await fetchRole(props.uuid)
  if(response.status == 'success'){
      role.value =response.data
  }else{
    alertData.value = { status: response.status, msg: response.msg }
  }
})
const handleAddRole = async () => {
  try {
    alertData.value = { status: 'process', msg: 'Mencoba menambahkan peran!' }
    console.table(role.value)
    let response = await updateRole(props.uuid, role.value)
    console.info(response)
    alertData.value = { status: response.status, msg: response.msg }
    if (response.validateError)
      error.value = data.validateError
    if (response.status == 'success') {
      setTimeout(() => {
        emit('role-added')
        emit('update:visible', false)
      }, 2000);
    }
    return 0
  } catch (error) {
    console.error('Error adding role:', error)
    alertData.value = { status: 'fail', msg: 'Error ketika nemambahkan peran!' }
  }
}

const resetForm = () => {
  role.value = {
    name: "",
    guardName: "",
    description: "",
    permisions:[]
  }
  alertData.value ={ status: '', msg: '' }
}
</script>

<style scoped></style>