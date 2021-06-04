<template>
  <button
    class="remove-button"
    @click.prevent="$emit('clicked')"
    aria-label="Remover"
    v-tooltip.bottom="{
      content: `Remover ${tooltipContent}`,
      delay: { show: 500 }
    }"
  >
    <font-awesome-icon icon="trash" />
  </button>
</template>

<script>
export default {
  name: 'RemoveButton',

  props: {
    tooltipContent: { type: String, default: 'conteúdo' }
  }
}
</script>

<style scoped>
.remove-button {
  align-items: center;
  background-color: var(--danger);
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

.remove-button:hover {
  background-color: var(--danger-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.05s;
}
</style>
