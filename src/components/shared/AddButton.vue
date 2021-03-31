<template>
  <button
    :class="['add-button', { 'add-button--active': active }]"
    @click.prevent="$emit('clicked')"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script>
export default {
  name: 'RoundButton',

  props: {
    active: { type: Boolean, default: false },
    icon: { type: String, required: true }
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

.add-button--active {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
  font-weight: 900;
}
</style>
