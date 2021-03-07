<template>
  <div>
    <home-menu />
    <h4>
      Você sabia que é possível construir um sistema web utilizando apenas
      Javascript?
    </h4>
  </div>
</template>

<script>
import HomeMenu from './HomeMenu.vue'

export default {
  name: 'Home',
  components: {
    HomeMenu
  }
}
</script>

<style scoped>
h4 {
  padding: 0 5%;
  text-align: center;
  /* border: 1px solid red; */
}
</style>
