  <template>
    <div>
      <AttCard :cards="attendanceCards" />
    </div>
  </template>
  
  <script setup>
  import { socket } from "@/socket";
  import AttCard from '@/components/AttCard.vue';
  import { fetchAttendanceLogs } from '@/services/Attendance.services';
  import { ref, onMounted } from  'vue'
  const attendanceCards = ref([])
  const getLogs = async () => {
    return await fetchAttendanceLogs()
  }
  console.log(getLogs())
  onMounted(async ()=>{
    attendanceCards.value = await fetchAttendanceLogs()
    socket.on("logger update", async (...args) => {
      attendanceCards.value = await fetchAttendanceLogs()
    });
  })
  </script>

  