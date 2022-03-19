<template>
  <div :class="['ranking-user', { 'ranking-user--current': currentUser }]">
    <div class="ranking-user__wrapper">
      <span class="ranking-user__position">
        <slot name="ranking-user-position" />
      </span>
      <small>xp</small>
    </div>
    <user-avatar
      :inactive="!!user.deletedAt"
      :userPhotoURL="user.photoURL"
      :userRankingPoints="user.rankingPoints"
    />
    <ul>
      <li class="ranking-user__name">
        {{ user.displayName }}
        <span class="ranking-user__indicator">
          <slot name="ranking-user-indicator" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import UserAvatar from '@/components/shared/UserAvatar'

export default {
  name: 'RankingUser',

  components: { UserAvatar },

  props: {
    currentUser: { type: Boolean, required: false },
    user: { type: Object, required: true }
  }
}
</script>

<style scoped>
.ranking-user {
  align-items: center;
  backdrop-filter: blur(3px);
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 5px 15px;
}

.ranking-user__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 0 0 5px var(--light);
}

.ranking-user--current {
  background-color: var(--primary);
  border-radius: 5px;
}

.ranking-user__position {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 2.5em;
  font-weight: 900;
  min-width: 85px;
  text-shadow: 0 0 5px var(--light);
}

.ranking-user__name {
  font-size: 1.5em;
  font-weight: 900;
}

.ranking-user__indicator {
  font-size: 1em;
  color: var(--light);
  text-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.ranking-user ul {
  list-style: none;
  margin-top: 0;
  text-shadow: 0 0 5px var(--light);
}

.ranking-user small {
  font-size: 1em;
  font-weight: 600;
}
</style>
