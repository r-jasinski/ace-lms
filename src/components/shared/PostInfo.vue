<template>
  <div class="post-info">
    <div class="post-info__avatar" />
    <ul class="post-info__text">
      <li>{{ postInfo.autor }}</li>
      <li>{{ postInfo.postDate }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PostInfo',

  props: {
    postInfo: { type: Object, required: true }
  }
}
</script>

<style scoped>
.post-info__avatar {
  float: left;
  margin-right: 20px;
  height: 50px;
  min-width: 50px;
  background: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg')
    no-repeat center;
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
