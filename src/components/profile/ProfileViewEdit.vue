<template>
  <div class="profile-view-edit">
    <div
      class="profile-view-edit__avatar"
      :style="{ backgroundImage: `url(${displayImage})` }"
    >
      <remove-button
        v-if="userHasPhoto"
        @clicked="removePhoto(authenticatedUser)"
        class="profile-view-edit__remove-button"
      />
    </div>
    <form class="profile-view-edit__form" @submit.prevent>
      <form-input
        v-for="({
          type,
          placeholder,
          autocomplete,
          icon,
          meta,
          validator,
          name
        },
        index) in inputs"
        :key="index"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :icon="icon"
        :v="$v.user[validator]"
        :name="name"
        v-model="user[meta]"
      />
      <file-picker
        v-model="file"
        icon="image"
        placeholder="Selecione uma imagem"
        :v="$v.file"
        name="file"
        @input="$v.file.$touch()"
        @picked="HTMLInputElement = $event"
      />
      <confirm-button
        class="profile-view-edit__save-button"
        label="Salvar"
        @clicked="submitProfileForm(authenticatedUser)"
        :disabled="disabled"
      />
    </form>
  </div>
</template>

<script>
import FilePicker from '@/components/shared/FilePicker'
import FormInput from '@/components/shared/FormInput'
import RemoveButton from '@/components/shared/RemoveButton'
import ConfirmButton from '@/components/shared/ConfirmButton'
import profileFormInputsMixin from '@/mixins/profileFormInputsMixin'
import { mapActions, mapGetters } from 'vuex'
import {
  getAuthenticatedUser,
  getUserPhotoURL,
  uploadBase64AsImage
} from '@/services/firebaseService'
import {
  updateUser,
  updateUserEmail,
  updateUserPassword
} from '@/services/usersService'
import {
  getBase64FromExternalUrl,
  initializeToonify,
  toonifyImage
} from '@/services/toonifyService'
import {
  email,
  maxLength,
  minLength,
  required,
  sameAs
} from 'vuelidate/lib/validators'
import {
  isLessThan2MB,
  isTrueImage,
  noSpaces
} from '@/services/validatorsService'

export default {
  name: 'ProfileViewEdit',

  components: { FilePicker, FormInput, RemoveButton, ConfirmButton },

  mixins: [profileFormInputsMixin],

  data() {
    return {
      file: null,
      HTMLInputElement: null,
      user: {}
    }
  },

  validations: {
    file: { required, isLessThan2MB, isTrueImage },
    user: {
      displayName: {
        maxLength: maxLength(24),
        minLength: minLength(6),
        required,
        noSpaces
      },
      email: { required, email },
      password: { maxLength: maxLength(24), minLength: minLength(6) },
      passwordConfirm: {
        maxLength: maxLength(24),
        minLength: minLength(6),
        sameAsPassword: sameAs('password')
      }
    }
  },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      displayImage: 'authenticatedUser/displayImage'
    }),
    disabled() {
      return this.$v.$anyError || !this.$v.$anyDirty
    },
    userHasPhoto() {
      return (
        this.displayImage !==
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
      const userImage = this.HTMLInputElement
      const response = await toonifyImage(userImage)
      if (!(response instanceof Error)) {
        const toonifiedBase64UserImage = await getBase64FromExternalUrl(
          response.output_url
        )
        return toonifiedBase64UserImage
      }
    },

    async submitProfileForm(user) {
      const displayNameIsReady =
        this.$v.user.displayName.$dirty && !this.$v.user.displayName.$error
      const fileIsReady = this.$v.file.$dirty && !this.$v.file.$error
      const emailIsReady =
        this.$v.user.email.$dirty && !this.$v.user.email.$error
      const passwordIsReady =
        this.$v.user.password.$dirty && !this.$v.user.password.$error
      if (displayNameIsReady) {
        await user.updateProfile({ displayName: this.user.displayName })
        this.$v.$reset()
      }
      if (fileIsReady) {
        const userImage = this.HTMLInputElement
        const response = await toonifyImage(userImage)
        if (!(response instanceof Error)) {
          const toonifiedUserImage = await getBase64FromExternalUrl(
            response.output_url
          )
          this.file = null
          this.$v.$reset()
          await uploadBase64AsImage(toonifiedUserImage, user.uid)
          const photoURL = await getUserPhotoURL(user.uid)
          await user.updateProfile({ photoURL: photoURL })
          this.reloadData()
        }
      }
      if (emailIsReady) {
        await updateUserEmail(user, this.user.email)
        this.$v.$reset()
      }
      if (passwordIsReady) {
        await updateUserPassword(user, this.user.password)
        this.$v.$reset()
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
