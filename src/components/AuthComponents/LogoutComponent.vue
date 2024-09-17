<template>
  <div class="d-grid gap-2">
    <button class="btn btn-danger" @click="handleLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout()
}

</script>
