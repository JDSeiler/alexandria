<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      Debug Links
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/sign-in">Sign In</RouterLink>
        <RouterLink to="/create-account">Create Account</RouterLink>
        <RouterLink to="/dashboard">Dashboard Prototype</RouterLink>
      </nav>
      <hr>
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
