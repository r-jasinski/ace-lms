<template>
  <div class="profile-view-edit">
    <div
      class="profile-view-edit__avatar"
      :style="{ backgroundImage: `url(${authenticatedUser.displayImage})` }"
    >
      <remove-button
        v-if="userHasPhoto"
        @clicked="removePhoto(authenticatedUser)"
        class="profile-view-edit__remove-button"
      />
    </div>
    <form class="profile-view-edit__form" @submit.prevent>
      <form-input
        v-for="({ type, placeholder, autocomplete, icon, meta },
        index) in inputs"
        :key="index"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :icon="icon"
        v-model="user[meta]"
      />
      <file-picker
        v-model="user.file"
        icon="image"
        placeholder="Selecione uma imagem"
        ref="inputFile"
      />
      <round-corner-button
        class="profile-view-edit__save-button"
        label="Salvar"
        @clicked="submitProfileForm(authenticatedUser)"
      />
    </form>
  </div>
</template>

<script>
import FilePicker from '@/components/shared/FilePicker'
import FormInput from '@/components/shared/FormInput'
import RemoveButton from '@/components/shared/RemoveButton'
import RoundCornerButton from '@/components/shared/RoundCornerButton'
import profileFormInputsMixin from '@/mixins/profileFormInputsMixin'
import { mapActions, mapGetters } from 'vuex'
import {
  getAuthenticatedUser,
  getUserPhotoURL,
  uploadBase64AsImage
} from '@/services/firebaseService'
import { updateUser } from '@/services/usersService'
import {
  getBase64FromExternalUrl,
  initializeToonify,
  toonifyImage
} from '@/services/toonifyService'

export default {
  name: 'ProfileViewEdit',

  components: { FilePicker, FormInput, RemoveButton, RoundCornerButton },

  mixins: [profileFormInputsMixin],

  data() {
    return {
      user: {}
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser'
    }),
    userHasPhoto() {
      return (
        this.authenticatedUser.displayImage !==
        `https://robohash.org/${this.authenticatedUser.uid}.png`
      )
    }
  },

  async mounted() {
    this.initializeProfileForm()
    initializeToonify()
  },

  methods: {
    ...mapActions({
      commitAuthenticatedUser: 'authenticatedUser/commitAuthenticatedUser'
    }),

    initializeProfileForm() {
      this.user = {
        displayName: this.authenticatedUser.displayName,
        email: this.authenticatedUser.email
      }
    },

    async toonifyUserImage() {
      const userImage = this.$refs.inputFile.$el.children[2]
      const response = await toonifyImage(userImage)
      const toonifiedBase64UserImage = await getBase64FromExternalUrl(
        response.output_url
      )
      return toonifiedBase64UserImage
    },

    async submitProfileForm(user) {
      //TODO: Remove conditionals and set up Vuelidate
      let userProfile = {}
      if (
        this.user.displayName &&
        this.user.displayName !== this.authenticatedUser.displayName
      ) {
        userProfile.displayName = this.user.displayName
      }
      if (this.user.file) {
        const toonifiedUserImage = await this.toonifyUserImage()
        await uploadBase64AsImage(toonifiedUserImage, user.uid)
        const photoURL = await getUserPhotoURL(user.uid)
        userProfile.photoURL = photoURL
        this.user.file = null
      }
      if (Object.keys(userProfile).length) {
        await user.updateProfile(userProfile)
      }
      if (this.user.email && this.user.email !== this.authenticatedUser.email) {
        await user.updateEmail(this.user.email)
      }
      if (
        this.user.password &&
        this.user.password === this.user.confirmPassword
      ) {
        await user.updatePassword(this.user.password)
      }
      const { displayName, email, photoURL, uid } = user
      await updateUser(uid, { displayName, email, photoURL })
      this.reloadData()
    },

    async reloadData() {
      let user = await getAuthenticatedUser()
      this.commitAuthenticatedUser(user)
    },

    async removePhoto(user) {
      const defaultPhotoURL = `https://robohash.org/${user.uid}.png`
      await user.updateProfile({ photoURL: defaultPhotoURL })
      await updateUser(user.uid, { photoURL: defaultPhotoURL })
      this.reloadData()
    }
  }
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
  background-position: center;
  background-size: cover;
  border-radius: 100vh;
  box-shadow: #24292e2a 0px 0px 2px 2px;
}

.profile-view-edit__form {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-view-edit__save-button {
  min-width: 300px;
  margin-top: 20px;
}

.profile-view-edit__remove-button {
  position: relative;
  top: 50px;
  left: 240px;
}
</style>
