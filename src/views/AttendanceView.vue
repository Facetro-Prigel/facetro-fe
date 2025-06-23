<template>
  <div class="card p-4">
    <h1 class="text-xl font-semibold mb-5"><i class="pi pi-chart-bar mr-2"></i>Attendance Logs</h1>
    <DataTable :value="attendanceCards" :lazy="true" paginator :rows="filters.rows" :totalRecords="totalRecords"
        :rowsPerPageOptions="[5, 10, 20, 50, 100]" :loading="loading" tableStyle="min-width: 50rem"
        v-model:filters="filters" @page="onPageChange" @sort="onSortChange"
        :globalFilterFields="['name', 'identityNumber', 'inTime', 'device', 'group']">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input v-model="filters['global'].value" type="text" placeholder="Search..."
              class="p-inputtext p-compon   ent border border-gray-300 rounded-md p-2 pl-10" />
          </div>
          <button @click="showExportDialog = true" class="flex bg-secondary-400 hover:bg-secondary-500 px-3 py-2 rounded-lg justify-center items-center drop-shadow-md">
            <i class="pi pi-file-excel"></i><div class="ml-2">Download Excel</div>
          </button>
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
              :bbox="slotProps.data.bbox" :image="BASE_URL +'photos/'+ slotProps.data.image" />
          </div>
        </template>
      </Column>
      <Column field="avatar" header="Avatar">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="flex max-w-[175px] min-w-[100px]">
            <ImageViewer :type="`Foto ${slotProps.data.avatar}`" :is-success="slotProps.data.is_match"
              :bbox="[55,55,210]" :image="BASE_URL +'avatar/'+ slotProps.data.avatar" />
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

      <Column field="actions" header="Actions">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <button @click="handleEdit(slotProps.data)" 
                  class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-all">
            <i class="pi pi-pencil"></i>
          </button>

          <button @click="handleDelete(slotProps.data.uuid)" 
                  class="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-all">
            <i class="pi pi-trash"></i>
          </button>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showExportDialog" header="Export Attendance Logs" :modal="true" class="w-[30rem]">
      <div class="p-2">
        <!-- Report Type Selection -->
        <div class="mb-4">
          <p class="font-semibold mb-2">Select Report Type:</p>
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <input type="radio" id="quickReport" value="quick" v-model="reportType" class="mr-2" />
              <label for="quickReport">Quick Report</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="fullReport" value="full" v-model="reportType" class="mr-2" />
              <label for="fullReport">Full Report</label>
            </div>
          </div>
        </div>

        <!-- Field Checklist (only shown for Quick Report) -->
        <div v-if="reportType === 'quick'" class="bg-gray-100 p-3 rounded border border-gray-300 mb-4">
          <p class="font-semibold mb-2">Select fields to export:</p>
          <div class="grid grid-cols-2 gap-2">
            <div v-for="field in availableFields" :key="field.value" class="flex items-center">
              <input type="checkbox" :id="field.value" :value="field.value" v-model="selectedFields" class="mr-2" />
              <label :for="field.value">{{ field.label }}</label>
            </div>
          </div>
          <p v-if="selectedFields.length === 0" class="text-red-500 text-xs mt-2">Please select at least one field.</p>
        </div>

        <!-- Start Date -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Start Date</label>
          <Calendar v-model="exportStartDate" dateFormat="dd-mm-yy" showIcon class="w-full border border-gray-300 rounded" />
        </div>

        <!-- End Date -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">End Date</label>
          <Calendar v-model="exportEndDate" dateFormat="dd-mm-yy" showIcon class="w-full border border-gray-300 rounded" />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-2 mt-4">
          <button @click="showExportDialog = false" class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            @click="handleDownloadExcel"
            class="px-4 py-2 rounded text-white transition-all"
            :class="isDownloadDisabled ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
            :disabled="isDownloadDisabled"
          >
            Download
          </button>
        </div>
      </div>
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog v-model:visible="showEditDialog" header="Edit Attendance Data" :modal="true" class="w-[50rem]">
      <div class="p-4">
        <div class="grid grid-cols-2 gap-8">
          <!-- FROM Section -->
          <div class="border-r pr-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-700">From</h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                v-model="editData.fromName" 
                type="text" 
                class="w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                readonly
                disabled
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Identity Number</label>
              <input 
                v-model="editData.fromIdentityNumber" 
                type="text" 
                class="w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                readonly
                disabled
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Presence/Door Type</label>
              <input 
                v-model="editData.fromType" 
                type="text" 
                class="w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                readonly
                disabled
              />
            </div>
          </div>

          <!-- TO Section -->
          <div class="pl-8">
            <h3 class="text-lg font-semibold mb-4 text-gray-700">To</h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div class="p-2 border border-gray-200 rounded-md">
                <AutoComplete
                  v-model="editData.toName"
                  :suggestions="suggestions"
                  @complete="searchNames"
                  @item-select="item => {
                    editData.toUuid = item.value.uuid;
                    editData.toIdentityNumber = item.value.identity_number;
                  }"
                  field="name"
                  class="w-full !border-0"
                  :inputClass="'w-full border-0 p-0 focus:outline-none focus:ring-0'"
                  :panelClass="'border border-gray-200 rounded-md'"
                  filter
                  forceSelection
                  placeholder="Click to see all names or type to search"
                  :dropdown="true"
                  :showClear="true"
                />
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Identity Number</label>
              <input 
                v-model="editData.toIdentityNumber" 
                type="text" 
                class="w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                placeholder="Select a name first"
                readonly
                disabled
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Presence/Door Type</label>
              <div class="p-2 border border-gray-200 rounded-md">
                <Dropdown
                  v-model="editData.toType"
                  :options="presenceTypes"
                  placeholder="Select Type"
                  class="w-full !border-0"
                  :panelClass="'border border-gray-200 rounded-md'"
                  :inputClass="'w-full border-0 p-0 focus:outline-none focus:ring-0'"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button 
            @click="showEditDialog = false" 
            class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            @click="saveEdit" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            :disabled="!isFormValid"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import ImageViewer from '@/components/ImageViewer.vue'
import { fetchAttendanceLogs, downlaodFullAttendanceLogs, downlaodQuickAttendanceLogs, updateAttendance, deleteAttendance} from '@/services/Attendance.services';
import { fetchUsers } from '@/services/User.services';
import { ref, onMounted, watch, computed } from 'vue'
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chip from 'primevue/chip';
import Dropdown from 'primevue/dropdown';

const BASE_URL = import.meta.env.VITE_BACKEND_API
const attendanceCards = ref([])
const loading = ref(true)
const totalRecords = ref()

const showExportDialog = ref(false);
const exportStartDate = ref(null);
const exportEndDate = ref(null);
const reportType = ref('quick'); // default to quick report
const selectedFields = ref([]); // default

const availableFields = [
  { label: 'Name', value: 'name' },
  { label: 'Identity Number', value: 'identity_number' },
  { label: 'Photo', value: 'photo' },
  { label: 'Waktu', value: 'in_time' },
  { label: 'Presence/Door', value: 'type' },
  { label: 'Device', value: 'device' },
  { label: 'Group', value: 'group' }
];

const allUsers = ref([]);
const suggestions = ref([]);

const loadAllUsers = async () => {
  try {
    const response = await fetchUsers();
    allUsers.value = response;
  } catch (error) {
    console.error('Error fetching users:', error);
    allUsers.value = [];
  }
};

const searchNames = async (event) => {
  try {
    const query = event.query.toLowerCase();
    // If query is empty (initial click), show all names
    const data = allUsers.value.map(user => ({
      uuid: user.uuid,
      name: user.name,
      identity_number: user.identity_number
    }));
    
    if (!query) {
      suggestions.value = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
    } else {
      // Filter based on query
      suggestions.value = data.filter(item => 
        item.name.toLowerCase().includes(query)
      );
    }
  } catch (error) {
    console.error('Error searching names:', error);
    suggestions.value = [];
  }
};

let searchTimeout;
const filters = ref(
  {
    page: 1,
    rows: 5,
    sort: 'created_at',
    order: 'desc',
    global: { value: null },
    'name': { value: null },
    'identityNumber': { value: null },
    'inTime': { value: null },
    'device': { value: null }
  }
)
watch(
  () => filters.value.global.value,
  (newValue) => {
    clearTimeout(searchTimeout); // Hapus timeout sebelumnya
    searchTimeout = setTimeout(() => {
      fetchData(); // Panggil fetchData setelah delay
    }, 500);
  }
);
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetchAttendanceLogs({
      page: filters.value.page,
      limit: filters.value.rows,
      search: filters.value.global.value,
      sort: filters.value.sort,
      order: filters.value.order
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
const onSortChange = (event) => {
  filters.value.sort = event.sortField; // Update sort field
  filters.value.order = event.sortOrder === 1 ? 'asc' : 'desc'; // Update sort order
  fetchData();
};
const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
// Button disabled logic
const isDownloadDisabled = computed(() => {
  // const dateNotFilled = !exportStartDate.value || !exportEndDate.value
  // const quickNotChecked = !isQuickReport.value
  // const fieldsNotSelected = selectedFields.value.length === 0
  // return dateNotFilled || quickNotChecked || fieldsNotSelected
  return false
})


const handleDownloadExcel = () => {
  if (isDownloadDisabled.value) return

  // Format dates to YYYY-MM-DD using local timezone
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const startDate = formatDate(exportStartDate.value);
  const endDate = formatDate(exportEndDate.value);

  if (reportType.value === 'quick') {
    downlaodQuickAttendanceLogs({
      start_date: startDate,
      end_date: endDate,
      quick: true,
      columns: selectedFields.value
    })
  } else {
    downlaodFullAttendanceLogs({
      start_date: startDate,
      end_date: endDate
    })
  }

  showExportDialog.value = false
}

const showEditDialog = ref(false)
const editData = ref({
  originalUuid: '',
  fromUuid: '',
  fromName: '',
  fromIdentityNumber: '',
  fromType: '',
  toUuid: '',
  toName: '',
  toIdentityNumber: '',
  toType: ''
})

const presenceTypes = ref([
  'Login',
  'Logout',
  'Door'
])

const isFormValid = computed(() => {
  return editData.value.toUuid && editData.value.toType;
})

const handleEdit = (data) => {
  editData.value = {
    originalUuid: data.uuid,
    fromUuid: data.uuid,
    fromName: data.name,
    fromIdentityNumber: data.identity_number,
    fromType: data.type,
    toUuid: '',
    toName: '',
    toIdentityNumber: '',
    toType: ''
  }
  showEditDialog.value = true
}
const handleDelete = async (uuid) =>{
  try {
    const response = await deleteAttendance(uuid);
    if (response) {
      await fetchData();
    }
  } catch (error) {
    console.error('Error delete logs:', error);
  }
}

const saveEdit = async () => {
  try {
    if (!editData.value.originalUuid || !editData.value.toUuid) {
      console.error('Missing required UUIDs');
      return;
    }

    const response = await updateAttendance(editData.value.originalUuid, {
      user_uuid: editData.value.toUuid,
      type: editData.value.toType
    });

    if (response) {
      showEditDialog.value = false;
      await fetchData();
    }
  } catch (error) {
    console.error('Error saving changes:', error);
    // You might want to show an error message to the user here
  }
}

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchData(), loadAllUsers()]);
  loading.value = false;
  socket.on("logger update", async () => {
    await fetchData();
  });
})
</script>

