<template>
  <div class="flex flex-col p-2">
    <h1 class="text-lg font-bold text-center">Foto Sekarang <span class="text-red-400">*</span></h1>
    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center w-full p-2">
        <div class="relative border-4 p-4 w-[300px] h-[300px] rounded-xl overflow-hidden group">
          <!-- Menampilkan userImage dengan fallback ke no_image_icon jika tidak tersedia -->
          <img class="w-full h-full object-cover rounded-xl" :src="userImage || no_image_icon" alt="UNNES Image" />
          <input type="file" id="dropzone-file" accept="image/*"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" @change="handleFileUpload" />
          <div class="absolute inset-0 bg-gray-800/50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
            <i class="pi pi-upload text-white text-6xl"></i>
            <p class="text-sm mt-2 text-white"><span class="font-bold">Click to upload</span> or drag and drop</p>
          </div>
        </div>
      </div>
    </div>
    <Alert :status="alertData.status" :msg="alertData.msg"></Alert>

    <div class="flex mt-5">
      <div class="w-1/2 pr-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name<span class="text-red-400">*</span></label>
          <input v-model="user.name" type="text" id="name" placeholder="Enter name"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.name }}</div>
        </div>
        <div class="mb-4">
          <label for="identityNumber" class="block text-sm font-medium text-gray-700">Identity Number<span class="text-red-400">*</span></label>
          <input v-model="user.identityNumber" type="text" id="identityNumber" placeholder="Enter identity number"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.identityNumber }}</div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email<span class="text-red-400">*</span></label>
          <input v-model="user.email" type="text" id="email" placeholder="Enter Email"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.email }}</div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">
            Birthday <span class="text-red-400">*</span>
          </label>
          <input 
            v-model="user.birthday"
            type="date" 
            :max="new Date().toISOString().split('T')[0]"
            placeholder="2002-12-25"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full"
          />
          <div class="text-red-600 text-sm">{{ error.birthday }}</div>
        </div>



        <div class="mb-4">
          <label for="batch" class="block text-sm font-medium text-gray-700">Batch</label>
          <input v-model="user.batch" type="number" id="batch" min="2016" :max="new Date().getFullYear()"
            placeholder="Enter Batch" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.batch }}</div>
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
          <label for="program_study" class="block text-sm font-medium text-gray-700">Program Study</label>
          <input v-model="user.program_study" type="text" id="program_study" placeholder="Enter Program Study"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.program_study }}</div>
        </div>
        <div class="mt-5">
          <h2 class="block text-sm font-medium text-gray-700">Group</h2>
          <div class="flex flex-wrap gap-4">
            <div v-for="(group, index) in groupMembers" :key="index" class="flex items-center bg-primary-500 text-white rounded-lg p-3 w-auto min-w-[200px]">
              <i class="pi pi-users text-white text-2xl mr-2"></i>
              <span class="font-semibold">{{ group.name }}</span>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <h2 class="block text-sm font-medium text-gray-700">Role</h2>
          <div class="flex flex-wrap gap-4">
            <div v-for="(role, index) in userRole" :key="index" class="flex items-center justify-center bg-primary-500 text-white rounded-lg p-3 w-auto min-w-[100px]">
              <span class="font-semibold">{{ role.name }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button @click="handleUpdateUser" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import upload_image_icon from '@/assets/upload_image.png'
import { getUserProfile, fileUpload, updateUser, unnesImage } from '@/services/MyProfile.services';
import VueCookies from 'vue-cookies';
import Alert from './Alert.vue';
import imageCompression from 'browser-image-compression';
import no_image_icon from '@/assets/no_images.png';
const BASE_URL = import.meta.env.VITE_BACKEND_API

const props = defineProps({
  uuid: {
    type: String,
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
  batch: "",
  birthday: "",
  program_study: "",
  phoneNumber: ""
})

const alertData = ref({ status: '', msg: '' })
const uplodedImage = ref(upload_image_icon)
const imageName = ref('SVG, PNG, JPG or GIF')

const user = ref({
  name: '',
  identityNumber: '',
  email: '',
  birthday: '',
  batch: '',
  program_study: '',
  phoneNumber: '',
  usergroup: [],
  role: [],
  permission: []
})

const groupMembers = ref([])
const userRole = ref([])
const birthday = ref()
const userImage = ref()
const imagePath = ref()

const fetchUserProfile = async () => {
  const token = VueCookies.get('token');

  if (!token) {
    alertData.value = { status: 'fail', msg: 'Session expired. Please login again.' };
    return;
  }
  const user_data = JSON.parse(localStorage.getItem("user_data"));

try {
    const response = await getUserProfile(token);
    if (response && response.data) {
      user.value = response.data;

      const birthdayData = response.data.birtday;
      if (birthdayData) {
        const date = new Date(birthdayData);
        user.value.birthday = date.toISOString().split('T')[0]; 
      }

      groupMembers.value = response.data.usergroup.map(group => ({
        name: group.group.name,
        photo: group.group.photo || no_image_icon
      }));

      userRole.value = response.data.roleuser.map(roleuser => ({
        name: roleuser.role.name
      }));

      if (user_data.avatar) {
        userImage.value = `${BASE_URL}${user_data.avatar}`;
      } else {
        const imageResponse = await unnesImage(response.data.identityNumber);
        userImage.value = imageResponse.data;
      }
    } else {
      alertData.value = { status: 'fail', msg: 'Failed to load user data!' };

    }
  } catch (error) {
    alertData.value = { status: 'fail', msg: 'Error fetching user data!' };
  }
};

const unnesImageHender = async () => {
  const imageResponse = await unnesImageService(user.value.identityNumber)
    alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
    unnesImage.value = imageResponse.status != 'fail' ? imageResponse.data : ''
   
}

const handleUpdateUser = async () => {
  const token = VueCookies.get('token'); 

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const uuid = user_data.uuid;

  if (!token) {
    alertData.value = { status: 'fail', msg: 'Session expired. Please login again.' };
    return;
  }

  try {
    const userData = { ...user.value };
    if (imagePath.value){
      userData.avatar = imagePath.value;
    }
    const data = await updateUser(uuid, userData, token);

    if (data.status == 'success') {
      alertData.value = { status: 'success', msg: 'Berhasil Update Data!' }; 
    } else {
      alertData.value = { status: 'fail', msg: data.msg || 'Gagal Update Data' }; 
    }

    if (data.validateError) {
      error.value = data.validateError;
    }

    location.reload();
  } catch (error) {
    alertData.value = { status: 'fail', msg: 'Error updating user!' }; 
  }

};



const handleImageFileUpload = async (uplodedImage) => {
  alertData.value = { status: 'process', msg: 'Menggungah foto!' }
  const imageResponse = await fileUpload(uplodedImage)
  alertData.value = { status: imageResponse.status, msg: imageResponse.msg }
  if (imageResponse.status != 'fail') {
    user.value.file_uuid = imageResponse.file_uuid
  }
  imagePath.value = imageResponse.path;
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

        userImage.value = e.target.result;
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
        userImage.value = e.target.result;
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

onMounted(() => {
  fetchUserProfile();
});
</script>
