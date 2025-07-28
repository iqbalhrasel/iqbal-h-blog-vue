<template>
  <div class="bg-[#24263B] rounded-3xl group ">
    <div class="flex flex-col p-8 rounded-3xl h-full group-hover:bg-red-500 transition duration-300">
      <component :is="component" class="text-red-400 group-hover:text-white" />
      <!-- <ico_computer class="text-red-400 group-hover:text-white" /> -->
      <h3 class="text-gray-300 group-hover:text-white text-xl font-bold mt-5">{{ h3 }}
      </h3>

      <p class="mt-4 text-gray-300 group-hover:text-white">{{ paragraph }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

export interface Service {
  component: Object,
  h3: string,
  paragraph: string,
}

defineProps<Service>()
</script>