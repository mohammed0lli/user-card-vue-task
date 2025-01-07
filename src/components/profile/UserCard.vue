<script setup>
import { defineProps, ref } from "vue";
import { useVueToPrint } from "vue-to-print";
import ProfileNoImage from "@/assets/svg/ProfileNoImage.vue";

const props = defineProps({
  item: {
    required: true,
  },
});

const componentRef = ref();
const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: "AwesomeFileName",
});
</script>

<template>
  <div class="w-fit p-10 items-center bg-white shadow-md rounded-lg">
    <div ref="componentRef" class="flex flex-col gap-4 print:gap-0">
      <div
        class="imageCard bg-cover w-[336px] h-[192px] rounded-lg p-2 page-break"
      >
        <div class="flex justify-between items-center">
          <p class="text-xs">Republic of Iraq</p>
          <img src="../../assets/logo.png" width="20" alt="" />
          <p class="text-xs">Ministry of Interior</p>
        </div>
        <div class="flex justify-between mt-4">
          <div class="flex flex-col gap-2">
            <p class="text-xs">
              First Name :<span class="font-semibold">{{
                item.firstName
              }}</span>
            </p>
            <p class="text-xs">
              Last Name :<span class="font-semibold">{{ item.lastName }}</span>
            </p>
            <p class="text-xs">
              Phone Number :<span class="font-semibold">{{
                item.phoneNumber
              }}</span>
            </p>
            <p class="text-xs">
              Berth Date :<span class="font-semibold">{{
                item.birthdate
              }}</span>
            </p>
            <p class="text-xs">
              Blood Type :<span class="font-semibold">{{
                item.bloodType
              }}</span>
            </p>
          </div>
          <div class="flex flex-col gap-2 items-center justify-center">
            <div
              class="relative cursor-pointer w-20 h-20 overflow-hidden flex justify-center items-center bg-cover rounded-lg border bg-slate-50"
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
            <p>AP{{ item.id + 134 }}</p>
          </div>
        </div>
      </div>
      <div
        class="imageCard bg-cover w-[336px] h-[192px] rounded-lg p-2 page-break"
      >
        <div class="flex justify-between mt-4">
          <div class="flex flex-col gap-2">
            <p class="text-xs">
              BirthDate :<span class="font-semibold">{{ item.birthdate }}</span>
            </p>
            <p class="text-xs">
              Release date :<span class="font-semibold">{{
                item.lastName
              }}</span>
            </p>
            <p class="text-xs">
              Expiry date :<span class="font-semibold">{{
                item.phoneNumber
              }}</span>
            </p>
            <div class="flex gap-2 item-center">
              <p class="text-xs">
                country :<span class="font-semibold">{{ item.birthdate }}</span>
              </p>
              <p class="text-xs">
                city :<span class="font-semibold">{{ item.bloodType }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="mt-2 h-4 bg-slate-500 w-full"></div>
        <div class="flex flex-wrap text-start text-sm mt-2">
          897492834293422462364 234234OPLD234>>>> 234234234IRAQ200002422
        </div>
      </div>
    </div>
    <button
      @click="handlePrint"
      class="bg-gary-50 border border-purple-400 p-1 mt-4 text-purple-400 w-[336px] rounded-lg hover:bg-purple-50 print:hidden"
    >
      print
    </button>
  </div>
</template>
<style scoped>
.imageCard {
  background-image: url("../../../src/assets/5153829.jpg");
}
@media print {
  .page-break {
    page-break-before: always;
  }
}
</style>
