export default [
  {
    path: '/welcome',
    name: 'WelcomePage',
    component: () =>
      import(/* webpackChunkName: "welcome" */ '@/views/WelcomePage'),
    meta: { title: 'Bem-vindo', requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (from.name !== 'SignInPage') {
        next('')
        return
      }
      next()
    }
  }
]
