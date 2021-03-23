<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script></script>

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
  -webkit-tap-highlight-color: transparent;
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
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
