<template>
  <header class="px-14 py-6 bg-[#1F2235] flex justify-between items-center">
    <RouterLink :to="{ name: 'home' }">
      <Logo class="text-2xl" />
    </RouterLink>
    <nav class="text-white items-center space-x-6 hidden md:flex">
      <RouterLink to="/" class="flex flex-col group">
        Home
        <span class="border-b-2 border-b-transparent group-hover:border-b-white  mt-2 "></span>
      </RouterLink>

      <RouterLink :to="{ name: 'about' }" class="flex flex-col group">
        About me
        <span class="border-b-2 border-b-transparent group-hover:border-b-white  mt-2 "></span>
      </RouterLink>

      <RouterLink :to="{ name: 'blog' }" class="flex flex-col group">
        Blog
        <span class="border-b-2 border-b-transparent group-hover:border-b-white   mt-2 "></span>
      </RouterLink>
    </nav>
    <div class="text-white hidden md:block">
      <a href="/#contact"
        class="border border-red-400 px-8 py-2 rounded-full hover:bg-red-400 hover:text-white transition duration-200">
        Let's Talk</a>
    </div>

    <!-- hamburger -->
    <div class="block md:hidden">
      <a href="#" @click="toggleMobileMenu">
        <ico_bars class="text-gray-300 size-8" v-if="showBars" />
        <ico_cross class="text-gray-300 size-8" v-if="showCross" />
      </a>
    </div>

    <!-- mobile menu -->
    <div class="bg-bgDeep absolute right-0 left-0 top-20 block md:hidden p-6" v-if="showMobileMenu">
      <div class="bg-bgLight flex flex-col items-center space-y-4 p-4 rounded-xl text-gray-200"
        @click="toggleMobileMenu">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About me</RouterLink>
        <RouterLink :to="{ name: 'blog' }">Blog</RouterLink>
        <a to="/#contact" class="border border-red-400 px-6 py-1 rounded-full">Let's Talk
        </a>
      </div>
    </div>
  </header>


</template>

<script setup lang="ts">
import Logo from './Logo.vue';
import ico_bars from '@/assets/icons/ico_bars.vue';
import ico_cross from '@/assets/icons/ico_cross.vue';
import { ref } from 'vue';

const showBars = ref(true)
const showCross = ref(false)
const showMobileMenu = ref(false)

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
  showBars.value = !showBars.value
  showCross.value = !showCross.value
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-cyan-400
}
</style>