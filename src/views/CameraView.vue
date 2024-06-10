<template>
  <div>
    <CameraCard :columns="cameraColumns" />
  </div>
</template>

<script>
import CameraCard from '@/components/CameraCard.vue';

export default {
  components: {
    CameraCard,
  },
  data() {
    return {
      cameraColumns: [
        { 
          title: 'Tata Usaha E11', 
          description: 'CAMERA_C1_PRO', 
          image: '/src/assets/Room1.png',
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Ruang Skripsi E6', 
          description: 'Logitech C922 Pro Stream Webcam', 
          image: '/src/assets/Room2.png',
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Tata Usaha Dekanat', 
          description: 'Logitech C922 Pro Stream Webcam', 
          image: '/src/assets/Room2.png',
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Ruang Lab Praktikum', 
          description: 'Logitech C922 Pro Stream Webcam', 
          image: '/src/assets/Room2.png',
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Rumah Ilmu', 
          description: 'Deskripsi untuk Room 3', 
          image: '/src/assets/Room1.png',
          location: 'Location 2 - Gedung FMIPA'
        },
        { 
          title: 'Gedung Digital Center 1A', 
          description: 'Deskripsi untuk Room 4', 
          image: '/src/assets/Room1.png',
          location: 'Location 2 - Gedung FMIPA'
        },
        // Tambahkan data untuk kamera lainnya di sini
      ]
    };
  },
};
</script>

<style scoped>
</style>
