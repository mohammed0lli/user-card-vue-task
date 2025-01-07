<script setup>
import { computed, defineProps, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  showAddUser: {
    required: true,
  },
  idEdit: {
    required: true,
  },
});

const loading = ref(false);
const image = ref("");
const store = useStore();
const employees = computed(() => store.state.employee);
const lastId = computed(() => store.state.lastId);
const currentAnswer = computed(() => {
  return employees.value.find(
    (employ) => employ.id.toString() === props.idEdit.toString()
  );
});

const formData = reactive({
  firstName: "",
  lastName: "",
  birthdate: "",
  phoneNumber: "",
  country: "",
  city: "",
  bloodType: "",
});

const errors = reactive({
  firstName: false,
  lastName: false,
  birthdate: false,
  phoneNumber: false,
  country: false,
  city: false,
  bloodType: false,
});

watch(
  currentAnswer,
  (newValue) => {
    if (newValue) {
      image.value = newValue.image;
      formData.id = newValue.id || "";
      formData.firstName = newValue.firstName || "";
      formData.lastName = newValue.lastName || "";
      formData.birthdate = newValue.birthdate || "";
      formData.phoneNumber = newValue.phoneNumber || "";
      formData.country = newValue.country || "";
      formData.city = newValue.city || "";
      formData.bloodType = newValue.bloodType || "";
    } else {
      formData.firstName = "";
      formData.lastName = "";
      formData.birthdate = "";
      formData.phoneNumber = "";
      formData.country = "";
      formData.city = "";
      formData.bloodType = "";
    }
  },
  { immediate: true }
);

function validateForm() {
  let isValid = true;
  for (const key in formData) {
    if (!formData[key]) {
      errors[key] = true;
      isValid = false;
    } else {
      errors[key] = false;
    }
  }

  if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
    errors.phoneNumber = true;
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (!validateForm()) return;
  loading.value = true;
  const last = lastId.value * 2;
  setTimeout(() => {
    if (props.idEdit !== 0) {
      store.commit("setEmployee", { image: image, ...formData });
    } else {
      store.commit("setEmployee", { id: last, image: image, ...formData });
      store.commit("setNewId", last);
    }
    props.showAddUser();
    loading.value = false;
  }, 1000);
}

function handleImageUpload(event) {
  image.value = URL.createObjectURL(event.target.files[0]);
}
</script>

<template>
  <div
    class="absolute z-50 h-full w-full bg-black bg-opacity-50 left-0 top-0 flex justify-center items-center"
  >
    <div class="container mx-auto mt-8 px-4">
      <div class="max-w-2xl mx-auto bg-white rounded-xl relative shadow-lg p-6">
        <div class="absolute right-2 top-2">
          <svg
            @click="showAddUser"
            class="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="30"
            height="30"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          Employee Details
        </h2>

        <div
          class="mb-4 relative flex gap-1 w-full justify-center items-center"
        >
          <div
            class="relative cursor-pointer w-12 h-10 overflow-hidden flex justify-center items-center bg-cover rounded-lg border bg-slate-50"
          >
            <img
              v-if="image"
              :src="image"
              alt="Profile Image"
              class="w-full h-full object-cover"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="svg-icon cursor-pointer"
              style="
                width: 25;
                height: 20;
                vertical-align: middle;
                fill: currentColor;
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path
                d="M904.704 763.392h-276.48c-10.752 0-19.456-8.704-19.456-19.456 0-10.752 8.704-19.456 19.456-19.456h276.48c10.752 0 19.456 8.704 19.456 19.456 0 10.752-8.704 19.456-19.456 19.456z"
                fill="#666666"
              />
              <path
                d="M766.464 901.632c-10.752 0-19.456-8.704-19.456-19.456v-276.48c0-10.752 8.704-19.456 19.456-19.456s19.456 8.704 19.456 19.456v276.48c0 10.752-8.704 19.456-19.456 19.456zM498.688 526.336c-112.64 0-204.288-91.648-204.288-204.288S386.048 117.76 498.688 117.76s204.288 91.648 204.288 204.288-91.648 204.288-204.288 204.288z m0-369.664c-91.136 0-165.376 74.24-165.376 165.376 0 91.136 74.24 165.376 165.376 165.376 91.136 0 165.376-74.24 165.376-165.376 0-91.136-74.24-165.376-165.376-165.376z"
                fill="#666666"
              />
              <path
                d="M121.856 894.464c-10.752 0-19.456-8.704-19.456-19.456 0-210.944 171.52-382.976 382.976-382.976 81.92 0 159.744 25.6 225.792 73.728 8.704 6.144 10.752 18.432 4.096 27.136a19.0464 19.0464 0 0 1-27.136 4.096c-59.392-43.52-129.536-66.048-202.752-66.048-189.44 0-343.552 154.112-343.552 343.552-0.512 11.264-9.216 19.968-19.968 19.968z"
                fill="#666666"
              />
            </svg>
            <input
              id="image"
              type="file"
              @change="handleImageUpload"
              class="mt-1 h-10 cursor-pointer absolute w-full top-0 left-0 text-sm text-gray-800 bg-gray-100 opacity-0 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <label
            for="firstName"
            class="w-full h-10 flex justify-start items-center px-4 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm"
            >Profile Image
          </label>
        </div>

        <div class="flex gap-4 item-center">
          <div class="mb-4 w-full">
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-600"
              >First Name</label
            >
            <input
              id="firstName"
              v-model="formData.firstName"
              :class="[
                'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
                errors.firstName ? 'border-red-500' : '',
              ]"
              placeholder="Enter First Name"
            />
            <span class="text-red-500 text-sm" v-if="errors.firstName"
              >First name is required</span
            >
          </div>
          <div class="mb-4 w-full">
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-600"
              >Last Name</label
            >
            <input
              id="lastName"
              v-model="formData.lastName"
              :class="[
                'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
                errors.lastName ? 'border-red-500' : '',
              ]"
              placeholder="Enter Last Name"
            />
            <span class="text-red-500 text-sm" v-if="errors.lastName"
              >Last name is required</span
            >
          </div>
        </div>

        <div class="flex gap-4 item-center">
          <div class="mb-4 w-full">
            <label
              for="birthdate"
              class="block text-sm font-medium text-gray-600"
              >Birthdate</label
            >
            <input
              id="birthdate"
              v-model="formData.birthdate"
              type="date"
              :class="[
                'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
                errors.birthdate ? 'border-red-500' : '',
              ]"
            />
            <span class="text-red-500 text-sm" v-if="errors.birthdate"
              >Birthdate is required</span
            >
          </div>
          <div class="mb-4 w-full">
            <label
              for="phoneNumber"
              class="block text-sm font-medium text-gray-600"
              >Phone Number</label
            >
            <input
              id="phoneNumber"
              v-model="formData.phoneNumber"
              type="tel"
              :class="[
                'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
                errors.phoneNumber ? 'border-red-500' : '',
              ]"
              placeholder="Enter 10-digit Phone Number"
            />
            <span class="text-red-500 text-sm" v-if="errors.phoneNumber"
              >Phone number must be exactly 10 digits</span
            >
          </div>
        </div>

        <div class="flex gap-4 item-center">
          <div class="mb-4 w-full">
            <label for="country" class="block text-sm font-medium text-gray-600"
              >Country</label
            >
            <input
              id="country"
              v-model="formData.country"
              :class="[
                'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
                errors.country ? 'border-red-500' : '',
              ]"
              placeholder="Enter Country"
            />
            <span class="text-red-500 text-sm" v-if="errors.country"
              >Country is required</span
            >
          </div>
          <div class="mb-4 w-full">
            <label for="city" class="block text-sm font-medium text-gray-600"
              >City</label
            >
            <input
              id="city"
              v-model="formData.city"
              :class="[
                'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
                errors.city ? 'border-red-500' : '',
              ]"
              placeholder="Enter City"
            />
            <span class="text-red-500 text-sm" v-if="errors.city"
              >City is required</span
            >
          </div>
        </div>

        <div class="mb-4 w-full">
          <label for="bloodType" class="block text-sm font-medium text-gray-600"
            >Blood Type</label
          >
          <input
            id="bloodType"
            v-model="formData.bloodType"
            :class="[
              'mt-1 block w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500',
              errors.bloodType ? 'border-red-500' : '',
            ]"
            placeholder="e.g., A+, O-"
          />
          <span class="text-red-500 text-sm" v-if="errors.bloodType"
            >Blood type is required</span
          >
        </div>

        <div class="flex justify-end mt-6">
          <button
            @click="handleSubmit"
            class="bg-gray-50 border border-blue-400 h-8 px-2 text-blue-400 w-28 rounded-lg hover:bg-blue-50"
          >
            <div v-if="loading" class="flex justify-center items-center w-full">
              <div class="spinner"></div>
            </div>
            <span v-else>Submit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
