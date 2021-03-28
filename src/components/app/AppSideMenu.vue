<template>
  <div class="app-side-menu">
    <div
      class="app-side-menu__wrapper"
      v-if="showScrollToTopButton"
      @click="scrollToTop"
    >
      <arrow-icon class="app-side-menu__scroll-top-button box" />
    </div>
    <div class="app-side-menu__wrapper" @click="toggleDarkMode">
      <font-awesome-icon
        icon="lightbulb"
        class="app-side-menu__dark-mode-button box"
        size="2x"
      />
    </div>
    <div class="app-side-menu__wrapper">
      <font-awesome-icon
        icon="bell"
        class="app-side-menu__dark-mode-button box"
        size="2x"
      />
    </div>
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
  height: 300px;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 20px;
  top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.app-side-menu__wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100vh;
  opacity: 0.9;
  background-color: var(--light);
}

.app-side-menu__dark-mode-button {
  opacity: 0.5;
  cursor: pointer;
  padding: 3px;
}

.app-side-menu__dark-mode-button:hover {
  opacity: 1;
}
.app-side-menu__scroll-top-button {
  fill: var(--dark);
  width: 28px;
  height: 36px;
  opacity: 0.5;
  padding: 3px;
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
