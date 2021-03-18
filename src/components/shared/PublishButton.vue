<template>
  <button class="publish-button" @click="$router.push('/questions')">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'PublishButton',

  props: {
    label: { type: String, default: '' }
  }
}
</script>

<style scoped>
.publish-button {
}

.publish-button {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0 50px 0;
  padding: 10px;
  color: #fff;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  outline: none;
  font-weight: 900;
}

.publish-button:hover {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
}
</style>
