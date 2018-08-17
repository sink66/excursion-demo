import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: ''
  },
  getters: {
    theme (state) {
      return state.theme
    }
  },
  mutations: {
    setTheme (state, payload) {
      state.theme = payload.theme
    }
  },
  actions: {
    doThemeUpdate ({commit}, theme) {
      commit('setTheme', {
        theme
      })
    }
  }
})
export default store
