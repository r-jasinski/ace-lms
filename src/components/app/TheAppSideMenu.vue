<template>
  <div class="app-side-menu">
    <div
      class="app-side-menu__wrapper app-side-menu__button"
      v-if="showScrollToTopButton"
      @click="scrollToTop"
    >
      <arrow-icon class="app-side-menu__scroll-top-button " />
    </div>
    <small v-if="showPercentScroll">{{ percentScroll }}% </small>
    <div
      class="app-side-menu__wrapper app-side-menu__button"
      v-if="showScrollToBottomButton"
      @click="scrollToBottom"
    >
      <arrow-icon class="app-side-menu__scroll-bottom-button" />
    </div>
    <div
      class="app-side-menu__wrapper app-side-menu__button"
      @click="toggleDarkMode"
    >
      <font-awesome-icon
        icon="lightbulb"
        class="app-side-menu__icon"
        size="2x"
      />
    </div>

    <div
      class="app-side-menu__wrapper app-side-menu__button app-side-menu__button--center"
      @click="commitArticleFontSizeIncrease"
    >
      <font-awesome-icon icon="font" class="app-side-menu__icon" size="2x" />
      <font-awesome-icon
        icon="plus"
        class="app-side-menu__icon app-side-menu__button--sup"
      />
    </div>

    <div
      class="app-side-menu__wrapper app-side-menu__button--center app-side-menu__button"
      @click="commitArticleFontSizeDecrease"
    >
      <font-awesome-icon icon="font" class="app-side-menu__icon" size="2x" />
      <font-awesome-icon
        icon="minus"
        class="app-side-menu__icon app-side-menu__button--sup"
      />
    </div>
    <div class="app-side-menu__wrapper app-side-menu__button">
      <font-awesome-icon icon="bell" class="app-side-menu__icon" size="2x" />
    </div>
  </div>
</template>

<script>
import ArrowIcon from '@/assets/arrow.svg?inline'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TheAppSideMenu',

  components: { ArrowIcon },

  data() {
    return {
      percentLabel: 0,
      scrollBoddyPercent: 0
    }
  },

  computed: {
    ...mapGetters({
      showScrollPercentage: 'miscellaneous/showScrollPercentage'
    }),

    percentScroll() {
      if (this.percentLabel > 0) {
        return this.percentLabel <= 100 ? this.percentLabel : 100
      }
      return 100
    },

    showPercentScroll() {
      return (
        this.percentLabel &&
        this.showScrollPercentage &&
        this.showScrollToBottomButton
      )
    },

    showScrollToTopButton() {
      return this.scrollBoddyPercent > 0.01
    },

    showScrollToBottomButton() {
      return this.scrollBoddyPercent < 0.99
    }
  },

  mounted() {
    addEventListener('scroll', this.handleScroll)
  },

  destroyed() {
    removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    ...mapActions({
      toggleDarkMode: 'darkMode/toggleDarkMode',
      commitArticleFontSizeIncrease:
        'miscellaneous/commitArticleFontSizeIncrease',
      commitArticleFontSizeDecrease:
        'miscellaneous/commitArticleFontSizeDecrease'
    }),

    scrollToBottom() {
      scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    },

    scrollToTop() {
      scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },

    handleScroll() {
      let scrollTop = scrollY
      let docBodyHeight = document.body.offsetHeight
      let docHeight =
        document.querySelector('.post-wrapper')?.offsetHeight ||
        document.body.offsetHeight
      let winHeight = innerHeight
      let scrollPercent = scrollTop / (docHeight - winHeight)
      let scrollPercentRounded = Math.round(scrollPercent * 100)
      this.percentLabel = scrollPercentRounded
      this.scrollBoddyPercent = scrollTop / (docBodyHeight - winHeight)
    }
  }
}
</script>

<style scoped>
.app-side-menu {
  width: 30px;
  height: 100%;
  position: fixed;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  font-size: 16px;
  z-index: 3;
}

.app-side-menu__wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100vh;
  background-color: var(--light);
}

.app-side-menu__icon {
  max-width: 24px;
  cursor: pointer;
  padding: 3px;
}

.app-side-menu__icon:hover {
  opacity: 1;
}

.app-side-menu__scroll-bottom-button {
  fill: var(--dark);
  width: 28px;
  height: 36px;
  padding: 3px;
  transform: rotate(180deg);
}

.app-side-menu__scroll-top-button {
  fill: var(--dark);
  width: 28px;
  height: 36px;
  padding: 3px;
}

.app-side-menu__button--sup {
  position: relative;
  bottom: 7px;
  right: 10px;
}

.app-side-menu__button--center {
  padding-left: 14px;
}

.app-side-menu__button {
  opacity: 0.4;
  transition: 1.5s opacity cubic-bezier(0.39, 0.575, 0.565, 1);
}

.app-side-menu__button:hover {
  opacity: 1;
  transition: 1.5s opacity cubic-bezier(0.39, 0.575, 0.565, 1);
}

.app-side-menu__icon {
  max-width: 24px;
  cursor: pointer;
  padding: 3px;
}

.app-side-menu small {
  font-size: 10px;
  opacity: 0.4;
  text-shadow: -1px 0 var(--light), 0 1px var(--light), 1px 0 var(--light),
    0 -1px var(--light);
}

@media only screen and (max-width: 768px) {
  .app-side-menu {
    right: 1px;
  }
}
</style>
