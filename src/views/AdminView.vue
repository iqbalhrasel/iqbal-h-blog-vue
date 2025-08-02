<template>

  <div class="mt-12">
    <AdminNavBar class="fixed right-0 left-0 top-0 z-20 " />

    <aside class="sidenav">
      <button @click="selectComponent(1)" class="btn"
        :class="{ 'btn-bg text-gray-800 font-medium': component.id === 1 }">Dashboard</button>
      <button @click="selectComponent(2)" class="btn"
        :class="{ 'btn-bg text-gray-800 font-medium': component.id === 2 }">Blog
        Manager</button>
      <button @click="selectComponent(3)" class="btn"
        :class="{ 'btn-bg text-gray-800 font-medium': component.id === 3 }">IQ
        Manager</button>
      <button @click="selectComponent(4)" class="btn"
        :class="{ 'btn-bg text-gray-800 font-medium': component.id === 4 }">Topic</button>
    </aside>

    <div class="ml-40">
      <component :is="component.comp" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AdminNavBar from '@/components/AdminNavBar.vue';
import AdminDashboard from '@/components/AdminDashboard.vue';
import AdminBlogManager from '@/components/AdminBlogManager.vue';
import AdminIqManager from '@/components/AdminIqManager.vue';
import AdminTopic from '@/components/AdminTopic.vue';
import { useTopics } from '@/composables/useTopics';

const { fetchTopics } = useTopics()


const component = ref({ id: 1, comp: AdminDashboard })
const adminComponents = ref([
  { id: 1, comp: AdminDashboard },
  { id: 2, comp: AdminBlogManager },
  { id: 3, comp: AdminIqManager },
  { id: 4, comp: AdminTopic },
])

function selectComponent(id: number) {
  const getComponent = adminComponents.value.find(a => a.id === id)
  if (getComponent) {
    component.value = getComponent
  }
}

onMounted(async () => {
  document.title = 'Admin Panel'
  await fetchTopics()
})
</script>

<style scoped>
.sidenav {
  @apply h-full w-40 fixed top-10 left-0 bg-white overflow-x-hidden border-r flex flex-col space-y-3 pt-10 text-gray-500;
}

.btn {
  @apply w-full px-5 py-2
}

.btn-bg {
  @apply bg-gray-100
}
</style>