<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { login } from '@/services/ptolemy/auth';

import TextInput from '@/components/TextInput.vue';
import SubmitInput from '@/components/SubmitInput.vue';

const form = reactive({
  username: '',
  password: '',
})
const errorMessage = ref<string | null>(null)
const store = useAuthStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleSubmit(_e: Event) {
  errorMessage.value = null;
  const authResult = await login(form.username, form.password);

  if (authResult.kind === "ok") {
    store.setActiveUser({ username: form.username })
    router.push({ name: 'home' })
  } else {
    errorMessage.value = authResult.kind
  }
}
</script>

<template>
  <h1>Sign In</h1>
  <form @submit.prevent="handleSubmit">
    <div class="stack">
      <div class="error" v-if="errorMessage !== null">
        An error occurred:
        "{{ errorMessage }}"
      </div>

      <label for="username">Username*</label>
      <TextInput id="username" type="text" required v-model.trim="form.username" />

      <label for="password">Password*</label>
      <TextInput id="password" type="password" required v-model.trim="form.password" />

      <div class="action-group">
        <RouterLink tabindex="0" to="/create-account">Create Account</RouterLink>
        <SubmitInput value="Sign In" />
      </div>
    </div>
  </form>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35ch;
}

.error {
  background-color: var(--alx-messaging-error-bg);
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--alx-messaging-error); 
  width: fit-content;
}

.action-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
