<template>
  <div class="about-users-page">
    <div class="about-users-page__header-buttons">
      <round-corner-button
        :label="'Sobre'"
        @clicked="switchComponentTo('about-view-edit')"
        :active="component === 'about-view-edit'"
      />
      <round-corner-button
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
import RoundCornerButton from '@/components/shared/RoundCornerButton'
import UsersViewEdit from '@/components/about-users/UsersViewEdit'

export default {
  name: 'AboutUsersPage',

  components: { AboutViewEdit, RoundCornerButton, UsersViewEdit },

  data() {
    return {
      component: 'about-view-edit'
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
  width: 100%;
}

.about-users-page__header-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;
}
</style>
