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
  name: 'HomeMenu'
}
</script>

<style scoped>
.home-menu {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 32px;
}

.home-menu__item {
  display: flex;
  justify-content: center;
}

.home-menu__link {
  position: relative;
  height: 400px;
  width: 200px;
  justify-content: center;
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
  left: 30px;
}

.home-menu__woman-with-laptop {
  width: 180px;
  left: 10px;
}

.home-menu__man-with-laptop {
  width: 250px;
  left: -15px;
}

.home-menu__title {
  display: flex;
  position: absolute;
  bottom: 0%;
  width: 100%;
  justify-content: center;
  font-size: 2em;
  font-weight: 900;
  text-decoration: none;
}

@media only screen and (max-width: 768px) {
  .home-menu {
    display: block;
  }
}
</style>
