<template>
    <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md w-[50%]">
        <h2 class="text-lg font-semibold mb-4">Add User</h2>
        <hr class="border-purple-500 mb-4" />
        <div class="flex">
          <div class="w-1/2 pr-4">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="user.name" type="text" id="name" placeholder="Enter name"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4">
              <label for="identityNumber" class="block text-sm font-medium text-gray-700">Identity Number</label>
              <input v-model="user.identityNumber" type="text" id="identityNumber" placeholder="Enter identity number"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4">
              <label for="group" class="block text-sm font-medium text-gray-700">Group</label>
              <MultiSelect v-model="user.usergroup" :options="groupOptions" placeholder="Select group"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <Dropdown v-model="user.roleuser" :options="roleOptions" placeholder="Select role"
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            </div>
          </div>
          <div class="w-1/2">
            <div class="mb-4">
              <label for="avatar" class="block text-sm font-medium text-gray-700">Avatar</label>
              <input type="file" id="avatar" accept="image/*" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" @change="handleAvatarUpload" />
            </div>
            <div class="flex justify-end mt-4">
              <button @click="handleAddUser" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
                Add
              </button>
              <button @click="$emit('update:visible', false)" class="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import MultiSelect from 'primevue/multiselect'
  import Dropdown from 'primevue/dropdown'
  import { createUser } from '@/services/User.services'
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    },
    groupOptions: {
      type: Array,
      required: true
    },
    roleOptions: {
      type: Array,
      required: true
    }
  })
  
  const emit = defineEmits(['update:visible', 'user-added'])
  
  const user = ref({
    name: '',
    identityNumber: '',
    usergroup: [],
    roleuser: null,
    avatar: ''
  })
  
  watch(() => props.visible, (newVal) => {
    if (!newVal) {
      resetForm()
    }
  })
  
  const handleAddUser = async () => {
    try {
      const avatarUrl = 'https://via.placeholder.com/150' // Simulasi URL avatar
  
      const userData = {
        ...user.value,
        avatar: avatarUrl
      }
  
      await createUser(userData)
      emit('user-added')
      emit('update:visible', false)
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }
  
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        user.value.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  const resetForm = () => {
    user.value = {
      name: '',
      identityNumber: '',
      usergroup: [],
      roleuser: null,
      avatar: ''
    }
  }
  </script>
  
  <style scoped>
  </style>
  