<template>
  <div class="about-users-page">
    <div class="about-users-page__header-buttons">
      <publish-button
        :label="'Administrar Sobre'"
        @clicked="switchComponentTo('about-view-edit')"
        :active="component === 'about-view-edit'"
      />
      <publish-button
        :label="'Administrar Usuários'"
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
import UsersViewEdit from '@/components/about-users/UsersViewEdit'
import PublishButton from '@/components/shared/PublishButton'

export default {
  name: 'AboutUsersPage',

  components: { AboutViewEdit, PublishButton, UsersViewEdit },

  data() {
    return {
      component: 'about-view-edit'
    }
  },

  methods: {
    switchComponentTo(component) {
      if (!component || component === this.component) {
        return
      }
      this.component = component
    }
  }
}
</script>

<style scoped>
.about-users-page {
  width: 100vw;
  min-width: 320px;
  margin-top: 80px;
}

.about-users-page__header-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
}
</style>
