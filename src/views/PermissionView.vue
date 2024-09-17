<template>
  <div class="card p-4">
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-key mr-2"></i>Manage Permission</h1>
    <DataTable :value="datas" paginator  v-model:filters="filters" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
      :globalFilterFields="['name', 'description']" tableStyle="min-width: 50rem">
      <template #header>

        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="p-inputtext p-component border border-gray-300 rounded-md p-2 hover:border-primary-500 focus-within:border-primary-300">
              <i class="pi pi-search" />
              <input  class ='ml-2 focus:outline-none' v-model="filters['global'].value" placeholder="Keyword Search" />
            </div>
          <button @click="openAddUserDialog" class="bg-primary-500 text-white px-4 py-2 rounded-md">
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
          <button @click="confirmDeleteUser(slotProps.data.uuid)" class="text-red-500 hover:text-red-700 p-1">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { fetchPermission } from '@/services/Permission.services';
const filters = ref({
    global: { value: null},
    name: { value: null},
    description: { value: null}
});
const datas = ref()

const isAddPermissionDialogVisible = ref(false)
const isEditPermissionDialogVisible = ref(false)
const selectedPermission = ref(null)


onMounted(async () => {
  datas.value = await fetchPermission()
})

</script>

<style scoped></style>
