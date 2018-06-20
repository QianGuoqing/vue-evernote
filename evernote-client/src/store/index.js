import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: '未登录'
  },
  mutations: {
    changeIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUsername(state, payload) {
      state.username = payload
    }
  },
  getters: {

  },
  actions: {

  }
})

export default store