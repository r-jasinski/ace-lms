<template>
  <div class="app-page">
    <nav>
      <transition name="slide">
        <the-app-nav-bar v-if="showTopMenu" />
      </transition>
    </nav>
    <the-app-side-menu />
    <header v-once>
      <the-app-header />
      <nav>
        <the-app-menu />
      </nav>
    </header>

    <article role="main" :style="{ 'font-size': `${articleFontSize}em` }">
      <router-view />
    </article>

    <footer v-once>
      <the-app-footer />
    </footer>
  </div>
</template>

<script>
import TheAppFooter from '@/components/app/TheAppFooter'
import TheAppHeader from '@/components/app/TheAppHeader'
import TheAppMenu from '@/components/app/TheAppMenu'
import TheAppSideMenu from '@/components/app/TheAppSideMenu'
import TheAppNavBar from '@/components/app/TheAppNavBar'
import { mapGetters, mapActions } from 'vuex'
import { usersCollection } from '@/services/usersService'

export default {
  components: {
    TheAppFooter,
    TheAppHeader,
    TheAppMenu,
    TheAppSideMenu,
    TheAppNavBar
  },

  data() {
    return {
      unsubscribe: null
    }
  },

  computed: {
    ...mapGetters({
      articleFontSize: 'miscellaneous/articleFontSize',
      showTopMenu: 'miscellaneous/showTopMenu'
    })
  },

  created() {
    this.initializeApp()
  },

  destroyed() {
    this.commitIsEndOfScroll(false)
    this.commitShowTopMenu(false)
    this.unsubscribe()
  },

  methods: {
    ...mapActions({
      commitIsEndOfScroll: 'miscellaneous/commitIsEndOfScroll',
      commitShowTopMenu: 'miscellaneous/commitShowTopMenu',
      commitUsers: 'users/commitUsers'
    }),

    initializeApp() {
      this.unsubscribe = usersCollection
        .orderBy('rankingPoints', 'desc')
        .onSnapshot(querySnapshot => {
          let users = {}
          let userRankingPosition = 0
          querySnapshot.forEach(doc => {
            userRankingPosition++
            let id = doc.id
            users[id] = doc.data()
            users[id].rankingPosition = userRankingPosition
            users[id].id = id
          })
          this.commitUsers(users)
        })
    }
  }
}
</script>

<style>
.app-page {
  width: 100%;
}

header {
  position: relative;
  min-height: 350px;
  z-index: 0;
}

article {
  display: flex;
  min-height: 55vh;
  padding: 0 20%;
  z-index: 1;
}

footer {
  min-height: 5vh;
  padding-top: 20%;
}

a,
button,
input,
select,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a {
  color: var(--primary);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-10px);
}

@media only screen and (max-width: 768px) {
  article {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  article {
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  article {
    padding: 0 1% 20% 1%;
  }
}
</style>
