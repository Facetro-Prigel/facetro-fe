<template>
  <div class="card p-4">
    <TitleComponent title="UNNESTech" subtitle="Role Management" />
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-briefcase"></i> Role Management</h1>
    <DataTable :value="datas" paginator  :rows="5" :rowsPerPageOptions="[5, 10, 20]" v-model:filters="filters"
      :globalFilterFields="['name', 'description']" tableStyle="min-width: 50rem">
      <template #header>

        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 hover:border-primary-500 focus-within:border-primary-300">
            <i class="pi pi-search" />
            <input class='ml-2 focus:outline-none' v-model="filters['global'].value" placeholder="Keyword Search" />
          </div>
          <button @click="openAddRoleDialog" class="bg-primary-500 text-white px-4 py-2 rounded-md">
            + Add Role
          </button>
        </div>
      </template>
      <template #empty>Tidak ada Role yang tersedia </template>
      <Column field="name" header="Name" sortable></Column>
      <Column field="description" header="Description" sortable></Column>

      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        
        <template #body="slotProps">
          <button @click="openEditRoleDialog(slotProps.data.uuid)" class="text-blue-500 hover:text-blue-700 p-1">
            <i class="pi pi-pencil"></i>
          </button>
          <button @click="confirmDeleteRole(slotProps.data.uuid)" class="text-red-500 hover:text-red-700 p-1">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>
    <div v-if="isConfirmDialogVisible"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div class="bg-white p-6 rounded shadow-md">
            <h2 class="text-lg font-semibold mb-4">Konfirmasi</h2>
            <p>Apakah kamu yakin untuk menghapus Peran ini?</p>
            <div class="flex justify-end mt-4">
              <button @click="handleDeleteRole(confirmingRoleId)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">
                Ya
              </button>
              <button @click="isConfirmDialogVisible = false" class="bg-gray-300 text-black px-4 py-2 rounded">
                Tidak
              </button>
            </div>
          </div>
        </div>
    <AddRoleDialog :visible="isAddRoleDialogVisible" :permisions="permissionOptions" @update:visible="isAddRoleDialogVisible = $event"
      @role-added="getRoles()" />
    <EditRoleDialog :uuid="selectedRole" :permisions="permissionOptions" :visible="isEditRoleDialogVisible" @update:visible="isEditRoleDialogVisible = $event"
      @role-added="getRoles()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AddRoleDialog from '@/components/AddRoleDialog.vue';
import EditRoleDialog from '@/components/EditRoleDialog.vue';
import { fetchRoles, deleteRole } from '@/services/Role.services';
import { fetchPermissions } from '@/services/Permission.services';
import { socket } from "@/socket";
const filters = ref({
  global: { value: null },
  name: { value: null },
  description: { value: null }
});
const datas = ref()
const permissionOptions = []

const isAddRoleDialogVisible = ref(false)
const isEditRoleDialogVisible = ref(false)
const selectedRole = ref(null)
const isConfirmDialogVisible = ref(false)
const confirmingRoleId = ref()
const getRoles = async () => {
  let res = await fetchRoles()
  if(!res.title){
    datas.value = res
  }
}
const handleDeleteRole = async (id) => {
  try {
    const res = await deleteRole(id)
    if(res.title == 'Success'){
      isConfirmDialogVisible.value = false
    }
  } catch (error) {
    console.error('Error deleting Role:', error)
  }
}

const confirmDeleteRole = (id) => {
  confirmingRoleId.value = id
  isConfirmDialogVisible.value = true
}

const openAddRoleDialog = () => {
  isAddRoleDialogVisible.value = true
}

const openEditRoleDialog = (user) => {
  selectedRole.value = user
  isEditRoleDialogVisible.value = true
}
const getPemission = async () => {
  try {
    const response = await fetchPermissions()
    permissionOptions.value = response.map(item => ({
      uuid: item.uuid,
      label: item.name
    }));
  } catch (error) {
    console.error('Error fetching Permission:', error)
  }
}
const getUpdate = () =>{
  getRoles()
  getPemission()
}
onMounted(() => {
  getUpdate()
  socket.on("update CUD", () => {
    getUpdate()
  });
})

</script>

<style scoped></style>
