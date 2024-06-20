<template>
    <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md w-[50%] relative">
        <h2 class="text-lg font-semibold mb-4">Edit User</h2>
        <hr class="border-purple-500 mb-4" />
        <!-- Garis ungu selebar kotak dialog -->
        <div class="flex">
          <div class="w-1/2 pr-4">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="userData.name" type="text" id="name" placeholder="Enter name"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4">
              <label for="identityNumber" class="block text-sm font-medium text-gray-700">Identity Number</label>
              <input v-model="userData.identityNumber" type="text" id="identityNumber" placeholder="Enter identity number"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4">
              <label for="group" class="block text-sm font-medium text-gray-700">Group</label>
              <MultiSelect v-model="userData.usergroup" :options="groupOptions" placeholder="Select group"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <Dropdown v-model="userData.roleuser" :options="roleOptions" placeholder="Select role"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
          </div>
          <div class="w-1/2">
            <div class="mb-4">
              <label for="avatar" class="block text-sm font-medium text-gray-700">Avatar</label>
              <input type="file" id="avatar" accept="image/*" @change="handleAvatarChange"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4 flex justify-center items-center h-40 border border-dashed border-gray-300 rounded-lg">
              <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar Preview"
                class="w-full h-full object-cover rounded-lg shadow-md" />
              <span v-else class="text-gray-400 text-sm">Preview will be shown here</span>
            </div>
            <div class="flex justify-end mt-4">
              <button @click="handleUpdateUser" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
                Update
              </button>
              <button @click="closeDialog" class="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, getCurrentInstance } from 'vue'
  import MultiSelect from 'primevue/multiselect'
  import Dropdown from 'primevue/dropdown'
  
  const props = defineProps({
    visible: Boolean,
    user: Object,
    groupOptions: Array,
    roleOptions: Array
  })
  
  const userData = ref({ ...props.user })
  const avatarPreview = ref(null)
  
  const emit = getCurrentInstance().emit
  
  const handleUpdateUser = () => {
    // Perform update logic here
    // Emit event to parent component with updated data
    emit('user-updated', userData.value)
  }
  
  const closeDialog = () => {
    emit('update:visible', false)
  }
  
  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        avatarPreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    } else {
      avatarPreview.value = null
    }
  }
  
  watch(() => props.user, (newValue) => {
    userData.value = { ...newValue }
  })
  </script>
  
  <style scoped>
  </style>
  