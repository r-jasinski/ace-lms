<template>
  <div class="admin-user">
    <form class="admin-user__filters" @submit.prevent>
      <sort-button
        label="data de cadastro"
        :isSortedUp="ascending"
        :disabled="sortDisabled"
        @clicked="handleSorting"
      />
      <filter-input v-model="filter" />
      <form-input
        type="email"
        placeholder="E-mail do usuário"
        autocomplete="email"
        icon="at"
        v-model="newUser.email"
        :v="$v.newUser.email"
        name="email"
      />
      <add-button
        @clicked="addUserWithLinkToEmail"
        :disabled="addButtonDisabled"
        tooltipContent="usuário"
      />
    </form>
    <div v-for="user in users" :key="user.id">
      <user-info :user="user" @changed="toggleAdminRole(user, $event)">
        <template slot="selected-user">
          <reactivate-button
            v-if="user.deletedAt"
            @clicked="openReactivateUserConfirm(user)"
            tooltipContent="usuário"
          />
          <remove-button
            v-else
            @clicked="openDeactivateUserConfirm(user)"
            tooltipContent="usuário"
          />
        </template>
      </user-info>
    </div>
    <div class="admin-user__loader">
      <small v-if="noMoreUsers.showMessage && !loading"
        >{{ noMoreUsers.message }}
      </small>
      <dot-spinner :size="'40px'" :opacity="0.5" v-if="loading" />
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import FormInput from '@/components/shared/FormInput'
import ReactivateButton from '@/components/shared/ReactivateButton'
import RemoveButton from '@/components/shared/RemoveButton'
import SortButton from '@/components/shared/SortButton.vue'
import UserInfo from '@/components/about-users/UserInfo'
import { addUserWithLinkToEmail } from '@/services/firebaseService'
import {
  filterUsersBy,
  getUser,
  getUsers,
  getNextUsers
} from '@/services/usersService'
import { mapGetters } from 'vuex'
import { updateUser } from '@/services/usersService'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'UsersViewEdit',

  components: {
    AddButton,
    FilterInput,
    FormInput,
    ReactivateButton,
    RemoveButton,
    SortButton,
    UserInfo
  },

  data() {
    return {
      ascending: false,
      filter: '',
      itemsPerPage: 5,
      loading: false,
      newUser: {},
      noMoreUsers: {
        showMessage: false,
        message: ''
      },
      users: []
    }
  },

  validations: {
    newUser: {
      email: { required, email }
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      isEndOfScroll: 'miscellaneous/isEndOfScroll',
      user: 'users/user'
    }),

    sortDisabled() {
      return !this.users.length || !!this.filter
    },

    addButtonDisabled() {
      return this.$v.newUser.$anyError || !this.$v.newUser.$anyDirty
    }
  },

  watch: {
    async isEndOfScroll() {
      if (this.isEndOfScroll && !this.filter) {
        this.getNextUsers()
      }
    },

    async filter() {
      await this.filterUserBy()
    }
  },

  async created() {
    await this.initializeUsers()
  },

  methods: {
    async addUserWithLinkToEmail() {
      if (this.newUser.email) {
        const errorResponse = await addUserWithLinkToEmail(this.newUser.email)
        if (!errorResponse) {
          const message = `Convite enviado com sucesso pra o email ${this.newUser.email}!`
          this.$toast(message, { type: 'info' })
          this.newUser.email = ''
          this.$v.$reset()
        }
      }
    },

    async deactivateUser(user) {
      const errorResponse = await updateUser(user.id, {
        deletedAt: new Date()
      })
      if (!errorResponse) {
        this.reloadData(user.id)
        const message = `Usuário ${user.displayName} desativado com sucesso!`
        this.$toast(message, { type: 'info' })
      }
    },

    async filterUserBy() {
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
        'creationTime',
        this.ascending ? 'asc' : 'desc',
        this.itemsPerPage
      )
      this.loading = false
      this.noMoreUsers.showMessage = false
    },

    async reloadData(id) {
      const index = this.users.findIndex(item => item.id === id)
      const updatedUser = await getUser(id)
      const updatedUsers = [...this.users]
      updatedUsers[index] = updatedUser
      this.users = updatedUsers
    },

    async getNextUsers() {
      this.loading = true
      const moreData = await getNextUsers(
        'creationTime',
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
    },

    async openDeactivateUserConfirm(user) {
      let message = `Tem certeza que deseja remover o usuário <b>${user.displayName}</b>?`
      try {
        await this.$dialog.confirm(message)
        this.deactivateUser(user)
      } catch {
        return
      }
    },

    async openReactivateUserConfirm(user) {
      let message = `Tem certeza que deseja reativar o usuário <b>${user.displayName}</b>?`
      try {
        await this.$dialog.confirm(message)
        this.reactivateUser(user)
      } catch {
        return
      }
    },

    async reactivateUser(user) {
      const errorResponse = await updateUser(user.id, { deletedAt: null })
      if (!errorResponse) {
        this.reloadData(user.id)
        const message = `Usuário ${user.displayName} reativado com sucesso!`
        this.$toast(message, { type: 'info' })
      }
    },

    async toggleAdminRole(user, value) {
      const errorResponse = await updateUser(user.id, { isAdmin: value })
      if (!errorResponse) {
        const roleMessage = value
          ? 'agora é administrador!'
          : 'não é mais administrador!'
        const message = `Usuário ${user.displayName} ${roleMessage}`
        this.$toast(message, { type: 'info' })
      }
    }
  }
}
</script>

<style scoped>
.admin-user__loader {
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100%;
}

.admin-user__loader small {
  text-align: center;
}

.admin-user__filters {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 5px;
  margin: 25px 25px 0 0;
}

.inactive {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.admin-user__filters a {
  text-decoration: none;
  color: var(--dark);
  margin-right: 20px;
}
</style>
