<template>
  <Navbar />
  <!-- Hero Section -->
  <div class="mx-auto max-w-[1650px] pt-36 sm:pt-48 px-4 md:px-8 lg:px-0">
    <h1 class="font-medium text-4xl sm:text-5xl text-center sm:text-left">Layanan yang Disediakan oleh Facetro</h1>
    <br />
    <br />
    <p class="text-base sm:text-lg max-w-[800px] mx-auto sm:ml-0 sm:mr-auto">
      Facestro menyediakan beragam layanan untuk memenuhi kebutuhan digital Anda. Kami siap membantu Anda mencapai tujuan bisnis dan teknologi Anda. Dengan fokus pada kualitas dan inovasi, kami berkomitmen untuk memberikan solusi yang sesuai dengan kebutuhan Anda.
    </p>
  </div>

  <!-- Layanan Cards -->
  <div class="flex mb-8 sm:mb-20 justify-center flex-wrap">
    <CardServices class="m-2" :title="'Facial Recognition Attendance'" :desc="'Kami menawarkan teknologi pengenalan wajah terdepan yang memungkinkan pencatatan kehadiran secara otomatis dan akurat.'" :imgsrc="'/src/assets/check.svg'" />
    <CardServices class="m-2" :title="'Automated Time Tracking'" :desc="'Dengan menggunakan kecerdasan buatan, sistem kami secara otomatis mencatat jam masuk dan jam keluar karyawan tanpa perlu intervensi manual.'" :imgsrc="'/src/assets/time.svg'" />
    <CardServices class="m-2" :title="'Customized Greetings'" :desc="'FACETRO menyediakan fitur penyambutan yang dapat dipersonalisasi, memberikan pengalaman menyambut yang hangat kepada setiap pengguna.'" :imgsrc="'/src/assets/secure.svg'" />
  </div>
  <div class="flex mb-8 sm:mb-20 justify-center flex-wrap">
    <CardServices class="m-2" :title="'Real-time Monitoring'" :desc="'Melalui platform kami, Anda dapat memantau kehadiran karyawan secara real-time dari mana saja dan kapan saja.'" :imgsrc="'/src/assets/calendar-realtime.svg'" />
    <CardServices class="m-2" :title="'Security and Privacy Assurance'" :desc="'Mengutamakan keamanan dan privasi data dengan mengimplementasikan teknologi terbaru untuk melindungi informasi sensitif Anda.'" :imgsrc="'/src/assets/hearth.svg'" />
    <CardServices class="m-2" :title="'Scalable and Customizable Solutions'" :desc="'Menyediakan solusi yang dapat disesuaikan dengan kebutuhan unik perusahaan Anda, serta dapat berkembang seiring pertumbuhan bisnis Anda.'" :imgsrc="'/src/assets/calendar-add.svg'" />
  </div>

  <Footer />
</template>

<script setup>
import CardServices from '../components/CardServices.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
</style>
