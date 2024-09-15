<template>
  <div class="card p-4">
    <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10" />
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
      <Column field="avatar" header="Avatar">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="flex max-w-[175px] min-w-[100px]">
            <!-- <ImageViewer type="Gambar Pembading" :is-success="true" :bbox="slotProps.data.bbox ?? [0, 0, 0]"
              :image="BASE_URL + slotProps.data.avatar ?? '/src/assets/video/search_person.mp4'" /> -->
              <img
                :src="slotProps.data.avatar ? BASE_URL + slotProps.data.avatar : no_image_icon"
                :alt="slotProps.data.name"
                class="w-full shadow-md rounded"
              />
          </div>
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
          <div v-for="item in slotProps.data.usergroup" :key="item.id"
            class="bg-blue-500 text-white p-1 mb-2 rounded-lg">
            {{ item.group.name }}
          </div>
        </template>
      </Column>
      <Column field="roleuser" header="Role" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div v-for="item in slotProps.data.roleuser" :key="item.id" class="bg-sky-800 text-white p-1 mb-2 rounded-lg">
            {{ item.role.name }}
          </div>
        </template>
      </Column>
      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
            <button @click="openEditUserDialog(slotProps.data.uuid)" class="text-blue-500 hover:text-blue-700 p-1">
              <i class="pi pi-pencil"></i>
            </button>
            <button @click="confirmDeleteUser(slotProps.data.uuid)" class="text-red-500 hover:text-red-700 p-1">
              <i class="pi pi-trash"></i>
            </button>
        </template>
      </Column>
    </DataTable>

    <div v-if="isConfirmDialogVisible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Confirmation</h2>
        <p>Are you sure you want to delete this user?</p>
        <div class="flex justify-end mt-4">
          <button @click="handleDeleteUser(confirmingUserId)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Yes
          </button>
          <button @click="isConfirmDialogVisible = false" class="bg-gray-300 text-black px-4 py-2 rounded">
            No
          </button>
        </div>
      </div>
    </div>

    <AddUserDialog :visible="isAddUserDialogVisible" :groupOptions="groupOptions" :roleOptions="roleOptions"
      :permissionOptions="permissionOptions" @update:visible="isAddUserDialogVisible = $event" @user-added="getUsers" />

    <EditUserDialog :uuid="selectedUser" :visible="isEditUserDialogVisible" :groupOptions="groupOptions"
      :roleOptions="roleOptions" :permissionOptions="permissionOptions"
      @update:visible="isEditUserDialogVisible = $event" @user-updated="getUsers" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import AddUserDialog from '../components/AddUserDialog.vue'
import EditUserDialog from '../components/EditUserDialog.vue'
import BASE_URL from '@/stores/config'
import { fetchUsers, deleteUser } from '@/services/User.services'
import { fetchGroup } from '@/services/Group.services'
import { fetchRole } from '@/services/Role.services'
import { fetchPermission } from '@/services/Permission.services'
import no_image_icon from '@/assets/no_images.png';

const users = ref([])
const isConfirmDialogVisible = ref(false)
const confirmingUserId = ref(null)
const isAddUserDialogVisible = ref(false)
const isEditUserDialogVisible = ref(false)
const selectedUser = ref(null)

const groupOptions = []

const roleOptions = []
const permissionOptions = []

const getUsers = async () => {
  try {
    const response = await fetchUsers()
    users.value = response
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
const getGroup = async () => {
  try {
    const response = await fetchGroup()
    groupOptions.value = response.map(item => ({
      uuid: item.uuid,
      label: item.name
    }));
  } catch (error) {
    console.error('Error fetching group:', error)
  }
}
const getRole = async () => {
  try {
    const response = await fetchRole()
    roleOptions.value = response.map(item => ({
      uuid: item.uuid,
      label: item.name
    }));
  } catch (error) {
    console.error('Error fetching group:', error)
  }
}

const getPemission = async () => {
  try {
    const response = await fetchPermission()
    permissionOptions.value = response.map(item => ({
      uuid: item.uuid,
      label: item.name
    }));
  } catch (error) {
    console.error('Error fetching group:', error)
  }
}

const handleDeleteUser = async (id) => {
  try {
    const res = await deleteUser(id)
    if(res){
      alert(res.msg)
    }
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

const openAddUserDialog = () => {
  isAddUserDialogVisible.value = true
}

const openEditUserDialog = (user) => {
  selectedUser.value = user
  isEditUserDialogVisible.value = true
}

onMounted(async () => {
  await getUsers();
  await getGroup();
  await getRole();
  await getPemission();
})
</script>

<style scoped></style>
