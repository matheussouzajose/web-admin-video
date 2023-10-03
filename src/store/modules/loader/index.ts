interface State {
  loading: boolean
  requestsPending: number
}

export default {
  namespaced: true,
  state: (): State => ({
    loading: false,
    requestsPending: 0
  }),
  actions: {
    show ({ commit }: any) {
      commit('show')
    },
    hide ({ commit }: any) {
      commit('hide')
    },
    pending ({ commit }: any) {
      commit('pending')
    },
    done ({ commit }: any) {
      commit('done')
    }
  },
  mutations: {
    show (state: State) {
      state.loading = true
    },
    hide (state: State) {
      state.loading = false
    },
    pending (state: State) {
      if (state.requestsPending === 0) {
        // this.commit("loader/show");
      }

      state.requestsPending++
    },
    done (state: State) {
      if (state.requestsPending >= 1) {
        state.requestsPending--
      }

      if (state.requestsPending <= 0) {
        // this.commit("loader/hide")
      }
    }
  }
}
