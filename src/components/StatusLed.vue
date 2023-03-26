<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  on: boolean
}>()
const shouldFlash = ref(false)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleFlash = (event: Event) => {
  shouldFlash.value = !shouldFlash.value;
}
</script>

<template>
  <div class="led" :class="{ on: props.on, flashing: shouldFlash }" @click="toggleFlash" />
</template>

<style scoped>
.led {
  width: 15px;
  height: 15px;
  outline: 1px inset var(--alx-black);
  border-radius: 50%;
  background-color: var(--alx-bg-lighter);
}

.led:hover {
  cursor: pointer;
  outline: 1px inset var(--alx-white);
}

.on {
  background-color: red;
}

@keyframes flash {
  from {
    background-color: var(--alx-bg-lighter);
  }

  to {
    background-color: var(--alx-primary);
  }
}

.flashing {
  animation: 0.5s infinite alternate flash;
  animation-timing-function: ease;
}
</style>
