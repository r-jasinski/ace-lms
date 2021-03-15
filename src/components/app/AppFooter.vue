<template>
  <div class="app-footer">
    <div class="app-footer__logo">
      <span />
      ACE - LMS
    </div>
    <small
      >© {{ new Date().getFullYear() }} Copyright:
      <a href="https://github.com/r-jasinski" target="__blank"
        >Roberto Jasinski</a
      ></small
    >
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15vh;
  background-image: url('../../assets/bg-footer.svg');
  background-position: center top;
  background-size: cover;
  opacity: 0.8;
}

.app-footer span {
  width: 15px;
  height: 15px;
  mask-image: url('../../assets/logo.svg');
  background-color: var(--dark);
}

.app-footer small {
  margin-bottom: 10%;
}

.app-footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
