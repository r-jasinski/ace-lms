import Vue from 'vue'
import Vuex from 'vuex'
import darkMode from './modules/darkMode'
import documentTitle from './modules/documentTitle'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { darkMode, documentTitle }
})
