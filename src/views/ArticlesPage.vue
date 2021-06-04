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
  padding: 0 20%;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .articles-page {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  .articles-page {
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  .articles-page {
    padding: 0 3% 20% 1%;
  }
}
</style>
