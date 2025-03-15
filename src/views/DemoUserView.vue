<template>
  <div class="flex justify-center">
    <div class="flex flex-col bg-gray-300 m-2 rounded-lg p-2 justify-center items-center max-w-[720px]">
      <h1 class="text-2xl text-center font-bold mt-4">User Demo FACETRO</h1>
      <div class="max-w-[500px] ">
        <Camera @image-frame="getImageFrame" ref="camera" />
      </div>
      <Alert :status="alertData.status" :msg="alertData.msg"></Alert>
      <label for="name" class="block text-lg text-center font-medium text-gray-700">Masukan Namamu!<span
          class="text-red-400">*</span></label>
      <input type="text" v-model="user.name" id="name" placeholder="Enter name"
        class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
      <button @click="handleAddUser()" ref="saveBtn"
        class="bg-blue-700 transition duration-300 text-white py-2 mt-2 mx-5 px-3 rounded-lg disabled:bg-gray-500  hover:bg-blue-900 hover:drop-shadow-lg ">
        <i class="pi pi-save mr-2"></i>Simpan</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Camera from '@/components/LiveCameraComponent.vue';
import Alert from '@/components/Alert.vue';
import { createUser, fileUpload } from '@/services/User.services';
const ImageFrame = ref(null)
const alertData = ref({ status: '', msg: '' })
const camera = ref(null)
const getImageFrame = (data) => {
  ImageFrame.value = data
}
const generator = (characters, length) => {
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;

}


const user = ref({
  name: generator('abcdefghijklmnopgrstuvwxyz', 17),
  identityNumber: generator('0123456789', 15),
  email: generator('abcdefghijklmnopgrstuvwxyz', 11) + '@facetro.com',
  password: `${generator('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 15)}${'$'}${generator('ABCDEFGHIJstuvwxyz0123456789', generator('3456789', 1))}`,
  usergroup: ["133791c1-8e97-47c8-9b1b-bb5f7461a0b0"],
  role: ["f49bb0a1-6bd7-457b-a748-8549af236fb9"],
  birthday: '2024-10-09',
  nfc_data: '3D002CE6'
})
const handleImageFileUpload = async (uplodedImage) => {
  alertData.value = { status: 'process', msg: 'Menggungah foto!' }
  const imageResponse = await fileUpload(uplodedImage)
  alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
  if (imageResponse.status != 'fail') {
    user.value.file_uuid = imageResponse.file_uuid
  }
}
const handleAddUser = async () => {
  try {
    await camera.value.emitImage()
    await handleImageFileUpload(ImageFrame.value)
    if (user.value.file_uuid) {
      let data = await createUser(user.value)
      alertData.value = { status: data.status, msg: data.msg }
      if (data.validateError) {
        console.warn(data.validateError)
      }
      if (data.status == 'success') {
        user.value =  {
          name: generator('abcdefghijklmnopgrstuvwxyz', 17),
          identityNumber: generator('0123456789', 15),
          email: generator('abcdefghijklmnopgrstuvwxyz', 11) + '@facetro.com',
          password: `${generator('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 15)}${'$'}${generator('ABCDEFGHIJstuvwxyz0123456789', generator('3456789', 1))}`,
          usergroup: ["133791c1-8e97-47c8-9b1b-bb5f7461a0b0"],
          role: ["f49bb0a1-6bd7-457b-a748-8549af236fb9"],
          birthday: '2024-10-09',
          nfc_data: '3D002CE6'
        }
      }
      return 0
    }
    if (!user.value.file_uuid) {
      alertData.value = { status: 'fail', msg: 'Anda harus menggungah wajah!' }
    }
  } catch (error) {
    console.error('Error adding user:', error)
    alertData.value = { status: 'fail', msg: 'Error adding user!' }
  }
}
</script>

<style lang="scss" scoped></style>