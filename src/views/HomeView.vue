<template>
  <Navbar />
  
  <!-- Hero Section -->
  <div class="flex justify-center items-center h-screen pt-40 sm:pt-28">
    <div class="w-full max-w-[1650px] h-[650px] bg-primary-400 border-2 border-white border-opacity-50 rounded-2xl flex flex-col sm:flex-row justify-center items-center">
      <div class="flex flex-col sm:flex-row mx-10 sm:mx-20 space-y-6 sm:space-y-0 sm:space-x-10 items-center sm:items-start">
        <div class="w-full sm:w-1/2 text-white px-6 sm:px-10 lg:px-20 mt-10 sm:mt-20">
          <h1 class="text-4xl sm:text-5xl font-semibold">FACETRO</h1>
          <br />
          <p class="text-base sm:text-lg font-reguler leading-relaxed">
            FACETRO adalah Sistem presensi yang didukung oleh Artificial Intelligent (AI) untuk melakukan pencatatan kehadiran dengan sistem yang memiliki otomatisasi. FACETRO dapat mendeteksi dan mengenali wajah, memberi informasi jam masuk dan jam keluar, dan melakukan penyambutan (welcoming).
          </p>
          <br /><br />
          <button @click="scrollToContent('facial-recognition-section')" class="bg-secondary-400 hover:bg-blue-700 text-black font-light py-3 sm:py-4 px-8 sm:px-10 rounded">
            Learn More
          </button>
        </div>
        <div class="w-full sm:w-1/2 lg:px-10 sm:px-5 flex justify-center">
          <img src="/src/assets/Icon.png" alt="Icon" class="max-w-full h-auto" style="max-width: 400px;">
        </div>
      </div>
    </div>
  </div>
  
  <!-- Deskripsi dan Gambar Pertama -->
  <div id="facial-recognition-section" class="flex flex-col sm:flex-row justify-center items-center mx-auto max-w-[1650px] p-4 sm:p-0 mt-40">
    <div class="w-full sm:w-3/5 p-4">
      <div class="bg-white rounded p-4">
        <h2 class="font-semibold text-3xl sm:text-5xl mb-4 sm:mb-2">Facial Recognition Attendance</h2>
        <br><br>
        <p class="text-base sm:text-lg pr-4 sm:pr-12">Biarkan FACETRO mengambil alih tugas pencatatan kehadiran dengan teknologi pengenalan wajah yang cerdas. Tanpa perlu scan kartu atau pencatatan manual, sistem kami secara otomatis mengidentifikasi karyawan saat mereka memasuki dan meninggalkan lokasi kerja.</p>
      </div>
    </div>
    <div class="w-full sm:w-2/5 p-4 flex justify-center">
      <div class="bg-white rounded p-4">
        <img src="/src/assets/FCR.png" alt="Gambar Produk" class="max-w-full h-auto" style="max-width: 400px;">
      </div>
    </div>
  </div>
  
  <!-- Deskripsi dan Gambar Kedua -->
  <div id="real-time-monitoring-section" class="flex flex-col sm:flex-row justify-center items-center mx-auto max-w-[1650px] p-4 sm:p-0 mt-20 sm:mt-40">
    <div class="w-full sm:w-2/5 p-4 flex justify-center">
      <div class="bg-white rounded p-4">
        <img src="/src/assets/monitoring.png" alt="Gambar Produk" class="max-w-full h-auto" style="max-width: 400px;">
      </div>
    </div>
    <div class="w-full sm:w-3/5 p-4">
      <div class="bg-white rounded p-4">
        <h2 class="font-semibold text-3xl sm:text-5xl mb-4 sm:mb-2">Real-time Monitoring</h2>
        <br><br>
        <p class="text-base sm:text-lg">Lupakan pencatatan manual yang memakan waktu dan rawan kesalahan. Dengan FACETRO, pengelolaan waktu karyawan menjadi lebih efisien dan akurat berkat sistem otomatis yang canggih.</p>
      </div>
    </div>
  </div>
  
  <!-- Deskripsi dan Gambar Ketiga -->
  <div id="security-privacy-section" class="flex flex-col sm:flex-row justify-center items-center mx-auto max-w-[1650px] p-4 sm:p-0 mt-20 sm:mt-40">
    <div class="w-full sm:w-3/5 p-4">
      <div class="bg-white rounded p-4">
        <h2 class="font-semibold text-3xl sm:text-5xl mb-4 sm:mb-2">Security and Privacy Assurance</h2>
        <br><br>
        <p class="text-base sm:text-lg pr-4 sm:pr-12">FACETRO bukan sekadar sistem presensi biasa. Kami adalah solusi terdepan untuk mencatat kehadiran karyawan dengan kecerdasan buatan, membawa pengalaman yang lebih efisien, cerdas, dan menyenangkan bagi bisnis Anda.</p>
      </div>
    </div>
    <div class="w-full sm:w-2/5 p-4 flex justify-center">
      <div class="bg-white rounded p-4">
        <img src="/src/assets/Data security.png" alt="Gambar Produk" class="max-w-full h-auto" style="max-width: 400px;">
      </div>
    </div>
  </div>
  
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const scrollToContent = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -100; // Sesuaikan dengan offset vertikal yang diinginkan (misalnya -100 untuk menggeser ke atas sebesar 100px)
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
</script>
