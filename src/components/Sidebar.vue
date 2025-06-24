<template>
  <div>
    <!-- Sidebar -->
    <div
      class="sm:rounded-br-xl py-3  h-fit sm:h-full  bg-gray-900 bg-opacity-100 z-20 backdrop-filter backdrop-blur-lg w-full h-sp-2 sm:p-0"
      id="side-bar" :class="dataOpenSidebar == true ?  'sm:w-[250px]' : 'w-[64px]'">
      <div class="flex flex-row justify-between items-center sm:flex-col">
        <div class="bg-black-900 bg-opacity-100 backdrop-filter backdrop-blur-lg  sm:h-[120px] flex justify-start sm:justify-center items-center w-3/4 ">
          <div class="text-xl font-bold text-center  sm:items-center justify-start sm:justify-center w-7/12 flex text-white sm:w-full sm:h-full px-3"
            v-show="dataOpenSidebar">
            <img src="/src/assets/logo/logo-unnes-horizontal.png" alt="" style="width: 200px; height: auto" />
          </div>
          <img src="/src/assets/logo/UNNES.png" v-show="!dataOpenSidebar" class="p-1 w-[64px]" alt="Icon" />
        </div>
        <div class="flex justify-center sm:justify-end p-5 cursor-pointer hover:bg-primary-400 w-1/4 sm:w-full" @click="dataOpenSidebar = !dataOpenSidebar">
          <i class="flex justify-center items-center pi pi-bars text-white"></i>
        </div>
      </div>

      <!-- Menu items -->
        <div
        class="flex flex-col justify-between pt-3 sm:items-center  bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg ">
        <div class="text-left px-2 whitespace-nowrap" :class="dataOpenSidebar == true ?  '' : 'flex sm:flex-col'">
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-sm cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/dashboard" class="px-2 flex space-x-2"><span class="pi pi-microsoft"
                v-tooltip.right="'Dashboard'"></span>
              <span v-show="dataOpenSidebar">Dashboard</span></router-link>
          </div>
          <!-- My Profile Menu -->
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/myprofile" class="items-center px-2 flex space-x-2"><span class="pi pi-id-card"
                v-tooltip.right="'My Profile'"></span>
              <span v-show="dataOpenSidebar">My Profile</span></router-link>
          </div>
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/user" class="items-center px-2 flex space-x-2"><span class="pi pi-user"
                v-tooltip.right="'User'"></span>
              <span v-show="dataOpenSidebar">User</span></router-link>
          </div>
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/permission" class="items-center px-2 flex space-x-2"><span class="pi pi-key"
                v-tooltip.right="'Permission'"></span>
              <span v-show="dataOpenSidebar">Permission</span></router-link>
          </div>
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/role" class="items-center px-2 flex space-x-2"><i class="pi pi-briefcase"></i>
              <span v-show="dataOpenSidebar">Role</span></router-link>
          </div>
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/group" class="items-center px-2 flex space-x-2"><span class="pi pi-users"
                v-tooltip.right="'Group'"></span>
              <span v-show="dataOpenSidebar">Group</span></router-link>
          </div>
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/device" class="items-center px-2 flex space-x-2"><span
                class="items-center pi pi-microchip" v-tooltip.right="'Device'"></span>
              <span v-show="dataOpenSidebar">Device</span></router-link>
          </div>
          <div class="flex w-full py-2 sm:py-4 sm:m-0 mx-1 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
            <router-link to="/attendance" class="items-center px-2 flex space-x-2"
              @click.native="showPreloader('/attendance')"><span class="pi pi-chart-bar"
                v-tooltip.right="'Attendance'"></span>
              <span v-show="dataOpenSidebar">Attendance</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, // Preloader state
      currentRoute: '' // For storing the route that is being preloaded
    };
  },
  props: {
    dataOpenSidebar: Boolean
  }
};
</script>

<style scoped>
.p-tooltip-text {
  font-size: 10px !important;
}

#side-bar {
  overflow: hidden;
  transition: 300ms;
}

.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.z-50 {
  z-index: 50;
}
</style>
