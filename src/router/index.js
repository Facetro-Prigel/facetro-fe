import { createRouter, createWebHistory } from 'vue-router'
import PresenceViewVue from '@/views/PresenceView.vue'
import RegisterDeviceViewVue from '@/views/RegisterDeviceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/presence',
      name: 'presence',
      component: () => PresenceViewVue
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
    }
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
