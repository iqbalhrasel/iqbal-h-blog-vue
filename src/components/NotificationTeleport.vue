<template>
  <teleport to="body">
    <div class="notification-container">
      <div v-for="(notification, index) in notifications" :key="notification.id" class="notification"
        :class="notification.type" @click="removeNotification(notification.id)" title="Click to dismiss">
        {{ notification.message }}
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">

const props = defineProps({
  notifications: Array
})

const emit = defineEmits(['remove'])

function removeNotification(id) {
  emit('remove', id)
}

</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.notification {
  @apply border-2 border-white;
  padding: 12px 32px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  animation: fadeIn 0.3s ease;
  font-weight: 500;
  transition: opacity 0.2s;
}

.notification:hover {
  opacity: 0.8;
}

.success {
  background-color: #6360f5;
}

.error {
  background-color: #dc3545;
}

.info {
  background-color: #007bff;
}

.warning {
  background-color: #ffc107;
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
