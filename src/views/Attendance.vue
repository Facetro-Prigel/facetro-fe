<template>
    <div>
      <AttCard :cards="attendanceCards" />
    </div>
  </template>
  
  <script>
  import AttCard from '@/components/AttCard.vue';
  
  export default {
    components: {
      AttCard,
    },
    data() {
      return {
        attendanceCards: [
          {
            name: 'MICHAEL JONATHAN P.',
            nim: '123456789',
            inTime: '08:30:00',
            image: '/src/assets/presence/photo_6089143361274493833_x.jpg'
          },
          {
            name: 'ANGGITO WAHYU ADI',
            nim: '987654321',
            inTime: '08:45:00',
            image: '/src/assets/presence/photo_6089044078810478927_x.jpg'
          },
          {
            name: 'HILMI SYAMSUDIN',
            nim: '456123789',
            inTime: '09:00:00',
            image: '/src/assets/presence/photo_6089031949822835531_x.jpg'
          },
          {
            name: 'DIMAS SAKHA FAUZI',
            nim: '789456123',
            inTime: '09:15:00',
            image: '/src/assets/presence/photo_6082579659108760239_x.jpg'
          },
          {
            name: 'KEVYN ALIFIAN HERNANDA WIBOWO',
            nim: '321654987',
            inTime: '09:30:00',
            image: '/src/assets/presence/photo_6080368103138640321_x.jpg'
          },
          {
            name: 'ARI FARHANSYACH DIRAJA',
            nim: '654789321',
            inTime: '09:45:00',
            image: '/src/assets/presence/photo_6080368103138640320_x.jpg'
          },
          // Tambahkan data untuk kartu lainnya di sini
        ]
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  