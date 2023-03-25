<script setup lang="ts">
  import { useCounterStore } from '@/stores/counter';

  const store = useCounterStore();
</script>

<template>
  <div class="counter">
    <h1>Here is a counter!</h1>
    <button @click="store.increment">Click Me!</button>
    <button @click="store.reset">Reset Count</button>
    <p>Count is {{ store.count }}</p>
    <p>If you keep trying, the count <i>might be</i> {{ store.doubleCount }}</p>
  </div>
</template>

<style>
</style>
