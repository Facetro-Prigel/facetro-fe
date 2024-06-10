<template>
  <div class="card p-4">
    
    <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
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
            + Add User
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
      <Column field="avatar" header="avatar">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <img
            :src="`${BASE_URL+slotProps.data.avatar}`"
            :alt="slotProps.data.name"
            class="w-[6rem] shadow-md rounded"
          />
        </template>
      </Column>
      <Column field="identityNumber" header="Identity Number" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.identityNumber }}</span>
        </template>
      </Column>
      <Column field="usergroup" header="Group" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="bg-blue-500 text-white p-1 mb-2 rounded-lg " v-for="item in slotProps.data.usergroup" :key="item.id">
            {{ item.group.name }}
          </div>
        </template>
      </Column>
      <Column field="roleuser" header="Role" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="bg-sky-800 text-white p-1 mb-2 rounded-lg " v-for="item in slotProps.data.roleuser" :key="item.id">
            {{ item.role.name }}
          </div>
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
import { fetchUsers, createUser, updateUser, deleteUser } from '@/services/User.services'

const users = ref([])
const isConfirmDialogVisible = ref(false)
const confirmingUserId = ref(null)

const getUsers = async () => {
  try {
    const response = await fetchUsers()
    users.value = response
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
// { name: 'Anggito Wahyu Adi', image: 'image1.jpg', email: 'ito@example.com', password: '12345', identityNumber: '123456789', group: 'FACETRO', role: 'Student' }

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
  getUsers()
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
