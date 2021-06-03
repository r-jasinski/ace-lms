<template>
  <form-group :validator="v" :name="name">
    <label
      :class="['image-picker', { 'image-picker__error': v.$error }]"
      :style="{ backgroundImage: `url(${displayImage})` }"
    >
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
  name: 'ImagePicker',

  props: {
    displayImage: { type: String, default: '' },
    name: { type: String, default: '' },
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
.image-picker {
  align-items: center;
  background-position: center;
  background-size: cover;
  border-radius: 100vh;
  display: flex;
  height: 275px;
  outline: none;
  width: 100%;
  width: 275px;
}

.image-picker:hover {
  cursor: pointer;
}

.image-picker__error {
  border: 1px solid var(--danger) !important;
}

.image-picker > input[type='file'] {
  display: none;
}
</style>
