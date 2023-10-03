import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Guard from '@/middlewares/authenticated'
import { mapActions } from '@/store/map-state'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/views/CallbackView.vue'),
    beforeEnter (to) {
      const { 'auth/validAccessToken': validAccessToken } = mapActions()
      validAccessToken(to.hash)
    }
  },
  {
    path: '/',
    name: 'sign-in',
    component: () => import('@/views/SignIn/IndexView.vue'),
    beforeEnter: Guard.redirectIfAuthenticated
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/SignUp/IndexView.vue'),
    beforeEnter: Guard.redirectIfAuthenticated
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPassword/IndexView.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/ResetPasswordView.vue'),
    beforeEnter (to, from, next) {
      if (!to?.query?.token || !to?.query?.email) {
        next({ name: 'about' })
      }
      next()
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    beforeEnter: Guard.redirectIfNotAuthenticated
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'sign-in' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
