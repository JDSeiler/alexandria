<script setup lang="ts">
const props = defineProps<{
  value: string;
  tilt: boolean;
}>()
</script>

<template>
  <div :class="{ 'canted-label': props.tilt }">
    {{ props.value }}
  </div>
</template>

<style scoped>
.canted-label {
  width: fit-content;
  transform-origin: bottom right;
  transform: rotate(-35deg);
  left: 5px
}
</style>