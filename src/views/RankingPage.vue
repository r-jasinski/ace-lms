<template>
  <div class="ranking-page">
    <div class="ranking-page__filters">
      <a href="#">mensal</a>
      <a href="#">anual</a>
      <filter-input />
    </div>
    <div v-for="(user, index) in users" :key="user.id">
      <ranking-user :user="user" :currentUser="isCurrentUser(user.id)">
        <template slot="ranking-user-position">#{{ index + 1 }}</template>
        <template v-if="isCurrentUser(user.id)" slot="ranking-user-indicator">{{
          '(você)'
        }}</template>
      </ranking-user>
    </div>
    <div class="ranking-page__loader">
      <small v-if="noMoreUsers && !loading">Não há mais usuários. </small>
      <dot-spinner :size="'40px'" :opacity="0.5" v-if="loading" />
    </div>
  </div>
</template>

<script>
import FilterInput from '@/components/shared/FilterInput'
import RankingUser from '@/components/ranking/RankingUser'
import { getUsers, getNextUsers } from '@/services/usersService'
import { mapGetters } from 'vuex'

export default {
  name: 'RankingPage',

  components: { FilterInput, RankingUser },

  data() {
    return {
      itemsPerPage: 4,
      loading: false,
      noMoreUsers: false,
      users: []
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      isEndOfScroll: 'miscellaneous/isEndOfScroll',
      user: 'users/user'
    })
  },

  watch: {
    async isEndOfScroll() {
      if (this.isEndOfScroll) {
        this.getNextUsers()
      }
    }
  },

  async created() {
    await this.initializeUsers()
  },

  methods: {
    async initializeUsers() {
      this.loading = true
      this.users = await getUsers('rankingPoints', this.itemsPerPage)
      this.loading = false
    },

    isCurrentUser(userId) {
      return this.authenticatedUser.uid === userId
    },

    async getNextUsers() {
      this.loading = true
      const moreData = await getNextUsers('rankingPoints', this.itemsPerPage)
      this.loading = false
      if (!moreData.length) {
        this.noMoreUsers = true
        return
      }
      this.users.push(...moreData)
      this.noMoreUsers = false
    }
  }
}
</script>

<style scoped>
.ranking-page {
  margin: 0 20px 0 0;
  width: 100%;
}

.ranking-page__loader {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
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
