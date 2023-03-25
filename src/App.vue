<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Hello There</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/counter">Counter</RouterLink>
        <RouterLink to="/cha-ching">Cash Money</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

nav {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
</style>
