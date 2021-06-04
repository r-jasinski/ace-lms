<template>
  <div class="ranking-page">
    <div class="ranking-page__filters">
      <sort-button
        label="pontuação"
        :isSortedUp="ascending"
        :disabled="disabled"
        @clicked="handleSorting"
      />
      <filter-input v-model="filter" />
    </div>
    <div v-for="user in users" :key="user.id">
      <ranking-user :user="user" :currentUser="isCurrentUser(user.id)">
        <template slot="ranking-user-position">{{
          user.rankingPoints
        }}</template>
        <template v-if="isCurrentUser(user.id)" slot="ranking-user-indicator">{{
          '(você)'
        }}</template>
      </ranking-user>
    </div>
    <div class="ranking-page__loader">
      <small v-if="noMoreUsers.showMessage && !loading"
        >{{ noMoreUsers.message }}
      </small>
      <dot-spinner :size="'40px'" :opacity="0.5" v-if="loading" />
    </div>
  </div>
</template>

<script>
import FilterInput from '@/components/shared/FilterInput'
import RankingUser from '@/components/ranking/RankingUser'
import SortButton from '@/components/shared/SortButton.vue'
import { filterUsersBy, getUsers, getNextUsers } from '@/services/usersService'
import { mapGetters } from 'vuex'

export default {
  name: 'RankingPage',

  components: { FilterInput, RankingUser, SortButton },

  data() {
    return {
      ascending: false,
      filter: '',
      itemsPerPage: 5,
      loading: false,
      noMoreUsers: {
        showMessage: false,
        message: ''
      },
      users: []
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      isEndOfScroll: 'miscellaneous/isEndOfScroll',
      user: 'users/user'
    }),

    disabled() {
      return !this.users.length || !!this.filter
    }
  },

  watch: {
    async isEndOfScroll() {
      if (this.isEndOfScroll && !this.filter) {
        this.getNextUsers()
      }
    },

    async filter() {
      await this.filterUsersBy()
    }
  },

  async created() {
    await this.initializeUsers()
  },

  methods: {
    async filterUsersBy() {
      if (this.filter.length) {
        this.loading = true
        this.users = await filterUsersBy(
          'displayName',
          this.filter.toLowerCase()
        )
        this.loading = false
        if (this.users.length) {
          this.noMoreUsers = {
            showMessage: true,
            message: 'Não há mais usuários com os critérios fornecidos!'
          }
          return
        }
        this.noMoreUsers = {
          showMessage: true,
          message: 'Não foram encontrados usuários com os critérios fornecidos!'
        }
        return
      }
      await this.initializeUsers()
    },

    async initializeUsers() {
      this.loading = true
      this.users = await getUsers(
        'rankingPoints',
        this.ascending ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      this.noMoreUsers.showMessage = false
    },

    isCurrentUser(userId) {
      return this.authenticatedUser.uid === userId
    },

    async getNextUsers() {
      this.loading = true
      const moreData = await getNextUsers(
        'rankingPoints',
        this.ascending ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      if (!moreData.length) {
        this.noMoreUsers = {
          showMessage: true,
          message: 'Não há mais usuários!'
        }
        return
      }
      this.users.push(...moreData)
    },

    async handleSorting() {
      if (!this.users.length || !!this.filter) {
        return
      }
      this.ascending = !this.ascending
      await this.initializeUsers()
    }
  }
}
</script>

<style scoped>
.ranking-page {
  padding: 0 20%;
  margin: 0 20px 0 0;
  width: 100%;
  z-index: inherit;
}

.ranking-page__loader {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100%;
}

.ranking-page__loader small {
  text-align: center;
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

@media only screen and (max-width: 768px) {
  .ranking-page {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  .ranking-page {
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  .ranking-page {
    padding: 0 3% 20% 1%;
  }
}
</style>
