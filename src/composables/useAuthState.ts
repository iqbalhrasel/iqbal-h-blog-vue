import { ref } from "vue";

const accessToken = ref('')

const isLoggedin = ref(false);
const isAdmin = ref(false)

export function useAuthState() {
  return { accessToken, isLoggedin, isAdmin }
}