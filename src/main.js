import DotSpinner from '@/components/shared/DotSpinner'
import {
  defaultDialogOptions,
  defaultToastOptions,
  timeAgo
} from '@/services/miscellaneousService'
import { vuelidateErrorExtractorOptions } from '@/services/validatorsService'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold'
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage'
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo'
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb'
import { faListOl } from '@fortawesome/free-solid-svg-icons/faListOl'
import { faListUl } from '@fortawesome/free-solid-svg-icons/faListUl'
import { faMehBlank } from '@fortawesome/free-solid-svg-icons/faMehBlank'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons/faQuoteRight'
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp'
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons/faStrikethrough'
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline'
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons/faUserEdit'
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons/faWindowMinimize'
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
  faSortDown,
  faSortUp,
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
Vue.component('form-group', templates.singleErrorExtractor.foundation6)
Vue.component('dot-spinner', DotSpinner)
Vue.use(Toast, defaultToastOptions)
Vue.use(Vuelidate)
Vue.use(VuelidateErrorExtractor, vuelidateErrorExtractorOptions)
Vue.use(VTooltip)
VTooltip.enabled = window.innerWidth > 768
Vue.use(VuejsDialog, defaultDialogOptions)

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
