export default {
  namespaced: true,

  state: {
    articleFontSize: 1,
    isEndOfScroll: false,
    showScrollPercentage: false,
    showTopMenu: false
  },

  getters: {
    articleFontSize: state => state.articleFontSize,
    isEndOfScroll: state => state.isEndOfScroll,
    showScrollPercentage: state => state.showScrollPercentage,
    showTopMenu: state => state.showTopMenu
  },

  mutations: {
    setArticleFontSize: (state, payload) => (state.articleFontSize = payload),
    setIsEndOfScroll: (state, payload) => (state.isEndOfScroll = payload),
    setShowScrollPercentage: (state, payload) => {
      state.showScrollPercentage = payload
    },
    setShowTopMenu: (state, payload) => (state.showTopMenu = payload)
  },

  actions: {
    commitArticleFontSizeIncrease: ({ commit, state }) => {
      if (state.articleFontSize < 2) {
        commit('setArticleFontSize', (state.articleFontSize += 0.1))
      }
    },
    commitIsEndOfScroll: ({ commit }, payload) => {
      commit('setIsEndOfScroll', payload)
    },
    commitShowScrollPercentage: ({ commit }, payload) => {
      commit('setShowScrollPercentage', payload)
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
