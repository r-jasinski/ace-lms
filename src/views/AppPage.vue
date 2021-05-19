<template>
  <div class="app-page">
    <nav>
      <the-app-nav-bar v-if="showTopMenu" />
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
    this.unsubscribe()
    this.commitShowTopMenu(false)
  },

  methods: {
    ...mapActions({
      commitUsers: 'users/commitUsers',
      commitShowTopMenu: 'miscellaneous/commitShowTopMenu'
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
  min-height: 400px;
  z-index: 0;
}

article {
  display: flex;
  min-height: 54vh;
  padding: 0 20%;
  z-index: 1;
}

footer {
  margin-top: 10%;
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

@media only screen and (max-width: 768px) {
  article {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  header {
    min-height: 300px;
    height: 300px;
  }
  article {
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  article {
    padding: 0 1%;
  }
}
</style>
