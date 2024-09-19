  <template>
    <DataTable :value="attendanceCards" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" v-model:filters="filters" 
    :globalFilterFields="['name', 'identityNumber', 'inTime', 'device', 'group' ]" >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input v-model="filters['global'].value" type="text" placeholder="Search..."
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10" />
          </div>
        </div>
      </template>
      <Column field="image" header="Photo">
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <div class="flex max-w-[175px] min-w-[100px]">
            <ImageViewer :type="`Foto ${slotProps.data.avatar}`" :is-success="slotProps.data.isMatch" :bbox="slotProps.data.bbox"
              :image="BASE_URL + slotProps.data.image" />
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
      <Column field="nim" header="Identity Number" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          {{ slotProps.data.nim }}
        </template>
      </Column>
      <Column field="device" header="Presence In" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          {{ slotProps.data.device }}
        </template>
      </Column>

      <Column field="inTime" header="Waktu" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          
          {{ convertToLocale(new Date(slotProps.data.inTime)) }}
        </template>
      </Column>

      <Column field="group" header="Group" sortable>
        <template #header="slotProps">
          <span class="text-black">{{ slotProps.header }}</span>
        </template>
        <template #body="slotProps">
          <Chip v-for="item in slotProps.data.group" :key="index" class="p-1 m-1">
              <span
                class="bg-primary-500 text-white rounded-full flex p-1 items-center justify-center m-2 text-[10px]"><i class="pi pi-users"></i></span>
              <span class="mr-2 text-[10px]">{{ item }}</span>
            </Chip>
        </template>
      </Column>
    </DataTable>

  </template>
  
  <script setup>
  import { socket } from "@/socket";
  import ImageViewer from '@/components/ImageViewer.vue'
  import { fetchAttendanceLogs } from '@/services/Attendance.services';
  import { ref, onMounted } from  'vue'
  import BASE_URL from '@/stores/config';
  const attendanceCards = ref([])
  const getLogs = async () => {
    return await fetchAttendanceLogs()
  }
  const filters = ref(
  {'global': { value: null},'name': { value: null}, 'identityNumber': { value: null}, 'inTime': { value: null}, 'device': { value: null} }
)
const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
  console.log(getLogs())
  onMounted(async ()=>{
    attendanceCards.value = await fetchAttendanceLogs()
    socket.on("logger update", async (...args) => {
      attendanceCards.value = await fetchAttendanceLogs()
    });
  })
  </script>

  