<template>
  <div class="profile-page">
    <profile />
  </div>
</template>

<script>
import Profile from '@/components/profile/Profile'

export default {
  name: 'ProfilePage',
  components: { Profile }
}
</script>

<style scoped>
.profile-page {
  width: 100%;
}
</style>
