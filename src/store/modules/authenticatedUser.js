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
      const { photoURL, uid } = authenticatedUser
      authenticatedUser.displayImage =
        photoURL || `https://robohash.org/${uid}.png`
      commit('setAuthenticatedUser', authenticatedUser)
    }
  }
}
