import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid:0
  },
  mutations: {
    UID(state,payload) {
      state.uid = payload
      console.log(state.uid);
    }
  },
  actions: {
  },
  modules: {
  }
})
