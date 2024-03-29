import { getAuthenticatedUser } from '@/services/firebaseService'
import firebase from 'firebase/app'
import 'firebase/auth'
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
    if (to.params.fromNav) return { x: 0, y: 267 }
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
  if (to.meta.title) {
    store.dispatch('documentTitle/commitDocumentTitle', to.meta.title)
    var link = document.querySelector("link[rel='canonical']")
      ? document.querySelector("link[rel='canonical']")
      : document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute(
      'href',
      `${location.protocol}//${location.host}${location.pathname}`
    )
    document.head.appendChild(link)
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authenticatedUser = getAuthenticatedUser()
  if (requiresAuth && authenticatedUser && authenticatedUser?.deletedAt) {
    firebase.auth().signOut()
    return
  }
  if (requiresAuth && !authenticatedUser) {
    const loginPath = window.location.pathname
    const query = loginPath === '/' ? {} : { to: loginPath }
    next({ name: 'SignInPage', query })
    return
  }
  if (!requiresAuth && authenticatedUser) {
    next('')
    return
  }
  next()
})

export default router
