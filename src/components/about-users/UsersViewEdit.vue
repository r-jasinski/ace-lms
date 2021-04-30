<template>
  <div class="admin-user">
    <form class="admin-user__filters" @submit.prevent>
      <filter-input />
      <form-input
        v-if="false"
        type="email"
        placeholder="E-mail do usuário"
        autocomplete="email"
        icon="at"
        v-model="newUser.email"
      />
      <add-button
        @clicked="addUserWithLinkToEmail"
        v-if="authenticatedUser.uid === 'MqJSZr9ODNWWlxCa67BhaUyTu343'"
      />
    </form>
    <div v-for="user in users" :key="user.id">
      <user-info :user="user" @changed="toggleAdminRole(user.id, $event)">
        <template slot="selected-user">
          <reactivate-button
            v-if="user.deletedAt"
            @clicked="reactivateUser(user.id)"
          />
          <remove-button v-else @clicked="deactivateUser(user.id)" />
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

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    })
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
        await addUserWithLinkToEmail(this.newUser.email)
        this.newUser.email = ''
      }
    },

    async deactivateUser(userId) {
      const UTCStringDeletionTime = new Date().toUTCString()
      await updateUser(userId, { deletedAt: UTCStringDeletionTime })
    },

    initializeUsers() {
      this.unsubscribe = usersCollection.onSnapshot(snapshot => {
        this.users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      })
    },

    async reactivateUser(userId) {
      await updateUser(userId, { deletedAt: null })
    },

    async toggleAdminRole(user, value) {
      await updateUser(user, { isAdmin: value })
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
