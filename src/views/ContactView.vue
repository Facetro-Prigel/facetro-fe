<template>
  <Navbar />
  <div class="container mx-auto pt-36 sm:pt-48 px-4 md:px-8 lg:px-0">
    <h1 class="font-medium text-4xl sm:text-5xl text-center">Hubungi Kami</h1>
    <br />
    <br />
    <p class="text-base sm:text-lg max-w-[800px] mx-auto text-center">
      Tertarik berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi kami melalui info kontak yang tertera di bawah. Kami siap membantu mewujudkan ide dan proyek Anda!
    </p>
    <div class="flex flex-col md:flex-row mt-10">
      <div class="w-full md:w-1/2 lg:px-10 md:px-5 sm:px-2">
        <div class="flex flex-col gap-5">
          <div class="flex items-center gap-5">
            <div class="bg-primary-500 w-[72px] h-[72px] flex items-center justify-center rounded">
              <i class="pi pi-map-marker text-4xl text-white"></i>
            </div>
            <div>
              <h5 class="text-[20px] font-medium">Our Location</h5>
              <p class="text-base sm:text-lg">Jln. Raya Sekaran, Semarang, Indonesia</p>
            </div>
          </div>
          <div class="flex items-center gap-5 mt-4">
            <div class="bg-primary-500 w-[72px] h-[72px] flex items-center justify-center rounded">
              <i class="pi pi-phone text-4xl text-white"></i>
            </div>
            <div>
              <h5 class="text-[20px] font-medium">Phone Number</h5>
              <p class="text-base sm:text-lg">085123609879</p>
            </div>
          </div>
          <div class="flex items-center gap-5 mt-4">
            <div class="bg-primary-500 w-[72px] h-[72px] flex items-center justify-center rounded">
              <i class="pi pi-envelope text-4xl text-white"></i>
            </div>
            <div>
              <h5 class="text-[20px] font-medium">Email Address</h5>
              <p class="text-base sm:text-lg">Info@yourdomain</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <div class="bg-primary-200 rounded-lg w-full max-w-[500px] p-6 sm:p-10">
          <form>
            <input v-model="name" type="text" placeholder="Your Name" class="input-field">
            <input v-model="email" type="text" placeholder="Your Email" class="input-field">
            <input v-model="phone" type="text" placeholder="Your Phone" class="input-field">
            <textarea v-model="message" placeholder="Message" rows="10" class="input-field"></textarea>
            <button @click="sendMessage" class="bg-secondary-500 hover:bg-secondary-300 text-black font-semibold py-4 px-6 w-full mt-6 shadow">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    <div class="items-center justify-center text-center mt-20 mb-20">
      <h1 class="text-3xl sm:text-5xl font-medium">Stay Tuned</h1>
      <p class="text-xl sm:text-3xl font-regular">Langganan Info Terbaru & Update dari Kami</p>
      <div class="flex justify-center items-center mt-6">
        <form action="" class="flex items-center w-full max-w-[520px] mx-auto">
          <input class="input-update bg-white" type="text" placeholder="Enter Email Address">
          <button class="w-[140px] h-[70px] bg-primary-500 rounded-tl-[0px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[0px] flex items-center justify-center">
            <div class="bg-secondary-500 w-[65px] h-[5px]"></div>
          </button>
        </form>
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
.input-field {
  width: 100%;
  outline: 2px ridge #303030;
  background-color: #fff;
  border: none;
  padding: 1rem;
  margin-top: 30px;
  font-size: 1rem;
}

.input-update {
  width: 100%;
  outline: 2px ridge #303030;
  background-color: #fff;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px 0px 0px 10px;
}
</style>
