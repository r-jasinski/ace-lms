<template>
  <div class="post-info">
    <div
      class="post-info__avatar"
      :style="{ backgroundImage: `url(${postInfo.photoURL})` }"
    />
    <ul class="post-info__text">
      <li>{{ postInfo.displayName }}</li>
      <li>{{ postInfo.creationTime }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PostInfo',

  props: {
    postInfo: { type: Object, default: () => {} }
  }
}
</script>

<style scoped>
.post-info__avatar {
  float: left;
  margin-right: 20px;
  height: 50px;
  min-width: 50px;
  background-position: center;
  background-size: cover;
  border-radius: 999px;
}

.post-info__text {
  margin-top: 0;
  margin-bottom: 25px;
  opacity: 0.75;
  list-style: none;
}
</style>
