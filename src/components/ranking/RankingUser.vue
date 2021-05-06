<template>
  <div class="ranking-user" :class="{ 'ranking-user--current': currentUser }">
    <span class="ranking-user__position">
      <slot name="ranking-user-position" />
    </span>
    <div
      class="ranking-user__avatar"
      :style="{ backgroundImage: `url(${user.photoURL})` }"
    />
    <ul>
      <li class="ranking-user__name">
        {{ user.displayName }}
        <span class="ranking-user__indicator">
          <slot name="ranking-user-indicator" />
        </span>
      </li>
      <li>{{ userRankingPoints }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankingUser',

  props: {
    currentUser: { type: Boolean, required: false },
    user: { type: Object, required: true }
  },

  computed: {
    userRankingPoints() {
      return this.user.rankingPoints
        ? `${this.user.rankingPoints} pontos`
        : 'sem pontuação'
    }
  }
}
</script>

<style scoped>
.ranking-user {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  padding: 5px 15px;
}

.ranking-user--current {
  background-color: var(--primary);
  border-radius: 5px;
}

.ranking-user__position {
  min-width: 85px;
  font-size: 3em;
  font-weight: 900;
}

.ranking-user__avatar {
  min-width: 100px;
  height: 100px;
  border-radius: 999px;
  margin-left: 20px;
  margin-right: 20px;
  background-position: center;
  background-size: cover;
}

.ranking-user__name {
  font-size: 1.5em;
  font-weight: 900;
  margin-right: 40px;
}

.ranking-user ul {
  list-style: none;
  margin-top: 0;
  text-shadow: 0 0 5px var(--light);
}

.ranking-user__indicator {
  font-size: 1em;
  opacity: 0.4;
  padding-left: 5px;
  color: var(--light);
  text-shadow: 0 0 0 var(--dark);
}
</style>
