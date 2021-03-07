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
        class="dm-button"
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

body {
  margin: 0;
  min-width: 320px;
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
  /* border: 1px solid red; */
}

article {
  grid-area: article;
  min-height: 38vh;
  /* padding: 0 10%; */
  display: flex;
  justify-content: center;
  /* border: 1px solid red; */
}

footer {
  grid-area: footer;
  /* border: 1px solid red; */
}

a {
  color: var(--primary);
}

@media only screen and (max-width: 480px) {
  #app {
    grid-template-rows: 325px 1fr 15vh;
  }
  article {
    min-height: 38vh;
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
  opacity: 0.9;
  cursor: pointer;
  position: fixed;
  right: 45px;
  top: 400px;
}
</style>
