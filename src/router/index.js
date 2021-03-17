import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/ranking',
    name: 'RankingPage',
    component: () =>
      import(/* webpackChunkName: "ranking" */ '@/views/RankingPage'),
    meta: {
      title: 'Ranking'
    }
  },
  {
    path: '/articles',
    component: () =>
      import(/* webpackChunkName: "articles" */ '@/views/ArticlesPage'),
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
      title: 'Perfil'
    }
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/AboutPage'),
    meta: {
      title: 'Sobre'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes
})

const DEFAULT_TITLE = 'LMS'

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = `ACE: ${to.meta.title || DEFAULT_TITLE}`
  })
})

export default router
