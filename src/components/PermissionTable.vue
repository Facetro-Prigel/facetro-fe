<template>
  <div class="card p-4">
    <DataTable :value="permissions" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10"
            />
          </div>
          <button class="bg-primary-500 text-white px-4 py-2 rounded-md" @click="openAddOrEditPermissionDialog(true)">
            + Add Permission
          </button>
        </div>
      </template>
      <Column field="permission" header="Permission" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.permissionText }}</span>
        </template>
      </Column>
      <Column field="description" header="Description" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.descriptionText }}</span>
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <input type="checkbox" v-model="slotProps.data.status" />
        </template>
      </Column>
      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <button class="text-blue-500 hover:text-blue-700 p-1" @click="editPermission(slotProps.data)">
            <i class="pi pi-pencil"></i>
          </button>
          <button class="text-red-500 hover:text-red-700 p-1" @click="showDeleteDialog(slotProps.data)">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>

    <!-- Add/Edit Permission Dialog -->
    <div v-if="isAddOrEditPermissionDialogVisible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md" style="width: 500px;">
        <h2 class="text-lg font-semibold mb-4">{{ isAddingPermission ? 'Add Permission' : 'Edit Permission' }}</h2>
        <hr class="border-purple-500 mb-4" />
        <form @submit.prevent="isAddingPermission ? handleAddPermission() : handleUpdatePermission()">
          <div class="mb-4">
            <label for="permission-text" class="block mb-2">Permission Text</label>
            <input v-model="currentPermission.permissionText" type="text" id="permission-text" placeholder="Permission Text" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="description-text" class="block mb-2">Description Text</label>
            <input v-model="currentPermission.descriptionText" type="text" id="description-text" placeholder="Description Text" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-2">Status</label>
            <input type="checkbox" v-model="currentPermission.status" />
          </div>
          <div class="flex justify-end mt-4">
            <button type="submit" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
              {{ isAddingPermission ? 'Add' : 'Update' }}
            </button>
            <button @click="closeAddOrEditPermissionDialog()" class="bg-gray-300 text-black px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="isConfirmDialogVisible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Confirmation</h2>
        <p>Are you sure you want to delete this permission?</p>
        <div class="flex justify-end mt-4">
          <button @click="handleDeletePermission(confirmingPermission)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Yes
          </button>
          <button @click="isConfirmDialogVisible = false" class="bg-gray-300 text-black px-4 py-2 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Data dummy statis
const permissions = ref([
  { id: 1, permissionText: 'View Dashboard', descriptionText: 'Can view the dashboard', status: true },
  { id: 2, permissionText: 'Edit User', descriptionText: 'Can edit user information', status: false },
  { id: 3, permissionText: 'Delete User', descriptionText: 'Can delete user', status: false },
  { id: 4, permissionText: 'Create Post', descriptionText: 'Can create new posts', status: true },
  { id: 5, permissionText: 'Edit Post', descriptionText: 'Can edit existing posts', status: true },
])

// State for Add/Edit Permission Dialog
const isAddOrEditPermissionDialogVisible = ref(false)
const isAddingPermission = ref(true)
const currentPermission = ref({
  id: null,
  permissionText: '',
  descriptionText: '',
  status: false
})

// State for Delete Confirmation Dialog
const isConfirmDialogVisible = ref(false)
const confirmingPermission = ref(null)

const openAddOrEditPermissionDialog = (isAdding) => {
  isAddingPermission.value = isAdding
  if (isAdding) {
    currentPermission.value = { id: null, permissionText: '', descriptionText: '', status: false }
  }
  isAddOrEditPermissionDialogVisible.value = true
}

const closeAddOrEditPermissionDialog = () => {
  isAddOrEditPermissionDialogVisible.value = false
}

const handleAddPermission = () => {
  // Logic to handle adding a permission
  const newPermission = { ...currentPermission.value, id: Date.now() }
  permissions.value.push(newPermission)
  closeAddOrEditPermissionDialog()
}

const handleUpdatePermission = () => {
  // Logic to handle updating a permission
  const index = permissions.value.findIndex(permission => permission.id === currentPermission.value.id)
  if (index !== -1) {
    permissions.value[index] = { ...currentPermission.value }
  }
  closeAddOrEditPermissionDialog()
}

const editPermission = (permission) => {
  currentPermission.value = { ...permission }
  openAddOrEditPermissionDialog(false)
}

const showDeleteDialog = (permission) => {
  confirmingPermission.value = permission
  isConfirmDialogVisible.value = true
}

const handleDeletePermission = (permission) => {
  permissions.value = permissions.value.filter(p => p.id !== permission.id)
  isConfirmDialogVisible.value = false
}
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>
