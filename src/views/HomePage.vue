<template>
  <div class="home-page">
    <home />
  </div>
</template>

<script>
import Home from '@/components/home/Home'

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
  min-width: 320px;
}
</style>
