<template>
  <div class="questions-page">
    <router-view />
  </div>
</template>

<script>
export default { name: 'QuestionsPage' }
</script>

<style scoped>
.questions-page {
  padding: 0 20%;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .questions-page {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  .questions-page {
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  .questions-page {
    padding: 0 3% 20% 1%;
  }
}
</style>
