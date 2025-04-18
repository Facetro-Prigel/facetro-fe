<template>
  <div>

    <!-- Sidebar -->
    <div
      class="rounded-br-xl h-full bg-gray-900 bg-opacity-100 z-50 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-10"
      id="side-bar" :class="dataOpenSidebar == true ? 'side-bar-visible' : 'side-bar-close'">
      <div
        class="bg-black-900 bg-opacity-100 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-10 h-[120px] flex justify-center items-center">
        <div class="text-xl font-bold text-center flex items-center justify-center text-white h-full"
          v-show="dataOpenSidebar">
          <img src="/src/assets/logo/logo-unnes-horizontal.png" alt="" style="width: 200px; height: auto" />
        </div>
        <img src="/src/assets/logo/UNNES.png" v-show="!dataOpenSidebar" class="p-1 w-[64px]" alt="Icon" />
      </div>
      <div class="flex justify-end p-5 cursor-pointer hover:bg-primary-400" @click="dataOpenSidebar = !dataOpenSidebar">
        <i class="pi pi-bars" style="color: white"></i>
      </div>

      <!-- Menu items -->
      <div>
        <div
          class="flex flex-col justify-between pt-3 items-center h-[calc(120vh-8rem)] bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-10">
          <div class="menu-man text-left px-2 whitespace-nowrap">
            <div class="py-4 rounded-sm cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/dashboard" class="px-2 flex space-x-2"><span
                  class="pi pi-microsoft" v-tooltip.right="'Dashboard'"></span>
                <span v-show="dataOpenSidebar">Dashboard</span></router-link>
            </div>
            
                        <!-- My Profile Menu -->
                        <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/myprofile" class="items-center px-2 flex space-x-2"><span
                  class="pi pi-id-card" v-tooltip.right="'My Profile'"></span>
                <span v-show="dataOpenSidebar">My Profile</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/user" class="items-center px-2 flex space-x-2" @click.native="showPreloader('/user')"><span
                  class="pi pi-user" v-tooltip.right="'User'"></span>
                <span v-show="dataOpenSidebar">User</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/permission" class="items-center px-2 flex space-x-2"><span
                  class="pi pi-key" v-tooltip.right="'Permission'"></span>
                <span v-show="dataOpenSidebar">Permission</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/role" class="items-center px-2 flex space-x-2"><i
                  class="pi pi-briefcase"></i>
                <span v-show="dataOpenSidebar">Role</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/group" class="items-center px-2 flex space-x-2"><span
                  class="pi pi-users" v-tooltip.right="'Group'"></span>
                <span v-show="dataOpenSidebar">Group</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/device" class="items-center px-2 flex space-x-2"><span
                  class="items-center pi pi-microchip" v-tooltip.right="'Device'"></span>
                <span v-show="dataOpenSidebar">Device</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/attendance" class="items-center px-2 flex space-x-2" @click.native="showPreloader('/attendance')"><span
                  class="pi pi-chart-bar" v-tooltip.right="'Attendance'"></span>
                <span v-show="dataOpenSidebar">Attendance</span></router-link>
            </div>
            <div class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white">
              <router-link to="/attendance" class="items-center px-2 flex space-x-2" @click.native="showPreloader('/attendance')"><span
                  class="pi pi-chart-line" v-tooltip.right="'Attendance'"></span>
                <span v-show="dataOpenSidebar">Liga Presensi</span></router-link>
            </div>
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
  },
  methods: {
  showPreloader(route) {
    // Cek jika route adalah 'user' atau 'attendance'
    if (route === '/user' || route === '/attendance') {
      this.loading = true; // Tampilkan preloader
      this.currentRoute = route;

      // Simulasi pengambilan data dari server dengan durasi berbeda
      const loadingDuration = (route === '/user') ? 500 : 2000; // 1 detik untuk user, 2 detik untuk attendance
      setTimeout(() => {
        this.loading = false; // Sembunyikan preloader setelah data selesai dimuat
      }, loadingDuration); // Gunakan durasi yang ditentukan
    }
  }
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

.side-bar-visible {
  width: 250px !important;
}

.side-bar-close {
  width: 64px !important;
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
