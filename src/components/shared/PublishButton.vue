<template>
  <button
    :class="['publish-button', { 'publish-button--active': active }]"
    @click.prevent="$emit('clicked')"
  >
    <div>
      {{ label }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'PublishButton',

  props: {
    active: { type: Boolean, default: false },
    label: { type: String, default: '' }
  }
}
</script>

<style scoped>
.publish-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  min-height: 50px;
  padding: 10px;
  color: #fff;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  outline: none;
}

.publish-button:hover {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
}

.publish-button--active {
  background-color: var(--primary-plus);
  box-shadow: var(--primary-plus) 0px 0px 0px 2px;
  font-weight: 900;
}
</style>
