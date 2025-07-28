<template>
  <div>
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <div class="bg-gray-100 px-4 py-1 rounded-full ">{{ blogCard.topicName }}</div>
      <div>-</div>
      <div>{{ formatDate(blogCard.createdAt) }}</div>
    </section>

    <section class="mt-3">
      <RouterLink :to="{ name: 'blog-details', params: { id: blogCard.id, url: blogCard.url } }"
        class="text-2xl text-gray-700 hover:text-opacity-70 font-semibold">{{ blogCard.title }}
      </RouterLink>
    </section>
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