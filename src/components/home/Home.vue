<template>
  <div class="home">
    <home-menu />
    <h4>
      Você sabia que é possível construir um sistema web utilizando apenas
      Javascript?
    </h4>
  </div>
</template>

<script>
import HomeMenu from './HomeMenu'

export default {
  name: 'Home',
  components: {
    HomeMenu
  }
}
</script>

<style scoped>
.home {
  min-width: 315px;
}
h4 {
  padding: 0 5%;
  text-align: center;
}
</style>
