<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    type="submit"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
input[type='submit'] {
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.5rem;
  color: var(--alx-text-primary);
  background-color: var(--alx-primary);
  transition: background-color ease 0.25s;
}

input[type='submit']:hover {
  cursor: pointer;
  background-color: var(--alx-primary-light);
}
</style>
