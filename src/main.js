import { firebaseConfig } from '@/services/firebaseService'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faAt,
  faBell,
  faBold,
  faCode,
  faEdit,
  faHeading,
  faImage,
  faItalic,
  faKey,
  faLightbulb,
  faListOl,
  faListUl,
  faMehBlank,
  faParagraph,
  faPlus,
  faQuoteRight,
  faRedo,
  faSearch,
  faStrikethrough,
  faTerminal,
  faTrash,
  faUnderline,
  faUndo,
  faUser,
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
  faAt,
  faBell,
  faBold,
  faCode,
  faEdit,
  faGithub,
  faHeading,
  faImage,
  faItalic,
  faKey,
  faLightbulb,
  faLinkedin,
  faListOl,
  faListUl,
  faMehBlank,
  faParagraph,
  faPlus,
  faQuoteRight,
  faSearch,
  faRedo,
  faStrikethrough,
  faTerminal,
  faTrash,
  faUnderline,
  faUndo,
  faUser,
  faWindowMinimize
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

firebase.initializeApp(firebaseConfig)

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
