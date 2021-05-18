export default {
  namespaced: true,

  state: {
    showScrollPercentage: false,
    articleFontSize: 1,
    showTopMenu: false
  },

  getters: {
    showScrollPercentage: state => state.showScrollPercentage,
    articleFontSize: state => state.articleFontSize,
    showTopMenu: state => state.showTopMenu
  },

  mutations: {
    setShowScrollPercentage: (state, payload) => {
      state.showScrollPercentage = payload
    },
    setArticleFontSize: (state, payload) => (state.articleFontSize = payload),
    setShowTopMenu: (state, payload) => (state.showTopMenu = payload)
  },

  actions: {
    commitShowScrollPercentage: ({ commit }, payload) => {
      commit('setShowScrollPercentage', payload)
    },
    commitArticleFontSizeIncrease: ({ commit, state }) => {
      if (state.articleFontSize < 2) {
        commit('setArticleFontSize', (state.articleFontSize += 0.1))
      }
    },
    commitArticleFontSizeDecrease: ({ commit, state }) => {
      if (state.articleFontSize > 0.8) {
        commit('setArticleFontSize', (state.articleFontSize -= 0.1))
      }
    },
    commitShowTopMenu: ({ commit }, payload) => {
      commit('setShowTopMenu', payload)
    }
  }
}
