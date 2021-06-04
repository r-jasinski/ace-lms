<template>
  <div>
    <div class="home-menu">
      <router-link class="home-menu__item" to="/questions">
        <div
          class="home-menu__link"
          @mouseover="handleHoverIn('questions')"
          @mouseleave="handleHoverOff()"
        >
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
        <div
          class="home-menu__link"
          @mouseover="handleHoverIn('articles')"
          @mouseleave="handleHoverOff()"
        >
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
        <div
          class="home-menu__link"
          @mouseover="handleHoverIn('ranking')"
          @mouseleave="handleHoverOff()"
        >
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
    <div class="home-menu__link-label">
      <transition name="slide">
        <p v-if="linkTitle" v-html="linkTitle"></p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHomeMenu',

  data() {
    return {
      isHover: false,
      linkTitle: '',
      linkTitles: {
        ranking: '<b>Evolua</b> e chegue ao topo!',
        questions: 'Tire suas dúvidas e <b>aprenda</b>!',
        articles: 'Já sabe, então <b>compartilhe</b>!'
      }
    }
  },

  methods: {
    handleHoverIn(subject) {
      this.linkTitle = this.linkTitles[subject]
    },

    handleHoverOff() {
      this.linkTitle = ''
    }
  }
}
</script>

<style scoped>
.home-menu {
  display: flex;
  gap: 5%;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  padding-top: 20px;
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
  transform: scale(1);
  transition: all 0.2s;
}

.home-menu__woman-with-laptop {
  width: 180px;
  left: 10px;
  transform: scale(1);
  transition: all 0.2s;
}

.home-menu__man-with-laptop {
  width: 250px;
  left: -25px;
  transform: scale(1);
  transition: all 0.2s;
}

.home-menu__link:hover > .home-menu__man-in-chair,
.home-menu__link:hover > .home-menu__woman-with-laptop,
.home-menu__link:hover > .home-menu__man-with-laptop {
  -webkit-filter: drop-shadow(0px 15px 5px #172733c5);
  filter: drop-shadow(0px 15px 5px #172733c5);
  transform: scale(1.1);
  transition: all 0.2s;
}

.home-menu__title {
  bottom: 0;
  display: flex;
  font-size: 32px;
  font-weight: 900;
  justify-content: center;
  position: absolute;
  text-decoration: none;
  width: 100%;
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

.home-menu__link-label {
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: center;
  margin: 25px 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-10px);
}

@media only screen and (max-width: 800px) {
  .home-menu {
    flex-direction: column;
  }
}
</style>
