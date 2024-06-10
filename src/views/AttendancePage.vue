<template>
    <div>
      <AttCard :cards="attendanceCards" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AttCard from '@/components/AttCard.vue'
  // Jika Anda perlu menggunakan fetchAttendanceLogs di masa depan, impor sekarang
  // import { fetchAttendanceLogs } from '@/services/Attendance.services'
  
  const attendanceCards = ref([
    {
      name: 'MICHAEL JONATHAN P.',
      nim: '123456789',
      device: 'Gedung Digital Center'
      inTime: '08:30:00',
      image: '/src/assets/presence/photo_6089143361274493833_x.jpg'
    },
    {
      name: 'ANGGITO WAHYU ADI',
      nim: '987654321',
      device: 'Gedung Digital Center'
      inTime: '08:45:00',
      image: '/src/assets/presence/photo_6089044078810478927_x.jpg'
    },
    {
      name: 'HILMI SYAMSUDIN',
      nim: '456123789',
      device: 'Gedung Digital Center'
      inTime: '09:00:00',
      image: '/src/assets/presence/photo_6089031949822835531_x.jpg'
    },
    {
      name: 'DIMAS SAKHA FAUZI',
      nim: '789456123',
      device: 'Gedung Digital Center'
      inTime: '09:15:00',
      image: '/src/assets/presence/photo_6082579659108760239_x.jpg'
    },
    {
      name: 'KEVYN ALIFIAN HERNANDA WIBOWO',
      nim: '32165',
      inTime: '09:30:00',
      image: '/src/assets/presence/photo_6080368103138640321_x.jpg'
    },
    {
      name: 'ARI FARHANSYACH DIRAJA',
      nim: '654789321',
      inTime: '09:45:00',
      image: '/src/assets/presence/photo_6080368103138640320_x.jpg'
    }
    // Tambahkan data untuk kartu lainnya di sini
  ])
  </script>