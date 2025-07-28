<template>
  <div class="py-36 mt-16 bg-slate-400 flex items-center justify-center">
    <div class="lg:w-1/3 bg-white p-6 rounded-lg">
      <div class="text-2xl font-medium text-center text-slate-500">Login</div>
      <div class="border-b mt-2 mb-8"></div>

      <form @submit.prevent="login" class="flex flex-col space-y-6">
        <input v-model="email" type="email" placeholder="Email" required class="border p-2 rounded-lg">

        <input v-model="password" type="password" placeholder="Password" required class="border p-2 rounded-lg">

        <button type="submit"
          class="bg-purple-800 hover:bg-opacity-90 py-3 rounded-lg text-white font-medium">Login</button>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useNotification } from '@/composables/useNotification';
import { useUserLogin } from '@/composables/useUserLogin';
import { useRouter } from 'vue-router';

const { email, password, handleLogin } = useUserLogin()

//notif pop up
const { triggerError } = useNotification()

//login
const router = useRouter()

async function login() {
  try {
    await handleLogin()

    await router.push({ name: 'blog' })
  } catch (e) {
    triggerError(e)
  }
}
</script>