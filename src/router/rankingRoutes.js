export default [
  {
    path: '/ranking',
    name: 'RankingPage',
    component: () =>
      import(/* webpackChunkName: "ranking" */ '@/views/RankingPage'),
    meta: { title: 'Ranking', requiresAuth: true }
  }
]
