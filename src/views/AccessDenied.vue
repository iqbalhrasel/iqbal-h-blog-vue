<template>
  <div class=" h-screen flex flex-col justify-center items-center bg-gray-50">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="size-32 text-black" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd" />
      </svg>
    </div>
    <div class=" text-4xl font-bold mt-3">
      Access Denied
    </div>
    <div class="w-80 mt-3 text-center">
      An admin access is required to view this page. If you have an account already, click below.
    </div>

    <div class="flex sm:flex-row flex-col gap-x-4">
      <button @click="loginPage" class="bg-black hover:bg-opacity-90 text-white px-20 py-2 mt-5">Log in</button>
      <button @click="blogHomePage" class="bg-black hover:bg-opacity-90 text-white px-12 py-2 mt-5">Back to
        Blog</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function loginPage() {
  router.push({ name: 'login' })
}

function blogHomePage() {
  router.push({ name: 'blog' })
}
</script>