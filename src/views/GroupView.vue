<template>
  <div class="card p-4">
    <DataTable
      :value="group"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
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
          <button @click="openAddUserDialog" class="bg-primary-500 text-white px-4 py-2 rounded-md">
            + Add Group
          </button>
        </div>
      </template>
      <Column field="name" header="Name" sortable>
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
      <Column field="device" header="Room" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.device.name }}</span>
        </template>
      </Column>
      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <button
            @click="openEditUserDialog(slotProps.data)"
            class="text-blue-500 hover:text-blue-700 p-1"
          >
            <i class="pi pi-pencil"></i>
          </button>
          <button
            @click="confirmDeleteUser(slotProps.data.uuid)"
            class="text-red-500 hover:text-red-700 p-1"
          >
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>

    <div
      v-if="isConfirmDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Konfirmasi</h2>
        <p>Apakah Anda yakin ingin menghapus pengguna ini?</p>
        <div class="flex justify-end mt-4">
          <button
            @click="handleDeleteUser(confirmingUserId)"
            class="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Ya
          </button>
          <button
            @click="isConfirmDialogVisible = false"
            class="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Tidak
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
import BASE_URL from '@/stores/config'
import { fetchGroup, createGroup, updateGroup, deleteGroup } from '@/services/Group.services'

const group = ref([])
const isConfirmDialogVisible = ref(false)
const confirmingUserId = ref(null)

const getGroup = async () => {
  try {
    const response = await fetchGroup()
    group.value = response
  } catch (error) {
    console.error('Error fetching group:', error)
  }
}

const handleDeleteUser = async (id) => {
  try {
    await deleteUser(id)
    getUsers()
    isConfirmDialogVisible.value = false
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const confirmDeleteUser = (id) => {
  confirmingUserId.value = id
  isConfirmDialogVisible.value = true
}

onMounted(() => {
  getGroup()
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
