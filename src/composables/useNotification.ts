// composables/useNotification.js
import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  function showNotification(message, type = 'info', duration = 3000) {
    const id = Date.now() + Math.random()
    notifications.value.push({ id, message, type })

    setTimeout(() => {
      notifications.value = notifications.value.filter(n => n.id !== id)
    }, duration)
  }

  function triggerSuccess(message = 'Success!') {
    showNotification(message, 'success')
  }

  function triggerError(message = 'Error occurred.') {
    showNotification(message, 'error')
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications, showNotification, triggerSuccess, triggerError, removeNotification
  }
}
