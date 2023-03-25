<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/sign-in">Sign In</RouterLink>
        <RouterLink to="/create-account">Create Account</RouterLink>
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
