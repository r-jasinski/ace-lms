<template>
  <button
    :class="['confirm-button', { 'confirm-button--active': active }]"
    @click.prevent="$emit('clicked')"
  >
    <div class="confirm-button__label">
      {{ label }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'ConfirmButton',

  props: {
    active: { type: Boolean, default: false },
    label: { type: String, default: '' }
  }
}
</script>

<style scoped>
.confirm-button {
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
  transition: all 0.05s;
}

.confirm-button:hover {
  background-color: var(--primary-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.05s;
}

.confirm-button--active {
  background-color: var(--primary-plus);
  transform: scale(1.05);
  transition: all 0.05s;
  font-weight: 900;
}

.confirm-button__label {
  text-shadow: 0px 0px 2px black;
}
</style>
