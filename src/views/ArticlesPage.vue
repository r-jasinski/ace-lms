<template>
  <div class="articles-page">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ArticlesPage'
}
</script>

<style scoped>
.articles-page {
  width: 100vw;
  min-width: 320px;
  margin-top: 80px;
}
</style>
