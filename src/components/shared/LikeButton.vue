<template>
  <button
    :class="['like-button', { 'like-button--active': active }]"
    @click.prevent="$emit('clicked')"
    aria-label="Curtir"
  >
    <font-awesome-icon icon="thumbs-up" size="2x" />
  </button>
</template>

<script>
export default {
  name: 'LikeButton',

  props: {
    active: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.like-button {
  align-items: center;
  background-color: rgba(255, 0, 0, 0);
  border-radius: 100vh;
  border: none;
  color: var(--dark);
  cursor: pointer;
  display: flex;
  font-weight: 900;
  justify-content: center;
  min-height: 50px;
  min-width: 50px;
  opacity: 0.3;
  outline: none;
  transform: scale(1);
  transition: 1.5s opacity cubic-bezier(0.39, 0.575, 0.565, 1);
}

.like-button:hover {
  opacity: 1;
  transition: 1.5s opacity cubic-bezier(0.39, 0.575, 0.565, 1);
}

.like-button--active {
  opacity: 1;
}
</style>
