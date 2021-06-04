<template>
  <button
    :class="['add-button', { 'add-button--disabled': disabled }]"
    @click.prevent="$emit('clicked')"
    v-tooltip.bottom="{
      content: `Criar ${tooltipContent}`,
      delay: { show: 500 }
    }"
  >
    <font-awesome-icon icon="plus" />
  </button>
</template>

<script>
export default {
  name: 'AddButton',

  props: {
    disabled: { type: Boolean, default: false },
    tooltipContent: { type: String, default: 'conteúdo' }
  }
}
</script>

<style scoped>
.add-button {
  align-items: center;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  color: #fff;
  display: flex;
  font-weight: 900;
  justify-content: center;
  min-height: 50px;
  min-width: 50px;
  outline: none;
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
  background-color: var(--primary) !important;
  cursor: default !important;
  opacity: 0.5;
  transform: scale(1) !important;
}
</style>
