<template>
  <div class="card p-4">
    <DataTable
      :value="device"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      v-model:filters="filters" 
      :globalFilterFields="['name', 'locations']"
    >
      <!-- Header template with search and add button -->
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i
              class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            <input v-model="filters['global'].value"
              type="text"
              placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10"
            />
          </div>
          <button @click="openAddDeviceDialog()" class="bg-primary-500 text-white px-4 py-2 rounded-md">
            + Add Device
          </button>
        </div>
      </template>
      <!-- Columns definition -->
      <Column field="name" header="Name" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column field="ip_address" header="IP Address" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="flex justify-start items-center max-w-[100px]">
            <PriveteCopy :value="slotProps.data.ip_address"/>
          </div>
        </template>
      </Column>
      <Column field="locations" header="Location" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.locations }}</span>
        </template>
      </Column>
      <Column field="token" header="Token" >
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="flex justify-start items-center max-w-[100px]">
            <PriveteCopy :value="slotProps.data.token" showInQr="true"/>
          </div>
        </template>
      </Column>
      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <button
            @click="openEditDeviceDialog(slotProps.data.uuid)"
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
    <AddDeviceDialog :visible="isAddDeviceDialogVisible" @update:visible="isAddDeviceDialogVisible = $event"
    @device-added="getDevice()"></AddDeviceDialog>
    <EditDeviceDialog :uuid="selectedDevice" :visible="isEditDeviceDialogVisible" @update:visible="isEditDeviceDialogVisible = $event"
    @device-added="getDevice()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { fetchDevices, deleteDevice } from '@/services/Device.services'
import PriveteCopy from '@/components/PriveteCopy.vue'
import AddDeviceDialog from '@/components/AddDeviceDialog.vue'
import EditDeviceDialog from '@/components/EditDeviceDialog.vue'
import { socket } from "@/socket";
const device = ref([])
const isConfirmDialogVisible = ref(false)
const isAddDeviceDialogVisible = ref(false)
const isEditDeviceDialogVisible = ref(false)
const selectedDevice = ref()
const confirmingDeviceId = ref(null)
const filters = ref(
  {'global': { value: null}, 'name': { value: null}, 'locations': { value: null} }
)


const getDevice = async () => {
  try {
    const response = await fetchDevices()
    device.value = response
  } catch (error) {
    console.error('Error fetching device:', error)
  }
}

const handleDeleteDevice = async (id) => {
  try {
    const res = await deleteDevice(id)
    if(res.titile = "Success"){
      isConfirmDialogVisible.value = false
    }
  } catch (error) {
    console.error('Error deleting device:', error)
  }
}

const confirmDeleteDevice = (id) => {
  confirmingDeviceId.value = id
  isConfirmDialogVisible.value = true
}

const openAddDeviceDialog = () => {
  isAddDeviceDialogVisible.value = true
}
const openEditDeviceDialog = (id) => {
  selectedDevice.value = id
  isEditDeviceDialogVisible.value = true
}

onMounted(async () => {
  await getDevice()
  socket.on("update CUD", () => {
    getDevice()
  });
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
