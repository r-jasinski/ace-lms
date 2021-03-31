<template>
  <div class="admin-user">
    <div class="admin-user__filters">
      <filter-input />
      <form-input
        :type="'email'"
        :placeholder="'E-mail do usuário'"
        :icon="'at'"
        v-model="user.email"
      />
      <add-button @clicked="addUser" icon="plus" />
    </div>
    <div v-for="user in users" :key="user.id">
      <user :user="user">
        <template v-if="user.current" slot="selected-user">
          <remove-button :remove="removeUser" />
        </template>
      </user>
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import firebase from 'firebase/app'
import 'firebase/auth'
import FormInput from '@/components/shared/FormInput'
import RemoveButton from '@/components/shared/RemoveButton'
import User from '@/components/about-users/User'

export default {
  name: 'UsersViewEdit',

  components: { AddButton, FilterInput, FormInput, RemoveButton, User },

  data() {
    return {
      user: {},
      users: [
        { id: 1, name: 'anna_nowak', current: false },
        { id: 2, name: 'jan_kowalski', current: true },
        { id: 3, name: 'jan_kowalski', current: false },
        { id: 4, name: 'jan_kowalski', current: false },
        { id: 5, name: 'jan_kowalski', current: false },
        { id: 6, name: 'jan_kowalski', current: false }
      ]
    }
  },

  methods: {
    removeUser() {},
    async addUser() {
      const actionCodeSettings = {
        url: `${location.origin}/sign-in`,
        handleCodeInApp: true
      }
      await firebase
        .auth()
        .sendSignInLinkToEmail(this.user.email, actionCodeSettings)
      this.user.email = ''
    }
  }
}
</script>

<style scoped>
.admin-user {
}

.admin-user__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.admin-user__filters a {
  text-decoration: none;
  color: var(--dark);
  margin-right: 20px;
}
</style>
