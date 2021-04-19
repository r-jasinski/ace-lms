<template>
  <label class="form-checkbox">
    {{ label }}
    <input type="checkbox" :disabled="disabled" v-model="checkboxModel" />
    <span v-if="true" class="form-checkbox__checkmark"></span>
  </label>
</template>

<script>
export default {
  name: 'FormCheckbox',

  props: {
    disabled: { type: [Boolean, String], default: false },
    label: { type: String, default: '' },
    value: { type: Boolean, default: false }
  },

  computed: {
    checkboxModel: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>

<style scoped>
.form-checkbox {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  justify-items: center;
}

.form-checkbox input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.form-checkbox__checkmark {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: transparent;
  border: 1px solid var(--dark);
  border-radius: 5px;
}

.form-checkbox__checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.form-checkbox input:checked ~ .form-checkbox__checkmark:after {
  display: block;
}

.form-checkbox .form-checkbox__checkmark:after {
  width: 2px;
  height: 10px;
  border: solid var(--dark);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
