<template>
  <main>

    <RouterView />

    <NotificationTeleport :notifications="notifications" @remove="removeNotification" />

  </main>


</template>

<script setup lang="ts">
import NotificationTeleport from './components/NotificationTeleport.vue';
import { useNotification } from '@/composables/useNotification';
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore()
authStore.refreshIfLoggedin();

const { notifications, removeNotification } = useNotification()
</script>