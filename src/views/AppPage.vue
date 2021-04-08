<template>
  <div class="app-page">
    <header v-once>
      <the-app-header />
      <nav>
        <the-app-menu />
      </nav>
    </header>

    <article role="main">
      <router-view />
      <the-app-side-menu />
    </article>

    <footer v-once>
      <the-app-footer />
    </footer>
  </div>
</template>

<script>
import TheAppFooter from '@/components/app/TheAppFooter'
import TheAppHeader from '@/components/app/TheAppHeader'
import TheAppMenu from '@/components/app/TheAppMenu'
import TheAppSideMenu from '@/components/app/TheAppSideMenu'

export default {
  components: { TheAppFooter, TheAppHeader, TheAppMenu, TheAppSideMenu }
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
