<template>
  <main>

    <RouterView />

    <NotificationTeleport :notifications="notifications" @remove="removeNotification" />

  </main>


</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserLogin } from './composables/useUserLogin';
import { useTopics } from './composables/useTopics';
import NotificationTeleport from './components/NotificationTeleport.vue';
import { useNotification } from '@/composables/useNotification';

const { notifications, removeNotification } = useNotification()

const { fetchTopics } = useTopics()
const { checkSession } = useUserLogin()


onMounted(async () => {
  await fetchTopics();

  const pathname = window.location.pathname

  if (!pathname.startsWith('/admin')) {
    await checkSession()
  }
})
</script>