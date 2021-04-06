<template>
  <div class="welcome-page">
    <div class="welcome">
      <h1>
        Bem-vindo!
      </h1>
      <h2>
        {{ welcomeText }}
      </h2>
      <form action="#">
        <file-picker
          v-model="file"
          icon="image"
          placeholder="Selecione uma imagem"
          ref="inputFile"
        />
        <div class="welcome-page__buttons">
          <publish-button
            class="welcome-page__submit-button"
            label="Enviar"
            @clicked="onSubmit"
          />
          <publish-button
            class="welcome-page__submit-button"
            label="Ir para home"
            @clicked="$router.replace({ name: 'HomePage' })"
          />
        </div>
      </form>
    </div>
    <div class="avatar">
      <img :src="imageURL" alt="" class="avatar-image" />
    </div>
  </div>
</template>

<script>
import PublishButton from '@/components/shared/PublishButton'
import FilePicker from '@/components/shared/FilePicker'
import {
  getBase64FromExternalUrl,
  initializeToonify,
  toonifyImage
} from '@/services/toonify'
import { getAuthenticatedUser, uploadBase64AsImage } from '@/services/firebase'

export default {
  name: 'WelcomePage',

  components: { FilePicker, PublishButton },

  data() {
    return {
      welcomeText: `
        Parabéns por escolher compartilhar, aprender e evoluir. Para
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
    async onSubmit() {
      const userImage = this.$refs.inputFile.$el.children[2]
      const response = await toonifyImage(userImage)
      const toonifiedUserImage = await getBase64FromExternalUrl(
        response.output_url
      )
      this.imageURL = response.output_url
      const userName = getAuthenticatedUser().displayName
      await uploadBase64AsImage(toonifiedUserImage, userName)
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

.avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  padding-top: 0;
}

.avatar-image {
  width: 340px;
  border-radius: 100vh;
}

.welcome {
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>
