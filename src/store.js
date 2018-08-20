import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: '',
    some: '',
    associates: [],
    ideas: {},
    userData: {}
  },
  getters: {
    theme (state) {
      return state.theme
    },
    some (state) {
      return state.some
    },
    ideas (state) {
      return state.ideas
    },
    userData (state) {
      return state.userData
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
    },
    setIdeas (state, payload) {
      state.ideas = payload.ideas
    },
    setUserData (state, payload) {
      state.userData = payload.userData
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
    },
    doIdeasUpdate ({commit}, ideas) {
      commit('setIdeas', {
        ideas
      })
    },
    doUserDataUpdate ({commit}, userData) {
      commit('setUserData', {
        userData
      })
    }
  }
})
export default store
