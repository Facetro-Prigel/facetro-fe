<template>
  <Navbar />
  <div class="flex justify-center items-center h-screen pt-28">
    <div class="w-full max-w-[1650px] h-[650px] bg-primary-400 border-2 border-white border-opacity-50 rounded-2xl flex justify-center items-center">
      <!-- Konten Anda di sini -->
      <div class="flex mx-20 space-x-80">
        <div class="w-1/2 text-white px-20 mt-20 lg:px-10 md:px-5 sm:px-2">
          <h1 class="text-5xl font-semibold">FACETRO</h1>
          <br />
          <p class="text-base font-reguler">
            FACETRO adalah Sistem presensi yang didukung oleh Artificial Intelligent (AI) untuk melakukan pencatatan kehadiran dengan sistem yang memiliki otomatisasi. FACETRO dapat mendeteksi dan mengenali wajah, memberi informasi jam masuk dan jam keluar, dan melakukan penyambutan (welcoming).
          </p>
          <br /><br />
          <button class="bg-secondary-400 hover:bg-blue-700 text-black font-light py-4 px-10  rounded">
            Learn More
          </button>
        </div>
        <div class="w-1/2 lg:px-10 md:px-5 sm:px-2">
          <!-- Tempat untuk gambar Anda -->
          <img src="/src/assets/Icon.png">
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap justify-center items-center mx-auto max-w-[1650px]">
    <!-- Bagian Deskripsi -->
    <div class="w-full md:w-3/5 p-4">
      <div class="bg-white rounded p-4">
        <h2 class="font-semibold text-5xl mb-2 pr-60">Facial Recognition Attendance</h2>
        <br><br>
        <p class="pr-80">Biarkan FACETRO mengambil alih tugas pencatatan kehadiran dengan teknologi pengenalan wajah yang cerdas. Tanpa perlu scan kartu atau pencatatan manual, 
          sistem kami secara otomatis mengidentifikasi karyawan saat mereka memasuki dan meninggalkan lokasi kerja.</p>
      </div>
    </div>
    <!-- Bagian Gambar -->
    <div class="w-full md:w-2/5 p-4">
      <div class="bg-white rounded p-4">
        <img src="/src/assets/FCR.png" alt="Gambar Produk" style="width: 600px;">
      </div>
    </div>
  </div>
  <div class="flex flex-wrap justify-center items-center mx-auto max-w-[1650px]">
    <!-- Bagian Gambar -->
    <div class="w-full md:w-3/5 p-4">
      <div class="bg-white rounded p-4">
        <img src="/src/assets/monitoring.png" alt="Gambar Produk" style="width: 600px;">
      </div>
    </div>
    <!-- Bagian Deskripsi -->
    <div class="w-full md:w-2/5 p-4">
      <div class="bg-white rounded p-4">
        <h2 class="font-semibold text-5xl mb-2 pr-40">Real-time Monitoring</h2>
        <br><br>
        <p>Lupakan pencatatan manual yang memakan waktu dan rawan kesalahan. 
          Dengan FACETRO, pengelolaan waktu karyawan menjadi lebih efisien dan akurat berkat sistem otomatis yang canggih.</p>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap justify-center items-center mx-auto max-w-[1650px]">
    <!-- Bagian Deskripsi -->
    <div class="w-full md:w-3/5 p-4">
      <div class="bg-white rounded p-4">
        <h2 class="font-semibold text-5xl mb-2 pr-60">Security and Privacy Assurance</h2>
        <br><br>
        <p class="pr-80">FACETRO bukan sekadar sistem presensi biasa. Kami adalah solusi terdepan untuk mencatat kehadiran karyawan dengan kecerdasan buatan, 
          membawa pengalaman yang lebih efisien, cerdas, dan menyenangkan bagi bisnis Anda.</p>
      </div>
    </div>
    <!-- Bagian Gambar -->
    <div class="w-full md:w-2/5 p-4">
      <div class="bg-white rounded p-4">
        <img src="/src/assets/Data security.png" alt="Gambar Produk" style="width: 600px;">
      </div>
    </div>
  </div>
  <Footer />
</template>
  
<script setup>
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
</script>
  
<style scoped>
  
</style>
