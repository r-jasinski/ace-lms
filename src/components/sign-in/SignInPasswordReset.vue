<template>
  <form class="sign-in-with-link-form">
    <div class="sign-in-with-link-form__title">
      <span>ATUALIZE SUA SENHA</span>
    </div>
    <p class="sign-in-with-link-form__quote"></p>
    <div>
      <form-input
        class="sign-in-with-link-form__input"
        type="password"
        placeholder="Informe a senha"
        autocomplete="new-password"
        icon="key"
        v-model="user.password"
      />
      <form-input
        class="sign-in-with-link-form__input"
        type="password"
        placeholder="Confirme a senha"
        autocomplete="new-password"
        icon="key"
        v-model="user.passwordConfirm"
      />
      <round-corner-button
        class="sign-in-with-link-form__submit-button"
        label="Salvar"
        @clicked="submitUserPassword"
      />
    </div>
  </form>
</template>

<script>
import FormInput from '@/components/shared/FormInput'
import RoundCornerButton from '@/components/shared/RoundCornerButton'
import store from '@/store/index.js'
import { resetPassword } from '@/services/firebaseService'

export default {
  name: 'SignInPasswordReset',

  components: { FormInput, RoundCornerButton },

  data() {
    return {
      user: {}
    }
  },

  activated() {
    store.dispatch('documentTitle/setDocumentHeadTitle', 'Atualizar Senha')
  },

  methods: {
    async submitUserPassword() {
      const { password, passwordConfirm } = this.user
      if (password !== passwordConfirm) {
        //TODO: Remove alert and set info system
        alert('Senhas não conferem!')
        return
      }
      const oobCode = this.$route.query.oobCode
      await resetPassword(oobCode, password)
      this.$router.replace({ name: 'SignInPage' })
      this.$emit('submited')
    }
  }
}
</script>

<style scoped>
.sign-in-with-link-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  /* padding: 0 500px; */
  margin-top: 25px;
  grid-area: form;
  background-image: url('../../assets/clouds.svg');
  background-repeat: no-repeat;
}

.sign-in-with-link-form__title {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 900;
  font-size: 3.5em;
}

.sign-in-with-link-form span,
p {
  text-shadow: 0px 0px 20px var(--light);
}

.sign-in-with-link-form__quote {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sign-in-with-link-form__submit-button {
  width: 300px;
  margin: 25px 0;
}

.sign-in-with-link-form__input {
  margin-bottom: 5px;
}

.sign-in-with-link-form a {
  color: var(--primary);
  margin-bottom: 25px;
}

@media only screen and (max-width: 768px) {
  .sign-in-with-link-form {
    justify-content: start;
    padding: 0 20px;
  }
  .sign-in-with-link-form__title {
    font-size: 2.5em;
  }
}

@media only screen and (max-width: 340px) {
  .sign-in-with-link-form {
    padding: 5px;
  }
}
</style>
