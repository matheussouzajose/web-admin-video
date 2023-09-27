import getErrors from '@/services/helpers'

export default (httpClient) => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post('/register', {
      name,
      email,
      password
    })
    const errors = getErrors(response)

    return {
      data: response.data,
      errors
    }
  },

  login: async ({ email, password }) => {
    const response = await httpClient.post('/login', { email, password })
    const errors = getErrors(response)

    return {
      data: response.data,
      errors
    }
  },

  logout: async () => {
    const response = await httpClient.post('/auth/logout')
    const errors = getErrors(response)

    return {
      data: response.data,
      errors
    }
  }
})
