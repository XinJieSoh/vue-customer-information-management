<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue'
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <HeaderComponent v-if="authStore.isAuthenticated"/>
        <div class="container pt-4 pb-4">
            <RouterView />
        </div>
    </div>
</template>

