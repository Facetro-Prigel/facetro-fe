<template>
    <div>
        {{ datas }}
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TestServices from '@/services/Test.services';
const datas = ref()
const response = await TestServices.login()
</script>