import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: '',
    some: '',
    associates: []
  },
  getters: {
    theme (state) {
      return state.theme
    },
    some (state) {
      return state.some
    }
  },
  mutations: {
    setTheme (state, payload) {
      state.theme = payload.theme
    },
    setSome (state, payload) {
      state.some = payload.some
    },
    setAssociates (state, payload) {
      state.associates = payload.associates
    }
  },
  actions: {
    doThemeUpdate ({commit}, theme) {
      commit('setTheme', {
        theme
      })
    },
    doSomeUpdate ({commit}, some) {
      commit('setSome', {
        some
      })
    }
  }
})
export default store
