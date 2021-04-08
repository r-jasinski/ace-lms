<template>
  <button
    :class="['round-corner-button', { 'round-corner-button--active': active }]"
    @click.prevent="$emit('clicked')"
  >
    <div class="round-corner-button__label">
      {{ label }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'RoundCornerButton',

  props: {
    active: { type: Boolean, default: false },
    label: { type: String, default: '' }
  }
}
</script>

<style scoped>
.round-corner-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  min-height: 50px;
  padding: 10px;
  color: #fff;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  outline: none;
}

.round-corner-button:hover {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
  cursor: pointer;
}

.round-corner-button--active {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
  font-weight: 900;
}

.round-corner-button__label {
  text-shadow: 0px 0px 2px var(--light);
}
</style>
