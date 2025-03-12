<template>
  <div class="flex flex-col p-2">
    <h1 class="text-lg font-bold text-center">Foto Sekarang <span class="text-red-400">*</span></h1>
    <div class="flex justify-center items-center">
      <div class="flex justify-center items-center p-2">
        <div class="border-4 p-4 justify-center items-center flex rounded-xl  group">
          <!-- Menampilkan userImage dengan fallback ke no_image_icon jika tidak tersedia -->
          <div class="w-1/6 px-1 relative rounded-lg drop-shadow-lg overflow-hidden group">
            <div>Avatar</div>
            <img class="w-full rounded-lg" :src="avatar ? avatar : no_image_icon" :alt="`Avatar of ${user.name}`"
              :title="`Avatar of ${user.name}`">
          </div>

          <div class="w-1/6 px-1 overflow-hidden group">
            <div>Foto Utama</div>
            <div class="relative rounded-lg drop-shadow-lg overflow-hidden group">
              <img class="w-full h-full object-cover rounded-xl" :src="userImage || no_image_icon" alt="UNNES Image" />
              <input type="file" id="dropzone-file" accept="image/*"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" @change="handleFileUpload" />
              <div
                class="absolute inset-0 bg-gray-800/50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
                <i class="pi pi-upload text-white text-6xl"></i>
                <p class="text-sm mt-2 text-white"><span class="font-bold">Click to upload</span> or drag and drop</p>
              </div>
            </div>
          </div>

          <div class="w-1/6 px-1 relative rounded-lg drop-shadow-lg overflow-hidden group">
            <div>Unnes Foto</div>
            <img class="w-full rounded-xl drop-shadow-lg" :src="unnesImage ? unnesImage : no_image_icon"
              alt="Uploaded Image">
          </div>

        </div>
      </div>
    </div>

    <div class="flex mt-5">
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
          <input v-model="user.identity_number" type="text" id="identityNumber" placeholder="Enter identity number"
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
          <label class="block text-sm font-medium text-gray-700">
            Birthday <span class="text-red-400">*</span>
          </label>
          <input v-model="user.birthday" type="date" :max="new Date().toISOString().split('T')[0]"
            placeholder="2002-12-25" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.birthday }}</div>
        </div>



        <div class="mb-4">
          <label for="batch" class="block text-sm font-medium text-gray-700">Batch</label>
          <input v-model="user.batch" type="number" id="batch" min="2016" :max="new Date().getFullYear()"
            placeholder="Enter Batch" class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.batch }}</div>
        </div>
        <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-medium text-gray-700">No HP</label>
          <input v-model="user.phone_number" type="text" id="phoneNumber" placeholder="Enter phone number"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.phone_number }}</div>
        </div>
        <div class="mb-4">
          <label for="program_study" class="block text-sm font-medium text-gray-700">Program Study</label>
          <input v-model="user.program_study" type="text" id="program_study" placeholder="Enter Program Study"
            class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          <div class="text-red-600 text-sm">{{ error.program_study }}</div>
        </div>
      </div>
      <div class="w-1/2">


        <div class="mt-5">
          <h2 class="block text-sm font-medium text-gray-700">Group</h2>
          <div class="flex flex-wrap gap-4">
            <div v-for="(group, index) in groupMembers" :key="index"
              class="flex items-center bg-primary-500 text-white rounded-lg p-3 w-auto min-w-[200px]">
              <i class="pi pi-users text-white text-2xl mr-2"></i>
              <span class="font-semibold">{{ group.name }}</span>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <h2 class="block text-sm font-medium text-gray-700">Role</h2>
          <div class="flex flex-wrap gap-4">
            <div v-for="(role, index) in userRole" :key="index"
              class="flex items-center justify-center bg-primary-500 text-white rounded-lg p-3 w-auto min-w-[100px]">
              <span class="font-semibold">{{ role.name }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button @click="handleUpdateUser" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
            Update
          </button>
        </div>
        <div class="bg-slate-200 p-3 rounded-md">
          <h2 class="text-lg font-bold">Change Password <span class="text-red-400">*</span></h2>

          <div class="mb-4">
            <label for="current_password" class="block text-sm font-medium text-gray-700">Current Password</label>
            <input v-model="changePassword.old_password" type="password" id="program_study"
              placeholder="Enter Program Study"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="program_study" class="block text-sm font-medium text-gray-700">New Password</label>
            <input v-model="changePassword.new_password" type="password" id="program_study"
              placeholder="Enter Program Study"
              class="p-inputtext p-component border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <button @click="handleChangePassword" class="bg-primary-500 text-white px-4 py-2 rounded mr-2">
            Change
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import upload_image_icon from '@/assets/upload_image.png'
import { getUserProfile, fileUpload, updateUser, unnesImage as unnesImageService, changePassword as changePasswordService } from '@/services/MyProfile.services';
import VueCookies from 'vue-cookies';
import imageCompression from 'browser-image-compression';
import no_image_icon from '@/assets/no_images.png';
import loadingImg from '@/assets/loading.gif'
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
  identity_number: "",
  batch: "",
  birthday: "",
  program_study: "",
  phone_number: ""
})

const imageName = ref('SVG, PNG, JPG or GIF')

const user = ref({
  name: '',
  identity_number: '',
  email: '',
  birthday: '',
  batch: '',
  program_study: '',
  phone_number: '',
  user_group: [],
  role: [],
  permission: []
})
const changePassword = ref({
  "old_password": "",
  "new_password": ""
})
const groupMembers = ref([])
const unnesImage = ref(loadingImg);
const avatar = ref(loadingImg)
const userRole = ref([])
const birthday = ref()
const userImage = ref()
const imagePath = ref()
const handleChangePassword = async () => {
  const res = await changePasswordService(changePassword.value)
  if (res.title == 'Success') {
    changePassword.value = {
      "old_password": "",
      "new_password": ""
    }
  }
}
const fetchUserProfile = async () => {
  const token = VueCookies.get('token');
  try {
    const response = await getUserProfile(token);
    if (response) {
      user.value = response;
      groupMembers.value = response.user_group.map(group => ({
        name: group.group.name,
        photo: group.group.photo || no_image_icon
      }));

      userRole.value = response.role_user.map(roleuser => ({
        name: roleuser.role.name
      }));
      const userDetails = response.user_details
      if (userDetails) {
        if (userDetails.birthday) {
          const date = new Date(userDetails.birthday);
          user.value.birthday = date.toISOString().split('T')[0];
        }
        user.value.phone_number = userDetails.phone_number ?? '';
        user.value.program_study = userDetails.program_study ?? '';
        user.value.batch = userDetails.batch ?? '';
      }
      if (response.avatar) {
        avatar.value = BASE_URL + 'avatar/' + response.avatar
        userImage.value = `${BASE_URL}photos/${response.avatar}`;
      } else {
        const imageResponse = await unnesImageService();
        userImage.value = imageResponse;
      }
      unnesImageHender()
    }
  } catch (error) {
    console.log(error)
  }
};

const unnesImageHender = async () => {
  unnesImage.value = loadingImg
  const imageResponse = await unnesImageService()
  unnesImage.value = imageResponse
}

const handleUpdateUser = async () => {
  const userData = { ...user.value };
  if (imagePath.value) {
    userData.avatar = imagePath.value;
  }
  const data = await updateUser(userData);
  if (data.validateError) {
    error.value = data.validateError;
  }
};

const handleImageFileUpload = async (uplodedImage) => {
  const imageResponse = await fileUpload(uplodedImage)
  if (imageResponse.file_uuid) {
    user.value.file_uuid = imageResponse.file_uuid
    avatar.value = BASE_URL + 'avatar/' + imageResponse.path
  }
}

const handleFileUpload = async (event) => {
  avatar.value = loadingImg
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
        userImage.value = user.value.avatar
      }
      const compressedFile = await imageCompression(file, options);
      // Konversi ke Base64
      const reader = new FileReader(); reader.onload = (e) => {
        user.value.avatar = e.target.result;
      };
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async (e) => {
        userImage.value = user.value.avatar
        await handleImageFileUpload(userImage.value)
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
