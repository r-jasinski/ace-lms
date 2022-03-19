export default [
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/ProfilePage'),
    meta: { title: 'Perfil', requiresAuth: true }
  }
]
