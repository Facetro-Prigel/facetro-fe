<template>
  <div class="card p-4">
    <TitleComponent title="UNNESTech" subtitle="Group Management" />
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-users mr-2"></i>Group Management</h1>
    <DataTable :value="group" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
      v-model:filters="filters" :globalFilterFields="['name', 'locations', 'device.name', 'users.name']">
      <!-- Header template with search and add button -->
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input v-model="filters['global'].value" type="text" placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10" />
          </div>
          <button @click="openAddGroupDialog" class="bg-primary-500 text-white px-4 py-2 rounded-md">
            + Add Group
          </button>
        </div>
      </template>

      <!-- Columns definition -->
      <Column field="name" header="Name" sortable>
        <template #body="slotProps">
          <span>{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column field="locations" header="Location">
        <template #body="slotProps">
          <span>{{ slotProps.data.locations }}</span>
        </template>
      </Column>
      <Column field="door_group.name" header="Open Door Location" sortable>
        <template #body="slotProps">
          <div class="flex flex-col">
            <Chip v-for="item in slotProps.data.door_group" :key="index" class="py-0 pl-0 pr-4 m-1">
              <span
                class="bg-primary-500 text-white rounded-full p-2 flex items-center justify-center m-2"><i class="pi pi-microchip"></i></span>
              <span class="mr-2 text-sm">{{ item.device.name }}</span>
          </Chip>
          </div>
        </template>
      </Column>
      <Column field="presence_group.name" header="Presence Location " sortable>
        <template #body="slotProps">
          <div class="flex flex-col">
            <Chip v-for="item in slotProps.data.presence_group" :key="index" class="py-0 pl-0 pr-4 m-1">
                <span
                  class="bg-primary-500 text-white rounded-full p-2 flex items-center justify-center m-2"><i class="pi pi-microchip"></i></span>
                <span class="mr-2 text-sm">{{ item.device.name }}</span>
            </Chip>
          </div>
        </template>
      </Column>
      <Column field="users.name" header="Notify to" sortable>
        <template #body="slotProps">
          <div class="flex items-center">
            <div class="max-w-[75px]">
              <ImageViewer :image="BASE_URL +'avatar/'+ slotProps.data.users.avatar" :bbox="[55,55,210]"
                :isSuccess="true"></ImageViewer>
            </div>
            <span>{{ slotProps.data.users.name }}</span>
          </div>
        </template>
      </Column>
      <Column header="Action">
        <template #body="slotProps">
          <button @click="openEditGroupDialog(slotProps.data.uuid)" class="text-blue-500 hover:text-blue-700 p-1">
            <i class="pi pi-pencil"></i>
          </button>
          <button @click="confirmDeleteGroup(slotProps.data.uuid)" class="text-red-500 hover:text-red-700 p-1">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>

    <!-- Confirmation dialog for delete -->
    <div v-if="isConfirmDialogVisible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Confirmation</h2>
        <p>Are you sure you want to delete this group?</p>
        <div class="flex justify-end mt-4">
          <button @click="handleDeleteGroup(confirmingGroupId)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Yes
          </button>
          <button @click="isConfirmDialogVisible = false" class="bg-gray-300 text-black px-4 py-2 rounded">
            No
          </button>
        </div>
      </div>
    </div>
    <AddGroupDialog :visible="isAddGroupDialogVisible" :users="userOptions" :device="deviceOption"
      @update:visible="isAddGroupDialogVisible = $event" @group-added="getGroup()" />
    <EditGroupDialog :uuid="selectedGruopId" :visible="isEditGroupDialogVisible" :users="userOptions"
      :device="deviceOption" @update:visible="isEditGroupDialogVisible = $event" @group-added="getGroup()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { fetchGroups, deleteGroup } from '@/services/Group.services'
import { fetchUsers } from '@/services/User.services'
import { fetchDevices } from '@/services/Device.services'
import AddGroupDialog from '@/components/AddGroupDialog.vue'
import EditGroupDialog from '@/components/EditGroupDialog.vue'
import ImageViewer from '@/components/ImageViewer.vue'
import { socket } from "@/socket";
const BASE_URL = import.meta.env.VITE_BACKEND_API
// State variables
const filters = ref({
  global: { value: null },
  name: { value: null },
  'locations': { value: null },
  'device.name': { value: null }, 
  'users.name': { value: null }
});
const group = ref([])
const isConfirmDialogVisible = ref(false)
const confirmingGroupId = ref(null)
const isAddGroupDialogVisible = ref(false)
const isEditGroupDialogVisible = ref(false)
const selectedGruopId = ref()
const userOptions = ref()
const deviceOption = ref()
const getDevice = async () => {
  try {
    const response = await fetchDevices()
    deviceOption.value = response
  } catch (error) {
    console.error('Error fetching device:', error)
  }
}

// Methods
const getUsers = async () => {
  try {
    const response = await fetchUsers()
    userOptions.value = response
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const getGroup = async () => {
  try {
    const response = await fetchGroups()
    group.value = response
  } catch (error) {
    console.error('Error fetching group:', error)
  }
}

const handleDeleteGroup = async (id) => {
  try {
    let res = await deleteGroup(id)
    if(res.title == 'Success'){
      isConfirmDialogVisible.value = false
    }
  } catch (error) {
    console.error('Error deleting group:', error)
  }
}

const confirmDeleteGroup = (id) => {
  confirmingGroupId.value = id
  isConfirmDialogVisible.value = true
}

const openAddGroupDialog = () => {
  isAddGroupDialogVisible.value = true
}

const openEditGroupDialog = (data) => {
  isEditGroupDialogVisible.value = true
  selectedGruopId.value = data
}
const all= ()=>{
  getGroup()
  getUsers()
  getDevice()
}
// Lifecycle hook
onMounted(() => {
  all()
  socket.on("update CUD", () => {
    all()
  });
})
</script>

<style scoped></style>
