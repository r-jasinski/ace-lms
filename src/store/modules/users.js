export default {
  namespaced: true,

  state: {
    users: {}
  },

  getters: {
    users: state => state.users,
    user: state => id => state.users[id]
  },

  mutations: {
    setUsers: (state, payload) => (state.users = payload)
  },

  actions: {
    commitUsers: ({ commit }, users) => commit('setUsers', users)
  }
}
