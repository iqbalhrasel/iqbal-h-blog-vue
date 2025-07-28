<template>
  <div class=" rounded-2xl mt-7">
    <div>
      <div
        class="lg:w-auto sm:w-[420px] aspect-[1.45] bg-[url('src/assets/images/dark_backg.png')] bg-contain bg-no-repeat bg-center lg:mx-auto overflow-hidden rounded-2xl">
        <p class="w-full h-full flex justify-center items-center text-3xl text-gray-300 text-center p-6">
          {{ blogCard.title }}</p>
      </div>
    </div>


    <div class="px-1 py-4 ">
      <div class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
        <div class="bg-gray-100 px-4 py-1 rounded-full ">{{ blogCard.topicName }}</div>
        <div>-</div>
        <div>{{ formatDate(blogCard.createdAt) }}</div>
      </div>

      <div class="mt-6">
        <RouterLink :to="{ name: 'blog-details', params: { id: blogCard?.id, url: blogCard?.url } }"
          class="text-2xl text-gray-700 hover:text-opacity-70 font-semibold">{{ blogCard.title }}
        </RouterLink>
      </div>

      <p class="mt-4 text-gray-500 font-medium">{{ blogCard.metaText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogCardInfo } from '@/composables/useTypes';
import { useUtility } from '@/composables/useUtility';

defineProps<{
  blogCard: BlogCardInfo
}>()

const { formatDate } = useUtility()
</script>