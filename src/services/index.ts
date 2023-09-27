import axios from 'axios'
import AuthService from './auth'

const API_ENVS = {
  production: 'https://mjose-chat-backend.vercel.app',
  development: '',
  local: 'http://localhost:8000/api/v1'
}

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local,
  headers,
  showLoader: true
})

httpClient.interceptors.response.use(
  (response) => {
    const accessToken = response?.data?.access_token
    const tokenType = response?.data?.token_type

    if (accessToken && tokenType) {
      const token = `${tokenType} ${accessToken}`
      // AuthToken.set(token)
    }

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
      // router.push({ name: 'Site' })
      // AuthToken.delete()
    }

    // setGlobalLoading(false)
    return error
  }
)

export default {
  auth: AuthService(httpClient)
}
