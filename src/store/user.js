import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    isLoggedIn: state => typeof state.user.ID !== 'undefined',
    user: state => state.user
  },
  actions: {},
  mutations: {
    SET_USER: (state, user) => {
      Vue.set(state, 'user', user)
    }
  }
}
