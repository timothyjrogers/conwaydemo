<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
  <footer>
    <div class="wrapper">
        <span id="copyright">&copy; Copyright 2023 Timothy J. Rogers</span>
    </div>
  </footer>
</template>

<style scoped>
.wrapper {
    width: 100%;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
