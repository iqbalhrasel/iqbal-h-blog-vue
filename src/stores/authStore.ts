
import { useUserLogin } from '@/composables/useUserLogin';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {

  const { refreshAccessToken } = useUserLogin()

  async function refreshIfLoggedin() {
    const loginState = JSON.parse(localStorage.getItem('log_st') || 'false')
    if (loginState) {
      await refreshAccessToken()
    }
  }

  return { refreshIfLoggedin }
})
