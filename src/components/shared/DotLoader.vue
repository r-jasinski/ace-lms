<template>
  <div class="dot-loader" v-if="loading">
    <dot-spinner />
  </div>
</template>

<script>
export default {
  name: 'DotLoader',

  props: {
    loading: { type: Boolean, default: true }
  }
}
</script>

<style>
.dot-loader {
  align-items: center;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
}
</style>
