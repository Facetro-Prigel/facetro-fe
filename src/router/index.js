import Master from '@/layouts/Master.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import DoorlockViewVue from '@/views/DoorlockView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PresenceViewVue from '@/views/PresenceView.vue'
import RealtimeLogView from '@/views/RealtimeLogView.vue'
import RegisterDeviceViewVue from '@/views/RegisterDeviceView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RoleView from '@/views/RoleView.vue'
import VueCookies from 'vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import Attendance from '../views/AttendanceView.vue'
import Camera from '../views/CameraView.vue'
import ContactView from '../views/ContactView.vue'
import Dashboard from '../views/DashboardView.vue'
import DeviceView from '../views/DeviceView.vue'
import GroupView from '../views/GroupView.vue'
import PermissionView from '../views/PermissionView.vue'
import Room from '../views/RoomView.vue'
import ServiceView from '../views/ServicesView.vue'
import UserView from '../views/UserView.vue'
import MyProfile from '../components/MyProfile.vue'
import ManageControl from '../views/ManageControl.vue'

const routes = [
  {
    path: '/',
    component: Master,
    meta: {
      auth: true
    },
    redirect: { name: 'home' },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/myprofile',
        name: 'MyProfile',
        component: MyProfile,
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
        path: '/group',
        name: 'group',
        component: GroupView
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
      },
      {
        path: '/user',
        name: 'user',
        component: UserView
      },
      {
        path: '/permission',
        name: 'permission',
        component: PermissionView
      },
      {
        path: '/role',
        name: 'role',
        component: RoleView
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    redirect: { name: 'login' }
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
    path: '/manage-control',
    name: 'manage-control',
    component: ManageControl,
    meta: {
      auth: true
    }
  },
  {
    path: '/presence',
    name: 'presence',
    component: PresenceViewVue
  },
  {
    path: '/doorlock',
    name: 'doorlock',
    component: DoorlockViewVue
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

const authCheck = () => {
  return VueCookies.get('token') ? true : false
}

const authDeviceCheck = () => {
  return VueCookies.get('device_token') ? true : false
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    if (authCheck()) {
      return next()
    } else {
      return next({ name: 'login' })
    }
  }
  if (to.name == 'login') {
    if (!authCheck()) {
      return next()
    } else {
      return next({ name: 'manage-control' })
    }
  }
  if (to.name == 'device_register') {
    if (!authDeviceCheck()) {
      return next()
    } else {
      return next({ name: 'presence' })
    }
  }
  return next()
})

export default router
