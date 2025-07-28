<template>
  <section class="px-10 lg:px-40 bg-[#1F2235] pt-14 pb-10">
    <footer>
      <div class="flex flex-col items-center">
        <Logo class="text-4xl" />

        <p class="w-2/3 text-center text-lg font-medium mt-10 text-gray-300">
          Let’s stay connected! Whether it's a project or just a chat, I’d love to hear from you. Built with passion and
          creativity. Keep coding, keep growing!
        </p>
      </div>

      <div class="flex justify-center gap-5 mt-14">
        <a :href="'https://' + details.github" target="_blank"
          class="bg-[#2c2e47] hover:bg-red-400 size-14 rounded-full flex justify-center items-center transition duration-300">
          <ico_github class="text-gray-300" />
        </a>
        <a :href="'https://' + details.linkedin" target="_blank"
          class="bg-[#2c2e47] hover:bg-red-400 size-14 rounded-full flex justify-center items-center transition duration-300">
          <ico_linkedin class="text-gray-300" />
        </a>
      </div>

      <p class="text-center text-gray-300 mt-14">Copyright © 2025 <span class="text-red-400">Iqbal.H</span> All
        Rights
        Reserved</p>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { useMyDetails } from '@/composables/useMyDetails';
import Logo from '@/components/Logo.vue';
import ico_github from '@/assets/icons/ico_github.vue';
import ico_linkedin from '@/assets/icons/ico_linkedin.vue';

const { details } = useMyDetails()


</script>