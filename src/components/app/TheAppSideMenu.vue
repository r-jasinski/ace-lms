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
      v-once
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
      v-once
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
      v-once
    >
      <font-awesome-icon icon="font" class="app-side-menu__icon" size="2x" />
      <font-awesome-icon
        icon="minus"
        class="app-side-menu__icon app-side-menu__button--sup"
      />
    </div>
    <div
      class="app-side-menu__wrapper app-side-menu__button"
      @click="callNotifications"
      v-once
    >
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
      notificationToastId: null,
      percentLabel: 0,
      scrollBoddyPercent: 0,
      showTopMenu: false
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
      return this.scrollBoddyPercent < 0.9
    },

    IsEndOfScroll() {
      return this.scrollBoddyPercent < 0.7
    }
  },

  watch: {
    IsEndOfScroll() {
      let isEndOfScroll
      if (this.IsEndOfScroll) {
        isEndOfScroll = false
        this.commitIsEndOfScroll(isEndOfScroll)
        return
      }
      isEndOfScroll = true
      this.commitIsEndOfScroll(isEndOfScroll)
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
        'miscellaneous/commitArticleFontSizeDecrease',
      commitIsEndOfScroll: 'miscellaneous/commitIsEndOfScroll',
      commitShowTopMenu: 'miscellaneous/commitShowTopMenu'
    }),

    callNotifications() {
      this.$toast.dismiss(this.notificationToastId)
      const toastId = this.$toast('Nenhuma notificação nova', {
        type: 'info',
        maxToasts: 1
      })
      this.notificationToastId = toastId
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
      if (scrollTop > 265 && !this.showTopMenu) {
        this.showTopMenu = true
        this.commitShowTopMenu(this.showTopMenu)
      }
      if (scrollTop < 265 && this.showTopMenu) {
        this.showTopMenu = false
        this.commitShowTopMenu(this.showTopMenu)
      }
    },

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
    }
  }
}
</script>

<style scoped>
.app-side-menu {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  height: 100%;
  justify-content: flex-end;
  padding-bottom: 20vh;
  position: fixed;
  right: 20px;
  width: 30px;
  z-index: 3;
}

.app-side-menu__wrapper {
  align-items: center;
  display: flex;
  height: 42px;
  justify-content: center;
  width: 42px;
}

.app-side-menu__icon {
  cursor: pointer;
  max-width: 24px;
  padding: 3px;
}

.app-side-menu__icon:hover {
  opacity: 1;
}

.app-side-menu__scroll-bottom-button {
  fill: var(--dark);
  height: 36px;
  padding: 3px;
  transform: rotate(180deg);
  width: 28px;
}

.app-side-menu__scroll-top-button {
  fill: var(--dark);
  height: 36px;
  padding: 3px;
  width: 28px;
}

.app-side-menu__button--sup {
  bottom: 7px;
  position: relative;
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
  cursor: pointer;
  max-width: 24px;
  padding: 3px;
}

.app-side-menu small {
  font-size: 10px;
  opacity: 0.4;
  text-align: center;
  text-shadow: -1px 0 var(--light), 0 1px var(--light), 1px 0 var(--light),
    0 -1px var(--light);
  width: 42px;
}

@media only screen and (max-width: 768px) {
  .app-side-menu {
    right: 3px;
  }
}
</style>
