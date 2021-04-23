export default {
  namespaced: true,
  state: {
    darkMode: null
  },
  getters: {
    darkMode: state => state.darkMode
  },
  mutations: {
    setDarkMode: (state, payload) => {
      state.darkMode = payload
    }
  },
  actions: {
    toggleDarkMode: ({ commit, state }) => {
      commit('setDarkMode', !state.darkMode)
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
    },
    initDarkMode: ({ commit }) => {
      const userSOScheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
      const localStorageScheme = JSON.parse(localStorage.getItem('darkMode'))
      if (localStorageScheme === null) {
        commit('setDarkMode', userSOScheme || false)
        return
      }
      commit('setDarkMode', localStorageScheme)
    }
  }
}
