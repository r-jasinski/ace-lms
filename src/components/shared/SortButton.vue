<template>
  <div
    :class="['sort-button', { 'sort-button--disabled': disabled }]"
    @click.prevent="$emit('clicked')"
  >
    {{ label }}
    <font-awesome-icon v-if="isSortedUp" icon="sort-up" />
    <font-awesome-icon v-else icon="sort-down" />
  </div>
</template>

<script>
export default {
  name: 'SortButton',

  props: {
    disabled: { type: Boolean, default: false },
    isSortedUp: { type: Boolean, default: true },
    label: { type: String, default: '' }
  }
}
</script>

<style scoped>
.sort-button {
  align-items: center;
  border: none;
  display: flex;
  gap: 5px;
  min-height: 50px;
  min-width: 50px;
  outline: none;
}

.sort-button:hover {
  cursor: pointer;
}

.sort-button--disabled {
  opacity: 0.5;
}

.sort-button--disabled:hover {
  cursor: default;
}
</style>
