import DotSpinner from '@/components/shared/DotSpinner'
import {
  defaultDialogOptions,
  defaultToastOptions,
  timeAgo
} from '@/services/miscellaneousService'
import { vuelidateErrorExtractorOptions } from '@/services/validatorsService'
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
  faThumbsUp,
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
import VTooltip from 'v-tooltip'
import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Toast, defaultToastOptions)
Vue.use(Vuelidate)
Vue.use(VuelidateErrorExtractor, vuelidateErrorExtractorOptions)
Vue.use(VTooltip)
VTooltip.enabled = window.innerWidth > 768
Vue.use(VuejsDialog, defaultDialogOptions)
Vue.component('form-group', templates.singleErrorExtractor.foundation6)
Vue.component('dot-spinner', DotSpinner)

Vue.filter('toBRDate', function(timestamp) {
  if (timestamp) {
    const date = timestamp.toDate()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
})
Vue.filter('elapsedTime', function(timestamp) {
  if (timestamp) {
    const dateInMs = Date.now().valueOf()
    const timestampInMs = timestamp.seconds * 1000
    const elapsedTimeInMs = dateInMs - timestampInMs
    return timeAgo.format(Date.now() - elapsedTimeInMs)
  }
})

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
  faThumbsUp,
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
