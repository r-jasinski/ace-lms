<template>
  <div class="app-menu">
    <transition appear name="fade">
      <button
        class="app-menu__button"
        id="app-menu__button"
        aria-label="Toggle Main Menu"
        @click="menuHandler"
      >
        <user-avatar
          :userPhotoURL="displayImage"
          :userRankingPoints="userRankingPoints"
          class="app-menu__avatar"
        />
      </button>
    </transition>
    <div
      :class="['app-menu__wrapper', { 'app-menu__wrapper--opened': opened }]"
      id="app-menu__wrapper"
    >
      <ul>
        <li>
          <router-link
            v-once
            exact-active-class="app-menu__link--active"
            :to="{ name: 'HomePage', params: { savedPosition: true } }"
          >
            <span>Home</span>
            <font-awesome-icon icon="home" class="app-menu__button-icon" />
          </router-link>
        </li>
        <li>
          <router-link
            v-once
            active-class="app-menu__link--active"
            :to="{ name: 'RankingPage', params: { savedPosition: true } }"
            ><span>Ranking</span>
            <font-awesome-icon icon="trophy" class="app-menu__button-icon" />
          </router-link>
        </li>
        <li>
          <router-link
            v-once
            active-class="app-menu__link--active"
            :to="{ name: 'ArticlesList', params: { savedPosition: true } }"
            ><span>Artigos</span>
            <font-awesome-icon
              icon="graduation-cap"
              class="app-menu__button-icon"
            />
          </router-link>
        </li>
        <li>
          <router-link
            v-once
            active-class="app-menu__link--active"
            :to="{ name: 'QuestionsList', params: { savedPosition: true } }"
            ><span>Perguntas</span>
            <font-awesome-icon icon="question" class="app-menu__button-icon" />
          </router-link>
        </li>
        <li>
          <router-link
            v-once
            active-class="app-menu__link--active"
            :to="{ name: 'ProfilePage', params: { savedPosition: true } }"
            ><span>Perfil</span>
            <font-awesome-icon icon="user-edit" class="app-menu__button-icon" />
          </router-link>
        </li>
        <li>
          <router-link
            active-class="app-menu__link--active"
            :to="{ name: 'AboutUsersPage', params: { savedPosition: true } }"
          >
            <span>{{ isAdmin ? 'Painel' : 'Sobre' }}</span>
            <font-awesome-icon
              :icon="isAdmin ? 'tools' : 'info'"
              class="app-menu__button-icon"
            />
          </router-link>
        </li>
        <li @click="signOut">
          <router-link to="exit" v-once
            ><span>Sair</span>
            <font-awesome-icon icon="times" class="app-menu__button-icon" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/shared/UserAvatar'
import { mapGetters } from 'vuex'
import { signOut } from '@/services/firebaseService'

export default {
  name: 'TheAppMenu',

  components: { UserAvatar },

  data() {
    return {
      opened: false
    }
  },

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

  mounted() {
    this.initializeAppMenu()
  },

  methods: {
    menuHandler() {
      this.opened = !this.opened
    },
    async initializeAppMenu() {
      setTimeout(() => {
        this.opened = true
      }, 100)
    },

    async signOut() {
      const response = await signOut()
      !response && this.$router.replace({ name: 'SignInPage' })
    }
  }
}
</script>
<style scoped>
* {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-menu {
  position: absolute;
  height: 15em;
  top: 10px;
  left: 50%;
}

.app-menu__button {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 11;
  margin-top: -2.25em;
  margin-left: -2.25em;
  padding-top: 0em;
  width: 4.5em;
  height: 4.5em;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  text-align: center;
  font-size: 1.5em;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-backface-visibility: hidden;
}

.app-menu__button::before {
  width: 4.5em;
  height: 4.5em;
  border-radius: 50%;
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: #81bee28a 0px 0px 0px 10px;
  opacity: 0;
  transition: opacity 200ms;
}

.app-menu__button:hover::before {
  opacity: 1;
}

.app-menu__avatar {
  position: relative;
  top: -5px;
  left: -16.5px;
}

.app-menu__wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 10;
  margin-top: -13em;
  margin-left: -13.5em;
  width: 27em;
  height: 27em;
  border-radius: 50%;
  background: transparent;
  opacity: 0;
  -webkit-transition: all 0.3s ease 0.3s;
  -moz-transition: all 0.3s ease 0.3s;
  transition: all 0.3s ease 0.3s;
  -webkit-transform: scale(0.1);
  -ms-transform: scale(0.1);
  -moz-transform: scale(0.1);
  transform: scale(0.1);
  pointer-events: none;
  overflow: hidden;
}

.app-menu__wrapper:after {
  content: '.';
  display: block;
  font-size: 2em;
  width: 6.2em;
  height: 6.2em;
  position: absolute;
  left: 50%;
  margin-left: -3.1em;
  top: 50%;
  margin-top: -3.1em;
  border-radius: 50%;
  z-index: 10;
  color: transparent;
}

.app-menu__wrapper--opened {
  border-radius: 50%;
  opacity: 1;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  pointer-events: auto;
}

.app-menu__wrapper li {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -1.3em;
  margin-left: -10em;
  width: 10em;
  height: 10em;
  font-size: 1.5em;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-transform: rotate(76deg) skew(60deg);
  -moz-transform: rotate(76deg) skew(60deg);
  -ms-transform: rotate(76deg) skew(60deg);
  transform: rotate(76deg) skew(60deg);
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
  pointer-events: none;
}

.app-menu__wrapper li a {
  position: absolute;
  right: -7.25em;
  bottom: -7.25em;
  display: block;
  width: 14.5em;
  height: 14.5em;
  border-radius: 50%;
  background: var(--primary);
  background: -webkit-radial-gradient(transparent 35%, var(--primary) 35%);
  background: -moz-radial-gradient(transparent 35%, var(--primary) 35%);
  background: radial-gradient(transparent 35%, var(--primary) 35%);
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 1.2em;
  line-height: 2;
  -webkit-transform: skew(-60deg) rotate(-75deg) scale(1);
  -moz-transform: skew(-60deg) rotate(-75deg) scale(1);
  -ms-transform: skew(-60deg) rotate(-75deg) scale(1);
  transform: skew(-60deg) rotate(-75deg) scale(1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  pointer-events: auto;
  outline: none;
  padding-right: 5px;
  padding-left: 5px;
}

.app-menu__wrapper li a span {
  position: relative;
  top: 1.8em;
  display: block;
  font-size: 0.5em;
  text-transform: uppercase;
  text-shadow: 0px 0px 2px black;
}

.app-menu__wrapper li a:hover,
.app-menu__wrapper li a:active,
.app-menu__wrapper li a:focus {
  background: -webkit-radial-gradient(transparent 35%, var(--primary-plus) 35%);
  background: -moz-radial-gradient(transparent 35%, var(--primary-plus) 35%);
  background: radial-gradient(transparent 35%, var(--primary-plus) 35%);
}
.app-menu__wrapper li a:focus {
  position: fixed;
}

.app-menu__wrapper--opened li {
  -webkit-transition: all 0.3s ease 0.3s;
  -moz-transition: all 0.3s ease 0.3s;
  transition: all 0.3s ease 0.3s;
}

.app-menu__wrapper--opened li:first-child {
  -webkit-transform: rotate(-20deg) skew(60deg);
  -moz-transform: rotate(-20deg) skew(60deg);
  -ms-transform: rotate(-20deg) skew(60deg);
  transform: rotate(-20deg) skew(60deg);
}

.app-menu__wrapper--opened li:nth-child(2) {
  -webkit-transform: rotate(12deg) skew(60deg);
  -moz-transform: rotate(12deg) skew(60deg);
  -ms-transform: rotate(12deg) skew(60deg);
  transform: rotate(12deg) skew(60deg);
}

.app-menu__wrapper--opened li:nth-child(3) {
  -webkit-transform: rotate(44deg) skew(60deg);
  -moz-transform: rotate(44deg) skew(60deg);
  -ms-transform: rotate(44deg) skew(60deg);
  transform: rotate(44deg) skew(60deg);
}

.app-menu__wrapper--opened li:nth-child(4) {
  -webkit-transform: rotate(76deg) skew(60deg);
  -moz-transform: rotate(76deg) skew(60deg);
  -ms-transform: rotate(76deg) skew(60deg);
  transform: rotate(76deg) skew(60deg);
}

.app-menu__wrapper--opened li:nth-child(5) {
  -webkit-transform: rotate(108deg) skew(60deg);
  -moz-transform: rotate(108deg) skew(60deg);
  -ms-transform: rotate(108deg) skew(60deg);
  transform: rotate(108deg) skew(60deg);
}

.app-menu__wrapper--opened li:nth-child(6) {
  -webkit-transform: rotate(140deg) skew(60deg);
  -moz-transform: rotate(140deg) skew(60deg);
  -ms-transform: rotate(140deg) skew(60deg);
  transform: rotate(140deg) skew(60deg);
}

.app-menu__wrapper--opened li:nth-child(7) {
  -webkit-transform: rotate(172deg) skew(60deg);
  -moz-transform: rotate(172deg) skew(60deg);
  -ms-transform: rotate(172deg) skew(60deg);
  transform: rotate(172deg) skew(60deg);
}

.app-menu__link--active {
  background: -webkit-radial-gradient(
    transparent 35%,
    var(--primary-plus) 35
  ) !important;
  background: -moz-radial-gradient(
    transparent 35%,
    var(--primary-plus) 35%
  ) !important;
  background: radial-gradient(
    transparent 35%,
    var(--primary-plus) 35%
  ) !important;
  font-weight: 900;
}

.app-menu__button-icon {
  margin-top: 1em;
  width: 25px;
  height: 25px;
  opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: scale(0.1);
}

@media only screen and (max-width: 550px) {
  .app-menu {
    top: -60px;
  }
  .app-menu__wrapper {
    font-size: 0.68em;
  }
}
</style>
