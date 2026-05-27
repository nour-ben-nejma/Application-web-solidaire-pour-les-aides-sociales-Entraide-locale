<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'AideSociale',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  background: #080812;
  font-family: 'Outfit', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e2e8f0;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a18;
}
::-webkit-scrollbar-thumb {
  background: rgba(167, 139, 250, 0.3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(167, 139, 250, 0.5);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
}

input, textarea, select {
  font-family: 'Outfit', sans-serif;
}
</style>