import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: 0,
    isLogin:false
  },
  mutations: {
    UID(state,payload) {
      state.uid = payload
    },
    updataLoginState(state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
