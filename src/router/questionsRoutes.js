export default [
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
        path: 'view/:slug/:id',
        name: 'QuestionViewEdit',
        component: () => import('@/components/questions/QuestionViewEdit')
      },
      {
        path: 'create',
        name: 'QuestionCreate',
        component: () => import('@/components/questions/QuestionCreate'),
        meta: { title: 'Criar Pergunta' }
      }
    ]
  }
]
