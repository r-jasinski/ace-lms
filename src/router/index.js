import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomePage',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomePage.vue')
  },
  {
    path: '/ranking',
    name: 'RankingPage',
    component: () =>
      import(/* webpackChunkName: "ranking" */ '../views/RankingPage.vue')
  },
  {
    path: '/articles',
    name: 'ArticlesPage',
    component: () =>
      import(/* webpackChunkName: "articles" */ '../views/ArticlesPage.vue')
  },
  {
    path: '/questions',
    name: 'QuestionsPage',
    component: () =>
      import(/* webpackChunkName: "questions" */ '../views/QuestionsPage.vue')
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/ProfilePage.vue')
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
