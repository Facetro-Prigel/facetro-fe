<template>
  <div class="card p-4">
    <TitleComponent title="UNNESTech" subtitle="Permission Management" />
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-key mr-2"></i>Permission Management</h1>
    <DataTable :value="datas" paginator v-model:filters="filters" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
      :globalFilterFields="['name', 'description']" tableStyle="min-width: 50rem">
      <template #header>

        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 hover:border-primary-500 focus-within:border-primary-300">
            <i class="pi pi-search" />
            <input class='ml-2 focus:outline-none' v-model="filters['global'].value" placeholder="Keyword Search" />
          </div>
          <button @click="openAddPermissionDialog" class="bg-primary-500 text-white px-4 py-2 rounded-md">
            + Add Permission
          </button>
        </div>
      </template>
      <template #empty>Tidak ada izin yang tersedia </template>
      <Column field="name" header="Name" sortable></Column>
      <Column field="description" header="Description" sortable></Column>

      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        
        <template #body="slotProps">
          <button @click="openEditPermissionDialog(slotProps.data.uuid)" class="text-blue-500 hover:text-blue-700 p-1">
            <i class="pi pi-pencil"></i>
          </button>
          <button @click="confirmDeletePermission(slotProps.data.uuid)" class="text-red-500 hover:text-red-700 p-1">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>
    <div v-if="isConfirmDialogVisible"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div class="bg-white p-6 rounded shadow-md">
            <h2 class="text-lg font-semibold mb-4">Konfirmasi</h2>
            <p>Apakah kamu yakin untuk menghapus izin ini?</p>
            <div class="flex justify-end mt-4">
              <button @click="handleDeletePermission(confirmingPermissionId)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">
                Ya
              </button>
              <button @click="isConfirmDialogVisible = false" class="bg-gray-300 text-black px-4 py-2 rounded">
                Tidak
              </button>
            </div>
          </div>
        </div>
    <AddPermissionDialog :visible="isAddPermissionDialogVisible" @update:visible="isAddPermissionDialogVisible = $event"
      @permission-added="getPermissions()" />
    <EditPermissionDialog :uuid="selectedPermission" :visible="isEditPermissionDialogVisible" @update:visible="isEditPermissionDialogVisible = $event"
      @permission-added="getPermissions()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AddPermissionDialog from '@/components/AddPermissionDialog.vue';
import EditPermissionDialog from '@/components/EditPermissionDialog.vue';
import { fetchPermissions, deletePermission } from '@/services/Permission.services';
import { socket } from "@/socket";

const filters = ref({
  global: { value: null },
  name: { value: null },
  description: { value: null }
});
const datas = ref()

const isAddPermissionDialogVisible = ref(false)
const isEditPermissionDialogVisible = ref(false)
const selectedPermission = ref(null)
const isConfirmDialogVisible = ref(false)
const confirmingPermissionId = ref()
const getPermissions = async () => {
  const res = await fetchPermissions();
  if(!res.title){
    datas.value = res
  }
}
const handleDeletePermission = async (id) => {
  try {
    const res = await deletePermission(id)
    if(res.title == 'Success'){
      getPermissions()
      isConfirmDialogVisible.value = false
    }
  } catch (error) {
    console.error('Error deleting Permission:', error)
  }
}

const confirmDeletePermission = (id) => {
  confirmingPermissionId.value = id
  isConfirmDialogVisible.value = true
}

const openAddPermissionDialog = () => {
  isAddPermissionDialogVisible.value = true
}

const openEditPermissionDialog = (user) => {
  selectedPermission.value = user
  isEditPermissionDialogVisible.value = true
}
onMounted(async () => {
  await getPermissions()
  socket.on("update CUD", () => {
    getPermissions()

  });
})

</script>

<style scoped></style>
