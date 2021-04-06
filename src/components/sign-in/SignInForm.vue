<template>
  <form class="sign-in-form">
    <div class="sign-in-form__title">
      <span>APRENDA </span>
      <span>COMPARTILHE</span>
      <span>EVOLUA</span>
    </div>
    <p class="sign-in-form__quote">
      "Viva como se fosse morrer amanhã. Aprenda como se fosse viver para
      sempre."
      <small><i>- Mahatma Gandhi</i></small>
    </p>
    <div>
      <form-input
        class="sign-in-form__input"
        :type="'email'"
        :placeholder="'E-mail'"
        :icon="'at'"
        v-model="user.email"
      />
      <form-input
        v-if="!forgotPasswordMode"
        class="sign-in-form__input"
        :type="'password'"
        :placeholder="'Senha'"
        :icon="'key'"
        v-model="user.password"
      />
      <publish-button
        class="sign-in-form__submit-button"
        :label="!forgotPasswordMode ? 'START' : 'RESTART'"
        @clicked="onSubmit"
      />
    </div>
    <a href="" @click.prevent="forgotPasswordModeToggle"
      ><small>{{
        !forgotPasswordMode ? 'Esqueci a senha' : 'Voltar para login'
      }}</small></a
    >
  </form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import FormInput from '@/components/shared/FormInput'
import PublishButton from '@/components/shared/PublishButton'
import store from '@/store/index.js'

export default {
  name: 'SignInForm',

  components: { FormInput, PublishButton },

  data() {
    return {
      forgotPasswordMode: false,
      user: {
        email: 'jan_kowalski@gmail.com',
        password: 'kurwamac'
      }
    }
  },

  computed: {},

  methods: {
    forgotPasswordModeToggle() {
      store.dispatch(
        'documentTitle/setDocumentHeadTitle',
        !this.forgotPasswordMode ? 'Recuperar Senha' : 'ACE LMS'
      )
      this.forgotPasswordMode = !this.forgotPasswordMode
    },
    async onSubmit() {
      let { email, password } = this.user
      if (!this.forgotPasswordMode) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        this.$router.replace({ name: 'HomePage' })
        return
      }
      firebase.auth().sendPasswordResetEmail(email)
      this.forgotPasswordMode = false
      store.dispatch('documentTitle/setDocumentHeadTitle', 'ACE LMS')
    }
  }
}
</script>

<style scoped>
.sign-in-form {
  width: 95%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  grid-area: form;
  background-image: url('../../assets/clouds.svg');
  background-repeat: no-repeat;
}

.sign-in-form__title {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 900;
  font-size: 3em;
}

span,
p {
  text-shadow: 0px 0px 20px var(--light);
}

.sign-in-form__quote {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sign-in-form__submit-button {
  width: 250px;
  margin: 25px 0;
}

.sign-in-form__input {
  margin-bottom: 5px;
}

.sign-in-form a {
  color: var(--primary);
  margin-bottom: 25px;
}

@media only screen and (max-width: 768px) {
  .sign-in-form {
    justify-content: center;
    padding: 0 30px;
  }
  .sign-in-form__title {
    font-size: 2.5em;
  }
}

@media only screen and (max-width: 340px) {
  .sign-in-form {
    padding: 5px;
  }
}
</style>
