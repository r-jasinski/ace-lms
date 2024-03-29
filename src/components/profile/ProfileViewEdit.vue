<template>
  <div class="profile-view-edit">
    <dot-loader :loading="loading" />
    <div class="profile-view-edit__avatar">
      <image-picker
        v-model="file"
        :v="$v.file"
        :displayImage="displayImage"
        name="file"
        @input="$v.file.$touch()"
        @picked="HTMLInputElement = $event"
      />
      <remove-button
        v-if="userHasPhoto"
        @clicked="openPhotoDeleteConfirm()"
        class="profile-view-edit__remove-button"
        tooltipContent="imagem"
      />
    </div>
    <div class="profile-view-edit__file-label">
      <small v-if="file">{{ file.name }}</small>
    </div>
    <form class="profile-view-edit__form" @submit.prevent>
      <form-input
        v-for="({
          autocomplete,
          disabled,
          icon,
          id,
          meta,
          name,
          placeholder,
          type,
          validator
        },
        index) in inputs"
        :key="index"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :icon="icon"
        :id="id"
        :v="$v.user[validator]"
        :name="name"
        :disabled="disabled"
        v-model="user[meta]"
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
import ImagePicker from '@/components/shared/ImagePicker'
import FormInput from '@/components/shared/FormInput'
import RemoveButton from '@/components/shared/RemoveButton'
import ConfirmButton from '@/components/shared/ConfirmButton'
import DotLoader from '@/components/shared/DotLoader'
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

  components: {
    ImagePicker,
    ConfirmButton,
    DotLoader,
    FormInput,
    RemoveButton
  },

  mixins: [profileFormInputsMixin],

  data() {
    return {
      file: null,
      HTMLInputElement: null,
      loading: false,
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

    async openPhotoDeleteConfirm() {
      const message = `Tem certeza que deseja remover sua bela imagem do perfil?`
      try {
        await this.$dialog.confirm(message)
        this.removePhoto()
      } catch {
        return
      }
    },

    async reloadData() {
      let user = await getAuthenticatedUser()
      this.commitAuthenticatedUser(user)
    },

    async removePhoto() {
      const user = this.authenticatedUser
      const defaultPhotoURL = `https://robohash.org/${user.uid}.png`
      await user.updateProfile({ photoURL: defaultPhotoURL })
      await updateUser(user.uid, { photoURL: defaultPhotoURL })
      this.file = null
      this.$v.$reset()
      this.reloadData()
    },

    async submitProfileForm(user) {
      const updatesArray = []
      const displayNameIsReady =
        this.$v.user.displayName.$dirty && !this.$v.user.displayName.$error
      const fileIsReady = this.$v.file.$dirty && !this.$v.file.$error
      const emailIsReady =
        this.$v.user.email.$dirty && !this.$v.user.email.$error
      const passwordIsReady =
        this.$v.user.password.$dirty && !this.$v.user.password.$error
      if (displayNameIsReady) {
        const responseError = await user.updateProfile({
          displayName: this.user.displayName.toLowerCase()
        })
        this.$v.$reset()
        if (!responseError) {
          updatesArray.push('Usuário')
        }
      }
      if (fileIsReady) {
        this.loading = true
        const userImage = this.HTMLInputElement
        const response = await toonifyImage(userImage)
        this.loading = false
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
          updatesArray.push('Avatar')
        }
      }
      if (emailIsReady && !emailIsReady) {
        const responseError = await updateUserEmail(user, this.user.email)
        this.$v.$reset()
        if (!responseError) {
          updatesArray.push('Email')
        }
      }
      if (passwordIsReady && !passwordIsReady) {
        const responseError = await updateUserPassword(user, this.user.password)
        this.$v.$reset()
        if (!responseError) {
          updatesArray.push('Senha')
        }
      }
      const { displayName, email, photoURL, uid } = user
      await updateUser(uid, { displayName, email, photoURL })
      if (updatesArray.length) {
        const numberAgreement = updatesArray.length === 1 ? '' : 's'
        const message = `${updatesArray} atualizado${numberAgreement} com sucesso!`
        this.$toast(message, { type: 'info' })
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
    }
  }
}
</script>

<style scoped>
.profile-view-edit {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 6%;
}

.profile-view-edit__avatar {
  display: block;
  background-position: center;
  background-size: cover;
  border-radius: 100vh;
  box-shadow: #24292e2a 0px 0px 2px 2px;
  height: 275px;
  margin-bottom: 25px;
  width: 275px;
  z-index: 999;
}

.profile-view-edit__form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* margin-top: 25px; */
  max-width: 300px;
}

.profile-view-edit__save-button {
  margin-top: 20px;
  min-width: 300px;
}

.profile-view-edit__remove-button {
  left: 230px;
  position: relative;
  bottom: 230px;
}

.profile-view-edit__file-label {
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 275px !important;
}
</style>
