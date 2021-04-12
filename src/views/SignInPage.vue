<template>
  <div class="sign-in-page">
    <sign-in-header />
    <keep-alive>
      <component :is="component" @submited="component = 'sign-in-form'" />
    </keep-alive>
  </div>
</template>

<script>
import SignInForm from '@/components/sign-in/SignInForm'
import SignInHeader from '@/components/sign-in/SignInHeader'
import SignInPasswordReset from '@/components/sign-in/SignInPasswordReset'
import SignInWithLinkForm from '@/components/sign-in/SignInWithLinkForm'
import { isSignInWithEmailLink } from '@/services/firebaseService'

export default {
  name: 'SignInPage',

  components: {
    SignInHeader,
    SignInForm,
    SignInWithLinkForm,
    SignInPasswordReset
  },

  data() {
    return {
      component: 'sign-in-form'
    }
  },

  async mounted() {
    if (isSignInWithEmailLink()) {
      this.component = 'sign-in-with-link-form'
      return
    }
    if (this.$route.query.oobCode) {
      this.component = 'sign-in-password-reset'
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
