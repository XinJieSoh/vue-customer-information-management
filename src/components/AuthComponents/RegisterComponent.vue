<template>
    <section>
        <h2> Registration</h2>
        <h4> Please fill in the following information:</h4>
        <div class="card m-1 bg-primary-subtle">
            <form class="container-fluid customer_details" @submit.prevent="handleRegister">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label><span class="text-red">*</span>
                    <input class="form-control" type="email" v-model="email" placeholder="e.g: xxx@gmail.com" required/>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label><span class="text-red">*</span>
                    <input class="form-control" v-model="password" placeholder="Password" type="password" required/>
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Retype Password</label><span class="text-red">*</span>
                    <input class="form-control" v-model="confirmPassword" placeholder="Retype Password"
                        type="password" required/>
                </div>
                <div v-if="!isPasswordMatch" class="alert alert-danger" role="alert">
                    <b>Please check your password.</b>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="submit" :disabled="!isPasswordMatch">Register</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isPasswordMatch = computed(() => (password.value!=='' && confirmPassword.value!=='' && (password.value === confirmPassword.value)));

const handleRegister = async () => {
    if (email.value.trim()) {
        await authStore.register(email.value, password.value)
        email.value = ''
        password.value = ''
        confirmPassword.value =''
    }
}

</script>