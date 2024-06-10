<template>
  <div class="card p-4">
      <DataTable :value="rooms" tableStyle="min-width: 50rem">
          <template #header>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div class="relative">
                      <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input type="text" placeholder="Search..." class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10" />
                  </div>
                  <button class="bg-primary-500 text-white px-4 py-2 rounded-md">+ Add Room</button>
              </div>
          </template>
          <Column field="room" header="Room">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <span class="text-black">{{ slotProps.data.room }}</span>
              </template>
          </Column>
          <Column header="Image">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <img :src="slotProps.data.customImagePath" :alt="slotProps.data.image" class="w-[6rem] shadow-md rounded" />
              </template>
          </Column>
          <Column field="location" header="Location">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <span class="text-black">{{ slotProps.data.location }}</span>
              </template>
          </Column>
          <Column field="token" header="Token">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <span class="text-black">{{ slotProps.data.token }}</span>
              </template>
          </Column>
          <Column field="expired" header="Expired">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <span class="text-black">{{ slotProps.data.expired }}</span>
              </template>
          </Column>
          <Column field="role" header="Role">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <span class="text-black">{{ slotProps.data.role }}</span>
              </template>
          </Column>
          <Column header="Action">
              <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
              </template>
              <template #body="slotProps">
                  <button class="text-blue-500 hover:text-blue-700 p-1">
                      <i class="pi pi-pencil"></i>
                  </button>
                  <button class="text-red-500 hover:text-red-700 p-1">
                      <i class="pi pi-trash"></i>
                  </button>
              </template>
          </Column>
      </DataTable>
      <div class="flex justify-center mt-4">
          <button class="pagination-button bg-gray-200 text-gray-700 px-4 py-2 rounded-l-md">Previous</button>
          <button class="pagination-button bg-gray-200 text-gray-700 px-4 py-2">1</button>
          <button class="pagination-button bg-gray-200 text-gray-700 px-4 py-2">2</button>
          <button class="pagination-button bg-gray-200 text-gray-700 px-4 py-2">3</button>
          <button class="pagination-button bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md">Next</button>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// Static dummy data
const rooms = ref([
  { room: 'Ruang Digital Center 1A', image: 'image1.jpg', location: 'Gedung FMIPA', token: 'abc123', expired: '2024-06-10', role: 'Student' },
  { room: 'Ruang Dosen FE', image: 'image2.jpg', location: 'Gedung FT', token: 'def456', expired: '2024-06-11', role: 'Lecturer' },
  { room: 'Tata Usaha E11', image: 'image3.jpg', location: 'Gedung FT', token: 'ghi789', expired: '2024-06-12', role: 'Lecturer' },
  { room: 'Ruang Skripsi E6', image: 'image4.jpg', location: 'Gedung FT', token: 'jkl012', expired: '2024-06-13', role: 'Student' }
]);

// Update the custom image path
rooms.value = rooms.value.map(room => ({
  ...room,
  customImagePath: `your/custom/path/${room.image}`
}));
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
  transition: background-color 0.3s, color 0.3s;
}
.pagination-button:not(.selected):hover {
  background-color: #E2E8F0; 
}
</style>