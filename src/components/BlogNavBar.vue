<template>
  <header class="lg:px-20 md:px-16 px-12 py-5 flex justify-between items-center bg-white shadow-md">
    <div class="flex items-center">
      <RouterLink :to="{ name: 'blog' }">
        <BlogLogo />
      </RouterLink>

      <div class=" text-blue-500 text-sm font-bold bg-gray-100 py-2 px-3 rounded-xl">BLOG</div>
    </div>


    <nav class="text-gray-400  items-center space-x-6 hidden lg:flex">
      <RouterLink :to="{ name: 'blog' }" class="font-semibold hover:text-gray-500">
        Home
      </RouterLink>
      <RouterLink :to="{ name: 'blog-all' }" class="font-semibold hover:text-gray-500">
        All Blogs
      </RouterLink>

      <RouterLink :to="{ name: 'interview' }" class="font-semibold hover:text-gray-500">
        Interview Q's
      </RouterLink>

      <div class=" hidden md:flex items-center space-x-3">
        <div class="space-x-3">
          <RouterLink :to="{ name: 'home' }"
            class=" px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-sm font-semibold text-white transition duration-200">
            My Website
          </RouterLink>

          <RouterLink :to="{ name: 'login' }" id="btn-login" v-if="!isLoggedin"
            class=" px-6 py-2 rounded-full bg-red-500 hover:bg-red-400 text-white text-sm font-semibold  transition duration-200">
            Login
          </RouterLink>
        </div>


        <UserProfileNav v-if="isLoggedin" />
      </div>
    </nav>



    <!-- hamburger -->
    <div class="block lg:hidden">
      <a href="#" @click="toggleMobileMenu">
        <ico_bars class="text-gray-300 size-8" v-if="showBars" />
        <ico_cross class="text-gray-300 size-8" v-if="showCross" />
      </a>
    </div>

    <!-- mobile menu -->
    <div class="bg-white absolute right-0 left-0 top-20 block md:hidden p-6" v-if="showMobileMenu">
      <div class="bg-gray-50 flex flex-col items-center space-y-4 p-4 rounded-xl text-gray-600"
        @click="toggleMobileMenu">
        <RouterLink :to="{ name: 'blog' }">Home</RouterLink>
        <RouterLink :to="{ name: 'blog-all' }">All Blogs</RouterLink>
        <RouterLink :to="{ name: 'interview' }">Interview Q's</RouterLink>

        <RouterLink :to="{ name: 'home' }" class="bg-blue-500 hover:bg-blue-400 text-white px-6 py-1 rounded-full">
          My Website
        </RouterLink>
      </div>
    </div>
  </header>


</template>

<script setup lang="ts">
import ico_bars from '@/assets/icons/ico_bars.vue';
import ico_cross from '@/assets/icons/ico_cross.vue';
import { ref } from 'vue';
import BlogLogo from './BlogLogo.vue';
import UserProfileNav from './UserProfileNav.vue';
import { useAuthState } from '@/composables/useAuthState';

const showBars = ref(true)
const showCross = ref(false)
const showMobileMenu = ref(false)

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
  showBars.value = !showBars.value
  showCross.value = !showCross.value
}

const { isLoggedin } = useAuthState()


</script>

<style scoped>
.router-link-exact-active {
  @apply text-gray-600
}

#btn-login {
  @apply text-white
}
</style>