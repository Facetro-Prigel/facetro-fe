<template>
    <div class="flex-col items-center justify-center">
        <!-- Menampilkan nilai dan target -->
        <div class="flex items-center justify-end font-semibold">
            <span class="max-2xl:text-lg text-2xl">{{ isTime ? formatMinutesToHoursAndMinutes(value) : value  }}</span>
            <span class="max-2xl:text-sm text-xl text-gray-400">/{{ isTime ? formatMinutesToHoursAndMinutes(target) : target }}</span>
        </div>

        <!-- Progress bar utama -->
        <div class="relative w-full bg-gray-500 rounded-md block overflow-hidden h-4">
            <!-- Progress bar yang diisi -->
            <div 
                :class="barColorClass" 
                class="top-0 left-0 block h-full"
                :style="{ width: widthPercentage + '%' }"
            ></div>

            <!-- Garis target -->
            <div 
                v-if="targetPosition > 0 && targetPosition < 100" 
                class="absolute top-0 bottom-0 w-[5px] bg-blue-500"
                :style="{ left: targetPosition + '%' }"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const formatMinutesToHoursAndMinutes = (minutes) => {
  // Hitung jam, menit, dan detik
  const hours = Math.floor(minutes / 60); // Bagian jam
  const remainingMinutes = minutes % 60; // Sisa menit (termasuk desimal)
  const wholeMinutes = Math.floor(remainingMinutes); // Bagian menit bulat
  const seconds = Math.round((remainingMinutes - wholeMinutes) * 60); // Bagian detik
  // Format output
  return `${hours}j ${wholeMinutes}m ${seconds}d`;
};
// Define props
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  isTime:{
    type: Boolean,
  }
});

// Hitung lebar berdasarkan nilai proporsi value/max
const widthPercentage = computed(() => {
  if (props.max <= 0) return 0; // Hindari pembagian oleh nol
  return Math.min((props.value / props.max) * 100, 100); // Batasi maksimum 100%
});

// Tentukan warna bar berdasarkan kondisi
const barColorClass = computed(() => {
  return props.value < props.target ? 'bg-red-500' : 'bg-green-400';
});

// Hitung posisi garis target berdasarkan proporsi target/max
const targetPosition = computed(() => {
  if (props.max <= 0) return 0; // Hindari pembagian oleh nol

  return Math.min((props.target / props.max) * 100, 100); // Batasi maksimum 100%
});
</script>
