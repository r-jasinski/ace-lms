<template>
  <div class="profile">
    <div class="profile__avatar" />
    <form class="profile__form">
      <form-input
        v-for="({ type, placeholder, icon, value }, index) in inputs"
        :key="index"
        :type="type"
        :placeholder="placeholder"
        :icon="icon"
        :value="value"
      />
      <publish-button class="profile__save-button" :label="'Salvar'" />
    </form>
  </div>
</template>

<script>
import PublishButton from '@/components/shared/PublishButton'
import FormInput from '@/components/shared/FormInput'
import profileFormInputsMixin from '@/mixins/editor/profileFormInputsMixin'

export default {
  name: 'Profile',

  components: { PublishButton, FormInput },

  mixins: [profileFormInputsMixin],

  data() {
    return {}
  }
}
</script>

<style scoped>
.profile {
  margin: 0 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.profile__avatar {
  height: 275px;
  width: 275px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
  border-radius: 100vh;
  box-shadow: #24292e2a 0px 0px 2px 2px;
}

.profile__form {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 5px;
}

.profile__save-button {
  margin: 25px 0 0 20px;
}
</style>
