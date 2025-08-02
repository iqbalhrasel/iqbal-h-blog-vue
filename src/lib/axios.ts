import { useAuthState } from "@/composables/useAuthState";
import axios from "axios";



export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

axiosApi.interceptors.request.use(config => {
  const { accessToken } = useAuthState()

  const token = accessToken.value

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

export const axiosPublicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});