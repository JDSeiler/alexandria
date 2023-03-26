<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
  input {
    height: 2rem;
    font-size: 1rem;

    color: var(--alx-text-primary);
    background-color: var(--alx-bg-light);
    border: none;
    border-bottom: 1px solid var(--alx-text-primary);
    border-radius: 2px;

    padding: 0.25rem;
    transition: background-color ease 0.25s;
  }

  input:focus {
    background-color: var(--alx-bg-lighter);
    outline: 1px solid var(--alx-accent-dark);
  }
</style>