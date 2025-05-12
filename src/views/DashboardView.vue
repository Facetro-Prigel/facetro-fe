<template>
  <div class="flex items-center justify-center">
    <TitleComponent title="UNNESTech" subtitle="Dashboard" />
    <div class="flex-col items-center justify-center w-11/12">
      <div class="flex flex-col items-center sm:flex-row bg-gray-200 shadow-lg rounded-xl p-6 w-full mt-3">
        <div class="flex w-3/4 sm:w-2/12">
          <ImageViewer :type="`Foto Pengguna`" :is-success="true" :bbox="[55, 55, 210]"
            :image="BASE_URL + 'avatar/' + user.avatar" />
        </div>
        <div class="flex flex-col justify-center sm:w-4/12">
          <h2 class="text-lg sm:text-2xl">Selamat Datang</h2>
          <p class="text-xl sm:text-3xl font-bold text-gray-800">{{ user.name }}</p>
          <p class="font-semibold text-sm text-white bg-black px-2 py-1 rounded-lg">{{ user.email }}</p>
          <p class="font-semibold  text-gray-700 text-sm sm:text-lg">{{ user.identity_number }}</p>
        </div>
        <div class="flex flex-col w-full justify-center sm:w-6/12 border-t-black border-t-2 sm:border-l-black sm:border-l-2 sm:border-t-0 mt-2 pt-2 sm:mt-0  sm:ml-2 sm:pl-2">
          <div class="flex">
            <Time />
          </div>
          <h2 class="text-lg sm:text-3xl font-bold text-primary-500">Ringkasan Hari Ini</h2>
          <div class="text-sm sm:text-xl">
            <div class="flex w-full felx-col" v-if="login_logout.login">
              <div class="flex max-2xl:w-3/12 w-2/12">Masuk:</div>
              <div class="flex max-2xl:w-9/12 w-10/12 font-bold">{{ login_logout.login }}</div>
            </div>
            <div class="flex w-full felx-col" v-if="!login_logout.login">
              <div class="flex w-full sm:w-10/12 text-sm sm:text-lg font-bold text-1xl text-white bg-red-600 px-2 py-1 rounded-md">Anda belum melakukan
                presensi hari ini!</div>
            </div>
            <div class="flex w-full felx-col" v-if="login_logout.remaning">
              <div class="flex max-2xl:w-3/12 w-2/12">Sisa:</div>
              <div class="flex max-2xl:w-9/12 w-10/12 font-bold">{{ login_logout.remaning }}</div>
            </div>
            <div class="flex w-full felx-col" v-if="login_logout.elapsed">
              <div class="flex max-2xl:w-3/12 w-2/12">Ditempuh:</div>
              <div class="flex max-2xl:w-9/12 w-10/12 font-bold">{{ login_logout.elapsed }}</div>
            </div>
            <div class="flex w-full felx-col" v-if="login_logout.logout">
              <div class="flex max-2xl:w-3/12 w-2/12">Keluar:</div>
              <div class="flex max-2xl:w-9/12 w-10/12 font-bold"> {{ login_logout.logout }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-300 rounded-2xl p-5 shadow-xl mt-3 flex max-xl:flex-col justify-center items-center">
        <div class="w-full xl:w-7/12">
          <h1 class="text-lg sm:text-4xl font-bold text-primary-500">Ringkasan Presensi</h1>
          <h2 class="text-md sm:text-3xl">Grafik Harian dalam Seminggu</h2>
          <Chart type="bar" :data="chartData" :options="chartOptions" />
        </div>
        <div class="max-xl:w-full w-5/12 flex flex-col justify-center items-center p-2">
          <div class="bg-gray-200 p-2 rounded-xl my-2 w-full">
            <h2 class="text-sm sm:text-xl">Waktu yang dihabiskan dalam seminggu:</h2>
            <PrenceBar :value="dashboardData.weekly_minutes ?? 0" :target="2400" :max="2823" :isTime="true"></PrenceBar>
          </div>
          <div class="bg-gray-200 p-2 rounded-xl my-2 w-full">
            <h2 class="text-sm sm:text-xl">Waktu yang dihabiskan dalam sebulan:</h2>
            <PrenceBar :value="dashboardData.monthly_minutes ?? 0" :target="9600" :max="11294" :isTime="true">
            </PrenceBar>
          </div>
          <div class="bg-gray-200 p-2 rounded-xl my-2 w-full">
            <h2 class="text-sm sm:text-xl">Waktu yang dihabiskan dalam semester:</h2>
            <PrenceBar :value="dashboardData.semester_minutes ?? 0" :target="33000" :max="38823" :isTime="true">
            </PrenceBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import ImageViewer from '@/components/ImageViewer.vue';
import Time from '@/components/Time.vue';
import { getUserProfile, dashboard } from '@/services/MyProfile.services';
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import PrenceBar from '@/components/PrenceBar.vue';
let kali = 0;
const BASE_URL = import.meta.env.VITE_BACKEND_API;
const chartData = ref();
const chartOptions = ref();
let dates;
const login_logout = ref({
  login: null,
  logout: null,
  remaning: null,
  elapsed: null
})
const dashboardData = ref({
  weekly_minutes: 0,
  monthly_minutes: 0,
  semester_minutes: 0,
  today_login: null,
  daily_minutes: [],
});
const user = ref({
  name: '',
  identity_number: '',
  email: '',
  birthday: '',
  batch: '',
  program_study: '',
  phone_number: '',
  user_group: [],
  role: [],
  permission: [],
});

let updateInterval = null;
const isUpdating = ref(false);

const fetchUserProfile = async () => {
  try {
    const response = await getUserProfile();
    if (response) {
      user.value = response;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUserDashboard = async () => {
  try {
    stopUpdatingTime();
    const response = await dashboard();
    if (response) {
      dashboardData.value = response;
      dashboardData.value.today_login_2 = response.today_login;
      // Fungsi untuk menentukan warna latar belakang
      const getBackgroundColor = (minutes) => {
        return minutes > 480 ? 'rgba(50, 205, 50,.75)' : 'rgba(199, 0, 57, .75)';
      };
      kali = 0;
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
          dateStyle: 'medium'
        })
      }
      if (response.today_logout) {
        login_logout.value.logout = new Date(response.today_logout).toLocaleString('id-ID', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timeStyle: 'long',
          dateStyle: 'medium'
        });
        login_logout.value.elapsed = calculateElapsedTimeOrRemaining(response.today_login, response.today_logout)
      }
      const minutes = dashboardData.value.daily_minutes.map((item) => item.minutes);

      // Membuat array backgroundColor berdasarkan daily_minutes
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
        startUpdatingTime();
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

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
            return { ...item, minutes: item.minutes + (elapsedMinutes*Math.max(kali, 1)) };
          }
          return item;
        });
        dashboardData.value.daily_minutes = updatedDailyMinutes;
        if(kali >= 30){
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


onMounted(async () => {
  await fetchUserProfile();
  await fetchUserDashboard();
  chartOptions.value = setChartOptions();

  socket.on("logger update", async () => {
    await fetchUserDashboard()
  });
});
</script>

<style scoped>
/* Your scoped styles here */
</style>