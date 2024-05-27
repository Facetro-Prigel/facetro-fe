<template>
  <Navbar/>
  <div class="justify-center items-center mx-auto max-w-[1650px] pt-48">
    <h1 class="font-medium text-5xl">Hubungi Kami</h1>
    <br />
    <br />
    <p class="w-[420px] h-[150px]">
      Tertarik berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi kami melalui info kontak yang tertera di bawah.
      Kami siap membantu mewujudkan ide dan proyek Anda!
    </p>
    <div class="flex">
      <div class="w-1/2 lg:px-10 md:px-5 sm:px-2">
        <div class="flex text-center gap-5">
          <div class="bg-primary-500 w-[72px] h-[72px] rounded">
            <img src="/src/assets/Icon.png" alt="" style="width: 64px;">
          </div>
          <div>
            <h5 class="text-[20px] font-medium">Our Location</h5>
            <p class="w-[255px] h-[60px]">Jln. Raya Sekaran 08 RT01/RW02 20256, Semarang, Indonesia</p>
          </div>
        </div>
        <div class="flex text-center mt-4 gap-5">
          <div class="bg-primary-500 w-[72px] h-[72px] rounded">
            <img src="/src/assets/Icon.png" alt="" style="width: 64px;">
          </div>
          <div>
            <h5 class="text-[20px] font-medium">Phone Number</h5>
            <p class="w-[255px] h-[60px]">085123609879</p>
          </div>
        </div>
        <div class="flex text-center mt-4 gap-5">
          <div class="bg-primary-500 w-[72px] h-[72px] rounded">
            <img src="/src/assets/Icon.png" alt="" style="width: 64px;">
          </div>
          <div>
            <h5 class="text-[20px] font-medium">Email Address</h5>
            <p class="w-[255px] h-[60px]">Info@yourdomain</p>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-30">
          <div class="bg-primary-200 rounded-lg flex justify-center absolute left-2/3 top-64 w-[500px] h-[700px]">
            <form>
              <input v-model="name" type="text" placeholder="Your Name" class="input-field" style="margin-top:40px;">
              <input v-model="email" type="text" placeholder="Your Email" class="input-field">
              <input v-model="phone" type="text" placeholder="Your Phone" class="input-field">
              <textarea v-model="message" placeholder="Message" rows="10" class="input-field"></textarea>
              <button @click="sendMessage" class="bg-secondary-500 hover:bg-secondary-300 text-black font-semibold py-4 px-[163px] ml-[30px] mt-6 shadow">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="items-center justify-center text-center mt-96 mb-20">
      <h1 class="text-5xl font-medium">Stay Tuned</h1>
      <p class="text-3xl font-reguler">Langganan Info Terbaru & Update dari Kami</p>
      <div class="flex justify-center items-center mt-6">
        <form action="" class="flex items-center">
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
  width: 440px;
  outline: 2px ridge #303030;
  background-color: #fff;
  border: none;
  padding: 1rem;
  margin-left: 30px;
  margin-top: 30px;
  font-size: 1rem;
}

.input-update {
  width: 520px;
  height: 66px;
  outline: 2px ridge #303030;
  background-color: #fff;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 10px 0px 0px 10px;
}
</style>
