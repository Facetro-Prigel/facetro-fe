<template>
  <div class="card p-4">
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-key mr-2"></i>Manage Permission</h1>
    <DataTable :value="datas" paginator  v-model:filters="filters" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
      :globalFilterFields="['name', 'description']" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex justify-end">
            <div class="p-inputtext p-component border border-gray-300 rounded-md p-2 hover:border-primary-500 focus-within:border-primary-300">
              <i class="pi pi-search" />
              <input  class ='ml-2 focus:outline-none' v-model="filters['global'].value" placeholder="Keyword Search" />
            </div>
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
          <button @click="openEditUserDialog(slotProps.data.uuid)" class="text-blue-500 hover:text-blue-700 p-1">
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
const filters = ref({
    global: { value: null},
    name: { value: null},
    description: { value: null}
});
const datas = ref([
  {
    "uuid": "0995b559-99eb-4581-92e9-4fd029ee7324",
    "name": "Can Get Device",
    "description": "his Role/User can get general information of single Device."
  },
  {
    "uuid": "0c91d00c-e578-4bb2-8fbd-0881e15d11dc",
    "name": "Can Update Permission",
    "description": "This Role/User can update another Permission."
  },
  {
    "uuid": "1ef86fd6-5d9c-46bb-bb4a-c094add89ce3",
    "name": "Can Update Device",
    "description": "This Role/User can updating another Device."
  },
  {
    "uuid": "2159ed75-b416-4669-a893-0c003081f740",
    "name": "Can Asign Role To Permision",
    "description": "This Task can Asign Role To permision"
  },
  {
    "uuid": "28301324-02ba-410c-9815-6b959fbb0f9b",
    "name": "Can Get Multiple Roles",
    "description": "This Role/User can get general information of multiple Roles."
  },
  {
    "uuid": "2b285876-b833-4c4a-b9a9-0e19a9c9a85b",
    "name": "Log Anywhere",
    "description": "This User Can Absent On Any Device."
  },
  {
    "uuid": "3467b218-4e53-48f2-bc0e-5f4747a8080d",
    "name": "Log Delete",
    "description": "Log Has Been Deleted"
  },
  {
    "uuid": "40e8aa2c-33d0-4405-bc43-7da2556a9cb7",
    "name": "Can Create User",
    "description": "This Role/User can create another user."
  },
  {
    "uuid": "43c2ef4c-d537-4fd7-8deb-d8a6b51ba1f5",
    "name": "Can Asign User To Group",
    "description": "This Task can Asign User To Group"
  },
  {
    "uuid": "46178960-7ac4-4482-909f-a0db8d8c3d4f",
    "name": "Can Get Multiple User ",
    "description": "This Role/User can get general information of multi user."
  },
  {
    "uuid": "4b636785-a30c-4c30-867d-3d591770d1f7",
    "name": "Can Delete Role",
    "description": "This Role/User can delete another Role."
  },
  {
    "uuid": "4e353b9e-d633-4286-b382-15dbd46e76c0",
    "name": "Can Update User",
    "description": "This Role/User can updating another user."
  },
  {
    "uuid": "55b243e5-8943-44ec-8070-055c5005da4d",
    "name": "Can Delete Permission",
    "description": "This Role/User can delete another Permission."
  },
  {
    "uuid": "587c5efe-62de-4ea1-a010-282d827659fe",
    "name": "Log Update",
    "description": "Log Has Been Updated"
  },
  {
    "uuid": "5c9369e8-6cfd-427b-a4c5-d289caf2727a",
    "name": "Can Asign User To Role",
    "description": "This Task can Asign User To Role"
  },
  {
    "uuid": "5ef886e5-6d63-4bfc-afbb-69378d9e96ed",
    "name": "Can Create Role",
    "description": "This Role/User can create another Role."
  },
  {
    "uuid": "6c47a2b0-664f-4469-b5e8-6c557acd5d4e",
    "name": "Can Delete Group",
    "description": "This Role/User can delete another Group."
  },
  {
    "uuid": "739c7b2d-d8f0-4cdb-aefa-22f0586680ef",
    "name": "Download Photo",
    "description": "This Role/User Can Download Photo From Log ."
  },
  {
    "uuid": "8697ae35-a3d5-4dad-a3f5-c0017ea66e45",
    "name": "Can Delete User",
    "description": "This Role/User can deleting another user."
  },
  {
    "uuid": "92ace377-5562-4f79-9340-8e5f580a962f",
    "name": "Can Get Multiple Groups",
    "description": "This Role/User can get general information of multiple Groups."
  },
  {
    "uuid": "a41bc386-0c4e-4fda-8efa-451edb757d98",
    "name": "Can Get Group",
    "description": "This Role/User can get general information of a single Group."
  },
  {
    "uuid": "a97928a8-3b0f-423f-8b40-099da65fa8cf",
    "name": "Can Update Group",
    "description": "This Role/User can update another Group."
  },
  {
    "uuid": "ac6de91e-177c-4bdd-a9f5-0007fc6c14d9",
    "name": "Can Get Role",
    "description": "This Role/User can get general information of a single Role."
  },
  {
    "uuid": "cb4dfb77-2ec2-4005-b883-8ef05ec309dd",
    "name": "Can Get Multiple Device ",
    "description": "This Role/User can get  information of multi Device."
  },
  {
    "uuid": "d4710055-4540-48d2-bdd2-48b44ca80854",
    "name": "Can Delete Device",
    "description": "This Role/User can deleting another Device."
  },
  {
    "uuid": "dfe08ba3-2ecb-4748-afbc-7a80defd4017",
    "name": "Can Get Multiple Permissions",
    "description": "This Role/User can get general information of multiple Groups."
  },
  {
    "uuid": "e697e61a-50ce-44f8-abe9-412444ad8aa7",
    "name": "Can Update Role",
    "description": "This Role/User can update another Role."
  },
  {
    "uuid": "e77c0082-857d-4222-8ea5-ab0bcaef0de4",
    "name": "Can Create Device",
    "description": "This Role/User can create another Device."
  },
  {
    "uuid": "ec4b9c87-fed7-4898-b2ae-277e6a93b6f7",
    "name": "Can Get Permission",
    "description": "This Role/User can get general information of a single Permission."
  },
  {
    "uuid": "f1144ba0-b0c2-48a3-8452-a1fc4f8b6100",
    "name": "Can Create Permission",
    "description": "This Role/User can create another Permission."
  },
  {
    "uuid": "f2549c31-ffee-45f8-a4bf-74c6e1077f79",
    "name": "Can Asign User To Permision",
    "description": "This Task can Asign User To Permision"
  },
  {
    "uuid": "fac760f7-dd69-4831-bc9f-f88319a3bcbe",
    "name": "Can Create Group",
    "description": "This Role/User can create another Group."
  },
  {
    "uuid": "fc4aa7b0-b134-410d-a253-aa526f9556c4",
    "name": "Can Get User",
    "description": "This Role/User can get general information of single user."
  }
])
</script>

<style scoped></style>
