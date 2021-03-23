<template>
  <div class="login">
    <div class="login__image">
      <img
        class="login__fg"
        src="../../assets/people-on-world.svg"
        alt="pessoas sentadas no mundo"
      />
    </div>
    <form class="login__form">
      <div class="login__title">
        <span>APRENDA </span>
        <span>COMPARTILHE</span>
        <span>EVOLUA</span>
      </div>
      <p class="login__quote">
        "Viva como se fosse morrer amanhã. Aprenda como se fosse viver para
        sempre."
        <small><i>- Mahatma Gandhi</i></small>
      </p>
      <div>
        <form-input
          class="login__input"
          :type="'email'"
          :placeholder="'E-mail'"
          :icon="'at'"
          :value="'jan_kowalski@email.com'"
        />
        <form-input
          v-if="!forgetPasswordMode"
          class="login__input"
          :type="'password'"
          :placeholder="'Senha'"
          :icon="'key'"
          :value="'kurwa'"
        />
        <publish-button
          class="login__submit-button"
          :label="buttonLabel"
          @clicked="onSubmit"
        />
      </div>
      <a
        v-if="!forgetPasswordMode"
        href=""
        @click.prevent="swithToForgetPasswordMode"
        ><small>Esqueci a senha</small></a
      >
    </form>
  </div>
</template>

<script>
import PublishButton from '@/components/shared/PublishButton'
import FormInput from '@/components/shared/FormInput'

export default {
  name: 'Login',

  components: { PublishButton, FormInput },

  data() {
    return {
      forgetPasswordMode: false,
      buttonLabel: 'START'
    }
  },

  methods: {
    swithToForgetPasswordMode() {
      this.forgetPasswordMode = true
      this.buttonLabel = 'RESTART'
    },
    onSubmit() {
      if (!this.forgetPasswordMode) {
        this.$router.push({ name: 'HomePage' })
      }
      this.forgetPasswordMode = false
      this.buttonLabel = 'START'
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'image form';
  --dark: #2c3e50;
  --light: #ffffff;
  --dark-50: #2c3e5050;
  --light-50: #ffffff50;
  --dark-75: #2c3e5075;
  --light-75: #ffffffad;
  color: var(--dark);
  background-color: var(--light);
}

.login__image {
  max-width: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  grid-area: image;
  background-image: url('../../assets/bg-login.svg');
  background-position: right top;
  background-size: cover;
}

.login__form {
  min-height: ;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  grid-area: form;
  background-image: url('../../assets/clouds.svg');
  background-repeat: no-repeat;
  opacity: 0.8;
  padding: 0 20px;
}

.login__fg {
  max-height: 100vh;
  min-width: 320px;
  position: relative;
  top: 0;
}

.login__title {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 900;
  font-size: 3.5em;
}

.login__quote {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.login__form {
  margin-top: 25px;
}

.login__submit-button {
  width: 300px;
  margin: 25px 0;
}

.login__input {
  margin-bottom: 5px;
}

.login a {
  color: var(--primary);
  margin-bottom: 25px;
}

@media (prefers-color-scheme: dark) {
  .login {
    --light: #2c3e50;
    --dark: #ffffff;
    --light-50: #2c3e5050;
    --dark-50: #ffffff50;
    --light-75: #2c3e5075;
    --dark-75: #ffffffad;
  }
}

@media only screen and (max-width: 768px) {
  .login {
    grid-template-areas:
      'image image'
      'form form';
  }
  .login__image {
    align-items: flex-start;
    background-image: url('../../assets/bg-login-form.svg');
  }
  .login__form {
    justify-content: start;
    padding: 0 10px;
  }
  .login__title {
    font-size: 2.5em;
  }
}

@media only screen and (max-width: 340px) {
  .login__form {
    padding: 5px;
  }
}
</style>
