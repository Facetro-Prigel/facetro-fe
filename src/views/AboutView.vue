<template>
  <Navbar />
  <div class="container mx-auto pt-36 sm:pt-48 px-4 md:px-8 lg:px-0">
    <h1 class="font-medium text-4xl sm:text-5xl text-center sm:text-left">Temui Tim Luar Biasa Kami</h1>
    <br />
    <br />
    <p class="text-base sm:text-lg text-center sm:text-left max-w-[800px] mx-auto sm:mx-0">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
    </p>
    <div class="flex justify-center items-center mt-16">
      <img src="/src/assets/about-us.png" alt="" class="w-full max-w-[600px]" />
    </div>
    <div class="flex flex-col md:flex-row w-full mt-20 gap-10 md:gap-40 px-4">
      <div class="md:w-1/2">
        <h1 class="font-medium text-3xl sm:text-5xl">Tentang Kami</h1>
        <br />
        <br />
        <p class="text-base sm:text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
        </p>
      </div>
      <div class="md:w-1/2">
        <h1 class="font-medium text-3xl sm:text-5xl">Bidang Kami</h1>
        <br />
        <br />
        <p class="text-base sm:text-lg">
          Kami bergerak di berbagai bidang, termasuk pengembangan perangkat lunak, desain UI/UX, analisis data, kecerdasan buatan, dan teknologi terkini lainnya. Dengan fokus pada inovasi dan kualitas, kami bertekad untuk memberikan hasil terbaik bagi setiap proyek yang kami tangani.
        </p>
      </div>
    </div>
    <h1 class="text-center text-3xl sm:text-5xl font-medium mt-20">The Team</h1>
    <div class="flex flex-wrap justify-center items-center gap-6 my-10">
      <div class="flex flex-wrap justify-center gap-6">
        <CardAbout name="Muhammad Iqbal" role="Team Leader" imgcr="/src/assets/iqbal.png" />
        <CardAbout name="Dimas Sakha Fauzi" role="Realtime Video Engineer" imgcr="/src/assets/dimas.png" />
        <CardAbout name="Anggito Wahyu Adi" role="UI/UX Designer & Frontend Developer" imgcr="/src/assets/ito.png" />
      </div>
      <div class="flex flex-wrap justify-center gap-6 mt-10">
        <CardAbout name="M. Alvin Fajri" role="Backend Developer" imgcr="/src/assets/alvin.png" />
        <CardAbout name="Alena Ghinna Kirana" role="Administrator" imgcr="/src/assets/alena.png" />
        <CardAbout name="Kolitatul Azizah" role="Hardware Engineer" imgcr="/src/assets/azizah.png" />
      </div>
    </div>
    <h1 class="text-center text-3xl sm:text-5xl font-medium mt-20">The Mentor</h1>
    <div class="flex flex-wrap justify-center items-center gap-6 my-10">
      <div class="flex flex-wrap justify-center gap-8">
        <CardAbout name="Akhmad Munawar, S. Pd."  imgcr="/src/assets/akhmad.png" />
        <CardAbout name="LEDI DIYANASARI, S.Kom., M.Kom."  imgcr="/src/assets/ledi.png" />
        <CardAbout name="ALFATH YANUARTO, S.Kom."  imgcr="/src/assets/alfath.png" />
      </div>
      <div class="flex flex-wrap justify-center gap-6 mt-10">
        <CardAbout name="Dr. Anan Nugroho, S.T., M.Eng." imgcr="/src/assets/anan.png" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import CardAbout from '../components/CardAbout.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
