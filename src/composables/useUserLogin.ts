import { ref } from "vue";
import { axiosApi } from "@/lib/axios";
import { useUtility } from "./useUtility";
import { useAuthState } from "./useAuthState";

const { isAdmin, isLoggedin } = useAuthState()
const { isTokenExpired, getUserRole } = useUtility()

const email = ref('')
const password = ref('')

async function handleLogin() {

  try {
    const response = await axiosApi.post(`/auth/login`, {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('tj', response.data.token)

    isLoggedin.value = true

    if (getUserRole(response.data.token) === 'ADMIN') {
      isAdmin.value = true
    } else {
      isAdmin.value = false
    }

    email.value = ''
    password.value = ''

  } catch (e) {
    //add notification
    isLoggedin.value = false
    isAdmin.value = false

    throw e
  }
}

async function checkSession() {
  const token = localStorage.getItem('tj')

  if (token) {
    const isExpired = isTokenExpired(token)

    if (isExpired) {
      await refreshAccessToken()
    } else {
      isLoggedin.value = true

      if (getUserRole(token) === 'ADMIN') {
        isAdmin.value = true
      } else {
        isAdmin.value = false
      }
    }
  }
  else {
    isLoggedin.value = false
    isAdmin.value = false
  }
}

async function refreshAccessToken() {
  try {
    const response = await axiosApi.post(`/auth/refresh`, null)

    localStorage.setItem('tj', response.data.token)

    isLoggedin.value = true

    if (getUserRole(response.data.token) === 'ADMIN') {
      isAdmin.value = true
    } else {
      isAdmin.value = false
    }

  } catch (e) {

    isLoggedin.value = false
    isAdmin.value = false
  }
}

async function handleLogout() {
  try {
    await axiosApi.post('/auth/logout')

    isLoggedin.value = false
    isAdmin.value = false
    localStorage.removeItem('tj')
  } catch (e) {
    //add notification
    throw e
  }
}

export function useUserLogin() {
  return { email, password, handleLogin, checkSession, refreshAccessToken, handleLogout }
}