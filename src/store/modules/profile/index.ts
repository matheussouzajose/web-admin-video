import services from '@/services/index'

interface State {
  me: object
}

export default {
  namespaced: true,

  state: (): State => ({
    me: {}
  }),

  actions: {
    async me ({ commit }: any): Promise<void> {
      try {
        const { data } = await services.profile.getMe()
        commit('setMe', data)
      } catch (e) {
        console.error('error', e)
      }
    }
  },
  mutations: {
    setMe (state: State, me: object) {
      state.me = me
    },
    clearMe (state: State) {
      state.me = {}
    }
  },
  getters: {

  }
}
