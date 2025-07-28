<template>
  <main class=" px-20 pt-6">
    <!-- nav element -->
    <nav class="font-medium text-center text-gray-500 border-b border-gray-200">

      <ul class="flex flex-wrap -mb-px">
        <li v-for="tab in tabs" :key="tab.key">
          <TabLink :tab="tab" :current-tab="currentTab" @click="currentTab = tab.key" />
        </li>
      </ul>

    </nav>

    <!-- component mounting -->
    <FadeTransition mode="out-in">
      <KeepAlive>
        <component :is="currentTabComponent" />
      </KeepAlive>
    </FadeTransition>

    <div class="bg-black bg-opacity-25 fixed top-0 bottom-0 left-0 right-0 overflow-y-scroll" v-if="showUpdateBlog"
      @click.self="toggleUpdateBlog">
      <BlogDraftUpdate class="bg-white mx-52 p-10" />
    </div>

  </main>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import TabLink from './TabLink.vue';
import BlogDrafts from './BlogDrafts.vue';
import BlogAdd from './BlogAdd.vue';
import FadeTransition from './FadeTransition.vue';
import BlogDraftUpdate from './BlogDraftUpdate.vue';
import { useBlogUpdate } from '@/composables/useBlogUpdate';

const { showUpdateBlog, toggleUpdateBlog } = useBlogUpdate()

type TabKey = 'Published' | 'Drafts' | 'Add New';

export interface Tab {
  key: TabKey;
  label: string;
  component: Component
}

const tabs: Tab[] = [
  { key: 'Drafts', label: 'Drafts', component: BlogDrafts },
  { key: 'Add New', label: 'Add New', component: BlogAdd }
]

const currentTab = ref<TabKey>('Drafts')
const currentTabComponent = computed(() => tabs.find(t => t.key === currentTab.value)?.component)
</script>
