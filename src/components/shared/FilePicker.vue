<template>
  <form-group :validator="v" :name="name">
    <label :class="['file-picker', { 'file-picker__error': v.$error }]">
      <font-awesome-icon class="file-picker__icon" :icon="icon" />
      <div class="file-picker__button">
        <span>{{ (value && value.name) || placeholder }}</span>
      </div>
      <input
        type="file"
        name="avatar"
        accept="image/png, image/jpeg"
        @change="handleFileChange"
        ref="inputFile"
      />
    </label>
  </form-group>
</template>

<script>
export default {
  name: 'FilePicker',

  props: {
    icon: { type: String, default: 'meh-blank' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    v: { type: Object, required: true },
    value: { type: File, default: null }
  },

  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0])
      this.$emit('picked', this.$refs.inputFile)
    }
  }
}
</script>

<style>
.file-picker {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
  color: var(--dark);
  background-color: transparent;
  border-radius: 100vh;
  border: 1px solid var(--dark-50);
  outline: none;
  overflow: hidden;
}

.file-picker__error {
  border: 1px solid var(--danger) !important;
}

.file-picker:hover {
  border: 1px solid var(--dark);
  cursor: pointer;
}

.file-picker__icon {
  margin: 0 9px 0 18px;
  opacity: 0.5;
}

.file-picker span {
  font: 400 13.3333px Arial;
  color: gray;
}

.file-picker > input[type='file'] {
  display: none;
}
</style>
