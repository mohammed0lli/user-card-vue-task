<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800"
  >
    <h1 class="text-6xl font-extrabold text-red-500">404</h1>
    <p class="mt-4 text-lg">GO BACK NOW</p>
    <RouterLink
      to="/"
      class="bg-gray-50 border mt-10 border-blue-400 p-1 px-2 text-blue-400 w-36 rounded-lg hover:bg-blue-50"
    >
      Go back to Home
    </RouterLink>
  </div>
</template>
