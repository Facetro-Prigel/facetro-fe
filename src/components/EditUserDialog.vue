<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" >
    <div class="bg-white p-6 rounded shadow-md w-[50%] max-h-[90%] overflow-y-scroll">
      <h2 class="text-lg font-semibold mb-4" ref="alertSection"><i class="pi pi-user-edit mr-2"></i> Edit User</h2>
      <hr class="border-purple-500 mb-4"/>
      <div class="flex flex-col mb-5">
        <h1 class="text-lg font-bold text-center">Avatar <span class="text-red-400">*</span></h1>
        <div class="flex justify-center items-center">
          <div class="w-5/6 flex p-2">
            <div class="w-1/3 pr-2">
              UNNES Photo
              <img class="w-full rounded-xl drop-shadow-lg" :src="unnesImage ? unnesImage : no_image_icon" alt="Uploaded Image">
            </div>
            <div class="w-1/3 pl-2 relative rounded-lg h-max-[300px] drop-shadow-lg overflow-hidden group">
              <div>Uploaded Image</div>
              <input type="file" id="dropzone-file" accept="image/*"
                class="h-full w-full absolute opacity-0 hover:cursor-pointer z-30" @change="handleFileUpload" />
              <div
                class="flex flex-col transition-all duration-300 justify-center items-center h-full w-full absolute bg-gray-800/50 z-10 opacity-0 group-hover:opacity-100">
                <i class="pi pi-upload text-white text-6xl"></i>
                <p class="text-sm mt-2 text-white"><span class="font-bold">Click to upload</span> drag or drop</p>
              </div>
              <img class="w-full rounded-lg" :src="uplodedImage != '' ? uplodedImage : upload_image_icon"
                alt="Uploaded Image">
            </div>
            <div class="w-1/3 pl-2 relative rounded-lg h-max-[300px] drop-shadow-lg overflow-hidden group">
              <div>Birthday / Co-card</div>
              <input type="file" id="dropzone-file" accept="image/*"
                class="h-full w-full absolute opacity-0 hover:cursor-pointer z-30" @change="handleBirthdayUpload" />
              <div
                class="flex flex-col transition-all duration-300 justify-center items-center h-full w-full absolute bg-gray-800/50 z-10 opacity-0 group-hover:opacity-100">
                <i class="pi pi-upload text-white text-6xl"></i>
                <p class="text-sm mt-2 text-white"><span class="font-bold">Click to upload</span> drag or drop</p>
              </div>
              <img class="w-full rounded-lg" :src="birthdayImageC.data != '' ? birthdayImageC.data : upload_image_icon"
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
              <Password v-model="user.password" type="password" id="password" placeholder="Enter Password"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none" toggleMask />
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
            <button @click="handleUpdateUser" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
              Update
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
import { ref, watch, onMounted } from 'vue'
import MultiSelect from 'primevue/multiselect'
import upload_image_icon from '@/assets/upload_image.png'
import { fetchUser, fileUpload, updateUser, birthdayImage, unnesImage as unnesImageService, birtdayUpload } from '@/services/User.services';
import imageCompression from 'browser-image-compression';
import Alert from './Alert.vue';
import no_image_icon from '@/assets/no_images.png';
import Password from 'primevue/password';
import loadingImg from '@/assets/loading.gif'
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const BASE_URL = import.meta.env.VITE_BACKEND_API
const props = defineProps({
  uuid:{
    type: String,
    required: true
  },
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
const alertSection = ref()
const unnesImage = ref(loadingImg);
const alertData = ref({ status: '', msg: '' })
const emit = defineEmits(['update:visible', 'user-added'])
const uplodedImage = ref(upload_image_icon)
const birthdayImageC = ref({data:loadingImg})
const imageName = ref('SVG, PNG, JPG or GIF')
const user = ref({
  name: '',
  identityNumber: '',
  usergroup: [],
  roleuser: null,
  avatar: '',
  nfc_data: ''
})
const isCapturing = ref(false);
const hexString = ref('');
const handleKeydown = (event) => {
  const key = event.key;
  if (key === 'w') {
    if (isCapturing.value) {
      // Log hex string when second * is pressed
      user.value.nfc_data = hexString.value.toUpperCase().replace(/[^A-F0-9]/g, '')
      isCapturing.value = false;
      hexString.value = '';
    } else {
      // Start capturing after first *
      isCapturing.value = true;
    }
  } else if (isCapturing.value) {
    // Append characters to hex string if capturing
    if (/^[0-9A-Fa-f]$/.test(key)) {
      hexString.value += key;
    }
  }
};
onMounted(()=>{
  document.addEventListener('keydown', handleKeydown);
  
})
watch(() => props.visible, async (newVal) => {
  if (!newVal) {
    birthdayImageC.value = await birthdayImage('vZQbB6CX1T')
    return resetForm()
  }
  const response = await fetchUser(props.uuid)
  if(response.status == 'success'){
      user.value =response.data
      uplodedImage.value = user.value.avatar ? BASE_URL+user.value.avatar : no_image_icon
      birthdayImageC.value.data = loadingImg
      birthdayImageC.value = await birthdayImage(props.uuid)
      await unnesImageHender()
  }
})

watch(() => user.value.identityNumber.length, async (newVal) => {
  if (newVal > 9) {
    await unnesImageHender()
  }
})
const unnesImageHender = async () => {
  unnesImage.value = loadingImg
  const imageResponse = await unnesImageService(user.value.identityNumber)
    alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
    unnesImage.value = imageResponse.status != 'fail' ? imageResponse.data : ''
   
}
const handleUpdateUser = async () => {
  try {
    const userData = {
      ...user.value
    }
    if (user.value.avatar) {
      let data = await updateUser(props.uuid, userData)
      toast.add({ severity: data.status == 'fail' ? 'error' : 'success', summary: data.msg, life: 3000 });
      if (data.validateError) {
        error.value = data.validateError
      }
      if (data.status == 'success') {
        delete user.value.avatar
        emit('user-updated', userData.value)
        emit('update:visible', false)
      }

      return 0
    }
    if (!user.value.file_uuid) {
      toast.add({ severity: 'error', summary: 'Anda harus menggungah wajah!', life: 3000 });
    }
  } catch (error) {
    console.error('Error adding user:', error)
    toast.add({ severity: 'error', summary: 'Error updateting user!', life: 3000 });
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
  unnesImage.value = loadingImg
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

const handleBirthdayFileUpload = async (uplodedImage) => {
  alertData.value = { status: 'process', msg: 'Menggungah foto!' }
  const imageResponse = await birtdayUpload(uplodedImage, props.uuid)
  alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
  if (imageResponse.status != 'fail') {
    birthdayImageC.value.data = loadingImg
    birthdayImageC.value = await birthdayImage(props.uuid)
  }
}
const handleBirthdayUpload = async (event) => {
  const file = event.target.files[0];
  imageName.value = file.name
  if (file) {
    try {
      // Opsi untuk kompresi
      const options = {
        maxSizeMB: 4,
        maxWidthOrHeight: 1920*2,
        useWebWorker: true
      };
      // Kompresi gambar

      const readerReal = new FileReader();

      readerReal.onload = (e) => {
        birthdayImageC.value.data = e.target.result;
      };
      readerReal.readAsDataURL(file);
      readerReal.onloadend = (e) => {
        birthdayImageC.value.data = birthdayImageC.value.data
      }

      alertData.value = { status: 'process', msg: 'Mengkompress Gambar!' }
      const compressedFile = await imageCompression(file, options);
      // Konversi ke Base64
      const reader = new FileReader(); reader.onload = (e) => {
        birthdayImageC.value.data = e.target.result;
      };
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async (e) => {
        alertData.value = { status: 'success', msg: 'Berhasil mengkompres!' }
        await handleBirthdayFileUpload(birthdayImageC.value.data)
      }
    } catch (error) {
      console.error('Error during image compression:', error);
    }
  }
}
</script>

<style scoped></style>