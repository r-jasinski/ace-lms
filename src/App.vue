<template>
  <div id="app" :class="{ 'app--dark-mode': darkMode }">
    <header v-once>
      <app-header />
      <nav>
        <app-menu />
      </nav>
      <font-awesome-icon
        icon="lightbulb"
        class="app__dark-mode-button"
        size="2x"
        @click="darkMode = !darkMode"
      />
    </header>

    <article>
      <router-view />
    </article>

    <footer v-once>
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
  --dark: #2c3e50;
  --light: #ffffff;
  --dark-50: #2c3e5050;
  --light-50: #ffffff50;
  --dark-75: #2c3e5075;
  --light-75: #ffffffad;
  --success: #67f667;
  --danger: #ec7a7a;
  --danger-plus: #d85e5e;
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
  min-height: 425px;
}

article {
  display: flex;
  margin-top: 50px;
  min-height: 45vh;
  padding: 0 20%;
}

footer {
  margin-top: 10%;
}

a {
  color: var(--primary);
}

.app--dark-mode {
  --light: #2c3e50;
  --dark: #ffffff;
  --light-50: #2c3e5050;
  --dark-50: #ffffff50;
  --light-75: #2c3e5075;
  --dark-75: #ffffffad;
  --secondary-light: #85752e;
  --secondary: #d1ccb7;
}

.app__dark-mode-button {
  position: absolute;
  right: 6%;
  top: 90%;
  opacity: 0.5;
  cursor: pointer;
}

.app__dark-mode-button:hover {
  opacity: 1;
}

@media (prefers-color-scheme: dark) {
  .app--dark-mode {
    --light: #2c3e50;
    --dark: #ffffff;
    --light-50: #2c3e5050;
    --dark-50: #ffffff50;
    --light-75: #2c3e5075;
    --dark-75: #ffffffad;
    --secondary-light: #85752e;
    --secondary: #d1ccb7;
  }
}

@media only screen and (max-width: 768px) {
  article {
    padding: 0 5%;
  }
}

@media only screen and (max-width: 550px) {
  header {
    min-height: 375px;
    height: 375px;
  }
}

@media only screen and (max-width: 340px) {
  article {
    padding: 0;
  }
}
</style>
