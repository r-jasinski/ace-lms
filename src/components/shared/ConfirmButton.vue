<template>
  <button
    :class="[
      'confirm-button',
      { 'confirm-button--active': active },
      { 'confirm-button--disabled': disabled }
    ]"
    @click.prevent="$emit('clicked')"
    :disabled="disabled"
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
    disabled: { type: Boolean, default: false },
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

.confirm-button--disabled {
  opacity: 0.5;
  cursor: default !important;
  transform: scale(1) !important;
  background-color: var(--primary) !important;
}

.confirm-button__label {
  text-shadow: 0px 0px 2px black;
}
</style>
