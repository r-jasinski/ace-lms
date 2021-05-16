<template>
  <button
    :class="['like-button', { 'like-button--active': active }]"
    @click.prevent="$emit('clicked')"
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  min-height: 50px;
  color: var(--dark);
  opacity: 0.3;
  background-color: rgba(255, 0, 0, 0);
  border-radius: 100vh;
  border: none;
  outline: none;
  font-weight: 900;
  transform: scale(1);
  transition: 1.5s opacity cubic-bezier(0.39, 0.575, 0.565, 1);
  cursor: pointer;
}

.like-button:hover {
  opacity: 1;
  transition: 1.5s opacity cubic-bezier(0.39, 0.575, 0.565, 1);
}

.like-button--active {
  opacity: 1;
}
</style>
