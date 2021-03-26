<template>
  <div id="app" :class="{ 'app--dark-mode': getDarkMode }">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters('darkMode', ['getDarkMode'])
  },

  mounted() {
    this.initDarkMode()
  },

  methods: {
    ...mapActions('darkMode', ['initDarkMode'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

:root {
  --primary: #81bfe2;
  --primary-plus: #3c83ac;
  --dark: #2c3e50;
  --light: #f4f7fe;
  --dark-50: #2c3e5050;
  --light-50: #ffffff50;
  --dark-75: #2c3e5075;
  --light-75: #ffffffad;
  --success: #90c916;
  --success-plus: #75ac10;
  --warning: #fca52a;
  --warning-plus: #d8831e;
  --danger: #ff7088;
  --danger-plus: #db5175;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 355px;
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  color: var(--dark);
  background-color: var(--light);
}

.app--dark-mode {
  --light: #2c3e50;
  --dark: #ffffff;
  --light-50: #2c3e5050;
  --dark-50: #ffffff50;
  --light-75: #2c3e5075;
  --dark-75: #ffffffad;
}
</style>
