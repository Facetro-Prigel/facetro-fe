<template>
  <div
    class="rounded-br-xl bg-gray-900 bg-opacity-100 z-50 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-10"
    id="side-bar"
    :class="dataOpenSidebar == true ? 'side-bar-visible' : 'side-bar-close'"
  >
    <div
      class="bg-black-900 bg-opacity-100 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-10 h-[120px] flex justify-center items-center"
    >
      <div
        class="text-xl font-bold text-center flex items-center justify-center text-white h-full"
        v-show="dataOpenSidebar"
      >
        <img src="/src/assets/FACETRO.png" alt="" style="width: 200px; height: auto" />
      </div>
      <img src="/src/assets/Icon.png" v-show="!dataOpenSidebar" class="p-1 w-[64px]" alt="Icon" />
    </div>
    <div
      class="flex justify-end p-5 cursor-pointer hover:bg-primary-400"
      @click="dataOpenSidebar = !dataOpenSidebar"
    >
      <i class="pi pi-bars" style="color: white"></i>
    </div>
    <div>
      <div
        class="flex flex-col justify-between pt-3 items-center h-[calc(120vh-8rem)] bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-10"
      >
        <div class="menu-man text-left px-2 whitespace-nowrap">
          <div
            class="py-4 rounded-sm cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/dashboard" class="px-2 flex space-x-2"
              ><span class="pi pi-microsoft" v-tooltip.right="'Dashboard'"></span>
              <span v-show="dataOpenSidebar">Dashboard</span></router-link
            >
          </div>
          <div
            class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/user" class="items-center px-2 flex space-x-2"
              ><span class="pi pi-user" v-tooltip.right="'User'"></span>
              <span v-show="dataOpenSidebar">User</span></router-link
            >
          </div>
          <div
            class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/permission" class="items-center px-2 flex space-x-2"
              ><span class="pi pi-key" v-tooltip.right="'Permission'"></span>
              <span v-show="dataOpenSidebar">Permission</span></router-link
            >
          </div>
          <div
            class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/attendance" class="items-center px-2 flex space-x-2"
              ><span class="pi pi-chart-bar" v-tooltip.right="'Attendance'"></span>
              <span v-show="dataOpenSidebar">Attendance</span></router-link
            >
          </div>
          <div
          class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
        >
          <router-link to="/group" class="items-center px-2 flex space-x-2"
            ><span class="pi pi-users" v-tooltip.right="'Group'"></span>
            <span v-show="dataOpenSidebar">Group</span></router-link
          >
        </div>
          <div
            class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/room" class="items-center px-2 flex space-x-2"
              ><span class="pi pi-building" v-tooltip.right="'Room'"></span>
              <span v-show="dataOpenSidebar">Room</span></router-link
            >
          </div>
          <div
            class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/camera" class="items-center px-2 flex space-x-2"
              ><span class="pi pi-camera" v-tooltip.right="'Camera'"></span>
              <span v-show="dataOpenSidebar">Camera</span></router-link
            >
          </div>
          <div
            class="py-4 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <router-link to="/device" class="items-center px-2 flex space-x-2">
              <span class="items-center pi pi-microchip" v-tooltip.right="'Device'"></span>
              <span v-show="dataOpenSidebar">Device</span>
            </router-link>
          </div>
        </div>
        <div class="menu-man text-left px-2 justify-self-end whitespace-nowrap">
          <div
            class="py-3 rounded-md cursor-pointer text-white border-b border-gray-400 hover:text-white"
          >
            <a
              href="https://website-nuxt-front.vercel.app/"
              target="_blank"
              class="px-2 flex space-x-2"
              ><span class="pi pi-sign-out" v-tooltip.right="'Logout'"></span>
              <span v-show="dataOpenSidebar">Logout</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSidebar: Boolean
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    }
  }
}
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
</style>
