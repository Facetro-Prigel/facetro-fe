<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4">Edit Group</h2>
      <div class="py-2">
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
                <Avatar :image="slotProps.option.avatar == '' ? no_image_icon : (BASE_URL + 'avatar/' +slotProps.option.avatar)"
                  class="mr-2 rounded-xl" />
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
        <div class="mb-4">
          <h3 class="block text-sm font-medium text-gray-700">People in this group:</h3>
          <div class="flex flex-wrap">
            <Chip v-for="item in group.member" :key="index" class="py-0 pl-0 pr-4 m-1 drop-shadow-lg bg-primary-500 text-white">
              <img :src="item.avatar == '' ? no_image_icon : (BASE_URL +'avatar/'+ item.avatar)" :alt="item.name" :titile="item.name" class="m-2 flex w-[40px] drop-shaow-md rounded-lg">
              <span class="mr-2 text-sm">{{ item.name }}</span>
            </Chip>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="handleEditGroup" ref="addButton" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
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
import { ref, watch } from 'vue';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect'
import Avatar from 'primevue/avatar';
import no_image_icon from '@/assets/no_images.png';
import { updateGroup, fetchGroup } from '@/services/Group.services';
const BASE_URL = import.meta.env.VITE_BACKEND_API
const props = defineProps({
  uuid: {
    type: String,
    required: true
  },
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
const emit = defineEmits(['update:visible', 'group-added'])
const group = ref({
  name: "",
  locations: ""
})

watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    resetForm()
  }
  const response = await fetchGroup(props.uuid)
  group.value = response
})
const handleEditGroup = async () => {
  try {
    let response = await updateGroup(props.uuid, group.value)
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
    locations: ""
  }
}
</script>

<style scoped></style>