<template>
  <header class="lg:px-20 md:px-16 px-12 py-3 flex justify-between items-center bg-greenColor shadow-md">
    <div class="flex items-center text-white">
      Admin panel
    </div>

    <UserProfileNav v-if="isLoggedin" />
  </header>


</template>

<script setup lang="ts">
import UserProfileNav from './UserProfileNav.vue';
import { useAuthState } from '@/composables/useAuthState';

const { isLoggedin } = useAuthState()

</script>

<style scoped>
.router-link-exact-active {
  @apply text-gray-600
}
</style>