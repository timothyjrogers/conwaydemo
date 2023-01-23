<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 id="title">Conway's Game of Life</h1>
      <h2 id="subtitle">An Interactive Demo</h2>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
    width: 100%;
}

h1 {
    text-align: center;
}

h2 {
    text-align: center;
}

header {
  line-height: 1.5;
  padding: 0;
  max-height: 100vh;
  display: flex;
  align-self: center;
  text-align: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
