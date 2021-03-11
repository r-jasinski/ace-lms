<template>
  <div class="articles-page">
    <articles />
  </div>
</template>

<script>
import Articles from '@/components/articles/Articles'

export default {
  name: 'ArticlesPage',
  components: {
    Articles
  }
}
</script>

<style scoped>
.articles-page {
  width: 100vw;
  min-width: 320px;
}
</style>
