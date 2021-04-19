import { getAuthenticatedUser } from '@/services/firebaseService'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import aboutUsersRoutes from './aboutUsersRoutes.js'
import articlesRoutes from './articlesRoutes.js'
import homeRoutes from './homeRoutes'
import profileRoutes from './profileRoutes.js'
import questionsRoutes from './questionsRoutes.js'
import rankingRoutes from './rankingRoutes.js'
import redirectRoutes from './redirectRoutes.js'
import signInRoutes from './signInRoutes.js'
import welcomeRoutes from './welcomeRoutes.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/views/AppPage'),
    children: [
      ...homeRoutes,
      ...rankingRoutes,
      ...articlesRoutes,
      ...questionsRoutes,
      ...profileRoutes,
      ...aboutUsersRoutes
    ]
  },
  ...signInRoutes,
  ...welcomeRoutes,
  ...redirectRoutes
]

const router = new VueRouter({
  mode: 'history',
  hashbag: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.params.savedPosition) return {}
    if (to.hash) {
      let position = { selector: to.hash }
      return position
    }
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes
})

router.afterEach(to => {
  store.dispatch('documentTitle/setDocumentHeadTitle', to.meta.title)
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = getAuthenticatedUser()
  if (requiresAuth && !isAuthenticated) {
    const loginpath = window.location.pathname
    next({ name: 'SignInPage', query: { to: loginpath } })
    return
  }
  if (!requiresAuth && isAuthenticated) {
    next('')
    return
  }
  next()
})

export default router
