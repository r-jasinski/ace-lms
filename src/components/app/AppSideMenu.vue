<template>
  <div class="app-side-menu">
    <font-awesome-icon
      icon="lightbulb"
      class="app-side-menu__dark-mode-button box"
      size="2x"
      @click="toggleDarkMode"
    />
    <arrow-icon
      v-if="showScrollToTopButton"
      class="app-side-menu__scroll-top-button box"
      @click="scrollToTop"
    />
  </div>
</template>

<script>
import ArrowIcon from '../../assets/arrow.svg?inline'
import { mapActions } from 'vuex'

export default {
  name: 'AppSideMenu',

  components: { ArrowIcon },

  data() {
    return {
      showScrollToTopButton: false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    ...mapActions('darkMode', ['toggleDarkMode']),
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    handleScroll() {
      this.showScrollToTopButton = window.scrollY > 150 ? true : false
    }
  }
}
</script>

<style scoped>
.app-side-menu {
  width: 30px;
  margin: 0;
  padding: 15px 0;
  position: fixed;
  right: 10px;
  top: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--light);
  box-shadow: var(--light) 0px 0px 15px 15px;
  border-radius: 100vh;
}

.app-side-menu__dark-mode-button {
  /* position: fixed;
  right: 5%;
  top: 65%; */
  opacity: 0.5;
  cursor: pointer;
}

.app-side-menu__dark-mode-button:hover {
  opacity: 1;
}
.app-side-menu__scroll-top-button {
  fill: var(--dark);
  width: 25px;
  height: 25px;
  opacity: 0.5;
}

.app-side-menu__scroll-top-button:hover {
  opacity: 1;
}

.box {
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}

@media only screen and (max-width: 768px) {
  .app-side-menu {
    right: 1px;
  }
}
</style>
