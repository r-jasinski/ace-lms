export default [
  {
    path: '/sign-in',
    name: 'SignInPage',
    component: () =>
      import(/* webpackChunkName: "sign-in" */ '@/views/SignInPage'),
    meta: { title: 'ACE LMS' }
  }
]
