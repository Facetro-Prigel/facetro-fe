<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-3 sm:p-6 rounded shadow-md w-11/12 sm:w-1/2 max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">{{ uuid.data.name }}'s Presence Logs</h2>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        <div class="flex flex-col items-center sm:flex-row bg-gray-200 shadow-lg rounded-xl p-2 sm:p-6 w-full mt-3">
          <div class="flex w-3/4 sm:w-2/12">
            <ImageViewer :type="`Foto Pengguna`" :is-success="true" :bbox="[55, 55, 210]"
              :image="BASE_URL + 'avatar/' + uuid.data.avatar" />
          </div>
          <div class="flex flex-col items-center justify-center w-full sm:w-4/12">
            <p class="text-xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">{{ uuid.data.name }}</p>
            <p class="font-semibold  text-gray-700 text-lg text-center sm:text-left">{{ uuid.data.identity_number }}</p>
          </div>
          <div
            class="flex flex-col items-center sm:items-start justify-center w-full sm:w-6/12 sm:border-t-0 border-t-black border-t-2 mt-2 pt-2 sm:border-l-black sm:border-l-2 sm:ml-2 sm:pl-2 text-center sm:text-left">
            <div class="flex">
              <Time />
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-primary-500 w-full ">Ringkasan Hari Ini</h2>
            <div class="text-[13px] w-full sm:text-lg p-1 sm:p-0">
              <div class="flex w-full felx-col" v-if="login_logout.login">
                <div class="flex w-3/12">Masuk:</div>
                <div class="flex w-9/12 font-bold">{{ login_logout.login }}</div>
              </div>
              <div class="flex w-full felx-col" v-if="!login_logout.login">
                <div class="flex w-full sm:w-10/12 font-bold  text-white bg-red-600 px-2 py-1 rounded-md">
                  {{ uuid.data.name }} belum melakukan presensi hari ini!
                </div>
              </div>
              <div class="flex w-full felx-col" v-if="login_logout.remaning">
                <div class="flex w-3/12">Sisa:</div>
                <div class="flex w-9/12 font-bold">{{ login_logout.remaning }}</div>
              </div>
              <div class="flex w-full felx-col" v-if="login_logout.elapsed">
                <div class="flex w-3/12">Ditempuh:</div>
                <div class="flex w-9/12 font-bold">{{ login_logout.elapsed }}</div>
              </div>
              <div class="flex w-full felx-col" v-if="login_logout.logout">
                <div class="flex w-3/12">Keluar:</div>
                <div class="flex w-9/12 font-bold"> {{ login_logout.logout }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-300 rounded-2xl p-5 shadow-xl mt-3 flex max-xl:flex-col justify-center items-center">
          <div class="max-xl:w-full w-7/12">
            <h1 class="text-lg sm:text-4xl font-bold text-primary-500">Ringkasan Presensi</h1>
            <h2 class="text-sm sm:text-3xl">Grafik Harian dalam Seminggu</h2>
            <Chart type="bar" :data="chartData" :options="chartOptions" />
          </div>
          <div class="max-xl:w-full w-5/12 flex flex-col justify-center items-center p-2">
            <div class="bg-gray-200 p-2 rounded-xl my-2 w-full">
              <h2 class="text-sm sm:text-md">Waktu yang dihabiskan dalam seminggu:</h2>
              <PrenceBar :value="dashboardData.weekly_minutes ?? 0" :target="2400" :max="2823" :isTime="true">
              </PrenceBar>
            </div>
            <div class="bg-gray-200 p-2 rounded-xl my-2 w-full">
              <h2 class="text-sm sm:text-md">Waktu yang dihabiskan dalam sebulan:</h2>
              <PrenceBar :value="dashboardData.monthly_minutes ?? 0" :target="9600" :max="11294" :isTime="true">
              </PrenceBar>
            </div>
            <div class="bg-gray-200 p-2 rounded-xl my-2 w-full">
              <h2 class="text-sm sm:text-md">Waktu yang dihabiskan dalam semester:</h2>
              <PrenceBar :value="dashboardData.semester_minutes ?? 0" :target="33000" :max="38823" :isTime="true">
              </PrenceBar>
            </div>
          </div>

        </div>
        <div class="bg-gray-200  rounded-2xl p-2 sm:p-5 shadow-xl mt-3 flex flex-col justify-center items-center ">
          <h1 class="text-lg sm:text-4xl font-bold text-primary-500">Log Presensi</h1>
          <div class="w-full">
            <DataTable :value="logs" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
              tableStyle="min-width: 50rem" v-model:filters="filters" :globalFilterFields="['created_at', 'type']">
              <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div class="relative">
                    <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input v-model="filters['global'].value" type="text" placeholder="Search..."
                      class="p-inputtext p-component border border-gray-300 rounded-md p-2 pl-10 w-full " />
                  </div>
                </div>
              </template>
              <Column field="image_path" header="Image">
                <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
                </template>
                <template #body="slotProps">
                  <div class="flex max-w-[175px] min-w-[100px]">
                    <ImageViewer :type="`Foto ${uuid.data.name}`" :is-success="true" :bbox="slotProps.data.bbox"
                      :image="BASE_URL + 'photos/' + slotProps.data.image_path" />
                  </div>
                </template>
              </Column>
              <Column field="created_at" header="Timestamp" sortable>
                <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
                </template>
                <template #body="slotProps">
                  <span class="text-black">{{ convertToLocale(new Date(slotProps.data.created_at)) }}</span>
                </template>
              </Column>

              <Column field="type" header="Type" sortable>
                <template #header="slotProps">
                  <span class="text-black">{{ slotProps.header }}</span>
                </template>
                <template #body="slotProps">
                  <span class="text-black">{{ slotProps.data.type }}</span>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="$emit('update:visible', false)" class="bg-gray-300 text-black px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import ImageViewer from '@/components/ImageViewer.vue';
import { ref, watch, onMounted } from 'vue'
import { userPresenceLog } from '@/services/User.services'
import Chart from 'primevue/chart';
import PrenceBar from '@/components/PrenceBar.vue';
import Time from "./Time.vue";
const BASE_URL = import.meta.env.VITE_BACKEND_API
const logs = ref();
const login_logout = ref({
  login: null,
  logout: null,
  remaning: null,
  elapsed: null
})
const filters = ref(
  { 'global': { value: null }, 'created_at': { value: null }, 'type': { value: null } }
)
const dashboardData = ref({
  weekly_minutes: 0,
  monthly_minutes: 0,
  semester_minutes: 0,
  today_login: null,
  daily_minutes: [],
});
const props = defineProps({
  uuid: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})
let dates;
const chartData = ref();
const chartOptions = ref();

// Variabel untuk menyimpan ID interval
let updateInterval = null;

// Flag untuk melacak apakah pembaruan sedang berjalan
const isUpdating = ref(false);
let kali = 0;
const startUpdatingTime = () => {
  if (!isUpdating.value) {
    isUpdating.value = true; // Set flag ke true
    updateInterval = setInterval(() => {
      const currentTime = Date.now(); // Waktu saat ini dalam milidetik
      const loginTime = new Date(dashboardData.value.today_login_2).getTime(); // Waktu login dalam milidetik
      const elapsedMinutes = (currentTime - loginTime) / (1000 * 60); // Selisih dalam menit

      // Tambahkan waktu yang telah berlalu ke semester_minutes, monthly_minutes, dan weekly_minutes
      dashboardData.value.semester_minutes += elapsedMinutes;
      dashboardData.value.monthly_minutes += elapsedMinutes;
      dashboardData.value.weekly_minutes += elapsedMinutes;

      // Perbarui sisa waktu dan waktu yang telah berlalu
      const s = calculateElapsedTimeOrRemaining(dashboardData.value.today_login, currentTime, 480);
      login_logout.value.remaning = s[1];
      login_logout.value.elapsed = s[0];

      // Reset today_login ke waktu saat ini agar penghitungan dimulai dari waktu terakhir
      dashboardData.value.today_login_2 = new Date(currentTime).toISOString();

      // Perbarui chartData dengan data baru
      if (kali >= 30 || kali == 0) {
        const updatedDailyMinutes = dashboardData.value.daily_minutes.map((item) => {
          if (item.date === getCurrentDate()) {
            return { ...item, minutes: item.minutes + (elapsedMinutes * Math.max(kali, 1)) };
          }
          return item;
        });
        dashboardData.value.daily_minutes = updatedDailyMinutes;
        if (kali >= 30) {
          kali = 0;
        }
        updateChartData(updatedDailyMinutes);
      }
      kali++;
    }, 1000); // Interval 1 detik
  }
};

// Fungsi untuk menghentikan pembaruan waktu
const stopUpdatingTime = () => {
  if (isUpdating.value) {
    clearInterval(updateInterval); // Hentikan interval
    isUpdating.value = false; // Set flag ke false
  }
};
const formatMinutesToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const wholeMinutes = Math.floor(remainingMinutes);
  const seconds = Math.round((remainingMinutes - wholeMinutes) * 60);
  return `${hours}j ${wholeMinutes}m ${seconds}d`;
};

const calculateElapsedTimeOrRemaining = (startTime, endTime, targetTimeInMinutes = 0) => {
  // Konversi waktu login dan waktu saat ini ke objek Date
  const loginTime = new Date(startTime);
  const now = new Date(endTime);

  // Hitung selisih waktu dalam menit
  let elapsedMinutes = (now - loginTime) / (1000 * 60); // Konversi milidetik ke menit

  if (targetTimeInMinutes > 0) {
    // Jika targetTimeInMinutes diberikan, hitung waktu tersisa
    let remainingMinutes = targetTimeInMinutes - elapsedMinutes;

    // Pastikan waktu tersisa tidak negatif
    remainingMinutes = Math.max(remainingMinutes, 0);

    // Format hasil menggunakan formatMinutesToHoursAndMinutes
    return [formatMinutesToHoursAndMinutes(elapsedMinutes), formatMinutesToHoursAndMinutes(remainingMinutes)];
  } else {
    // Jika targetTimeInMinutes = 0, kembalikan waktu yang dihabiskan
    return formatMinutesToHoursAndMinutes(elapsedMinutes);
  }
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const minutes = context.parsed.y;
            const formattedTime = formatMinutesToHoursAndMinutes(minutes);
            return `${context.dataset.label}: ${formattedTime}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
          callback: function (value) {
            return formatMinutesToHoursAndMinutes(value);
          },
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    props.uuid.uuid = '';
    login_logout.value = {
      login: null,
      logout: null,
      remaning: null,
      elapsed: null
    }
    logs.value = null;
    dashboardData.value = {
      weekly_minutes: 0,
      monthly_minutes: 0,
      semester_minutes: 0,
      today_login: null,
      daily_minutes: [],
    }
  } else {
    chartOptions.value = setChartOptions();
    fetchUserDashboard()
  }
})

const fetchUserDashboard = async () => {
  try {
    stopUpdatingTime(); // Hentikan pembaruan waktu sebelum memuat data baru
    const response = await userPresenceLog(props.uuid.uuid);
    if (response) {
      dashboardData.value = response;
      dashboardData.value.today_login_2 = response.today_login;

      // Logika untuk menentukan warna latar belakang
      const getBackgroundColor = (minutes) => {
        return minutes > 480 ? 'rgba(50, 205, 50,.75)' : 'rgba(199, 0, 57, .75)';
      };
      logs.value = response.log
      // Ekstrak tanggal dan menit dari daily_minutes
      dates = dashboardData.value.daily_minutes.map((item) => {
        let s = item.date;
        s = s.split('-');
        return new Date(`${s[0]}-${s[1]}-${s[2]}T00:00:00.000+07:00`).toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'full',
        });
      });

      if (response.today_login) {
        login_logout.value.login = new Date(response.today_login).toLocaleString('id-ID', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timeStyle: 'long',
          dateStyle: 'medium',
        });
      }

      if (response.today_logout) {
        login_logout.value.logout = new Date(response.today_logout).toLocaleString('id-ID', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timeStyle: 'long',
          dateStyle: 'medium',
        });
        login_logout.value.elapsed = calculateElapsedTimeOrRemaining(
          response.today_login,
          response.today_logout
        );
      }

      const minutes = dashboardData.value.daily_minutes.map((item) => item.minutes);
      const backgroundColors = minutes.map((minute) => getBackgroundColor(minute));

      chartData.value = {
        labels: dates,
        datasets: [
          {
            type: 'line',
            label: '',
            data: minutes,
            borderColor: 'orange',
            backgroundColor: backgroundColors,
            tension: 0.5,
          },
          {
            type: 'bar',
            label: 'Menit',
            data: minutes,
            backgroundColor: backgroundColors,
          },
        ],
      };

      if (dashboardData.value.today_login && !dashboardData.value.today_logout) {
        startUpdatingTime(); // Mulai pembaruan waktu jika kondisi terpenuhi
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

const updateChartData = (updatedDailyMinutes) => {
  const minutes = updatedDailyMinutes.map((item) => item.minutes);

  // Fungsi untuk menentukan warna latar belakang
  const getBackgroundColor = (minutes) => {
    return minutes > 480 ? 'rgba(50, 205, 50,.75)' : 'rgba(199, 0, 57, .75)';
  };

  const backgroundColors = minutes.map((minute) => getBackgroundColor(minute));

  // Perbarui chartData
  chartData.value = {
    labels: dates,
    datasets: [
      {
        type: 'line',
        label: 'Waktu yang dihabiskan',
        data: minutes,
        borderColor: 'orange',
        backgroundColor: backgroundColors,
        tension: 0.5,
      },
      {
        type: 'bar',
        label: 'Waktu yang dihabiskan',
        data: minutes,
        backgroundColor: backgroundColors,
      },
    ],
  };
};
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}
onMounted(async () => {
  socket.on("logger update", async () => {
    await fetchUserDashboard()
  });
})
</script>

<style scoped></style>