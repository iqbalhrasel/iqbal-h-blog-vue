<template>
  <BlogNavBar class="fixed right-0 left-0 top-0 z-20" />

  <RouterView />

  <BlogFooterSection />
</template>

<script setup lang="ts">
import BlogNavBar from '@/components/BlogNavBar.vue';
import BlogFooterSection from '@/components/BlogFooterSection.vue';
import { useTopics } from '@/composables/useTopics';

const { fetchTopics } = useTopics()
fetchTopics()
</script>