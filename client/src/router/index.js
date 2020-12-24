import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.length == 0) {
    next({
      path: "/home",
    });
  } else {
    next();
  }
});

export default router;
