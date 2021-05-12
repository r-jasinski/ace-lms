<template>
  <form class="sign-in-form" @submit.prevent>
    <div class="sign-in-form__title">
      <span>APRENDA </span>
      <span>COMPARTILHE</span>
      <span>EVOLUA</span>
    </div>
    <p class="sign-in-form__quote">
      {{ quote.message }}
      <small
        ><i>{{ quote.author }}</i></small
      >
    </p>
    <div>
      <form-input
        class="sign-in-form__input"
        type="email"
        placeholder="E-mail"
        autocomplete="email"
        icon="at"
        v-model="user.email"
      />
      <form-input
        v-show="!forgotPasswordMode"
        class="sign-in-form__input"
        type="password"
        placeholder="Senha"
        autocomplete="current-password"
        icon="key"
        v-model="user.password"
      />
      <confirm-button
        class="sign-in-form__submit-button"
        :label="submitButtonLabel"
        @clicked="onSubmit"
      />
    </div>
    <a href="" @click.prevent="forgotPasswordModeToggle"
      ><small>{{ toggleLinkLabel }}</small></a
    >
  </form>
</template>

<script>
import FormInput from '@/components/shared/FormInput'
import ConfirmButton from '@/components/shared/ConfirmButton'
import { getQuote } from '@/services/quotesService'
import { mapActions } from 'vuex'
import { sendPasswordResetEmail, signIn } from '@/services/firebaseService'

export default {
  name: 'SignInForm',

  components: { FormInput, ConfirmButton },

  data() {
    return {
      forgotPasswordMode: false,
      user: {
        email: '',
        password: ''
      }
    }
  },

  computed: {
    submitButtonLabel() {
      return !this.forgotPasswordMode ? 'START' : 'RESTART'
    },
    toggleLinkLabel() {
      return !this.forgotPasswordMode ? 'Esqueci a senha' : 'Voltar para login'
    },
    quote() {
      return getQuote()
    }
  },

  methods: {
    ...mapActions({
      commitDocumentTitle: 'documentTitle/commitDocumentTitle'
    }),

    forgotPasswordModeToggle() {
      this.commitDocumentTitle(
        !this.forgotPasswordMode ? 'Recuperar Senha' : 'ACE LMS'
      )
      this.forgotPasswordMode = !this.forgotPasswordMode
    },

    async onSubmit() {
      const { email, password } = this.user
      if (!this.forgotPasswordMode) {
        const response = await signIn(email, password)
        const to = this.$route.query.to || '/'
        !response && this.$router.replace(to === '/welcome' ? '/' : to)
        return
      }
      const response = await sendPasswordResetEmail(email)
      if (!response) {
        this.forgotPasswordMode = false
        this.commitDocumentTitle('ACE LMS')
      }
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
  background: url('../../assets/clouds.svg') no-repeat;
}

.sign-in-form__title {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 900;
  font-size: 3em;
}

.sign-in-form span,
p {
  text-shadow: 0px 0px 20px var(--light);
}

.sign-in-form__quote {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sign-in-form__submit-button {
  width: 100%;
  min-width: 300px;
  margin: 25px 0;
}

.sign-in-form__input {
  min-width: 300px;
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
