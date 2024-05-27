import { createRouter, createWebHistory } from 'vue-router'
import PresenceViewVue from '@/views/PresenceView.vue'
import RegisterDeviceViewVue from '@/views/RegisterDeviceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import DashBoard from '@/pages/layout/Master.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DeviceView from '@/views/DeviceView.vue'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServicesView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import dashboard from '../views/Dashboard.vue'
import Room from '../views/Room.vue'
import Camera from '../views/Camera.vue'
import Attendance from '../views/Attendance.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoard,
      children:[
        {
          name: 'dashboard',
          path: '/dashboard',
          component: dashboard
        },
        {
          name: 'room',
          path: '/room',
          component: Room
        },
        {
          name: 'camera',
          path: '/camera',
          component: Camera
        },
        {
          name: 'attendance',
          path: '/attendance',
          component: Attendance
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },

  ]
})

export default router
