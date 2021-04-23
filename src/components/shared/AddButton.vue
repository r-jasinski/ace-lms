<template>
  <button class="add-button" @click.prevent="$emit('clicked')">
    <font-awesome-icon icon="plus" />
  </button>
</template>

<script>
export default {
  name: 'AddButton'
}
</script>

<style scoped>
.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  min-height: 50px;
  color: #fff;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  outline: none;
  font-weight: 900;
  transform: scale(1);
  transition: all 0.05s;
}

.add-button:hover {
  background-color: var(--primary-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.05s;
}

.add-button--active {
  background-color: var(--primary-plus);
  transform: scale(1.05);
  transition: all 0.05s;
}
</style>
