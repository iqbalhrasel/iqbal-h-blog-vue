<template>
  <main>

    <RouterView />

    <NotificationTeleport :notifications="notifications" @remove="removeNotification" />

  </main>


</template>

<script setup lang="ts">
import NotificationTeleport from './components/NotificationTeleport.vue';
import { useNotification } from '@/composables/useNotification';
import { onMounted } from 'vue';
import { useUserLogin } from './composables/useUserLogin';
import { useAuthState } from './composables/useAuthState';

const { refreshAccessToken } = useUserLogin()

const { notifications, removeNotification } = useNotification()
const { isLoggedin } = useAuthState()

onMounted(async () => {
  const loginState = JSON.parse(localStorage.getItem('log_st') || 'false')
  if (loginState) {
    isLoggedin.value = true

    await refreshAccessToken()
  }
})
</script>