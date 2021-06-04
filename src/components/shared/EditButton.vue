<template>
  <button
    class="edit-button"
    @click.prevent="$emit('clicked')"
    aria-label="Editar"
  >
    <font-awesome-icon icon="edit" />
  </button>
</template>

<script>
export default {
  name: 'EditButton'
}
</script>

<style scoped>
.edit-button {
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

.edit-button:hover {
  background-color: var(--primary-plus);
  transform: scale(1.05);
  transition: all 0.05s;
}
</style>
