<template>
  <div class="post-info" v-if="postInfo.creationTime">
    <user-avatar
      :avatarSize="85"
      :inactive="!!postInfo.deletedAt"
      :userPhotoURL="postInfo.photoURL"
      :userRankingPoints="postInfo.rankingPoints"
    />
    <div class="post-info__text">
      <small>{{ postInfo.displayName }}</small>
      <small>Postado {{ postInfo.creationTime | elapsedTime }}</small>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/shared/UserAvatar'

export default {
  name: 'PostInfo',

  components: { UserAvatar },

  props: {
    postInfo: { type: Object, default: () => {} }
  }
}
</script>

<style scoped>
.post-info {
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: flex-start;
}

.post-info__text {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-top: 0;
  opacity: 0.75;
}
</style>
