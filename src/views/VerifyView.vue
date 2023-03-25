<script setup lang="ts">
import router from '@/router'
import { verifyEmail } from '@/services/ptolemy/auth'
import { onMounted, ref } from 'vue'

const errorMessage = ref<string | null>(null);
const successMessage = ref<string |null>(null);

onMounted(async () => {
  const params = router.currentRoute.value.query
  // Missing a param
  if (!params.email || !params.code) {
    console.log('Missing param');
    errorMessage.value = "This is an invalid verification link"
    return
  }

  // Param is present more than once.
  if (Array.isArray(params.email) || Array.isArray(params.code)) {
    console.log('Too many params');
    errorMessage.value = "This is an invalid verification link"
    return
  }

  const verificationRes = await verifyEmail(params.email, params.code)
  if (verificationRes.kind === 'ok') {
    // Show success feedback and then redirect to login
    successMessage.value = "Your email has been successfully verified! You can sign in "
    return
  } else {
    errorMessage.value = "This is an invalid verification link"
    return
  }
})
</script>

<template>
  <div class="error" v-if="errorMessage !== null">{{ errorMessage }}</div>
  <div class="success" v-if="successMessage !== null">
    {{ successMessage }}
    <RouterLink class="contrast-link" to="sign-in">here</RouterLink>
  </div>
</template>

<style scoped>
.error {
  margin-top: 1rem;
  background-color: var(--alx-messaging-error-bg);
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--alx-messaging-error);
  width: fit-content;
}

.success {
  margin-top: 1rem;
  background-color: var(--alx-primary-dark);
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--alx-primary-light);
  width: fit-content;
}

.contrast-link {
  color: var(--alx-accent);
  transition: 0.4s;
}

.contrast-link:hover {
  color: var(--alx-accent-light);
}
</style>
