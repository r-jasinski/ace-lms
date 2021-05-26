<template>
  <div class="user-info">
    <div
      :class="[
        'user-info__avatar',
        { 'user-info__avatar--inactive': user.deletedAt }
      ]"
      :style="{ backgroundImage: `url(${user.photoURL})` }"
    />
    <div class="user-info__indicator">
      <ul :class="{ 'user-info__indicator--inactive': !!user.deletedAt }">
        <li class="user-info__name">{{ user.displayName }}</li>
        <li>email: {{ user.email }}</li>
        <li>data de cadastro: {{ user.creationTime }}</li>
        <li v-if="user.deletedAt">data de exclusão: {{ user.deletedAt }}</li>
        <li>
          <form-checkbox
            :disabled="!!user.deletedAt"
            label="Admin"
            v-model="user.isAdmin"
            @change="$emit('changed', $event)"
          />
        </li>
      </ul>
    </div>
    <div class="user-info-button">
      <slot name="selected-user" />
    </div>
  </div>
</template>

<script>
import FormCheckbox from '@/components/shared/FormCheckbox'

export default {
  name: 'UserInfo',

  components: { FormCheckbox },

  props: {
    user: { type: Object, default: () => {} }
  }
}
</script>

<style scoped>
.user-info {
  align-items: center;
  backdrop-filter: blur(3px);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 5px;
  transition: all 0.03s;
}

.user-info:hover {
  background-color: var(--primary);
  transition: all 0.02s;
}

.user-info__avatar {
  min-width: 100px;
  height: 100px;
  border-radius: 999px;
  margin-left: 20px;
  margin-right: 20px;
  background-position: center;
  background-size: cover;
}

.user-info__avatar--inactive {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.user-info__name {
  font-size: 1.5em;
  font-weight: 900;
  margin-right: 40px;
}

.user-info__indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.user-info__indicator--inactive {
  opacity: 0.75;
}

.user-info-button {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin-right: 25px;
}

.user-info ul {
  list-style: none;
  margin-top: 0;
  text-shadow: 0 0 5px var(--light);
}
</style>
