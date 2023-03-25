<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { createAccount } from '@/services/ptolemy/auth';
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
  <RouterLink to="/login">Back to Login</RouterLink>
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
      <input id="email" type="email" required v-model.trim="form.email" />

      <label for="username">Username*</label>
      <input id="username" type="text" required v-model.trim="form.username" />

      <label for="password">Password*</label>
      <input id="password" type="password" required v-model.trim="form.password" />

      <label for="confirm-password">Confirm Password*</label>
      <input id="confirm-password" type="password" required v-model.trim="form.confirmPassword" />

      <input type="submit" value="Create Account">
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

input[type='text'],
input[type='email'],
input[type='password'] {
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

input[type='text']:focus,
input[type='email']:focus,
input[type='password']:focus {
  background-color: var(--alx-bg-lighter);
  outline: 1px solid var(--alx-accent-dark);
}

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