<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { createAccount } from '@/services/ptolemy/auth';
  import TextInput from '@/components/TextInput.vue';
  import SubmitInput from '@/components/SubmitInput.vue';

  const form = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  function resetForm() {
    form.username = '';
    form.email = '';
    form.password = '';
    form.confirmPassword = '';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleSubmit(_e: Event) {
    errorMessage.value = null;
    successMessage.value = null;

    if (form.password !== form.confirmPassword) {
      errorMessage.value = 'Passwords do not match!'
      return
    }

    const createResult = await createAccount({
      username: form.username,
      email: form.email,
      password: form.password
    });

    if (createResult.kind === "ok") {
      resetForm()
      successMessage.value = "You still need to verify your email! Check your inbox for a verification link."
      setTimeout(() => {
        successMessage.value = null;
      }, 5000);
    } else if (createResult.kind === "DuplicateFields") {
      errorMessage.value = "An account already exists with that email or username"
    } else {
      errorMessage.value = createResult.kind
    }
  }
</script>

<template>
  <RouterLink to="/sign-in">Back to Sign In</RouterLink>
  <h1>Create Account</h1>
  <form @submit.prevent="handleSubmit">
    <div class="stack">
      <div class="error" v-if="errorMessage !== null">
        An error occurred:
        "{{ errorMessage }}"
      </div>
      <div class="success" v-if="successMessage !== null">
        {{  successMessage }}
      </div>

      <label for="email">Email*</label>
      <TextInput id="email" type="email" required v-model.trim="form.email" />

      <label for="username">Username*</label>
      <TextInput id="username" type="text" required v-model.trim="form.username" />

      <label for="password">Password*</label>
      <TextInput id="password" type="password" required v-model.trim="form.password" />

      <label for="confirm-password">Confirm Password*</label>
      <TextInput id="confirm-password" type="password" required v-model.trim="form.confirmPassword" />

      <SubmitInput value="Create Account" />
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

.success {
  background-color: var(--alx-primary-dark);
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--alx-primary-light);
  width: fit-content;
}

.action-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>