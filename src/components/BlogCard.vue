<template>
  <div class="max-w-[370px] lg:w-1/3 bg-bgDeep shadow-md rounded-2xl">
    <div
      class="w-full max-w-[520px] aspect-[1.45] bg-[url('src/assets/images/dark_backg.png')] bg-contain bg-no-repeat bg-center mx-auto overflow-hidden rounded-2xl">
      <p class="w-full h-full flex justify-center items-center text-3xl text-gray-300 text-center p-6">
        {{ blog.title }}

      </p>
    </div>

    <div class="px-8 py-8">
      <div class=" text-gray-300 flex items-center gap-2">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
            <path fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd" />
          </svg>
        </span>

        <p>By <span class="text-red-400 pr-1">{{ blog.authorName }}</span></p>

        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
            <path fill-rule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clip-rule="evenodd" />
          </svg>
        </span>

        <span class="pr-1">{{ getDayName(blog.createdAt) }}</span>

      </div>

      <div class=" text-gray-300 text-xl font-semibold mb-6 mt-4">
        {{ blog.title }}
      </div>
      <RouterLink :to="{ name: 'blog-details', params: { id: blog.id, url: blog.url } }"
        class=" text-red-400 flex items-center hover:underline underline-offset-4">
        <span class="pr-3 font-semibold">Read more</span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
              clip-rule="evenodd" />
          </svg>
        </span>

      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { BlogCardInfo } from '@/composables/useTypes';

const props = defineProps<{
  blog: BlogCardInfo
}>()

function getDayName(isoString: string) {
  const sanitized = isoString.replace(/\.\d{3,}$/, match => match.slice(0, 4)); // .637851 → .637

  const date = new Date(sanitized);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
}
</script>