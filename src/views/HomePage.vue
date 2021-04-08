<template>
  <div class="home-page">
    <the-home-menu />
    <h4>
      Você sabia que é possível construir um sistema web utilizando apenas
      Javascript?
    </h4>
  </div>
</template>

<script>
import TheHomeMenu from '@/components/home/TheHomeMenu'

export default {
  name: 'HomePage',

  components: { TheHomeMenu }
}
</script>

<style scoped>
.home-page {
  width: 100%;
}

.home-page h4 {
  text-align: center;
}
</style>
