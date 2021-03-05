<template>
  <div class="footer">
    <small>© {{ new Date().getFullYear() }} Copyright: Roberto Jasinski</small>
    <small>roberto.jasinski@gmail.com</small>
  </div>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style scoped>
.footer {
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

small {
  align-self: center;
}
</style>
