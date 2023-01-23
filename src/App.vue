<script setup lang="ts">
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style scoped>
Header {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 3em;
}

RouterView {
  margin: 0 auto;
}
</style>