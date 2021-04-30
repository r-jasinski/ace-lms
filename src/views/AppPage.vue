<template>
  <div class="app-page">
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
import { mapGetters, mapActions } from 'vuex'
import { usersCollection } from '@/services/usersService'

export default {
  components: { TheAppFooter, TheAppHeader, TheAppMenu, TheAppSideMenu },

  data() {
    return {
      unsubscribe: null
    }
  },

  computed: {
    ...mapGetters({
      articleFontSize: 'miscellaneous/articleFontSize'
    })
  },

  created() {
    this.initializeApp()
  },

  destroyed() {
    this.unsubscribe()
  },

  methods: {
    ...mapActions({
      commitUsers: 'users/commitUsers'
    }),

    initializeApp() {
      this.unsubscribe = usersCollection.onSnapshot(querySnapshot => {
        var users = {}
        querySnapshot.forEach(doc => {
          let id = doc.id
          users[id] = doc.data()
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
  min-height: 450px;
  z-index: 0;
}

article {
  display: flex;
  margin-top: 0;
  min-height: 45vh;
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
    min-height: 350px;
    height: 350px;
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
