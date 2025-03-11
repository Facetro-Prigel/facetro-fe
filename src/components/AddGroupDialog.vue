<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Add Group</h2>
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
          <input v-model="group.locations" type="text" id="location" placeholder="Enter Location"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.locations }}</div>
        </div>
        <div class="mb-4">
          <label for="users" class="block text-sm font-medium text-gray-700">Notify to<span
            class="text-red-400">*</span></label>
          <Dropdown id="users" filter v-model="group.users" :options="users" optionLabel="name" optionValue="uuid"
            placeholder="Select User" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
            <template #option="slotProps">
              <div class="flex align-items-center">
                <Avatar :image="slotProps.option.avatar == '' ? no_image_icon : (BASE_URL +'avatar/'+ slotProps.option.avatar)"
                  class="mr-2 rounded-md" />
                {{ slotProps.option.name }} ({{ slotProps.option.identity_number }})
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="mb-4">
          <label for="device" class="block text-sm font-medium text-gray-700">This group presence in<span
            class="text-red-400">*</span></label>
          <MultiSelect id="device" filter v-model="group.presence_device" :options="device" optionLabel="name" optionValue="uuid"
            placeholder="Select User" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
          </MultiSelect>
        </div>
        <div class="mb-4">
          <label for="device" class="block text-sm font-medium text-gray-700">This group can open door in<span
            class="text-red-400">*</span></label>
          <MultiSelect id="device" filter v-model="group.door_device" :options="device" optionLabel="name" optionValue="uuid"
            placeholder="Select User" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
          </MultiSelect>
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
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect'
import Avatar from 'primevue/avatar';
import no_image_icon from '@/assets/no_images.png';
import { createGroup } from '@/services/Group.services';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
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
  locations: "",
})
console.table(props.permisions)
const emit = defineEmits(['update:visible', 'group-added'])
const group = ref({
  name: "",
  locations: ""
})

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
const handleAddGroup = async () => {
  try {
    let response = await createGroup(group.value)
    if (response.validateError){
      error.value = data.validateError
    }else{
      emit('group-added')
      emit('update:visible', false)
    }
    
    return 0
  } catch (error) {
    console.error('Error adding group:', error)
  }
}

const resetForm = () => {
  group.value = {
    name: "",
    guard_name: "",
    description: "",
  }
}
</script>

<style scoped></style>