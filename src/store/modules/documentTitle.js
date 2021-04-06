export default {
  namespaced: true,
  state: {
    documentTitle: ''
  },
  getters: {
    getDocumentTitle(state) {
      return state.documentTitle
    }
  },
  mutations: {
    setDocumentTitle(state, payload) {
      state.documentTitle = payload
    }
  },
  actions: {
    setDocumentHeadTitle({ commit }, title) {
      commit('setDocumentTitle', title)
      document.title = title
    }
  }
}