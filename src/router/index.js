import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomePage',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/ranking',
    name: 'RankingPage',
    component: () =>
      import(/* webpackChunkName: "ranking" */ '../views/RankingPage.vue'),
    meta: {
      title: 'Ranking'
    }
  },
  {
    path: '/articles',
    name: 'ArticlesPage',
    component: () =>
      import(/* webpackChunkName: "articles" */ '../views/ArticlesPage.vue'),
    meta: {
      title: 'Artigos'
    }
  },
  {
    path: '/questions',
    name: 'QuestionsPage',
    component: () =>
      import(/* webpackChunkName: "questions" */ '../views/QuestionsPage.vue'),
    meta: {
      title: 'Perguntas'
    }
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/ProfilePage.vue'),
    meta: {
      title: 'Perfil'
    }
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
    meta: {
      title: ''
    }
  }
]

const router = new VueRouter({
  mode: 'history',
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
