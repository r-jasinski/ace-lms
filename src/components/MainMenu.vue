<template>
  <div class="component">
    <button class="cn-button" id="cn-button" @click="menuHandler" />
    <div class="cn-wrapper" :class="{ 'opened-nav': opened }" id="cn-wrapper">
      <ul>
        <li>
          <router-link :to="{ name: 'HomePage' }"
            ><span>Home</span></router-link
          >
        </li>
        <li>
          <router-link to="/ranking"><span>Ranking</span></router-link>
        </li>
        <li>
          <router-link to="/articles"><span>Artigos</span></router-link>
        </li>
        <li>
          <router-link to="/questions"><span>Perguntas</span></router-link>
        </li>
        <li>
          <router-link to="/profile"><span>Perfil</span></router-link>
        </li>
        <li>
          <router-link to="/about"><span>Sobre</span></router-link>
        </li>
        <li>
          <router-link to="/exit"><span>Sair</span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',

  data() {
    return {
      opened: false
    }
  },

  methods: {
    menuHandler() {
      this.opened = !this.opened
    }
  }
}
</script>

<style scoped>
* {
  position: relative;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
}

.component {
  position: relative;
  top: -150px;
  height: 15em;
}

.cn-button {
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
  font-weight: 700;
  font-size: 1.5em;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-backface-visibility: hidden;
}

.cn-button:hover {
  box-shadow: #81bfe2 0px 0px 0px 10px;
}
.component .cn-wrapper {
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

.component .cn-wrapper:after {
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

.component .opened-nav {
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

.component .cn-wrapper li {
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

.component .cn-wrapper li a {
  position: absolute;
  right: -7.25em;
  bottom: -7.25em;
  display: block;
  width: 14.5em;
  height: 14.5em;
  border-radius: 50%;
  background: #81bfe2;
  background: -webkit-radial-gradient(transparent 35%, #81bfe2 35%);
  background: -moz-radial-gradient(transparent 35%, #81bfe2 35%);
  background: radial-gradient(transparent 35%, #81bfe2 35%);
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

.component .cn-wrapper li a span {
  position: relative;
  top: 1.8em;
  display: block;
  font-size: 0.5em;
  font-weight: 700;
  text-transform: uppercase;
}

.component .cn-wrapper li a:hover,
.component .cn-wrapper li a:active,
.component .cn-wrapper li a:focus {
  background: -webkit-radial-gradient(transparent 35%, #4a8db4 35%);
  background: -moz-radial-gradient(transparent 35%, #4a8db4 35%);
  background: radial-gradient(transparent 35%, #4a8db4 35%);
}
.component .cn-wrapper li a:focus {
  position: fixed;
}

.component .opened-nav li {
  -webkit-transition: all 0.3s ease 0.3s;
  -moz-transition: all 0.3s ease 0.3s;
  transition: all 0.3s ease 0.3s;
}

.component .opened-nav li:first-child {
  -webkit-transform: rotate(-20deg) skew(60deg);
  -moz-transform: rotate(-20deg) skew(60deg);
  -ms-transform: rotate(-20deg) skew(60deg);
  transform: rotate(-20deg) skew(60deg);
}

.component .opened-nav li:nth-child(2) {
  -webkit-transform: rotate(12deg) skew(60deg);
  -moz-transform: rotate(12deg) skew(60deg);
  -ms-transform: rotate(12deg) skew(60deg);
  transform: rotate(12deg) skew(60deg);
}

.component .opened-nav li:nth-child(3) {
  -webkit-transform: rotate(44deg) skew(60deg);
  -moz-transform: rotate(44deg) skew(60deg);
  -ms-transform: rotate(44deg) skew(60deg);
  transform: rotate(44deg) skew(60deg);
}

.component .opened-nav li:nth-child(4) {
  -webkit-transform: rotate(76deg) skew(60deg);
  -moz-transform: rotate(76deg) skew(60deg);
  -ms-transform: rotate(76deg) skew(60deg);
  transform: rotate(76deg) skew(60deg);
}

.component .opened-nav li:nth-child(5) {
  -webkit-transform: rotate(108deg) skew(60deg);
  -moz-transform: rotate(108deg) skew(60deg);
  -ms-transform: rotate(108deg) skew(60deg);
  transform: rotate(108deg) skew(60deg);
}

.component .opened-nav li:nth-child(6) {
  -webkit-transform: rotate(140deg) skew(60deg);
  -moz-transform: rotate(140deg) skew(60deg);
  -ms-transform: rotate(140deg) skew(60deg);
  transform: rotate(140deg) skew(60deg);
}

.component .opened-nav li:nth-child(7) {
  -webkit-transform: rotate(172deg) skew(60deg);
  -moz-transform: rotate(172deg) skew(60deg);
  -ms-transform: rotate(172deg) skew(60deg);
  transform: rotate(172deg) skew(60deg);
}

@media only screen and (max-width: 620px) {
  li {
    width: 4em;
    height: 4em;
    line-height: 4em;
  }
}

@media only screen and (max-width: 480px) {
  .component .cn-wrapper {
    font-size: 0.68em;
  }
  .cn-button {
    font-size: 1em;
  }
}
</style>
