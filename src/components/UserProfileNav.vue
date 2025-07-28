<template>
  <div class="relative">
    <button @click="toggleProfileDropdown">
      <img src="../assets/images/profile.jpg" class="w-10 rounded-full border-4 border-blue-500">
    </button>

    <div class="absolute w-40 right-0 bg-blue-500 p-2 rounded-lg" v-if="showProfileDropdown"
      @click="toggleProfileDropdown">

      <RouterLink :to="{ name: 'admin' }" id="btn-login" v-if="isAdmin"
        class=" text-white text-sm font-semibold w-full block text-center hover:bg-blue-600 p-2 rounded-lg">
        Admin Panel
      </RouterLink>

      <RouterLink :to="{ name: 'home' }" id="btn-login"
        class=" text-white text-sm font-semibold w-full block text-center hover:bg-blue-600 p-2 rounded-lg">
        My Website
      </RouterLink>

      <RouterLink :to="{ name: 'blog' }" id="btn-login"
        class=" text-white text-sm font-semibold w-full block text-center hover:bg-blue-600 p-2 rounded-lg">
        Blogs
      </RouterLink>

      <div class="border-b border-blue-400 my-1"></div>

      <button class=" text-white text-sm font-semibold w-full block text-center hover:bg-blue-600 p-2 rounded-lg"
        @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthState } from '@/composables/useAuthState';
import { useUserLogin } from '@/composables/useUserLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { isAdmin } = useAuthState()
const { handleLogout } = useUserLogin()

const router = useRouter()

const showProfileDropdown = ref(false)
function toggleProfileDropdown() {
  showProfileDropdown.value = !showProfileDropdown.value
}

async function logout() {

  try {
    await handleLogout()
    await router.push({ name: 'login' })
  } catch (e) {
    console.log(e);

  }
}
</script>