  <template>
    <div class="card p-4">
      <h1 class="text-xl font-semibold mb-5"><i class="pi pi-chart-bar mr-2"></i>Attendance Logs</h1>
      <DataTable :value="attendanceCards" :lazy="true" paginator :rows="filters.rows" :totalRecords="totalRecords"
        :rowsPerPageOptions="[5, 10, 20, 50]" :loading="loading" tableStyle="min-width: 50rem" v-model:filters="filters"
        @page="onPageChange" :globalFilterFields="['name', 'identityNumber', 'inTime', 'device', 'group']">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div class="relative">
              <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input v-model="filters['global'].value" type="text" placeholder="Search..."
                class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10" />
            </div>
          </div>
        </template>
        <template #loading>
          <div class="p-5 rounded-xl bg-white flex flex-col drop-shadow-md items-center">
            <ProgressSpinner />
            <p>Loading attendance data. Please wait.</p>
          </div>
        </template>
        <Column field="image" header="Photo">
          <template #header="slotProps">
            <span class="text-black">{{ slotProps.header }}</span>
          </template>
          <template #body="slotProps">
            <div class="flex max-w-[175px] min-w-[100px]">
              <ImageViewer :type="`Foto ${slotProps.data.avatar}`" :is-success="slotProps.data.is_match"
                :bbox="slotProps.data.bbox" :image="BASE_URL + 'photos/' + slotProps.data.image" />
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

        <Column field="identity_number" header="Identity Number" sortable>
          <template #header="slotProps">
            <span class="text-black">{{ slotProps.header }}</span>
          </template>
          <template #body="slotProps">
            {{ slotProps.data.identity_number }}
          </template>
        </Column>
        <Column field="device" header="Presence/Open Door In" sortable>
          <template #header="slotProps">
            <span class="text-black">{{ slotProps.header }}</span>
          </template>
          <template #body="slotProps">
            {{ slotProps.data.device }}
          </template>
        </Column>
        <Column field="type" header="Presence/Door" sortable>
          <template #header="slotProps">
            <span class="text-black">{{ slotProps.header }}</span>
          </template>
          <template #body="slotProps">
            {{ slotProps.data.type }}
          </template>
        </Column>
        <Column field="inTime" header="Waktu" sortable>
          <template #header="slotProps">
            <span class="text-black">{{ slotProps.header }}</span>
          </template>
          <template #body="slotProps">
            {{ convertToLocale(new Date(slotProps.data.in_time)) }}
          </template>
        </Column>

        <Column field="group" header="Group" sortable>
          <template #header="slotProps">
            <span class="text-black">{{ slotProps.header }}</span>
          </template>
          <template #body="slotProps">
            <Chip v-for="(item, index) in slotProps.data.group" :key="index" class="p-1 m-1">
              <span
                class="bg-primary-500 text-white rounded-full flex p-1 items-center justify-center m-2 text-[10px]"><i
                  class="pi pi-users"></i></span>
              <span class="mr-2 text-[10px]">{{ item }}</span>
            </Chip>
          </template>
        </Column>
      </DataTable>
    </div>
  </template>

<script setup>
import { socket } from "@/socket";
import ImageViewer from '@/components/ImageViewer.vue'
import { fetchAttendanceLogs } from '@/services/Attendance.services';
import { ref, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner';
const BASE_URL = import.meta.env.VITE_BACKEND_API
const attendanceCards = ref([])
const loading = ref(true)
const totalRecords = ref()
const filters = ref(
  { page: 1, rows: 5, 'global': { value: null }, 'name': { value: null }, 'identityNumber': { value: null }, 'inTime': { value: null }, 'device': { value: null } }
)
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetchAttendanceLogs({
      page: filters.value.page,
      limit: filters.value.rows
    });
    attendanceCards.value = response.data;
    totalRecords.value = response.total_records;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};
const onPageChange = (event) => {
  filters.value.page = event.page + 1; // PrimeVue uses zero-based indexing
  filters.value.rows = event.rows;
  fetchData();
};
const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
onMounted(async () => {
  loading.value = true
  await fetchData()
  loading.value = false
  socket.on("logger update", async () => {
    await fetchData()
  });
})
</script>

