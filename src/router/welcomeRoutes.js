import { getAuthenticatedUser } from '@/services/firebase'

export default [
  {
    path: '/welcome',
    name: 'WelcomePage',
    component: () =>
      import(/* webpackChunkName: "welcome" */ '@/views/WelcomePage'),
    meta: { title: 'Bem-vindo', requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const userHasphotoURL = getAuthenticatedUser().photoURL
      if (userHasphotoURL) {
        next('')
        return
      }
      next()
    }
  }
]
