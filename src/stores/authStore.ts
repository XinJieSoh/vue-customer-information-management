import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore('auth', () => {
    // state
    const isAuthenticated = ref<boolean>(false)
    const user = ref<string | null>(null)
    const userPassword = ref<string | null>(null)

    // action
    const login = async(email: string, password: string) => {
        try {
            // call the api
            await axios.post(`${baseUrl}/login`, { email, password });
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    isAuthenticated.value = true
                    user.value = email
                    userPassword.value = password
                    resolve()
                }, 1000)
            })
        } catch (error) {
            errorMessage(error, 'Failed to login.')
        }
        
    }

    const register = async(email: string, password: string) => {
        try {
            // call the api
            await axios.post(`${baseUrl}/register`, { email, password });
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    alert('Register successfully.')
                    resolve()
                }, 1000)
            })
        } catch (error) {
           errorMessage(error, 'Failed to register.')
        }
        
    }

    const errorMessage = (error: any, customMessage: string) => {
         // Check if error has a response (indicating it's an API error)
         if (axios.isAxiosError(error) && error.response) {
            // Show the backend error message in an alert
            alert(`${ customMessage } ${ error.response.data.message }`);
        } else {
            // Generic error in case there's no response or a different error
            alert(`${ customMessage } ${ error }`);
        }
    }

    function logout() {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            isAuthenticated.value = false
            user.value = null
            userPassword.value = null
            resolve()
          }, 500)
        })
    }

    return {
        isAuthenticated,
        user,
        login,
        register,
        logout,
    }
})