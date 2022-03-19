<template>
  <button
    class="edit-button"
    @click.prevent="$emit('clicked')"
    aria-label="Editar"
    v-tooltip.bottom="{
      content: `Editar ${tooltipContent}`,
      delay: { show: 500 }
    }"
  >
    <font-awesome-icon icon="edit" />
  </button>
</template>

<script>
export default {
  name: 'EditButton',

  props: {
    tooltipContent: { type: String, default: 'conteúdo' }
  }
}
</script>

<style scoped>
.edit-button {
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

.edit-button:hover {
  background-color: var(--primary-plus);
  transform: scale(1.05);
  transition: all 0.05s;
}
</style>
