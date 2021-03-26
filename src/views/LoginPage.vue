<template>
  <div class="login-page">
    <login />
  </div>
</template>

<script>
import Login from '@/components/login/Login'

export default {
  name: 'LoginPage',
  components: {
    Login
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
}
</style>
