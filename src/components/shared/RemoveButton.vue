<template>
  <button class="remove-button" @click.prevent="$emit('clicked')">
    <font-awesome-icon icon="trash" />
  </button>
</template>

<script>
export default {
  name: 'RemoveButton'
}
</script>

<style scoped>
.remove-button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  min-height: 50px;
  color: #fff;
  background-color: var(--danger);
  border-radius: 100vh;
  border: none;
  outline: none;
  font-weight: 900;
  transform: scale(1);
  transition: all 0.1s;
}

.remove-button:hover {
  background-color: var(--danger-plus);
  transform: scale(1.05);
  transition: all 0.1s;
  cursor: pointer;
}
</style>
