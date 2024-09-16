<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection">Add User</h2>
      <hr class="border-purple-500 mb-4" />
      <div class="flex flex-col mb-5 ">
        <h1 class="text-lg font-bold text-center">Avatar <span class="text-red-400">*</span></h1>
        <div class="flex justify-center items-center">
          <div class="w-1/2 flex p-2">
            <div class="w-1/2 pr-2">
              UNNES Photo
              <img class="w-full rounded-xl" :src="unnesImage ? unnesImage : no_image_icon" alt="Uploaded Image">
            </div>
            <div class="w-1/2 pl-2 relative rounded-lg h-max-[300px] overflow-hidden group">
              <div>Uploaded Image</div>
              <input type="file" id="dropzone-file" accept="image/*"
                class="h-full w-full absolute opacity-0 hover:cursor-pointer z-30" @change="handleFileUpload" />
              <div
                class="flex flex-col transition-all duration-300 justify-center p-2 items-center h-full w-full absolute bg-gray-800/50 z-10 opacity-0 group-hover:opacity-100">
                <i class="pi pi-upload text-white text-6xl"></i>
                <p class="text-sm mt-2 text-white text-center"><span class="font-bold">Click to upload</span> drag or drop</p>
              </div>
              <img class="w-full rounded-lg" :src="uplodedImage != '' ? uplodedImage : upload_image_icon"
                alt="Uploaded Image">
            </div>
          </div>

        </div>
        <Alert :status="alertData.status" :msg="alertData.msg"></Alert>
      </div>
      <div class="flex">
        <div class="w-1/2 pr-4">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name<span
                class="text-red-400">*</span></label>
            <input v-model="user.name" type="text" id="name" placeholder="Enter name"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.name }}</div>
          </div>
          <div class="mb-4">
            <label for="identityNumber" class="block text-sm font-medium text-gray-700">Identity Number<span
                class="text-red-400">*</span></label>
            <input v-model="user.identityNumber" type="text" id="identityNumber" placeholder="Enter identity number"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.identityNumber }}</div>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email<span
                class="text-red-400">*</span></label>
            <input v-model="user.email" type="text" id="email" placeholder="Enter Email"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.email }}</div>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password<span
                class="text-red-400">*</span></label>
            <div class="flex justify-center items-center">
              <input v-model="user.password" type="password" id="password" ref="passwordField"
                placeholder="Enter Password" class="border border-gray-300 rounded-md p-2 w-full" />
              <button class="fa fa-eye p-2 hover:cursor-pointer" @mousedown="passwordField.type = 'text'"
                @mouseup="passwordField.type = 'password'"></button>
              </div>
              <div class="text-red-600 text-sm">{{ error.password }}</div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Birthday<span class="text-red-400">*</span></label>
            <input v-model="user.birthday" type="date" :max="new Date().toISOString().split('T')[0]"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.birthday }}</div>
          </div>
          <div class="mb-4">
            <label for="batch" class="block text-sm font-medium text-gray-700">Batch</label>
            <input v-model="user.batch" type="number" id="batch" min="2016" :max="new Date().getFullYear()"
              placeholder="Enter Batch" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.batch }}</div>
          </div>
          <div class="mb-4">
            <label for="program_study" class="block text-sm font-medium text-gray-700">Program Study</label>
            <input v-model="user.program_study" type="text" id="program_study" placeholder="Enter Program Study"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.program_study }}</div>
          </div>
        </div>
        <div class="w-1/2">
          <div class="mb-4">
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">No HP</label>
            <input v-model="user.phoneNumber" type="text" id="phoneNumber" placeholder="Enter phone number"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.phoneNumber }}</div>
          </div>
          <div class="mb-4">
            <label for="telegramId" class="block text-sm font-medium text-gray-700">Telegram ID</label>
            <input v-model="user.telegramId" type="number" id="telegramId" placeholder="Enter Telegram Id"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.telegramId }}</div>
          </div>

          <div class="mb-4">
            <label for="nfcData" class="block text-sm font-medium text-gray-700">NFC ID</label>
            <input v-model="user.nfc_data" type="text" id="nfcData" placeholder="Enter NFC ID"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
            <div class="text-red-600 text-sm">{{ error.nfc_data }}</div>
          </div>
          <div class="mb-4">
            <label for="group" class="block text-sm font-medium text-gray-700">Group</label>
            <MultiSelect v-model="user.usergroup" :options="groupOptions.value" optionValue="uuid" optionLabel="label"
              filter placeholder="Select group"
              class="p-inputtext p-component border max-w-[300px]  border-gray-300  rounded-md p-2 overflow-hidden">
              <template #option="slotProps">
                <div class="flex items-center text-wrap max-w-[300px] break-words">
                  {{ slotProps.option.label }}
                </div>
              </template>
              <template #footer>
                <div class="py-2 px-4">
                  <b>{{ user.usergroup ? user.usergroup.length : 0 }}</b> group{{ (user.usergroup ?
                    user.usergroup.length : 0) > 1 ? 's' : '' }} selected.
                </div>
              </template>
            </MultiSelect>
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <MultiSelect v-model="user.role" :options="roleOptions.value" optionValue="uuid" optionLabel="label" filter
              placeholder="Select role"
              class="p-inputtext p-component border max-w-[300px]  border-gray-300  rounded-md p-2 overflow-hidden">
              <template #option="slotProps">
                <div class="flex items-center text-wrap max-w-[300px] break-words">
                  {{ slotProps.option.label }}
                </div>
              </template>
              <template #footer>
                <div class="py-2 px-4">
                  <b>{{ user.role ? user.role.length : 0 }}</b> role{{ (user.role ?
                    user.role.length : 0) > 1 ? 's' : '' }} selected.
                </div>
              </template>
            </MultiSelect>
          </div>
          <div class="mb-4">
            <label for="group" class="block text-sm font-medium text-gray-700">Direct Permission</label>
            <MultiSelect v-model="user.permission" :options="permissionOptions.value" optionValue="uuid"
              optionLabel="label" filter placeholder="Select "
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full">
              <template #footer>
                <div class="py-2 px-4">
                  <b>{{ user.permission ? user.permission.length : 0 }}</b> premission{{ (user.permission ?
                    user.permission.length : 0) > 1 ? 's' : '' }} selected.
                </div>
              </template>
            </MultiSelect>

          </div>
          <div class="flex justify-end mt-4">
            <button @click="handleAddUser" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
              Add
            </button>
            <button @click="$emit('update:visible', false)" class="bg-gray-300 text-black px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import MultiSelect from 'primevue/multiselect'
import upload_image_icon from '@/assets/upload_image.png'
import { createUser, fileUpload, unnesImage as unnesImageService } from '@/services/User.services';
import imageCompression from 'browser-image-compression';
import Alert from './Alert.vue';
import no_image_icon from '@/assets/no_images.png';
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  groupOptions: {
    type: Array,
    required: true
  },
  roleOptions: {
    type: Array,
    required: true
  },
  permissionOptions: {
    type: Array,
    required: true
  }
})
const error = ref({
  email: "",
  name: "",
  identityNumber: "",
  password: "",
  batch: "",
  birthday: "",
  program_study: "",
  phoneNumber: "",
  telegramId: "",
  nfc_data: ""
})
const passwordField = ref();
const alertSection = ref();
const unnesImage = ref();
const alertData = ref({ status: '', msg: '' })
const emit = defineEmits(['update:visible', 'user-added'])
const uplodedImage = ref(upload_image_icon)
const imageName = ref('SVG, PNG, JPG or GIF')
const user = ref({
  name: '',
  identityNumber: '',
  usergroup: [],
  roleuser: null,
  avatar: ''
})

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})

watch(() => user.value.identityNumber.length, async (newVal) => {
  if (newVal > 9) {
    const imageResponse = await unnesImageService(user.value.identityNumber)
    alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
    unnesImage.value = imageResponse.status != 'fail' ? imageResponse.data : ''
  }
})
const handleAddUser = async () => {
  try {
    const userData = {
      ...user.value
    }
    if (alertSection.value) {
        // Memanggil scrollIntoView pada elemen DOM
        alertSection.value.scrollIntoView({ behavior: 'smooth' });
      }
    if (user.value.file_uuid) {
      console.table(user.value)
      let data = await createUser(userData)
      alertData.value = { status: data.status, msg: data.msg }
      console.table(data.validateError)
      if (data.validateError) {
        console.log('sasas')
        error.value = data.validateError
      }
      if (data.status == 'success') {
        setTimeout(() => {
          emit('user-added')
          emit('update:visible', false)
        }, 2000);
      }
      return 0
    }
    if (unnesImage.value) {
      alertData.value = { status: 'process', msg: 'Tunggu gambar terunggah terlebih dahulu' }
      uplodedImage.value = unnesImage.value
      await handleImageFileUpload(unnesImage.value)
      await handleAddUser()
    }
    if (!user.value.file_uuid) {
      alertData.value = { status: 'fail', msg: 'Anda harus menggungah wajah!' }
    }
  } catch (error) {
    console.error('Error adding user:', error)
    alertData.value = { status: 'fail', msg: 'Error adding user!' }
  }
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uplodedImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const resetForm = () => {
  user.value = {
    usergroup: [],
    permission: [],
    avatar: '',
    file_uuid: '',
    email: "",
    name: "",
    identityNumber: "",
    password: "",
    batch: "",
    birthday: "",
    program_study: "",
    phoneNumber: "",
    telegramId: "",
    nfc_data: ""
  }
  uplodedImage.value = ''
  unnesImage.value = ''
  alertData.value = { status: 'close', msg: 'close' }
  error.value = {
    email: "",
    name: "",
    identityNumber: "",
    password: "",
    batch: "",
    birthday: "",
    program_study: "",
    phoneNumber: "",
    telegramId: "",
    nfc_data: ""
  }
}
const handleImageFileUpload = async (uplodedImage) => {
  alertData.value = { status: 'process', msg: 'Menggungah foto!' }
  const imageResponse = await fileUpload(uplodedImage)
  alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
  if (imageResponse.status != 'fail') {
    user.value.file_uuid = imageResponse.file_uuid
    delete user.value.avatar
  }
}
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  imageName.value = file.name
  if (file) {
    try {
      // Opsi untuk kompresi
      const options = {
        maxSizeMB: 1,          // Ukuran maksimum file yang diinginkan (MB)
        maxWidthOrHeight: 1920, // Resolusi maksimum yang diinginkan (px)
        useWebWorker: true      // Menggunakan Web Worker untuk performa yang lebih baik
      };
      // Kompresi gambar

      const readerReal = new FileReader();

      readerReal.onload = (e) => {
        user.value.avatar = e.target.result;
      };
      readerReal.readAsDataURL(file);
      readerReal.onloadend = (e) => {
        uplodedImage.value = user.value.avatar
      }

      alertData.value = { status: 'process', msg: 'Mengkompress Gambar!' }
      const compressedFile = await imageCompression(file, options);
      // Konversi ke Base64
      const reader = new FileReader(); reader.onload = (e) => {
        user.value.avatar = e.target.result;
      };
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async (e) => {
        alertData.value = { status: 'success', msg: 'Berhasil mengkompres!' }
        uplodedImage.value = user.value.avatar
        await handleImageFileUpload(uplodedImage.value)
      }
    } catch (error) {
      console.error('Error during image compression:', error);
    }
  }
}
</script>

<style scoped></style>