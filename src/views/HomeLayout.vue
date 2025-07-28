<template>
  <NavBar class="fixed right-0 left-0 top-0 z-20" />

  <RouterView />

  <FooterSection />
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>