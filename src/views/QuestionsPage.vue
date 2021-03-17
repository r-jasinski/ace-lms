<template>
  <div class="questions-page">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'QuestionsPage'
}
</script>

<style scoped>
.questions-page {
  width: 100vw;
  min-width: 320px;
}
</style>
