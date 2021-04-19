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
  transform: scale(1);
  transition: all 0.1s;
}

.round-corner-button:hover {
  background-color: var(--primary-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.1s;
}

.round-corner-button--active {
  background-color: var(--primary-plus);
  transform: scale(1.05);
  transition: all 0.1s;
  font-weight: 900;
}

.round-corner-button__label {
  text-shadow: 0px 0px 2px black;
}
</style>
