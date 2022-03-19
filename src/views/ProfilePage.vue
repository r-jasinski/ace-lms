<template>
  <div class="profile-page">
    <profile-view-edit />
  </div>
</template>

<script>
import ProfileViewEdit from '@/components/profile/ProfileViewEdit'

export default {
  name: 'ProfilePage',

  components: { ProfileViewEdit }
}
</script>

<style scoped>
.profile-page {
  width: 100%;
}
</style>
