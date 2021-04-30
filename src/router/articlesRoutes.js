export default [
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
        path: 'view/:slug/:id',
        name: 'ArticleViewEdit',
        component: () => import('@/components/articles/ArticleViewEdit')
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/components/articles/ArticleCreate'),
        meta: { title: 'Criar Artigo' }
      }
    ]
  }
]
