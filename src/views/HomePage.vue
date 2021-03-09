<template>
  <div class="home-page">
    <home />
  </div>
</template>

<script>
import Home from '@/components/home/Home.vue'

export default {
  name: 'HomePage',
  components: {
    Home
  }
}
</script>

<style scoped>
.home-page {
  width: 100vw;
  padding: 0 10%;
}
</style>
