import { ref } from "vue";
import { axiosApi } from "@/lib/axios";
import { useUtility } from "./useUtility";
import { useAuthState } from "./useAuthState";

const { isAdmin, isLoggedin, accessToken } = useAuthState()
const { isTokenExpired, getUserRole } = useUtility()

const email = ref('')
const password = ref('')

async function handleLogin() {

  try {
    const response = await axiosApi.post(`/auth/login`, {
      email: email.value,
      password: password.value
    })

    accessToken.value = response.data.token

    localStorage.setItem('log_st', JSON.stringify(true));

    isLoggedin.value = true

    if (getUserRole(response.data.token) === 'ADMIN') {
      isAdmin.value = true
    } else {
      isAdmin.value = false
    }

    email.value = ''
    password.value = ''

  } catch (e) {
    isLoggedin.value = false
    isAdmin.value = false

    throw e
  }
}

async function refreshAccessToken() {
  try {
    const response = await axiosApi.post(`/auth/refresh`, null)

    accessToken.value = response.data.token

    localStorage.setItem('log_st', JSON.stringify(true));

    isLoggedin.value = true

    if (getUserRole(response.data.token) === 'ADMIN') {
      isAdmin.value = true
    } else {
      isAdmin.value = false
    }

  } catch (e) {

    //if refresh token expires, execute logout procedure
    isLoggedin.value = false
    isAdmin.value = false


  }
}

async function handleLogout() {
  try {
    await axiosApi.post('/auth/logout')

    isLoggedin.value = false
    isAdmin.value = false

    accessToken.value = ''
    localStorage.setItem('log_st', JSON.stringify(false));

  } catch (e) {
    throw e
  }
}

export function useUserLogin() {
  return { email, password, handleLogin, refreshAccessToken, handleLogout }
}