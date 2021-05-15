<template>
  <button
    :class="['add-button', { 'add-button--disabled': disabled }]"
    @click.prevent="$emit('clicked')"
  >
    <font-awesome-icon icon="plus" />
  </button>
</template>

<script>
export default {
  name: 'AddButton',

  props: {
    disabled: { type: Boolean, default: false }
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

.add-button--disabled {
  opacity: 0.5;
  cursor: default !important;
  transform: scale(1) !important;
  background-color: var(--primary) !important;
}
</style>
