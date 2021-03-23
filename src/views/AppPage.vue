<template>
  <div class="app-page" :class="{ 'app-page--dark-mode': darkMode }">
    <header v-once>
      <app-header />
      <nav>
        <app-menu />
      </nav>
      <font-awesome-icon
        icon="lightbulb"
        class="app-page__dark-mode-button"
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
  components: { AppHeader, AppMenu, AppFooter },

  data() {
    return {
      darkMode: true
    }
  }
}
</script>

<style>
.app-page {
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
  margin-top: 150px;
  min-height: 45vh;
  padding: 0 20%;
}

footer {
  margin-top: 10%;
}

/* a {
  color: var(--primary);
} */

a,
button,
input,
select,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.app-page--dark-mode {
  --light: #2c3e50;
  --dark: #ffffff;
  --light-50: #2c3e5050;
  --dark-50: #ffffff50;
  --light-75: #2c3e5075;
  --dark-75: #ffffffad;
  --secondary-light: #85752e;
  --secondary: #d1ccb7;
}

.app-page__dark-mode-button {
  position: absolute;
  right: 6%;
  top: 90%;
  opacity: 0.5;
  cursor: pointer;
}

.app-page__dark-mode-button:hover {
  opacity: 1;
}

a {
  color: var(--primary);
}

@media (prefers-color-scheme: dark) {
  .app-page--dark-mode {
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
  article {
    margin-top: 50px;
  }
}

@media only screen and (max-width: 340px) {
  article {
    padding: 0;
  }
}
</style>
