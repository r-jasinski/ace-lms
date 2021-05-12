export default {
  namespaced: true,

  state: {
    authenticatedUser: {}
  },

  getters: {
    authenticatedUser: state => state.authenticatedUser
  },

  mutations: {
    setAuthenticatedUser: (state, payload) =>
      (state.authenticatedUser = payload)
  },

  actions: {
    commitAuthenticatedUser: ({ commit }, authenticatedUser) => {
      const { photoURL } = authenticatedUser
      authenticatedUser.displayImage = photoURL
      commit('setAuthenticatedUser', authenticatedUser)
    },
    commitResetAuthenticatedUser: ({ commit }) => {
      commit('setAuthenticatedUser', {})
    }
  }
}
