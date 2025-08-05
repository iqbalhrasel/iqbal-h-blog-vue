<template>
  <section class="px-12 md:px-16 lg:px-36 bg-blue-50 pt-7 md:pb-10 pb-7">
    <footer>
      <div class=" border-b-2"></div>

      <div class="flex md:flex-row flex-col items-center md:justify-between justify-center my-8">
        <div class="md:block flex flex-col items-center">
          <BlogLogoIcon class="text-4xl size-10" />
          <p class="max-w-96 text-sm text-gray-500 font-medium mt-4 md:text-start text-center">Stacktrip is a blog
            website where I
            will share my
            programming journey, learnings and interesting tech news. I hope you'll love it.</p>
        </div>
        <div class="mt-10 md:mt-0">
          <RouterLink :to="{ name: 'home' }"
            class=" px-8 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white hover:text-white transition duration-200">
            My Website
          </RouterLink>
        </div>
      </div>


      <div class="md:hidden flex justify-center items-center mt-5">
        <a :href="'https://' + details.github" target="_blank"
          class="group hover:bg-gray-600 size-14 rounded-full flex justify-center items-center transition duration-300 mr-1">

          <ico_github class="text-gray-400 group-hover:text-white" />
        </a>
        <p class="text-gray-400 text-sm">/</p>
        <a :href="'https://' + details.linkedin" target="_blank"
          class="group hover:bg-gray-600 size-14 rounded-full flex justify-center items-center transition duration-300 ml-1">

          <ico_linkedin class="text-gray-400 group-hover:text-white" />
        </a>
      </div>

      <div class="flex md:flex-row flex-col items-center md:mt-5 justify-between">
        <p class=" text-gray-500 ">Copyright © 2025 <span class="text-red-500 font-medium">StackTrip</span>
          All Rights Reserved</p>

        <div class="md:flex justify-center items-center hidden">
          <a :href="'https://' + details.github" target="_blank"
            class="group hover:bg-gray-600 size-14 rounded-full flex justify-center items-center transition duration-300 mr-1">

            <ico_github class="text-gray-400 group-hover:text-white" />
          </a>
          <p class="text-gray-400 text-sm">/</p>
          <a :href="'https://' + details.linkedin" target="_blank"
            class="group hover:bg-gray-600 size-14 rounded-full flex justify-center items-center transition duration-300 ml-1">

            <ico_linkedin class="text-gray-400 group-hover:text-white" />
          </a>
        </div>
      </div>

    </footer>
  </section>
</template>

<script setup lang="ts">
import { useMyDetails } from '@/composables/useMyDetails';
import ico_github from '@/assets/icons/ico_github.vue';
import ico_linkedin from '@/assets/icons/ico_linkedin.vue';
import BlogLogoIcon from './BlogLogoIcon.vue';

const { details } = useMyDetails()


</script>