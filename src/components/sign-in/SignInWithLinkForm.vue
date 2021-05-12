<template>
  <form class="sign-in-with-link-form" @submit.prevent>
    <div class="sign-in-with-link-form__title">
      <span>FINALIZE SEU CADASTRO </span>
    </div>
    <p class="sign-in-with-link-form__quote"></p>
    <div>
      <form-input
        class="sign-in-with-link-form__input"
        type="email"
        placeholder="Informe seu email"
        autocomplete="email"
        icon="at"
        v-model="user.email"
      />
      <form-input
        class="sign-in-with-link-form__input"
        placeholder="Informe o seu usuário"
        autocomplete="name"
        icon="user"
        v-model="user.displayName"
      />
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
      <confirm-button
        class="sign-in-with-link-form__submit-button"
        label="Salvar"
        @clicked="submitUserProfile"
      />
    </div>
  </form>
</template>

<script>
import FormInput from '@/components/shared/FormInput'
import ConfirmButton from '@/components/shared/ConfirmButton'
import {
  confirmAccount,
  getAuthenticatedUser,
  updateUser
} from '@/services/firebaseService'
import { createUser } from '@/services/usersService'
import { mapActions } from 'vuex'

export default {
  name: 'SignInWithLinkForm',

  components: { FormInput, ConfirmButton },

  data() {
    return {
      user: {}
    }
  },

  activated() {
    this.commitDocumentTitle('Finalizar Cadastro')
  },

  methods: {
    ...mapActions({
      commitDocumentTitle: 'documentTitle/commitDocumentTitle'
    }),

    async submitUserProfile() {
      let { email, displayName, password, passwordConfirm } = this.user
      if (password !== passwordConfirm) {
        //TODO: Remove alert and set up info system
        alert('Senhas não conferem!')
        return
      }
      const confirmAccountError = await confirmAccount(
        email,
        displayName,
        password
      )
      if (!confirmAccountError) {
        const user = getAuthenticatedUser()
        const { metadata, uid } = user
        const photoURL = user.photoURL || `https://robohash.org/${uid}.png`
        const updateUserError = await updateUser(user, { photoURL: photoURL })
        const createUserError = await createUser(uid, {
          creationTime: metadata.creationTime,
          deletedAt: null,
          displayName,
          email,
          isAdmin: false,
          photoURL,
          rankingPoints: 0
        })
        if (!confirmAccountError && !updateUserError && !createUserError) {
          this.$router.replace({ name: 'WelcomePage' })
        }
      }
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
