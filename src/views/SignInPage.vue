<template>
  <div class="sign-in-page">
    <sign-in-header />
    <component :is="component" />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import SignInHeader from '@/components/sign-in/SignInHeader'
import SignInForm from '@/components/sign-in/SignInForm'
import SignInWithLinkForm from '@/components/sign-in/SignInWithLinkForm'

export default {
  name: 'SignInPage',

  components: { SignInHeader, SignInForm, SignInWithLinkForm },

  data() {
    return {
      component: 'sign-in-form'
    }
  },

  async mounted() {
    if (firebase.auth().isSignInWithEmailLink(location.href)) {
      this.component = 'sign-in-with-link-form'
    }
  }
}
</script>

<style scoped>
.sign-in-page {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'image form';
}

@media only screen and (max-width: 768px) {
  .sign-in-page {
    grid-template-areas:
      'image image'
      'form form';
  }
}
</style>
