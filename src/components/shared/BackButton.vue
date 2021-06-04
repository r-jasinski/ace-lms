<template>
  <button
    class="back-button"
    @click.prevent="$emit('clicked')"
    aria-label="Voltar"
  >
    <font-awesome-icon icon="arrow-left" />
  </button>
</template>

<script>
export default {
  name: 'BackButton'
}
</script>

<style scoped>
.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 25px 0 50px 0; */
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

.back-button:hover {
  background-color: var(--primary-plus);
  transform: scale(1.05);
  transition: all 0.05s;
}
</style>
