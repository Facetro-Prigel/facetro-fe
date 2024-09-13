<script setup>
import { ref } from 'vue';
const props = defineProps({ 'status': String, 'msg': String });
</script>
<template>
    <div v-if="status == 'process'" class="text-white text-2x bg-amber-600 font-bold py-2 rounded-md">
        <i class="animate-spin fas fa-spinner"></i> {{ msg }}
    </div>
    <div v-if="status == 'fail'" class="text-white text-2x bg-red-600 font-bold py-2 rounded-md">
        <i class="fas fa-exclamation-triangle"></i> {{ msg }}
    </div>

    <div v-if="status == 'success'" class="text-white text-2x bg-lime-600 font-bold py-2 rounded-md">
        <i class="fas fa-check-square"></i> {{ msg }}
    </div>
</template>