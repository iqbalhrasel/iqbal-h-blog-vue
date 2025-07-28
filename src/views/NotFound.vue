<template>
  <div class="">
    <div class="bg-gray-50 flex flex-col justify-center items-center h-screen">
      <div class=" font-bold text-7xl">404</div>
      <div class=" text-slate-500 text-2xl font-medium mt-3">Oops, This Page Not Found!</div>
      <div class=" text-gray-300 text-lg">The link might be corrupted.</div>
      <div class=" text-slate-600 text-xs mt-1">or the page may have been removed</div>

      <div>
        <button class="bg-black hover:bg-opacity-90 text-white text-sm px-4 py-2 font-medium mt-8" @click="goToHome">GO
          BACK HOME</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function goToHome() {
  router.push({ name: 'blog' })
}
</script>