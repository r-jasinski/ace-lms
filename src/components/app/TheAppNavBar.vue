<template>
  <div class="app-nav-bar">
    <router-link
      tag="div"
      class="app-nav-bar__link"
      exact-active-class="app-nav-bar__link--active"
      :to="{ name: 'HomePage' }"
    >
      <span>Home</span>
      <font-awesome-icon icon="home" />
    </router-link>
    <router-link
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'RankingPage' }"
      ><span>Ranking</span>
      <font-awesome-icon icon="trophy" />
    </router-link>
    <router-link
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'ArticlesList' }"
      ><span>Artigos</span>
      <font-awesome-icon icon="graduation-cap" />
    </router-link>
    <router-link
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'QuestionsList' }"
      ><span>Perguntas</span>
      <font-awesome-icon icon="question" />
    </router-link>
    <router-link
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'ProfilePage' }"
      ><span>Perfil</span>
      <font-awesome-icon icon="user-edit" />
    </router-link>
    <router-link
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'AboutUsersPage' }"
      ><span>Sobre</span>
      <font-awesome-icon icon="info" />
    </router-link>
    <div
      class="app-nav-bar__link app-nav-bar__exit-link-wrapper"
      @click="signOut"
    >
      <router-link
        tag="div"
        to="exit"
        class="app-nav-bar__exit-link-wrapper"
        @click="signOut"
      >
        <div class="app-nav-bar__exit-link">
          <span>Sair</span>
          <font-awesome-icon icon="times" />
        </div>
        <div
          class="app-nav-bar__avatar"
          :style="{ backgroundImage: `url(${displayImage})` }"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { signOut } from '@/services/firebaseService'

export default {
  name: 'TheAppNavBar',

  computed: {
    ...mapGetters({
      displayImage: 'authenticatedUser/displayImage'
    })
  },

  methods: {
    async signOut() {
      const response = await signOut()
      !response && this.$router.replace({ name: 'SignInPage' })
    }
  }
}
</script>

<style scoped>
.app-nav-bar {
  background-color: var(--light);
  box-shadow: 0 10px 10px var(--light);
  color: var(--dark-75) !important;
  display: flex;
  height: 70px;
  justify-content: space-around;
  left: 0;
  opacity: 0.97;
  padding-bottom: 10px;
  padding: 0 20%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.app-nav-bar__link {
  align-items: center;
  background-color: var(--light);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: 600;
  justify-content: center;
  text-decoration: none;
}

.app-nav-bar__exit-link {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  justify-content: center;
}

.app-nav-bar__link--active {
  border-bottom: 3px solid var(--primary);
  border-radius: 3px;
  color: var(--primary);
}

.app-nav-bar__link:hover {
  color: var(--dark);
  cursor: pointer;
}

.app-nav-bar__avatar {
  background-position: center;
  background-size: cover;
  border-radius: 999px;
  height: 40px;
  margin-left: 10px;
  min-width: 40px;
}

.app-nav-bar__exit-link-wrapper {
  align-content: center;
  align-items: center;
  display: flex;
  text-decoration: none;
  height: 100%;
}

.app-nav-bar__exit-link-wrapper:hover {
  color: var(--dark);
}

@media only screen and (max-width: 768px) {
  .app-nav-bar span {
    display: none;
  }

  .app-nav-bar {
    padding: 0;
  }
}
</style>
