<template>
  <div class="welcome-page">
    <div>
      <h1>
        Bem-vindo!
      </h1>
      <h2 v-html="welcomeText" />
      <p>
        <small
          >*Caso não deseje fazer isso agora, você ganhará um avatar surpresa e
          poderá alterá-lo por sua foto a qualquer momento em "Perfil"</small
        >
      </p>
      <form action="#">
        <file-picker
          v-model="file"
          icon="image"
          placeholder="Selecione uma imagem"
          ref="inputFile"
        />
        <div class="welcome-page__buttons">
          <round-corner-button
            class="welcome-page__submit-button"
            label="Enviar"
            @clicked="submitUserImage"
          />
          <round-corner-button
            class="welcome-page__submit-button"
            label="Ir para home"
            @clicked="$router.replace({ name: 'HomePage' })"
          />
        </div>
      </form>
    </div>
    <img :src="imageURL" alt="" class="welcome-page__avatar" />
  </div>
</template>

<script>
import RoundCornerButton from '@/components/shared/RoundCornerButton'
import FilePicker from '@/components/shared/FilePicker'
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

export default {
  name: 'WelcomePage',

  components: { FilePicker, RoundCornerButton },

  data() {
    return {
      welcomeText: `
        Parabéns por escolher <span style='text-transform: uppercase'>aprender, compartilhar e evoluir</span>. Para
        finalizar, envie uma foto sua no estilo 3x4. Você vai gostar do resultado!
      `,
      imageURL: '',
      file: null
    }
  },

  async mounted() {
    initializeToonify()
  },

  methods: {
    async submitUserImage() {
      const userImage = this.$refs.inputFile.$el.children[2]
      const response = await toonifyImage(userImage)
      const toonifiedUserImage = await getBase64FromExternalUrl(
        response.output_url
      )
      this.imageURL = response.output_url
      const user = getAuthenticatedUser()
      await uploadBase64AsImage(toonifiedUserImage, user.uid)
      this.userPhotoURL = await getUserPhotoURL(user.uid)
      await user.updateProfile({ photoURL: this.userPhotoURL })
      this.welcomeText = `
        Você está pronto! Este será seu avatar e também seu menu principal. Se não
        gostou do resultado, basta enviar outra foto!
      `
    }
  }
}
</script>

<style scoped>
.welcome-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 30%;
  background-image: url('../assets/clouds.svg');
  background-repeat: no-repeat;
}

.welcome-page__buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 25px;
  gap: 10px;
}

.welcome-page h1 {
  font-weight: 900;
  font-size: 3.5em;
  text-shadow: 0px 0px 20px var(--light);
}

.welcome-page h2 {
  text-shadow: 0px 0px 20px var(--light);
}

.welcome-page__avatar {
  width: 340px;
  border-radius: 100vh;
  margin-top: 25px;
}
</style>
