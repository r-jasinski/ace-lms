export default {
  namespaced: true,
  state: {
    authenticatedUser: {},
    displayUserImage: ''
  },
  getters: {
    authenticatedUser(state) {
      return state.authenticatedUser
    }
  },
  mutations: {
    setAuthenticatedUser(state, payload) {
      state.authenticatedUser = payload
    }
  },
  actions: {
    commitAuthenticatedUser({ commit }, authenticatedUser) {
      const { photoURL } = authenticatedUser
      authenticatedUser.displayImage = photoURL
      commit('setAuthenticatedUser', authenticatedUser)
    }
  }
}
