import { createRouter, createWebHistory } from 'vue-router'
import PresenceViewVue from '@/views/PresenceView.vue'
import RegisterDeviceViewVue from '@/views/RegisterDeviceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import ViewLogin from '@/views/Login/ViewLogin.vue'
import DashBoard from '@/layouts/DashBoard.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DeviceView from '@/views/DeviceView.vue'
// import ViewLand from "@/views/LandingPage/ViewLand"
// import AddLand from "@/views/LandingPage/AddLand"
// import EditLand from "@/views/LandingPage/EditLand"
// import DeleteLand from "@/views/LandingPage/DeleteLand"
// import DashBoard from "@/layouts/DashBoard.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoard,
      children:[
        {
          path: 'device', 
          name: 'device', 
          component: DeviceView
        },
      ]
    },
    {
      path: '/presence',
      name: 'presence',
      component: PresenceViewVue
    },
    {
      path: '/device_register',
      name: 'device',
      component: RegisterDeviceViewVue
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFoundView 
    },
    {
      path: '/forbidden', 
      name: '403', 
      component: ForbiddenView 
    },
    {
      path: '/login', 
      name: 'login', 
      component: ViewLogin
    },
    {
      path: '/attendance', 
      name: 'attendance', 
      component: AttendanceView
    },
    {
      path: '/register', 
      name: 'register', 
      component: RegisterView
    }
    // {
    //   path: '/device', 
    //   name: 'device', 
    //   component: DeviceView
    // }
    // {
    //   path: '/device', 
    //   name: 'device', 
    //   component: DeviceView
    // }
    // {
    //   path: '/', 
    //   name: 'Dashboard', 
    //   component: DashBoard,
    //   children: [
    //     {
    //       path: 'landing', 
    //       name: 'ViewLand', 
    //       component: ViewLand,
    //       children: [
    //         {
    //           path: 'add/:id', 
    //           name: 'Add LandingPage', 
    //           component: AddLand,
    //         },
    //         {
    //           path: 'edit/:id', 
    //           name: 'Edit LandingPage', 
    //           component: EditLand,
    //         },
    //         {
    //           path: 'delete/:id', 
    //           name: 'Delete LandingPage', 
    //           component: DeleteLand,
    //         }
    //       ]
    //     },
        //tambahin disini aja bal 

    //   ] 
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
