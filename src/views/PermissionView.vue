<template>
  <div class="card p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Manage Roles</h3>
      <div class="flex space-x-2">
        <button class="bg-primary-500 text-white px-4 py-2 rounded-md" @click="openAddOrEditRoleDialog(true)">
          + Add Role
        </button>
        <button class="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center space-x-1" @click="editRole">
          <i class="pi pi-pencil text-white"></i>
        </button>
        <button class="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center space-x-1" @click="showDeleteDialog(selectedRoleId)">
          <i class="pi pi-trash text-white"></i>
        </button>
      </div>
    </div>
    <TabView class="custom-tabview">
      <TabPanel
        v-for="role in roles"
        :key="role.id"
        :header="role.name"
        class="custom-tabpanel"
      >
        <PermissionTable :permissions="role.permissions" />
      </TabPanel>
    </TabView>

    <!-- Add/Edit Role Dialog -->
    <div
      v-if="isAddOrEditRoleDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md" style="width: 800px;">
        <h2 class="text-lg font-semibold mb-4">{{ isAddingRole ? 'Add Role' : 'Edit Role' }}</h2>
        <hr class="border-purple-500 mb-4" />
        <form @submit.prevent="isAddingRole ? handleAddRole() : handleUpdateRole()">
          <div class="mb-4">
            <label for="role-name" class="block mb-2">Role Name</label>
            <input
              v-model="currentRole.name"
              type="text"
              id="role-name"
              placeholder="Role Name"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label for="role-permissions" class="block mb-2">Permissions</label>
            <textarea
              v-model="currentRole.permissions"
              id="role-permissions"
              placeholder="Permissions"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full"
            ></textarea>
          </div>
          <div class="flex justify-end mt-4">
            <button
              type="submit"
              class="bg-primary-500 text-white px-4 py-2 rounded mr-2"
            >
              {{ isAddingRole ? 'Add' : 'Update' }}
            </button>
            <button
              @click="closeAddOrEditRoleDialog()"
              class="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div
      v-if="isConfirmDialogVisible"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Confirmation</h2>
        <p>Are you sure you want to delete this role?</p>
        <div class="flex justify-end mt-4">
          <button
            @click="handleDeleteRole(confirmingRoleId)"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import PermissionTable from '../components/PermissionTable.vue'

const roles = ref([])

// State for Add/Edit Role Dialog
const isAddOrEditRoleDialogVisible = ref(false)
const isAddingRole = ref(true)
const currentRole = ref({
  id: null,
  name: '',
  permissions: ''
})

// State for Delete Confirmation Dialog
const isConfirmDialogVisible = ref(false)
const confirmingRoleId = ref(null)

// Fetch roles data
const fetchRoles = async () => {
  // Example roles data
  roles.value = [
    {
      id: 1,
      name: 'Super Admin',
      permissions: 'View Dashboard, Edit User'
    },
    {
      id: 2,
      name: 'Admin',
      permissions: 'Create Post, Edit Post'
    },
    {
      id: 3,
      name: 'Lecturer',
      permissions: 'Create Assignment, Edit Assignment'
    },
    {
      id: 4,
      name: 'Student',
      permissions: 'Submit Assignment, View Grades'
    },
  ]
}

const openAddOrEditRoleDialog = (isAdding) => {
  isAddingRole.value = isAdding
  if (isAdding) {
    currentRole.value = { id: null, name: '', permissions: '' }
  }
  isAddOrEditRoleDialogVisible.value = true
}

const closeAddOrEditRoleDialog = () => {
  isAddOrEditRoleDialogVisible.value = false
}

const handleAddRole = () => {
  // Logic to handle adding a role
  const newRole = { ...currentRole.value, id: Date.now() }
  roles.value.push(newRole)
  closeAddOrEditRoleDialog()
}

const handleUpdateRole = () => {
  // Logic to handle updating a role
  const index = roles.value.findIndex(role => role.id === currentRole.value.id)
  if (index !== -1) {
    roles.value[index] = { ...currentRole.value }
  }
  closeAddOrEditRoleDialog()
}

const editRole = () => {
  const selectedRole = roles.value[0] // Replace this with logic to select the correct role
  currentRole.value = { ...selectedRole }
  openAddOrEditRoleDialog(false)
}

const showDeleteDialog = (roleId) => {
  confirmingRoleId.value = roleId
  isConfirmDialogVisible.value = true
}

const handleDeleteRole = (roleId) => {
  roles.value = roles.value.filter(role => role.id !== roleId)
  isConfirmDialogVisible.value = false
}

onMounted(() => {
  fetchRoles()
})
</script>

<style scoped>
.card {
  margin: 20px;
}

/* Custom styles for PrimeVue TabPanel */
.custom-tabview {
  background-color: #; /* Background color for TabView */
  padding: 10px;
}

.custom-tabpanel {
  background-color: #ffffff; /* Background color for TabPanel */
  border: 1px solid #ccc;
  border-top: none; /* Remove the top border for the first panel */
  color: #333; /* Text color inside TabPanel */
}

/* Styles to change the text color on tabs to white */
::v-deep .p-tabview-nav li .p-tabview-nav-link {
  border-radius: 0%;
  background-color: #303030;
  color: #ffffff !important; /* Text color for tabs */
}

/* Styles to change the text color on the active tab */
::v-deep .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background-color: #5c14f5;
  color: #ffffff !important; /* Text color for active tabs */
}
</style>
