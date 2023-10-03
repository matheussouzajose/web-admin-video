import { createStore, Store } from 'vuex'
import profile from '@/store/modules/profile'
import auth from '@/store/modules/auth'

const store: Store<any> = createStore({
  modules: {
    profile,
    auth
  }
})
export default store
