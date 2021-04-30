import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faAt,
  faBell,
  faBold,
  faCode,
  faEdit,
  faFont,
  faGraduationCap,
  faHeading,
  faHome,
  faImage,
  faInfo,
  faItalic,
  faKey,
  faLightbulb,
  faListOl,
  faListUl,
  faMehBlank,
  faMinus,
  faParagraph,
  faPlus,
  faQuestion,
  faQuoteRight,
  faRedo,
  faSearch,
  faStrikethrough,
  faTerminal,
  faTimes,
  faTrash,
  faTrophy,
  faUnderline,
  faUndo,
  faUser,
  faUserEdit,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

library.add(
  faArrowLeft,
  faAt,
  faBell,
  faBold,
  faCode,
  faEdit,
  faFont,
  faGraduationCap,
  faGithub,
  faHeading,
  faHome,
  faImage,
  faInfo,
  faItalic,
  faKey,
  faLightbulb,
  faLinkedin,
  faListOl,
  faListUl,
  faMehBlank,
  faMinus,
  faParagraph,
  faPlus,
  faQuestion,
  faQuoteRight,
  faSearch,
  faRedo,
  faStrikethrough,
  faTerminal,
  faTimes,
  faTrash,
  faTrophy,
  faQuestion,
  faUnderline,
  faUndo,
  faUser,
  faUserEdit,
  faWindowMinimize
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

let app

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('authenticatedUser/commitAuthenticatedUser', user)
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
