import Vue from 'vue'
import Vuex from 'vuex'
import authenticatedUser from './modules/authenticatedUser'
import darkMode from './modules/darkMode'
import documentTitle from './modules/documentTitle'
import miscellaneous from './modules/miscellaneous'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { authenticatedUser, darkMode, documentTitle, miscellaneous, users }
})
