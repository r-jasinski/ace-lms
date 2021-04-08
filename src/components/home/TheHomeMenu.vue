<template>
  <div class="home-menu">
    <router-link class="home-menu__item" to="/questions">
      <div class="home-menu__link">
        <img class="home-menu__bg" src="../../assets/world.svg" alt="mundo" />
        <img
          class="home-menu__fg home-menu__man-in-chair"
          src="../../assets/man-in-chair.svg"
          alt="homem na cadeira"
        />
        <span class="home-menu__title">Aprenda</span>
      </div>
    </router-link>

    <router-link class="home-menu__item" to="/articles">
      <div class="home-menu__link">
        <img class="home-menu__bg" src="../../assets/world.svg" alt="mundo" />
        <img
          class="home-menu__fg home-menu__woman-with-laptop"
          src="../../assets/woman-with-laptop.svg"
          alt="mulher com laptop"
        />
        <span class="home-menu__title">Compartilhe</span>
      </div>
    </router-link>

    <router-link class="home-menu__item" to="/ranking">
      <div class="home-menu__link">
        <img class="home-menu__bg" src="../../assets/world.svg" alt="mundo" />
        <img
          class="home-menu__fg home-menu__man-with-laptop"
          src="../../assets/man-with-laptop.svg"
          alt="homem com laptop"
        />
        <span class="home-menu__title">Evolua</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TheHomeMenu'
}
</script>

<style scoped>
.home-menu {
  display: flex;
  justify-content: center;
  gap: 5%;
}

.home-menu__item {
  display: flex;
  justify-content: center;
}

.home-menu__link {
  position: relative;
  height: 400px;
  width: 200px;
}

.home-menu__bg {
  position: relative;
  top: 150px;
}

.home-menu__fg {
  position: relative;
  top: -200px;
}

.home-menu__man-in-chair {
  width: 200px;
  left: 30px;
}

.home-menu__woman-with-laptop {
  width: 180px;
  left: 10px;
}

.home-menu__man-with-laptop {
  width: 250px;
  left: -25px;
}

.home-menu__title {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 2em;
  font-weight: 900;
  text-decoration: none;
  background: -webkit-linear-gradient(
    to right,
    var(--dark) 0%,
    var(--primary-plus) 100%
  );
  background: -moz-linear-gradient(
    to right,
    var(--dark) 0%,
    var(--primary-plus) 100%
  );
  background: linear-gradient(
    to right,
    var(--dark) 0%,
    var(--primary-plus) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media only screen and (max-width: 800px) {
  .home-menu {
    flex-direction: column;
  }
}
</style>
