<template>
  <div class="app-page">
    <header v-once>
      <app-header />
      <nav>
        <app-menu />
      </nav>
    </header>

    <article>
      <router-view />
      <app-side-menu />
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
import AppSideMenu from '@/components/app/AppSideMenu'

export default {
  components: { AppHeader, AppMenu, AppFooter, AppSideMenu },

  data() {
    return {}
  },

  methods: {}
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
  margin-top: 145px;
  min-height: 45vh;
  padding: 0 20%;
}

footer {
  margin-top: 10%;
}

a,
button,
input,
select,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.app-page__dark-mode-button {
  position: fixed;
  right: 5%;
  top: 65%;
  opacity: 0.5;
  cursor: pointer;
}

.app-page__dark-mode-button:hover {
  opacity: 1;
}
.app-page__scroll-top-button {
  fill: var(--dark);
  width: 25px;
  height: 25px;
  opacity: 0.5;
  position: fixed;
  right: 5%;
  top: 72%;
}

.app-page__scroll-top-button:hover {
  opacity: 1;
}

.box {
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}

a {
  color: var(--primary);
}

@media only screen and (max-width: 768px) {
  article {
    padding: 0 10%;
  }
}

@media only screen and (max-width: 550px) {
  header {
    min-height: 375px;
    height: 375px;
  }
  article {
    margin-top: 50px;
    padding: 0 30px 0 0;
  }
}

@media only screen and (max-width: 368px) {
  article {
    padding: 0 30px 0 0;
  }
}
</style>
