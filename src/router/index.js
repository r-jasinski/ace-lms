import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/views/AppPage'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/HomePage'),
        meta: {
          title: 'Home',
          requiresAuth: true
        }
      },
      {
        path: '/ranking',
        name: 'RankingPage',
        component: () =>
          import(/* webpackChunkName: "ranking" */ '@/views/RankingPage'),
        meta: {
          title: 'Ranking',
          requiresAuth: true
        }
      },
      {
        path: '/articles',
        component: () =>
          import(/* webpackChunkName: "articles" */ '@/views/ArticlesPage'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'ArticlesList',
            component: () => import('@/components/articles/ArticlesList'),
            meta: { title: 'Artigos' }
          },
          {
            path: 'view',
            name: 'ArticleViewEdit',
            component: () => import('@/components/articles/ArticleViewEdit'),
            meta: { title: 'Visualizar Artigo' }
          },
          {
            path: 'create',
            name: 'ArticleCreate',
            component: () => import('@/components/articles/ArticleCreate'),
            meta: { title: 'Criar Artigo' }
          }
        ]
      },
      {
        path: '/questions',
        component: () =>
          import(/* webpackChunkName: "questions" */ '@/views/QuestionsPage'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'QuestionsList',
            component: () => import('@/components/questions/QuestionsList'),
            meta: { title: 'Perguntas' }
          },
          {
            path: 'view',
            name: 'QuestionViewEdit',
            component: () => import('@/components/questions/QuestionViewEdit'),
            meta: { title: 'Visualizar Pergunta' }
          },
          {
            path: 'create',
            name: 'QuestionCreate',
            component: () => import('@/components/questions/QuestionCreate'),
            meta: { title: 'Criar Pergunta' }
          }
        ]
      },
      {
        path: '/profile',
        name: 'ProfilePage',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/ProfilePage'),
        meta: {
          title: 'Perfil',
          requiresAuth: true
        }
      },
      {
        path: '/about',
        name: 'AboutUsersPage',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/AboutUsersPage'),
        meta: {
          title: 'Sobre',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'SignInPage',
    component: () =>
      import(/* webpackChunkName: "sign-in" */ '@/views/SignInPage'),
    meta: {
      title: 'Sign In'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
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
  Vue.nextTick(() => {
    const signInWithLink = firebase.auth().isSignInWithEmailLink(location.href)
      ? 'Finalizar Cadastro'
      : null
    document.title = `${process.env.VUE_APP_TITLE || ''} ${signInWithLink ||
      to.meta.title ||
      ''}`
  })
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/sign-in')
    return
  }
  if (!requiresAuth && isAuthenticated) {
    next('')
    return
  }
  next()
})

export default router
