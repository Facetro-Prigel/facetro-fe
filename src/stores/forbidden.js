import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'


export const useForbiddenStore = defineStore('forbidden', () => {
  const router = useRouter();
  const forbidden = ref({
    message:""
  })
  const show403 = (msg) =>{
    forbidden.value.message = msg
    router.push({ name: '403' })
  }
  return {forbidden, show403}
})


