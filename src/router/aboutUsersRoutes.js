export default [
  {
    path: '/about',
    name: 'AboutUsersPage',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/AboutUsersPage'),
    meta: {
      title: 'Sobre',
      requiresAuth: true
    }
  }
]
