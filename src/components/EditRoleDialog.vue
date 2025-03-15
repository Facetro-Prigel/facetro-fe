<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Edit Role</h2>
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
          <label for="guard_name" class="block text-sm font-medium text-gray-700">Guard Name</label>
          <input v-model="role.guard_name" type="text" id="guard_name" placeholder="Enter Guadrd Name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.guard_name }}</div>
        </div>
        <div class="mb-4">
          <label for="Descriotion" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="role.description" type="text" id="Descriotion" placeholder="Enter Descriotion"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.description }}</div>
        </div>
        <div class="mb-4">
            <label for="group" class="block text-sm font-medium text-gray-700">Permission</label>
            <MultiSelect v-model="role.permission_role" :options="permisions.value" optionValue="uuid"
              optionLabel="label" filter placeholder="Select "
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
              <template #footer>
                <div class="py-2 px-4">
                  <b>{{ role.permission_role ? role.permission_role.length : 0 }}</b> Permission{{ (role.permission_role ?
                    role.permission_role.length : 0) > 1 ? 's' : '' }} selected.
                </div>
              </template>
            </MultiSelect>

          </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleEditRole" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
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
  guard_name: "",
  description: "",
})
const alertSection = ref();
const emit = defineEmits(['update:visible', 'role-added'])
const role = ref({
  name: "",
  guard_name: "",
  description: "",
  permission_role:[]
})

watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    resetForm()
  }
  const response = await fetchRole(props.uuid)
  console.log('From server',props.permisions)
  if(!response.title){
      role.value = response
      console.log('Seletced', role.value.permission_role)
  }
})
const handleEditRole = async () => {
  try {
    let response = await updateRole(props.uuid, role.value)
    if (response.validateError){
      error.value = response.validateError
    }else{
      emit('role-added')
      emit('update:visible', false)
    }
    return 0
  } catch (error) {
    console.error('Error adding role:', error)
  }
}

const resetForm = () => {
  role.value = {
    name: "",
    guard_name: "",
    description: "",
    permission_role:[]
  }
}
</script>

<style scoped></style>