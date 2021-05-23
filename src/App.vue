<template>
  <div id="app" :class="UIMode">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ darkMode: 'darkMode/darkMode' }),

    UIMode() {
      return this.darkMode ? 'app--dark-mode' : 'app--light-mode'
    }
  },

  mounted() {
    this.initDarkMode()
  },

  methods: {
    ...mapActions({ initDarkMode: 'darkMode/initDarkMode' })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');

:root {
  --primary: #81bfe2;
  --primary-plus: #3c83ac;
  --dark: #2c3e50;
  --light: #ffffff;
  --dark-20: #2c3e5010;
  --light-20: #ffffff25;
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

*,
*::before,
*::after {
  box-sizing: inherit;
  -webkit-tap-highlight-color: transparent;
}

html {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  margin-right: calc(-1 * (100vw - 100%));
  overflow-x: hidden;
  user-select: none;
}

body {
  margin: 0;
  padding: 0;
  min-width: 320px;
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  color: var(--dark);
  background-color: var(--light);
}

.app--light-mode {
  background-image: url('./assets/stars.svg');
}

.app--dark-mode {
  --light: #2c3e50;
  --dark: #ffffff;
  --light-20: #2c3e5010;
  --dark-20: #ffffff0c;
  --light-50: #2c3e5050;
  --dark-50: #ffffff50;
  --light-75: #2c3e5075;
  --dark-75: #ffffffad;
  background-image: url('./assets/stars.svg');
}

.Vue-Toastification__toast--default {
  background-color: #1976d2;
  color: var(--dark);
}
.Vue-Toastification__toast--info {
  background-color: var(--primary);
  color: var(--dark);
}
.Vue-Toastification__toast--success {
  background-color: var(--success);
  color: var(--dark);
}
.Vue-Toastification__toast--error {
  background-color: var(--danger);
  color: var(--dark);
}
.Vue-Toastification__toast--warning {
  background-color: #ffc107;
  color: var(--dark);
}

.tooltip {
  display: block !important;
  z-index: 999;
  font-size: 0.8em;
  opacity: 0.9 !important;
}

.tooltip .tooltip-inner {
  background: #0e151c;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #0e151c;
  z-index: 1;
}

.tooltip[x-placement^='top'] {
  margin-bottom: 5px;
}

.tooltip[x-placement^='top'] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^='bottom'] {
  margin-top: 5px;
}

.tooltip[x-placement^='bottom'] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^='right'] {
  margin-left: 5px;
}

.tooltip[x-placement^='right'] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^='left'] {
  margin-right: 5px;
}

.tooltip[x-placement^='left'] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: #0e151c;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(#0e151c, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.dg-backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
}

.dg-content-body {
  border-bottom: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  padding-bottom: 0;
}

.dg-content-footer {
  background-color: transparent !important;
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  margin-top: 50px;
  padding: 0;
}

.dg-main-content {
  background-color: #ffffffe8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  overflow: hidden;
  padding: 15px;
  text-justify: inter-word;
  word-wrap: break-word;
}

.dg-btn--ok,
.dg-btn--cancel {
  align-items: center;
  background-color: var(--primary);
  border-radius: 100vh;
  border: none;
  color: #fff;
  display: flex;
  font-weight: 300;
  justify-content: center;
  min-height: 50px;
  outline: none;
  transform: scale(1);
  transition: all 0.05s;
  width: 150px;
}

.dg-btn--ok:hover,
.dg-btn--cancel:hover {
  background-color: var(--primary-plus);
  cursor: pointer;
  transform: scale(1.05);
  transition: all 0.05s;
}

.dg-btn--cancel {
  background-color: var(--danger);
}

.dg-btn--cancel:hover {
  background-color: var(--danger-plus);
}

.dg-form {
  border: none !important;
  background-color: transparent;
}

#dg-input-elem {
  background-color: transparent;
  border-radius: 100vh !important;
  border: 1px solid var(--dark-50) !important;
  min-height: 50px;
  outline: none;
}

#dg-input-elem:focus {
  border: 1px solid var(--dark) !important;
}
</style>
