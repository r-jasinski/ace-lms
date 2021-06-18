<template>
  <form class="sign-in-with-link-form" @submit.prevent>
    <div class="sign-in-with-link-form__title">
      <span>FINALIZE SEU CADASTRO </span>
    </div>
    <p class="sign-in-with-link-form__quote"></p>
    <div>
      <form-input
        class="sign-in-with-link-form__input"
        v-for="({
          autocomplete,
          autofocus,
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
        :autofocus="autofocus"
        v-model="user[meta]"
      />
      <confirm-button
        class="sign-in-with-link-form__submit-button"
        label="Salvar"
        :disabled="disabled"
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
import { noSpaces } from '@/services/validatorsService'
import profileFormInputsMixin from '@/mixins/profileFormInputsMixin'
import { mapActions } from 'vuex'
import {
  email,
  maxLength,
  minLength,
  required,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  name: 'SignInWithLinkForm',

  components: { FormInput, ConfirmButton },

  mixins: [profileFormInputsMixin],

  data() {
    return {
      user: {}
    }
  },

  validations: {
    user: {
      displayName: {
        maxLength: maxLength(16),
        minLength: minLength(4),
        required,
        noSpaces
      },
      email: { required, email },
      password: { maxLength: maxLength(24), minLength: minLength(6), required },
      passwordConfirm: {
        maxLength: maxLength(24),
        minLength: minLength(6),
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },

  computed: {
    disabled() {
      const hasError = this.$v.user.$pending || this.$v.user.$error
      const isEmpty =
        !this.user.email ||
        !this.user.displayName ||
        !this.user.password ||
        !this.user.passwordConfirm
      return hasError || isEmpty
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
      if (this.disabled) {
        return
      }
      let { email, displayName, password, passwordConfirm } = this.user
      displayName = displayName.toLowerCase()
      if (password !== passwordConfirm) {
        return
      }
      const confirmAccountError = await confirmAccount(
        email,
        displayName,
        password
      )
      if (!confirmAccountError) {
        const user = getAuthenticatedUser()
        const { uid } = user
        const photoURL = user.photoURL || `https://robohash.org/${uid}.png`
        const updateUserError = await updateUser(user, { photoURL: photoURL })
        const createUserError = await createUser(uid, {
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
