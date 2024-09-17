<template>
  <section class="background-image">
    <h2> Welcome to MyCustomer System.</h2>
    <h4> Please login:</h4>
    <div class="card m-1 bg-primary-subtle">
      <form class="container-fluid customer_details" @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label><span class="text-red">*</span>
          <input class="form-control" type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label><span class="text-red">*</span>
          <input class="form-control" v-model="password" placeholder="Password" type="password" required />
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
    <p>
      <RouterLink class="link-underline-primary" to="/register">Don't have an account yet? Register it.</RouterLink>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter();
const handleLogin = async () => {
  if (email.value.trim()) {
    await authStore.login(email.value, password.value)
    if (authStore.isAuthenticated) {
      router.push('/')
    }
    email.value = ''
    password.value = ''
  }
}

</script>