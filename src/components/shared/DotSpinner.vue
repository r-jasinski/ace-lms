<template>
  <div>
    <div class="dot-spinner1" :style="spinnerBasicStyle">
      <div class="dot-spinner2" :style="spinnerStyle"></div>
      <div class="dot-spinner3" :style="spinnerStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DotSpinner',

  props: {
    color: { type: String, default: 'var(--primary)' },
    margin: { type: String, default: '2px' },
    opacity: { type: Number, default: 1 },
    radius: { type: String, default: '100%' },
    size: { type: String, default: '80px' }
  },

  computed: {
    spinnerStyle() {
      return {
        backgroundColor: this.color,
        borderRadius: this.radius,
        height: parseFloat(this.size) / 2 + 'px',
        opacity: this.opacity,
        width: parseFloat(this.size) / 2 + 'px'
      }
    },
    spinnerBasicStyle() {
      return {
        height: this.size,
        opacity: this.opacity,
        position: 'relative',
        width: this.size
      }
    }
  }
}
</script>

<style>
.dot-spinner1 {
  -webkit-animation: dot-spinnerRotate 2s 0s infinite linear;
  animation: dot-spinnerRotate 2s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.dot-spinner2 {
  -webkit-animation: dot-spinnerBounce 2s 0s infinite linear;
  animation: dot-spinnerBounce 2s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  position: 'absolute';
  top: 0;
  bottom: auto;
}

.dot-spinner3 {
  -webkit-animation: dot-spinnerBounce 2s -1s infinite linear;
  animation: dot-spinnerBounce 2s -1s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  position: 'absolute';
  top: auto;
  bottom: 0;
}

@-webkit-keyframes dot-spinnerRotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes dot-spinnerRotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes dot-spinnerBounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes dot-spinnerBounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
