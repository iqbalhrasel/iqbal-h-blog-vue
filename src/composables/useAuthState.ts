import { ref } from "vue";

const isLoggedin = ref(false);
const isAdmin = ref(false)

export function useAuthState() {
  return { isLoggedin, isAdmin }
}