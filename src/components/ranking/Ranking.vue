<template>
  <div class="ranking">
    <div class="ranking__filters">
      <a href="#">mensal</a>
      <a href="#">anual</a>
      <input type="text" placeholder="Pesquisar" />
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
import RankingUser from './RankingUser'
export default {
  name: 'Ranking',

  components: {
    RankingUser
  },

  data() {
    return {
      users: [
        { id: 1, name: 'jan_kowalski', current: false },
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
.ranking {
  padding: 0 5%;
}

.ranking__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

input {
  width: 150px;
  min-height: 36px;
  border-radius: 18px;
  background-color: var(--light);
  color: var(--dark);
  border: 2px solid var(--dark);
  padding: 10px;
  outline: none;
}

a {
  text-decoration: none;
  color: var(--dark);
  margin-right: 20px;
}
</style>
