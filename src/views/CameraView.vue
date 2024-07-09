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
          
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Ruang Skripsi E6', 
          description: 'Logitech C922 Pro Stream Webcam', 
          
          location: 'Location 1 - Gedung FT'
       },
        { 
          title: 'Tata Usaha Dekanat', 
          description: 'Logitech C922 Pro Stream Webcam', 
          
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Ruang Lab Praktikum', 
          description: 'Logitech C922 Pro Stream Webcam', 
          
          location: 'Location 1 - Gedung FT'
        },
        { 
          title: 'Rumah Ilmu', 
          description: 'Deskripsi untuk Room 3', 
          
          location: 'Location 2 - Gedung FMIPA'
        },
        { 
          title: 'Gedung Digital Center 1A', 
          description: 'Deskripsi untuk Room 4', 
          
          location: 'Location 2 - Gedung FMIPA'
        },
        { 
          title: 'Gedung Digital Center 1A', 
          description: 'Deskripsi untuk Room 4', 
          
          location: 'Location 2 - Gedung FMIPA'
        },
        { 
          title: 'Gedung Digital Center 1A', 
          description: 'Deskripsi untuk Room 4', 
          
          location: 'Location 2 - Gedung FMIPA'
        },
      ]
    };
  }
};
</script>

<style scoped>
</style>