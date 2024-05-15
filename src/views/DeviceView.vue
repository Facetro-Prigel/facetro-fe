<template>
  <div class="mt-20 ml-20">
    <h1 class="text-5xl font-bold">Device</h1>
    <ol class="breadcrumb mb-4 mt-4">
      <li class="breadcrumb-item active text-lg mb-10">Ruangan Terinstalasi Device</li>
    </ol>
  </div>

  <div class="mt-20 ml-20 grid grid-cols-3 gap-10">

    <div class="card w-96 bg-primary text-primary-content" v-for="d in data">
      <figure><img src="https://media.istockphoto.com/photos/room-picture-id506340238?k=6&m=506340238&s=612x612&w=0&h=0hy1zY1b0wDVQhNudGvq1Itb1git7Wm9Zo4zPI1F9L4=" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ d }}</h2>
        <p>Lihat Selengkapnya</p>
        <div class="card-actions justify-end">
          <button class="btn">Lihat</button>
          <button class="btn">
            <label class="swap">
              <input type="checkbox" />
              <div class="swap-on">Buka</div>
              <div class="swap-off">Tutup</div>
            </label>
        </button>
        </div>
      </div>
    </div>
    
  </div>

  <button class="btn btn-xs sm:btn-sm md:btn-md mt-5 ml-20 mt-10 bg-primary mb-20 text-white">Tambah Pintu</button>

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  const data = ref([
    "Pintu 1A - Digital Center", "Pintu E11 - Gedung E11 FT", "Pintu E8 - Gedung E8 FT", "Pintu E6 - Gedung E6 FT"
  ])
</script>
