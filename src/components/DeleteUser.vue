<script setup>
import store from "@/stores";
import { defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  id: {
    required: true,
  },
  handleClose: {
    required: true,
  },
});
const router = useRouter();
const route = useRoute();

function deleteUser(id) {
  store.commit("deleteEmployee", id);
  props.handleClose();

  if (route.path.includes("profile")) {
    router.back();
  }
}
</script>

<template>
  <div
    class="absolute h-full z-50 w-full bg-black bg-opacity-50 left-0 top-0 flex justify-center items-center"
  >
    <div class="container mx-auto mt-8 px-4">
      <div
        class="max-w-md mx-auto bg-white rounded-xl flex justify-center flex-col items-center gap-8 relative shadow-lg p-6"
      >
        <h1 class="text-xl">Are you Sur about delete ?</h1>
        <div class="flex w-full gap-2">
          <button
            @click="handleClose"
            class="bg-gray-50 border border-blue-400 p-1 text-blue-400 w-1/2 rounded-lg hover:bg-blue-50"
          >
            No
          </button>
          <button
            @click="deleteUser(id)"
            class="bg-gray-50 border border-red-400 p-1 text-red-400 w-1/2 rounded-lg hover:bg-red-50"
          >
            yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
