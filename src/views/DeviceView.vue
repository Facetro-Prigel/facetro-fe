<template>
  <div class="card p-4">
    <DataTable
      :value="device"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
      <!-- Header template with search and add button -->
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i
              class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              type="text"
              placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10"
            />
          </div>
          <button @click="openAddOrEditDeviceDialog(null)" class="bg-primary-500 text-white px-4 py-2 rounded-md">
            + Add Device
          </button>
        </div>
      </template>

      <!-- Columns definition -->
      <Column field="name" header="Room" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column field="locations" header="Location">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.locations }}</span>
        </template>
      </Column>
      <Column field="token" header="Token" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.token }}</span>
        </template>
      </Column>
      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <button
            @click="openAddOrEditDeviceDialog(slotProps.data)"
            class="text-blue-500 hover:text-blue-700 p-1"
          >
            <i class="pi pi-pencil"></i>
          </button>
          <button
            @click="confirmDeleteDevice(slotProps.data.uuid)"
            class="text-red-500 hover:text-red-700 p-1"
          >
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>

    <!-- Delete Confirmation Dialog -->
    <div
      v-if="isConfirmDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Confirmation</h2>
        <p>Are you sure you want to delete this device?</p>
        <div class="flex justify-end mt-4">
          <button
            @click="handleDeleteDevice(confirmingDeviceId)"
            class="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Yes
          </button>
          <button
            @click="isConfirmDialogVisible = false"
            class="bg-gray-300 text-black px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Device Dialog -->
    <div
      v-if="isAddOrEditDeviceDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md" style="width: 800px;">
        <h2 class="text-lg font-semibold mb-4">{{ isAddingDevice ? 'Add Device' : 'Edit Device' }}</h2>
        <hr class="border-purple-500 mb-4" />
        <form @submit.prevent="isAddingDevice ? handleAddDevice() : handleUpdateDevice()">
          <div class="mb-4">
            <label for="device-name" class="block mb-2">Room</label>
            <input
              v-model="newDevice.name"
              type="text"
              id="device-name"
              placeholder="Room"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label for="device-locations" class="block mb-2">Location</label>
            <input
              v-model="newDevice.locations"
              type="text"
              id="device-locations"
              placeholder="Location"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label for="device-token" class="block mb-2">Token</label>
            <input
              v-model="newDevice.token"
              type="text"
              id="device-token"
              placeholder="Token"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="bg-primary-500 text-white px-4 py-2 rounded mr-2"
            >
              {{ isAddingDevice ? 'Add' : 'Update' }}
            </button>
            <button
              @click="closeAddOrEditDeviceDialog()"
              class="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { fetchDevice, createDevice, updateDevice, deleteDevice } from '@/services/Device.services'

const device = ref([])
const isConfirmDialogVisible = ref(false)
const isAddOrEditDeviceDialogVisible = ref(false)
const isAddingDevice = ref(false)
const confirmingDeviceId = ref(null)
const newDevice = ref({
  name: '',
  locations: '',
  token: ''
})

const getDevice = async () => {
  try {
    const response = await fetchDevice()
    device.value = response
  } catch (error) {
    console.error('Error fetching device:', error)
  }
}

const handleDeleteDevice = async (id) => {
  try {
    await deleteDevice(id)
    getDevice()
    isConfirmDialogVisible.value = false
  } catch (error) {
    console.error('Error deleting device:', error)
  }
}

const confirmDeleteDevice = (id) => {
  confirmingDeviceId.value = id
  isConfirmDialogVisible.value = true
}

const openAddOrEditDeviceDialog = (data) => {
  if (data) {
    // Edit mode
    newDevice.value = { ...data }
    isAddingDevice.value = false
  } else {
    // Add mode
    newDevice.value = { name: '', locations: '', token: '' }
    isAddingDevice.value = true
  }
  isAddOrEditDeviceDialogVisible.value = true
}

const closeAddOrEditDeviceDialog = () => {
  isAddOrEditDeviceDialogVisible.value = false
}

const handleAddDevice = async () => {
  try {
    await createDevice(newDevice.value)
    getDevice()
    isAddOrEditDeviceDialogVisible.value = false
    newDevice.value = { name: '', locations: '', token: '' }
  } catch (error) {
    console.error('Error adding device:', error)
  }
}

const handleUpdateDevice = async () => {
  try {
    await updateDevice(newDevice.value)
    getDevice()
    isAddOrEditDeviceDialogVisible.value = false
  } catch (error) {
    console.error('Error updating device:', error)
  }
}

onMounted(() => {
  getDevice()
})
</script>

<style scoped>
.pagination-button:focus,
.pagination-button:active,
.pagination-button.selected {
  background-color: #624de3;
  color: white;
}
.pagination-button {
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.pagination-button:not(.selected):hover {
  background-color: #e2e8f0;
}
</style>
