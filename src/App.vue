<template>
  <div id="app" :class="{ darkmode: darkmode }">
    <header>
      <app-header />
      <nav>
        <app-menu />
      </nav>
    </header>

    <article>
      <font-awesome-icon
        icon="lightbulb"
        class="dark-mode-button"
        size="2x"
        @click="darkmode = !darkmode"
      />
      <router-view />
    </article>

    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader.vue'
import AppMenu from '@/components/app/AppMenu.vue'
import AppFooter from '@/components/app/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppMenu,
    AppFooter
  },
  data() {
    return {
      darkmode: true
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

:root {
  --primary: #81bfe2;
  --primary-plus: #3c83ac;
  --secondary: #aaa70f;
  --dark: #2c3e50;
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
}

body {
  margin: 0;
  min-width: 350px;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 47vh 1fr 15vh;
  grid-template-areas:
    'header'
    'article'
    'footer';
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  background-color: var(--light);
  width: 100%;
}

html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}

header {
  grid-area: header;
  position: relative;
  min-height: 400px;
}

article {
  grid-area: article;
  min-height: 38vh;
  /* padding: 0 10%; */
  display: flex;
  padding-top: 50px;
  min-height: 45vh;
}

footer {
  margin-top: 10%;
}

a {
  color: var(--primary);
}

.darkmode {
  --dark: #ffffff;
  --light: #2c3e50;
}

.dark-mode-button {
  opacity: 0.9;
  cursor: pointer;
  position: fixed;
  right: 45px;
  top: 400px;
}

@media only screen and (max-width: 480px) {
  header {
    min-height: 300px;
  }
}

@media (prefers-color-scheme: dark) {
  .darkmode {
    --dark: #ffffff;
    --light: #2c3e50;
  }

.dm-button {
  opacity: 0.9;
  cursor: pointer;
  position: fixed;
  right: 45px;
  top: 400px;
}
</style>
