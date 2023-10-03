export default (httpClient: any) => ({
  getMe: async () => {
    const response = await httpClient.get('http://localhost:8080/realms/code-flix/protocol/openid-connect/userinfo')
    return {
      data: response?.data
    }
  }
})
