<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  const authStore = useAuthStore();
</script>

<template>
  <h1>Home</h1>
  <p>Hello {{ authStore.activeUser?.username }}</p>
</template>