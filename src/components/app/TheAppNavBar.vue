<template>
  <div class="app-nav-bar">
    <router-link
      v-once
      tag="div"
      class="app-nav-bar__link"
      exact-active-class="app-nav-bar__link--active"
      :to="{ name: 'HomePage', params: { fromNav: true } }"
    >
      <span>Home</span>
      <font-awesome-icon icon="home" />
    </router-link>
    <router-link
      v-once
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'RankingPage', params: { fromNav: true } }"
      ><span>Ranking</span>
      <font-awesome-icon icon="trophy" />
    </router-link>
    <router-link
      v-once
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'ArticlesList', params: { fromNav: true } }"
      ><span>Artigos</span>
      <font-awesome-icon icon="graduation-cap" />
    </router-link>
    <router-link
      v-once
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'QuestionsList', params: { fromNav: true } }"
      ><span>Perguntas</span>
      <font-awesome-icon icon="question" />
    </router-link>
    <router-link
      v-once
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'ProfilePage', params: { fromNav: true } }"
      ><span>Perfil</span>
      <font-awesome-icon icon="user-edit" />
    </router-link>
    <router-link
      tag="div"
      class="app-nav-bar__link"
      active-class="app-nav-bar__link--active"
      :to="{ name: 'AboutUsersPage', params: { fromNav: true } }"
    >
      <span>{{ isAdmin ? 'Painel' : 'Sobre' }}</span>
      <font-awesome-icon
        :icon="isAdmin ? 'tools' : 'info'"
        class="app-menu__button-icon"
      />
    </router-link>
    <div
      class="app-nav-bar__link app-nav-bar__exit-link-wrapper"
      @click="signOut"
    >
      <router-link
        v-once
        tag="div"
        to="exit"
        class="app-nav-bar__exit-link-wrapper"
        @click="signOut"
        v-tooltip.right="{
          content: `Sair`,
          delay: { show: 800 }
        }"
      >
        <div class="app-nav-bar__exit-link">
          <span>Sair</span>
          <font-awesome-icon icon="times" />
        </div>
        <div class="app-nav-bar__avatar">
          <user-avatar
            :avatarSize="50"
            :userPhotoURL="displayImage"
            :userRankingPoints="userRankingPoints"
          />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/shared/UserAvatar'
import { mapGetters } from 'vuex'
import { signOut } from '@/services/firebaseService'

export default {
  name: 'TheAppNavBar',

  components: { UserAvatar },

  computed: {
    ...mapGetters({
      authenticatedUser: 'authenticatedUser/authenticatedUser',
      displayImage: 'authenticatedUser/displayImage',
      user: 'users/user'
    }),

    isAdmin() {
      return this.user(this.authenticatedUser.uid)?.isAdmin
    },

    userRankingPoints() {
      return this.user(this.authenticatedUser.uid)?.rankingPoints
    }
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
  border-bottom: 5px solid var(--light);
  box-shadow: 0 5px 5px var(--light);
  color: var(--dark-75) !important;
  display: flex;
  height: 60px;
  justify-content: space-around;
  left: 0;
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
  justify-content: center;
  text-decoration: none;
}

.app-nav-bar__exit-link {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app-nav-bar__link--active {
  border-bottom: 3px solid var(--primary);
  border-radius: 3px;
  color: var(--primary);
  pointer-events: none;
}

.app-nav-bar__link:hover {
  color: var(--dark);
  cursor: pointer;
}

.app-nav-bar__avatar {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}

.app-nav-bar__exit-link-wrapper {
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
