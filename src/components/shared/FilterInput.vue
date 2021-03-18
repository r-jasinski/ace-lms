<template>
  <div class="filter-input">
    <font-awesome-icon class="filter-input__icon" icon="search" />
    <input class="filter-input__field" type="text" placeholder="Pesquisar" />
  </div>
</template>

<script>
export default {
  name: 'FilterInput'
}
</script>

<style scoped>
.filter-input {
  display: flex;
  align-items: center;
}
.filter-input__field {
  width: 150px;
  min-height: 36px;
  padding-left: 30px;
  color: var(--dark);
  background-color: var(--light);
  border-radius: 18px;
  border: 1px solid var(--dark-50);
  outline: none;
}

.filter-input__field:focus {
  border: 1px solid var(--dark);
}

.filter-input__icon {
  position: relative;
  left: 25px;
  opacity: 0.5;
}
</style>
