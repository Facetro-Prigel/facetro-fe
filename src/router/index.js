import { createRouter, createWebHistory } from 'vue-router'
import PresenceViewVue from '@/views/PresenceView.vue'
import RegisterDeviceViewVue from '@/views/RegisterDeviceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import GroupView from '../views/GroupView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DeviceView from '../views/DeviceView.vue'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServicesView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import Dashboard from '../views/Dashboard.vue'
import Room from '../views/Room.vue'
import Camera from '../views/CameraView.vue'
import Attendance from '../views/Attendance.vue'
import Master from '@/layouts/Master.vue'
import RealtimeLogView from '@/views/RealtimeLogView.vue'
import UserView from '../views/UserView.vue'
import PermissionView from '../views/PermissionView.vue'
import RoleView from '@/views/RoleView.vue'
import VueCookies from 'vue-cookies'
import DemoUserView from '@/views/DemoUserView.vue'
const routes = [
  {
    path: "/",
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
      },
    ]
  },
  {
    path: '/demo_user',
    name: 'demo_user',
    meta: {
      auth: true
    },
    component: DemoUserView
  },
  {
    path: '/',
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
    meta: {
      device: true
    },
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
    meta: {
      auth: true
    },
    component: RealtimeLogView
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
const authCheck = () => {
  return VueCookies.get('token') ? true : false;
}
const deviceCheck = () => {
  return VueCookies.get('device_token') ? true : false;
}
router.beforeEach(
  async (to, from, next) => {
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
        return next({ name: 'dashboard' })
      }
    }

    if (to.name == 'device_register' ){
      if (!deviceCheck()) {
        return next()
      } else {
        return next({ name: 'presence' })
      }
    }
    if (to.meta.device) {
      if (deviceCheck()) {
        return next()
      } else {
        return next({ name: 'device_register' })
      }
    }
    return next()
  }
)
export default router
