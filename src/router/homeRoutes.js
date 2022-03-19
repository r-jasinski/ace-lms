export default [
  {
    path: '',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage'),
    meta: { title: 'Home', requiresAuth: true }
  }
]
