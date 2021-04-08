<template>
  <div class="admin-user">
    <form class="admin-user__filters">
      <filter-input />
      <form-input
        type="email"
        placeholder="E-mail do usuário"
        autocomplete="email"
        icon="at"
        v-model="user.email"
      />
      <add-button @clicked="addUserWithLinkToEmail" />
    </form>
    <div v-for="user in users" :key="user.id">
      <user-info :user="user">
        <template v-if="user.current" slot="selected-user">
          <remove-button :remove="removeUser" />
        </template>
      </user-info>
    </div>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton'
import FilterInput from '@/components/shared/FilterInput'
import { addUserWithLinkToEmail } from '@/services/firebase'
import FormInput from '@/components/shared/FormInput'
import RemoveButton from '@/components/shared/RemoveButton'
import UserInfo from '@/components/about-users/UserInfo'

export default {
  name: 'UsersViewEdit',

  components: { AddButton, FilterInput, FormInput, RemoveButton, UserInfo },

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
    async addUserWithLinkToEmail() {
      if (this.user.email) {
        await addUserWithLinkToEmail(this.user.email)
        this.user.email = ''
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
}

.admin-user__filters a {
  text-decoration: none;
  color: var(--dark);
  margin-right: 20px;
}
</style>
