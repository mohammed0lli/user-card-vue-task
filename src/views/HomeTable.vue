<script setup>
import ProfileNoImage from "@/assets/svg/ProfileNoImage.vue";
import CreateUser from "@/components/CreateUser.vue";
import DeleteUser from "@/components/DeleteUser.vue";
import store from "@/stores";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

const employees = computed(() => store.state.employee);

const createShow = ref(false);
const idEdit = ref(0);
const deletePup = ref(0);

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
const searchEmployee = ref("");

const filteredEmployee = computed(() => {
  const search = searchEmployee.value.toLowerCase();
  return employees.value.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search) ||
      employee.lastName.toLowerCase().includes(search) ||
      employee.id.toString().includes(search)
  );
});
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-20 w-full">
    <DeleteUser
      v-if="deletePup != 0"
      :id="deletePup"
      :handleClose="handleClose"
    />
    <CreateUser v-if="createShow" :showAddUser="showAddUser" :idEdit="idEdit" />
    <div className="w-[70%] flex items-center border rounded-lg h-12">
      <input
        type="text"
        v-model="searchEmployee"
        class="rounded-l-lg h-8 px-2 w-full"
        placeholder="search.."
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 512 512"
        class="bg-slate-100 w-fit h-full rounded-r-lg p-2 px-4"
      >
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
    </div>
    <div class="w-[70%] flex justify-between items-center h-12">
      <p>Employees:</p>
      <button
        @click="showAddUser"
        class="bg-gray-50 border border-blue-400 p-1 px-2 text-blue-400 w-36 rounded-lg hover:bg-blue-50"
      >
        create employee
      </button>
    </div>
    <div
      className="w-[70%] h-96 overflow-y-auto mb-6 border border-gray-300 rounded-lg shadow-md"
    >
      <table className="min-w-full bg-white" v-if="employees">
        <thead>
          <tr className="bg-gray-100 flex items-center h-12">
            <th
              className="w-[5%] flex justify-center items-center text-gray-700 font-medium"
            >
              no
            </th>
            <th
              className="w-[10%] flex justify-center items-center text-gray-700 font-medium"
            >
              Image
            </th>
            <th
              className="w-[15%] flex justify-center items-center text-gray-700 font-medium"
            >
              Id
            </th>
            <th
              className="w-[35%] flex justify-center items-center text-gray-700 font-medium"
            >
              Name
            </th>
            <th
              className="w-[15%] flex justify-center items-center text-gray-700 font-medium"
            >
              Berth Date
            </th>
            <th
              className="w-[20%] flex justify-center items-center text-gray-700 font-medium"
            >
              edit
            </th>
          </tr>
        </thead>
        <tbody v-for="(employee, index) in filteredEmployee" :key="index">
          <tr class="flex items-center w-full hover:bg-gray-50 h-14 border-b">
            <RouterLink
              :to="`/profile/${employee.id}`"
              class="w-[80%] flex h-full items-center"
            >
              <td
                className="w-[6.25%] text-gray-800 flex justify-center items-center border-r h-full"
              >
                {{ index + 1 }}
              </td>
              <td
                className="w-[12.5%] text-gray-800 flex justify-center items-center border-r h-full"
              >
                <img
                  v-if="employee.image"
                  :src="employee.image"
                  alt=""
                  class="w-10 h-10 rounded-lg"
                />
                <div v-else class="w-10 rounded-lg border bg-slate-50 p-2">
                  <ProfileNoImage />
                </div>
              </td>
              <td
                className="w-[18.75%] text-gray-800 text-start flex-wrap text-wrap flex justify-center items-center border-r h-full"
              >
                {{ employee.id }}
              </td>
              <td
                className="w-[43.75%] text-gray-800 flex justify-center items-center border-r h-full"
              >
                {{ employee.firstName }}{{ " " }}
                {{ employee.lastName }}
              </td>
              <td
                className="w-[18.75%] text-gray-800 flex justify-center items-center border-r h-full"
              >
                {{ employee.birthdate }}
              </td></RouterLink
            >
            <td
              className="w-[20%] text-gray-800 flex justify-center gap-2 px-2 items-center border-r h-full"
            >
              <button
                @click="editUser(employee.id)"
                class="bg-gray-50 border border-yellow-400 p-1 text-yellow-400 w-1/2 rounded-lg hover:bg-yellow-50"
              >
                edit
              </button>
              <button
                @click="deleteUser(employee.id)"
                class="bg-gray-50 border border-red-400 p-1 text-red-400 w-1/2 rounded-lg hover:bg-red-50"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
