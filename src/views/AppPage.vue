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
import AppFooter from '@/components/app/AppFooter'
import AppHeader from '@/components/app/AppHeader'
import AppMenu from '@/components/app/AppMenu'
import AppSideMenu from '@/components/app/AppSideMenu'

export default {
  components: { AppFooter, AppHeader, AppMenu, AppSideMenu },

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
    padding: 0 1%;
  }
}

@media only screen and (max-width: 368px) {
  article {
    padding: 0 1%;
  }
}
</style>
