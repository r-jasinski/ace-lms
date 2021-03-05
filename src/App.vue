<template>
  <div id="app" :class="{ darkmode: darkmode }">
    <header>
      <main-header />
      <nav>
        <main-menu />
      </nav>
    </header>

    <article>
      <font-awesome-icon
        icon="lightbulb"
        class="dm-button"
        size="2x"
        @click="darkmode = !darkmode"
      />
      <router-view />
    </article>

    <footer>
      <main-footer />
    </footer>
  </div>
</template>

<script>
import MainHeader from '@/components/layout/MainHeader.vue'
import MainMenu from '@/components/MainMenu.vue'
import MainFooter from '@/components/layout/MainFooter.vue'

export default {
  components: {
    MainHeader,
    MainMenu,
    MainFooter
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

body {
  margin: 0;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40vh 1fr 15vh;
  grid-template-areas:
    'header'
    'article'
    'footer';
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  background-color: var(--light);
}

html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}

header {
  grid-area: header;
  position: relative;
}

article {
  grid-area: article;
  min-height: 45vh;
  padding: 0 10%;
}

footer {
  grid-area: footer;
}

a {
  color: var(--primary);
}

@media only screen and (max-width: 480px) {
  #app {
    grid-template-rows: 30vh 1fr 15vh;
  }
}

@media (prefers-color-scheme: dark) {
  .darkmode {
    --dark: #ffffff;
    --light: #2c3e50;
  }
}

.darkmode {
  --dark: #ffffff;
  --light: #2c3e50;
}

.dm-button {
  float: right;
  opacity: 0.9;
}
</style>
