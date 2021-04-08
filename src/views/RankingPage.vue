<template>
  <div class="ranking-page">
    <div class="ranking-page__filters">
      <a href="#">mensal</a>
      <a href="#">anual</a>
      <filter-input />
    </div>
    <div v-for="user in users" :key="user.id">
      <ranking-user :user="user">
        <template slot="ranking-user-position">#{{ user.id }}</template>
        <template v-if="user.current" slot="ranking-user-indicator">{{
          '(você)'
        }}</template>
      </ranking-user>
    </div>
  </div>
</template>

<script>
import FilterInput from '@/components/shared/FilterInput'
import RankingUser from '@/components/ranking/RankingUser'

export default {
  name: 'RankingPage',

  components: { FilterInput, RankingUser },

  data() {
    return {
      users: [
        { id: 1, name: 'anna_nowak', current: false },
        { id: 2, name: 'jan_kowalski', current: true },
        { id: 3, name: 'jan_kowalski', current: false },
        { id: 4, name: 'jan_kowalski', current: false },
        { id: 5, name: 'jan_kowalski', current: false },
        { id: 6, name: 'jan_kowalski', current: false }
      ]
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
