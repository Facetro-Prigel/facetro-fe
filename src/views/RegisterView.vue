<template>
  <div class="container-fluid px-20 mt-10">
    <h1 class="mt-4 text-5xl font-bold">Daftar</h1>
    <ol class="breadcrumb mb-4 mt-4">
      <li class="breadcrumb-item active text-lg mb-10">Pendaftaran Akses</li>
    </ol>

    <div class="flex flex-col gap-4 max-w-md mt-5">
      <div class="flex items-center gap-2">
        <h1 class="w-24">Email:</h1>
        <label class="flex-1 input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type="text" class="input-text" placeholder="Email" />
        </label>
      </div>

      <div class="flex items-center gap-2 mt-5">
        <h1 class="w-24">Username:</h1>
        <label class="flex-1 input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" class="input-text" placeholder="Username" />
        </label>
      </div>

      <div class="flex items-center gap-2 mt-5">
        <h1 class="w-24">Password:</h1>
        <label class="flex-1 input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
          <input type="password" class="input-text" value="password" />
        </label>
      </div>

      <div class="flex items-center gap-2 mt-5">
        <h1 class="w-24">Peran:</h1>
        <select class="flex-1 input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
          <option>- Pilih Peran</option>
          <option>Mahasiswa</option>
          <option>Dosen</option>
          <option>Pegawai</option>
          <option>Lainnya</option>
        </select>
      </div>

      <div class="flex items-center gap-2 mt-5">
        <h1 class="w-24">Kirim Foto:</h1>
        <input type="file" class="flex-1 file-input file-input-bordered w-full max-w-md" />
      </div>
      
      <button class="btn btn-xs sm:btn-sm md:btn-md mt-5">Daftar</button>

    </div>
  </div>
</template>

<script setup>

</script>
