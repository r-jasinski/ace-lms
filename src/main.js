import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBold,
  faCode,
  faEdit,
  faHeading,
  faImage,
  faItalic,
  faLightbulb,
  faListOl,
  faListUl,
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
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

library.add(
  faBold,
  faCode,
  faEdit,
  faHeading,
  faImage,
  faItalic,
  faLightbulb,
  faListOl,
  faListUl,
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
  faWindowMinimize
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
