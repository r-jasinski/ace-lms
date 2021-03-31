<template>
  <div class="sign-in-header">
    <img
      class="sign-in-header__image"
      src="../../assets/people-on-world.svg"
      alt="pessoas sentadas no mundo"
    />
  </div>
</template>

<script>
export default {
  name: 'SignInHeader'
}
</script>

<style scoped>
.sign-in-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  grid-area: image;
  background-image: url('../../assets/bg-login.svg');
  background-position: right top;
  background-size: cover;
}

.sign-in-header__image {
  max-height: 100vh;
  position: relative;
  top: 0;
}

@media only screen and (max-width: 768px) {
  .sign-in-header {
    align-items: flex-start;
    background-image: url('../../assets/bg-login-form.svg');
    background-position: right bottom;
    background-size: cover;
  }
}
</style>
