<template>
  <div class="app-menu">
    <button
      class="app-menu__button"
      id="app-menu__button"
      @click="menuHandler"
    />
    <div
      class="app-menu__wrapper"
      :class="{ 'app-menu__wrapper--opened': opened }"
      id="app-menu__wrapper"
    >
      <ul>
        <li>
          <router-link
            exact-active-class="app-menu__link--active"
            :to="{ name: 'HomePage', params: { savedPosition: true } }"
            ><span>Home</span></router-link
          >
        </li>
        <li>
          <router-link
            active-class="app-menu__link--active"
            :to="{ name: 'RankingPage', params: { savedPosition: true } }"
            ><span>Ranking</span></router-link
          >
        </li>
        <li>
          <router-link
            active-class="app-menu__link--active"
            :to="{ name: 'ArticlesList', params: { savedPosition: true } }"
            ><span>Artigos</span></router-link
          >
        </li>
        <li>
          <router-link
            active-class="app-menu__link--active"
            :to="{ name: 'QuestionsList', params: { savedPosition: true } }"
            ><span>Perguntas</span></router-link
          >
        </li>
        <li>
          <router-link
            active-class="app-menu__link--active"
            :to="{ name: 'ProfilePage', params: { savedPosition: true } }"
            ><span>Perfil</span></router-link
          >
        </li>
        <li>
          <router-link
            active-class="app-menu__link--active"
            :to="{ name: 'AboutUsersPage', params: { savedPosition: true } }"
            ><span>Sobre</span></router-link
          >
        </li>
        <li @click="signOut">
          <router-link to="exit"><span>Sair</span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'AppMenu',

  data() {
    return {
      opened: false
    }
  },

  mounted() {
    setTimeout(() => {
      this.opened = true
    }, 100)
  },

  methods: {
    menuHandler() {
      this.opened = !this.opened
    },
    async signOut() {
      await firebase.auth().signOut()
      this.$router.replace({ name: 'SignInPage' })
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
  top: 100px;
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
  background-image: url('https://assets.justinpinkney.com/toonify/images/hd/crops/gosling.jpg');
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
  box-shadow: var(--primary) 0px 0px 0px 10px;
  opacity: 0;
  transition: opacity 200ms;
}

.app-menu__button:hover::before {
  opacity: 1;
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

@media only screen and (max-width: 550px) {
  .app-menu {
    top: 25px;
  }
  .app-menu__wrapper {
    font-size: 0.68em;
  }
}
</style>
