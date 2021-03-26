<template>
  <div class="ranking-page">
    <ranking />
  </div>
</template>

<script>
import Ranking from '@/components/ranking/Ranking'

export default {
  name: 'RankingPage',
  components: {
    Ranking
  }
}
</script>

<style scoped>
.ranking-page {
  width: 100vw;
  min-width: 355px;
}
</style>
