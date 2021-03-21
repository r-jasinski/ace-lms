<template>
  <div class="form-input">
    <font-awesome-icon class="filter-input__icon" :icon="icon" />
    <input :type="type" :placeholder="placeholder" :value="value" />
  </div>
</template>

<script>
export default {
  name: 'FormInput',

  props: {
    icon: { type: String, default: 'meh-blank' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    value: { type: String, default: '' }
  },

  data() {
    return {
      inputModel: ''
    }
  }
}
</script>

<style scoped>
.form-input {
  display: flex;
  align-items: center;
  padding-right: 15px;
}

input {
  width: 100%;
  min-height: 36px;
  padding-left: 40px;
  color: var(--dark);
  background-color: var(--light);
  border-radius: 18px;
  border: 1px solid var(--dark-50);
  outline: none;
}

input:focus {
  border: 1px solid var(--dark);
}

.filter-input__icon {
  position: relative;
  left: 30px;
  opacity: 0.5;
}
</style>
