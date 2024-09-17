<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue'
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
</script>

<template>
    <div>
        <HeaderComponent v-if="authStore.isAuthenticated"/>
        <RouterView />
    </div>
</template>

