import { createRouter, createWebHistory } from 'vue-router'
import PresenceViewVue from '@/views/PresenceView.vue'
import RegisterDeviceViewVue from '@/views/RegisterDeviceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DeviceView from '@/views/DeviceView.vue'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServicesView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import Dashboard from '../views/Dashboard.vue'
import Room from '../views/Room.vue'
import Camera from '../views/Camera.vue'
import Attendance from '../views/Attendance.vue'
import Master from '@/layouts/Master.vue' // Assuming you have this component
import RealtimeLogView from '@/views/RealtimeLogView.vue'

const routes = [
  {
    path: '/',
    component: Master,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/room',
        name: 'room',
        component: Room
      },
      {
        path: '/camera',
        name: 'camera',
        component: Camera
      },
      {
        path: '/attendance',
        name: 'attendance',
        component: Attendance
      },
      {
        path: '/device',
        name: 'device',
        component: DeviceView
      },
      {
        path: '/attendance_view',
        name: 'attendance_view',
        component: AttendanceView
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView
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
  {
    path: '/login',
    name: 'login',
    component: ViewLogin
  },
  {
    path: '/presence',
    name: 'presence',
    component: PresenceViewVue
  },
  {
    path: '/device_register',
    name: 'device_register',
    component: RegisterDeviceViewVue
  },
  {
    path: '/realtime_log',
    name: 'realtime_log',
    component: RealtimeLogView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
