<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Edit Group</h2>
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
        <div class="mb-4">
          <label for="device" class="block text-sm font-medium text-gray-700">This group Presence in<span
            class="text-red-400">*</span></label>
          <Dropdown id="device" filter v-model="group.device" :options="device" optionLabel="name" optionValue="uuid"
            placeholder="Select User" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
          </Dropdown>
        </div>
        <div class="mb-4">
          <h3 class="block text-sm font-medium text-gray-700">People in this group:</h3>
          <div class="flex flex-wrap">
            <Chip v-for="item in group.member" :key="index" class="py-0 pl-0 pr-4 m-1 drop-shadow-lg bg-primary-500 text-white">
              <img :src="item.avatar == '' ? no_image_icon : (BASE_URL + item.avatar)" :alt="item.name" :titile="item.name" class="m-2 flex w-[40px] drop-shaow-md rounded-lg">
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
import Alert from './Alert.vue';
import Dropdown from 'primevue/dropdown';
import Avatar from 'primevue/avatar';
import no_image_icon from '@/assets/no_images.png';
import { updateGroup, fetchGroup } from '@/services/Group.services';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
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

watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    resetForm()
  }
  const response = await fetchGroup(props.uuid)
  console.info(response)
  if (response.status == 'success') {
    group.value = response.data
  } else {
    toast.add({ severity: response.status, summary: response.msg, life: 3000 });
  }
})
const handleEditGroup = async () => {
  try {
    toast.add({ severity: 'warn', summary: 'Mencoba menyuting grup!', life: 3000 });
    let response = await updateGroup(props.uuid, group.value)
    console.info('ini', group.value)
    toast.add({ severity: response.status, summary: response.msg, life: 3000 });
    if (response.validateError)
      error.value = data.validateError
    if (response.status == 'success') {
        emit('group-added')
        emit('update:visible', false)
    }
    return 0
  } catch (error) {
    console.error('Error adding group:', error)
    toast.add({ severity: 'error', summary: 'Error ketika menyuting grup!', life: 3000 });
  }
}

const resetForm = () => {
  group.value = {
    name: "",
    guardName: "",
    description: "",
  }
}
</script>

<style scoped></style>