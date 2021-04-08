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
}

.remove-button:hover {
  background-color: var(--danger-plus);
  box-shadow: var(--danger-plus) 0px 0px 0px 3px;
}
</style>
