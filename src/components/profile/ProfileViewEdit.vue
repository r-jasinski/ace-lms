<template>
  <div class="profile-view-edit">
    <div class="profile-view-edit__avatar" />
    <form class="profile-view-edit__form">
      <form-input
        v-for="({ type, placeholder, autocomplete, icon, value },
        index) in inputs"
        :key="index"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :icon="icon"
        :value="value"
      />
      <round-corner-button
        class="profile-view-edit__save-button"
        :label="'Salvar'"
      />
    </form>
  </div>
</template>

<script>
import RoundCornerButton from '@/components/shared/RoundCornerButton'
import FormInput from '@/components/shared/FormInput'
import profileFormInputsMixin from '@/mixins/profileFormInputsMixin'

export default {
  name: 'ProfileViewEdit',

  components: { RoundCornerButton, FormInput },

  mixins: [profileFormInputsMixin]
}
</script>

<style scoped>
.profile-view-edit {
  margin: 0 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.profile-view-edit__avatar {
  height: 275px;
  width: 275px;
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
  background-position: center;
  background-size: cover;
  border-radius: 100vh;
  box-shadow: #24292e2a 0px 0px 2px 2px;
}

.profile-view-edit__form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-view-edit__save-button {
  min-width: 300px;
  margin-top: 20px;
}
</style>
