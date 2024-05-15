<template>
    <div>
    <div class="flex hero  h-screen  items-center justify-center ">
      <div class="hero-content text-center bg-white shadow-lg bg-opacity-50 rounded-3xl p-5">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold text-black">Login</h1>
          <p class="py-6 text-black">
            Selamat Datang!
          </p>
            <div>
                <input type="text" placeholder="Username" class="input w-full max-w-xs mb-3 mr-3 bg-slate-200"/><i class="far fa-user"></i>
                <input type="text" placeholder="Password" class="input w-full max-w-xs mb-5 mr-3 bg-slate-200" /><i class="fas fa-lock"></i>
            </div>

            <button class="btn glass py-4 px-20 mb-5 bg-yellow-200 text-black">Login</button>
            
            <div class="flex justify-center ml-5 ">
              <img src="../../assets\logo\google_logo.png" alt="Google Logo" class="h-10 mr-4">
              <img src="../../assets\logo\github_logo.png" alt="Google Logo" class="h-10 mr-4">
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
