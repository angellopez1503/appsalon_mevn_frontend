import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthAPI from '@/api/AuthAPI'
// import AuthAPI from '@/api/AuthAPI'

// import isValidLoginAuthenticatedGuard from '@/guards/isValidLoginAuthenticatedGuard'
// import { isAuthenticatedGuard, isValidLoginAuthenticatedGuard } from '@/guards/AuthGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      meta: {
        requiresAuth: true
      },
      //  beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/appointments/AppointmentsLayout.vue'),
      children: [
        {
          path: '',
          name: 'my-appointments',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import('@/views/appointments/MyAppointmentsView.vue')
        },
        {
          path: 'nueva',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import('@/views/appointments/NewAppointmentLayout.vue'),
          name: 'appointment-layout',
          //     redirect: { name: 'appointment-new' },
          children: [
            {
              path: '',
              // meta: {
              //   requiresAuth: true
              // },
              name: 'appointment-new',
              component: () => import('@/views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              // meta: {
              //   requiresAuth: true
              // },
              name: 'appointment-details',
              component: () => import('@/views/appointments/AppointmentView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      //  beforeEnter: [isValidLoginAuthenticatedGuard],
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'registro',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('@/views/auth/ConfirmAccountView.vue')
        }
        // {
        //   path:'',
        //   redirect:{name:'login'}
        // }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)
  console.log('requiresAuth: ', requiresAuth)
  console.log('to: ', to)
  console.log('from :', from)
  const token = localStorage.getItem('AUTH_TOKEN')
  if (requiresAuth) {
    try {
      if(!token){ throw new Error()}
      await AuthAPI.auth(token)
      next()
    } catch (error) {
      // console.log(error.response.data.msg)
      return { name: 'login', force:true }
    }
  } else {
    try {
      if(!token) {throw new Error()}
      await AuthAPI.auth(token)
      return { name: 'my-appointments',force:true }
    } catch (error) {
      next()
    }
  }
})

export default router
