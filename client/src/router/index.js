import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      chineseName: "首頁",
    },
    component: Home,
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      chineseName: "產品",
    },
    component: Product,
  },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
