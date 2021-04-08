<template>
  <div class="form-input">
    <font-awesome-icon class="form-input__icon" :icon="icon" />
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue($event.target.value)"
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

  data() {
    return {
      inputModel: ''
    }
  },

  methods: {
    updateValue(value) {
      this.$emit('input', value)
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
}

.form-input input:focus {
  border: 1px solid var(--dark);
}

.form-input__icon {
  position: relative;
  left: 18px;
  opacity: 0.5;
}
</style>
