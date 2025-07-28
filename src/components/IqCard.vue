<template>
  <div class="space-y-4 w-full">
    <div class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <div class="bg-gray-100 px-4 py-1 rounded-full ">{{ iq.topicName }}</div>
      <div>-</div>
      <div>{{ formatDate(iq.createdAt) }}</div>
    </div>

    <details class="group border rounded-2xl shadow">
      <summary class="cursor-pointer px-4 py-3 text-lg font-medium bg-gray-100 rounded-t-2xl group-open:rounded-b-none">
        {{ iq.question }}
      </summary>
      <div class="px-4 py-3 text-gray-700">
        {{ iq.answer }}
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import type { InterviewQ } from '@/composables/useTypes';
import { useUtility } from '@/composables/useUtility';

defineProps<{
  iq: InterviewQ
}>()

const { formatDate } = useUtility()

</script>