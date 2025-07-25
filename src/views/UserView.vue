<template>
  <div class="card p-4">
    <TitleComponent title="UNNESTech" subtitle="User Management" />
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-user mr-2"></i>User Management</h1>
    <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :loading="loading" tableStyle="min-width: 50rem" v-model:filters="filters" 
    :globalFilterFields="['name', 'identity_number', 'user_group', 'roleuser' ]" >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input v-model="filters['global'].value" type="text" placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10" />
          </div>
          <button @click="openAddUserDialog" class="bg-primary-500 text-white px-4 py-2 text-md sm:text-lg rounded-md">
            <i class="pi pi-user-plus mr-2 "></i> Add User
          </button>
        </div>
      </template>
      <template #loading>
        <div class="p-5 rounded-xl bg-white flex flex-col drop-shadow-md items-center">
          <ProgressSpinner />
          <p>Loading User data. Please wait.</p> 
        </div>
      </template>
      <Column field="identityNumber" header="Identity Number" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.identity_number }}</span>
        </template>
      </Column>
      <Column field="avatar" header="Avatar">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="flex max-w-[175px] min-w-[100px]">
            <ImageViewer :type="`Foto ${slotProps.data.name}`" :is-success="true" :bbox="[55,55,210]"
              :image="BASE_URL +'avatar/'+ slotProps.data.avatar" />
              <!-- <img
                :src="slotProps.data.avatar ? BASE_URL + slotProps.data.avatar : no_image_icon"
                :alt="slotProps.data.name"
                class="w-full shadow-md rounded"
              /> -->
          </div>
        </template>
      </Column>
      <Column field="name" header="Name" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <span class="text-black">{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column field="usergroup" header="Group" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <Chip v-for="item in slotProps.data.user_group" :key="index" class="p-1 m-1">
              <span
                class="bg-primary-500 text-white rounded-full flex p-1 items-center justify-center m-2 text-[10px]"><i class="pi pi-users"></i></span>
              <span class="mr-2 text-[10px]">{{ item.group.name }}</span>
          </Chip>
        </template>
      </Column>
      <Column field="roleuser" header="Role" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <Chip v-for="item in slotProps.data.role_user" :key="index" class="p-1 m-1">
              <span
                class="bg-green-500 text-white rounded-full flex p-1 items-center justify-center m-2 text-[10px]"><i class="pi pi-briefcase"></i></span>
              <span class="mr-2 text-[10px]">{{ item.role.name }}</span>
          </Chip>
        </template>
      </Column>
      <Column header="Action">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
            <button @click="openPresenceDialog({uuid:slotProps.data.uuid, data:slotProps.data})" class="text-orange-500 hover:text-orange-700 p-1" title="Show this user presence"><i class="pi pi-file"></i></button>
            <button @click="openEditUserDialog(slotProps.data.uuid)" title="Edit this user" class="text-blue-500 hover:text-blue-700 p-1">
              <i class="pi pi-pencil"></i>
            </button>
            <button @click="confirmDeleteUser(slotProps.data.uuid)" title="Delete this user" class="text-red-500 hover:text-red-700 p-1">
              <i class="pi pi-trash"></i>
            </button>
        </template>
      </Column>
    </DataTable>

    <div v-if="isConfirmDialogVisible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-4">Konfirmasi</h2>
        <p>Apakah Anda yakin ingin menghapus pengguna ini?</p>
        <div class="flex justify-end mt-4">
          
          <button @click="handleDeleteUser(confirmingUserId)" class="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Ya
          </button>
          <button @click="isConfirmDialogVisible = false" class="bg-gray-300 text-black px-4 py-2 rounded">
            Tidak
          </button>
        </div>
      </div>
    </div>

    <AddUserDialog :visible="isAddUserDialogVisible" :groupOptions="groupOptions" :roleOptions="roleOptions"
      :permissionOptions="permissionOptions" @update:visible="isAddUserDialogVisible = $event" @user-added="getUsers" />
    
    <ShowPresenceDialog :uuid="selectedUser" :visible="isPresenceDialogVisible"  @update:visible="isPresenceDialogVisible = $event"/>

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
import ShowPresenceDialog from '@/components/ShowPresenceDialog.vue'
import { fetchUsers, deleteUser } from '@/services/User.services'
import { fetchGroups } from '@/services/Group.services'
import { fetchRoles } from '@/services/Role.services'
import { fetchPermissions } from '@/services/Permission.services'
import ImageViewer from '@/components/ImageViewer.vue'
import ProgressSpinner from 'primevue/progressspinner';
import { socket } from "@/socket";
import { data } from 'autoprefixer'
const BASE_URL = import.meta.env.VITE_BACKEND_API
const users = ref([{
  uuid:'29121', 
}])
const isConfirmDialogVisible = ref(false)
const confirmingUserId = ref(null)
const isAddUserDialogVisible = ref(false)
const isEditUserDialogVisible = ref(false)
const isPresenceDialogVisible = ref(false)
const selectedUser = ref(null)
const groupOptions = []
const loading = ref(true)
const roleOptions = []
const permissionOptions = []
const filters = ref(
  {'global': { value: null},'name': { value: null}, 'identityNumber': { value: null}, 'usergroup': { value: null}, 'roleuser': { value: null} }
)
const getUsers = async () => {
  try {
    const response = await fetchUsers()
    loading.value = false
    users.value = response
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
const getGroup = async () => {
  try {
    const response = await fetchGroups()
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
    const response = await fetchRoles()
    roleOptions.value = response.map(item => ({
      uuid: item.uuid,
      label: item.name
    }));
  } catch (error) {
    console.error('Error fetching Role:', error)
  }
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

const handleDeleteUser = async (id) => {
  try {
    const res = await deleteUser(id)
    if(res.title == 'Success'){
      isConfirmDialogVisible.value = false
    }
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
const openPresenceDialog = (user) => {
  selectedUser.value = user
  isPresenceDialogVisible.value = true
}
const updater = () =>{
  getUsers();
  getGroup();
  getRole();
  getPemission();
}

onMounted(() => {
  updater()
  socket.on("update CUD", () => {
    updater()
  });
})
</script>

<style scoped></style>
