import axios from 'axios'
import Cookies from 'js-cookie'
import ProfileService from './profile'
import store from '@/store/index'

const API_ENVS: any = {
  production: 'https://mjose-chat-backend.vercel.app',
  development: '',
  local: 'http://localhost:8000/api/v1'
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local,
  headers
})

httpClient.interceptors.request.use((config) => {
  const accessToken: string | undefined = Cookies.get('access_token')
  const tokenType: string | undefined = Cookies.get('token_type')
  if (accessToken && tokenType) {
    config.headers.authorization = `${tokenType} ${accessToken}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

httpClient.interceptors.response.use(
  (response) => {
    // const accessToken = response?.data?.access_token
    // const tokenType = response?.data?.token_type

    // if (accessToken && tokenType) {
    //   const token = `${tokenType} ${accessToken}`
    // AuthToken.set(token)
    // }

    // setGlobalLoading(false)
    return response
  },

  (error) => {
    const canThrowAnError =
      error?.request?.status === 0 || error?.request?.status === 500

    if (canThrowAnError) {
      // setGlobalLoading(false)
      throw new Error(error.message)
    }

    if (error?.request?.status === 401) {
      store.dispatch('auth/removeCookiesAuth')
      store.dispatch('auth/redirectToSignIn')
    }

    // setGlobalLoading(false)
    return error
  }
)

export default {
  profile: ProfileService(httpClient)
}
