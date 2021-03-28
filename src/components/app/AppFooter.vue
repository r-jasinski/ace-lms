<template>
  <div class="app-footer">
    <div class="app-footer__wrapper">
      <div>
        <logo class="app-footer__logo" />
        ACE LMS
      </div>
      © {{ new Date().getFullYear() }} Roberto Jasinski
      <small>
        <a href="https://github.com/r-jasinski" target="__blank">
          <font-awesome-icon :icon="['fab', 'github']" size="2x" />
        </a>
        <a href="https:www.linkedin.com/in/roberto-jasinski" target="__blank">
          <font-awesome-icon :icon="['fab', 'linkedin']" size="2x" />
        </a>
      </small>
    </div>
  </div>
</template>

<script>
import Logo from '../../assets/logo.svg?inline'

export default {
  name: 'AppFooter',

  components: { Logo }
}
</script>

<style scoped>
.app-footer {
  height: 15vh;
  background-image: url('../../assets/bg-footer.svg');
  background-position: center top;
  background-size: cover;
}

.app-footer__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  opacity: 0.6;
  font-size: 0.8em;
}

.app-footer__logo {
  width: 13px;
  height: 13px;
  fill: var(--dark);
}

a {
  color: var(--dark);
}

.app-footer small {
  display: flex;
  gap: 5px;
}
</style>
