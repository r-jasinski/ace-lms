<template>
  <div class="form-input">
    <font-awesome-icon class="form-input__icon" :icon="icon" />
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputModel"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<script>
export default {
  name: 'FormInput',

  props: {
    autocomplete: { type: String, default: 'off' },
    icon: { type: String, default: 'meh-blank' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
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
.form-input {
  display: flex;
  align-items: center;
}

.form-input input {
  width: 100%;
  min-height: 50px;
  padding-left: 40px;
  margin-left: -15px;
  color: var(--dark);
  background-color: transparent;
  border-radius: 100vh;
  border: 1px solid var(--dark-50);
  outline: none;
  caret-color: var(--dark);
  -webkit-text-fill-color: var(--dark) !important;
}

.form-input input:focus {
  border: 1px solid var(--dark);
}

.form-input input::placeholder {
  -webkit-text-fill-color: var(--dark-50) !important;
}

.form-input__icon {
  position: relative;
  left: 18px;
  opacity: 0.5;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
