<template>
  <button class="reactivate-button" @click.prevent="$emit('clicked')">
    <font-awesome-icon icon="redo" />
  </button>
</template>

<script>
export default {
  name: 'ReactivateButton'
}
</script>

<style scoped>
.reactivate-button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  min-height: 50px;
  color: #fff;
  background-color: var(--success);
  border-radius: 100vh;
  border: none;
  outline: none;
  font-weight: 900;
  transform: scale(1);
  transition: all 0.1s;
}

.reactivate-button:hover {
  background-color: var(--success-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.1s;
}

.reactivate-button--active {
  background-color: var(--success-plus);
  transform: scale(1.05);
  transition: all 0.1s;
}
</style>
