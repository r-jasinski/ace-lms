export default {
  namespaced: true,

  state: {
    authenticatedUser: {},
    displayImage: null
  },

  getters: {
    authenticatedUser: state => state.authenticatedUser,
    displayImage: state => state.displayImage
  },

  mutations: {
    setAuthenticatedUser: (state, payload) =>
      (state.authenticatedUser = payload)
  },

  actions: {
    commitAuthenticatedUser: ({ commit, state }, authenticatedUser) => {
      const { photoURL } = authenticatedUser
      state.displayImage = photoURL
      commit('setAuthenticatedUser', authenticatedUser)
    },
    commitResetAuthenticatedUser: ({ commit }) => {
      commit('setAuthenticatedUser', {})
    }
  }
}
