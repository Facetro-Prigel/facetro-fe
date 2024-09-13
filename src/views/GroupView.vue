<template>
  <div class="card p-4">
    <!-- Table with search and buttons -->
    <DataTable
      :value="group"
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
      <Column field="device.name" header="Room" sortable>
        <template #body="slotProps">
          <span>{{ slotProps.data.device.name }}</span>
        </template>
      </Column>
      <Column header="Action">
        <template #body="slotProps">
          <button
            @click="openEditGroupDialog(slotProps.data)"
            class="text-blue-500 hover:text-blue-700 p-1"
          >
            <i class="pi pi-pencil"></i>
          </button>
          <button
            @click="confirmDeleteGroup(slotProps.data.uuid)"
            class="text-red-500 hover:text-red-700 p-1"
          >
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>

    <!-- Confirmation dialog for delete -->
    <div
      v-if="isConfirmDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Confirmation</h2>
        <p>Are you sure you want to delete this group?</p>
        <div class="flex justify-end mt-4">
          <button
            @click="handleDeleteGroup(confirmingGroupId)"
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

    <!-- Add Group Dialog -->
    <div
      v-if="isAddGroupDialogVisible || isEditGroupDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md" style="width: 800px; height: 520px;">
        <h2 class="text-lg font-semibold mb-4">{{ isAddGroupDialogVisible ? 'Add Group' : 'Edit Group' }}</h2>
        <hr class="border-purple-500 mb-4" />
        <div class="mb-4">
          <label class="block mb-2">Name</label>
          <input v-model="form.name" type="text" placeholder="Name" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Location</label>
          <input v-model="form.locations" type="text" placeholder="Location" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Room</label>
          <input v-model="form.device.name" type="text" placeholder="Room" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div class="flex justify-end mt-4">
          <button
            @click="isAddGroupDialogVisible = false; isEditGroupDialogVisible = false"
            class="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            @click="isAddGroupDialogVisible ? handleAddGroup() : handleUpdateGroup()"
            class="bg-primary-500 text-white px-4 py-2 rounded"
          >
            {{ isAddGroupDialogVisible ? 'Submit' : 'Update' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { fetchGroup, createGroup, updateGroup, deleteGroup } from '@/services/Group.services'

// State variables
const group = ref([])
const isConfirmDialogVisible = ref(false)
const confirmingGroupId = ref(null)
const isAddGroupDialogVisible = ref(false)
const isEditGroupDialogVisible = ref(false)
const form = ref({
  name: '',
  location: '',
  device: {
    name: ''
  }
})

// Methods
const getGroup = async () => {
  try {
    const response = await fetchGroup()
    group.value = response
  } catch (error) {
    console.error('Error fetching group:', error)
  }
}

const handleDeleteGroup = async (id) => {
  try {
    await deleteGroup(id)
    getGroup()
    isConfirmDialogVisible.value = false
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
  form.value = { name: '', location: '', device: { name: '' } }
}

const openEditGroupDialog = (data) => {
  form.value = { ...data }
  isEditGroupDialogVisible.value = true
}

const handleAddGroup = async () => {
  try {
    const response = await createGroup(form.value)
    console.log('Response from server:', response)
    getGroup()
    isAddGroupDialogVisible.value = false
  } catch (error) {
    console.error('Error adding group:', error.message)
  }
}

const handleUpdateGroup = async () => {
  try {
    const response = await updateGroup(form.value)
    console.log('Response from server:', response)
    getGroup()
    isEditGroupDialogVisible.value = false
  } catch (error) {
    console.error('Error updating group:', error.message)
  }
}

// Lifecycle hook
onMounted(() => {
  getGroup()
})
</script>

<style scoped>
</style>
