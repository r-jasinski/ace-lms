<template>
  <div class="filter-input">
    <font-awesome-icon class="filter-input__icon" icon="search" />
    <label :for="id">Pesquisar</label>
    <input
      class="filter-input__field"
      :id="id"
      type="text"
      placeholder="Pesquisar"
      v-model.trim="inputModel"
    />
  </div>
</template>

<script>
export default {
  name: 'FilterInput',

  props: {
    id: { type: String, default: '' },
    value: { type: [String, Number, Date], default: '' }
  },

  computed: {
    inputModel: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>
.filter-input {
  display: flex;
  align-items: center;
}
.filter-input__field {
  width: 150px;
  min-height: 50px;
  padding-left: 30px;
  color: var(--dark);
  background-color: transparent;
  border-radius: 100vh;
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

.filter-input label {
  display: none;
}
</style>
