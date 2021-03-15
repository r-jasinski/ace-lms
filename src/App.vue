<template>
  <div id="app" :class="{ 'app--dark-mode': darkMode }">
    <header>
      <app-header />
      <nav>
        <app-menu />
      </nav>
    </header>

    <article>
      <font-awesome-icon
        icon="lightbulb"
        class="app__dark-mode-button"
        size="2x"
        @click="darkMode = !darkMode"
      />
      <router-view />
    </article>

    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
import AppMenu from '@/components/app/AppMenu'
import AppFooter from '@/components/app/AppFooter'

export default {
  components: {
    AppHeader,
    AppMenu,
    AppFooter
  },
  data() {
    return {
      darkMode: true
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

:root {
  --primary: #81bfe2;
  --primary-plus: #3c83ac;
  --secondary: #85752e;
  --secondary-light: #d1ccb7;
  --dark: #495868;
  --light: #ffffff;
  --success: #67f667;
  --danger: #e96262;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body {
  margin: 0;
  min-width: 320px;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  background-color: var(--light);
  width: 100%;
}

header {
  position: relative;
  min-height: 400px;
}

article {
  display: flex;
  margin-top: 50px;
  min-height: 45vh;
}

footer {
  margin-top: 10%;
}

a {
  color: var(--primary);
}

.app--dark-mode {
  --dark: #ffffff;
  --light: #2c3e50;
  --secondary-light: #85752e;
  --secondary: #d1ccb7;
}

.app__dark-mode-button {
  position: absolute;
  right: 1%;
  top: 40%;
  opacity: 0.9;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .app--dark-mode {
    --dark: #ffffff;
    --light: #2c3e50;
    --secondary-light: #85752e;
    --secondary: #d1ccb7;
  }
}

@media only screen and (max-width: 480px) {
  article {
    margin-top: -60px;
  }
}
</style>
