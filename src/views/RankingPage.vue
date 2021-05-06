<template>
  <div class="ranking-page">
    <div class="ranking-page__filters">
      <a href="#">mensal</a>
      <a href="#">anual</a>
      <filter-input />
    </div>
    <div v-for="user in users" :key="user.id">
      <ranking-user :user="user" :currentUser="isCurrentUser(user.id)">
        <template slot="ranking-user-position"
          >#{{ user.rankingPosition }}</template
        >
        <template v-if="isCurrentUser(user.id)" slot="ranking-user-indicator">{{
          '(você)'
        }}</template>
      </ranking-user>
    </div>
  </div>
</template>

<script>
import FilterInput from '@/components/shared/FilterInput'
import RankingUser from '@/components/ranking/RankingUser'
import { mapGetters } from 'vuex'

export default {
  name: 'RankingPage',

  components: { FilterInput, RankingUser },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user',
      users: 'users/users'
    })
  },

  methods: {
    isCurrentUser(userId) {
      return this.authenticatedUser.uid === userId
    }
  }
}
</script>

<style scoped>
.ranking-page {
  width: 100%;
}

.ranking-page__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ranking-page__filters a {
  text-decoration: none;
  color: var(--dark);
  margin-right: 20px;
}
</style>
