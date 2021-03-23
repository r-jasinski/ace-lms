<template>
  <button class="add-button" @click="add">
    <font-awesome-icon icon="plus" />
  </button>
</template>

<script>
export default {
  name: 'AddButton',

  props: {
    add: { type: Function, required: true }
  }
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
}

.add-button:hover {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
}
</style>
