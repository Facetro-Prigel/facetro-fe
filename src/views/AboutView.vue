<template>
  <Navbar />
  <div class=" justify-center items-center mx-auto max-w-[1650px] pt-48">
      <h1 class="font-medium text-5xl">Temui Tim Luar Biasa Kami</h1>
      <br />
      <br />
      <p class="pr-[350px]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard 
      </p>
    <div class="flex justify-center items-center mt-16">
      <img src="/src/assets/about-us.png" alt="" class="" />
    </div>
    <div class="flex w-full mt-20 gap-40">
      <div class="md:w-1/2 mx-38  pl-60">
        <h1 class="font-medium text-5xl">Tentang Kami</h1>
        <br />
        <br />
        <p class="">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </p>
      </div>
      <div class="md:w-1/2 pr-60">
        <h1 class="font-medium text-5xl">Bidang Kami</h1>
        <br />
        <br />
        <p >
          Kami bergerak di berbagai bidang, termasuk pengembangan perangkat
          lunak, desain UI/UX, analisis data, kecerdasan buatan, dan
          teknologi terkini lainnya. Dengan fokus pada inovasi dan kualitas,
          kami bertekad untuk memberikan hasil terbaik bagi setiap proyek
          yang kami tangani.
        </p>
      </div>
    </div>
    <h1 class="text-center text-5xl font-medium mt-20">The Team</h1>
    <div class="gap-20 flex justify-center items-center">
      <CardAbout class="m-2" style="min-width: 200px;" :name="'Muhammad Iqbal'" role="Team Leader" :imgcr="'/src/assets/iqbal.png'"/>
      <CardAbout class="m-2" style="min-width: 200px;" :name="'Dimas Sakha Fauzi'" role="Realtime Video Engineer" :imgcr="'/src/assets/dimas.png'"/>
      <CardAbout class="m-2" style="min-width: 200px;" :name="'Anggito Wahyu Adi'" role="UI/UX Designer &
      Frontend Developer" :imgcr="'/src/assets/ito.png'"/>
    </div>
    <div class="gap-20 flex justify-center items-center mb-20">
      <CardAbout class="m-2" style="min-width: 200px;" :name="'M. Alvin Fajri'" role="Backend Developer" :imgcr="'/src/assets/alvin.png'"/>
      <CardAbout class="m-2" style="min-width: 200px;" :name="'Alena Ghinna Kirana'" role="Role" :imgcr="'/src/assets/alena.png'"/>
      <CardAbout class="m-2" style="min-width: 200px;" :name="'Kolitatul Azizah'" role="Hardware Engineer" :imgcr="'/src/assets/azizah.png'"/>
    </div>
  </div>
  <Footer />
</template>
  
  <script setup>
  import CardAbout from '../components/CardAbout.vue'
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
  </script>
  
  <style  scoped>
  
  </style>