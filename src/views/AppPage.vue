<template>
  <div class="app-page">
    <header v-once>
      <app-header />
      <nav>
        <app-menu />
      </nav>
      <font-awesome-icon
        icon="lightbulb"
        class="app-page__dark-mode-button"
        size="2x"
        @click="toggleDarkMode"
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
import { mapActions } from 'vuex'

export default {
  components: { AppHeader, AppMenu, AppFooter },

  data() {
    return {}
  },

  methods: {
    ...mapActions('darkMode', ['toggleDarkMode'])
  }
}
</script>

<style>
.app-page {
  width: 100%;
}

header {
  position: relative;
  min-height: 425px;
}

article {
  display: flex;
  margin-top: 120px;
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
