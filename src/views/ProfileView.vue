<template>
    <section>
        <div class="card m-1 bg-primary-subtle">
            <form class="container-fluid customer_details">
                <h2> My Profile </h2>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <span class="form-control" readonly>{{ user }}</span>
                </div>
                <LogoutComponent/>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import LogoutComponent from '@/components/AuthComponents/LogoutComponent.vue';

const authStore = useAuthStore();
const { user } = authStore;
</script>