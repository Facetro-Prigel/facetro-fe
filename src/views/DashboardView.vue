<template>
  <div class="flex items-center justify-center h-screen">
    <TitleComponent title="UNNESTech" subtitle="Dashboard" />
    <div class="flex items-center justify-center w-3/4 text-center">
      <div class="flex-col items-center justify-center w-1/4 bg-gray-300 p-3 rounded-2xl shadow-xl">
        <ImageViewer :type="`Foto Pengguna`" :is-success="true" :bbox="[55, 55, 210]"
          :image="BASE_URL + 'avatar/' + user.avatar" />
        <h1 class="text-md">Selamat Datang</h1>
        <h2 class="text-xl font-bold mb-2">{{ user.name }}</h2>
        <h3 class="bg-black text-white text-sm overflow-hidden mb-1 p-2 rounded-sm">{{ user.email }}</h3>
        <Time></Time>
      </div>
      <div class="w-3/4 bg-gray-100 ml-2 rounded-2xl p-5 shadow-xl">
        <h1 class="text-3xl font-bold">Ringkasan Presensi</h1>
        <h2 class="text-xl">Grafik Harian dalam Seminggu</h2>
        <Chart type="bar" :data="chartData" :options="chartOptions" />
        <div class="bg-gray-200 p-3 rounded-xl my-2">
          <h2 class="text-xl">Waktu yang dihabiskan dalam seminggu:</h2>
          <PrenceBar :value="dashboardData.weekly_minutes ?? 0" :target="2400" :max="2823" :isTime="true"></PrenceBar>
        </div>
        <div class="bg-gray-200 p-3 rounded-xl my-2">
          <h2 class="text-xl">Waktu yang dihabiskan dalam sebulan:</h2>
          <PrenceBar :value="dashboardData.monthly_minutes ?? 0" :target="9600" :max="11294" :isTime="true"></PrenceBar>
        </div>
        <div class="bg-gray-200 p-3 rounded-xl my-2">
          <h2 class="text-xl">Waktu yang dihabiskan dalam semester:</h2>
          <PrenceBar :value="dashboardData.semester_minutes ?? 0" :target="33000" :max="38823" :isTime="true"></PrenceBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImageViewer from '@/components/ImageViewer.vue';
import Time from '@/components/Time.vue';
import { getUserProfile, dashboard } from '@/services/MyProfile.services';
import { ref, onMounted, onUnmounted } from 'vue';
import Chart from 'primevue/chart';
import PrenceBar from '@/components/PrenceBar.vue';

const BASE_URL = import.meta.env.VITE_BACKEND_API;
const chartData = ref();
const chartOptions = ref();
let dates;
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
    const response = await dashboard();
    if (response) {
      dashboardData.value = response;

      // Fungsi untuk menentukan warna latar belakang
      const getBackgroundColor = (minutes) => {
        return minutes > 480 ? 'rgba(50, 205, 50,.75)' : 'rgba(199, 0, 57, .75)';
      };

      // Ekstrak tanggal dan menit dari daily_minutes
      dates = dashboardData.value.daily_minutes.map((item) => {
        let s = item.date;
        s = s.split('-');
        return new Date(`${s[0]}-${s[1]}-${s[2]}T00:00:00.000+07:00`).toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'full',
        });
      });
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

      // Mulai interval jika today_login ada
      startUpdatingTime();
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

const startUpdatingTime = (kali = 0) => {
  if (dashboardData.value.today_login && !dashboardData.value.today_logout) {
    const currentTime = Date.now(); // Waktu saat ini dalam milidetik
    const loginTime = new Date(dashboardData.value.today_login).getTime(); // Waktu login dalam milidetik
    const elapsedMinutes = (currentTime - loginTime) / (1000 * 60); // Selisih dalam menit

    // Tambahkan waktu yang telah berlalu ke semester_minutes, monthly_minutes, dan weekly_minutes
    dashboardData.value.semester_minutes += elapsedMinutes;
    dashboardData.value.monthly_minutes += elapsedMinutes;
    dashboardData.value.weekly_minutes += elapsedMinutes;

    // Perbarui daily_minutes dengan menambahkan waktu yang telah berlalu
    const updatedDailyMinutes = dashboardData.value.daily_minutes.map((item) => {
      if (item.date === getCurrentDate()) {
        // Jika tanggal sesuai dengan hari ini, tambahkan waktu yang telah berlalu
        return { ...item, minutes: item.minutes + elapsedMinutes };
      }
      return item;
    });

    // Update daily_minutes di dashboardData
    dashboardData.value.daily_minutes = updatedDailyMinutes;

    // Reset today_login ke waktu saat ini agar penghitungan dimulai dari waktu terakhir
    dashboardData.value.today_login = new Date(currentTime).toISOString();

    // Perbarui chartData dengan data baru
    if(kali == 6 || kali == 0){
      updateChartData(updatedDailyMinutes);
    }
    if(kali < 12){
      setTimeout(() => {
        startUpdatingTime(kali+1)
      }, 5000);
    }else{
      fetchUserDashboard()
    }
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

onMounted(() => {
  fetchUserProfile();
  fetchUserDashboard();
  chartOptions.value = setChartOptions();
});
</script>

<style scoped>
/* Your scoped styles here */
</style>