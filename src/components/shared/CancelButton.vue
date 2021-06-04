<template>
  <button
    :class="['cancel-button', { 'cancel-button--active': active }]"
    @click.prevent="$emit('clicked')"
    aria-label="Cancelar"
  >
    <div class="cancel-button__label">
      {{ label }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'CancelButton',

  props: {
    active: { type: Boolean, default: false },
    label: { type: String, default: '' }
  }
}
</script>

<style scoped>
.cancel-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  min-height: 50px;
  padding: 10px;
  color: #fff;
  background-color: var(--danger);
  border-radius: 100vh;
  border: none;
  outline: none;
  transform: scale(1);
  transition: all 0.05s;
}

.cancel-button:hover {
  background-color: var(--danger-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.05s;
}

.cancel-button--active {
  background-color: var(--danger-plus);
  transform: scale(1.05);
  transition: all 0.05s;
  font-weight: 900;
}

.cancel-button__label {
  text-shadow: 0px 0px 2px black;
}
</style>
