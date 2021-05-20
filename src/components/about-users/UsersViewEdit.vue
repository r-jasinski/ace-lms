<template>
  <div class="admin-user">
    <form class="admin-user__filters" @submit.prevent>
      <filter-input />
      <form-input
        type="email"
        placeholder="E-mail do usuário"
        autocomplete="email"
        icon="at"
        v-model="newUser.email"
        :v="$v.newUser.email"
        name="email"
      />
      <add-button @clicked="addUserWithLinkToEmail" :disabled="disabled" />
    </form>
    <div v-for="user in users" :key="user.id">
      <user-info :user="user" @changed="toggleAdminRole(user, $event)">
        <template slot="selected-user">
          <reactivate-button
            v-if="user.deletedAt"
            @clicked="openReactivateUserConfirm(user)"
          />
          <remove-button v-else @clicked="openDeactivateUserConfirm(user)" />
        </template>
      </user-info>
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import FormInput from '@/components/shared/FormInput'
import ReactivateButton from '@/components/shared/ReactivateButton'
import RemoveButton from '@/components/shared/RemoveButton'
import UserInfo from '@/components/about-users/UserInfo'
import { addUserWithLinkToEmail } from '@/services/firebaseService'
import { mapGetters } from 'vuex'
import { updateUser, usersCollection } from '@/services/usersService'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'UsersViewEdit',

  components: {
    AddButton,
    FilterInput,
    FormInput,
    ReactivateButton,
    RemoveButton,
    UserInfo
  },

  data() {
    return {
      newUser: {},
      users: [],
      unsubscribe: null
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
      user: 'users/user'
    }),
    disabled() {
      return this.$v.newUser.$anyError || !this.$v.newUser.$anyDirty
    }
  },

  mounted() {
    this.initializeUsers()
  },

  destroyed() {
    this.unsubscribe()
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
      const UTCStringDeletionTime = new Date().toUTCString()
      const errorResponse = await updateUser(user.id, {
        deletedAt: UTCStringDeletionTime
      })
      if (!errorResponse) {
        const message = `Usuário ${user.displayName} desativado com sucesso!`
        this.$toast(message, { type: 'info' })
      }
    },

    initializeUsers() {
      this.unsubscribe = usersCollection.onSnapshot(snapshot => {
        this.users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
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
