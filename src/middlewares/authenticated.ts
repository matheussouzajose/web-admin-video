import { mapActions } from '@/store/map-state'
import Cookies from 'js-cookie'

export default {
  async redirectIfNotAuthenticated (to: any, from: any, next: any) {
    if (!Cookies.get('access_token')) {
      next({ name: 'sign-in' })
      return
    }

    const { 'profile/me': getMe } = mapActions()
    getMe()

    next()
  },

  redirectIfAuthenticated (to: any, from: any, next: any) {
    if (Cookies.get('access_token')) {
      next({ name: 'about' })
      return
    }
    next()
  }
}
