<template>
  <form class="sign-in-with-link-form">
    <div class="sign-in-with-link-form__title">
      <span>FINALIZE SEU CADASTRO </span>
    </div>
    <p class="sign-in-with-link-form__quote"></p>
    <div>
      <form-input
        class="sign-in-with-link-form__input"
        :type="'email'"
        :placeholder="'E-mail'"
        :icon="'at'"
        v-model="user.email"
      />
      <form-input
        class="sign-in-with-link-form__input"
        :type="'password'"
        :placeholder="'Senha'"
        :icon="'key'"
        v-model="user.password"
      />
      <publish-button
        class="sign-in-with-link-form__submit-button"
        label="Salvar"
        @clicked="onSubmit"
      />
    </div>
  </form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import FormInput from '@/components/shared/FormInput'
import PublishButton from '@/components/shared/PublishButton'

export default {
  name: 'SignInWithLinkForm',

  components: { FormInput, PublishButton },

  data() {
    return {
      user: {}
    }
  },

  created() {
    document.title = 'ACE Finalizar Cadastro'
  },

  methods: {
    async onSubmit() {
      const { email, password } = this.user
      await firebase.auth().signInWithEmailLink(email, location.href)
      const user = firebase.auth().currentUser
      user.updatePassword(password)
      this.$router.replace({ name: 'HomePage' })
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

span,
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
