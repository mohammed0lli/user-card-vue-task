<script setup>
import store from "@/stores";
import { computed, ref } from "vue";
import ProfileNoImage from "@/assets/svg/ProfileNoImage.vue";
import BackSvg from "@/assets/svg/BackSvg.vue";
import { useRoute, useRouter } from "vue-router";
import UserCard from "./UserCard.vue";
import DeleteUser from "../DeleteUser.vue";
import CreateUser from "../CreateUser.vue";

const id = ref(null);

const router = useRouter();
const route = useRoute();
const employees = computed(() => store.state.employee);

const item = computed(() => {
  return employees.value.find(
    (employ) => employ.id.toString() === route.params.id.toString()
  );
});

function handleBack() {
  router.back();
}
const idEdit = ref(0);
const deletePup = ref(0);
const createShow = ref(false);

function showAddUser() {
  createShow.value = !createShow.value;
  idEdit.value = 0;
}

function editUser(id) {
  createShow.value = true;
  idEdit.value = id;
}

function deleteUser(id) {
  deletePup.value = id;
}

function handleClose() {
  deletePup.value = 0;
}
</script>

<template>
  <div class="flex gap-4 w-full justify-center items-center h-screen">
    <DeleteUser
      v-if="deletePup != 0"
      :id="deletePup"
      :handleClose="handleClose"
    />
    <CreateUser v-if="createShow" :showAddUser="showAddUser" :idEdit="idEdit" />

    <button
      @click="handleBack"
      class="bg-gray-50 absolute top-4 left-4 border border-blue-400 p-1 text-blue-400 w-fit rounded-lg hover:bg-blue-50"
    >
      <div class="w-10">
        <BackSvg />
      </div>
    </button>
    <div class="flex flex-col items-start gap-4 w-1/2 shadow-md p-4 rounded-lg">
      <div class="flex justify-between items-center w-full">
        <div
          class="relative cursor-pointer w-32 h-32 overflow-hidden flex justify-center items-center bg-cover rounded-lg border bg-slate-50"
        >
          <img
            v-if="item.image"
            :src="item.image"
            alt="Profile Picture"
            class="w-full h-full"
          />
          <div v-else class="w-20">
            <ProfileNoImage />
          </div>
        </div>
        <div class="flex flex-col w-40 gap-4">
          <button
            @click="editUser(item.id)"
            class="bg-gray-50 border border-yellow-400 p-1 py-2 text-yellow-400 w-full rounded-lg hover:bg-yellow-50"
          >
            edit
          </button>
          <button
            @click="deleteUser(item.id)"
            class="bg-gray-50 border border-red-400 p-1 py-2 text-red-400 w-full rounded-lg hover:bg-red-50"
          >
            delete
          </button>
        </div>
      </div>
      <div
        class="text-center md:text-left flex flex-col items-start gap-2 w-full text-xl"
      >
        <h2
          class="text-2xl font-bold flex justify-between items-center text-gray-800 w-full"
        >
          <p>{{ item.firstName }} {{ item.lastName }}</p>
          <p class="px-2">id: {{ item.id }}</p>
        </h2>
        <p
          class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
        >
          <span class="text-black">Phone:</span> {{ item.phoneNumber }}
        </p>
        <div class="flex w-full items-center gap-2">
          <p
            class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
          >
            <span class="text-black">City:</span> {{ item.city }}
          </p>
          <p
            class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
          >
            <span class="text-black">Country:</span> {{ item.country }}
          </p>
        </div>
        <p
          class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
        >
          <span class="text-black">Blood Type:</span> {{ item.bloodType }}
        </p>
        <p
          class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
        >
          <span class="text-black">Birthdate:</span> {{ item.birthdate }}
        </p>

        <p
          class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
        >
          <span class="text-black">Release date: </span>
          <span>2025/7/90</span>
        </p>
        <p
          class="text-gray-600 bg-gray-100 w-full rounded-lg h-12 flex items-center px-2 gap-2"
        >
          <span class="text-black">Expiry date: </span>
          <span>2025/7/90</span>
        </p>
      </div>
    </div>

    <UserCard :item="item" />
  </div>
</template>
