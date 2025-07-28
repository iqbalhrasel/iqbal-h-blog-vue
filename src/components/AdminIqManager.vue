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

  </main>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';

import TabLink from './TabLink.vue';
import IqDrafts from './IqDrafts.vue';
import IqAdd from './IqAdd.vue';
import FadeTransition from './FadeTransition.vue';

type TabKey = 'Published' | 'Drafts' | 'Add New';

export interface Tab {
  key: TabKey;
  label: string;
  component: Component
}

const tabs: Tab[] = [
  { key: 'Drafts', label: 'Drafts', component: IqDrafts },
  { key: 'Add New', label: 'Add New', component: IqAdd }
]

const currentTab = ref<TabKey>('Drafts')
const currentTabComponent = computed(() => tabs.find(t => t.key === currentTab.value)?.component)
</script>
