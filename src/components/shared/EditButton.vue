<template>
  <button class="edit-button" @click.prevent="$emit('clicked')">
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
  margin: 25px 0 50px 0;
  min-width: 50px;
  min-height: 50px;
  color: #fff;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  outline: none;
  font-weight: 900;
}

.edit-button:hover {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
}
</style>
