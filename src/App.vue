<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast';
import { onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import eventBus from '@/services/eventBus';
const toast = useToast();
onMounted(() => {
  // Tangkap event dari interceptor
  eventBus.on('api-error', (toastData) => {
    toast.add({ 
      severity: toastData.severity,
      summary: toastData.summary,
      detail: toastData.detail,
      life: 3000 
    });
  });
});
</script>

<template class="min-h-screen bg-primary">
  <header>
  </header>
  <Toast />
  <router-view :key="$route.fullPath"/>
</template>