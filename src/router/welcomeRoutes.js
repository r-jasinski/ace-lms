import { getAuthenticatedUser } from '@/services/firebaseService'

export default [
  {
    path: '/welcome',
    name: 'WelcomePage',
    component: () =>
      import(/* webpackChunkName: "welcome" */ '@/views/WelcomePage'),
    meta: { title: 'Bem-vindo', requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const noPhotoURL = !!getAuthenticatedUser().photoURL
      if (noPhotoURL) {
        next('')
        return
      }
      next()
    }
  }
]
