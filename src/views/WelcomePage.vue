<template>
  <div>
    <div class="welcome-page__overlay" v-if="loading">
      <dot-loader :loading="loading" :color="'#81bfe2'" :size="'80px'" />
    </div>
    <div :class="['welcome-page', { 'welcome-page--blur': loading }]">
      <h1 v-if="!imageURL">
        Bem-vindo!
      </h1>
      <h2 v-html="welcomeText" />
      <p v-if="!imageURL">
        <small
          >*Caso não deseje fazer isso agora, você ganhará um avatar surpresa e
          poderá alterá-lo por sua foto a qualquer momento em "Perfil"
        </small>
      </p>
      <form @submit.prevent>
        <file-picker
          v-model="file"
          icon="image"
          placeholder="Selecione uma imagem"
          :v="$v.file"
          name="file"
          @input="$v.file.$touch()"
          @picked="HTMLInputElement = $event"
        />
        <div class="welcome-page__buttons">
          <confirm-button
            class="welcome-page__submit-button"
            label="Enviar"
            :disabled="disabled"
            @clicked="submitUserImage"
          />
          <confirm-button
            class="welcome-page__submit-button"
            label="Ir para home"
            @clicked="goToHome()"
          />
        </div>
      </form>
      <img :src="imageURL" alt="" class="welcome-page__avatar" />
      <p>
        <small>
          Para obter os melhores resultados:
          <ul>
            <li>
              Use uma imagem clara e nítida onde seu rosto é o foco principal
            </li>
            <li>
              Certifique-se de estar de frente para a câmera
            </li>
            <li>
              Evite múltiplas faces (só processaremos a primeira que
              encontrarmos)
            </li>
            <li>
              Evite coisas que obscurecem seu rosto
            </li>
            <li>
              Experimente diferentes fotos, pois todas têm um resultado
              diferente
            </li>
          </ul>
        </small>
      </p>
    </div>
  </div>
</template>

<script>
import ConfirmButton from '@/components/shared/ConfirmButton'
import DotLoader from '@/components/shared/DotLoader'
import FilePicker from '@/components/shared/FilePicker'
import { mapActions } from 'vuex'
import {
  getBase64FromExternalUrl,
  initializeToonify,
  toonifyImage
} from '@/services/toonifyService'
import {
  getAuthenticatedUser,
  getUserPhotoURL,
  uploadBase64AsImage
} from '@/services/firebaseService'
import { updateUser } from '@/services/usersService'
import { isLessThan2MB, isTrueImage } from '@/services/validatorsService'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'WelcomePage',

  components: { FilePicker, ConfirmButton, DotLoader },

  data() {
    return {
      HTMLInputElement: null,
      file: null,
      imageURL: '',
      loading: false,
      welcomeText: `
        Parabéns por escolher <span style='text-transform: uppercase'>aprender, compartilhar e evoluir</span>. Para
        finalizar, envie uma foto sua no estilo 3x4. Você vai gostar do resultado!
      `
    }
  },

  validations: {
    file: { required, isLessThan2MB, isTrueImage }
  },

  computed: {
    disabled() {
      return this.$v.$anyError || !this.$v.$anyDirty
    }
  },

  async mounted() {
    initializeToonify()
  },

  methods: {
    ...mapActions({
      commitAuthenticatedUser: 'authenticatedUser/commitAuthenticatedUser'
    }),

    async submitUserImage() {
      this.loading = true
      const userImage = this.HTMLInputElement
      const response = await toonifyImage(userImage)
      this.loading = false
      if (!(response instanceof Error)) {
        const toonifiedUserImage = await getBase64FromExternalUrl(
          response.output_url
        )
        this.imageURL = response.output_url
        this.welcomeText = `
        Você está pronto! Este será seu avatar e também seu menu principal. Se não
        gostou do resultado, basta enviar outra foto!
      `
        this.file = null
        this.$v.$reset()
        let user = getAuthenticatedUser()
        await uploadBase64AsImage(toonifiedUserImage, user.uid)
        this.userPhotoURL = await getUserPhotoURL(user.uid)
        await user.updateProfile({ photoURL: this.userPhotoURL })
        await updateUser(user.uid, { photoURL: this.userPhotoURL })
      }
    },

    async goToHome() {
      const user = await getAuthenticatedUser()
      this.commitAuthenticatedUser(user)
      this.$router.replace({ name: 'HomePage' })
    }
  }
}
</script>

<style scoped>
.welcome-page {
  align-items: center;
  background: url('../assets/clouds.svg') no-repeat;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
  padding: 0 30%;
  width: 100%;
}

.welcome-page--blur {
  -moz-filter: blur(1px);
  -ms-filter: blur(1px);
  -o-filter: blur(1px);
  -webkit-filter: blur(1px);
  filter: blur(1px);
}

.welcome-page__overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.644);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.welcome-page__buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  margin-top: 25px;
}

.welcome-page h1 {
  font-size: 3.5em;
  font-weight: 900;
  text-shadow: 0px 0px 20px var(--light);
}

.welcome-page__avatar {
  border-radius: 100vh;
  width: 340px;
}

.welcome-page h2 {
  text-shadow: 0px 0px 20px var(--light);
}

.welcome-page form {
  width: 100%;
}

.welcome-page p {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .welcome-page {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 368px) {
  .welcome-page {
    padding: 0 5%;
  }
}
</style>
