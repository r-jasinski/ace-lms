<template>
  <div class="about-users-page">
    <div v-if="isAdmin" class="about-users-page__header-buttons">
      <confirm-button
        :label="'Sobre'"
        @clicked="switchComponentTo('about-view-edit')"
        :active="component === 'about-view-edit'"
      />
      <confirm-button
        :label="'Usuários'"
        @clicked="switchComponentTo('users-view-edit')"
        :active="component === 'users-view-edit'"
      />
    </div>
    <keep-alive>
      <component :is="component" />
    </keep-alive>
  </div>
</template>

<script>
import AboutViewEdit from '@/components/about-users/AboutViewEdit'
import ConfirmButton from '@/components/shared/ConfirmButton'
import UsersViewEdit from '@/components/about-users/UsersViewEdit'
import { mapGetters } from 'vuex'

export default {
  name: 'AboutUsersPage',

  components: { AboutViewEdit, ConfirmButton, UsersViewEdit },

  data() {
    return {
      component: 'about-view-edit'
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      user: 'users/user'
    }),

    isAdmin() {
      return this.user(this.authenticatedUser.uid)?.isAdmin
    }
  },

  methods: {
    switchComponentTo(component) {
      if (component && component !== this.component) {
        this.component = component
      }
    }
  }
}
</script>

<style scoped>
.about-users-page {
  padding: 0 20%;
  width: 100%;
}

.about-users-page__header-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;
}

@media only screen and (max-width: 768px) {
  .about-users-page {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  .about-users-page {
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  .about-users-page {
    padding: 0 3% 20% 1%;
  }
}
</style>
