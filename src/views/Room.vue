<template>
    <div>
      <RoomCard :columns="roomColumns" />
    </div>
  </template>
  
  <script>
  import RoomCard from '@/components/RoomCard.vue';
  
  export default {
    components: {
      RoomCard,
    },
    data() {
      return {
        roomColumns: [
          { 
            title: 'Ruang Digital Center 1A', 
            description: 'CAMERA_C1_PRO', 
            image: '/src/assets/Room1.png',
            labels: ['Dosen', 'Ruangan Bersama'] // Menambahkan lebih dari satu label untuk room ini
          },
          { 
            title: 'Ruang Dosen FE', 
            description: 'Logitech C922 Pro Stream Webcam (V-U0028)', 
            image: '/src/assets/Room2.png',
            labels: ['Dosen'] // Menambahkan satu label untuk room ini
          },
          { 
            title: 'Rumah Ilmu', 
            description: 'Deskripsi untuk Room 2', 
            image: '/src/assets/Room2.png',
            labels: [] // Tidak ada label untuk room ini
          },
          { 
            title: 'Rumah Ilmu', 
            description: 'Deskripsi untuk Room 2', 
            image: '/src/assets/Room2.png',
            labels: [] // Tidak ada label untuk room ini
          },
          // tambahkan data untuk room lainnya di sini
        ]
      };
    },
  };
  </script>
  