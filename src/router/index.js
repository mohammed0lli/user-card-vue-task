import NotFound from "@/components/NotFound.vue";
import Profile from "@/components/profile/Profile.vue";
import HomeTable from "@/views/HomeTable.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeTable,
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
    {
      path: "/404",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
